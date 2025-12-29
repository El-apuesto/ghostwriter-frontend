import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import FictionForm from './pages/FictionForm'
import BiographyForm from './pages/BiographyForm'
import Success from './pages/Success'
import Cancel from './pages/Cancel'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="fog"></div>
        <div className="grid-background"></div>
        <div className="scanlines"></div>
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/fiction" element={<FictionForm />} />
          <Route path="/biography" element={<BiographyForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App