import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import PiCollisionsControls from './PiCollisionsControls';
import PiCollisionsCanvas from './PiCollisionsCanvas';

const DEFAULT_PARAMS = { 
  digits: 5,
  status: 'idle', // 'idle' | 'running' | 'done'
  count: 0
};

const PiCollisions = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Calculating Pi via Collisions"
        description="When a massive block collides with a smaller block against a wall, the total number of elastic collisions perfectly mirrors the digits of Pi."
        canvas={<PiCollisionsCanvas params={params} updateParam={updateParam} />}
        controls={<PiCollisionsControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default PiCollisions;