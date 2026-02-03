// Auto-save utility for form drafts
import { authAPI } from './api'

const AUTO_SAVE_KEY = 'phantm_form_draft'
const AUTO_SAVE_INTERVAL = 30000 // 30 seconds

class AutoSave {
  constructor() {
    this.timeoutId = null
    this.formData = null
    this.isDirty = false
  }

  // Start auto-save for a form
  startAutoSave(formData, storyType = 'fiction') {
    this.formData = { ...formData, storyType, timestamp: Date.now() }
    this.isDirty = true

    // Clear existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    // Set new timeout
    this.timeoutId = setTimeout(() => {
      this.saveDraft()
    }, AUTO_SAVE_INTERVAL)
  }

  // Save draft to localStorage and backend
  async saveDraft() {
    if (!this.isDirty || !this.formData) return

    try {
      // Save to localStorage for immediate recovery
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(this.formData))

      // Save to backend if user is logged in
      const user = JSON.parse(localStorage.getItem('phantm_user'))
      if (user && user.id) {
        await authAPI.saveDraft(this.formData)
      }

      this.isDirty = false
      console.log('Draft saved successfully')
    } catch (error) {
      console.error('Failed to save draft:', error)
    }
  }

  // Load draft from localStorage
  loadDraft() {
    try {
      const saved = localStorage.getItem(AUTO_SAVE_KEY)
      if (saved) {
        const draft = JSON.parse(saved)
        
        // Check if draft is not too old (24 hours)
        const maxAge = 24 * 60 * 60 * 1000
        if (Date.now() - draft.timestamp < maxAge) {
          return draft
        } else {
          // Remove old draft
          localStorage.removeItem(AUTO_SAVE_KEY)
        }
      }
    } catch (error) {
      console.error('Failed to load draft:', error)
    }
    return null
  }

  // Clear draft
  clearDraft() {
    localStorage.removeItem(AUTO_SAVE_KEY)
    this.formData = null
    this.isDirty = false
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  // Stop auto-save
  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    
    // Save one final time
    if (this.isDirty) {
      this.saveDraft()
    }
  }
}

export default new AutoSave()
