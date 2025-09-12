import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import recipesData from "./recipes.json";

interface Recipe {
  id: string;
  name: string;
  steps: Array<{
    step: string;
    note: string;
    time: number;
  }> | string[];
}

function Timer() {
  // initialized recipeId, stepNumber, duration types as strings 
  const { recipeId, stepNumber, duration } = useParams<{ 
    recipeId: string; 
    stepNumber: string; 
    duration: string; 
  }>();
  
  // declared + initialized the following constants to 0 
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [editHours, setEditHours] = useState(0);
  const [editMinutes, setEditMinutes] = useState(0);
  const [editSeconds, setEditSeconds] = useState(0);
  // declared + initialized the following constants as false 
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  // declared + initialized the following constants as null 
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // declared + initialized the following constant as an empty string  
  const [stepText, setStepText] = useState("");

  useEffect(() => {
    if (recipeId && stepNumber && duration) {
      // searches through recipe json file for data associated with selected recipeId 
      const foundRecipe = recipesData.find((r: Recipe) => r.id === recipeId);
      if (foundRecipe) {
        setRecipe(foundRecipe);
        {/* convert stepNumber to an integer and decrement (base 1 --> base 0) and store in stepIndex */}
        const stepIndex = parseInt(stepNumber) - 1;
        {/* store instruction at stepIndex in step */}
        const step = foundRecipe.steps[stepIndex];
        if (typeof step === 'string') {
          setStepText(step);
        } else {
          setStepText(step.step);
        }
      }
      
      // using information from info stored at recipeId, initialize the following constants  
      const totalSeconds = parseInt(duration) * 60;
      setTimeLeft(totalSeconds);
      setInitialTime(totalSeconds);
      setEditHours(Math.floor(totalSeconds / 3600));
      setEditMinutes(Math.floor((totalSeconds % 3600) / 60));
      setEditSeconds(totalSeconds % 60);
    }
  }, [recipeId, stepNumber, duration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
    setIsCompleted(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsCompleted(false);
    if (duration) {
      const totalSeconds = parseInt(duration) * 60;
      setTimeLeft(totalSeconds);
      setInitialTime(totalSeconds);
      setEditHours(Math.floor(totalSeconds / 3600));
      setEditMinutes(Math.floor((totalSeconds % 3600) / 60));
      setEditSeconds(totalSeconds % 60);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };


  const getProgressPercentage = () => {
    if (!initialTime) return 0;
    const elapsedSeconds = initialTime - timeLeft;
    return (elapsedSeconds / initialTime) * 100;
  };

  const handleTimeEdit = () => {
    const newTotalSeconds = editHours * 3600 + editMinutes * 60 + editSeconds;
    setTimeLeft(newTotalSeconds);
    setInitialTime(newTotalSeconds);
    setIsEditing(false);
  };

  const generateTimeOptions = (max: number) => {
    return Array.from({ length: max + 1 }, (_, i) => i);
  };

  const handleWheel = (e: React.WheelEvent, type: 'hours' | 'minutes' | 'seconds') => {
    e.preventDefault();
    if (type === 'hours') {
      setEditHours(prev => Math.max(0, Math.min(23, prev + (e.deltaY > 0 ? -1 : 1))));
    } else if (type === 'minutes') {
      setEditMinutes(prev => Math.max(0, Math.min(59, prev + (e.deltaY > 0 ? -1 : 1))));
    } else {
      setEditSeconds(prev => Math.max(0, Math.min(59, prev + (e.deltaY > 0 ? -1 : 1))));
    }
  };

  if (!recipe) {
    return (
      <div className="App">
        <h1>Timer Not Found</h1>
        <div className="card">
          <p>The requested timer could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={{ 
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        background: '#1c1c1e',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>

        {/* Recipe Info */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          fontSize: '14px',
          color: '#8e8e93'
        }}>
          <strong style={{ color: 'white' }}>{recipe.name}</strong><br />
          Step {stepNumber}: {stepText}
        </div>
        
        {/* Time Display or Edit Mode */}
        {isEditing ? (
          <div style={{ marginBottom: '30px' }}>
            {/* Scrollable Time Picker */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {/* Hours Column */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  position: 'relative',
                  width: '60px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(${100 - editHours * 40}px)`,
                    transition: 'transform 0.3s ease'
                  }}>
                    {generateTimeOptions(23).map((hour) => (
                      <div
                        key={hour}
                        style={{
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: hour === editHours ? '24px' : '18px',
                          fontWeight: hour === editHours ? '600' : '400',
                          color: hour === editHours ? '#007aff' : '#8e8e93',
                          cursor: 'pointer'
                        }}
                        onClick={() => setEditHours(hour)}
                        onWheel={(e) => handleWheel(e, 'hours')}
                      >
                        {hour.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#8e8e93', marginTop: '10px' }}>
                  HOURS
                </div>
              </div>

              {/* Separator */}
              <div style={{ fontSize: '24px', color: '#8e8e93' }}>:</div>

              {/* Minutes Column */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  position: 'relative',
                  width: '60px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(${100 - editMinutes * 40}px)`,
                    transition: 'transform 0.3s ease'
                  }}>
                    {generateTimeOptions(59).map((min) => (
                      <div
                        key={min}
                        style={{
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: min === editMinutes ? '24px' : '18px',
                          fontWeight: min === editMinutes ? '600' : '400',
                          color: min === editMinutes ? '#007aff' : '#8e8e93',
                          cursor: 'pointer'
                        }}
                        onClick={() => setEditMinutes(min)}
                        onWheel={(e) => handleWheel(e, 'minutes')}
                      >
                        {min.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#8e8e93', marginTop: '10px' }}>
                  MINUTES
                </div>
              </div>

              {/* Separator */}
              <div style={{ fontSize: '24px', color: '#8e8e93' }}>:</div>

              {/* Seconds Column */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  position: 'relative',
                  width: '60px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(${100 - editSeconds * 40}px)`,
                    transition: 'transform 0.3s ease'
                  }}>
                    {generateTimeOptions(59).map((sec) => (
                      <div
                        key={sec}
                        style={{
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: sec === editSeconds ? '24px' : '18px',
                          fontWeight: sec === editSeconds ? '600' : '400',
                          color: sec === editSeconds ? '#007aff' : '#8e8e93',
                          cursor: 'pointer'
                        }}
                        onClick={() => setEditSeconds(sec)}
                        onWheel={(e) => handleWheel(e, 'seconds')}
                      >
                        {sec.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#8e8e93', marginTop: '10px' }}>
                  SECONDS
                </div>
              </div>
            </div>

            {/* Edit Mode Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => setIsEditing(false)}
                style={{ 
                  background: '#2c2c2e', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  flex: 1
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleTimeEdit}
                style={{ 
                  background: '#007aff', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  flex: 1
                }}
              >
                Start
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '30px' }}>
            {/* Timer Display */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '20px',
              padding: '30px',
              background: isCompleted ? 
                '#34c759' : 
                '#2c2c2e',
              borderRadius: '20px'
            }}>
              <div style={{ 
                fontSize: '48px', 
                fontWeight: '700', 
                color: 'white',
                marginBottom: '10px',
                cursor: 'pointer'
              }} onClick={() => setIsEditing(true)}>
                {formatTime(timeLeft)}
              </div>
              
              {/* Progress Ring */}
              <div style={{ 
                width: '120px', 
                height: '120px', 
                margin: '0 auto',
                position: 'relative',
                marginBottom: '15px'
              }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3a3a3c"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={isCompleted ? '#34c759' : isRunning ? '#ff9500' : '#007aff'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - getProgressPercentage() / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
                </svg>
              </div>
              
              {isCompleted && (
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'white',
                  marginBottom: '10px'
                }}>
                  🎉 Time's Up!
                </div>
              )}
            </div>
            
            {/* Control Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {!isCompleted && (
                <>
                  {!isRunning ? (
                    <button 
                      onClick={startTimer}
                      style={{ 
                        background: '#34c759', 
                        color: 'white', 
                        border: 'none', 
                        padding: '12px 24px', 
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        flex: 1
                      }}
                    >
                      ▶️ Start
                    </button>
                  ) : (
                    <button 
                      onClick={pauseTimer}
                      style={{ 
                        background: '#ff9500', 
                        color: 'white', 
                        border: 'none', 
                        padding: '12px 24px', 
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        flex: 1
                      }}
                    >
                      ⏸️ Pause
                    </button>
                  )}
                </>
              )}
              
              <button 
                onClick={resetTimer}
                style={{ 
                  background: '#8e8e93', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  flex: 1
                }}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        )}
        
        {isCompleted && !isEditing && (
          <div style={{ 
            padding: '20px', 
            background: '#34c759', 
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: 'white', fontWeight: '600', fontSize: '16px' }}>
              ✅ Step completed! You can now proceed to the next step.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;