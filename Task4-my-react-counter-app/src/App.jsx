import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1>First React App - Ghulam Muhammad</h1>
      <h2>Counter App</h2>
      <div className="card">
        <button className="Incbtn" onClick={() => setCount((count) => count + 1)}>
          Increamnet
        </button>
        <button className="Decbtn" onClick={() => setCount((count) => count - 1)}>
          Decreament
        </button>
        <p>
          You clicked {count} times
        </p>
      </div>
      
    </>
  )
}

export default App
