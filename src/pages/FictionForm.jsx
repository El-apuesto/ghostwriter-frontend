import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const FictionForm = () => {
  const { credits, updateCredits } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    plot: '',
    characters: '',
    setting: '',
    themes: '',
    targetLength: 'novel',
    tone: 'balanced',
    autoGenerate: true,
  });
  const [error, setError] = useState('');
  const [generatedStory, setGeneratedStory] = useState(null);

  const genres = [
    'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance',
    'Horror', 'Adventure', 'Historical Fiction', 'Contemporary',
    'Dystopian', 'Urban Fantasy', 'Paranormal'
  ];

  const tones = [
    { value: 'light', label: 'Light & Humorous' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'dark', label: 'Dark & Serious' },
    { value: 'dramatic', label: 'Dramatic' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const requiredCredits = formData.autoGenerate ? 100 : 150;
    if (credits < requiredCredits) {
      setError(`Insufficient credits. You need ${requiredCredits} credits but have ${credits}.`);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/generate/fiction', formData);
      setGeneratedStory(response.data);
      await updateCredits();
      alert('Story generation started! Check your dashboard.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <h1 className="page-title">Generate Fiction</h1>
          <p className="page-subtitle">Fill in the details below to create your novel</p>
          <div className="credits-display-form">
            <span className="credits-icon">⚡</span>
            <span>{credits} credits</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="generation-form">
          <div className="form-group">
            <label htmlFor="title">Story Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter your story title"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre *</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="plot">Plot Summary *</label>
            <textarea
              id="plot"
              name="plot"
              value={formData.plot}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the main plot of your story..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="characters">Main Characters</label>
            <textarea
              id="characters"
              name="characters"
              value={formData.characters}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your main characters (names, traits, roles)..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="setting">Setting</label>
            <input
              type="text"
              id="setting"
              name="setting"
              value={formData.setting}
              onChange={handleChange}
              placeholder="Where and when does your story take place?"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="themes">Themes</label>
            <input
              type="text"
              id="themes"
              name="themes"
              value={formData.themes}
              onChange={handleChange}
              placeholder="Main themes (e.g., love, betrayal, redemption)"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="targetLength">Length</label>
              <select
                id="targetLength"
                name="targetLength"
                value={formData.targetLength}
                onChange={handleChange}
                className="form-select"
              >
                <option value="novella">Novella (20k-40k words)</option>
                <option value="novel">Novel (50k-80k words)</option>
                <option value="epic">Epic (90k+ words)</option>
              </select>
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
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoGenerate"
                checked={formData.autoGenerate}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>Auto-generate entire novel (100 credits)</span>
            </label>
            <p className="form-help">
              Uncheck to edit each chapter individually (150-200 credits)
            </p>
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
              {loading ? 'Generating...' : `Generate (${formData.autoGenerate ? 100 : 150}+ credits)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FictionForm;