import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import "./App.css";

function step7() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 5</h1>
      <div className="card">
        <p>continue to add sugar to taste</p>
        <button onClick={() => navigate('/step8')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step7;