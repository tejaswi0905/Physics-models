// src/pages/Simulations/ElasticCollisions/ElasticCollisions.jsx

import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import ElasticCollisionsControls from './ElasticCollisionsControls';
import ElasticCollisionsCanvas from './ElasticCollisionsCanvas';

const DEFAULT_PARAMS = { numBalls: 10 };

const ElasticCollisions = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Elastic Collisions"
        description="A 2D kinematic engine optimized by a Quadtree spatial partitioning structure."
        canvas={<ElasticCollisionsCanvas params={params} />}
        controls={<ElasticCollisionsControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};

export default ElasticCollisions;