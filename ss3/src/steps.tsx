import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import recipesData from "./recipes.json";

interface Recipe {
  id: string;
  name: string;
  ingredients: Array<{
    item: string;
    quantity: string;
    unit: string;
  }>;
  steps: Array<{
    step: string;
    note: string;
  }> | string[];
}

function Steps() {
  const navigate = useNavigate();
  const { recipeId, stepNumber } = useParams<{ recipeId: string; stepNumber: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (recipeId) {
      const foundRecipe = recipesData.find((r: Recipe) => r.id === recipeId);
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setCurrentStep(stepNumber ? parseInt(stepNumber) - 1 : 0);
      }
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

  // Handle both step formats: object with step/note or simple string
  const stepText = typeof step === 'string' ? step : step.step;
  const stepNote = typeof step === 'string' ? null : step.note;

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
