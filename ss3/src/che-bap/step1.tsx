import { useNavigate } from "react-router-dom";
import "../App.css";

function Step1() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 1</h1>
      <div className="card">
        <p>Strip the corn until it's just the cob </p>
        <button onClick={() => navigate("/s2")}>Next Step</button>
      </div>
    </div>
  );
}

export default Step1;
