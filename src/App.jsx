import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FictionForm from './pages/FictionForm';
import BiographyForm from './pages/BiographyForm';
import StoryLibrary from './pages/StoryLibrary';
import StoryDetail from './pages/StoryDetail';
import Credits from './pages/Credits';
import Profile from './pages/Profile';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

// Styles
import './styles/main.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/generate/fiction" element={
                <ProtectedRoute>
                  <FictionForm />
                </ProtectedRoute>
              } />
              
              <Route path="/generate/biography" element={
                <ProtectedRoute>
                  <BiographyForm />
                </ProtectedRoute>
              } />
              
              <Route path="/library" element={
                <ProtectedRoute>
                  <StoryLibrary />
                </ProtectedRoute>
              } />
              
              <Route path="/story/:id" element={
                <ProtectedRoute>
                  <StoryDetail />
                </ProtectedRoute>
              } />
              
              <Route path="/credits" element={
                <ProtectedRoute>
                  <Credits />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Payment Routes */}
              <Route path="/success" element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              } />
              
              <Route path="/cancel" element={
                <ProtectedRoute>
                  <Cancel />
                </ProtectedRoute>
              } />

              {/* Catch all - redirect to landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
