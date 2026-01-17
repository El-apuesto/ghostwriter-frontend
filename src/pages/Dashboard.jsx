import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storiesAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await storiesAPI.getAll();
      setStories(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this story?')) return;
    try {
      await storiesAPI.delete(id);
      setStories(stories.filter(s => s.id !== id));
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}!</h1>
          <div>
            <Link to="/fiction" className="btn btn-primary">+ Fiction</Link>
            <Link to="/biography" className="btn btn-secondary">+ Biography</Link>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {stories.length === 0 ? (
          <div className="empty-state">
            <h2>No stories yet</h2>
            <Link to="/fiction" className="btn btn-primary">Create First Story</Link>
          </div>
        ) : (
          <div className="stories-grid">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                <h3>{story.title || 'Untitled'}</h3>
                <p>{story.content?.substring(0, 100)}...</p>
                <div className="story-actions">
                  <Link to={`/stories/${story.id}`} className="btn btn-small">View</Link>
                  <button onClick={() => handleDelete(story.id)} className="btn btn-small btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
