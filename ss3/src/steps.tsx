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
  //const stepVideo = typeof step === 'string' ? null : step.video;
  const needsTimer = stepTime > 0;
  //const hasVideo = stepVideo && stepVideo.length > 0;

  return (
    <div className="App">
      {/* displays recipe name, current step + num, notes (if applicable) */}
      <h1>{recipe.name}</h1>
      <div className="card">
        <h2>Step {currentStep + 1} of {recipe.steps.length}</h2>
        <p><strong>{stepText}</strong></p>
        {stepNote && (
          <p style={{ fontStyle: 'italic', color: '#666' }}>
            <em>Note: {stepNote}</em>
          </p>
        )}
        
        {/* if recipe needs timer, display option to open timer */}
        {needsTimer && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f4fd', borderRadius: '5px', border: '1px solid #b3d9ff' }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#0066cc' }}>
              ⏱️ This step requires {stepTime} minutes
            </p>
            <button 
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
              style={{ 
                backgroundColor: '#0066cc', 
                color: 'white', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Start Timer
            </button>
          </div>
        )}
        
        {/* if recipe step has video, display option to open YouTube video
        {hasVideo && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#856404' }}>
              📹 Watch video tutorial for this step
            </p>
            <button style={{ background :'red'}}
              onClick={() => {
                window.open(stepVideo, "_blank", "width=800,height=600,scrollbars=yes,resizable=yes");
              }}
            >
              ▶️ Watch Video
            </button>
          </div>
        )}
         */}
        {/* conditional buttons */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {!isFirstStep && (
            <button onClick={handlePreviousStep}>Previous Step</button>
          )}
          {!isLastStep ? (
            <button onClick={handleNextStep}>Next Step</button>
          ) : (
            <button onClick={handleBackToMenu}>Complete Recipe</button>
          )}
        </div>
        
        {/* return to menu screen button */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleBackToMenu}>Back to Menu</button>
        </div>
      </div>
    </div>
  );
}

export default Steps;
