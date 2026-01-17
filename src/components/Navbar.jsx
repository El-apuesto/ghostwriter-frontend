import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-ghost">👻</span>
          <span className="logo-text">GhostWriter</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <Link to="/fiction" className="navbar-link">
                Generate Fiction
              </Link>
              <Link to="/biography" className="navbar-link">
                Generate Biography
              </Link>
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
              
              {/* Credits Display */}
              <div className="navbar-credits">
                <span className="credits-icon">⚡</span>
                <span className="credits-amount">{user?.credits || 0}</span>
                <span className="credits-label">credits</span>
              </div>

              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
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
