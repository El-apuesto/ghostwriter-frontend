import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const BiographyForm = () => {
  const { credits, updateCredits } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    birthDate: '',
    birthPlace: '',
    earlyLife: '',
    majorEvents: '',
    achievements: '',
    challenges: '',
    personality: '',
    legacy: '',
    tone: 'inspirational',
  });
  const [error, setError] = useState('');

  const tones = [
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'factual', label: 'Factual & Academic' },
    { value: 'intimate', label: 'Intimate & Personal' },
    { value: 'dramatic', label: 'Dramatic' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const requiredCredits = 150;
    if (credits < requiredCredits) {
      setError(`Insufficient credits. You need ${requiredCredits} credits but have ${credits}.`);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/generate/biography', formData);
      await updateCredits();
      alert('Biography generation started! Check your dashboard.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate biography. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <h1 className="page-title">Generate Biography</h1>
          <p className="page-subtitle">Create a compelling life story</p>
          <div className="credits-display-form">
            <span className="credits-icon">⚡</span>
            <span>{credits} credits</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="generation-form">
          <div className="form-group">
            <label htmlFor="title">Biography Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter the biography title"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject Name *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Who is this biography about?"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="text"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                placeholder="e.g., January 1, 1980"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthPlace">Birth Place</label>
              <input
                type="text"
                id="birthPlace"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleChange}
                placeholder="e.g., New York, USA"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="earlyLife">Early Life *</label>
            <textarea
              id="earlyLife"
              name="earlyLife"
              value={formData.earlyLife}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the subject's early life, family background, and formative years..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="majorEvents">Major Life Events *</label>
            <textarea
              id="majorEvents"
              name="majorEvents"
              value={formData.majorEvents}
              onChange={handleChange}
              required
              rows={4}
              placeholder="List key events, turning points, and significant moments..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="achievements">Achievements & Accomplishments</label>
            <textarea
              id="achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows={3}
              placeholder="Notable achievements, awards, and contributions..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="challenges">Challenges & Obstacles</label>
            <textarea
              id="challenges"
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              rows={3}
              placeholder="Struggles, setbacks, and how they were overcome..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="personality">Personality & Character</label>
            <textarea
              id="personality"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              rows={2}
              placeholder="Key personality traits, values, and characteristics..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="legacy">Legacy & Impact</label>
            <textarea
              id="legacy"
              name="legacy"
              value={formData.legacy}
              onChange={handleChange}
              rows={2}
              placeholder="Lasting impact and how they'll be remembered..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tone">Tone</label>
            <select
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="form-select"
            >
              {tones.map(tone => (
                <option key={tone.value} value={tone.value}>{tone.label}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Generating...' : 'Generate (150 credits)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BiographyForm;