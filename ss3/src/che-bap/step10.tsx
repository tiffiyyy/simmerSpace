import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import "./App.css";

function step10() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 5</h1>
      <div className="card">
        <p>pour the mixture into the pot and stir for 10-15 mins until the chè thickens</p>
        <button onClick={() => navigate('/step11')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step10;