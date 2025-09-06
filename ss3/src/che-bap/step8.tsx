import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import "./App.css";

function step8() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 5</h1>
      <div className="card">
        <p>now make the tapioca starch mixture</p>
        <button onClick={() => navigate('/step9')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step8;