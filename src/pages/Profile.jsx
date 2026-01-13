import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Profile = () => {
  const { user, credits, updateCredits } = useAuth();
  const [creditPacks, setCreditPacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetchCreditPacks();
    fetchTransactionHistory();
  }, []);

  const fetchCreditPacks = async () => {
    try {
      const response = await api.get('/credits/packs');
      setCreditPacks(response.data);
    } catch (err) {
      console.error('Failed to load credit packs:', err);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await api.get('/credits/history');
      setTransactionHistory(response.data);
    } catch (err) {
      console.error('Failed to load transaction history:', err);
    }
  };

  const handlePurchase = async (packId) => {
    setLoading(true);
    try {
      const response = await api.post('/credits/purchase', { pack_id: packId });
      const { sessionId } = response.data;

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert('Failed to initiate purchase. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div>
            <h1 className="page-title">Profile</h1>
            <p className="page-subtitle">{user?.email}</p>
          </div>
          <div className="credits-large">
            <span className="credits-icon-lg">⚡</span>
            <span className="credits-amount-lg">{credits}</span>
            <span className="credits-label">Credits</span>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Purchase Credits</h2>
          <div className="credit-packs-grid">
            {creditPacks.map((pack) => (
              <div key={pack.id} className="credit-pack-card">
                <h3>{pack.name}</h3>
                <div className="pack-credits">{pack.credits} Credits</div>
                <div className="pack-price">${(pack.price / 100).toFixed(2)}</div>
                <button
                  onClick={() => handlePurchase(pack.id)}
                  disabled={loading}
                  className="btn btn-primary btn-full"
                >
                  {loading ? 'Processing...' : 'Purchase'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Credit Usage Guide</h2>
          <div className="usage-guide">
            <div className="usage-item">
              <span className="usage-icon">📚</span>
              <div>
                <h4>Novel (Auto-generate)</h4>
                <p>100 credits - Complete novel generated automatically</p>
              </div>
            </div>
            <div className="usage-item">
              <span className="usage-icon">✍️</span>
              <div>
                <h4>Novel (Chapter Edit)</h4>
                <p>150-200 credits - Edit and refine each chapter</p>
              </div>
            </div>
            <div className="usage-item">
              <span className="usage-icon">👤</span>
              <div>
                <h4>Biography</h4>
                <p>150 credits - Complete life story generation</p>
              </div>
            </div>
            <div className="usage-item">
              <span className="usage-icon">🎨</span>
              <div>
                <h4>Cover Generation</h4>
                <p>25 credits - AI-generated book cover</p>
              </div>
            </div>
            <div className="usage-item">
              <span className="usage-icon">📖</span>
              <div>
                <h4>EPUB Export</h4>
                <p>15 credits - Professional ebook format</p>
              </div>
            </div>
            <div className="usage-item">
              <span className="usage-icon">📝</span>
              <div>
                <h4>Blurb Generation</h4>
                <p>15 credits - Marketing description</p>
              </div>
            </div>
          </div>
        </div>

        {transactionHistory.length > 0 && (
          <div className="section">
            <h2 className="section-title">Transaction History</h2>
            <div className="transaction-list">
              {transactionHistory.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div>
                    <div className="transaction-type">{transaction.type}</div>
                    <div className="transaction-date">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;