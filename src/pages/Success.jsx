import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { creditsAPI } from '../utils/api';

const Success = () => {
  const [searchParams] = useSearchParams();
  const { updateCredits } = useAuth();
  const [loading, setLoading] = useState(true);
  const [newBalance, setNewBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch balance - backend returns 'credits_balance' not 'balance'
        const response = await creditsAPI.getBalance();
        
        // Backend returns: { credits_balance: N, total_purchased: N, total_spent: N }
        const creditsBalance = response.data?.credits_balance;
        
        if (creditsBalance !== undefined) {
          setNewBalance(creditsBalance);
          updateCredits(creditsBalance);
        } else {
          setError('Could not verify credits - please refresh the page');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError(err?.message || 'Failed to verify payment. Your credits may still be processing.');
      } finally {
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, [updateCredits]);

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>Payment Successful!</h1>
        {loading ? (
          <p>Verifying your payment and updating credits...</p>
        ) : error ? (
          <>
            <p className="error-message" style={{ color: '#ff6b6b', marginBottom: '20px' }}>
              ⚠️ {error}
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              If your credits don't appear within a few moments, try refreshing the page.
            </p>
          </>
        ) : (
          <>
            <p className="success-message">
              Your credits have been added to your account!
            </p>
            {newBalance !== null && (
              <div className="credits-display">
                <div className="credits-label">New Balance</div>
                <div className="credits-value">⚡ {newBalance} credits</div>
              </div>
            )}
          </>
        )}
        <div className="success-actions">
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/generate/fiction" className="btn btn-secondary">
            Start Writing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;