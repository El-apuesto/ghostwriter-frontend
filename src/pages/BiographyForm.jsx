import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import LoadingOverlay from '../components/LoadingOverlay'
import StoryModal from '../components/StoryModal'
import { generateBiographySample, createCheckout } from '../utils/api'

function BiographyForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [story, setStory] = useState(null)
  
  const [formData, setFormData] = useState({
    biography_type: 'biography',
    subject_names: '',
    time_period_start: '',
    time_period_end: 'Present',
    story_length: 'sample',
    email: '',
    birth_details: '',
    family_background: '',
    career: '',
    major_events: '',
    personality: '',
    narrative_voice: 'third_person_limited'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.subject_names || !formData.time_period_start || !formData.email) {
      alert('Please fill in required fields: Subject Name, Time Period, and Email')
      return
    }

    const request = {
      biography_type: formData.biography_type,
      subject_names: formData.subject_names,
      time_period_start: formData.time_period_start,
      time_period_end: formData.time_period_end,
      story_length: formData.story_length,
      email: formData.email,
      narrative_voice: formData.narrative_voice,
      birth_details: formData.birth_details ? { text: formData.birth_details } : null,
      family_background: formData.family_background ? { text: formData.family_background } : null,
      career: formData.career ? { text: formData.career } : null,
      personality: formData.personality ? { text: formData.personality } : null
    }

    if (formData.major_events) {
      try {
        request.major_events = JSON.parse(formData.major_events)
      } catch (err) {
        alert('Invalid JSON in major events: ' + err.message)
        return
      }
    }

    if (formData.story_length === 'sample') {
      setLoading(true)
      try {
        const result = await generateBiographySample(request)
        setLoading(false)
        setStory(result.story || result)
      } catch (error) {
        setLoading(false)
        alert(error.message || 'Generation failed')
      }
    } else {
      try {
        const { checkout_url } = await createCheckout(formData.story_length, formData.email)
        sessionStorage.setItem('pendingBiography', JSON.stringify(request))
        window.location.href = checkout_url
      } catch (error) {
        alert('Payment failed: ' + error.message)
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

        <div className="form-container bio-form">
          <h2 className="form-title">👤 Biography Generator</h2>
          <p className="form-subtitle">*Transform life stories into compelling narratives*</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Biography Type *</label>
              <select name="biography_type" value={formData.biography_type} onChange={handleChange}>
                <option value="biography">Biography (Someone Else's Story)</option>
                <option value="autobiography">Autobiography (Your Own Story)</option>
                <option value="memoir">Memoir (Specific Period/Theme)</option>
                <option value="family_history">Family History (Multi-generational)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Subject Name(s) *</label>
              <input
                type="text"
                name="subject_names"
                value={formData.subject_names}
                onChange={handleChange}
                placeholder="Full name of the person"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Time Period Start *</label>
                <input
                  type="text"
                  name="time_period_start"
                  value={formData.time_period_start}
                  onChange={handleChange}
                  placeholder="1945 or March 15, 1945"
                  required
                />
              </div>

              <div className="form-group">
                <label>Time Period End *</label>
                <input
                  type="text"
                  name="time_period_end"
                  value={formData.time_period_end}
                  onChange={handleChange}
                  placeholder="Present or 2020"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Story Length *</label>
              <select name="story_length" value={formData.story_length} onChange={handleChange}>
                <option value="sample">FREE SAMPLE (5-10 pages)</option>
                <option value="short_memoir">SHORT MEMOIR - $9.99 (10-20K words)</option>
                <option value="standard_biography">STANDARD BIOGRAPHY - $14.99 (30-50K words)</option>
                <option value="comprehensive">COMPREHENSIVE - $24.99 (60-100K words)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Narrative Voice</label>
              <select name="narrative_voice" value={formData.narrative_voice} onChange={handleChange}>
                <option value="first_person">First Person (I did...)</option>
                <option value="third_person_limited">Third Person Limited</option>
                <option value="third_person_omniscient">Third Person Omniscient</option>
                <option value="conversational">Conversational</option>
              </select>
            </div>

            <h3 className="section-subtitle">📝 Life Details (All Optional - AI fills in gaps)</h3>

            <div className="form-group">
              <label>Birth Details</label>
              <textarea
                name="birth_details"
                value={formData.birth_details}
                onChange={handleChange}
                placeholder="Birth date, location, circumstances, family situation..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Family Background</label>
              <textarea
                name="family_background"
                value={formData.family_background}
                onChange={handleChange}
                placeholder="Parents, siblings, heritage, family culture..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Career/Professional Life</label>
              <textarea
                name="career"
                value={formData.career}
                onChange={handleChange}
                placeholder="Jobs, achievements, career path..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Major Life Events (JSON format)</label>
              <textarea
                name="major_events"
                value={formData.major_events}
                onChange={handleChange}
                placeholder='[{"date": "1965", "event_type": "graduation", "description": "Graduated with honors", "impact": "Set career trajectory"}]'
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Personality & Character Traits</label>
              <textarea
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                placeholder="Core traits, values, quirks, sense of humor..."
                rows="3"
              />
            </div>

            <button type="submit" className="submit-button">
              <span>📖 GENERATE LIFE STORY 📖</span>
            </button>
          </form>
        </div>
      </main>

      {loading && <LoadingOverlay />}
      {story && <StoryModal story={story} onClose={() => setStory(null)} />}
      
      <footer className="footer">
        <p>© 2025 GhostWriter</p>
      </footer>
    </div>
  )
}

export default BiographyForm