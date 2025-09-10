import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import recipesData from "./recipes.json";
import { initScene } from "@webspatial/react-sdk";


// creating a custom type: Recipe (like a struct) 
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
      // Add a small delay to prevent flash and make loading feel more natural
      const timer = setTimeout(() => {
        const foundRecipe = recipesData.find((r: Recipe) => r.id === recipeId);
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

  const handleNextStep = () => {
    if (recipe && currentStep < recipe.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      navigate(`${__XR_ENV_BASE__}/recipe/${recipeId}/step/${nextStep + 1}`);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      navigate(`${__XR_ENV_BASE__}/recipe/${recipeId}/step/${prevStep + 1}`);
    }
  };

  const handleBackToMenu = () => {
    navigate(`${__XR_ENV_BASE__}/`);
  };

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

  const step = recipe.steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === recipe.steps.length - 1;

  // Handle both step formats: object with step/note/time or simple string
  const stepText = typeof step === 'string' ? step : step.step;
  const stepNote = typeof step === 'string' ? null : step.note;
  const stepTime = typeof step === 'string' ? 0 : step.time;
  const needsTimer = stepTime > 0;

  return (
    <div className="App">
      <h1>{recipe.name}</h1>
      <div className="card">
        <h2>Step {currentStep + 1} of {recipe.steps.length}</h2>
        <p><strong>{stepText}</strong></p>
        {stepNote && (
          <p style={{ fontStyle: 'italic', color: '#666' }}>
            <em>Note: {stepNote}</em>
          </p>
        )}
        
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
                      height: 300,
                    },
                  };
                });
                window.open(`/timer/${recipeId}/${currentStep + 1}/${stepTime}`, "timer");
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
        
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleBackToMenu}>Back to Menu</button>
        </div>
      </div>
    </div>
  );
}

export default Steps;
