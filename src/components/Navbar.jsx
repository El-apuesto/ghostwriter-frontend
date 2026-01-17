import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="ghost-icon">👻</span>
          <span className="brand-text">GhostWriter</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/generate/fiction" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Fiction
              </Link>
              <Link to="/generate/biography" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Biography
              </Link>
              <Link to="/library" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Library
              </Link>
              <Link to="/credits" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Credits
              </Link>
              
              {/* Credits Display */}
              <div className="credits-display">
                <span className="credits-icon">⚡</span>
                <span className="credits-amount">{user?.credits_balance || 0}</span>
              </div>

              {/* Profile Dropdown */}
              <div className="profile-menu">
                <Link to="/profile" className="profile-link" onClick={() => setMobileMenuOpen(false)}>
                  <div className="profile-avatar">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </Link>
              </div>

              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
