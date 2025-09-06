import { useState } from 'react'
import './App.css'

type Ingredient = {
  name: string;
  checked: boolean;
};
function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Tomato", checked: false },
    { name: "Cheese", checked: false },
    { name: "Basil", checked: false },
  ]);

  const toggleIngredient = (index: number) => {
    const newIngredients = [...ingredients]; // copy array
    newIngredients[index].checked = !newIngredients[index].checked; // flip the value
    setIngredients(newIngredients); // update state
  };

  return (
    <>
      <div>
        <h2>Ingredient Checklist</h2>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0,}}>
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
    </>
  )
}

export default App