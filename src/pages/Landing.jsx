import { Link } from 'react-router-dom';

const Landing = () => {
  const creditPacks = [
    { name: 'Micro', price: '$4.99', credits: 50, description: 'Perfect for trying out' },
    { name: 'Small', price: '$9.99', credits: 100, description: 'Great for hobbyists' },
    { name: 'Medium', price: '$19.99', credits: 250, bonus: '25% bonus', description: 'Most popular' },
    { name: 'Starter', price: '$29.99', credits: 400, bonus: '33% bonus', description: 'For serious writers' },
    { name: 'Value', price: '$49.99', credits: 700, bonus: '40% bonus', description: 'Best value' },
    { name: 'Pro', price: '$99.99', credits: 1500, bonus: '50% bonus', description: 'Professional tier' },
    { name: 'Ultimate', price: '$199.99', credits: 3500, bonus: '75% bonus', description: 'Ultimate power' },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            👻 <span className="gradient-text">GhostWriter</span>
          </h1>
          <p className="hero-subtitle">
            AI-Powered Story Generation with Llama 3.3 70B
          </p>
          <p className="hero-description">
            Create captivating fiction and compelling biographies with advanced AI.
            <br />
            Professional-grade stories in minutes, not months.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-large">
              Start Writing Free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Fiction Generator</h3>
              <p>Create novels, novellas, or samples. Control characters, timeline, genre, and style.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3>Biography Writer</h3>
              <p>Craft autobiographies, biographies, or memoirs with comprehensive life event tracking.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Book Covers</h3>
              <p>Generate AI-powered book covers or use basic templates. Make your stories shine.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Export Options</h3>
              <p>Export to ePub, MOBI, or KDP-ready PDF. Publish anywhere instantly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Marketing Tools</h3>
              <p>Generate compelling blurbs and author bios to promote your work.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Credit System</h3>
              <p>Pay only for what you use. No subscriptions, no hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <h2 className="section-title">Credit Packs</h2>
          <p className="section-subtitle">Choose the pack that fits your needs</p>
          <div className="pricing-grid">
            {creditPacks.map((pack, index) => (
              <div key={index} className={`pricing-card ${pack.bonus ? 'featured' : ''}`}>
                {pack.bonus && <div className="pricing-badge">{pack.bonus}</div>}
                <h3>{pack.name}</h3>
                <div className="pricing-price">{pack.price}</div>
                <div className="pricing-credits">{pack.credits} credits</div>
                <p className="pricing-description">{pack.description}</p>
              </div>
            ))}
          </div>
          <div className="pricing-note">
            <p>All packs are one-time purchases. Credits never expire.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start Writing?</h2>
          <p>Join thousands of writers using AI to create their stories</p>
          <Link to="/signup" className="btn btn-primary btn-large">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
