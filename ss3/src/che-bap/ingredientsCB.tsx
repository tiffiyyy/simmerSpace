import { Link, useNavigate } from "react-router-dom";
import { initScene } from "@webspatial/react-sdk";
import { useState } from "react";
import "../App.css";

type Ingredient = {
  name: string;
  checked: boolean;
};

function IngredientsCB() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Bắp (corn) (one per person)", checked: false },
    { name: "4 cups nước (water) ", checked: false },
    { name: "1 cup đừng (sugar) (then add to taste)", checked: false },
    { name: "1 tbsp bột năng (tapioca starch)", checked: false },
  ]);

  const toggleIngredient = (index: number) => {
    const newIngredients = [...ingredients]; // copy array
    newIngredients[index].checked = !newIngredients[index].checked; // flip the value
    setIngredients(newIngredients); // update state
  };

  return (
    <div className="App">
      <div>
        <h2>Ingredient Checklist</h2>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {ingredients.map((ingredient, index) => (
            <li key={ingredient.name}>
              <label>
                <input
                  type="checkbox"
                  checked={ingredient.checked}
                  onChange={() => toggleIngredient(index)}
                />
                {ingredient.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="card" style={{ marginTop: "0px" }}>
        <h2>Let's begin cooking Bà Nội's Chè Bắp 🌽!</h2>
        <div>{/* Clicking a button will only open one scene */}</div>
        <p>
          <button
            onClick={() => {
              // before recipe opens, resize the window
              initScene("step1", (prevConfig) => {
                return {
                  ...prevConfig,
                  defaultSize: {
                    width: 500,
                    height: 500,
                  },
                };
              });
              window.open(`${__XR_ENV_BASE__}/s1`, "step1");
            }}
          >
            Open Recipe
          </button>
        </p>
        <p><strong>Note</strong>: If you would like to reload your current recipe screen, please press this button agian.</p>
      </div>
    </div>
  );
}

export default IngredientsCB;
