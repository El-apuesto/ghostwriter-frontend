import React, { useState, useEffect } from 'react'

function LoadingOverlay() {
  const messages = [
    "Channeling dark creative forces...",
    "Summoning digital specters...",
    "The AI is haunted... in a good way",
    "Crafting nightmares and punchlines...",
    "Your story is possessing the server...",
    "The typewriter ghost is typing...",
    "Consulting with dead authors...",
    "Bribing the muses with coffee..."
  ]

  const [message, setMessage] = useState(messages[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="ghost-loader">👻</div>
        <p className="loading-text">{message}</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay