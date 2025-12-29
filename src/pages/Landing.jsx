import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <Header />
      
      <main className="landing-main">
        <section className="path-selection">
          <h2 className="section-title">What Kind of Story Do You Need?</h2>
          
          <div className="path-cards">
            <div className="path-card" onClick={() => navigate('/fiction')}>
              <div className="card-icon">📚</div>
              <h3 className="card-title">FICTION</h3>
              <ul className="card-features">
                <li>Novels & Novellas</li>
                <li>Horror, Thriller, Mystery</li>
                <li>Sci-Fi & Dark Fantasy</li>
                <li>Sarcastic Dark Comedy</li>
              </ul>
              <button className="neon-button">CREATE FICTION</button>
            </div>

            <div className="path-card" onClick={() => navigate('/biography')}>
              <div className="card-icon">👤</div>
              <h3 className="card-title">BIOGRAPHY</h3>
              <ul className="card-features">
                <li>Life Stories & Memoirs</li>
                <li>Autobiographies</li>
                <li>Personal Histories</li>
                <li>Legacy Documentation</li>
              </ul>
              <button className="neon-button">CREATE BIOGRAPHY</button>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Why GhostWriter?</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">🤖</span>
              <h4>AI-Powered</h4>
              <p>Sarcastic, witty AI fills in what you miss</p>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <h4>Fast Generation</h4>
              <p>Get your story in minutes, not months</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎨</span>
              <h4>Your Vision</h4>
              <p>As detailed or minimal as you want</p>
            </div>
            <div className="feature">
              <span className="feature-icon">💀</span>
              <h4>Dark Humor</h4>
              <p>Stories with personality and bite</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 GhostWriter | Haunting the internet with sarcasm</p>
      </footer>
    </div>
  )
}

export default Landing