import { useNavigate } from "react-router-dom";
import "../App.css";

function Step7() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 7</h1>
      <div className="card">
        <p>Continue to add sugar to taste</p>
        <button onClick={() => navigate("/s8")}>Next Step</button>
      </div>
    </div>
  );
}

export default Step7;
