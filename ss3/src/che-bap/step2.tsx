import { useNavigate } from "react-router-dom";
import "../App.css";

function Step2() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 2</h1>
      <div className="card">
        <p>Place four cups of water into a pot and place the cobs inside </p>
        <button onClick={() => navigate("/s3")}>Next Step</button>
      </div>
    </div>
  );
}

export default Step2;
