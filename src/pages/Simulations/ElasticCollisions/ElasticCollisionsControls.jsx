// src/pages/Simulations/ElasticCollisions/ElasticCollisionsControls.jsx

import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const ElasticCollisionsControls = ({ params, updateParam }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <p className="controls-instruction">
      <strong>Interactive:</strong> Watch particles transfer kinetic energy accurately using automated Quadtree space partitioning.<br/><br/>
      Adjust the number of balls below to test the calculation limits of the geometric collision engine.
    </p>
    <Slider 
      label="Number of Balls" 
      min={2} 
      max={20} 
      step={1} 
      value={params.numBalls} 
      onChange={(val) => updateParam('numBalls', val)} 
    />
  </div>
);

export default ElasticCollisionsControls;