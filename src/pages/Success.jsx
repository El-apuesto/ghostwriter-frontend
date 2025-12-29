import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import LoadingOverlay from '../components/LoadingOverlay'

function Success() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const pendingStory = sessionStorage.getItem('pendingStory')
    const pendingBio = sessionStorage.getItem('pendingBiography')

    if (pendingStory || pendingBio) {
      // Simulate generation - in real app, call backend
      setTimeout(() => {
        setGenerating(false)
        sessionStorage.removeItem('pendingStory')
        sessionStorage.removeItem('pendingBiography')
      }, 5000)
    } else {
      setGenerating(false)
    }
  }, [])

  return (
    <div className="page-container">
      <Header />
      
      <main className="success-main">
        {generating ? (
          <LoadingOverlay />
        ) : (
          <div className="success-content">
            <h1 className="success-title">✅ Payment Successful!</h1>
            <p className="success-message">
              Your ghostly tale has been conjured and sent to your email.
            </p>
            <p className="success-note">
              Check your inbox (and spam folder, ghosts like to hide).
            </p>
            <button className="neon-button" onClick={() => navigate('/')}>
              Summon Another Story
            </button>
          </div>
        )}
      </main>
      
      <footer className="footer">
        <p>© 2025 GhostWriter</p>
      </footer>
    </div>
  )
}

export default Success