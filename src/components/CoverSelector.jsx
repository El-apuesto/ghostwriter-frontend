import { useState } from 'react';
import { extrasAPI } from '../utils/api';
import '../styles/CoverSelector.css';

const CoverSelector = ({ storyId, onCoverGenerated }) => {
  const [coverType, setCoverType] = useState('ebook');
  const [premium, setPremium] = useState(false);
  const [style, setStyle] = useState('dark');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const styles = ['dark', 'mystery', 'fantasy', 'romance', 'scifi'];

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setOptions([]);
    setSelectedOption(null);

    try {
      const response = await extrasAPI.generateCover(storyId, coverType, premium, style);
      
      if (premium && response.data.options) {
        // Premium: 4 AI-generated options
        setOptions(response.data.options);
      } else {
        // Free: Single basic cover
        onCoverGenerated(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to generate cover');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (option, index) => {
    setSelectedOption(index);
    onCoverGenerated(option);
  };

  return (
    <div className="cover-selector">
      <h3>📚 Generate Book Cover</h3>
      
      <div className="cover-options">
        <div className="option-group">
          <label>Cover Type:</label>
          <div className="button-group">
            <button 
              className={coverType === 'ebook' ? 'active' : ''}
              onClick={() => setCoverType('ebook')}
            >
              📱 eBook
            </button>
            <button 
              className={coverType === 'print' ? 'active' : ''}
              onClick={() => setCoverType('print')}
            >
              📖 Print
            </button>
          </div>
        </div>

        <div className="option-group">
          <label>Quality:</label>
          <div className="button-group">
            <button 
              className={!premium ? 'active' : ''}
              onClick={() => setPremium(false)}
            >
              🆓 Free Basic (0 credits)
            </button>
            <button 
              className={premium ? 'active premium-btn' : 'premium-btn'}
              onClick={() => setPremium(true)}
            >
              ⭐ Premium AI (10 credits, 4 options)
            </button>
          </div>
        </div>

        {!premium && (
          <div className="option-group">
            <label>Style:</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              {styles.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button 
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? '⏳ Generating...' : '🎨 Generate Cover'}
      </button>

      {error && <div className="error-message">{error}</div>}

      {premium && options.length > 0 && (
        <div className="cover-gallery">
          <h4>Choose Your Favorite (Click to Select):</h4>
          <div className="options-grid">
            {options.map((option, index) => (
              <div 
                key={index}
                className={`cover-option ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleSelectOption(option, index)}
              >
                <img src={option.url} alt={`Cover option ${index + 1}`} />
                {selectedOption === index && <div className="selected-badge">✓ Selected</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverSelector;
