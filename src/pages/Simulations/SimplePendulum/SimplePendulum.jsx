import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import SimplePendulumControls from './SimplePendulumControls';
import SimplePendulumCanvas from './SimplePendulumCanvas';

const DEFAULT_PARAMS = {
  length: 200,   // pixel length
  gravity: 9.81, // m/s^2
  mass: 20,      // pixel radius representation
  damping: 0.995 // velocity damping
};

const SimplePendulum = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Simple Pendulum"
        description="A mathematically rigorous model of a simple pendulum. Adjust length, gravity, and mass to see how they affect the period and kinetic energy of the system."
        canvasComponent={() => <SimplePendulumCanvas params={params} />}
        controlsComponent={() => <SimplePendulumControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default SimplePendulum;
