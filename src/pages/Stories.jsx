import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/Stories.css'

const Stories = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, fiction, biography
  const navigate = useNavigate()

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/stories`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStories(response.data)
    } catch (err) {
      setError('Failed to load stories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (storyId) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return
    
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_API_URL}/stories/${storyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStories(stories.filter(s => s.id !== storyId))
    } catch (err) {
      alert('Failed to delete story')
      console.error(err)
    }
  }

  const filteredStories = stories.filter(story => {
    if (filter === 'all') return true
    return story.story_type === filter
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="stories-container">
        <div className="loading">Loading your stories...</div>
      </div>
    )
  }

  return (
    <div className="stories-container">
      <div className="stories-header">
        <h1>📚 Your Story Library</h1>
        <p>{stories.length} {stories.length === 1 ? 'story' : 'stories'} created</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Filter Buttons */}
      <div className="filter-buttons">
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
          Biography ({stories.filter(s => s.story_type === 'biography').length})
        </button>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="empty-state">
          <h2>No stories yet</h2>
          <p>Start creating your first story!</p>
          <div className="cta-buttons">
            <Link to="/fiction" className="btn-primary">Create Fiction</Link>
            <Link to="/biography" className="btn-primary">Create Biography</Link>
          </div>
        </div>
      ) : (
        <div className="stories-grid">
          {filteredStories.map(story => (
            <div key={story.id} className="story-card">
              <div className="story-card-header">
                <span className={`story-type-badge ${story.story_type}`}>
                  {story.story_type === 'fiction' ? '📖' : '📝'} {story.story_type}
                </span>
                <span className="story-length">{story.length_type}</span>
              </div>

              <h3 className="story-title">{story.title}</h3>
              
              <div className="story-meta">
                <span>🗓️ {formatDate(story.created_at)}</span>
                <span>💎 {story.credits_cost} credits</span>
              </div>

              {/* Extras Icons */}
              <div className="story-extras">
                {story.has_ebook_cover && <span title="eBook Cover">📕</span>}
                {story.has_print_cover && <span title="Print Cover">📘</span>}
                {story.has_epub && <span title="ePub">📄</span>}
                {story.has_mobi && <span title="MOBI">📱</span>}
                {story.has_pdf && <span title="PDF">📋</span>}
                {story.has_blurb && <span title="Blurb">✍️</span>}
                {story.has_author_bio && <span title="Author Bio">👤</span>}
              </div>

              <div className="story-actions">
                <button 
                  className="btn-view"
                  onClick={() => navigate(`/stories/${story.id}`)}
                >
                  View Story
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(story.id)}
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

export default Stories
