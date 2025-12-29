import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import PricingCards from '../components/PricingCards'
import LoadingOverlay from '../components/LoadingOverlay'
import StoryModal from '../components/StoryModal'
import { generateFictionSample, createCheckout } from '../utils/api'

function FictionForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [story, setStory] = useState(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const [formData, setFormData] = useState({
    premise: '',
    story_length: 'sample',
    email: '',
    title: '',
    style: 'sarcastic_deadpan',
    genre: '',
    characters: '',
    timeline: '',
    setting: '',
    tone: '',
    themes: '',
    emulate_author: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.premise || formData.premise.length < 10) {
      alert('Premise must be at least 10 characters. The spirits need more to work with.')
      return
    }
    if (!formData.email) {
      alert('Email required for haunted delivery')
      return
    }

    const request = {
      premise: formData.premise,
      story_length: formData.story_length,
      email: formData.email,
      title: formData.title || null,
      style: formData.style,
      genre: formData.genre || null,
      setting: formData.setting || null,
      tone: formData.tone || null,
      emulate_author: formData.emulate_author || null,
      themes: formData.themes ? formData.themes.split(',').map(t => t.trim()) : null
    }

    try {
      if (formData.characters) request.characters = JSON.parse(formData.characters)
      if (formData.timeline) request.timeline = JSON.parse(formData.timeline)
    } catch (err) {
      alert('Invalid JSON in advanced fields: ' + err.message)
      return
    }

    if (formData.story_length === 'sample') {
      setLoading(true)
      try {
        const result = await generateFictionSample(request)
        setLoading(false)
        setStory(result.story || result)
      } catch (error) {
        setLoading(false)
        alert(error.message || 'Generation failed')
      }
    } else {
      try {
        const { checkout_url } = await createCheckout(formData.story_length, formData.email)
        sessionStorage.setItem('pendingStory', JSON.stringify(request))
        window.location.href = checkout_url
      } catch (error) {
        alert('Payment portal failed: ' + error.message)
      }
    }
  }

  return (
    <div className="page-container">
      <Header />
      
      <main className="form-main">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Selection
        </button>

        <div className="form-container">
          <h2 className="form-title">📚 Fiction Story Generator</h2>
          <p className="form-subtitle">*Warning: May contain excessive wit and existential dread*</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Story Premise *</label>
              <textarea
                name="premise"
                value={formData.premise}
                onChange={handleChange}
                placeholder="A detective allergic to clues investigates a murder with no victim..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Story Length *</label>
              <select name="story_length" value={formData.story_length} onChange={handleChange}>
                <option value="sample">FREE SAMPLE (3-5 pages)</option>
                <option value="novella">NOVELLA - $9.99 (20-40K words)</option>
                <option value="novel">NOVEL - $19.99 (60-100K words)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Title <span className="optional">(Optional - AI will conjure one)</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Leave blank for ghostly inspiration"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Writing Style</label>
                <select name="style" value={formData.style} onChange={handleChange}>
                  <option value="sarcastic_deadpan">Sarcastic Deadpan ⚡ (Default)</option>
                  <option value="gothic_horror">Gothic Horror</option>
                  <option value="dark_comedy">Dark Comedy</option>
                  <option value="noir">Noir</option>
                  <option value="cyberpunk">Cyberpunk</option>
                  <option value="modern">Modern</option>
                </select>
              </div>

              <div className="form-group">
                <label>Genre <span className="optional">(Optional)</span></label>
                <select name="genre" value={formData.genre} onChange={handleChange}>
                  <option value="">Let AI Decide</option>
                  <option value="horror">Horror</option>
                  <option value="mystery">Mystery</option>
                  <option value="thriller">Thriller</option>
                  <option value="dark_fantasy">Dark Fantasy</option>
                  <option value="scifi">Sci-Fi</option>
                  <option value="satire">Satire</option>
                </select>
              </div>
            </div>

            <div className="advanced-section">
              <button
                type="button"
                className="advanced-toggle"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                🔮 Advanced Options (All Optional) {showAdvanced ? '▼' : '▶'}
              </button>

              {showAdvanced && (
                <div className="advanced-content">
                  <div className="form-group">
                    <label>Characters (JSON format)</label>
                    <textarea
                      name="characters"
                      value={formData.characters}
                      onChange={handleChange}
                      placeholder='[{"name": "Detective Jane", "role": "protagonist", "quirks": ["allergic to peanuts", "talks to ghosts"]}]'
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Timeline Events (JSON)</label>
                    <textarea
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      placeholder='[{"chapter": 1, "description": "Body discovered", "mood": "tense"}]'
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label>Setting</label>
                    <input
                      type="text"
                      name="setting"
                      value={formData.setting}
                      onChange={handleChange}
                      placeholder="A fog-shrouded Victorian manor..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Tone/Mood</label>
                    <input
                      type="text"
                      name="tone"
                      value={formData.tone}
                      onChange={handleChange}
                      placeholder="Dark, witty, suspenseful"
                    />
                  </div>

                  <div className="form-group">
                    <label>Emulate Author</label>
                    <input
                      type="text"
                      name="emulate_author"
                      value={formData.emulate_author}
                      onChange={handleChange}
                      placeholder="Terry Pratchett, Neil Gaiman, etc."
                    />
                  </div>

                  <div className="form-group">
                    <label>Themes (comma-separated)</label>
                    <input
                      type="text"
                      name="themes"
                      value={formData.themes}
                      onChange={handleChange}
                      placeholder="identity, revenge, redemption"
                    />
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="submit-button">
              <span>👻 CONJURE STORY 👻</span>
            </button>
          </form>
        </div>

        <PricingCards type="fiction" />
      </main>

      {loading && <LoadingOverlay />}
      {story && <StoryModal story={story} onClose={() => setStory(null)} />}
      
      <footer className="footer">
        <p>© 2025 GhostWriter</p>
      </footer>
    </div>
  )
}

export default FictionForm