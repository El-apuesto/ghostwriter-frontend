import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/global.css'

const RefundPolicy = () => {
  return (
    <div className="page-container">
      <div className="form-container">
        <div className="back-button" onClick={() => window.history.back()}>
          ← Back
        </div>
        
        <h1 className="form-title">Refund Policy</h1>
        <p className="form-subtitle">Our commitment to quality and fairness</p>
        
        <div className="section-subtitle">No Refund Policy</div>
        <p style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px'}}>
          Phantm.ink operates on a strict no-refund policy for credit purchases. 
          All sales are final once credits are added to your account.
        </p>
        
        <div className="section-subtitle">Quality Guarantee</div>
        <p style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px'}}>
          We stand behind the quality of our AI-generated content. If you experience 
          issues with story generation quality, we offer account credits on a case-by-case basis.
        </p>
        
        <div className="section-subtitle">Credit Requests</div>
        <p style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px'}}>
          To request account credits for poor generation quality:
        </p>
        <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px'}}>
          <li>Contact support within 7 days of generation</li>
          <li>Provide your story ID and description of the issue</li>
          <li>Include examples of quality problems</li>
          <li>Our team will review and respond within 48 hours</li>
        </ul>
        
        <div className="section-subtitle">What Qualifies for Credits</div>
        <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px'}}>
          <li>Incoherent or nonsensical content</li>
          <li>Repetitive text generation</li>
          <li>Technical errors preventing completion</li>
          <li>Content that doesn't match your input parameters</li>
        </ul>
        
        <div className="section-subtitle">What Doesn't Qualify</div>
        <ul style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px'}}>
          <li>Personal preference for writing style</li>
          <li>Minor grammatical issues</li>
          <li>Unused credits (no expiration on credits)</li>
          <li>User input errors or unclear instructions</li>
        </ul>
        
        <div className="section-subtitle">Contact Support</div>
        <p style={{color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '30px'}}>
          For quality issues or credit requests: <br/>
          Email: support@phantm.ink <br/>
          Include your user ID and story ID in all correspondence.
        </p>
        
        <div className="form-group">
          <Link to="/dashboard" className="neon-button" style={{display: 'inline-block', textAlign: 'center'}}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RefundPolicy
