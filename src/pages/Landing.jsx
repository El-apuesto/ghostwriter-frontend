import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="gradient-text">AI-Powered</span> Story Generation
        </h1>
        <p className="hero-subtitle">
          Transform your ideas into complete novels and biographies with the power of artificial intelligence.
        </p>
        <div className="hero-cta">
          {user ? (
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Fiction Generation</h3>
            <p>Create complete novels with AI assistance. Auto-generate or edit chapter by chapter.</p>
            <span className="feature-cost">100-200 credits</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Biography Writing</h3>
            <p>Craft compelling life stories and autobiographies with AI guidance.</p>
            <span className="feature-cost">150 credits</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Cover Generation</h3>
            <p>Create professional book covers for your generated stories.</p>
            <span className="feature-cost">25 credits</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>EPUB Export</h3>
            <p>Export your stories to EPUB format for publishing and distribution.</p>
            <span className="feature-cost">15 credits</span>
          </div>
        </div>
      </div>

      <div className="pricing-section">
        <h2 className="section-title">Credit Packs</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <div className="price">$9.99</div>
            <div className="credits">100 Credits</div>
            <ul className="pricing-features">
              <li>✓ 1 Novel (auto-gen)</li>
              <li>✓ 4 Cover designs</li>
              <li>✓ 6 EPUB exports</li>
            </ul>
          </div>
          <div className="pricing-card featured">
            <div className="popular-badge">Popular</div>
            <h3>Pro</h3>
            <div className="price">$19.99</div>
            <div className="credits">250 Credits</div>
            <ul className="pricing-features">
              <li>✓ 2-3 Novels</li>
              <li>✓ 10 Cover designs</li>
              <li>✓ 16 EPUB exports</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price">$49.99</div>
            <div className="credits">700 Credits</div>
            <ul className="pricing-features">
              <li>✓ 7 Novels</li>
              <li>✓ 28 Cover designs</li>
              <li>✓ 46 EPUB exports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;