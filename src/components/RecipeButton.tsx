import React from "react";
import { initScene } from "@webspatial/react-sdk";

// creating a struct: RecipeButtonProps (to store info for main menu buttons)
interface RecipeButtonProps {
  recipeId: string;
  recipeName: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  estimatedTime?: number;
  difficulty?: number;
  englishName?: string;
}

// creating a React component (FC = functional component), using info from RecipeButtonProps interface
const RecipeButton: React.FC<RecipeButtonProps> = ({
  recipeId,
  recipeName,
  imageUrl,
  imageAlt,
  estimatedTime,
  englishName,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    {
      /* prevents page from reloading */
    }
    e.preventDefault();

    // Initialize scene with proper sizing
    initScene("ingredients", (prevConfig) => {
      return {
        ...prevConfig,
        defaultSize: {
          width: 500,
          height: 500,
        },
      };
    });

    // Open new window with recipe ingredients
    // setTimeout(() => {
    //   window.open(
    //     `${__XR_ENV_BASE__}/recipe/${recipeId}/ingredients`,
    //     `ingredients${recipeId
    //       .replace(/-/g, "")
    //       .replace(/\b\w/g, (l) => l.toUpperCase())}`
    //   );
    // }, 0);
    // Navigate to recipe ingredients on the same page
    setTimeout(() => {
      const basePath = __XR_ENV_BASE__ === '/' ? '' : __XR_ENV_BASE__;
      window.location.href = `${basePath}/recipe/${recipeId}/ingredients`;
    }, 0);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      {/* Display recipe image if available */}
      {imageUrl && (
        <div className="recipe-image-container">
          <img
            src={imageUrl}
            alt={imageAlt || recipeName}
            className="recipe-image"
          />
        </div>
      )}
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipeName}</h3>
        {englishName && (
          <p className="recipe-english-name">{englishName}</p>
        )}
        
        <div className="recipe-meta">
          <div className="recipe-time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#999" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>
              {estimatedTime ? (
                estimatedTime >= 60 
                  ? `${Math.round(estimatedTime / 60)} hr${Math.round(estimatedTime / 60) > 1 ? 's' : ''}`
                  : `${estimatedTime} min`
              ) : 'N/A'}
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RecipeButton;
