// src/pages/Simulations/ElasticCollisions/ElasticCollisionsControls.jsx

import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const ElasticCollisionsControls = ({ params, updateParam }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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