import { useState } from "react";
import "./App.css";
import { useNavigate } from 'react-router-dom';

function SecondPage() {
  const navigate = useNavigate();

  // adds a new page 
  return (
    <div className="App">
      <h1>Step 1</h1>
      <div className="card">
        <button onClick={() => navigate('/third-page')}>
          Go to Step 2
        </button>
      </div>
    </div>
  );
}

export default SecondPage;