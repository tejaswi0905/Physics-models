import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const SimpleSpringControls = ({ params, updateParam }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p className="controls-instruction">
        <strong>Interactive:</strong> Drag the teal mass to stretch or compress the spring.<br/><br/>
        Adjust the sliders below to explore how stiffness, damping, and gravity alter the period of oscillation based on Hooke's Law.
      </p>

      <button 
        onClick={() => updateParam('isIdeal', !params.isIdeal)}
        style={{
          background: params.isIdeal ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
          color: params.isIdeal ? '#ffffff' : 'var(--text-primary)',
          border: `1px solid ${params.isIdeal ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}
      >
        {params.isIdeal ? '★ Ideal Spring Active' : 'Enable Ideal Spring'}
      </button>

      <Slider 
        label="Rest Length" 
        min={50} max={400} step={1} 
        value={params.restLength} 
        onChange={(val) => updateParam('restLength', val)} 
        unit="px"
      />
      <Slider 
        label="Stiffness (k)" 
        min={0.01} max={0.2} step={0.01} 
        value={params.stiffness} 
        onChange={(val) => updateParam('stiffness', val)} 
      />
      <Slider 
        label="Gravity" 
        min={0} max={2} step={0.1} 
        value={params.gravity} 
        onChange={(val) => updateParam('gravity', val)} 
      />
      
      <div style={{ opacity: params.isIdeal ? 0.3 : 1, transition: 'opacity 0.2s', pointerEvents: params.isIdeal ? 'none' : 'auto' }}>
        <Slider 
          label="Damping" 
          min={0.90} max={1.0} step={0.01} 
          value={params.damping} 
          onChange={(val) => updateParam('damping', val)} 
        />
      </div>
    </div>
  );
};

export default SimpleSpringControls;