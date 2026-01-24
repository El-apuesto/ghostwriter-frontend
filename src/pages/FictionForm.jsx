import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storiesAPI } from '../utils/api';

const FictionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    genre: '',
    theme: '',
    characters: '',
    setting: '',
    length: 'short'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Submit the story generation request
      const response = await storiesAPI.create(formData);
      
      if (!response || !response.id) {
        throw new Error('Failed to create story - no ID returned');
      }

      const storyId = response.id;
      console.log('Story created with ID:', storyId);

      // Poll for story completion with improved logic
      const maxAttempts = 60; // 60 attempts = 5 minutes max
      const pollInterval = 5000; // 5 seconds between polls
      let attempts = 0;
      
      const pollStory = async () => {
        try {
          attempts++;
          console.log(`Polling attempt ${attempts}/${maxAttempts}`);
          
          const story = await storiesAPI.getOne(storyId);
          
          if (story && story.status === 'completed' && story.content) {
            // Story is ready - navigate to detail page
            console.log('Story completed successfully');
            setLoading(false);
            navigate(`/story/${storyId}`);
            return;
          }
          
          if (story && story.status === 'failed') {
            throw new Error('Story generation failed');
          }
          
          // Continue polling if not completed and haven't exceeded max attempts
          if (attempts < maxAttempts) {
            setTimeout(pollStory, pollInterval);
          } else {
            throw new Error('Story generation timed out - please check back later');
          }
        } catch (pollError) {
          console.error('Polling error:', pollError);
          
          // If it's a 404, the story might not be saved yet - retry
          if (pollError.message.includes('404') && attempts < maxAttempts) {
            console.log('Story not found yet, will retry...');
            setTimeout(pollStory, pollInterval);
          } else {
            // Real error - stop polling
            setLoading(false);
            setError(pollError.message || 'Failed to check story status');
          }
        }
      };

      // Start polling after a short delay to give backend time to save
      setTimeout(pollStory, 2000);

    } catch (err) {
      console.error('Submit error:', err);
      setLoading(false); // CRITICAL FIX: Always set loading to false on error
      setError(err.message || 'Failed to generate story');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Generate Your Story
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Select a genre</option>
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Science Fiction</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="thriller">Thriller</option>
                <option value="horror">Horror</option>
              </select>
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">
                Theme *
              </label>
              <input
                type="text"
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="e.g., redemption, love conquers all, coming of age"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="characters" className="block text-sm font-medium text-gray-700 mb-2">
                Main Characters
              </label>
              <textarea
                id="characters"
                name="characters"
                value={formData.characters}
                onChange={handleChange}
                disabled={loading}
                placeholder="Describe your main characters (optional)"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-2">
                Setting
              </label>
              <input
                type="text"
                id="setting"
                name="setting"
                value={formData.setting}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g., medieval castle, futuristic city, small town"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
                Story Length
              </label>
              <select
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="short">Short (500-1000 words)</option>
                <option value="medium">Medium (1000-2000 words)</option>
                <option value="long">Long (2000+ words)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating your story...
                </span>
              ) : (
                'Generate Story'
              )}
            </button>
          </form>

          {loading && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800 text-sm">
                This may take a few minutes. Please don't close this window.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FictionForm;
