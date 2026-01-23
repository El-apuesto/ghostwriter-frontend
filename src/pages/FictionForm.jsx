import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storiesAPI } from '../utils/api';

const FictionForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [generationProgress, setGenerationProgress] = useState('');

  const [premise, setPremise] = useState('');
  const [length, setLength] = useState('sample');
  const [title, setTitle] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [genre, setGenre] = useState('');
  const [setting, setSetting] = useState('');
  const [tone, setTone] = useState('');
  const [themes, setThemes] = useState(['']);
  const [emulateAuthor, setEmulateAuthor] = useState('');
  const [characters, setCharacters] = useState([{ name: '', role: '', description: '', quirks: [''] }]);
  const [timeline, setTimeline] = useState([{ chapter: '', event: '', mood: '' }]);

  const creditCosts = { sample: 0, novella: 50, novel: 100 };

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
        
        if (response.data && response.data.id) {
          setGenerationProgress('Story found! Redirecting...');
          return response.data;
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

    try {
      setGenerationProgress('Sending request to AI...');
      const response = await storiesAPI.generateFiction(payload);
      
      console.log('Generation response:', response.data);
      
      if (response.data && response.data.story && response.data.story.id) {
        const storyId = response.data.story.id;
        setGenerationProgress('Story created! Waiting for completion...');
        
        const storyData = await pollForStory(storyId);
        clearDraft();
        navigate(`/stories/${storyId}`, { state: { storyData } });
      } else {
        throw new Error('Invalid response from server - no story ID received');
      }
    } catch (err) {
      const errorMsg = err.message || 'Failed to generate story';
      setError(errorMsg);
      console.error('Generation error:', err);
      alert(`Generation failed: ${errorMsg}\n\nYour draft has been saved. Check your Dashboard - the story may have been created.`);
    } finally {
      setLoading(false);
      setGenerationProgress('');
    }
  };

  if (!user) {
    return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}><p>Loading user data...</p></div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Generate Fiction</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {saveStatus === 'saved' && <span style={{ color: 'var(--success)' }}>Draft saved</span>}
          {saveStatus === 'saving' && <span style={{ color: 'var(--text-secondary)' }}>Saving...</span>}
          <button type="button" onClick={saveDraft} className="btn btn-secondary btn-sm">Save Draft</button>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Create a fiction story with AI. Cost: <strong>{creditCosts[length]} credits</strong> (You have {user?.credits_balance || 0})
      </p>

      {error && <div className="error-message" style={{ marginBottom: '1rem', padding: '1rem', background: '#ff000020', border: '1px solid #ff0000', borderRadius: '8px', color: '#ff6b6b' }}>{error}</div>}
      {generationProgress && <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0, 255, 249, 0.1)', border: '1px solid var(--cyan)', borderRadius: '8px', color: 'var(--cyan)' }}>{generationProgress}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Premise *</label>
          <textarea value={premise} onChange={(e) => setPremise(e.target.value)} placeholder="A detective discovers reality is a simulation..." minLength={10} maxLength={2000} required />
          <small style={{ color: 'var(--text-secondary)' }}>{premise.length}/2000 characters</small>
        </div>

        <div className="form-group">
          <label>Story Length *</label>
          <select value={length} onChange={(e) => setLength(e.target.value)} required>
            <option value="sample">Sample (FREE)</option>
            <option value="novella">Novella (50 credits)</option>
            <option value="novel">Novel (100 credits)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Title (Optional)</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Leave blank for AI-generated title" />
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

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? 'Generating Story... (this may take 2-3 minutes)' : `Generate Fiction (${creditCosts[length]} credits)`}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary" disabled={loading}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default FictionForm;