import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCreditPacks, purchaseCredits, getCreditBalance, getTransactions } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import CreditsDisplay from '../components/CreditsDisplay'
import '../styles/credits-page.css'

const Credits = () => {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [packs, setPacks] = useState([])
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packsData, balanceData, transactionsData] = await Promise.all([
          getCreditPacks(),
          getCreditBalance(),
          getTransactions(10)
        ])
        setPacks(packsData)
        setBalance(balanceData)
        setTransactions(transactionsData)
      } catch (error) {
        console.error('Failed to fetch credits data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePurchase = async (packKey) => {
    setPurchasing(packKey)
    try {
      const response = await purchaseCredits(packKey)
      if (response.checkout_url) {
        window.location.href = response.checkout_url
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
              <span className="balance-value neon-text">{balance.total_purchased}</span>
            </div>
            <div className="balance-stat">
              <span className="balance-label">Total Spent</span>
              <span className="balance-value">{balance.total_spent}</span>
            </div>
          </div>
        )}
      </div>

      {/* Credit Packs */}
      <div className="packs-section">
        <h2 className="section-title">Choose Your Pack</h2>
        <div className="packs-grid">
          {packs.map((pack) => {
            const priceInDollars = pack.price / 100
            const hasBonus = pack.bonus && pack.bonus > 0
            
            return (
              <div key={pack.key} className={`pack-card ${pack.popular ? 'popular' : ''}`}>
                {pack.popular && <div className="popular-badge">MOST POPULAR</div>}
                {hasBonus && <div className="bonus-badge">+{pack.bonus}% BONUS</div>}
                
                <div className="pack-header">
                  <h3 className="pack-name">{pack.name}</h3>
                  <div className="pack-price">
                    <span className="price-symbol">$</span>
                    <span className="price-amount">{priceInDollars.toFixed(2)}</span>
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
                    onClick={() => handlePurchase(pack.key)}
                    disabled={purchasing === pack.key}
                    className="pack-buy-btn neon-btn"
                  >
                    {purchasing === pack.key ? 'Processing...' : 'Buy Now'}
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
            <span className="usage-text">Short Story: ~25 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📚</span>
            <span className="usage-text">Novella: ~50 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📕</span>
            <span className="usage-text">Novel: ~100 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">🎨</span>
            <span className="usage-text">Book Cover: ~10 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">📄</span>
            <span className="usage-text">Export (ePub/PDF): ~5 credits</span>
          </div>
          <div className="usage-item">
            <span className="usage-icon">✍️</span>
            <span className="usage-text">Blurb/Bio: ~5 credits</span>
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