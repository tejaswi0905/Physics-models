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
            <Link to="/docs">
              <Button variant="secondary">Learn to add models</Button>
            </Link>
          </div>
          
          <div className="hero-thanks" style={{
            marginTop: 'clamp(1.5rem, 4vh, 3rem)',
            padding: '1.25rem',
            borderRadius: '16px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow)',
            maxWidth: '90%',
            animation: 'fadeIn 1s ease-out 0.6s both'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>🚂 Special Thanks:</span> This interactive physics engine was heavily inspired by the phenomenal <strong style={{ color: 'var(--accent-secondary)' }}>p5.js</strong> teachings of <a href="https://thecodingtrain.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', textDecorationColor: 'var(--accent-primary)', textUnderlineOffset: '4px', fontWeight: '700', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--accent-secondary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}>The Coding Train</a>. Highly recommended for learning to code creatively!
            </p>
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
