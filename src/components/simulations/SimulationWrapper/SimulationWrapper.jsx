import React from 'react';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import './SimulationWrapper.css';

const SimulationWrapper = ({ 
  title, 
  description, 
  canvasComponent: Canvas, 
  controlsComponent: Controls, 
  onReset 
}) => {
  return (
    <div className="sim-wrapper-container">
      <div className="sim-header">
        <div>
          <h1 className="sim-title text-gradient">{title}</h1>
          <p className="sim-description">{description}</p>
        </div>
      </div>
      
      <div className="sim-layout">
        {/* Canvas Area */}
        <div className="sim-canvas-area glass-panel">
          <Canvas />
        </div>
        
        {/* Controls Sidebar */}
        <Card className="sim-controls-sidebar">
          <div className="controls-header">
            <h3>Parameters</h3>
            <Button variant="ghost" onClick={onReset} className="reset-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </Button>
          </div>
          <div className="controls-content">
            <Controls />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SimulationWrapper;
