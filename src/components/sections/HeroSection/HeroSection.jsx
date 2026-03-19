import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button/Button';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge glass-panel">
          <span className="bullet"></span> v1.0.0 Now Live
        </div>
        <h1 className="hero-title">
          Interactive <br/>
          <span className="text-gradient">Physics Models</span>
        </h1>
        <p className="hero-subtitle">
          Explore complex mathematical concepts through performant, mathematically accurate, and visually stunning simulations.
        </p>
        <div className="hero-actions">
          <Link to="/simulations">
            <Button variant="primary">Explore Models</Button>
          </Link>
          <a href="#about" className="btn-secondary-link">
            <Button variant="secondary">Learn More</Button>
          </a>
        </div>
      </div>
      
      {/* Decorative floating elements */}
      <div className="hero-decor decor-1 glass-panel"></div>
      <div className="hero-decor decor-2 glass-panel"></div>
    </section>
  );
};

export default HeroSection;
