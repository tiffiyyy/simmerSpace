import { useNavigate } from 'react-router-dom';
import "./App.css";

import { useState } from "react";
import "./App.css";

function step1() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 1</h1>
      <div className="card">
        <p>strip the corn until it’s just the cob </p>
        <button onClick={() => navigate('/step2')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step1;