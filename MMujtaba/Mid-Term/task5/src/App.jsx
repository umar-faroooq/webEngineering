import { useState } from 'react';
import './App.css';

function App() {
  // We use the useState hook to keep track of our counter.
  // It starts at 0, and 'setCount' is the function we use to update it.
  const [count, setCount] = useState(0);

  // A simple function to increase the counter
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter-container">
      <h2>React State Management</h2>
      <p>A simple counter using the useState hook.</p>
      
      {/* Displaying our current count */}
      <div className="count-display">
        {count}
      </div>
      
      {/* Button that runs our handleIncrement function when clicked */}
      <button onClick={handleIncrement} className="increment-btn">
        Increment Counter
      </button>
    </div>
  );
}

export default App;
