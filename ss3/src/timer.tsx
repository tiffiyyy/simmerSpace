import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import recipesData from "./recipes.json";
import alarmSound from "./assets/timer-terminer-342934.mp3";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
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

  // Effect to handle alarm sound when timer completes
  useEffect(() => {
    if (isCompleted) {
      // Play the alarm sound on repeat
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(err => console.error("Error playing alarm:", err));
      }
    } else {
      // Stop the alarm sound when timer is not completed
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isCompleted]);

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
    <div className="ingredients-page">
      {/* Kitchen Background */}
      <div className="kitchen-background"></div>
      
      {/* Hidden Audio Element for Alarm */}
      <audio ref={audioRef} src={alarmSound} preload="auto" />
      
      {/* Main Timer Container */}
      <div className="recipe-card-overlay">

        {/* Recipe Info */}
        <div className="recipe-header" style={{ 
          display: 'block',
          textAlign: 'center', 
          marginBottom: 'var(--spacing-lg)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          paddingBottom: 'var(--spacing-md)'
        }}>
          <div className="recipe-main-title" style={{ 
            fontSize: '2.5rem',
            marginBottom: 'var(--spacing-md)',
            lineHeight: '1.2',
            display: 'block'
          }}>
            {recipe.name}
          </div>
          <div className="recipe-subtitle" style={{
            fontSize: '1rem',
            lineHeight: '1.4'
          }}>
            Step {stepNumber}: {stepText}
          </div>
        </div>
        
        {/* Time Display or Edit Mode */}
        {isEditing ? (
          <div className="panel-glass" style={{ marginBottom: 'var(--spacing-lg)' }}>
            {/* Scrollable Time Picker */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              {/* Hours Column */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  position: 'relative',
                  width: '60px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(${100 - editHours * 40}px)`,
                    transition: 'transform var(--transition-normal)'
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
                          color: hour === editHours ? 'var(--orange-accent)' : 'rgba(255, 255, 255, 0.7)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                        onClick={() => setEditHours(hour)}
                        onWheel={(e) => handleWheel(e, 'hours')}
                      >
                        {hour.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  marginTop: 'var(--spacing-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Hours
                </div>
              </div>

              {/* Separator */}
              <div style={{ 
                fontSize: '24px', 
                color: 'var(--orange-accent)',
                fontWeight: '600'
              }}>:</div>

              {/* Minutes Column */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  position: 'relative',
                  width: '60px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(${100 - editMinutes * 40}px)`,
                    transition: 'transform var(--transition-normal)'
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
                          color: min === editMinutes ? 'var(--orange-accent)' : 'rgba(255, 255, 255, 0.7)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                        onClick={() => setEditMinutes(min)}
                        onWheel={(e) => handleWheel(e, 'minutes')}
                      >
                        {min.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  marginTop: 'var(--spacing-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Minutes
                </div>
              </div>

              {/* Separator */}
              <div style={{ 
                fontSize: '24px', 
                color: 'var(--orange-accent)',
                fontWeight: '600'
              }}>:</div>

              {/* Seconds Column */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  position: 'relative',
                  width: '60px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(${100 - editSeconds * 40}px)`,
                    transition: 'transform var(--transition-normal)'
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
                          color: sec === editSeconds ? 'var(--orange-accent)' : 'rgba(255, 255, 255, 0.7)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                        onClick={() => setEditSeconds(sec)}
                        onWheel={(e) => handleWheel(e, 'seconds')}
                      >
                        {sec.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  marginTop: 'var(--spacing-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Seconds
                </div>
              </div>
            </div>

            {/* Edit Mode Buttons */}
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'center' }}>
              <button 
                onClick={() => setIsEditing(false)}
                className="btn-base"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  color: 'var(--white)', 
                  border: '1px solid rgba(255, 255, 255, 0.3)', 
                  padding: 'var(--spacing-sm) var(--spacing-md)', 
                  flex: 1
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleTimeEdit}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Start Timer
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            {/* Timer Display */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: 'var(--spacing-lg)',
              padding: 'var(--spacing-lg)'
            }}>
              <div 
                className="text-white"
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: '700', 
                  marginBottom: 'var(--spacing-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }} 
                onClick={() => setIsEditing(true)}
              >
                {formatTime(timeLeft)}
              </div>
              
              {/* Progress Ring */}
              <div style={{ 
                width: '120px', 
                height: '120px', 
                margin: '0 auto',
                position: 'relative',
                marginBottom: 'var(--spacing-md)'
              }}>
                <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={isCompleted ? '#34c759' : isRunning ? 'var(--orange-accent)' : 'var(--secondary-brown)'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - getProgressPercentage() / 100)}`}
                    style={{ 
                      transition: 'stroke-dashoffset var(--transition-slow)',
                      filter: 'drop-shadow(0 0 10px rgba(107, 142, 35, 0.5))'
                    }}
                  />
                </svg>
              </div>
              
              {isCompleted && (
                <div className="text-white" style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  🎉 Time's Up!
                </div>
              )}
            </div>
            
            {/* Control Buttons */}
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'center' }}>
              {!isCompleted && (
                <>
                  {!isRunning ? (
                    <button 
                      onClick={startTimer}
                      className="btn-primary"
                      style={{ 
                        flex: 1,
                        background: 'var(--secondary-brown)',
                        border: 'none',
                        outline: 'none'
                      }}
                    >
                      ▶️ Start
                    </button>
                  ) : (
                    <button 
                      onClick={pauseTimer}
                      className="btn-base"
                      style={{ 
                        background: 'var(--orange-accent)', 
                        color: 'var(--white)', 
                        flex: 1 
                      }}
                    >
                      ⏸️ Pause
                    </button>
                  )}
                </>
              )}
              
              {isCompleted && (
                <button 
                  onClick={() => setIsCompleted(false)}
                  className="btn-base"
                  style={{ 
                    background: 'var(--orange-accent)', 
                    color: 'var(--white)', 
                    flex: 1 
                  }}
                >
                  🔕 Stop Alarm
                </button>
              )}
              
              <button 
                onClick={resetTimer}
                className="btn-base"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  color: 'var(--white)', 
                  border: '1px solid rgba(255, 255, 255, 0.3)', 
                  flex: 1 
                }}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        )}
        
        {isCompleted && !isEditing && (
          <div className="panel-glass" style={{ 
            textAlign: 'center',
            background: 'rgba(52, 199, 89, 0.2)',
            border: '1px solid rgba(52, 199, 89, 0.3)'
          }}>
            <p className="text-white" style={{ 
              margin: 0, 
              fontWeight: '600', 
              fontSize: '1rem' 
            }}>
              ✅ Step completed! You can now proceed to the next step.
            </p>
          </div>
        )}
        
        {/* Close Button */}
        <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
          <button 
            onClick={() => window.close()}
            className="btn-base"
            style={{ 
              background: 'rgba(255, 59, 48, 0.8)', 
              color: 'var(--white)', 
              border: '1px solid rgba(255, 59, 48, 0.3)',
              padding: 'var(--spacing-sm) var(--spacing-lg)'
            }}
          >
            ✕ Close Timer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;