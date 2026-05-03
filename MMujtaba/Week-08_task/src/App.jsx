import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="app-container">
      <header className="header">
        <h1>User Directory</h1>
      </header>

      <main className="content">
        {isLoading && (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p>Loading users...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>Error loading data: {error}</p>
          </div>
        )}

        {!isLoading && !error && users.length > 0 && (
          <div className="user-list">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-avatar">
                  {user.name.charAt(0)}
                </div>
                <div className="user-info">
                  <h2>{user.name}</h2>
                  <p className="user-email">{user.email}</p>
                  <p className="user-company">{user.company.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && users.length === 0 && (
          <div className="empty-state">
            <p>No users found.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
