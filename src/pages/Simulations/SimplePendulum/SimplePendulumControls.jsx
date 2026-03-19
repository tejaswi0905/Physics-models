import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const SimplePendulumControls = ({ params, updateParam }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <p className="controls-instruction">
      <strong>Interactive:</strong> Drag the purple bob to change the starting angle.<br/><br/>
      Adjust the sliders below to explore how string length, gravity, and mass alter the swing period and air resistance.
    </p>
    <Slider 
        label="Length" 
        min={50} max={350} step={1} 
        value={params.length} 
        onChange={(val) => updateParam('length', val)} 
        unit="px"
      />
      <Slider 
        label="Gravity" 
        min={1} max={30} step={0.1} 
        value={params.gravity} 
        onChange={(val) => updateParam('gravity', val)} 
        unit="m/s²"
      />
      <Slider 
        label="Mass Size" 
        min={10} max={50} step={1} 
        value={params.mass} 
        onChange={(val) => updateParam('mass', val)} 
        unit=""
      />
      <Slider 
        label="Damping" 
        min={0.95} max={1} step={0.001} 
        value={params.damping} 
        onChange={(val) => updateParam('damping', val)} 
        unit=""
      />
    </div>
  );
};

export default SimplePendulumControls;
