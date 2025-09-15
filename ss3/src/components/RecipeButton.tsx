import React from "react";
import { initScene } from "@webspatial/react-sdk";

// creating a struct: RecipeButtonProps (to store info for main menu buttons)
interface RecipeButtonProps {
  recipeId: string;
  recipeName: string;
  imageUrl?: string;
  imageAlt?: string;
}

// creating a React component (FC = functional component), using info from RecipeButtonProps interface
const RecipeButton: React.FC<RecipeButtonProps> = ({
  recipeId,
  recipeName,
  imageUrl,
  imageAlt,
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
      window.location.href = `${__XR_ENV_BASE__}/recipe/${recipeId}/ingredients`;
    }, 0);
  };

  return (
    <button className="recipe-button">
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
      <h3> {recipeName}</h3>
      <button className="start-button" onClick={handleClick}>
        Start Cooking!
      </button>
    </button>
  );
};

export default RecipeButton;
