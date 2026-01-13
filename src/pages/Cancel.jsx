import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="status-page">
      <div className="status-container">
        <div className="status-icon cancel">×</div>
        <h1 className="status-title">Payment Cancelled</h1>
        <p className="status-message">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="status-actions">
          <Link to="/profile" className="btn btn-primary">
            Try Again
          </Link>
          <Link to="/dashboard" className="btn btn-outline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;