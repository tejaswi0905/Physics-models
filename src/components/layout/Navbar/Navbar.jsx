import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar glass-panel ${!isVisible ? 'navbar-hidden' : ''}`}>
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
