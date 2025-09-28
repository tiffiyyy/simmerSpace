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


  return (
    <div className="ingredients-page">
      {/* Kitchen background */}
      
      
      {/* Glassmorphism recipe card */}
      <div className="recipe-card-overlay">
        {/* Recipe header section */}
        <div className="recipe-header">
          <div className="dish-image-container">
            <img 
              src={`/src/assets/images/${recipe.id}.png`} 
              alt={recipe.name}
              className="dish-image"
              onError={(e) => {
                // Fallback to a default image if specific recipe image not found
                e.currentTarget.src = '/src/assets/granny-stirring-pot.png';
              }}
            />
            
          </div>
          <div className="recipe-title-section">
            <h1 className="recipe-main-title">{recipe.name}</h1>
            <p className="recipe-subtitle">{recipe.description}</p>
            <div className="recipe-meta-info">
              <div className="meta-item">
                <span className="meta-icon">👥</span>
                <span>Servings: 4</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⏱️</span>
                <span>Cook: {recipe.estimatedTime} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* START COOKING button */}
        <div className="start-cooking-section">
          <button
            className="start-cooking-btn"
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
            START COOKING
          </button>
        </div>

        {/* Ingredients section */}
        <div className="ingredients-section">
          <h2 className="section-title">Ingredients</h2>
          <div className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.name} className="ingredient-item">
                <div className="ingredient-checkbox">
                  <input
                    type="checkbox"
                    id={`ingredient-${index}`}
                    checked={ingredient.checked}
                    onChange={() => toggleIngredient(index)}
                  />
                  <label htmlFor={`ingredient-${index}`} className="ingredient-label">
                    <div className="ingredient-details">
                      <span className="ingredient-text">
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="navigation-buttons-section">
          <button className="back-to-recipes-btn" onClick={() => navigate('/recipes')}>
            Back to Recipes
          </button>
          <button className="back-to-menu-btn" onClick={handleBackToMenu}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
