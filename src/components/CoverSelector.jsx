import { useState } from 'react';
import { extrasAPI } from '../utils/api';
import '../styles/main.css';

function CoverSelector({ storyId, onCoverGenerated, onClose }) {
  const [coverType, setCoverType] = useState('ebook');
  const [premium, setPremium] = useState(false);
  const [style, setStyle] = useState('dark');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const styles = [
    { value: 'dark', label: '🌑 Dark Mystery', desc: 'Shadows and noir' },
    { value: 'mystery', label: '🔍 Mystery', desc: 'Intrigue and suspense' },
    { value: 'fantasy', label: '🐉 Fantasy', desc: 'Epic and magical' },
    { value: 'romance', label: '💕 Romance', desc: 'Passionate and dramatic' },
    { value: 'scifi', label: '🚀 Sci-Fi', desc: 'Futuristic and tech' },
  ];

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await extrasAPI.generateCover(storyId, coverType, premium, style);
      
      if (premium && response.data.options) {
        // Backend returns 4 AI-generated options
        setOptions(response.data.options);
      } else {
        // Free cover generated
        onCoverGenerated(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to generate cover');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex);
    onCoverGenerated(options[optionIndex]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cover-selector" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📚 Generate Book Cover</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {!options.length ? (
          <div className="cover-options-form">
            {/* Cover Type */}
            <div className="form-group">
              <label>Cover Type</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    value="ebook"
                    checked={coverType === 'ebook'}
                    onChange={(e) => setCoverType(e.target.value)}
                  />
                  eBook (1600x2400px)
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    value="print"
                    checked={coverType === 'print'}
                    onChange={(e) => setCoverType(e.target.value)}
                  />
                  Print (6x9 with bleed)
                </label>
              </div>
            </div>

            {/* Premium Toggle */}
            <div className="form-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={premium}
                  onChange={(e) => setPremium(e.target.checked)}
                />
                <span className="toggle-text">
                  Premium AI Cover (10 credits - 4 options to choose from)
                </span>
              </label>
              {!premium && (
                <p className="help-text">Free basic cover with professional design (0 credits)</p>
              )}
            </div>

            {/* Style Selector (for free covers) */}
            {!premium && (
              <div className="form-group">
                <label>Cover Style</label>
                <div className="style-grid">
                  {styles.map((s) => (
                    <div
                      key={s.value}
                      className={`style-card ${style === s.value ? 'selected' : ''}`}
                      onClick={() => setStyle(s.value)}
                    >
                      <div className="style-label">{s.label}</div>
                      <div className="style-desc">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : `Generate Cover (${premium ? '10' : '0'} credits)`}
            </button>
          </div>
        ) : (
          <div className="cover-options-grid">
            <p className="help-text">Select your favorite cover design:</p>
            <div className="options-grid">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`cover-option ${selectedOption === index ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(index)}
                >
                  <img src={option.url} alt={`Cover option ${index + 1}`} />
                  <div className="option-label">Option {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoverSelector;
