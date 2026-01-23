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
      setLoading(true);
      const response = await storiesAPI.getAll();
      console.log('Stories loaded:', response.data);
      setStories(response.data || []);
      setError('');
    } catch (err) {
      console.error('Failed to load stories:', err);
      setError(err.message || 'Failed to load stories from database');
      setStories([]);
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
        <p>Loading your stories from database...</p>
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
              New Fiction
            </Link>
            <Link to="/generate/biography" className="btn btn-primary">
              New Biography
            </Link>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error loading stories:</strong> {error}
            <button onClick={loadStories} className="btn btn-sm btn-secondary" style={{marginLeft: '1rem'}}>Retry</button>
          </div>
        )}

        {stories.length === 0 && !error ? (
          <div className="empty-state">
            <div className="empty-icon">
              <img src="/logo.PNG" alt="GhostWriter" style={{ width: '250px', height: 'auto', opacity: 0.3 }} />
            </div>
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
        ) : stories.length > 0 ? (
          <div className="stories-grid">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-type-badge">
                  {story.story_type || 'fiction'} | {story.length_type || 'unknown'}
                </div>
                <h3>{story.title || 'Untitled Story'}</h3>
                <p className="story-meta">
                  {story.credits_cost || 0} credits | Created {new Date(story.created_at).toLocaleDateString()}
                </p>
                {story.generation_status && (
                  <p className="story-status" style={{
                    color: story.generation_status === 'complete' ? 'var(--success)' : 
                           story.generation_status === 'generating' ? 'var(--cyan)' : 'var(--error)',
                    fontWeight: 'bold',
                    marginTop: '0.5rem'
                  }}>
                    Status: {story.generation_status}
                  </p>
                )}
                <div className="story-actions">
                  <Link to={`/stories/${story.id}`} className="btn btn-secondary btn-sm">
                    View Story
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
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;