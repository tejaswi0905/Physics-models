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

const hullTheory = (
  <>
    <h3>Computational Geometry</h3>
    <p>
      The <strong>Convex Hull</strong> of an abstract algorithmic set of 2D coordinates is mathematically the strict smallest convex geometric polygon that decisively encloses every single available point within the structural set perfectly. You can visualize it naturally in reality as snapping a taught rubber band directly around a random outer cluster of heavy unmoving pegs.
    </p>
    <h3>The Gift Wrapping Algorithm</h3>
    <p>
      Also deeply analyzed and known universally as the computationally efficient <em>Jarvis March</em> algorithm, this physics engine iteratively and natively discovers the dynamic convex hull using a strict processing time complexity of <span className="theory-equation" style={{display: 'inline', padding: '0.2rem', margin: 0, border: 'none', background: 'rgba(255,255,255,0.1)'}}>O(n &middot; h)</span>, where <span style={{fontFamily: 'monospace'}}>n</span> represents the total number of physical spatial points and <span style={{fontFamily: 'monospace'}}>h</span> explicitly represents the tiny number of targeted points structurally elected into the outer hull itself.
    </p>
    <ul className="theory-list" style={{marginTop: '1.5rem'}}>
      <li><strong>Step 1:</strong> Systematically select the absolute extreme left-most geometric coordinate. (This point is mathematically strictly guaranteed to intrinsically belong to the rigid physical hull).</li>
      <li><strong>Step 2:</strong> Linearly project and sweep an invisible test-line rotationally outward through every single other active unchosen point simultaneously.</li>
      <li><strong>Step 3:</strong> Automatically calculate absolute 2D vector cross-products systematically to decisively isolate and lock onto the one singular coordinate offering the widest mathematical exterior geometric angle of curvature dynamically.</li>
      <li><strong>Step 4:</strong> Robustly anchor the growing hull structural line to that exact detected coordinate, and rigorously repeat step 2 immediately until the advancing anchor safely loops around perfectly backing into the original universal starting node.</li>
    </ul>
  </>
);

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
        theoryContent={hullTheory}
      />
    </Layout>
  );
};

export default ConvexHull;