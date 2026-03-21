// src/pages/Simulations/ElasticCollisions/ElasticCollisions.jsx

import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import ElasticCollisionsControls from './ElasticCollisionsControls';
import ElasticCollisionsCanvas from './ElasticCollisionsCanvas';

const DEFAULT_PARAMS = { numBalls: 10 };

const collisionTheory = (
  <>
    <h3>Kinematics of Elastic Collisions</h3>
    <p>
      A perfectly elastic collision is an encounter between two bodies in which the total kinetic energy of the two bodies remains exactly the same. In this simulation, objects bounce off the walls and each other without transferring any energy to heat, deformation, or friction.
    </p>
    <h3>Conservation of Momentum</h3>
    <p>
      According to Newton's laws, the total momentum vector of an isolated system remains constant before and after the collision.
    </p>
    <div className="theory-equation">
      m&#8321;v&#8321; + m&#8322;v&#8322; = m&#8321;v&#8321;' + m&#8322;v&#8322;'
    </div>
    <h3>Conservation of Kinetic Energy</h3>
    <p>
      Because the collisions are perfectly elastic, kinetic energy is mathematically preserved:
    </p>
    <div className="theory-equation">
      &frac12;m&#8321;v&#8321;&sup2; + &frac12;m&#8322;v&#8322;&sup2; = &frac12;m&#8321;v&#8321;'&sup2; + &frac12;m&#8322;v&#8322;'&sup2;
    </div>
    <p>
      In this 2D simulation, the physics engine dynamically sweeps for overlapping bounding boxes computationally and instantaneously transfers structural 2D velocity vectors along the normal line of the angular impact.
    </p>
  </>
);

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
        theoryContent={collisionTheory}
      />
    </Layout>
  );
};

export default ElasticCollisions;