import React from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';
import LogoRotator from '../components/LogoRotator';

const Landing = () => {
  // Unified neon purple color with glow
  const neonPurple = '#a855f7';
  const glowStyle = {
    boxShadow: `0 0 10px ${neonPurple}, 0 0 20px ${neonPurple}40`
  };

  return (
    <div className="min-h-screen" style={{background: '#000000', position: 'relative'}}>
      {/* MUCH LARGER faint background logo watermark in center - 15% opacity */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        opacity: 0.15,
        pointerEvents: 'none'
      }}>
        <LogoRotator 
          className="background-logo"
          alt="Background Logo"
          style={{
            width: '800px',
            height: '800px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Hamburger menu in top left */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        zIndex: 1000
      }}>
        {/* Add your hamburger menu component here if you have one */}
      </div>

      {/* Logo centered at top between hamburger and login buttons */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}>
        <LogoRotator 
          alt="Phantm.ink Logo"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Unified neon purple Login/Signup buttons in top right */}
      <div style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1rem',
        zIndex: 1000,
        display: 'flex',
        gap: '0.5rem'
      }}>
        <Link
          to="/login"
          style={{
            padding: '0.4rem 0.75rem',
            border: `2px solid ${neonPurple}`,
            background: 'rgba(0, 0, 0, 0.8)',
            color: neonPurple,
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            ...glowStyle
          }}
          onMouseEnter={(e) => {
            e.target.style.background = neonPurple;
            e.target.style.color = '#fff';
            e.target.style.boxShadow = `0 0 15px ${neonPurple}, 0 0 30px ${neonPurple}60`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.8)';
            e.target.style.color = neonPurple;
            e.target.style.boxShadow = `0 0 10px ${neonPurple}, 0 0 20px ${neonPurple}40`;
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            padding: '0.4rem 0.75rem',
            border: `2px solid ${neonPurple}`,
            background: `${neonPurple}20`,
            color: neonPurple,
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            ...glowStyle
          }}
          onMouseEnter={(e) => {
            e.target.style.background = neonPurple;
            e.target.style.color = '#fff';
            e.target.style.boxShadow = `0 0 15px ${neonPurple}, 0 0 30px ${neonPurple}60`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = `${neonPurple}20`;
            e.target.style.color = neonPurple;
            e.target.style.boxShadow = `0 0 10px ${neonPurple}, 0 0 20px ${neonPurple}40`;
          }}
        >
          Sign Up
        </Link>
      </div>

      {/* Hero Section - NO text "Phantm.ink" here, just description */}
      <div className="relative overflow-hidden" style={{zIndex: 1}}>
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center" style={{marginTop: '100px', paddingTop: '0'}}>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Professional AI-powered writing platform for authors, publishers, and content creators. 
              Transform your ideas into polished manuscripts with industry-standard tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/signup"
                style={{
                  background: neonPurple,
                  border: `2px solid ${neonPurple}`,
                  ...glowStyle
                }}
                className="inline-block text-white px-10 py-4 rounded-lg font-semibold text-lg hover:brightness-110 transition-all transform hover:scale-105"
              >
                <span className="relative z-10">Start Your Manuscript</span>
              </Link>
              <Link
                to="/login"
                style={{
                  border: `2px solid ${neonPurple}`,
                  color: neonPurple,
                  ...glowStyle
                }}
                className="inline-block px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-20 transition-all"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = `${neonPurple}20`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Sign In
              </Link>
            </div>
            
            {/* Professional Badges - unified neon purple */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <span style={{
                border: `1px solid ${neonPurple}`,
                color: neonPurple,
                ...glowStyle
              }} className="px-4 py-2 bg-black bg-opacity-50 rounded-full text-sm backdrop-blur-sm">
                🏆 Award-Winning AI
              </span>
              <span style={{
                border: `1px solid ${neonPurple}`,
                color: neonPurple,
                ...glowStyle
              }} className="px-4 py-2 bg-black bg-opacity-50 rounded-full text-sm backdrop-blur-sm">
                📚 Publishing Industry Standard
              </span>
              <span style={{
                border: `1px solid ${neonPurple}`,
                color: neonPurple,
                ...glowStyle
              }} className="px-4 py-2 bg-black bg-opacity-50 rounded-full text-sm backdrop-blur-sm">
                ✍️ Author-Approved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{position: 'relative', zIndex: 1}}>
        <Statistics />
      </div>

      {/* Professional Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8" style={{position: 'relative', zIndex: 1}}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Professional Writing Tools
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Industry-standard features designed for serious writers and publishers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div style={{
            border: `1px solid ${neonPurple}`,
            ...glowStyle
          }} className="bg-gradient-to-br from-purple-900 to-black bg-opacity-50 backdrop-blur-lg rounded-xl p-8 hover:border-opacity-100 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div style={{
              background: neonPurple
            }} className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 relative z-10">
              <span className="text-white text-2xl">✍️</span>
            </div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-4 relative z-10">Manuscript Development</h3>
            <p className="text-purple-100 leading-relaxed relative z-10">
              Advanced AI assistance for plot development, character arcs, and narrative structure. 
              Maintain your unique voice while getting professional guidance.
            </p>
            <ul className="mt-4 space-y-2 text-purple-200 relative z-10 pl-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Plot structure analysis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Character development</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Pacing optimization</span>
              </li>
            </ul>
          </div>

          <div style={{
            border: `1px solid ${neonPurple}`,
            ...glowStyle
          }} className="bg-gradient-to-br from-purple-900 to-black bg-opacity-50 backdrop-blur-lg rounded-xl p-8 hover:border-opacity-100 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div style={{
              background: neonPurple
            }} className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 relative z-10">
              <span className="text-white text-2xl">📖</span>
            </div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-4 relative z-10">Publishing Ready</h3>
            <p className="text-purple-100 leading-relaxed relative z-10">
              Export in industry-standard formats with professional layouts. 
              Ready for submission to publishers or self-publishing platforms.
            </p>
            <ul className="mt-4 space-y-2 text-purple-200 relative z-10 pl-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>ePub & PDF export</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Professional formatting</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Cover design assistance</span>
              </li>
            </ul>
          </div>

          <div style={{
            border: `1px solid ${neonPurple}`,
            ...glowStyle
          }} className="bg-gradient-to-br from-purple-900 to-black bg-opacity-50 backdrop-blur-lg rounded-xl p-8 hover:border-opacity-100 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div style={{
              background: neonPurple
            }} className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 relative z-10">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-4 relative z-10">Genre Expertise</h3>
            <p className="text-purple-100 leading-relaxed relative z-10">
              Specialized AI trained on bestselling novels across all major genres. 
              From literary fiction to commercial thrillers, we understand the market.
            </p>
            <ul className="mt-4 space-y-2 text-purple-200 relative z-10 pl-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>20+ genre specializations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Market trend analysis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Style adaptation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{position: 'relative', zIndex: 1}}>
        <Testimonials />
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-purple-900 via-black to-purple-900 bg-opacity-50 backdrop-blur-lg py-20" style={{position: 'relative', zIndex: 1}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Writing?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Get credits to power your creative journey
            </p>
            <Link 
              to="/credits" 
              style={{
                background: neonPurple,
                border: `2px solid ${neonPurple}`,
                ...glowStyle
              }}
              className="inline-block text-white px-8 py-4 rounded-lg font-semibold text-lg hover:brightness-110 transition-all transform hover:scale-105"
            >
              View Credit Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Professional CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center" style={{position: 'relative', zIndex: 1}}>
        <div style={{
          background: neonPurple,
          border: `2px solid ${neonPurple}`,
          ...glowStyle
        }} className="rounded-2xl p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-20 animate-pulse"></div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 relative z-10">
            Ready to Write Your Masterpiece?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto relative z-10">
            Join thousands of professional authors who trust Phantm.ink for their manuscript development. 
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              to="/signup"
              className="inline-block bg-white text-purple-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all shadow-xl transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              to="/dashboard"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;