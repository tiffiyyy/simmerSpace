import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import "./App.css";

function step6() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 5</h1>
      <div className="card">
        <p>add the cup of sugar and stir</p>
        <button onClick={() => navigate('/step7')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step6;