import "./App.css";
// import routing components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import webspatial SDK
//import { initScene } from "@webspatial/react-sdk";

// import recipe steps and ingredients below
import Steps from "./steps.js";
import Ingredients from "./ingredients.js";
import Timer from "./timer.js";

// import recipes data
import recipesData from "./recipes.json";

// import modular components
import RecipeButton from "./components/RecipeButton.js";
import StartPage from "./startPage.js";

function App() {
  // Get the image URL from the recipe data
  const getImageUrl = (imagePath: string) => {
    // Convert relative path to import URL for Vite
    return new URL(imagePath, import.meta.url).href;
  };



  return (
    <>
      <Router basename={__XR_ENV_BASE__}>
        <Routes>
          {/* route to ingredients page */}
          <Route
            path={`/recipe/:recipeId/ingredients`}
            element={<Ingredients />}
          />
          {/* route to recipe page */}
          <Route path={`/recipe/:recipeId/step/:stepNumber`} element={<Steps />} />
          {/* route to timer page */}
          <Route path={`/timer/:recipeId/:stepNumber/:duration`} element={<Timer />} />
          {/* route to start page */}
          <Route path="/" element={<StartPage />} />
          {/* route to recipe selection */}
          <Route
            path="/recipes"
            element={
              <>
                {/* new code for main menu here */}
                <div className="card" style={{ marginTop: "0px" }}>
                  <h2>Choose Your Recipe</h2>
                  {/* <YouTubePlayer videoId="dQw4w9WgXcQ" /> */}
                  {/* <button onClick={() => openYouTube("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>Open YouTube</button> */}
                  {/* Clicking a link will open a new scene each time */}

                  {/* Render all recipe buttons dynamically */}
                  <div className="recipe-grid">
                    {recipesData.map((recipe) => {
                      return (
                        <RecipeButton
                          key={recipe.id}
                          recipeId={recipe.id}
                          recipeName={recipe.name}
                          imageUrl={recipe.image ? getImageUrl(recipe.image) : undefined}
                          imageAlt={recipe.name}
                        />
                      );
                    })}
                  </div>

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
