import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMyStories, getCreditBalance, getTransactions } from '../utils/api'
import CreditsDisplay from '../components/CreditsDisplay'
import '../styles/dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()
  const [stories, setStories] = useState([])
  const [credits, setCredits] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storiesData, creditsData, transactionsData] = await Promise.all([
          getMyStories(5, 0),
          getCreditBalance(),
          getTransactions(5)
        ])
        setStories(storiesData)
        setCredits(creditsData)
        setTransactions(transactionsData)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="neon-text">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="neon-text">Welcome back, {user?.full_name || user?.email}!</h1>
        <p className="dashboard-subtitle">Your creative command center</p>
      </div>

      <div className="dashboard-grid">
        {/* Credits Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>💳 Credits</h2>
            <Link to="/credits" className="card-link">Manage</Link>
          </div>
          <div className="card-content">
            <CreditsDisplay />
            {credits && (
              <div className="credits-stats">
                <div className="stat">
                  <span className="stat-label">Total Purchased:</span>
                  <span className="stat-value">{credits.total_purchased}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Total Spent:</span>
                  <span className="stat-value">{credits.total_spent}</span>
                </div>
              </div>
            )}
            <Link to="/credits" className="neon-btn btn-small">
              Buy Credits
            </Link>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>✨ Quick Actions</h2>
          </div>
          <div className="card-content">
            <div className="action-buttons">
              <Link to="/fiction" className="action-btn">
                <span className="action-icon">📖</span>
                <span>Generate Fiction</span>
              </Link>
              <Link to="/biography" className="action-btn">
                <span className="action-icon">📝</span>
                <span>Generate Biography</span>
              </Link>
              <Link to="/library" className="action-btn">
                <span className="action-icon">📚</span>
                <span>View Library</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Stories Card */}
        <div className="dashboard-card full-width">
          <div className="card-header">
            <h2>📚 Recent Stories</h2>
            <Link to="/library" className="card-link">View All</Link>
          </div>
          <div className="card-content">
            {stories.length === 0 ? (
              <div className="empty-state">
                <p>No stories yet. Start creating!</p>
                <Link to="/fiction" className="neon-btn btn-small">
                  Create Your First Story
                </Link>
              </div>
            ) : (
              <div className="stories-list">
                {stories.map((story) => (
                  <div key={story.id} className="story-item">
                    <div className="story-info">
                      <h3 className="story-title">{story.title}</h3>
                      <div className="story-meta">
                        <span className="story-type">{story.story_type}</span>
                        <span className="story-length">{story.length_type}</span>
                        <span className="story-date">
                          {new Date(story.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link to={`/story/${story.id}`} className="view-btn">
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions Card */}
        <div className="dashboard-card full-width">
          <div className="card-header">
            <h2>💰 Recent Transactions</h2>
          </div>
          <div className="card-content">
            {transactions.length === 0 ? (
              <div className="empty-state">
                <p>No transactions yet</p>
              </div>
            ) : (
              <div className="transactions-list">
                {transactions.map((tx) => (
                  <div key={tx.id} className="transaction-item">
                    <div className="transaction-info">
                      <span className="transaction-type">{tx.transaction_type}</span>
                      <span className="transaction-desc">{tx.description}</span>
                    </div>
                    <div className="transaction-amount">
                      <span className={tx.amount > 0 ? 'positive' : 'negative'}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard