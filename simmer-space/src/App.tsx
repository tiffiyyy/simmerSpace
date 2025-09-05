import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SecondPage from "./SecondPage";
import { initScene } from "@webspatial/react-sdk";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route
          path="/"
          element={
          <>
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
            <div className="card" style={{ marginTop: "0px" }}>
                <h2>Open Second Page</h2>
                <div>{/* Clicking a link will open a new scene each time */}</div>
                <p>
                  <Link to="/second-page" target="_blank">
                    Open Second Page with a Link
                  </Link>
                </p>
                <div>{/* Clicking a button will only open one scene */}</div>
                <p>
                  <button
                    onClick={() => {
                      // before scene opens, resize the secondScene window 
                      initScene("secondScene", prevConfig => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
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
  )
}

export default App
