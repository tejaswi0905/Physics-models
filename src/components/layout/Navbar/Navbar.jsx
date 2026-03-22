import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isForcedOpen, setIsForcedOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menus instantly on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsForcedOpen(false); // auto-hide reset at top
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showNavbar = !isScrolled || isForcedOpen;

  return (
    <>
      <button 
        className={`nav-toggle-btn ${!showNavbar ? 'visible' : ''}`}
        onClick={() => setIsForcedOpen(true)}
        aria-label="Show Navigation"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <nav className={`navbar glass-panel ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
        <div className="container nav-container">
          <Link to="/" className="nav-brand">
            <span className="text-gradient font-display logo-text">PhysicsModels</span>
          </Link>
          
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>Home</Link>
            <Link to="/simulations" className={`nav-link ${location.pathname.startsWith('/simulations') ? 'active' : ''}`}>Simulations</Link>
            <Link to="/docs" className={`nav-link ${location.pathname.startsWith('/docs') ? 'active' : ''}`}>Docs</Link>
            <a href="https://github.com/tejaswi0905/Physics-models" target="_blank" rel="noopener noreferrer" className="nav-link">
              GitHub
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
