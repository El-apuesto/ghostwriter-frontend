import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Success = () => {
  const { updateCredits } = useAuth();

  useEffect(() => {
    // Update credits after successful payment
    updateCredits();
  }, []);

  return (
    <div className="status-page">
      <div className="status-container">
        <div className="status-icon success">✓</div>
        <h1 className="status-title">Payment Successful!</h1>
        <p className="status-message">
          Your credits have been added to your account. You can now start generating stories!
        </p>
        <div className="status-actions">
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/profile" className="btn btn-outline">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;