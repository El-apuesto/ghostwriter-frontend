import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">👻</span>
          <span className="logo-text">GhostWriter</span>
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/fiction" className="nav-link">Fiction</Link>
              <Link to="/biography" className="nav-link">Biography</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              
              <div className="credits-badge">
                <span className="credits-icon">⚡</span>
                <span className="credits-amount">{user?.credits || 0}</span>
              </div>

              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
