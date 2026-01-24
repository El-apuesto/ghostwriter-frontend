import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { storiesAPI } from '../utils/api';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) {
        setError('No story ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await storiesAPI.getOne(id);
        
        if (!data) {
          throw new Error('Story not found');
        }
        
        setStory(data);
      } catch (err) {
        console.error('Error fetching story:', err);
        setError(err.message || 'Failed to load story');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this story?')) {
      return;
    }

    try {
      await storiesAPI.delete(id);
      navigate('/');
    } catch (err) {
      console.error('Error deleting story:', err);
      setError('Failed to delete story');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Story Not Found</h2>
            <p className="text-yellow-600 mb-4">The story you're looking for doesn't exist.</p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {story.title || 'Untitled Story'}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {story.genre && (
                    <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                      {story.genre}
                    </span>
                  )}
                  {story.theme && (
                    <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                      {story.theme}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Back
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="px-8 py-8">
            {story.status === 'generating' && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800">
                  Story is still being generated. Please refresh in a moment.
                </p>
              </div>
            )}

            {story.status === 'failed' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">
                  Story generation failed. Please try again.
                </p>
              </div>
            )}

            {story.content ? (
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {story.content}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No content available yet.</p>
            )}

            {/* Metadata */}
            {(story.setting || story.characters) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Story Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {story.setting && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-1">Setting</h3>
                      <p className="text-gray-600">{story.setting}</p>
                    </div>
                  )}
                  {story.characters && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-1">Characters</h3>
                      <p className="text-gray-600">{story.characters}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Timestamp */}
            {story.created_at && (
              <div className="mt-6 text-sm text-gray-500">
                Created: {new Date(story.created_at).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
