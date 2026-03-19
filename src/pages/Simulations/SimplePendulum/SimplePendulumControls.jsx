import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const SimplePendulumControls = ({ params, updateParam }) => {
  return (
    <div className="flex flex-col gap-4">
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
