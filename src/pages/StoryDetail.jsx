import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/StoryDetail.css'

const StoryDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [generatingExtra, setGeneratingExtra] = useState(null)

  useEffect(() => {
    fetchStory()
  }, [id])

  const fetchStory = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/stories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStory(response.data)
    } catch (err) {
      setError('Failed to load story')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const generateExtra = async (extraType, endpoint, cost) => {
    if (!window.confirm(`Generate ${extraType}? This will cost ${cost} credits.`)) return

    setGeneratingExtra(extraType)
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/extras/${endpoint}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(`${extraType} generated successfully!`)
      fetchStory() // Refresh to show new extras
    } catch (err) {
      alert(`Failed to generate ${extraType}: ${err.response?.data?.detail || err.message}`)
    } finally {
      setGeneratingExtra(null)
    }
  }

  const generateCover = async (coverType) => {
    const cost = coverType === 'ebook' ? 10 : 15
    if (!window.confirm(`Generate ${coverType} cover? This will cost ${cost} credits.`)) return

    setGeneratingExtra(`${coverType}-cover`)
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/extras/cover?story_id=${id}&cover_type=${coverType}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert(`${coverType} cover generated!`)
      fetchStory()
    } catch (err) {
      alert(`Failed to generate cover: ${err.response?.data?.detail || err.message}`)
    } finally {
      setGeneratingExtra(null)
    }
  }

  const renderContent = () => {
    if (story.story_type === 'fiction') {
      // Fiction has structured chapters
      return (
        <div className="fiction-content">
          {story.content.outline && (
            <div className="outline-section">
              <h2>📋 Story Outline</h2>
              <p>{story.content.outline}</p>
            </div>
          )}

          {story.content.characters && story.content.characters.length > 0 && (
            <div className="characters-section">
              <h2>👥 Characters</h2>
              {story.content.characters.map((char, idx) => (
                <div key={idx} className="character-card">
                  <h3>{char.name}</h3>
                  <p><strong>Role:</strong> {char.role}</p>
                  <p>{char.description}</p>
                </div>
              ))}
            </div>
          )}

          {story.content.chapters && story.content.chapters.length > 0 && (
            <div className="chapters-section">
              <h2>📖 Chapters</h2>
              {story.content.chapters.map((chapter, idx) => (
                <div key={idx} className="chapter">
                  <h3>Chapter {chapter.number}: {chapter.title}</h3>
                  <div className="chapter-content">{chapter.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    } else {
      // Biography is plain text
      return (
        <div className="biography-content">
          <div className="content-text">
            {story.content}
          </div>
        </div>
      )
    }
  }

  if (loading) {
    return <div className="story-detail-container"><div className="loading">Loading story...</div></div>
  }

  if (error || !story) {
    return (
      <div className="story-detail-container">
        <div className="error-message">{error || 'Story not found'}</div>
        <button onClick={() => navigate('/stories')} className="btn-back">← Back to Library</button>
      </div>
    )
  }

  return (
    <div className="story-detail-container">
      <button onClick={() => navigate('/stories')} className="btn-back">← Back to Library</button>

      {/* Story Header */}
      <div className="story-header">
        <h1>{story.title}</h1>
        <div className="story-meta">
          <span className={`badge ${story.story_type}`}>{story.story_type}</span>
          <span className="badge">{story.length_type}</span>
          <span>📅 {new Date(story.created_at).toLocaleDateString()}</span>
          <span>💎 {story.credits_cost} credits</span>
        </div>
      </div>

      {/* Story Content */}
      <div className="story-content">
        {renderContent()}
      </div>

      {/* Extras Section */}
      <div className="extras-section">
        <h2>📦 Story Extras</h2>
        <p className="extras-description">Generate additional content and exports for your story</p>

        <div className="extras-grid">
          {/* Book Covers */}
          <div className="extra-card">
            <h3>📕 eBook Cover</h3>
            <p>Digital book cover (1600x2560px)</p>
            <p className="cost">Cost: 10 credits</p>
            {story.has_ebook_cover ? (
              <button className="btn-has" disabled>✓ Generated</button>
            ) : (
              <button 
                onClick={() => generateCover('ebook')}
                disabled={generatingExtra === 'ebook-cover'}
                className="btn-generate"
              >
                {generatingExtra === 'ebook-cover' ? 'Generating...' : 'Generate'}
              </button>
            )}
          </div>

          <div className="extra-card">
            <h3>📘 Print Cover</h3>
            <p>Print-ready cover with spine</p>
            <p className="cost">Cost: 15 credits</p>
            {story.has_print_cover ? (
              <button className="btn-has" disabled>✓ Generated</button>
            ) : (
              <button 
                onClick={() => generateCover('print')}
                disabled={generatingExtra === 'print-cover'}
                className="btn-generate"
              >
                {generatingExtra === 'print-cover' ? 'Generating...' : 'Generate'}
              </button>
            )}
          </div>

          {/* Exports */}
          <div className="extra-card">
            <h3>📄 ePub Export</h3>
            <p>Standard eBook format</p>
            <p className="cost">Cost: 5 credits</p>
            {story.has_epub ? (
              <button className="btn-has" disabled>✓ Generated</button>
            ) : (
              <button 
                onClick={() => generateExtra('ePub', 'epub', 5)}
                disabled={generatingExtra === 'ePub'}
                className="btn-generate"
              >
                {generatingExtra === 'ePub' ? 'Generating...' : 'Generate'}
              </button>
            )}
          </div>

          <div className="extra-card">
            <h3>📱 MOBI Export</h3>
            <p>Kindle-compatible format</p>
            <p className="cost">Cost: 5 credits</p>
            {story.has_mobi ? (
              <button className="btn-has" disabled>✓ Generated</button>
            ) : (
              <button 
                onClick={() => generateExtra('MOBI', 'mobi', 5)}
                disabled={generatingExtra === 'MOBI'}
                className="btn-generate"
              >
                {generatingExtra === 'MOBI' ? 'Generating...' : 'Generate'}
              </button>
            )}
          </div>

          <div className="extra-card">
            <h3>📋 PDF Export</h3>
            <p>KDP-ready PDF file</p>
            <p className="cost">Cost: 10 credits</p>
            {story.has_pdf ? (
              <button className="btn-has" disabled>✓ Generated</button>
            ) : (
              <button 
                onClick={() => generateExtra('PDF', 'pdf', 10)}
                disabled={generatingExtra === 'PDF'}
                className="btn-generate"
              >
                {generatingExtra === 'PDF' ? 'Generating...' : 'Generate'}
              </button>
            )}
          </div>

          {/* Marketing */}
          <div className="extra-card">
            <h3>✍️ Book Blurb</h3>
            <p>Marketing description</p>
            <p className="cost">Cost: 5 credits</p>
            {story.has_blurb ? (
              <button className="btn-has" disabled>✓ Generated</button>
            ) : (
              <button 
                onClick={() => generateExtra('Blurb', 'blurb', 5)}
                disabled={generatingExtra === 'Blurb'}
                className="btn-generate"
              >
                {generatingExtra === 'Blurb' ? 'Generating...' : 'Generate'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryDetail
