import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>React Counter App</h2>
        <h3>By: Ghulam Muhammad</h3>

        <p>Count: {count}</p>

        <button style={{ backgroundColor: '#00ff26', color: 'white' }} onClick={() => setCount(count + 1)}>Increment</button>
        <button style={{ backgroundColor: '#FF0000', color: 'white' }}onClick={() => setCount(count - 1)}>Decrement</button>
      </div>
    </div>
   
  );
}

export default App;
