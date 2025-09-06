import { useNavigate } from 'react-router-dom';
import "../App.css";

function Step8() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 8</h1>
      <div className="card">
        <p>now make the tapioca starch mixture</p>
        <button onClick={() => navigate('/s9')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default Step8;