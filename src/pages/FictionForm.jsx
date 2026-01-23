import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storiesAPI } from '../utils/api';

const FictionForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState(''); // 'saving', 'saved', ''

  // Required fields
  const [premise, setPremise] = useState('');
  const [length, setLength] = useState('sample');

  // Optional fields
  const [title, setTitle] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [genre, setGenre] = useState('');
  const [setting, setSetting] = useState('');
  const [tone, setTone] = useState('');
  const [themes, setThemes] = useState(['']);
  const [emulateAuthor, setEmulateAuthor] = useState('');

  // Characters array
  const [characters, setCharacters] = useState([
    { name: '', role: '', description: '', quirks: [''] }
  ]);

  // Timeline array
  const [timeline, setTimeline] = useState([
    { chapter: '', event: '', mood: '' }
  ]);

  const creditCosts = {
    sample: 0,
    novella: 50,
    novel: 100
  };

  // SAFETY CHECK: Redirect if not logged in
  useEffect(() => {
    if (!user) {
      console.error('❌ No user found, redirecting to login');
      navigate('/login');
    }
  }, [user, navigate]);

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('fictionDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        console.log('✅ Loaded draft from localStorage:', draft);
        setPremise(draft.premise || '');
        setLength(draft.length || 'sample');
        setTitle(draft.title || '');
        setWritingStyle(draft.writingStyle || '');
        setGenre(draft.genre || '');
        setSetting(draft.setting || '');
        setTone(draft.tone || '');
        setThemes(draft.themes || ['']);
        setEmulateAuthor(draft.emulateAuthor || '');
        setCharacters(draft.characters || [{ name: '', role: '', description: '', quirks: [''] }]);
        setTimeline(draft.timeline || [{ chapter: '', event: '', mood: '' }]);
      } catch (e) {
        console.error('❌ Failed to load draft:', e);
      }
    }
  }, []);

  // Autosave every 3 seconds when form changes
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft();
    }, 3000);

    return () => clearTimeout(timer);
  }, [premise, length, title, writingStyle, genre, setting, tone, themes, emulateAuthor, characters, timeline]);

  const saveDraft = () => {
    try {
      const draft = {
        premise,
        length,
        title,
        writingStyle,
        genre,
        setting,
        tone,
        themes,
        emulateAuthor,
        characters,
        timeline,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('fictionDraft', JSON.stringify(draft));
      console.log('💾 Draft saved:', draft);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (e) {
      console.error('❌ Save draft failed:', e);
      setSaveStatus('');
    }
  };

  const handleManualSave = () => {
    console.log('🖱️ Manual save clicked');
    setSaveStatus('saving');
    saveDraft();
  };

  const clearDraft = () => {
    localStorage.removeItem('fictionDraft');
    console.log('🗑️ Draft cleared');
  };

  const handleAddTheme = () => {
    console.log('➕ Adding theme');
    setThemes([...themes, '']);
  };

  const handleRemoveTheme = (index) => {
    console.log('➖ Removing theme at index:', index);
    setThemes(themes.filter((_, i) => i !== index));
  };

  const handleThemeChange = (index, value) => {
    const newThemes = [...themes];
    newThemes[index] = value;
    setThemes(newThemes);
  };

  const handleAddCharacter = () => {
    console.log('➕ Adding character. Current count:', characters.length);
    setCharacters([...characters, { name: '', role: '', description: '', quirks: [''] }]);
  };

  const handleRemoveCharacter = (index) => {
    console.log('➖ Removing character at index:', index);
    setCharacters(characters.filter((_, i) => i !== index));
  };

  const handleCharacterChange = (index, field, value) => {
    const newCharacters = [...characters];
    newCharacters[index][field] = value;
    setCharacters(newCharacters);
  };

  const handleAddQuirk = (charIndex) => {
    console.log('➕ Adding quirk to character:', charIndex);
    const newCharacters = [...characters];
    newCharacters[charIndex].quirks.push('');
    setCharacters(newCharacters);
  };

  const handleRemoveQuirk = (charIndex, quirkIndex) => {
    console.log('➖ Removing quirk:', { charIndex, quirkIndex });
    const newCharacters = [...characters];
    newCharacters[charIndex].quirks = newCharacters[charIndex].quirks.filter((_, i) => i !== quirkIndex);
    setCharacters(newCharacters);
  };

  const handleQuirkChange = (charIndex, quirkIndex, value) => {
    const newCharacters = [...characters];
    newCharacters[charIndex].quirks[quirkIndex] = value;
    setCharacters(newCharacters);
  };

  const handleAddTimelineEvent = () => {
    console.log('➕ Adding timeline event. Current count:', timeline.length);
    setTimeline([...timeline, { chapter: '', event: '', mood: '' }]);
  };

  const handleRemoveTimelineEvent = (index) => {
    console.log('➖ Removing timeline event at index:', index);
    setTimeline(timeline.filter((_, i) => i !== index));
  };

  const handleTimelineChange = (index, field, value) => {
    const newTimeline = [...timeline];
    newTimeline[index][field] = value;
    setTimeline(newTimeline);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Form submitted');
    setError('');

    // Check credits
    const cost = creditCosts[length];
    const userCredits = user?.credits_balance || 0;
    console.log('💰 Credit check:', { cost, balance: userCredits, user });
    
    if (!user) {
      setError('You must be logged in to generate stories');
      console.error('❌ No user found');
      return;
    }

    if (userCredits < cost) {
      const errorMsg = `Insufficient credits. Need ${cost} credits, you have ${userCredits}.`;
      setError(errorMsg);
      console.error('❌', errorMsg);
      return;
    }

    setLoading(true);

    // Filter out empty values
    const cleanCharacters = characters
      .filter(c => c.name)
      .map(c => ({
        ...c,
        quirks: c.quirks.filter(q => q)
      }));

    const cleanTimeline = timeline.filter(t => t.event);
    const cleanThemes = themes.filter(t => t);

    const payload = {
      premise,
      story_length: length,
      ...(title && { title }),
      ...(writingStyle && { writing_style: writingStyle }),
      ...(genre && { genre }),
      ...(setting && { setting }),
      ...(tone && { tone }),
      ...(cleanThemes.length && { themes: cleanThemes }),
      ...(emulateAuthor && { emulate_author: emulateAuthor }),
      ...(cleanCharacters.length && { characters: cleanCharacters }),
      ...(cleanTimeline.length && { timeline: cleanTimeline })
    };

    console.log('📦 Payload being sent:', payload);

    try {
      console.log('⏳ Calling API...');
      const response = await storiesAPI.generateFiction(payload);
      console.log('✅ API Response:', response);
      
      // FIXED: Backend now returns full story data in response
      // No need to fetch by ID anymore - story is complete in response.data.story
      if (response.data && response.data.story) {
        const storyData = response.data.story;
        console.log('✅ Story data received:', storyData);
        
        // Clear the draft
        clearDraft();
        
        // Navigate to the story detail page with the story ID
        // The story is already in the database, but we have all the data we need
        navigate(`/stories/${storyData.id}`, {
          state: { storyData } // Pass story data to avoid immediate fetch
        });
      } else {
        // Fallback if response structure is unexpected
        console.warn('⚠️ Unexpected response structure:', response);
        clearDraft();
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMsg = err.message || 'Failed to generate story';
      console.error('❌ API Error:', err);
      setError(errorMsg);
      alert(`Generation failed: ${errorMsg}\n\nYour draft has been saved. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  // SAFETY CHECK: Don't render form until user is loaded
  if (!user) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>📝 Generate Fiction</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {saveStatus === 'saved' && <span style={{ color: 'var(--success)' }}>✓ Draft saved</span>}
          {saveStatus === 'saving' && <span style={{ color: 'var(--text-secondary)' }}>Saving...</span>}
          <button type="button" onClick={handleManualSave} className="btn btn-secondary btn-sm">
            💾 Save Draft
          </button>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Create a fiction story with AI. Cost: <strong>{creditCosts[length]} credits</strong> (You have {user?.credits_balance || 0})
      </p>

      {error && <div className="error-message" style={{ marginBottom: '1rem', padding: '1rem', background: '#ff000020', border: '1px solid #ff0000', borderRadius: '8px', color: '#ff6b6b' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Required Fields */}
        <div className="form-group">
          <label>Premise <span style={{ color: 'var(--error)' }}>*</span></label>
          <textarea
            value={premise}
            onChange={(e) => setPremise(e.target.value)}
            placeholder="A detective discovers reality is a simulation..."
            minLength={10}
            maxLength={2000}
            required
          />
          <small style={{ color: 'var(--text-secondary)' }}>
            {premise.length}/2000 characters
          </small>
        </div>

        <div className="form-group">
          <label>Story Length <span style={{ color: 'var(--error)' }}>*</span></label>
          <select value={length} onChange={(e) => setLength(e.target.value)} required>
            <option value="sample">Sample (FREE)</option>
            <option value="novella">Novella (50 credits)</option>
            <option value="novel">Novel (100 credits)</option>
          </select>
        </div>

        {/* Optional Fields */}
        <div className="form-group">
          <label>Title (Optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Leave blank for AI-generated title"
          />
        </div>

        <div className="form-group">
          <label>Writing Style (Optional)</label>
          <select value={writingStyle} onChange={(e) => setWritingStyle(e.target.value)}>
            <option value="">-- Select Style --</option>
            <option value="sarcastic_deadpan">Sarcastic Deadpan</option>
            <option value="gothic_horror">Gothic Horror</option>
            <option value="dark_comedy">Dark Comedy</option>
            <option value="noir">Noir</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </div>

        <div className="form-group">
          <label>Genre (Optional)</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">-- Select Genre --</option>
            <option value="horror">Horror</option>
            <option value="mystery">Mystery</option>
            <option value="thriller">Thriller</option>
            <option value="dark_fantasy">Dark Fantasy</option>
            <option value="scifi">Sci-Fi</option>
            <option value="comedy">Comedy</option>
            <option value="satire">Satire</option>
          </select>
        </div>

        <div className="form-group">
          <label>Setting (Optional)</label>
          <input
            type="text"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            placeholder="e.g. Neo-Tokyo 2087, Victorian London..."
          />
        </div>

        <div className="form-group">
          <label>Tone (Optional)</label>
          <input
            type="text"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="e.g. dark, humorous, suspenseful..."
          />
        </div>

        <div className="form-group">
          <label>Emulate Author (Optional)</label>
          <input
            type="text"
            value={emulateAuthor}
            onChange={(e) => setEmulateAuthor(e.target.value)}
            placeholder="e.g. Stephen King, Douglas Adams..."
          />
        </div>

        {/* Themes */}
        <div className="form-group">
          <label>Themes (Optional)</label>
          {themes.map((theme, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={theme}
                onChange={(e) => handleThemeChange(index, e.target.value)}
                placeholder="e.g. mortality, redemption..."
              />
              {themes.length > 1 && (
                <button type="button" onClick={() => handleRemoveTheme(index)} className="btn btn-danger btn-sm">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddTheme} className="btn btn-secondary btn-sm">
            + Add Theme
          </button>
        </div>

        {/* Characters */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h3>Characters (Optional) - Total: {characters.length}</h3>
          {characters.map((char, charIndex) => (
            <div key={charIndex} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
              <div className="form-group">
                <label>Character #{charIndex + 1} Name</label>
                <input
                  type="text"
                  value={char.name}
                  onChange={(e) => handleCharacterChange(charIndex, 'name', e.target.value)}
                  placeholder="Character name"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  value={char.role}
                  onChange={(e) => handleCharacterChange(charIndex, 'role', e.target.value)}
                  placeholder="e.g. protagonist, antagonist..."
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={char.description}
                  onChange={(e) => handleCharacterChange(charIndex, 'description', e.target.value)}
                  placeholder="Physical and personality description"
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Quirks</label>
                {char.quirks.map((quirk, quirkIndex) => (
                  <div key={quirkIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      value={quirk}
                      onChange={(e) => handleQuirkChange(charIndex, quirkIndex, e.target.value)}
                      placeholder="Character quirk or trait"
                    />
                    {char.quirks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuirk(charIndex, quirkIndex)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddQuirk(charIndex)}
                  className="btn btn-secondary btn-sm"
                >
                  + Add Quirk
                </button>
              </div>
              {characters.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCharacter(charIndex)}
                  className="btn btn-danger"
                >
                  Remove Character #{charIndex + 1}
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddCharacter} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            + Add Character (Currently: {characters.length})
          </button>
        </div>

        {/* Timeline */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h3>Timeline Events (Optional) - Total: {timeline.length}</h3>
          {timeline.map((event, index) => (
            <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
              <div className="form-group">
                <label>Event #{index + 1} - Chapter # (Optional)</label>
                <input
                  type="number"
                  value={event.chapter}
                  onChange={(e) => handleTimelineChange(index, 'chapter', e.target.value)}
                  placeholder="e.g. 3"
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>Event Description</label>
                <textarea
                  value={event.event}
                  onChange={(e) => handleTimelineChange(index, 'event', e.target.value)}
                  placeholder="What happens in this event?"
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Mood (Optional)</label>
                <input
                  type="text"
                  value={event.mood}
                  onChange={(e) => handleTimelineChange(index, 'mood', e.target.value)}
                  placeholder="e.g. tense, mysterious..."
                />
              </div>
              {timeline.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTimelineEvent(index)}
                  className="btn btn-danger"
                >
                  Remove Event #{index + 1}
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddTimelineEvent} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            + Add Timeline Event (Currently: {timeline.length})
          </button>
        </div>

        {/* Submit */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? '⏳ Generating Story... (this may take 2-3 minutes)' : `🚀 Generate Fiction (${creditCosts[length]} credits)`}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FictionForm;