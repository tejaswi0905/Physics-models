import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import ConvexHullControls from './ConvexHullControls';
import ConvexHullCanvas from './ConvexHullCanvas';

const DEFAULT_PARAMS = { 
  pointCount: 50,
  status: 'idle' // 'idle' | 'running' | 'done'
};

const ConvexHull = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Convex Hull (Jarvis March)"
        description="The Gift Wrapping algorithm finds the outermost boundary of a set of points using 2D cross-product mathematics."
        canvas={<ConvexHullCanvas params={params} updateParam={updateParam} />}
        controls={<ConvexHullControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default ConvexHull;