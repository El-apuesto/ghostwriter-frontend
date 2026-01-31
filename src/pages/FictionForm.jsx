import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storiesAPI } from '../utils/api';
import { GENRES, WRITING_STYLES, CREDIT_COSTS } from '../config';
import '../styles/fiction-form.css';

const FictionForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [generationProgress, setGenerationProgress] = useState('');

  const [premise, setPremise] = useState('');
  const [length, setLength] = useState('sample');
  const [premiumLevel, setPremiumLevel] = useState('standard');
  const [title, setTitle] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [genre, setGenre] = useState('');
  const [setting, setSetting] = useState('');
  const [tone, setTone] = useState('');
  const [themes, setThemes] = useState(['']);
  const [emulateAuthor, setEmulateAuthor] = useState('');
  const [characters, setCharacters] = useState([{ name: '', role: '', description: '', quirks: [''] }]);
  const [timeline, setTimeline] = useState([{ chapter: '', event: '', mood: '' }]);

  const creditCosts = { 
    short: CREDIT_COSTS.fiction_sample, 
    novella: CREDIT_COSTS.fiction_novella, 
    novel: CREDIT_COSTS.fiction_novel 
  };

  const getCreditCost = () => {
    let baseCost = creditCosts[length] || 0;
    if (premiumLevel === 'premium') {
      baseCost += 20;
    }
    return baseCost;
  };

  const getDollarAmount = (credits) => {
    return (credits / 10).toFixed(2); // 10 credits = $1
  };

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    const savedDraft = localStorage.getItem('fictionDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
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
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => saveDraft(), 3000);
    return () => clearTimeout(timer);
  }, [premise, length, title, writingStyle, genre, setting, tone, themes, emulateAuthor, characters, timeline]);

  const saveDraft = () => {
    try {
      const draft = { premise, length, title, writingStyle, genre, setting, tone, themes, emulateAuthor, characters, timeline, savedAt: new Date().toISOString() };
      localStorage.setItem('fictionDraft', JSON.stringify(draft));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (e) {
      console.error('Save draft failed:', e);
      setSaveStatus('');
    }
  };

  const clearDraft = () => localStorage.removeItem('fictionDraft');

  const pollForStory = async (storyId, maxAttempts = 40) => {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        setGenerationProgress(`Checking story status... (${i + 1}/${maxAttempts})`);
        const response = await storiesAPI.getOne(storyId);
        
        if (response && response.id) {
          setGenerationProgress('Story found! Redirecting...');
          return response;
        }
      } catch (err) {
        console.log(`Poll attempt ${i + 1} failed:`, err.message);
      }
      
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    throw new Error('Story generation timed out. Check your Dashboard.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGenerationProgress('');

    const cost = creditCosts[length];
    const userCredits = user?.credits_balance || 0;
    
    if (!user) {
      setError('You must be logged in to generate stories');
      return;
    }

    if (userCredits < cost) {
      setError(`Insufficient credits. Need ${cost} credits, you have ${userCredits}.`);
      return;
    }

    setLoading(true);

    const cleanCharacters = characters.filter(c => c.name).map(c => ({ ...c, quirks: c.quirks.filter(q => q) }));
    const cleanTimeline = timeline.filter(t => t.event).map(t => ({
      chapter: t.chapter,
      description: t.event,  // Map event to description for backend compatibility
      mood: t.mood
    }));
    const cleanThemes = themes.filter(t => t);

    const payload = {
      genre: (genre || 'mystery').trim().toLowerCase(),  // Clean up genre value
      theme: premise,
      premise: premise,  // Send premise as well for backend compatibility
      length: length === 'sample' ? 'short' : length,  // Convert sample to short
      ...(title && { title }),
      ...(writingStyle && { writing_style: writingStyle }),
      ...(setting && { setting }),
      ...(tone && { tone }),
      ...(cleanThemes.length && { themes: cleanThemes }),
      ...(emulateAuthor && { emulate_author: emulateAuthor }),
      ...(cleanCharacters.length && { characters: cleanCharacters }),
      ...(cleanTimeline.length && { timeline: cleanTimeline })
    };

    console.log('Submitting payload:', payload);

    try {
      setGenerationProgress('Sending request to AI...');
      const response = await storiesAPI.create(payload);
      
      console.log('Generation response:', response);
      
      if (response && response.id) {
        const storyId = response.id;
        setGenerationProgress('Story created! Waiting for completion...');
        
        const storyData = await pollForStory(storyId);
        clearDraft();
        navigate(`/story/${storyId}`, { state: { storyData } });
      } else {
        throw new Error('Invalid response from server - no story ID received');
      }
    } catch (err) {
      console.error('Full error object:', err);
      
      // User-friendly error messages
      let userFriendlyMsg = 'Something went wrong while generating your story. Please try again.';
      
      if (typeof err === 'string') {
        if (err.includes('422') || err.includes('validation')) {
          userFriendlyMsg = 'Please check all required fields and try again.';
        } else if (err.includes('credits')) {
          userFriendlyMsg = 'You don\'t have enough credits for this story length.';
        } else if (err.includes('auth')) {
          userFriendlyMsg = 'Please log in again and try.';
        } else {
          userFriendlyMsg = err;
        }
      } else if (err.message) {
        if (err.message.includes('422') || err.message.includes('validation')) {
          userFriendlyMsg = 'Please check all required fields and try again.';
        } else if (err.message.includes('credits')) {
          userFriendlyMsg = 'You don\'t have enough credits for this story length.';
        } else {
          userFriendlyMsg = err.message;
        }
      }
      
      setError(userFriendlyMsg);
      alert(`Story generation failed: ${userFriendlyMsg}\n\nYour draft has been saved. You can check your Dashboard - the story may have been created.`);
    } finally {
      setLoading(false);
      setGenerationProgress('');
    }
  };

  const addTheme = () => setThemes([...themes, '']);
  const updateTheme = (index, value) => {
    const newThemes = [...themes];
    newThemes[index] = value;
    setThemes(newThemes);
  };
  const removeTheme = (index) => setThemes(themes.filter((_, i) => i !== index));

  const addCharacter = () => setCharacters([...characters, { name: '', role: '', description: '', quirks: [''] }]);
  const updateCharacter = (index, field, value) => {
    const newCharacters = [...characters];
    newCharacters[index][field] = value;
    setCharacters(newCharacters);
  };
  const removeCharacter = (index) => setCharacters(characters.filter((_, i) => i !== index));

  const addTimelineEvent = () => setTimeline([...timeline, { chapter: '', event: '', mood: '' }]);
  const updateTimelineEvent = (index, field, value) => {
    const newTimeline = [...timeline];
    newTimeline[index][field] = value;
    setTimeline(newTimeline);
  };
  const removeTimelineEvent = (index) => setTimeline(timeline.filter((_, i) => i !== index));

  if (!user) {
    return <div className="fiction-form-container" style={{ padding: '2rem', textAlign: 'center' }}><p>Loading user data...</p></div>;
  }

  return (
    <div className="fiction-form-page">
      <div className="fiction-form-container">
        <div className="form-header">
          <h1>Generate Fiction Story</h1>
          <div className="form-actions">
            {saveStatus === 'saved' && <span className="save-status saved">Draft saved</span>}
            {saveStatus === 'saving' && <span className="save-status saving">Saving...</span>}
            <button type="button" onClick={saveDraft} className="btn btn-secondary btn-sm">Save Draft</button>
          </div>
        </div>
        <p className="form-subtitle">
          Create a compelling fiction story with AI. Cost: <strong>${getDollarAmount(getCreditCost())} ({getCreditCost()} credits)</strong> (You have {user?.credits_balance || 0} credits)
        </p>

        {error && <div className="error-message">{error}</div>}
        {generationProgress && <div className="generation-progress">{generationProgress}</div>}

        <form onSubmit={handleSubmit}>
          {/* PREMISE SECTION */}
          <div className="form-section">
            <h2 className="form-section-title">Story Premise</h2>
            <div className="form-group">
              <label>Premise <span className="required">*</span></label>
              <textarea value={premise} onChange={(e) => setPremise(e.target.value)} placeholder="Enter your story premise. Example: A detective discovers reality is a simulation..." minLength={10} maxLength={2000} required />
              <small>{premise.length}/2000 characters</small>
            </div>
          </div>

          {/* BASIC SETTINGS */}
          <div className="form-section">
            <h2 className="form-section-title">Basic Settings</h2>
            
            <div className="input-row">
              <div className="form-group">
                <label>Story Length <span className="required">*</span></label>
                <select value={length} onChange={(e) => setLength(e.target.value)} required>
                  <option value="short">Sample - FREE (~3k words)</option>
                  <option value="novella">Novella - $13 (130 credits) - 40-60k words</option>
                  <option value="novel">Novel - $21 (210 credits) - 80-100k words</option>
                </select>
                <div className="product-details">
                  {length === 'novella' && (
                    <small>
                      <strong>Includes:</strong> 40-60k words • 1 AI cover • Python templates • Back-cover copy • Title page
                    </small>
                  )}
                  {length === 'novel' && (
                    <small>
                      <strong>Includes:</strong> 80-100k words • 4 AI cover options • Python templates • Back-cover blurb • Title page
                    </small>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>Premium Upgrade <span className="optional">(Optional)</span></label>
                <select value={premiumLevel} onChange={(e) => setPremiumLevel(e.target.value)}>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium (+$2, +20 credits)</option>
                </select>
                <div className="product-details">
                  {premiumLevel === 'premium' && (
                    <small>
                      <strong>Premium includes:</strong> TOC • Dedication • About author • Creative chapter titles • Enhanced blurb
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="input-row">
              <div className="form-group">
                <label>Writing Style (Optional)</label>
                <select value={writingStyle} onChange={(e) => setWritingStyle(e.target.value)}>
                  <option value="">-- Select Style --</option>
                  {WRITING_STYLES.map(style => (
                    <option key={style.value} value={style.value}>{style.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Genre (Optional)</label>
                <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                  <option value="">-- Select Genre --</option>
                  {GENRES.map(genre => (
                    <option key={genre.value} value={genre.value}>{genre.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* CONTEXT & TONE */}
          <div className="form-section">
            <h2 className="form-section-title">Context & Tone</h2>
            
            <div className="form-group">
              <label>Setting (Optional)</label>
              <input type="text" value={setting} onChange={(e) => setSetting(e.target.value)} placeholder="Where and when does the story take place?" />
            </div>
            
            <div className="form-group">
              <label>Tone (Optional)</label>
              <input type="text" value={tone} onChange={(e) => setTone(e.target.value)} placeholder="e.g., suspenseful, darkly humorous, melancholic" />
            </div>
            
            <div className="form-group">
              <label>Emulate Author (Optional)</label>
              <input type="text" value={emulateAuthor} onChange={(e) => setEmulateAuthor(e.target.value)} placeholder="e.g., Write like Stephen King or Douglas Adams" />
            </div>
          </div>

          {/* THEMES */}
          <div className="form-section">
            <h2 className="form-section-title">Themes</h2>
            <div className="multi-input-group">
              {themes.map((theme, i) => (
                <div key={i} className="input-row">
                  <input type="text" value={theme} onChange={(e) => updateTheme(i, e.target.value)} placeholder={`Theme ${i + 1}`} />
                  {i > 0 && <button type="button" className="remove-button" onClick={() => removeTheme(i)}>×</button>}
                </div>
              ))}
              <button type="button" className="add-button" onClick={addTheme}>+ Add Theme</button>
            </div>
          </div>

          {/* CHARACTERS */}
          <div className="form-section">
            <h2 className="form-section-title">Characters (Optional)</h2>
            <div className="multi-input-group">
              {characters.map((char, i) => (
                <div key={i}>
                  <div className="input-row">
                    <input type="text" placeholder="Character name" value={char.name} onChange={(e) => updateCharacter(i, 'name', e.target.value)} />
                    <input type="text" placeholder="Role" value={char.role} onChange={(e) => updateCharacter(i, 'role', e.target.value)} />
                    {i > 0 && <button type="button" className="remove-button" onClick={() => removeCharacter(i)}>×</button>}
                  </div>
                  <input type="text" placeholder="Description" value={char.description} onChange={(e) => updateCharacter(i, 'description', e.target.value)} style={{ width: '100%', marginBottom: '0.5rem' }} />
                </div>
              ))}
              <button type="button" className="add-button" onClick={addCharacter}>+ Add Character</button>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="form-section">
            <h2 className="form-section-title">Plot Timeline (Optional)</h2>
            <div className="multi-input-group">
              {timeline.map((event, i) => (
                <div key={i} className="input-row">
                  <input type="text" placeholder="Chapter #" value={event.chapter} onChange={(e) => updateTimelineEvent(i, 'chapter', e.target.value)} />
                  <input type="text" placeholder="Event" value={event.event} onChange={(e) => updateTimelineEvent(i, 'event', e.target.value)} />
                  <input type="text" placeholder="Mood" value={event.mood} onChange={(e) => updateTimelineEvent(i, 'mood', e.target.value)} />
                  {i > 0 && <button type="button" className="remove-button" onClick={() => removeTimelineEvent(i)}>×</button>}
                </div>
              ))}
              <button type="button" className="add-button" onClick={addTimelineEvent}>+ Add Event</button>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
              {loading ? 'Generating Story... (2-3 minutes)' : `Generate Fiction (${creditCosts[length]} credits)`}
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary" disabled={loading}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FictionForm;
