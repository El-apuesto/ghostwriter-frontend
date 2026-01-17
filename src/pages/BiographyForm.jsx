import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storiesAPI } from '../utils/api';

const BiographyForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Required fields
  const [biographyType, setBiographyType] = useState('autobiography');
  const [subjectName, setSubjectName] = useState('');
  const [timePeriodStart, setTimePeriodStart] = useState('');
  const [timePeriodEnd, setTimePeriodEnd] = useState('');
  const [length, setLength] = useState('sample');

  // Optional fields
  const [birthDate, setBirthDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthCircumstances, setBirthCircumstances] = useState('');
  const [familyBackground, setFamilyBackground] = useState('');
  const [childhoodDetails, setChildhoodDetails] = useState('');
  const [careerInfo, setCareerInfo] = useState('');
  const [relationships, setRelationships] = useState('');
  const [challenges, setChallenges] = useState('');
  const [achievements, setAchievements] = useState('');
  const [personalityTraits, setPersonalityTraits] = useState(['']);
  const [hobbies, setHobbies] = useState(['']);
  const [philosophy, setPhilosophy] = useState('');
  const [notableQuotes, setNotableQuotes] = useState(['']);
  const [sources, setSources] = useState(['']);
  const [narrativeVoice, setNarrativeVoice] = useState('');
  const [tone, setTone] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [focusAreas, setFocusAreas] = useState(['']);
  const [themes, setThemes] = useState(['']);

  // Life events array
  const [lifeEvents, setLifeEvents] = useState([
    { date: '', type: '', description: '', impact: '', emotional_weight: 5 }
  ]);

  const creditCosts = {
    sample: 0,
    short_memoir: 75,
    standard_biography: 150,
    comprehensive: 200
  };

  const handleArrayAdd = (arr, setArr) => {
    setArr([...arr, '']);
  };

  const handleArrayRemove = (arr, setArr, index) => {
    setArr(arr.filter((_, i) => i !== index));
  };

  const handleArrayChange = (arr, setArr, index, value) => {
    const newArr = [...arr];
    newArr[index] = value;
    setArr(newArr);
  };

  const handleAddLifeEvent = () => {
    setLifeEvents([...lifeEvents, { date: '', type: '', description: '', impact: '', emotional_weight: 5 }]);
  };

  const handleRemoveLifeEvent = (index) => {
    setLifeEvents(lifeEvents.filter((_, i) => i !== index));
  };

  const handleLifeEventChange = (index, field, value) => {
    const newEvents = [...lifeEvents];
    newEvents[index][field] = value;
    setLifeEvents(newEvents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check credits
    const cost = creditCosts[length];
    if (user.credits < cost) {
      setError(`Insufficient credits. Need ${cost} credits, you have ${user.credits}.`);
      return;
    }

    setLoading(true);

    // Clean arrays
    const cleanLifeEvents = lifeEvents.filter(e => e.description);
    const cleanPersonalityTraits = personalityTraits.filter(t => t);
    const cleanHobbies = hobbies.filter(h => h);
    const cleanQuotes = notableQuotes.filter(q => q);
    const cleanSources = sources.filter(s => s);
    const cleanFocusAreas = focusAreas.filter(f => f);
    const cleanThemes = themes.filter(t => t);

    const payload = {
      biography_type: biographyType,
      subject_name: subjectName,
      time_period_start: timePeriodStart,
      time_period_end: timePeriodEnd,
      length,
      ...(birthDate && { birth_date: birthDate }),
      ...(birthPlace && { birth_place: birthPlace }),
      ...(birthCircumstances && { birth_circumstances: birthCircumstances }),
      ...(familyBackground && { family_background: familyBackground }),
      ...(childhoodDetails && { childhood_details: childhoodDetails }),
      ...(careerInfo && { career_information: careerInfo }),
      ...(relationships && { relationships }),
      ...(challenges && { challenges_overcome: challenges }),
      ...(achievements && { achievements }),
      ...(cleanPersonalityTraits.length && { personality_traits: cleanPersonalityTraits }),
      ...(cleanHobbies.length && { hobbies_interests: cleanHobbies }),
      ...(philosophy && { philosophy_beliefs: philosophy }),
      ...(cleanQuotes.length && { notable_quotes: cleanQuotes }),
      ...(cleanSources.length && { sources: cleanSources }),
      ...(narrativeVoice && { narrative_voice: narrativeVoice }),
      ...(tone && { tone }),
      ...(writingStyle && { writing_style: writingStyle }),
      ...(cleanFocusAreas.length && { focus_areas: cleanFocusAreas }),
      ...(cleanThemes.length && { themes: cleanThemes }),
      ...(cleanLifeEvents.length && { major_life_events: cleanLifeEvents })
    };

    try {
      const response = await storiesAPI.generateBiography(payload);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to generate biography');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '900px' }}>
      <h1>📖 Generate Biography</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Create a biography with AI. Cost: <strong>{creditCosts[length]} credits</strong>
      </p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Required Fields */}
        <div className="form-group">
          <label>Biography Type <span style={{ color: 'var(--error)' }}>*</span></label>
          <select value={biographyType} onChange={(e) => setBiographyType(e.target.value)} required>
            <option value="autobiography">Autobiography</option>
            <option value="biography">Biography</option>
            <option value="memoir">Memoir</option>
            <option value="family_history">Family History</option>
          </select>
        </div>

        <div className="form-group">
          <label>Subject Name(s) <span style={{ color: 'var(--error)' }}>*</span></label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="e.g. John Smith, The Smith Family"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Time Period Start <span style={{ color: 'var(--error)' }}>*</span></label>
            <input
              type="text"
              value={timePeriodStart}
              onChange={(e) => setTimePeriodStart(e.target.value)}
              placeholder="e.g. 1950, January 1980"
              required
            />
          </div>
          <div className="form-group">
            <label>Time Period End <span style={{ color: 'var(--error)' }}>*</span></label>
            <input
              type="text"
              value={timePeriodEnd}
              onChange={(e) => setTimePeriodEnd(e.target.value)}
              placeholder="e.g. present, 2023"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Story Length <span style={{ color: 'var(--error)' }}>*</span></label>
          <select value={length} onChange={(e) => setLength(e.target.value)} required>
            <option value="sample">Sample (FREE)</option>
            <option value="short_memoir">Short Memoir (75 credits)</option>
            <option value="standard_biography">Standard Biography (150 credits)</option>
            <option value="comprehensive">Comprehensive (200 credits)</option>
          </select>
        </div>

        {/* Birth Details */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h3>Birth Details (Optional)</h3>
          <div className="form-group">
            <label>Birth Date</label>
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="e.g. March 15, 1950"
            />
          </div>
          <div className="form-group">
            <label>Birth Place</label>
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="e.g. Chicago, Illinois"
            />
          </div>
          <div className="form-group">
            <label>Birth Circumstances</label>
            <textarea
              value={birthCircumstances}
              onChange={(e) => setBirthCircumstances(e.target.value)}
              placeholder="Special circumstances surrounding birth"
              rows={2}
            />
          </div>
        </div>

        {/* Background Information */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h3>Background Information (Optional)</h3>
          <div className="form-group">
            <label>Family Background</label>
            <textarea
              value={familyBackground}
              onChange={(e) => setFamilyBackground(e.target.value)}
              placeholder="Family history, parents, siblings"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Childhood Details</label>
            <textarea
              value={childhoodDetails}
              onChange={(e) => setChildhoodDetails(e.target.value)}
              placeholder="Early years, education, formative experiences"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Career Information</label>
            <textarea
              value={careerInfo}
              onChange={(e) => setCareerInfo(e.target.value)}
              placeholder="Professional life, accomplishments"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Relationships</label>
            <textarea
              value={relationships}
              onChange={(e) => setRelationships(e.target.value)}
              placeholder="Important relationships, family, friends"
              rows={3}
            />
          </div>
        </div>

        {/* Life Events */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h3>Major Life Events (Optional)</h3>
          {lifeEvents.map((event, index) => (
            <div key={index} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  value={event.date}
                  onChange={(e) => handleLifeEventChange(index, 'date', e.target.value)}
                  placeholder="e.g. June 1975, Summer 1980"
                />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <input
                  type="text"
                  value={event.type}
                  onChange={(e) => handleLifeEventChange(index, 'type', e.target.value)}
                  placeholder="e.g. graduation, marriage, career change"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={event.description}
                  onChange={(e) => handleLifeEventChange(index, 'description', e.target.value)}
                  placeholder="What happened?"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Impact</label>
                <textarea
                  value={event.impact}
                  onChange={(e) => handleLifeEventChange(index, 'impact', e.target.value)}
                  placeholder="How did this affect the subject?"
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Emotional Weight (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={event.emotional_weight}
                  onChange={(e) => handleLifeEventChange(index, 'emotional_weight', parseInt(e.target.value))}
                />
                <span style={{ color: 'var(--accent-cyan)' }}>{event.emotional_weight}</span>
              </div>
              {lifeEvents.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLifeEvent(index)}
                  className="btn btn-danger"
                >
                  Remove Event
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddLifeEvent} className="btn btn-primary">
            + Add Life Event
          </button>
        </div>

        {/* Personal Details */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h3>Personal Details (Optional)</h3>
          <div className="form-group">
            <label>Challenges Overcome</label>
            <textarea
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Major challenges and how they were overcome"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Achievements</label>
            <textarea
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="Notable achievements and accomplishments"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Philosophy/Beliefs</label>
            <textarea
              value={philosophy}
              onChange={(e) => setPhilosophy(e.target.value)}
              placeholder="Life philosophy, beliefs, values"
              rows={2}
            />
          </div>

          {/* Dynamic Arrays */}
          <div className="form-group">
            <label>Personality Traits</label>
            {personalityTraits.map((trait, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={trait}
                  onChange={(e) => handleArrayChange(personalityTraits, setPersonalityTraits, index, e.target.value)}
                  placeholder="e.g. determined, compassionate"
                />
                {personalityTraits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(personalityTraits, setPersonalityTraits, index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd(personalityTraits, setPersonalityTraits)}
              className="btn btn-secondary btn-sm"
            >
              + Add Trait
            </button>
          </div>

          <div className="form-group">
            <label>Hobbies/Interests</label>
            {hobbies.map((hobby, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={hobby}
                  onChange={(e) => handleArrayChange(hobbies, setHobbies, index, e.target.value)}
                  placeholder="e.g. painting, hiking"
                />
                {hobbies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(hobbies, setHobbies, index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd(hobbies, setHobbies)}
              className="btn btn-secondary btn-sm"
            >
              + Add Hobby
            </button>
          </div>

          <div className="form-group">
            <label>Notable Quotes</label>
            {notableQuotes.map((quote, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => handleArrayChange(notableQuotes, setNotableQuotes, index, e.target.value)}
                  placeholder="Memorable quote"
                />
                {notableQuotes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(notableQuotes, setNotableQuotes, index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd(notableQuotes, setNotableQuotes)}
              className="btn btn-secondary btn-sm"
            >
              + Add Quote
            </button>
          </div>

          <div className="form-group">
            <label>Sources</label>
            {sources.map((source, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => handleArrayChange(sources, setSources, index, e.target.value)}
                  placeholder="Source of information"
                />
                {sources.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(sources, setSources, index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd(sources, setSources)}
              className="btn btn-secondary btn-sm"
            >
              + Add Source
            </button>
          </div>
        </div>

        {/* Writing Options */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
          <h3>Writing Options (Optional)</h3>
          <div className="form-group">
            <label>Narrative Voice</label>
            <select value={narrativeVoice} onChange={(e) => setNarrativeVoice(e.target.value)}>
              <option value="">-- Select Voice --</option>
              <option value="first_person">First Person</option>
              <option value="third_person_limited">Third Person Limited</option>
              <option value="third_person_omniscient">Third Person Omniscient</option>
              <option value="conversational">Conversational</option>
              <option value="formal">Formal</option>
              <option value="journalistic">Journalistic</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tone</label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="e.g. inspirational, reflective"
            />
          </div>
          <div className="form-group">
            <label>Writing Style</label>
            <input
              type="text"
              value={writingStyle}
              onChange={(e) => setWritingStyle(e.target.value)}
              placeholder="e.g. chronological, thematic"
            />
          </div>

          <div className="form-group">
            <label>Focus Areas</label>
            {focusAreas.map((area, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => handleArrayChange(focusAreas, setFocusAreas, index, e.target.value)}
                  placeholder="e.g. career, family, personal growth"
                />
                {focusAreas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(focusAreas, setFocusAreas, index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd(focusAreas, setFocusAreas)}
              className="btn btn-secondary btn-sm"
            >
              + Add Focus Area
            </button>
          </div>

          <div className="form-group">
            <label>Themes</label>
            {themes.map((theme, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => handleArrayChange(themes, setThemes, index, e.target.value)}
                  placeholder="e.g. perseverance, family legacy"
                />
                {themes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(themes, setThemes, index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd(themes, setThemes)}
              className="btn btn-secondary btn-sm"
            >
              + Add Theme
            </button>
          </div>
        </div>

        {/* Submit */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? 'Generating Biography...' : `Generate Biography (${creditCosts[length]} credits)`}
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

export default BiographyForm;
