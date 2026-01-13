import React from 'react'
import { useAuth } from '../context/AuthContext'
import CreditsDisplay from '../components/CreditsDisplay'
import '../styles/profile.css'

const Profile = () => {
  const { user } = useAuth()

  if (!user) {
    return <div className="profile-container">Loading...</div>
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="neon-text">Your Profile</h1>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h2>👤 Account Information</h2>
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Full Name:</span>
              <span className="info-value">{user.full_name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Login:</span>
              <span className="info-value">
                {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2>⚡ Credits Overview</h2>
          <div className="profile-credits">
            <CreditsDisplay />
            <div className="credits-details">
              <div className="detail-row">
                <span>Current Balance:</span>
                <span className="neon-text">{user.credits_balance}</span>
              </div>
              <div className="detail-row">
                <span>Total Purchased:</span>
                <span>{user.total_credits_purchased || 0}</span>
              </div>
              <div className="detail-row">
                <span>Total Spent:</span>
                <span>{user.total_credits_spent || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-card full-width">
          <h2>📊 Account Status</h2>
          <div className="profile-stats">
            <div className="stat-box">
              <div className="stat-value neon-text">Active</div>
              <div className="stat-label">Account Status</div>
            </div>
            <div className="stat-box">
              <div className="stat-value neon-text">{user.credits_balance}</div>
              <div className="stat-label">Available Credits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile