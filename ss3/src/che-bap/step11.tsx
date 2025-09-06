import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import "./App.css";

function step11() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 5</h1>
      <div className="card">
        <p>11. once the chè clears up, it’ll be done </p>
        <button onClick={() => navigate('/')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step11;