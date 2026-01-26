import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { paymentsAPI, authAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import CreditsDisplay from '../components/CreditsDisplay'
import '../styles/credits-page.css'

const Credits = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [packages, setPackages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await paymentsAPI.getPackages()
        setPackages(response.pricing || response.packages)
      } catch (error) {
        console.error('Failed to fetch packages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()

    // Check for payment success/cancel
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    
    if (success) {
      alert('🎉 Payment successful! Your credits have been added.')
      // Refresh user data
      authAPI.getMe().then(data => {
        if (updateUser) updateUser(data)
      })
    } else if (canceled) {
      alert('Payment was canceled. No charges were made.')
    }
  }, [searchParams, updateUser])

  const handlePurchase = async (packageName) => {
    setPurchasing(packageName)
    try {
      const response = await paymentsAPI.createCheckout(packageName)
      if (response.checkout_url) {
        window.location.href = response.checkout_url
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      alert(error.message || 'Failed to initiate purchase. Please try again.')
      setPurchasing(null)
    }
  }

  if (loading) {
    return (
      <div className="credits-page-container">
        <div className="neon-text">Loading credits...</div>
      </div>
    )
  }

  return (
    <div className="credits-page-container">
      <div className="credits-page-header">
        <h1 className="neon-text">💳 Credit Store</h1>
        <p className="credits-page-subtitle">Power your creativity with credits</p>
      </div>

      {/* Current Balance */}
      <div className="balance-section">
        <CreditsDisplay />
        {user && (
          <div className="balance-stats">
            <div className="balance-stat">
              <span className="balance-label">Total Purchased</span>
              <span className="balance-value neon-text">{user.total_credits_purchased || 0}</span>
            </div>
            <div className="balance-stat">
              <span className="balance-label">Total Spent</span>
              <span className="balance-value">{user.total_credits_spent || 0}</span>
            </div>
          </div>
        )}
      </div>

      {/* Credit Packs */}
      <div className="packs-section">
        <h2 className="section-title">Choose Your Pack</h2>
        <div className="packs-grid">
          {packages && Object.entries(packages).map(([key, pack]) => {
            const isPopular = key === 'creator'
            
            return (
              <div key={key} className={`pack-card ${isPopular ? 'popular' : ''}`}>
                {isPopular && <div className="popular-badge">MOST POPULAR</div>}
                
                <div className="pack-header">
                  <h3 className="pack-name">{pack.name}</h3>
                  <div className="pack-price">
                    <span className="price-symbol">$</span>
                    <span className="price-amount">{pack.price_usd}</span>
                  </div>
                </div>

                <div className="pack-content">
                  <div className="pack-credits">
                    <span className="credits-number neon-text">{pack.credits}</span>
                    <span className="credits-label">Credits</span>
                  </div>

                  {pack.description && (
                    <p className="pack-description">{pack.description}</p>
                  )}

                  <button
                    onClick={() => handlePurchase(key)}
                    disabled={purchasing === key}
                    className="pack-buy-btn neon-btn"
                  >
                    {purchasing === key ? 'Processing...' : 'Buy Now'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pricing Info */}
      <div className="pricing-info">
        <h3>💡 Credit Usage Guide</h3>
        <div className="usage-grid">
          <div className="usage-item">
            <span className="usage-icon">📖</span>
            <span className="usage-text">Short Story: FREE</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📘</span>
            <span className="usage-text">Novella (45k words): 50 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📗</span>
            <span className="usage-text">Novel (90k words): 100 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📚</span>
            <span className="usage-text">Epic Novel (140k words): 150 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📕</span>
            <span className="usage-text">Short Memoir: 75 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📙</span>
            <span className="usage-text">Standard Biography: 150 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📚</span>
            <span className="usage-text">Comprehensive Biography: 200 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">🎨</span>
            <span className="usage-text">AI Cover: 10 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">🖼️</span>
            <span className="usage-text">Print Cover: 15 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📄</span>
            <span className="usage-text">EPUB Export: 5 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📄</span>
            <span className="usage-text">PDF Export: 10 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📝</span>
            <span className="usage-text">Blurb: 5 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">✍️</span>
            <span className="usage-text">Author Bio: 3 credits</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credits
