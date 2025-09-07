import { useNavigate } from "react-router-dom";
import "../App.css";

function Step5() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 5</h1>
      <div className="card">
        <p>Boil the corn bits for 10-15 mins</p>
        <p>
          <strong>Note</strong>: This time may differ depending on the
          quality/freshness of the corn
        </p>
        <button onClick={() => navigate("/s6")}>Next Step</button>
      </div>
    </div>
  );
}

export default Step5;
