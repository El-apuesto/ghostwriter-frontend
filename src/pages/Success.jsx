import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { creditsAPI } from '../utils/api';

const Success = () => {
  const [searchParams] = useSearchParams();
  const { updateCredits } = useAuth();
  const [loading, setLoading] = useState(true);
  const [newBalance, setNewBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await creditsAPI.getBalance();
        setNewBalance(response.data.balance);
        updateCredits(response.data.balance);
      } catch (err) {
        console.error('Failed to fetch balance:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBalance();
  }, []);

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>Payment Successful!</h1>
        {loading ? (
          <p>Updating your credit balance...</p>
        ) : (
          <>
            <p className="success-message">
              Your credits have been added to your account
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
