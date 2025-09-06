import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import "./App.css";

function step9() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 5</h1>
      <div className="card">
        <p>combine the tapioca starch into a cup of water to loosen/dissolve the starch</p>
        <button onClick={() => navigate('/step10')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step9;