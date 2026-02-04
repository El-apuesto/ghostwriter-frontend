import React from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';
import LogoRotator from '../components/LogoRotator';

const Landing = () => {
  // Luxury color palette - deep purple with gold accents
  const luxuryPurple = '#9333ea'; // Rich purple
  const accentGold = '#fbbf24'; // Elegant gold
  const softWhite = '#f8fafc';
  
  const premiumGlow = {
    boxShadow: `0 0 20px ${luxuryPurple}40, 0 0 40px ${luxuryPurple}20, 0 8px 32px rgba(0,0,0,0.4)`
  };

  const goldAccent = {
    boxShadow: `0 0 15px ${accentGold}30, 0 4px 20px rgba(0,0,0,0.3)`
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(to bottom, #000000, #0a0015, #000000)',
      position: 'relative'
    }}>
      {/* Elegant background pattern overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.03) 0%, transparent 50%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Premium background logo watermark */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        opacity: 0.08,
        pointerEvents: 'none'
      }}>
        <LogoRotator 
          className="background-logo"
          alt="Background Logo"
          style={{
            width: '900px',
            height: '900px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 60px rgba(147, 51, 234, 0.3))'
          }}
        />
      </div>

      {/* Sophisticated top navigation bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0))',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${luxuryPurple}20`,
        zIndex: 999
      }} />

      {/* Hamburger menu - elegant positioning */}
      <div style={{
        position: 'fixed',
        top: '1.5rem',
        left: '2rem',
        zIndex: 1000
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '6px',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '100%',
            height: '2px',
            background: softWhite,
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }} />
          <div style={{
            width: '100%',
            height: '2px',
            background: softWhite,
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }} />
          <div style={{
            width: '100%',
            height: '2px',
            background: softWhite,
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }} />
        </div>
      </div>

      {/* Centered premium logo */}
      <div style={{
        position: 'fixed',
        top: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}>
        <div style={{
          ...premiumGlow,
          borderRadius: '50%',
          padding: '8px'
        }}>
          <LogoRotator 
            alt="Phantm.ink Logo"
            style={{
              width: '85px',
              height: '85px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 20px rgba(147, 51, 234, 0.5))'
            }}
          />
        </div>
      </div>

      {/* Luxury navigation buttons */}
      <div style={{
        position: 'fixed',
        top: '1.75rem',
        right: '2rem',
        zIndex: 1000,
        display: 'flex',
        gap: '0.75rem'
      }}>
        <Link
          to="/login"
          style={{
            padding: '0.65rem 1.5rem',
            border: `2px solid ${luxuryPurple}`,
            background: 'rgba(0, 0, 0, 0.6)',
            color: softWhite,
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '500',
            letterSpacing: '0.5px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            ...premiumGlow
          }}
          onMouseEnter={(e) => {
            e.target.style.background = luxuryPurple;
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 0 30px ${luxuryPurple}60, 0 0 60px ${luxuryPurple}30, 0 12px 40px rgba(0,0,0,0.5)`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.6)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = `0 0 20px ${luxuryPurple}40, 0 0 40px ${luxuryPurple}20, 0 8px 32px rgba(0,0,0,0.4)`;
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            padding: '0.65rem 1.5rem',
            border: `2px solid ${accentGold}`,
            background: `linear-gradient(135deg, ${accentGold}20, ${luxuryPurple}20)`,
            color: softWhite,
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '600',
            letterSpacing: '0.5px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            ...goldAccent
          }}
          onMouseEnter={(e) => {
            e.target.style.background = `linear-gradient(135deg, ${accentGold}, ${luxuryPurple})`;
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 0 25px ${accentGold}50, 0 0 50px ${luxuryPurple}40, 0 12px 40px rgba(0,0,0,0.5)`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = `linear-gradient(135deg, ${accentGold}20, ${luxuryPurple}20)`;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = `0 0 15px ${accentGold}30, 0 4px 20px rgba(0,0,0,0.3)`;
          }}
        >
          Sign Up
        </Link>
      </div>

      {/* Hero Section - Sophisticated typography */}
      <div className="relative overflow-hidden" style={{zIndex: 1}}>
        <div className="max-w-7xl mx-auto px-6 py-32 sm:px-8 lg:px-12">
          <div className="text-center" style={{marginTop: '120px'}}>
            {/* Elegant tagline */}
            <p style={{
              fontSize: '1rem',
              fontWeight: '500',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: accentGold,
              marginBottom: '2rem',
              textShadow: `0 0 20px ${accentGold}40`
            }}>
              Redefining Literary Excellence
            </p>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: '700',
              lineHeight: '1.2',
              background: `linear-gradient(135deg, ${softWhite}, ${luxuryPurple}, ${accentGold})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              textShadow: 'none',
              filter: 'drop-shadow(0 4px 30px rgba(147, 51, 234, 0.3))'
            }}>
              Where Vision Meets
              <br />
              Literary Mastery
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: '#cbd5e1',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: '1.8',
              fontWeight: '300',
              letterSpacing: '0.3px'
            }}>
              An exclusive AI-powered atelier for distinguished authors and publishers. 
              Transform your literary vision into masterfully crafted manuscripts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link
                to="/signup"
                style={{
                  padding: '1.1rem 2.5rem',
                  background: `linear-gradient(135deg, ${luxuryPurple}, ${accentGold}30)`,
                  border: `2px solid ${accentGold}`,
                  color: softWhite,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  ...goldAccent,
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px) scale(1.02)';
                  e.target.style.boxShadow = `0 0 40px ${accentGold}60, 0 0 80px ${luxuryPurple}40, 0 20px 60px rgba(0,0,0,0.6)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = `0 0 15px ${accentGold}30, 0 4px 20px rgba(0,0,0,0.3)`;
                }}
              >
                Begin Your Journey
              </Link>
              <Link
                to="/login"
                style={{
                  padding: '1.1rem 2.5rem',
                  border: `2px solid ${luxuryPurple}`,
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: softWhite,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)',
                  ...premiumGlow,
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = `${luxuryPurple}30`;
                  e.target.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.6)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Member Access
              </Link>
            </div>
            
            {/* Sophisticated badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {[
                { icon: '✦', text: 'Award-Winning AI' },
                { icon: '◆', text: 'Industry Standard' },
                { icon: '✧', text: 'Elite Authors' }
              ].map((badge, i) => (
                <div key={i} style={{
                  padding: '0.75rem 1.75rem',
                  border: `1px solid ${luxuryPurple}40`,
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '50px',
                  color: '#e2e8f0',
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  letterSpacing: '1px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${luxuryPurple}20`,
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{color: accentGold, marginRight: '8px', fontSize: '1.1rem'}}>{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{position: 'relative', zIndex: 1}}>
        <Statistics />
      </div>

      {/* Premium Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-12" style={{position: 'relative', zIndex: 1}}>
        <div className="text-center mb-20">
          <p style={{
            fontSize: '0.9rem',
            fontWeight: '500',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: accentGold,
            marginBottom: '1rem'
          }}>
            Unparalleled Excellence
          </p>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: '"Playfair Display", serif',
            fontWeight: '700',
            color: softWhite,
            marginBottom: '1.5rem',
            textShadow: `0 0 40px ${luxuryPurple}30`
          }}>
            Artisan Writing Tools
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#94a3b8',
            maxWidth: '700px',
            margin: '0 auto',
            fontWeight: '300'
          }}>
            Meticulously crafted features for discerning authors
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '✍',
              title: 'Manuscript Mastery',
              desc: 'Sophisticated AI guidance for plot architecture, character depth, and narrative excellence. Your unique voice, elevated to perfection.',
              features: ['Deep structure analysis', 'Character psychology', 'Narrative pacing']
            },
            {
              icon: '📖',
              title: 'Publisher Ready',
              desc: 'Premium export formats with professional typesetting. Prepared for submission to prestigious publishers.',
              features: ['Professional layouts', 'Multiple formats', 'Print-ready quality']
            },
            {
              icon: '◈',
              title: 'Genre Mastery',
              desc: 'AI trained on literary masterpieces across every genre. From literary fiction to commercial excellence.',
              features: ['25+ specializations', 'Market intelligence', 'Style refinement']
            }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(147,51,234,0.1))',
              border: `1px solid ${luxuryPurple}30`,
              borderRadius: '20px',
              padding: '2.5rem',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = luxuryPurple;
              e.currentTarget.style.boxShadow = `0 0 40px ${luxuryPurple}40, 0 20px 60px rgba(0,0,0,0.5)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = `${luxuryPurple}30`;
              e.currentTarget.style.boxShadow = 'none';
            }}>
              {/* Shine effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${luxuryPurple}20, transparent)`,
                transition: 'left 0.6s ease'
              }} />
              
              <div style={{
                width: '70px',
                height: '70px',
                background: `linear-gradient(135deg, ${luxuryPurple}, ${accentGold}30)`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '2rem',
                ...goldAccent
              }}>
                {feature.icon}
              </div>
              
              <h3 style={{
                fontSize: '1.75rem',
                fontFamily: '"Playfair Display", serif',
                fontWeight: '600',
                color: softWhite,
                marginBottom: '1rem'
              }}>
                {feature.title}
              </h3>
              
              <p style={{
                color: '#cbd5e1',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                {feature.desc}
              </p>
              
              <ul style={{listStyle: 'none', padding: 0}}>
                {feature.features.map((item, j) => (
                  <li key={j} style={{
                    color: '#94a3b8',
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: accentGold
                    }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{position: 'relative', zIndex: 1}}>
        <Testimonials />
      </div>

      {/* Exclusive CTA */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '6rem 2rem',
        background: `linear-gradient(135deg, ${luxuryPurple}20, transparent, ${accentGold}10)`,
        borderTop: `1px solid ${luxuryPurple}20`,
        borderBottom: `1px solid ${luxuryPurple}20`
      }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={{
            fontSize: '0.9rem',
            fontWeight: '500',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: accentGold,
            marginBottom: '1.5rem'
          }}>
            Exclusive Access
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontFamily: '"Playfair Display", serif',
            fontWeight: '700',
            color: softWhite,
            marginBottom: '1.5rem',
            lineHeight: '1.3'
          }}>
            Elevate Your Craft to Unprecedented Heights
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#cbd5e1',
            marginBottom: '3rem',
            fontWeight: '300',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Join an elite circle of authors who demand nothing less than excellence. Your literary masterpiece awaits.
          </p>
          <Link
            to="/signup"
            style={{
              display: 'inline-block',
              padding: '1.2rem 3rem',
              background: `linear-gradient(135deg, ${luxuryPurple}, ${accentGold}30)`,
              border: `2px solid ${accentGold}`,
              color: softWhite,
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              ...goldAccent
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px) scale(1.05)';
              e.target.style.boxShadow = `0 0 50px ${accentGold}70, 0 0 100px ${luxuryPurple}50, 0 25px 70px rgba(0,0,0,0.7)`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = `0 0 15px ${accentGold}30, 0 4px 20px rgba(0,0,0,0.3)`;
            }}
          >
            Request Invitation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;