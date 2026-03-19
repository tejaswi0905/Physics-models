import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import SimpleSpringControls from './SimpleSpringControls';
import SimpleSpringCanvas from './SimpleSpringCanvas';

const DEFAULT_PARAMS = { 
  restLength: 200, 
  stiffness: 0.05, 
  gravity: 0.5,
  damping: 0.98,
  isIdeal: false
};

const SimpleSpring = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Harmonic Oscillator"
        description="Interact with a mass-spring system to visualize Hooke's Law. Adjust stiffness, resting length, and gravity."
        canvas={<SimpleSpringCanvas params={params} />}
        controls={<SimpleSpringControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default SimpleSpring;