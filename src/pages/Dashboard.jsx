import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storiesAPI } from '../utils/api';

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const response = await storiesAPI.getAll();
      setStories(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load stories');
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
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Your Stories</h1>
          <div className="dashboard-actions">
            <Link to="/generate/fiction" className="btn btn-primary">
              📝 New Fiction
            </Link>
            <Link to="/generate/biography" className="btn btn-primary">
              📖 New Biography
            </Link>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {stories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👻</div>
            <h2>No stories yet</h2>
            <p>Start by generating your first fiction or biography</p>
            <div className="empty-actions">
              <Link to="/generate/fiction" className="btn btn-primary">
                Create Fiction
              </Link>
              <Link to="/generate/biography" className="btn btn-secondary">
                Create Biography
              </Link>
            </div>
          </div>
        ) : (
          <div className="stories-grid">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-type-badge">
                  {story.story_type === 'fiction' ? '📝' : '📖'} {story.story_type}
                </div>
                <h3>{story.title || 'Untitled Story'}</h3>
                <p className="story-meta">
                  {story.length} • Created {new Date(story.created_at).toLocaleDateString()}
                </p>
                {story.premise && (
                  <p className="story-preview">{story.premise.substring(0, 150)}...</p>
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
    </div>
  );
};

export default Dashboard;
