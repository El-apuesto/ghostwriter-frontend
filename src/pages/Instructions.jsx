import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/global.css'

const Instructions = () => {
  return (
    <div className="page-container">
      <div className="form-container">
        <div className="back-button" onClick={() => window.history.back()}>
          ← Back
        </div>
        
        <h1 className="form-title">How to Use Phantm.ink</h1>
        <p className="form-subtitle">Complete guide to AI-powered novel generation</p>
        
        {/* Getting Started */}
        <div className="section-subtitle">🚀 Getting Started</div>
        <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px'}}>
          <li><strong>Sign Up:</strong> Create your free account</li>
          <li><strong>Buy Credits:</strong> Purchase credit packages for story generation</li>
          <li><strong>Choose Story Type:</strong> Fiction, Biography, or Memoir</li>
          <li><strong>Fill Form:</strong> Complete the story generation form</li>
          <li><strong>Generate:</strong> Start your AI-powered novel</li>
        </ul>
        
        {/* Story Types */}
        <div className="section-subtitle">📚 Story Types & Lengths</div>
        
        <div style={{background: 'rgba(26, 26, 26, 0.9)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
          <h4 style={{color: 'var(--neon-cyan)', marginBottom: '15px'}}>Fiction Stories</h4>
          <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', paddingLeft: '20px'}}>
            <li><strong>Short:</strong> 3,000 words (Free)</li>
            <li><strong>Medium:</strong> 8,000 words (130 credits)</li>
            <li><strong>Long:</strong> 15,000 words (130 credits)</li>
            <li><strong>Novella:</strong> 45,000 words (130 credits)</li>
            <li><strong>Novel:</strong> 90,000 words (210 credits)</li>
            <li><strong>Epic:</strong> 140,000 words (230 credits)</li>
          </ul>
        </div>
        
        <div style={{background: 'rgba(26, 26, 26, 0.9)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
          <h4 style={{color: 'var(--neon-cyan)', marginBottom: '15px'}}>Biography & Memoir</h4>
          <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', paddingLeft: '20px'}}>
            <li><strong>Biography:</strong> Life story of another person</li>
            <li><strong>Memoir:</strong> Your personal life story</li>
            <li><strong>Auto-Biography:</strong> Your life story in your voice</li>
            <li><strong>Non-Fiction Upgrade:</strong> +50 credits for research and factual accuracy</li>
          </ul>
        </div>
        
        {/* Form Fields Guide */}
        <div className="section-subtitle">📝 Form Fields Guide</div>
        
        <div style={{background: 'rgba(26, 26, 26, 0.9)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
          <h4 style={{color: 'var(--neon-cyan)', marginBottom: '15px'}}>Basic Information</h4>
          <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', paddingLeft: '20px'}}>
            <li><strong>Title:</strong> Your story title (optional, AI can generate)</li>
            <li><strong>Premise:</strong> Core concept or plot summary</li>
            <li><strong>Genre:</strong> Fiction type (Fantasy, Romance, Sci-Fi, etc.)</li>
            <li><strong>Length:</strong> Word count desired</li>
            <li><strong>Premium Level:</strong> Standard or Premium (includes extra features)</li>
          </ul>
        </div>
        
        <div style={{background: 'rgba(26, 26, 26, 0.9)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
          <h4 style={{color: 'var(--neon-cyan)', marginBottom: '15px'}}>Story Elements</h4>
          <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', paddingLeft: '20px'}}>
            <li><strong>Setting:</strong> Time and place of your story</li>
            <li><strong>Tone:</strong> Mood and atmosphere (Dark, Humorous, etc.)</li>
            <li><strong>Themes:</strong> Main ideas or messages (Love, Revenge, etc.)</li>
            <li><strong>Writing Style:</strong> Narrative voice and prose style</li>
            <li><strong>Emulate Author:</strong> Write like famous authors (optional)</li>
          </ul>
        </div>
        
        <div style={{background: 'rgba(26, 26, 26, 0.9)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
          <h4 style={{color: 'var(--neon-cyan)', marginBottom: '15px'}}>Characters</h4>
          <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', paddingLeft: '20px'}}>
            <li><strong>Name:</strong> Character name</li>
            <li><strong>Role:</strong> Protagonist, antagonist, supporting</li>
            <li><strong>Description:</strong> Physical appearance and personality</li>
            <li><strong>Quirks:</strong> Unique habits or mannerisms</li>
            <li><strong>Add multiple characters</strong> for complex stories</li>
          </ul>
        </div>
        
        <div style={{background: 'rgba(26, 26, 26, 0.9)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
          <h4 style={{color: 'var(--neon-cyan)', marginBottom: '15px'}}>Timeline/Plot Points</h4>
          <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', paddingLeft: '20px'}}>
            <li><strong>Chapter:</strong> Chapter number or section</li>
            <li><strong>Event:</strong> Major plot point that happens</li>
            <li><strong>Mood:</strong> Emotional tone of this section</li>
            <li><strong>Add multiple timeline points</strong> to structure your story</li>
          </ul>
        </div>
        
        {/* Premium Features */}
        <div className="section-subtitle">✨ Premium Features</div>
        <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px'}}>
          <li><strong>About the Author Section:</strong> Professional author bio</li>
          <li><strong>Title Page:</strong> Professional book title page</li>
          <li><strong>Table of Contents:</strong> Auto-generated chapter listings</li>
          <li><strong>10 AI Cover Images:</strong> AI-generated cover art options</li>
          <li><strong>Cover Upload:</strong> Upload your own cover image</li>
          <li><strong>Author Photo:</strong> Upload photo for about page</li>
        </ul>
        
        {/* Generation Process */}
        <div className="section-subtitle">🤖 Generation Process</div>
        <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px'}}>
          <li><strong>Step 1:</strong> AI creates chapter outline based on your input</li>
          <li><strong>Step 2:</strong> Each chapter generated with context continuity</li>
          <li><strong>Step 3:</strong> Progress saved after each chapter</li>
          <li><strong>Step 4:</strong> Review and download your completed story</li>
          <li><strong>Time:</strong> Novels take 15-30 minutes to generate</li>
        </ul>
        
        {/* Tips */}
        <div className="section-subtitle">💡 Pro Tips</div>
        <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px'}}>
          <li>Be specific in your premise for better results</li>
          <li>Add 3-5 main characters for rich storytelling</li>
            <li>Include 5-10 timeline points for good structure</li>
          <li>Use themes to guide the AI's focus</li>
          <li>Save drafts often (auto-save enabled)</li>
          <li>Check generation progress in your dashboard</li>
        </ul>
        
        {/* Credits */}
        <div className="section-subtitle">💰 Credits & Pricing</div>
        <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px'}}>
          <li><strong>Novella Pack:</strong> $13 (130 credits)</li>
          <li><strong>Premium Novella:</strong> $15 (150 credits)</li>
          <li><strong>Novel Pack:</strong> $21 (210 credits)</li>
          <li><strong>Premium Novel:</strong> $23 (230 credits)</li>
          <li><strong>Double Feature:</strong> $39 (390 credits) - 2 novels</li>
          <li><strong>Triple Feature:</strong> $63 (630 credits) - 3 novels</li>
          <li><strong>Non-Fiction Upgrade:</strong> $5 (50 credits)</li>
        </ul>
        
        <div className="form-group">
          <Link to="/dashboard" className="neon-button" style={{display: 'inline-block', textAlign: 'center', marginRight: '10px'}}>
            Start Writing
          </Link>
          <Link to="/credits" className="neon-button" style={{display: 'inline-block', textAlign: 'center'}}>
            Buy Credits
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Instructions
