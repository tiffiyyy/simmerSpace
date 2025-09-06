import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SecondPage from "./SecondPage";
//import { initScene } from "@webspatial/react-sdk";



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
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route
          path="/"
          element={
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
            <div className="card" style={{ marginTop: "0px" }}>
                  <h2>Open Second Page</h2>
                <p>
                  <Link to="/second-page" target="_blank">
                    Open Second Page with a Link
                  </Link>
                </p>
                <p>
                  <button
                    onClick={() => {
                      window.open(`${__XR_ENV_BASE__}/second-page`, "secondScene");
                    }}>
                    Open Second Page with a Button
                  </button>
                </p>
            </div>
            </>
          }
        />
      </Routes>
    </Router>
      
    </>
  )
}

export default App