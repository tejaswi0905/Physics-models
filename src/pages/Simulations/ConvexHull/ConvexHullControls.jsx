import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const ConvexHullControls = ({ params, updateParam }) => {
  const handleAction = () => {
    if (params.status === 'idle') {
      updateParam('status', 'running');
    } else if (params.status === 'done') {
      updateParam('status', 'idle'); // Canvas will detect this and re-init the points
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p className="controls-instruction">
         <strong>Interactive:</strong> Watch the Jarvis March algorithm find the lowest geometric barrier surrounding the Point Cloud.<br/><br/>
         Generate a new field of stars by adjusting point density below, then hit Start to begin calculating the cross products.
       </p>

      <button 
        onClick={handleAction}
        disabled={params.status === 'running'}
        style={{
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: params.status === 'running' ? 'rgba(255,255,255,0.05)' : 'var(--accent-primary)',
          color: params.status === 'running' ? 'var(--text-secondary)' : '#fff',
          border: `1px solid ${params.status === 'running' ? 'var(--glass-border)' : 'transparent'}`,
          cursor: params.status === 'running' ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'all 0.2s',
          marginBottom: '0.5rem'
        }}
      >
        {params.status === 'idle' && 'Start Algorithm'}
        {params.status === 'running' && 'Computing...'}
        {params.status === 'done' && 'Reset Engine'}
      </button>

      <div style={{ opacity: params.status !== 'idle' ? 0.3 : 1, transition: 'opacity 0.2s', pointerEvents: params.status !== 'idle' ? 'none' : 'auto' }}>
        <Slider 
          label="Point Cloud Density" 
          min={10} max={150} step={1} 
          value={params.pointCount} 
          onChange={(val) => {
            updateParam('pointCount', val);
            updateParam('status', 'idle'); // Force reset if user changes points
          }} 
        />
      </div>
    </div>
  );
};

export default ConvexHullControls;