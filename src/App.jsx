import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import FictionForm from './pages/FictionForm'
import BiographyForm from './pages/BiographyForm'
import Success from './pages/Success'
import Cancel from './pages/Cancel'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <div className="fog"></div>
          <div className="grid-background"></div>
          <div className="scanlines"></div>
          
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/fiction" element={
              <ProtectedRoute>
                <FictionForm />
              </ProtectedRoute>
            } />
            <Route path="/biography" element={
              <ProtectedRoute>
                <BiographyForm />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App