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

const rayTheory = (
  <>
    <h3>2D Ray Segment Intersections</h3>
    <p>
      Raycasting computationally simulates beams of virtual light propagating from a spatial source and terminating precisely where they procedurally collide with boundary geometry. This pivotal scalar technique pioneered fundamental visibility algorithms and 3D rendering engines like Wolfenstein 3D.
    </p>
    <p>
      To compute the exact pixel collision mathematically, the engine sequentially solves a system of linear equations recursively parameterized by <span style={{fontFamily: 'monospace'}}>t</span> (time traveled along the ray) and <span style={{fontFamily: 'monospace'}}>u</span> (metric distance offset along the given wall segment):
    </p>
    <div className="theory-equation">
      P + t&middot;D = W&#8321; + u&middot;(W&#8322; - W&#8321;)
    </div>
    <ul className="theory-list">
      <li><span>P</span> is the absolute spatial origin coordinate of the active light source.</li>
      <li><span>D</span> is the strict normalized directional vector scalar of the casted ray.</li>
      <li><span>W&#8321;, W&#8322;</span> are the two rigid boundary coordinates mathematically forming the physical obstacle line segment.</li>
    </ul>
    <h3>Algorithmic Resolution</h3>
    <p>
      Using native 2D Euclidean vector cross-products, the algorithm synchronously calculates both <span>t</span> and <span>u</span> independently but in parallel. A valid physical 2D intersection strictly only ever technically occurs if <span>t &gt; 0</span> (verifying the linear ray actually points physically forward) and exactly <span>0 &le; u &le; 1</span> (forcing the termination point to land strictly between the actual boundary endpoints of the isolated concrete wall segment).
    </p>
  </>
);

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
        theoryContent={rayTheory}
      />
    </Layout>
  );
};

export default RayCasting;