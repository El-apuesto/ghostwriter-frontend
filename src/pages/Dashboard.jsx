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
    if (!confirm('Are you sure you want to delete this story?')) return;
    
    try {
      await storiesAPI.delete(id);
      setStories(stories.filter(s => s.id !== id));
    } catch (err) {
      alert('Failed to delete story: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your stories...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p className="subtitle">Your story library</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/fiction" className="btn btn-primary">
            ✍️ New Fiction
          </Link>
          <Link to="/biography" className="btn btn-secondary">
            📖 New Biography
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {stories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👻</div>
          <h2>No stories yet</h2>
          <p>Create your first AI-generated story to get started</p>
          <div className="empty-actions">
            <Link to="/fiction" className="btn btn-primary">
              Generate Fiction
            </Link>
            <Link to="/biography" className="btn btn-secondary">
              Generate Biography
            </Link>
          </div>
        </div>
      ) : (
        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-header">
                <h3>{story.title || 'Untitled Story'}</h3>
                <span className="story-type">
                  {story.story_type === 'fiction' ? '✍️ Fiction' : '📖 Biography'}
                </span>
              </div>
              
              <div className="story-meta">
                <span>📄 {story.word_count?.toLocaleString() || 0} words</span>
                <span>📅 {new Date(story.created_at).toLocaleDateString()}</span>
              </div>

              {story.premise && (
                <p className="story-preview">
                  {story.premise.substring(0, 150)}{story.premise.length > 150 ? '...' : ''}
                </p>
              )}

              <div className="story-actions">
                <Link to={`/story/${story.id}`} className="btn btn-secondary btn-sm">
                  View
                </Link>
                <button 
                  onClick={() => handleDelete(story.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
