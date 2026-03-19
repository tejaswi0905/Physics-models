import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar glass-panel">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <span className="text-gradient font-display logo-text">PhysicsModels</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>Home</Link>
          <Link to="/simulations" className={`nav-link ${!isHome ? 'active' : ''}`}>Simulations</Link>
          <a href="https://github.com/tejaswi0905/Physics-models" target="_blank" rel="noopener noreferrer" className="nav-link">
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
