import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <h1>👤 {user?.name}</h1>
            <p>{user?.email}</p>
          </div>
          <div className="credits-display">
            <div className="credits-icon">⚡</div>
            <div>
              <div className="credits-label">Available Credits</div>
              <div className="credits-value">{user?.credits_balance || 0}</div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links-section">
          <h2>Quick Links</h2>
          <div className="quick-links-grid">
            <a href="/credits" className="quick-link-card">
              <span className="link-icon">💳</span>
              <span>Buy Credits</span>
            </a>
            <a href="/dashboard" className="quick-link-card">
              <span className="link-icon">📊</span>
              <span>Dashboard</span>
            </a>
            <a href="/instructions" className="quick-link-card">
              <span className="link-icon">📖</span>
              <span>Instructions</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
