import "./App.css";
// import routing components
import { BrowserRouter, Routes, Route } from "react-router-dom";// import webspatial SDK
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
      <BrowserRouter basename={XR_ENV_BASE}>
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
          <Route path="/webspatial/avp" element={<StartPage />} />
          {/* route to recipe selection */}
          <Route
            path="/recipes"
            element={
              <>
                {/* new code for main menu here */}
                {/* <div className="card count-card" enable-xr style={{ marginTop: "0px" }}> */}
                  <div className="recipe-banner" enable-xr>
                    <h1 className="banner-title">Discover Recipes</h1>
                    <p className="banner-subtitle">Explore Vietnamese Culinary Heritage</p>
                  </div>
                  {/* <YouTubePlayer videoId="dQw4w9WgXcQ" /> */}
                  {/* <button onClick={() => openYouTube("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>Open YouTube</button> */}
                  {/* Clicking a link will open a new scene each time */}

                  {/* Render all recipe buttons dynamically */}
                  <div className="recipe-grid" enable-xr>
                    {recipesData.map((recipe) => {
                      return (
                        <RecipeButton
                          key={recipe.id}
                          recipeId={recipe.id}
                          recipeName={recipe.name}
                          imageUrl={recipe.image ? getImageUrl(recipe.image) : undefined}
                          imageAlt={recipe.name}
                          description={recipe.description}
                          estimatedTime={recipe.estimatedTime}
                          englishName={recipe.englishName}
                        />
                      );
                    })}
                  </div>

                {/* </div> */}
              </>
            }
          />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
