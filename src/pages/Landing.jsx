import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-3xl font-bold">P</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Phantm.ink
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your ideas into compelling stories with AI-powered writing assistance
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/signup"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-xl transform hover:scale-105"
              >
                Start Writing Free
              </Link>
              <Link
                to="/login"
                className="inline-block border-2 border-purple-400 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-400 hover:text-gray-900 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Phantm.ink?
          </h2>
          <p className="text-gray-300 text-lg">
            Professional AI writing tools that bring your stories to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-purple-500 border-opacity-20">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Writing</h3>
            <p className="text-gray-300">
              Advanced AI helps you create compelling narratives, develop characters, and build immersive worlds
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-purple-500 border-opacity-20">
            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Multiple Story Types</h3>
            <p className="text-gray-300">
              From short stories to full-length novels, create content in any genre or style you prefer
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-purple-500 border-opacity-20">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Professional Formatting</h3>
            <p className="text-gray-300">
              Export your stories in multiple formats with professional layouts and cover designs
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-300 text-lg">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-2">Sample</h3>
              <p className="text-gray-400 mb-4">Free</p>
              <ul className="text-gray-300 space-y-2">
                <li>✓ 3,000 words</li>
                <li>✓ Basic formatting</li>
                <li>✓ 1 story per month</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 border-2 border-purple-400 transform scale-105 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-2">Novella</h3>
              <p className="text-white mb-4">$13 (130 credits)</p>
              <ul className="text-white space-y-2">
                <li>✓ 40-60k words</li>
                <li>✓ AI cover</li>
                <li>✓ Professional formatting</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-2">Novel</h3>
              <p className="text-gray-400 mb-4">$21 (210 credits)</p>
              <ul className="text-gray-300 space-y-2">
                <li>✓ 80-100k words</li>
                <li>✓ 4 cover options</li>
                <li>✓ Premium features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Write Your Story?
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Join thousands of writers using AI to bring their stories to life
        </p>
        <Link
          to="/signup"
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-xl transform hover:scale-105"
        >
          Get Started Free
        </Link>
      </div>
    </div>
  );
};

export default Landing;
