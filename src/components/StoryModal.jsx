import React, { useState } from 'react'

function StoryModal({ story, onClose }) {
  const [currentChapter, setCurrentChapter] = useState(0)

  const downloadStory = () => {
    let content = `${story.title}\n\n`
    
    if (story.chapters) {
      story.chapters.forEach(ch => {
        content += `Chapter ${ch.number}: ${ch.title}\n\n${ch.content}\n\n---\n\n`
      })
    } else if (story.content) {
      content += story.content
    }

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${story.title.replace(/[^a-z0-9]/gi, '_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h1 className="story-title">{story.title}</h1>
        
        {story.chapters ? (
          <>
            <div className="chapter-nav">
              {story.chapters.map((ch, idx) => (
                <button
                  key={idx}
                  className={`chapter-tab ${currentChapter === idx ? 'active' : ''}`}
                  onClick={() => setCurrentChapter(idx)}
                >
                  Ch {ch.number}
                </button>
              ))}
            </div>
            
            <div className="story-content">
              <h2>Chapter {story.chapters[currentChapter].number}: {story.chapters[currentChapter].title}</h2>
              <div className="chapter-text">
                {story.chapters[currentChapter].content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="story-content">
            <div className="chapter-text">
              {story.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button className="download-button" onClick={downloadStory}>
            💾 DOWNLOAD TXT
          </button>
          <p className="word-count">
            {story.word_count ? `${story.word_count.toLocaleString()} words` : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StoryModal