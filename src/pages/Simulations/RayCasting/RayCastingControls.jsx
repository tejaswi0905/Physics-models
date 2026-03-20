import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const RayCastingControls = ({ params, updateParam }) => {
  const handleRegenerate = () => {
    // Incrementing this triggers the sharedState observer in the p5 loop
    updateParam('triggerReset', params.triggerReset + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Slider 
        label="Number of Obstacles" 
        min={0} max={15} step={1} 
        value={params.obstacleCount} 
        onChange={(val) => {
          updateParam('obstacleCount', val);
          handleRegenerate(); // Automatically regenerate when slider moves
        }} 
      />

      <button 
        onClick={handleRegenerate}
        style={{
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: 'var(--accent-primary)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'all 0.2s',
          marginTop: '0.5rem'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
      >
        Regenerate Geometry
      </button>
    </div>
  );
};

export default RayCastingControls;