import React from 'react';
import { initScene } from "@webspatial/react-sdk";

interface RecipeButtonProps {
  recipeId: string;
  recipeName: string;
  imageUrl?: string;
  imageAlt?: string;
}

const RecipeButton: React.FC<RecipeButtonProps> = ({ 
  recipeId, 
  recipeName, 
  imageUrl, 
  imageAlt 
}) => {
  const handleClick = (e: React.MouseEvent) => {
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
    setTimeout(() => {
      window.open(
        `${__XR_ENV_BASE__}/recipe/${recipeId}/ingredients`,
        `ingredients${recipeId.replace(/-/g, '').replace(/\b\w/g, l => l.toUpperCase())}`
      );
    }, 0);
  };

  return (
    <button onClick={handleClick}>
      {recipeName}
      {/* Display recipe image if available */}
      {imageUrl && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <img 
            src={imageUrl} 
            alt={imageAlt || recipeName}
            style={{ 
              maxWidth: "300px", 
              height: "auto", 
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          />
        </div>
      )}
    </button>
  );
};

export default RecipeButton;
