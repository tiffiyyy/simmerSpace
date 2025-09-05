import { useState } from "react";
import "./App.css";
import { useNavigate } from 'react-router-dom';

function ThirdPage() {
  const navigate = useNavigate();

  // adds a new page 
  return (
    <div className="App">
      <h1>Step 2</h1>
      <div className="card">
        <button onClick={() => navigate('/fourth-page')}>
          Go to Step 3
        </button>
      </div>
    </div>
  );
}

export default ThirdPage;