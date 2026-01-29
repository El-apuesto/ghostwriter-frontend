import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { creditsAPI } from '../utils/api';

const Profile = () => {
  const { user, updateCredits } = useAuth();
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPacks();
  }, []);

  const loadPacks = async () => {
    try {
      const response = await creditsAPI.getPacks();
      setPacks(response.data);
    } catch (err) {
      console.error('Failed to load packs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (packId) => {
    try {
      const response = await creditsAPI.purchase(packId);
      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      }
    } catch (err) {
      alert('Failed to initiate purchase: ' + err.message);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <h1>� {user?.name}</h1>
            <p>{user?.email}</p>
          </div>
          <div className="credits-display">
            <div className="credits-icon">⚡</div>
            <div>
              <div className="credits-label">Available Credits</div>
              <div className="credits-value">{user?.credits_balance || 0}</div>
            </div>
          </div>
        </div>

        <section className="credit-packs-section">
          <h2>Buy More Credits</h2>
          <p className="section-subtitle">One-time purchase, credits never expire</p>

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="pricing-grid">
              {packs.map((pack) => (
                <div key={pack.id} className={`pricing-card ${pack.bonus_percent >= 40 ? 'featured' : ''}`}>
                  {pack.bonus_percent >= 40 && <div className="badge">Best Value</div>}
                  <h3>{pack.name}</h3>
                  <div className="price">${pack.price}</div>
                  <div className="credits">{pack.credits} credits</div>
                  {pack.bonus_percent > 0 && (
                    <div className="bonus">+{pack.bonus_percent}% bonus</div>
                  )}
                  <button 
                    onClick={() => handlePurchase(pack.id)}
                    className="btn btn-primary"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="pricing-info">
          <h3>Credit Usage Guide</h3>
          <div className="usage-grid">
            <div className="usage-card">
              <h4>📝 Fiction Stories</h4>
              <ul>
                <li>Sample: FREE</li>
                <li>Novella: 50 credits</li>
                <li>Novel: 100 credits</li>
              </ul>
            </div>
            <div className="usage-card">
              <h4>📖 Biographies</h4>
              <ul>
                <li>Sample: FREE</li>
                <li>Short: 75 credits</li>
                <li>Standard: 150 credits</li>
                <li>Comprehensive: 200 credits</li>
              </ul>
            </div>
            <div className="usage-card">
              <h4>🎨 Extras</h4>
              <ul>
                <li>Basic Cover: 15 credits</li>
                <li>AI Cover: 30 credits</li>
                <li>ePub/MOBI: 10 credits each</li>
                <li>KDP PDF: 15 credits</li>
                <li>Marketing Blurb: 20 credits</li>
                <li>Author Bio: 15 credits</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
