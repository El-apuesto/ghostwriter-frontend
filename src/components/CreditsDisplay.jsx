import React, { useState, useEffect } from 'react'
import { creditsAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import '../styles/credits.css'

const ADMIN_EMAIL = 'thecitieschoice@gmail.com'

const CreditsDisplay = () => {
  const { user } = useAuth()
  const [credits, setCredits] = useState(user?.credits_balance || 0)
  const [loading, setLoading] = useState(false)

  const fetchCredits = async () => {
    // Admin gets unlimited credits
    if (user?.email === ADMIN_EMAIL) {
      setCredits(999999)
      return
    }

    try {
      setLoading(true)
      const response = await creditsAPI.getBalance()
      setCredits(response.data.credits_balance)
    } catch (error) {
      console.error('Failed to fetch credits:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCredits()
    }
  }, [user])

  return (
    <div className="credits-display">
      <div className="credits-icon">⚡</div>
      <div className="credits-info">
        <div className="credits-label">Credits</div>
        <div className="credits-amount neon-text">
          {loading ? '...' : credits.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default CreditsDisplay
