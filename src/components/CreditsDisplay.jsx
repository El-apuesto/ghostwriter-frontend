import React, { useState, useEffect } from 'react'
import { getCreditBalance } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import '../styles/credits.css'

const CreditsDisplay = () => {
  const { user } = useAuth()
  const [credits, setCredits] = useState(user?.credits_balance || 0)
  const [loading, setLoading] = useState(false)

  const fetchCredits = async () => {
    try {
      setLoading(true)
      const data = await getCreditBalance()
      setCredits(data.credits_balance)
    } catch (error) {
      console.error('Failed to fetch credits:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCredits()
  }, [])

  return (
    <div className="credits-display">
      <div className="credits-icon">⚡</div>
      <div className="credits-info">
        <div className="credits-label">Credits</div>
        <div className="credits-amount neon-text">
          {loading ? '...' : credits}
        </div>
      </div>
    </div>
  )
}

export default CreditsDisplay