import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import IngredientsCB from "./che-bap/ingredientsCB";


function App() {
  return (
    <>
      <Router basename={__XR_ENV_BASE__}>
        <Routes>
          {/* Routing for steps to make Chè Bắp */}
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
          <Route path="/icb" element={<IngredientsCB />} />

          <Route
            path="/"
            element={
              <>
                <div>{/*new code for main menu here*/}</div>
                <div className="card" style={{ marginTop: "0px" }}>
                  <h2>Simmer Space</h2>
                  <div>
                    {/* Clicking a link will open a new scene each time */}
                  </div>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window
                      initScene("ingredientsCB", (prevConfig) => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(`${__XR_ENV_BASE__}/icb`, "ingredientsCB");
                    }}
                  >
                    Chè Bắp Recipe 🌽
                  </button>
                  <p>
                    <Link to="/icb" target="_blank">
                      Chè Bắp Recipe 🌽
                    </Link>
                  </p>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
