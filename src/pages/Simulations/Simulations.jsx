import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { simulationsData } from '../../data/simulationsData';
import Card from '../../components/ui/Card/Card';
import './Simulations.css';

const Simulations = () => {
  return (
    <Layout>
      <div className="container sims-page-container">
        <div className="sims-page-header">
          <h1 className="text-gradient font-display">Simulation Library</h1>
          <p className="text-secondary">Explore all interactive physics and mathematics models.</p>
        </div>
        
        <div className="sims-list">
          {simulationsData.map(sim => (
            <Link to={sim.path} key={sim.id} className="sim-list-item-link">
              <Card className="sim-list-item" hoverable>
                <div className="sim-list-image">
                  <img src={sim.image} alt={sim.title} loading="lazy" />
                </div>
                <div className="sim-list-content">
                  <h2 className="sim-list-title">{sim.title}</h2>
                  <p className="sim-list-desc">{sim.description}</p>
                  <div className="sim-list-tags">
                    {sim.tags.map(tag => (
                      <span key={tag} className="sim-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Simulations;
