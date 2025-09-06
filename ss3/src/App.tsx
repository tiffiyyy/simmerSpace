import { useState } from "react";

// 1. Define the type
type Ingredient = {
  name: string;
  checked: boolean;
};

export default function IngredientChecklist() {
  // 2. Initial ingredient list
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Tomato", checked: false },
    { name: "Cheese", checked: false },
    { name: "Basil", checked: false },
  ]);

  // 3. Function to toggle a checkbox
  const toggleIngredient = (index: number) => {
    const newIngredients = [...ingredients]; // copy array
    newIngredients[index].checked = !newIngredients[index].checked; // flip the value
    setIngredients(newIngredients); // update state
  };

  return (
    <div className="flex">
      <h2>Ingredient Checklist</h2>
      <ul className="list-none p-0 m-0">
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
  );
}