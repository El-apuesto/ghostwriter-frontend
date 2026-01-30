import React from 'react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl border border-blue-400 border-opacity-20">
                <span className="text-white text-4xl font-serif font-bold">P</span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-300 via-white to-indigo-300 bg-clip-text text-transparent">
                Phantm.ink
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Professional AI-powered writing platform for authors, publishers, and content creators. 
              Transform your ideas into polished manuscripts with industry-standard tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/signup"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl transform hover:scale-105 border border-blue-400 border-opacity-30"
              >
                Start Your Manuscript
              </Link>
              <Link
                to="/login"
                className="inline-block border-2 border-blue-400 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 hover:text-slate-900 transition-all"
              >
                Sign In
              </Link>
            </div>
            
            {/* Professional Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <span className="px-4 py-2 bg-slate-800 bg-opacity-50 rounded-full text-blue-200 text-sm border border-blue-400 border-opacity-20">
                🏆 Award-Winning AI
              </span>
              <span className="px-4 py-2 bg-slate-800 bg-opacity-50 rounded-full text-blue-200 text-sm border border-blue-400 border-opacity-20">
                📚 Publishing Industry Standard
              </span>
              <span className="px-4 py-2 bg-slate-800 bg-opacity-50 rounded-full text-blue-200 text-sm border border-blue-400 border-opacity-20">
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
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Industry-standard features designed for serious writers and publishers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-blue-400 border-opacity-20 hover:border-opacity-40 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">✍️</span>
            </div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-4">Manuscript Development</h3>
            <p className="text-blue-100 leading-relaxed">
              Advanced AI assistance for plot development, character arcs, and narrative structure. 
              Maintain your unique voice while getting professional guidance.
            </p>
            <ul className="mt-4 space-y-2 text-blue-200">
              <li>• Plot structure analysis</li>
              <li>• Character development</li>
              <li>• Pacing optimization</li>
            </ul>
          </div>

          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-blue-400 border-opacity-20 hover:border-opacity-40 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">�</span>
            </div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-4">Publishing Ready</h3>
            <p className="text-blue-100 leading-relaxed">
              Export in industry-standard formats with professional layouts. 
              Ready for submission to publishers or self-publishing platforms.
            </p>
            <ul className="mt-4 space-y-2 text-blue-200">
              <li>• ePub & PDF export</li>
              <li>• Professional formatting</li>
              <li>• Cover design assistance</li>
            </ul>
          </div>

          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-blue-400 border-opacity-20 hover:border-opacity-40 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
              <span className="text-white text-2xl">�</span>
            </div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-4">Genre Expertise</h3>
            <p className="text-blue-100 leading-relaxed">
              Specialized AI trained on bestselling novels across all major genres. 
              From literary fiction to commercial thrillers, we understand the market.
            </p>
            <ul className="mt-4 space-y-2 text-blue-200">
              <li>• 20+ genre specializations</li>
              <li>• Market trend analysis</li>
              <li>• Style adaptation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Professional Pricing Section */}
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Professional Pricing Plans
            </h2>
            <p className="text-xl text-blue-100">
              Flexible options for writers at every stage of their career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 hover:border-blue-400 transition-all">
              <h3 className="text-2xl font-serif font-semibold text-white mb-2">Sample</h3>
              <p className="text-blue-200 mb-4">Free Trial</p>
              <ul className="text-blue-100 space-y-3 mb-6">
                <li>✓ 3,000 words</li>
                <li>✓ Basic manuscript formatting</li>
                <li>✓ 1 story per month</li>
                <li>✓ Standard export options</li>
              </ul>
              <div className="text-center">
                <span className="text-3xl font-bold text-white">$0</span>
                <p className="text-blue-200">Perfect for trying our platform</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-8 border-2 border-blue-400 transform scale-105 shadow-xl">
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 inline-block mb-4">
                <span className="text-white text-sm font-semibold">MOST POPULAR</span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white mb-2">Professional</h3>
              <p className="text-blue-100 mb-4">$21 (210 credits)</p>
              <ul className="text-white space-y-3 mb-6">
                <li>✓ 80-100k words (Full Novel)</li>
                <li>✓ Advanced manuscript formatting</li>
                <li>✓ 4 professional cover options</li>
                <li>✓ Publisher-ready export</li>
                <li>✓ Priority support</li>
              </ul>
              <div className="text-center">
                <span className="text-3xl font-bold text-white">$21</span>
                <p className="text-blue-100">Complete novel package</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-8 border border-slate-700 hover:border-blue-400 transition-all">
              <h3 className="text-2xl font-serif font-semibold text-white mb-2">Enterprise</h3>
              <p className="text-blue-200 mb-4">Custom Solution</p>
              <ul className="text-blue-100 space-y-3 mb-6">
                <li>✓ Unlimited words</li>
                <li>✓ Custom formatting templates</li>
                <li>✓ Team collaboration</li>
                <li>✓ API access</li>
                <li>✓ Dedicated support</li>
              </ul>
              <div className="text-center">
                <span className="text-3xl font-bold text-white">Custom</span>
                <p className="text-blue-200">Contact for enterprise pricing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready to Write Your Masterpiece?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professional authors who trust Phantm.ink for their manuscript development. 
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              to="/dashboard"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
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
