import React from 'react'
import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <div className="logo-text glitch" data-text="PHANTM">
            PHANTM
          </div>
          <p className="tagline">Where Stories Haunt the Digital Void</p>
        </div>
        <div className="header-actions">
          <a href="/login" className="header-btn">Login</a>
          <a href="/signup" className="header-btn signup-btn">Sign Up</a>
        </div>
      </div>
    </header>
  )
}

export default Header