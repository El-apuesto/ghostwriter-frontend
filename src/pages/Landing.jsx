import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { creditsAPI } from '../utils/api';

const Landing = () => {
  const [creditPacks, setCreditPacks] = useState([]);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await creditsAPI.getPacks();
        setCreditPacks(response.data);
      } catch (error) {
        console.error('Failed to fetch credit packs:', error);
      }
    };
    fetchPacks();
  }, []);

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="ghost-icon">👻</span>
            <br />
            Let AI Ghost Your Next Bestseller
          </h1>
          <p className="hero-subtitle">
            From premise to published novel. Fiction and biographies written by our sarcastic AI.
            <br />
            Powered by Llama 3.3 70B.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-large">
              Start Writing Free
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why GhostWriter?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✍️</div>
            <h3>Fiction Generation</h3>
            <p>
              Create complete novels from your premise. Define characters, plot timelines, 
              and writing style. From samples to full 50k+ word novels.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Biography Writing</h3>
            <p>
              Turn life stories into compelling narratives. Autobiographies, family histories, 
              or biographies with rich detail and emotional depth.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Book Extras</h3>
            <p>
              AI-generated covers, marketing blurbs, author bios. Export to ePub, MOBI, 
              or KDP-ready PDF formats.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Sarcastic AI</h3>
            <p>
              Powered by Llama 3.3 70B with attitude. Multiple writing styles from 
              deadpan to gothic horror to cyberpunk.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <h2 className="section-title">Credit Packs</h2>
        <p className="section-subtitle">
          Pay only for what you generate. No subscriptions, no hidden fees.
        </p>
        
        <div className="pricing-grid">
          {creditPacks.map((pack) => (
            <div key={pack.id} className="pricing-card">
              {pack.bonus_percentage > 0 && (
                <div className="pricing-badge">
                  {pack.bonus_percentage}% BONUS
                </div>
              )}
              <h3>{pack.name}</h3>
              <div className="pricing-amount">
                <span className="price">${(pack.price / 100).toFixed(2)}</span>
              </div>
              <div className="credits-amount">
                <span className="credits">💎 {pack.credits}</span>
                {pack.bonus_credits > 0 && (
                  <span className="bonus"> +{pack.bonus_credits}</span>
                )}
              </div>
              <p className="pricing-description">{pack.description}</p>
              <Link to="/signup" className="btn btn-primary btn-block">
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up Free</h3>
            <p>Create your account and get started immediately</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Choose Your Story</h3>
            <p>Fiction or biography. Add characters, timelines, and details</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Generate</h3>
            <p>AI writes your story in minutes. Edit and refine as needed</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Publish</h3>
            <p>Export to ePub, MOBI, or KDP PDF. Add covers and blurbs</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Write Your Story?</h2>
        <p>Join writers using AI to bring their stories to life</p>
        <Link to="/signup" className="btn btn-primary btn-large">
          Start Writing Now
        </Link>
      </section>
    </div>
  );
};

export default Landing;
