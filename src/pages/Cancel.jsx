import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <div className="cancel-icon">❌</div>
        <h1>Payment Cancelled</h1>
        <p className="cancel-message">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="cancel-actions">
          <Link to="/profile" className="btn btn-primary">
            Try Again
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
