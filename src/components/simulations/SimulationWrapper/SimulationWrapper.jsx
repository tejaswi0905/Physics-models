import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import InfoModal from '../../ui/InfoModal/InfoModal';
import { simulationsData } from '../../../data/simulationsData';
import './SimulationWrapper.css';

const SimulationWrapper = ({ 
  title, 
  description, 
  canvas, 
  controls, 
  onReset,
  theoryContent
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sim-page-bleed dark-theme">
      <div className="sim-wrapper-container">
      <div className="sim-header">
        <div>
          <h1 className="sim-title text-gradient">{title}</h1>
          <p className="sim-description">{description}</p>
        </div>
        
        <div className="sim-switcher" ref={menuRef}>
          <button className="dots-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="19" cy="12" r="1.5"></circle>
              <circle cx="5" cy="12" r="1.5"></circle>
            </svg>
          </button>
          
          {menuOpen && (
            <div className="sim-switcher-menu glass-panel">
              <div className="menu-header">Other Models</div>
              <div className="menu-scroll">
                {simulationsData.map(sim => (
                  <Link 
                    to={sim.path} 
                    key={sim.id} 
                    className="menu-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="menu-item-title">{sim.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="sim-layout">
        {/* Canvas Area */}
        <div className="sim-canvas-area glass-panel">
          {canvas}
        </div>
        
        {/* Controls Sidebar */}
        <Card className="sim-controls-sidebar">
          <div className="controls-header">
            <h3>Parameters</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {theoryContent && (
                <Button variant="ghost" onClick={() => setShowTheory(true)} title="Read Theory" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </Button>
              )}
              <Button variant="ghost" onClick={onReset} className="reset-btn" title="Reset Simulation">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </Button>
            </div>
          </div>
          <div className="controls-content">
            {controls}
          </div>
        </Card>
      </div>
      
      <InfoModal isOpen={showTheory} onClose={() => setShowTheory(false)} title={`${title} Theory`}>
        {theoryContent}
      </InfoModal>
    </div>
    </div>
  );
};

export default SimulationWrapper;
