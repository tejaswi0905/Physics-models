import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import RayCastingControls from './RayCastingControls';
import RayCastingCanvas from './RayCastingCanvas';

const DEFAULT_PARAMS = { 
  obstacleCount: 5,
  triggerReset: 0 // Used as a dependency counter to trigger generation
};

const RayCasting = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="2D Raycasting"
        description="Interact with the canvas to cast 360 degrees of rays. The engine calculates the closest intersection point for every ray against the generated walls."
        canvas={<RayCastingCanvas params={params} updateParam={updateParam} />}
        controls={<RayCastingControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default RayCasting;