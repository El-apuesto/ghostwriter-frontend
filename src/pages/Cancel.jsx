import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Cancel() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <Header />
      
      <main className="cancel-main">
        <div className="cancel-content">
          <h1 className="cancel-title">💀 Payment Cancelled</h1>
          <p className="cancel-message">
            The spirits understand... your wallet is sacred too.
          </p>
          <p className="cancel-note">
            No charges were made. The ghosts are still waiting if you change your mind.
          </p>
          <button className="neon-button" onClick={() => navigate('/')}>
            Return to the Void
          </button>
        </div>
      </main>
      
      <footer className="footer">
        <p>© 2025 GhostWriter</p>
      </footer>
    </div>
  )
}

export default Cancel