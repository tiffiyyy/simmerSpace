import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import recipesData from "./recipes.json";
import { initScene } from "@webspatial/react-sdk";


// creating a struct: Recipe 
interface Recipe {
  id: string;           // id of food (to be used to locate selected recipe from recipes.json)
  name: string;         // name of food (to be displayed)
  ingredients: Array <{ // array storing ingredients required for recipe 
    item: string;       // name of ingredient 
    quantity: string;   // numerical measurement 
    unit: string;       // unit of measurement 
  }>;
  steps: Array <{       // array storing steps in recipe 
    step: string;       // written step 
    note: string;       // any additional information 
    time: number;
    video?: string;     // optional YouTube video URL
  }> | string[];
}

// 
function Steps() {
  const navigate = useNavigate();
  // returns URL parameters (recipeId, stepNumber) from router (in App.tsx) 
  const { recipeId, stepNumber } = useParams<{ recipeId: string; stepNumber: string }>();
  // declares recipe as a null piece of state which will either be a Recipe or null (set using setRecipe())
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  // declares currentStep as 0; can be updated using setCurrentStep() 
  const [currentStep, setCurrentStep] = useState(0);
  // declares isLoading as true; can be updated using setIsLoading() 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recipeId) {
      // add a small delay to prevent flash and make loading feel more natural
      const timer = setTimeout(() => {
        // searches through recipe json file for data associated with selected recipeId 
        const foundRecipe = recipesData.find((r: Recipe) => r.id === recipeId);
        // setes recipe and currentStep with associated data 
        if (foundRecipe) {
          setRecipe(foundRecipe);
          setCurrentStep(stepNumber ? parseInt(stepNumber) - 1 : 0);
        }
        setIsLoading(false);
      }, 300); // 300ms delay for smoother transition

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [recipeId, stepNumber]);

  // currentStep += 1 and navigates to the next step scene 
  const handleNextStep = () => {
    if (recipe && currentStep < recipe.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      navigate(`/recipe/${recipeId}/step/${nextStep + 1}`);
    }
  };

  // currentStep -= 1 and navigates to the previous step scene 
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      navigate(`/recipe/${recipeId}/step/${prevStep+ 1}`);
    }
  };

  // navigates back to the menu scene 
  const handleBackToMenu = () => {
    navigate(`/`);
  };

  // if isLoading == true, show "loading" cutscene 
  // purpose: replace menu screen showing briefly while navigating between pages
  if (isLoading) {
    return (
      <div className="App">
        <h1>Loading Recipe...</h1>
        <div className="card">
          <p>Please wait while we load your recipe.</p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50px',
            fontSize: '24px'
          }}>
            ⏳
          </div>
        </div>
      </div>
    );
  }

  // if recipe == null, show "recipe not found" screen
  if (!recipe) {
    return (
      <div className="App">
        <h1>Recipe Not Found</h1>
        <div className="card">
          <p>The requested recipe could not be found.</p>
          <button onClick={handleBackToMenu}>Back to Menu</button>
        </div>
      </div>
    );
  }

  // const stores instruction at currentStep 
  const step = recipe.steps[currentStep];
  // const stores first step of recipe  
  const isFirstStep = currentStep === 0;
  // const stores last step of recipe  
  const isLastStep = currentStep === recipe.steps.length - 1;

  // handle both step formats: object with step/note/time or simple string
  const stepText = typeof step === 'string' ? step : step.step;
  const stepNote = typeof step === 'string' ? null : step.note;
  const stepTime = typeof step === 'string' ? 0 : step.time;
  const stepVideo = typeof step === 'string' ? null : step.video;
  const needsTimer = stepTime > 0;
  const hasVideo = stepVideo && stepVideo.length > 0;

  return (
    <div className="cooking-interface">
     
    <div className="kitchen-background"></div>

      {/* Main Cooking Interface Overlay */}
      <div className="cooking-overlay">
        
        {/* Step Instruction Panel (Left) */}
        <div className="instruction-panel">
          <div className="step-header">
            <h1 className="step-title">STEP {currentStep + 1}: {stepText}</h1>
            {stepNote && (
              <p className="step-note">
                <em>Note: {stepNote}</em>
              </p>
            )}
            {hasVideo && (
              <div className="video-button-container">
                <button 
                  className="video-button"
                  onClick={() => {
                    window.open(stepVideo, "_blank", "width=800,height=600,scrollbars=yes,resizable=yes");
                  }}
                >
                  📹 Watch Video Tutorial
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Video/Image Display (Top Center) */}
        <div className="media-display">
          <div className="media-container">
            <div className="cooking-visual">
              {/* Placeholder for cooking video/image - you can replace this with actual media */}
              <div className="cooking-placeholder">
                <div className="knife-icon">🔪</div>
                <div className="ingredient-icon">🥩</div>
                <div className="steam-effect">💨</div>
              </div>
            </div>
          </div>
        </div>

        {/* Simmer Timer (Top Right) */}
        {needsTimer && (
          <div className="simmer-timer">
            <div className="timer-display">
              <div className="timer-time">{stepTime}:00</div>
              <div className="timer-label">SIMMER TIMER</div>
            </div>
            <div className="timer-controls">
              <button className="timer-btn" onClick={() => {/* Skip back */}}>⏮</button>
              <button 
                className="timer-btn play-btn"
                onClick={() => {
                  initScene("timer", (prevConfig) => {
                    return {
                      ...prevConfig,
                      defaultSize: {
                        width: 400,
                        height: 600,
                      },
                    };
                  });
                  window.open(`${__XR_ENV_BASE__}/timer/${recipeId}/${currentStep + 1}/${stepTime}`, "timer");
                }}
              >
                ⏸
              </button>
              <button className="timer-btn" onClick={() => {/* Skip forward */}}>⏭</button>
            </div>
          </div>
        )}

        {/* Ingredients List (Right Side) */}
        <div className="ingredients-panel">
          <div className="ingredients-header">
            <h3>Ingredients for this step</h3>
          </div>
          <div className="ingredients-list">
            {/* Simple list of ingredients needed for this step */}
            <div className="ingredient-item">
              <span className="ingredient-text">holder</span>
            </div>
            <div className="ingredient-item">
              <span className="ingredient-text">holder</span>
            </div>
            <div className="ingredient-item">
              <span className="ingredient-text">holder</span>
            </div>
            <div className="ingredient-item">
              <span className="ingredient-text">holder</span>
            </div>
            <div className="ingredient-item">
              <span className="ingredient-text">holder</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons (Bottom Center) */}
        <div className="navigation-section">
          <div className="nav-buttons">
            <button 
              className="nav-button back-button"
              onClick={handleBackToMenu}
            >
              ← Back to Menu
            </button>
            {!isFirstStep && (
              <button 
                className={`nav-button ${isFirstStep ? 'disabled' : 'active'}`}
                onClick={handlePreviousStep}
              >
                PREVIOUS STEP
              </button>
            )}
            {!isLastStep ? (
              <button 
                className={`nav-button ${!isFirstStep ? 'secondary' : 'active'}`}
                onClick={handleNextStep}
              >
                NEXT STEP
              </button>
            ) : (
              <button 
                className="nav-button active"
                onClick={handleBackToMenu}
              >
                COMPLETE RECIPE
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar and Voice Control (Bottom) */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / recipe.steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="voice-control">
            <div className={`checkmark-icon ${isLastStep ? 'completed' : ''}`}>✓</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Steps;
