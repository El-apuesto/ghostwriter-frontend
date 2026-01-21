import { useState, useEffect } from 'react';
import { creditsAPI } from '../utils/api';
import '../styles/main.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await creditsAPI.getTransactions(100);
      setTransactions(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'purchase': return '💳';
      case 'story_generation': return '📖';
      case 'extra_generation': return '🎨';
      case 'refund': return '↩️';
      default: return '💰';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">Loading transaction history...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>💀 Transaction History</h1>
        <p className="subtitle">Every credit spent, every story summoned</p>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet. Your ghostly ledger is empty.</p>
          </div>
        ) : (
          <div className="transactions-table">
            <div className="transaction-header">
              <div>Date</div>
              <div>Type</div>
              <div>Description</div>
              <div>Credits</div>
              <div>Status</div>
            </div>
            {transactions.map((txn) => (
              <div key={txn.id} className="transaction-row">
                <div className="txn-date">{formatDate(txn.created_at)}</div>
                <div className="txn-type">
                  <span className="txn-icon">{getTransactionIcon(txn.transaction_type)}</span>
                  {txn.transaction_type.replace('_', ' ')}
                </div>
                <div className="txn-description">{txn.description}</div>
                <div className={`txn-credits ${txn.credits_amount > 0 ? 'positive' : 'negative'}`}>
                  {txn.credits_amount > 0 ? '+' : ''}{txn.credits_amount}
                </div>
                <div className={`txn-status status-${txn.status}`}>
                  {txn.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
