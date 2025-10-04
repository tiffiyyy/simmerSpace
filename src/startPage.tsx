import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import recipesData from "./recipes.json";
import grannyImg from './assets/granny-stirring-pot.png';

interface Recipe {
  id: string;
  name: string;
  image: string;
  estimatedTime: number;
  description: string;
  ingredients: Array<{ item: string; quantity: string; unit: string }>;
  steps: Array<{ step: string; note: string; time: number }>;
}

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null);

  // Get the image URL from the recipe data
  const getImageUrl = (imagePath: string) => {
    return new URL(imagePath, import.meta.url).href;
  };

  // Randomly select a featured recipe on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * recipesData.length);
    setFeaturedRecipe(recipesData[randomIndex]);
  }, []);

  const handleStartCooking = () => {
    if (featuredRecipe) {
      navigate(`/recipe/${featuredRecipe.id}/ingredients`);
    } else {
      navigate("/recipes");
    }
  };

  const handleDiscoverRecipes = () => {
    navigate("/recipes");
  };

  return (
    <div className="start-page">
      <div className="logo-section">
        <h1 className="logo-title">Simmer Space</h1>
        <p className="logo-tagline">Ignite Your Heritage</p>
      </div>
      <div className="center-image-section">
        <img 
          src={grannyImg} 
          alt="Simmer Space Pot" 
          className="center-image"
        />
      </div>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={handleDiscoverRecipes}>
          <div className="nav-icon">📖</div>
          <span className="nav-text">Discover Recipes</span>
        </button>
      </div>
      <div className="featured-recipe-card">
        <h3 className="card-header">FEATURED RECIPE</h3>
        {featuredRecipe && (
          <>
            <div className="recipe-image-container">
              <img 
                src={featuredRecipe.image ? getImageUrl(featuredRecipe.image) : "/src/assets/images/pho-bo.png"} 
                alt={featuredRecipe.name} 
                className="recipe-image"
              />
            </div>
            <h4 className="recipe-title">{featuredRecipe.name}</h4>
            <button className="start-cooking-btn" onClick={handleStartCooking}>
              START COOKING
            </button>
          </>
        )}
      </div>
      <div className="start-page-content">
        {/* Your fresh start page content goes here */}
      </div>
    </div>
  );
};

export default StartPage;
