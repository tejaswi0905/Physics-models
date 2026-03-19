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
        description="A mathematically rigorous 2D pendulum utilizing Euler integration and exact frame-independent time steps."
        canvas={<SimplePendulumCanvas params={params} />}
        controls={<SimplePendulumControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default SimplePendulum;
