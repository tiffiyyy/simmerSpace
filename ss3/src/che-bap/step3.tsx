import { useNavigate } from "react-router-dom";
import "../App.css";

function Step3() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 3</h1>
      <div className="card">
        <p>Boil the cobs for 10-15 mins</p>
        <p>
          <strong>Note</strong>: This is to infuse the water with corn flavoring
          and scents
        </p>
        <button onClick={() => navigate("/s4")}>Next Step</button>
      </div>
    </div>
  );
}

export default Step3;
