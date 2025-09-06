import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import "./App.css";

function step5() {
    const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Step 5</h1>
      <div className="card">
        <p>boil the corn bits for 10-15 mins</p>
        <p><strong>note</strong>: this time may differ depending on the quality/freshness of the corn</p>
        <button onClick={() => navigate('/step6')}>
          next step
        </button>
      </div>
    </div>
  );
}

export default step5;