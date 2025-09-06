import { useNavigate } from 'react-router-dom';
import "../App.css";

function Step9() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 9</h1>
      <div className="card">
        <p>combine the tapioca starch into a cup of water to loosen/dissolve the starch</p>
        <button onClick={() => navigate('/s10')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default Step9;