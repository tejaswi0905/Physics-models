import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button/Button';
import { featuredModels } from '../../../data/featuredModels';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-grid container">
        
        {/* Left: Text Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="bullet"></span> v2.0 Premium Experience
          </div>
          <h1 className="hero-title">
            Interactive <br/>
            <span className="text-gradient">Physics Models</span>
          </h1>
          <p className="hero-subtitle">
            Explore complex mathematical concepts through performant, mathematically accurate, and visually breathtaking simulations.
          </p>
          <div className="hero-actions">
            <Link to="/simulations">
              <Button variant="primary">Start Exploring</Button>
            </Link>
            <Link to="/docs" style={{ marginLeft: '1rem' }}>
              <Button variant="secondary">Learn to add models</Button>
            </Link>
          </div>
        </div>

        {/* Right: Featured Models Showcase */}
        <div className="hero-featured">
          <h3 className="featured-heading">Featured Simulations</h3>
          <div className="featured-list">
            {featuredModels.map((model, idx) => (
              <Link to={model.path} key={model.id} className="featured-card" style={{animationDelay: `${0.15 + idx * 0.15}s`}}>
                <div className="card-image-wrap">
                   <img src={model.image} alt={model.title} className="card-image" />
                </div>
                <div className="card-info">
                  <h4>{model.title}</h4>
                  <p>{model.tags[0]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
