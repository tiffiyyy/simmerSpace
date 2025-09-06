import { useNavigate } from 'react-router-dom';
import "../App.css";

function Step3() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 3</h1>
      <div className="card">
        <p>boil the cobs for 10-15 mins</p>
        <p><strong>note</strong>: this is to infuse the water with corn flavoring and scents</p>
        <button onClick={() => navigate('/s4')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default Step3;