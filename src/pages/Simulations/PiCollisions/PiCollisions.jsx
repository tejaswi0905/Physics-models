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

const piTheory = (
  <>
    <h3>Calculating Pi via Blocks</h3>
    <p>
      This simulation beautifully visualizes an unexpected algorithmic relationship famously discovered by Gregory Galperin. When a large block of mass <span style={{fontFamily: 'monospace'}}>M</span> collides elastically with a smaller block of mass <span style={{fontFamily: 'monospace'}}>m</span> against a rigid boundary wall, the total number of elastic collisions perfectly computes the structural digits of <strong>&pi;</strong>.
    </p>
    <div className="theory-equation">
      100&#8319; &middot; m = M 
    </div>
    <h3>Mass Ratios and Accuracy</h3>
    <ul className="theory-list">
      <li>If the masses are practically equal (ratio 1), exactly 3 collisions uniformly occur (&pi; &approx; 3).</li>
      <li>If the large block is 100x exponentially heavier (ratio 100), exactly 31 collisions occur (&pi; &approx; 3.1).</li>
      <li>If the large block is 10,000x heavier (ratio 100&sup2;), exactly 314 collisions occur (&pi; &approx; 3.14).</li>
    </ul>
    <p>
      This mesmerizing phenomena geometrically arises because the phase space trajectory of the two isolated blocks essentially forms a perfectly valid structural circle due to the core conservation of perfectly elastic kinetic energy! The angular distance traversed between collisions corresponds mathematically to the continuous division of a circle by exactly &pi;.
    </p>
  </>
);

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
        theoryContent={piTheory}
      />
    </Layout>
  );
};

export default PiCollisions;