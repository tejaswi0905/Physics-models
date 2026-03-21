import React from 'react';

const FourierSeriesControls = ({ params, updateParam }) => {
  const handleStart = () => {
    if (params.status === 'ready') {
      updateParam('status', 'animating');
    }
  };

  // Determine button text based on the engine's current state
  let btnText = 'Waiting for input...';
  let btnDisabled = true;

  if (params.status === 'ready') {
    btnText = 'Start Fourier Transform';
    btnDisabled = false;
  } else if (params.status === 'animating') {
    btnText = 'Reconstructing...';
  } else if (params.status === 'drawing') {
    btnText = 'Recording Path...';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        <strong>1.</strong> Draw a single continuous path on the canvas.<br/>
        <strong>2.</strong> Release your mouse to finalize the shape.<br/>
        <strong>3.</strong> Click the Start button to calculate the DFT.
      </p>

      <button 
        onClick={handleStart}
        disabled={btnDisabled}
        style={{
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: !btnDisabled ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
          color: !btnDisabled ? '#fff' : 'var(--text-secondary)',
          border: `1px solid ${!btnDisabled ? 'transparent' : 'var(--glass-border)'}`,
          cursor: !btnDisabled ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'all 0.2s',
          marginTop: '1rem'
        }}
      >
        {btnText}
      </button>
    </div>
  );
};

export default FourierSeriesControls;