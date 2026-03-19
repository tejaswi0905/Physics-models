import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const FallingSandControls = ({ params, updateParam }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Slider 
        label="Sand Volume (Brush Size)" 
        min={1} 
        max={15} 
        step={1} 
        value={params.brushSize} 
        onChange={(val) => updateParam('brushSize', val)} 
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          Gravity Force
        </span>
        <button 
          onClick={() => updateParam('gravityEnabled', !params.gravityEnabled)}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: '8px',
            backgroundColor: params.gravityEnabled ? 'var(--accent-primary)' : 'var(--glass-bg)',
            color: 'var(--text-primary)',
            border: `1px solid ${params.gravityEnabled ? 'transparent' : 'var(--glass-border)'}`,
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'var(--transition-smooth)'
          }}
        >
          {params.gravityEnabled ? 'Standard' : 'Slow Fall'}
        </button>
      </div>
    </div>
  );
};

export default FallingSandControls;