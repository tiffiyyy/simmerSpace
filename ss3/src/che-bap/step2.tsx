import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import "./App.css";

function step2() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 2</h1>
      <div className="card">
        <p>place four cups of water into a pot and place the cobs inside </p>
        <button onClick={() => navigate('/step3')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step2;