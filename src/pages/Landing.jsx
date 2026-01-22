import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  const creditPacks = [
    { name: 'Micro', price: 4.99, credits: 50, bonus: 0 },
    { name: 'Small', price: 9.99, credits: 100, bonus: 0 },
    { name: 'Medium', price: 19.99, credits: 250, bonus: 25 },
    { name: 'Starter', price: 29.99, credits: 400, bonus: 33 },
    { name: 'Value', price: 49.99, credits: 700, bonus: 40 },
    { name: 'Pro', price: 99.99, credits: 1500, bonus: 50 },
    { name: 'Ultimate', price: 199.99, credits: 3500, bonus: 75 },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">AI-Powered</span> Story Generation
          </h1>
          <p className="hero-subtitle">
            Create novels, novellas, and biographies with advanced AI. 
            Dark humor, sarcastic wit, and compelling narratives.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-large">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary btn-large">
                  Start Writing Free
                </Link>
                <Link to="/login" className="btn btn-secondary btn-large">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why GhostWriter?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Advanced AI Technology</h3>
              <p>State-of-the-art AI creates compelling, unique narratives</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">😈</div>
              <h3>Dark & Sarcastic</h3>
              <p>Deadpan humor, gothic horror, noir, and cyberpunk styles</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Multiple Formats</h3>
              <p>Export to ePub, MOBI, and KDP-ready PDF</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Generation</h3>
              <p>Complete novels in minutes, not months</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>AI Cover Art</h3>
              <p>Generate professional book covers with AI</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Credit-Based Pricing</h3>
              <p>Pay only for what you use, no subscriptions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <h2 className="section-title">Credit Packs</h2>
          <p className="section-subtitle">One-time purchase, never expire</p>
          
          <div className="pricing-grid">
            {creditPacks.map((pack) => (
              <div key={pack.name} className={`pricing-card ${pack.bonus >= 40 ? 'featured' : ''}`}>
                {pack.bonus >= 40 && <div className="badge">Best Value</div>}
                <h3>{pack.name}</h3>
                <div className="price">${pack.price}</div>
                <div className="credits">{pack.credits} credits</div>
                {pack.bonus > 0 && (
                  <div className="bonus">+{pack.bonus}% bonus</div>
                )}
                <Link to={isAuthenticated ? "/profile" : "/signup"} className="btn btn-primary">
                  {isAuthenticated ? 'Buy Now' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>

          <div className="pricing-info">
            <h3>What can you generate?</h3>
            <ul>
              <li><strong>Fiction Sample:</strong> FREE</li>
              <li><strong>Fiction Novella:</strong> 50 credits</li>
              <li><strong>Fiction Novel:</strong> 100 credits</li>
              <li><strong>Biography Sample:</strong> FREE</li>
              <li><strong>Biography Short:</strong> 75 credits</li>
              <li><strong>Biography Standard:</strong> 150 credits</li>
              <li><strong>Biography Comprehensive:</strong> 200 credits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Create Your Masterpiece?</h2>
          <p>Join thousands of writers using AI to bring their stories to life</p>
          <Link to="/signup" className="btn btn-primary btn-large">
            Start Writing Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
