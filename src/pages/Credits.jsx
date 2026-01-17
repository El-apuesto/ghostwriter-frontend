import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { creditsAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import CreditsDisplay from '../components/CreditsDisplay'
import '../styles/credits-page.css'

const Credits = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [packs, setPacks] = useState([])
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packsRes, balanceRes, transactionsRes] = await Promise.all([
          creditsAPI.getPacks(),
          creditsAPI.getBalance(),
          creditsAPI.getTransactions(10)
        ])
        setPacks(packsRes.data)
        setBalance(balanceRes.data)
        setTransactions(transactionsRes.data)
      } catch (error) {
        console.error('Failed to fetch credits data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePurchase = async (packId) => {
    setPurchasing(packId)
    try {
      const response = await creditsAPI.purchase(packId)
      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Failed to initiate purchase. Please try again.')
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
        {balance && (
          <div className="balance-stats">
            <div className="balance-stat">
              <span className="balance-label">Total Purchased</span>
              <span className="balance-value neon-text">{balance.total_purchased || 0}</span>
            </div>
            <div className="balance-stat">
              <span className="balance-label">Total Spent</span>
              <span className="balance-value">{balance.total_spent || 0}</span>
            </div>
          </div>
        )}
      </div>

      {/* Credit Packs */}
      <div className="packs-section">
        <h2 className="section-title">Choose Your Pack</h2>
        <div className="packs-grid">
          {packs.map((pack) => {
            const hasBonus = pack.bonus_percent && pack.bonus_percent > 0
            
            return (
              <div key={pack.id} className={`pack-card ${pack.popular ? 'popular' : ''}`}>
                {pack.popular && <div className="popular-badge">MOST POPULAR</div>}
                {hasBonus && <div className="bonus-badge">+{pack.bonus_percent}% BONUS</div>}
                
                <div className="pack-header">
                  <h3 className="pack-name">{pack.name}</h3>
                  <div className="pack-price">
                    <span className="price-symbol">$</span>
                    <span className="price-amount">{pack.price}</span>
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
                    onClick={() => handlePurchase(pack.id)}
                    disabled={purchasing === pack.id}
                    className="pack-buy-btn neon-btn"
                  >
                    {purchasing === pack.id ? 'Processing...' : 'Buy Now'}
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
            <span className="usage-text">Fiction Sample: FREE</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📖</span>
            <span className="usage-text">Biography Sample: FREE</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📘</span>
            <span className="usage-text">Fiction Novella: 50 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📗</span>
            <span className="usage-text">Fiction Novel: 100 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📕</span>
            <span className="usage-text">Biography Short: 75 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📙</span>
            <span className="usage-text">Biography Standard: 150 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📚</span>
            <span className="usage-text">Biography Comprehensive: 200 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">🎨</span>
            <span className="usage-text">Book Cover: 15-30 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📄</span>
            <span className="usage-text">Export ePub/MOBI: 10 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📄</span>
            <span className="usage-text">Export KDP PDF: 15 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">✍️</span>
            <span className="usage-text">Marketing Blurb: 20 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">✍️</span>
            <span className="usage-text">Author Bio: 15 credits</span>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      {transactions.length > 0 && (
        <div className="transactions-section">
          <h2 className="section-title">Recent Transactions</h2>
          <div className="transactions-table">
            {transactions.map((tx) => (
              <div key={tx.id} className="transaction-row">
                <div className="transaction-details">
                  <span className="transaction-type">{tx.transaction_type}</span>
                  <span className="transaction-desc">{tx.description}</span>
                  <span className="transaction-date">
                    {new Date(tx.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="transaction-amount">
                  <span className={tx.amount > 0 ? 'amount-positive' : 'amount-negative'}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Credits
