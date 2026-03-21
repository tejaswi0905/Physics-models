import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import FourierSeriesControls from './FourierSeriesControls';
import FourierSeriesCanvas from './FourierSeriesCanvas';

const DEFAULT_PARAMS = { 
  status: 'prompt', // 'prompt' | 'drawing' | 'ready' | 'animating' | 'done'
};

const FourierSeries = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Fourier Epicycles"
        description="Using the Discrete Fourier Transform (DFT), any 2D path can be mathematically reconstructed by a chain of rotating circles."
        canvas={<FourierSeriesCanvas params={params} updateParam={updateParam} />}
        controls={<FourierSeriesControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default FourierSeries;