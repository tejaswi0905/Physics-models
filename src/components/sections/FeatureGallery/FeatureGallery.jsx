import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../ui/Card/Card';
import { simulationsData } from '../../../data/simulationsData';
import './FeatureGallery.css';

const FeatureGallery = () => {
  return (
    <section className="feature-gallery container" id="gallery">
      <div className="gallery-header">
        <h2 className="text-gradient">Featured Models</h2>
        <p className="gallery-subtitle">A collection of mathematically rigorous, visually rich interactive systems.</p>
      </div>
      
      <div className="gallery-grid">
        {simulationsData.map((sim, index) => (
          <Link to={sim.path} key={sim.id} style={{ textDecoration: 'none' }}>
            <Card hoverable className="sim-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="sim-image-container">
                <img src={sim.image} alt={sim.title} loading="lazy" />
                <div className="sim-tags">
                  {sim.tags.map(tag => (
                    <span key={tag} className="sim-tag glass-panel">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="sim-content">
                <h3>{sim.title}</h3>
                <p>{sim.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureGallery;
