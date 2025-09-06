import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SecondPage from "./SecondPage";
import { initScene } from "@webspatial/react-sdk";

// import recipe steps for che bap below 
import Step1 from "./che-bap/step1"; 


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
        {/*<Route path="/second-page" element={<SecondPage />} />*/}
        <Route path="/s1" element={<Step1 />} />
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
                <h2>Let's begin cooking Che Bap!</h2>
                <div>{/* Clicking a link will open a new scene each time */}</div>
                <p>
                  <Link to="/s1" target="_blank">
                    New Recipe Window
                  </Link>
                </p>
                <div>{/* Clicking a button will only open one scene */}</div>
                <p>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window 
                      initScene("step1", prevConfig => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/s1`, "step1");
                    }}>
                    Reload Existing Recipe
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