import { useNavigate, useParams } from "react-router-dom";
import { initScene } from "@webspatial/react-sdk";
import { useState, useEffect } from "react";
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

type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
  checked: boolean;
};

function Ingredients() {
  const navigate = useNavigate();
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (recipeId) {
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
    }
  }, [recipeId]);

  const toggleIngredient = (index: number) => {
    const newIngredients = [...ingredients]; // copy array
    newIngredients[index].checked = !newIngredients[index].checked; // flip the value
    setIngredients(newIngredients); // update state
  };

  const handleBackToMenu = () => {
    navigate("/");
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

  return (
    <div className="App">
      <h1>{recipe.name} Ingredients</h1>
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
        <div>{/* Clicking a button will only open one scene */}</div>
        <p>
          <button
            onClick={() => {
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
              window.open(`/recipe/${recipe.id}/step/1`, "recipeSteps");
            }}
          >
            Start Recipe
          </button>
        </p>
        <p><strong>Note</strong>: If you would like to reload your current recipe screen, please press this button again.</p>
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleBackToMenu}>Back to Menu</button>
        </div>
      </div>
    </div>
  );
}

export default Ingredients;
