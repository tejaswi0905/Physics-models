import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import FallingSandControls from './FallingSandControls';
import FallingSandCanvas from './FallingSandCanvas';

const DEFAULT_PARAMS = { 
  brushSize: 5, 
  gravityEnabled: true 
};

const FallingSand = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Falling Sand Engine"
        description="A high-performance cellular automata simulation. Draw sand to see granular physics and acceleration in action."
        canvas={<FallingSandCanvas params={params} />}
        controls={<FallingSandControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default FallingSand;