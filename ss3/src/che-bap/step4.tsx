import { useNavigate } from "react-router-dom";
import "../App.css";

function Step4() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 4</h1>
      <div className="card">
        <p>Remove the cobs and put in the corn bits </p>
        <button onClick={() => navigate("/s5")}>Next Step</button>
      </div>
    </div>
  );
}

export default Step4;
