import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, credits, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/ghost-logo.png" alt="GhostWriter" className="logo-img" />
          <span className="logo-text">GhostWriter</span>
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/fiction" className="nav-link">
                Fiction
              </Link>
              <Link to="/biography" className="nav-link">
                Biography
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <div className="credits-display">
                <span className="credits-icon">⚡</span>
                <span className="credits-amount">{credits}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
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