import { useNavigate } from 'react-router-dom';
import "../App.css";

function Step6() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 6</h1>
      <div className="card">
        <p>add the cup of sugar and stir</p>
        <button onClick={() => navigate('/s7')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default Step6;