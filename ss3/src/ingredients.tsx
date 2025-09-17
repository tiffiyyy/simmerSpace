import { useNavigate, useParams } from "react-router-dom";
import { initScene } from "@webspatial/react-sdk";
import { useState, useEffect } from "react";
import "./App.css";
import recipesData from "./recipes.json";

// creating a struct: Recipe 
interface Recipe {
  id: string;
  name: string;
  estimatedTime: number;
  description: string;
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

type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
  checked: boolean;
};

function Ingredients() {
  const navigate = useNavigate();
  // returns URL parameters (recipeId, stepNumber) from router (in App.tsx) 
  const { recipeId } = useParams<{ recipeId: string }>();
  // declares recipe as a null piece of state which will either be a Recipe or null (set using setRecipe())
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  // declares recipe as an empty Ingredient array 
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  // declares isLoading as true; can be updated using setIsLoading() 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recipeId) {
      // Add a small delay to prevent flash and make loading feel more natural
      const timer = setTimeout(() => {
        // searches through recipe json file for data associated with selected recipeId 
        const foundRecipe = recipesData.find((r: Recipe) => r.id === recipeId);
        if (foundRecipe) {
          setRecipe(foundRecipe);
          // Initialize ingredients with checked: false
          const initialIngredients = foundRecipe.ingredients.map(ing => ({
            name: ing.item,
            quantity: ing.quantity,
            unit: ing.unit,
            checked: false
          }));
          setIngredients(initialIngredients);
        }
        setIsLoading(false);
      }, 300); // 300ms delay for smoother transition

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [recipeId]);

  // handles Ingredient checklist; tracks which ingredients have been checked 
  const toggleIngredient = (index: number) => {
    const newIngredients = [...ingredients]; // copy array
    newIngredients[index].checked = !newIngredients[index].checked; // flip the value
    setIngredients(newIngredients); // update state
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
        <h1>Loading Ingredients...</h1>
        <div className="card">
          <p>Please wait while we load your recipe ingredients.</p>
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

  // formats time (>= 60 mins --> x hr/s: x mins)
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
      } else {
        return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minutes`;
      }
    }
  };

  return (
    <div className="App">
      {/* displays recipe ingredient checklist (type, quantity), estimated time, description */}
      <h1>{recipe.name} Ingredients</h1>
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <p><strong>⏱️ Estimated Time:</strong> {formatTime(recipe.estimatedTime)}</p>
        <p><strong>📝 Description:</strong> {recipe.description}</p>
      </div>
      <div>
        <h2>Ingredient Checklist</h2>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {ingredients.map((ingredient, index) => (
            <li key={ingredient.name} style={{ marginBottom: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={ingredient.checked}
                  onChange={() => toggleIngredient(index)}
                />
                <span>
                  <strong>{ingredient.quantity} {ingredient.unit}</strong> - {ingredient.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="card" style={{ marginTop: "20px" }}>
        <h2>Ready to start cooking {recipe.name}?</h2>
        {/* Clicking a button will only open one scene */}
        <p>
          <button
            onClick={(e) => {
              e.preventDefault();
              // before recipe opens, resize the window
              initScene("recipeSteps", (prevConfig) => {
                return {
                  ...prevConfig,
                  defaultSize: {
                    width: 500,
                    height: 500,
                  },
                };
              });
              {/* navigate to step 1 when user clicks "Start Recipe" button */}
              setTimeout(() => {
                // window.open(`${__XR_ENV_BASE__}/recipe/${recipe.id}/step/1`, "recipeSteps");
                window.location.href = `${__XR_ENV_BASE__}/recipe/${recipe.id}/step/1`;
              }, 0);
            }}
          >
            Start Recipe
          </button>
        </p>
        <p><strong>Note</strong>: If you would like to reload your current recipe screen, please press this button again.</p>
        {/* back to menu button */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleBackToMenu}>Back to Menu</button>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
