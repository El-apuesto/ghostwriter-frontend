import React from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';
import LogoRotator from '../components/LogoRotator';

const Landing = () => {
  return (
    <div className="min-h-screen" style={{background: '#000000'}}>
      {/* Simple Login/Signup buttons in top right - NO HEADER COMPONENT */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        display: 'flex',
        gap: '0.5rem'
      }}>
        <Link
          to="/login"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #a855f7',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#a855f7',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#a855f7';
            e.target.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.8)';
            e.target.style.color = '#a855f7';
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #6366f1',
            background: 'rgba(99, 102, 241, 0.2)',
            color: '#6366f1',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#6366f1';
            e.target.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(99, 102, 241, 0.2)';
            e.target.style.color = '#6366f1';
          }}
        >
          Sign Up
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo - BIGGER and centered */}
            <div className="flex justify-center mb-8">
              <div style={{
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed, #6366f1)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.5)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(99, 102, 241, 0.4))',
                  opacity: 0.2,
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}></div>
                <LogoRotator 
                  className="relative z-10" 
                  alt="Phantm.ink Logo"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-lg">
                Phantm.ink
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Professional AI-powered writing platform for authors, publishers, and content creators. 
              Transform your ideas into polished manuscripts with industry-standard tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/signup"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl transform hover:scale-105 border border-purple-400 border-opacity-30 relative overflow-hidden group"
              >
                <span className="relative z-10">Start Your Manuscript</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              <Link
                to="/login"
                className="inline-block border-2 border-purple-400 text-purple-100 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-purple-400 hover:bg-opacity-20 transition-all"
              >
                Sign In
              </Link>
            </div>
            
            {/* Professional Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <span className="px-4 py-2 bg-purple-900 bg-opacity-50 rounded-full text-purple-200 text-sm border border-purple-400 border-opacity-30 backdrop-blur-sm">
                🏆 Award-Winning AI
              </span>
              <span className="px-4 py-2 bg-purple-900 bg-opacity-50 rounded-full text-purple-200 text-sm border border-purple-400 border-opacity-30 backdrop-blur-sm">
                📚 Publishing Industry Standard
              </span>
              <span className="px-4 py-2 bg-purple-900 bg-opacity-50 rounded-full text-purple-200 text-sm border border-purple-400 border-opacity-30 backdrop-blur-sm">
                ✍️ Author-Approved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <Statistics />

      {/* Professional Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Professional Writing Tools
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Industry-standard features designed for serious writers and publishers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-purple-400 border-opacity-30 hover:border-opacity-60 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-6 relative z-10">
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

          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-purple-400 border-opacity-30 hover:border-opacity-60 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6 relative z-10">
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

          <div className="bg-gradient-to-br from-purple-900 to-pink-900 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-purple-400 border-opacity-30 hover:border-opacity-60 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6 relative z-10">
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
      <Testimonials />

      {/* CTA Section - Credit packs removed from landing page */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 bg-opacity-50 backdrop-blur-lg py-20">
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
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl transform hover:scale-105"
            >
              View Credit Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Professional CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-2xl p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-30 transition-opacity"></div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 relative z-10">
            Ready to Write Your Masterpiece?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto relative z-10">
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
