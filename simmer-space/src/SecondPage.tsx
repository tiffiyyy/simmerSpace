import { useState } from "react";
import "./App.css";

function SecondPage() {
  const [count, setCount] = useState(0);

  // adds a new page 
  return (
    <div className="App">
      <h1>Second Page</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default SecondPage;