import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  const packs = [
    { name: 'Micro', price: '$4.99', credits: 50, popular: false },
    { name: 'Small', price: '$9.99', credits: 100, popular: false },
    { name: 'Medium', price: '$19.99', credits: 250, bonus: '25% bonus', popular: true },
    { name: 'Starter', price: '$29.99', credits: 400, bonus: '33% bonus', popular: false },
    { name: 'Value', price: '$49.99', credits: 700, bonus: '40% bonus', popular: false },
    { name: 'Pro', price: '$99.99', credits: 1500, bonus: '50% bonus', popular: false },
  ];

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="ghost-emoji">👻</span>
            Write Stories with AI
          </h1>
          <p className="hero-subtitle">
            Generate fiction and biographies with Llama 3.3 70B.
            <br />
            Sarcastic deadpan style. Dark cyberpunk vibes.
          </p>
          <div className="hero-cta">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Start Writing
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Fiction Generation</h3>
            <p>Create novels, novellas, and samples with custom characters and timelines</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Biography Writing</h3>
            <p>Generate autobiographies, memoirs, and family histories with detailed life events</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>AI Book Covers</h3>
            <p>Generate 4 unique cover options with AI image generation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Export Options</h3>
            <p>Export to ePub, MOBI, and KDP-ready PDF formats</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Marketing Tools</h3>
            <p>Generate blurbs, author bios, and promotional content</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Credit System</h3>
            <p>Pay-as-you-go with flexible credit packs</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <h2 className="section-title">Credit Packs</h2>
        <p className="section-subtitle">Pay once, use anytime. No subscriptions.</p>
        <div className="pricing-grid">
          {packs.map((pack) => (
            <div 
              key={pack.name} 
              className={`pricing-card ${pack.popular ? 'popular' : ''}`}
            >
              {pack.popular && <div className="popular-badge">Popular</div>}
              <h3>{pack.name}</h3>
              <div className="price">{pack.price}</div>
              <div className="credits">
                <span className="credits-amount">{pack.credits}</span> credits
              </div>
              {pack.bonus && <div className="bonus">{pack.bonus}</div>}
              {isAuthenticated ? (
                <Link to="/profile" className="btn btn-primary">
                  Purchase
                </Link>
              ) : (
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Create Your Story?</h2>
        <p>Join GhostWriter and start generating AI-powered content today</p>
        {!isAuthenticated && (
          <Link to="/signup" className="btn btn-primary btn-lg">
            Sign Up Free
          </Link>
        )}
      </section>
    </div>
  );
};

export default Landing;
