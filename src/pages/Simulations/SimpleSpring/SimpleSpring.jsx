import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import SimpleSpringControls from './SimpleSpringControls';
import SimpleSpringCanvas from './SimpleSpringCanvas';

const DEFAULT_PARAMS = { 
  restLength: 200, 
  stiffness: 0.05, 
  gravity: 0.5,
  damping: 0.98,
  isIdeal: false
};

const springTheory = (
  <>
    <h3>Hooke's Law</h3>
    <p>
      The simple spring is a classic demonstration of a harmonic oscillator governed by <strong>Hooke's Law</strong>. The equation states that the force <span style={{fontFamily: 'monospace'}}>F</span> needed to extend or compress a spring by some distance <span style={{fontFamily: 'monospace'}}>x</span> scales linearly with respect to that distance.
    </p>
    <div className="theory-equation">
      F = -kx
    </div>
    <p>
      Where:
    </p>
    <ul className="theory-list">
      <li><span>k</span> is the spring constant, representing stiffness.</li>
      <li><span>x</span> is the displacement from the equilibrium position.</li>
      <li>The negative sign indicates it is a <em>restoring force</em>, always pointing back to equilibrium.</li>
    </ul>
    <h3>Simple Harmonic Motion</h3>
    <p>
      When perturbed and left to move freely, the mass undergoes Simple Harmonic Motion (SHM), following a sinusoidal trajectory over time:
    </p>
    <div className="theory-equation">
      x(t) = A &middot; cos(&omega;t + &phi;)
    </div>
    <ul className="theory-list">
      <li><span>&omega;</span> (angular frequency) = &radic;(k/m)</li>
      <li><span>A</span> is the maximum amplitude.</li>
    </ul>
  </>
);

const SimpleSpring = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Harmonic Oscillator"
        description="Interact with a mass-spring system to visualize Hooke's Law. Adjust stiffness, resting length, and gravity."
        canvas={<SimpleSpringCanvas params={params} />}
        controls={<SimpleSpringControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
        theoryContent={springTheory}
      />
    </Layout>
  );
};

export default SimpleSpring;