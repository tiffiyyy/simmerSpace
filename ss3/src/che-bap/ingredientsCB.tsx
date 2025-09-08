import { useNavigate } from "react-router-dom";
import "../App.css";

function IngredientsCB() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div>
        <h2>Ingredient Checklist</h2>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
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
              initScene("step1", (prevConfig) => {
                return {
                  ...prevConfig,
                  defaultSize: {
                    width: 500,
                    height: 500,
                  },
                };
              });
              window.open(`${__XR_ENV_BASE__}/s1`, "step1");
            }}
          >
            Reload Existing Recipe
          </button>
        </p>
      </div>
    </div>
  );
}

export default IngredientsCB;
