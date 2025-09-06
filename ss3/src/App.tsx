import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SecondPage from "./SecondPage";
import { initScene } from "@webspatial/react-sdk";

// import recipe steps for che bap below 
import Step1 from "./che-bap/step1"; 
import Step2 from "./che-bap/step2"; 
import Step3 from "./che-bap/step3"; 
import Step4 from "./che-bap/step4"; 
import Step5 from "./che-bap/step5"; 
import Step6 from "./che-bap/step6"; 
import Step7 from "./che-bap/step7"; 
import Step8 from "./che-bap/step8"; 
import Step9 from "./che-bap/step9"; 
import Step10 from "./che-bap/step10"; 
import Step11 from "./che-bap/step11"; 



type Ingredient = {
  name: string;
  checked: boolean;
};
function App() {
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
    <>
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <div>{/* Routing for steps to make Chè Bắp */}</div>
        <Route path="/s1" element={<Step1 />} />
        <Route path="/s2" element={<Step2 />} />
        <Route path="/s3" element={<Step3 />} />
        <Route path="/s4" element={<Step4 />} />
        <Route path="/s5" element={<Step5 />} />
        <Route path="/s6" element={<Step6 />} />
        <Route path="/s7" element={<Step7 />} />
        <Route path="/s8" element={<Step8 />} />
        <Route path="/s9" element={<Step9 />} />
        <Route path="/s10" element={<Step10 />} />
        <Route path="/s11" element={<Step11 />} />

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
                <h2>Let's begin cooking Bà Nội’s Chè Bắp 🌽!</h2>
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