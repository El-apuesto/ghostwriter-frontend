import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storiesAPI } from '../utils/api';

const Landing = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await storiesAPI.getAll();
        setStories(data || []);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to load stories');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* CRITICAL FIX: Correct logo path */}
            <img 
              src="/logo.PNG" 
              alt="Ghostwriter Logo" 
              className="h-16 mx-auto mb-6"
              onError={(e) => {
                console.error('Logo failed to load');
                e.target.style.display = 'none';
              }}
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Ghostwriter AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Create amazing stories with the power of AI
            </p>
            <Link
              to="/create"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Writing
            </Link>
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Stories</h2>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading stories...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && stories.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No stories yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start creating your first AI-generated story
            </p>
            <Link
              to="/create"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Story
            </Link>
          </div>
        )}

        {!loading && !error && stories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Link
                key={story.id}
                to={`/story/${story.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {story.title || 'Untitled Story'}
                    </h3>
                    {story.status === 'generating' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Generating
                      </span>
                    )}
                    {story.status === 'completed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Complete
                      </span>
                    )}
                    {story.status === 'failed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Failed
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.genre && (
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {story.genre}
                      </span>
                    )}
                    {story.theme && (
                      <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                        {story.theme}
                      </span>
                    )}
                  </div>

                  {story.content && (
                    <p className="text-gray-600 line-clamp-3 text-sm mb-4">
                      {story.content}
                    </p>
                  )}

                  <div className="text-sm text-gray-500">
                    {story.created_at &&
                      new Date(story.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
