import React from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';
import LogoRotator from '../components/LogoRotator';

const Landing = () => {
  return (
    <div className="min-h-screen" style={{background: '#000000'}}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl border border-purple-400 border-opacity-30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-20 animate-pulse"></div>
                <LogoRotator 
                  className="w-16 h-16 object-contain relative z-10" 
                  alt="Phantm.ink Logo" 
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

      {/* Professional Pricing Section with Your Images */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 bg-opacity-50 backdrop-blur-lg py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Writing?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Purchase credits to generate your stories
            </p>
            <Link 
              to="/credits" 
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Buy Credits
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
