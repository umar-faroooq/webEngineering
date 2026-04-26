import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPosts(data.slice(0, 12));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading fresh stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Could not load posts</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Heading – completely outside any card/border */}
      <header className="page-heading">
        <h1>📢 The Community Corner</h1>
        <p>What people are sharing right now</p>
      </header>

      {/* Posts grid – each post has a black border */}
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-badge">#{post.id}</div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-footer">
              <span>📖 continue reading</span>
              <span>💬 {Math.floor(Math.random() * 40) + 10}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;