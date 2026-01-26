import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { storiesAPI, coversAPI, exportsAPI, extrasAPI } from '../utils/api';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchStory();
    // Poll for updates every 5 seconds if story is generating
    const interval = setInterval(() => {
      if (story?.status === 'generating') {
        fetchStory();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [id, story?.status]);

  const fetchStory = async () => {
    if (!id) {
      setError('No story ID provided');
      setLoading(false);
      return;
    }

    try {
      if (!story) setLoading(true);
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

  const handleGenerateCover = async (type) => {
    setProcessing(`cover-${type}`);
    try {
      let response;
      if (type === 'basic') {
        response = await coversAPI.generateBasic(id);
      } else if (type === 'ai') {
        response = await coversAPI.generateAI(id);
      } else if (type === 'print') {
        response = await coversAPI.generatePrint(id);
      }
      alert(`Cover generated! ${response.credits_charged ? `${response.credits_charged} credits charged` : 'Free'}`);
    } catch (err) {
      alert(err.message || 'Failed to generate cover');
    } finally {
      setProcessing(null);
    }
  };

  const handleExport = async (format) => {
    setProcessing(`export-${format}`);
    try {
      let response;
      if (format === 'epub') {
        response = await exportsAPI.toEPUB(id);
      } else if (format === 'pdf') {
        response = await exportsAPI.toPDF(id);
      } else if (format === 'mobi') {
        response = await exportsAPI.toMOBI(id);
      }
      alert(`Export complete! ${response.credits_charged} credits charged. Download: ${response.download_url}`);
      if (response.download_url) {
        window.open(response.download_url, '_blank');
      }
    } catch (err) {
      alert(err.message || 'Failed to export');
    } finally {
      setProcessing(null);
    }
  };

  const handleGenerateExtra = async (type) => {
    setProcessing(`extra-${type}`);
    try {
      let response;
      if (type === 'blurb') {
        response = await extrasAPI.generateBlurb(id);
        alert(`Blurb generated! ${response.credits_charged} credits charged\n\n${response.blurb}`);
      } else if (type === 'bio') {
        response = await extrasAPI.generateAuthorBio(id);
        alert(`Author bio generated! ${response.credits_charged} credits charged\n\n${response.author_bio}`);
      }
    } catch (err) {
      alert(err.message || 'Failed to generate');
    } finally {
      setProcessing(null);
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

  const isCompleted = story.status === 'completed';
  const isGenerating = story.status === 'generating';

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
                  {story.status && (
                    <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                      {story.status}
                    </span>
                  )}
                  {story.word_count > 0 && (
                    <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                      {story.word_count.toLocaleString()} words
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

          {/* Progress indicator */}
          {isGenerating && story.chapters_completed > 0 && story.total_chapters > 0 && (
            <div className="px-8 py-4 bg-blue-50 border-b border-blue-200">
              <div className="flex justify-between text-sm text-blue-800 mb-2">
                <span>Generating chapters...</span>
                <span>{story.chapters_completed} / {story.total_chapters}</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(story.chapters_completed / story.total_chapters) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Feature Buttons - Only show when completed */}
          {isCompleted && (
            <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Story Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Covers */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Covers</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleGenerateCover('basic')}
                      disabled={processing === 'cover-basic'}
                      className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                    >
                      {processing === 'cover-basic' ? 'Generating...' : 'Basic Cover (Free)'}
                    </button>
                    <button
                      onClick={() => handleGenerateCover('ai')}
                      disabled={processing === 'cover-ai'}
                      className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 disabled:opacity-50"
                    >
                      {processing === 'cover-ai' ? 'Generating...' : 'AI Cover (10 credits)'}
                    </button>
                    <button
                      onClick={() => handleGenerateCover('print')}
                      disabled={processing === 'cover-print'}
                      className="bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {processing === 'cover-print' ? 'Generating...' : 'Print Cover (15 credits)'}
                    </button>
                  </div>
                </div>

                {/* Exports */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Exports</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleExport('epub')}
                      disabled={processing === 'export-epub'}
                      className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                      {processing === 'export-epub' ? 'Exporting...' : 'EPUB (5 credits)'}
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      disabled={processing === 'export-pdf'}
                      className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                      {processing === 'export-pdf' ? 'Exporting...' : 'PDF (10 credits)'}
                    </button>
                    <button
                      onClick={() => handleExport('mobi')}
                      disabled={processing === 'export-mobi'}
                      className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                      {processing === 'export-mobi' ? 'Exporting...' : 'MOBI (5 credits)'}
                    </button>
                  </div>
                </div>

                {/* Extras */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Extras</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleGenerateExtra('blurb')}
                      disabled={processing === 'extra-blurb'}
                      className="bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700 disabled:opacity-50"
                    >
                      {processing === 'extra-blurb' ? 'Generating...' : 'Blurb (5 credits)'}
                    </button>
                    <button
                      onClick={() => handleGenerateExtra('bio')}
                      disabled={processing === 'extra-bio'}
                      className="bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700 disabled:opacity-50"
                    >
                      {processing === 'extra-bio' ? 'Generating...' : 'Author Bio (3 credits)'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Story Content */}
          <div className="px-8 py-8">
            {isGenerating && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800">
                  Story is being generated. Page will update automatically.
                </p>
              </div>
            )}

            {story.status === 'failed' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">
                  Story generation failed: {story.error_message || 'Unknown error'}
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
                      <p className="text-gray-600">{JSON.stringify(story.characters)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Timestamp */}
            {story.created_at && (
              <div className="mt-6 text-sm text-gray-500">
                Created: {new Date(story.created_at).toLocaleString()}
                {story.completed_at && (
                  <> • Completed: {new Date(story.completed_at).toLocaleString()}</>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
