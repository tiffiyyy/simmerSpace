import { useNavigate } from "react-router-dom";
import "../App.css";

function Step11() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 11</h1>
      <div className="card">
        <p>Once the chè clears up, it'll be done </p>
        <button onClick={() => navigate("/")}>Return Home</button>
      </div>
    </div>
  );
}

export default Step11;
