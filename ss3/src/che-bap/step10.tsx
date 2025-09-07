import { useNavigate } from "react-router-dom";
import "../App.css";

function Step10() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 10</h1>
      <div className="card">
        <p>
          Pour the mixture into the pot and stir for 10-15 mins until the chè
          thickens
        </p>
        <button onClick={() => navigate("/s11")}>Next Step</button>
      </div>
    </div>
  );
}

export default Step10;
