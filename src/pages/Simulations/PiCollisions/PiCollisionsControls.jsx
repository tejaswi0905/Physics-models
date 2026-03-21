import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const PiCollisionsControls = ({ params, updateParam }) => {
  const handleAction = () => {
    if (params.status === 'idle') {
      updateParam('status', 'running');
    } else if (params.status === 'done') {
      updateParam('status', 'idle');
      updateParam('count', 0);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Real-time Collision Counter */}
      <div style={{ 
        background: 'var(--bg-secondary)', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        border: '1px solid var(--glass-border)',
        textAlign: 'center' 
      }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          Total Collisions computed
        </div>
        <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'monospace', lineHeight: 1 }}>
          {params.count}
        </div>
      </div>

      <button 
        onClick={handleAction}
        disabled={params.status === 'running'}
        style={{
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: params.status === 'running' ? 'var(--bg-secondary)' : 'var(--accent-primary)',
          color: params.status === 'running' ? 'var(--text-secondary)' : '#fff',
          border: `1px solid ${params.status === 'running' ? 'var(--glass-border)' : 'transparent'}`,
          cursor: params.status === 'running' ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'var(--transition-smooth)'
        }}
      >
        {params.status === 'idle' && 'Start Simulation'}
        {params.status === 'running' && 'Calculating...'}
        {params.status === 'done' && 'Reset Engine'}
      </button>

      <div style={{ opacity: params.status !== 'idle' ? 0.3 : 1, pointerEvents: params.status !== 'idle' ? 'none' : 'auto' }}>
        <Slider 
          label="Digits of Pi to Compute" 
          min={3} max={7} step={1} 
          value={params.digits} 
          onChange={(val) => {
            updateParam('digits', val);
            updateParam('status', 'idle');
            updateParam('count', 0);
          }} 
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.4 }}>
          <strong>Note:</strong> At 7 digits, the engine computes $1,000,000$ physics steps per frame to handle the massive velocity differentials without tunneling.
        </p>
      </div>
    </div>
  );
};

export default PiCollisionsControls;