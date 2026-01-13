import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const Dashboard = () => {
  const { user, credits, updateCredits } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStories();
    updateCredits();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await api.get('/stories');
      setStories(response.data);
    } catch (err) {
      setError('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (storyId) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;

    try {
      await api.delete(`/stories/${storyId}`);
      setStories(stories.filter(s => s.id !== storyId));
    } catch (err) {
      alert('Failed to delete story');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Welcome back, {user?.name}</p>
          </div>
          <div className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-icon">⚡</span>
              <div>
                <div className="stat-value">{credits}</div>
                <div className="stat-label">Credits</div>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📚</span>
              <div>
                <div className="stat-value">{stories.length}</div>
                <div className="stat-label">Stories</div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-cards">
          <Link to="/fiction" className="action-card">
            <div className="action-icon">📖</div>
            <h3>Generate Fiction</h3>
            <p>Create a complete novel with AI</p>
            <span className="action-cost">100-200 credits</span>
          </Link>
          <Link to="/biography" className="action-card">
            <div className="action-icon">👤</div>
            <h3>Write Biography</h3>
            <p>Generate a compelling life story</p>
            <span className="action-cost">150 credits</span>
          </Link>
          <Link to="/profile" className="action-card">
            <div className="action-icon">💳</div>
            <h3>Buy Credits</h3>
            <p>Purchase more credits to continue</p>
          </Link>
        </div>

        <div className="stories-section">
          <h2 className="section-title">Your Stories</h2>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : stories.length === 0 ? (
            <div className="empty-state">
              <p>No stories yet. Start creating!</p>
            </div>
          ) : (
            <div className="stories-grid">
              {stories.map((story) => (
                <div key={story.id} className="story-card">
                  <div className="story-header">
                    <h3 className="story-title">{story.title}</h3>
                    <span className="story-type">{story.type}</span>
                  </div>
                  <p className="story-description">{story.description?.substring(0, 150)}...</p>
                  <div className="story-meta">
                    <span className="story-date">{new Date(story.created_at).toLocaleDateString()}</span>
                    <span className="story-status">{story.status}</span>
                  </div>
                  <div className="story-actions">
                    <button className="btn btn-sm btn-outline">View</button>
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button onClick={() => handleDelete(story.id)} className="btn btn-sm btn-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;