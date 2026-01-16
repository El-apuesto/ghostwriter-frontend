import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LoadingOverlay from '../components/LoadingOverlay'
import '../styles/StoryDetail.css'

function StoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generatingExtra, setGeneratingExtra] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStory()
  }, [id])

  const fetchStory = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/stories/${id}`)
      setStory(response.data)
      setError('')
    } catch (err) {
      setError('Failed to load story')
      console.error('Error fetching story:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateExtra = async (extraType, coverType = null) => {
    setGeneratingExtra(extraType)
    try {
      let response
      switch (extraType) {
        case 'ebook_cover':
        case 'print_cover':
          response = await api.post(`/extras/cover?story_id=${id}&cover_type=${coverType}`)
          break
        case 'epub':
          response = await api.post(`/extras/epub/${id}`)
          break
        case 'mobi':
          response = await api.post(`/extras/mobi/${id}`)
          break
        case 'pdf':
          response = await api.post(`/extras/pdf/${id}`)
          break
        case 'blurb':
          response = await api.post(`/extras/blurb/${id}`)
          break
        default:
          throw new Error('Unknown extra type')
      }
      
      alert(`${extraType} generated successfully!`)
      fetchStory() // Refresh to show new extra
    } catch (err) {
      alert(`Failed to generate ${extraType}: ${err.response?.data?.detail || err.message}`)
      console.error(`Error generating ${extraType}:`, err)
    } finally {
      setGeneratingExtra(null)
    }
  }

  const renderContent = () => {
    if (story.story_type === 'fiction' && typeof story.content === 'object') {
      return (
        <div className="fiction-content">
          {story.content.outline && (
            <section className="outline-section">
              <h3>📋 Story Outline</h3>
              <div className="outline-content">{story.content.outline}</div>
            </section>
          )}
          
          {story.content.characters && story.content.characters.length > 0 && (
            <section className="characters-section">
              <h3>👥 Characters</h3>
              {story.content.characters.map((char, idx) => (
                <div key={idx} className="character-card">
                  <h4>{char.name}</h4>
                  <p><strong>Role:</strong> {char.role}</p>
                  <p>{char.description}</p>
                </div>
              ))}
            </section>
          )}

          {story.content.chapters && story.content.chapters.length > 0 && (
            <section className="chapters-section">
              <h3>📖 Chapters</h3>
              {story.content.chapters.map((chapter, idx) => (
                <div key={idx} className="chapter">
                  <h4>Chapter {idx + 1}: {chapter.title}</h4>
                  <div className="chapter-content">{chapter.content}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      )
    } else {
      // Biography or plain text
      return (
        <div className="biography-content">
          <div className="content-text">{story.content}</div>
        </div>
      )
    }
  }

  if (loading) {
    return <LoadingOverlay message="Loading story..." />
  }

  if (error || !story) {
    return (
      <div className="story-detail error-container">
        <h2>Story not found</h2>
        <button onClick={() => navigate('/stories')} className="btn-primary">
          Back to Library
        </button>
      </div>
    )
  }

  return (
    <div className="story-detail">
      {generatingExtra && <LoadingOverlay message={`Generating ${generatingExtra}...`} />}
      
      <div className="story-header">
        <button onClick={() => navigate('/stories')} className="btn-back">
          ← Back to Library
        </button>
        
        <div className="header-content">
          <span className={`story-type-badge ${story.story_type}`}>
            {story.story_type === 'fiction' ? '📖 Fiction' : '📝 Biography'}
          </span>
          <h1>{story.title}</h1>
          <div className="meta-info">
            <span>🗓️ {new Date(story.created_at).toLocaleDateString()}</span>
            <span>📊 {story.length_type}</span>
            <span>⭐ {story.credits_cost} credits</span>
          </div>
        </div>
      </div>

      <div className="story-body">
        {renderContent()}
      </div>

      <div className="extras-section">
        <h2>🎉 Story Extras</h2>
        <p className="extras-subtitle">Enhance your story with covers, exports, and marketing content</p>
        
        <div className="extras-grid">
          {/* Book Covers */}
          <div className="extra-card">
            <div className="extra-icon">📕</div>
            <h3>eBook Cover</h3>
            <p>Digital book cover (1600x2400px)</p>
            <div className="extra-cost">10 credits</div>
            {story.has_ebook_cover ? (
              <span className="badge-complete">✓ Generated</span>
            ) : (
              <button 
                onClick={() => generateExtra('ebook_cover', 'ebook')}
                disabled={generatingExtra}
                className="btn-generate"
              >
                Generate
              </button>
            )}
          </div>

          <div className="extra-card">
            <div className="extra-icon">📘</div>
            <h3>Print Cover</h3>
            <p>Print-ready cover with spine</p>
            <div className="extra-cost">15 credits</div>
            {story.has_print_cover ? (
              <span className="badge-complete">✓ Generated</span>
            ) : (
              <button 
                onClick={() => generateExtra('print_cover', 'print')}
                disabled={generatingExtra}
                className="btn-generate"
              >
                Generate
              </button>
            )}
          </div>

          {/* Exports */}
          <div className="extra-card">
            <div className="extra-icon">📄</div>
            <h3>ePub Export</h3>
            <p>Standard eBook format</p>
            <div className="extra-cost">5 credits</div>
            {story.has_epub ? (
              <span className="badge-complete">✓ Generated</span>
            ) : (
              <button 
                onClick={() => generateExtra('epub')}
                disabled={generatingExtra}
                className="btn-generate"
              >
                Generate
              </button>
            )}
          </div>

          <div className="extra-card">
            <div className="extra-icon">📱</div>
            <h3>MOBI Export</h3>
            <p>Kindle-compatible format</p>
            <div className="extra-cost">5 credits</div>
            {story.has_mobi ? (
              <span className="badge-complete">✓ Generated</span>
            ) : (
              <button 
                onClick={() => generateExtra('mobi')}
                disabled={generatingExtra}
                className="btn-generate"
              >
                Generate
              </button>
            )}
          </div>

          <div className="extra-card">
            <div className="extra-icon">📑</div>
            <h3>KDP PDF</h3>
            <p>Print-ready manuscript</p>
            <div className="extra-cost">10 credits</div>
            {story.has_pdf ? (
              <span className="badge-complete">✓ Generated</span>
            ) : (
              <button 
                onClick={() => generateExtra('pdf')}
                disabled={generatingExtra}
                className="btn-generate"
              >
                Generate
              </button>
            )}
          </div>

          {/* Marketing */}
          <div className="extra-card">
            <div className="extra-icon">✨</div>
            <h3>Book Blurb</h3>
            <p>Marketing description</p>
            <div className="extra-cost">5 credits</div>
            {story.has_blurb ? (
              <span className="badge-complete">✓ Generated</span>
            ) : (
              <button 
                onClick={() => generateExtra('blurb')}
                disabled={generatingExtra}
                className="btn-generate"
              >
                Generate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryDetail
