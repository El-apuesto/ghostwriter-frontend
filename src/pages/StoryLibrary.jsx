import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import '../styles/StoryLibrary.css'

function StoryLibrary() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, fiction, biography
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      setLoading(true)
      const response = await api.get('/stories')
      setStories(response.data)
      setError('')
    } catch (err) {
      setError('Failed to load stories. Please try again.')
      console.error('Error fetching stories:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (storyId) => {
    if (!window.confirm('Are you sure you want to delete this story? This cannot be undone.')) {
      return
    }

    try {
      await api.delete(`/stories/${storyId}`)
      setStories(stories.filter(s => s.id !== storyId))
    } catch (err) {
      alert('Failed to delete story')
      console.error('Error deleting story:', err)
    }
  }

  const filteredStories = stories.filter(story => {
    if (filter === 'all') return true
    return story.story_type === filter
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="story-library">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your stories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="story-library">
      <div className="library-header">
        <h1>📚 Your Story Library</h1>
        <p className="subtitle">{stories.length} {stories.length === 1 ? 'story' : 'stories'} created</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Stories ({stories.length})
        </button>
        <button 
          className={filter === 'fiction' ? 'active' : ''}
          onClick={() => setFilter('fiction')}
        >
          Fiction ({stories.filter(s => s.story_type === 'fiction').length})
        </button>
        <button 
          className={filter === 'biography' ? 'active' : ''}
          onClick={() => setFilter('biography')}
        >
          Biographies ({stories.filter(s => s.story_type === 'biography').length})
        </button>
      </div>

      {filteredStories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✍️</div>
          <h2>No stories yet</h2>
          <p>Start creating your first story!</p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/fiction')} className="btn-primary">
              Create Fiction
            </button>
            <button onClick={() => navigate('/biography')} className="btn-secondary">
              Create Biography
            </button>
          </div>
        </div>
      ) : (
        <div className="stories-grid">
          {filteredStories.map(story => (
            <div key={story.id} className="story-card">
              <div className="story-header">
                <span className={`story-type ${story.story_type}`}>
                  {story.story_type === 'fiction' ? '📖' : '📝'} {story.story_type}
                </span>
                <span className="story-length">{story.length_type}</span>
              </div>
              
              <h3 className="story-title">{story.title}</h3>
              
              <div className="story-meta">
                <span>🗓️ {formatDate(story.created_at)}</span>
                <span>⭐ {story.credits_cost} credits</span>
              </div>

              <div className="story-extras">
                {story.has_ebook_cover && <span className="extra-badge">📕 eBook Cover</span>}
                {story.has_print_cover && <span className="extra-badge">📘 Print Cover</span>}
                {story.has_epub && <span className="extra-badge">📄 ePub</span>}
                {story.has_mobi && <span className="extra-badge">📱 MOBI</span>}
                {story.has_pdf && <span className="extra-badge">📑 PDF</span>}
                {story.has_blurb && <span className="extra-badge">✨ Blurb</span>}
              </div>

              <div className="story-actions">
                <button 
                  onClick={() => navigate(`/stories/${story.id}`)}
                  className="btn-view"
                >
                  View Story
                </button>
                <button 
                  onClick={() => handleDelete(story.id)}
                  className="btn-delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StoryLibrary
