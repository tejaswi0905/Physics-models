import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import SimplePendulumControls from './SimplePendulumControls';
import SimplePendulumCanvas from './SimplePendulumCanvas';

const DEFAULT_PARAMS = {
  length: 200,   // pixel length
  gravity: 9.81, // m/s^2
  mass: 20,      // pixel radius representation
  damping: 0.995 // velocity damping
};

const pendulumTheory = (
  <>
    <h3>Ideal Pendulum Mechanics</h3>
    <p>
      A simple pendulum consists of a point mass suspended from a pivot by a massless, inextensible string of length <span style={{fontFamily: 'monospace'}}>L</span>. When displaced from its resting position, the restoring force of gravity accelerates it back toward equilibrium, creating oscillatory motion.
    </p>
    <div className="theory-equation">
      &tau; = -mgL &middot; sin(&theta;)
    </div>
    <p>
      Where <span style={{fontFamily: 'monospace'}}>&tau;</span> is the restoring torque, <span style={{fontFamily: 'monospace'}}>m</span> is the mass, and <span style={{fontFamily: 'monospace'}}>&theta;</span> is the angle of displacement.
    </p>
    <h3>The Small Angle Approximation</h3>
    <p>
      For small initial displacements (typically less than 15&deg;), we can approximate <span style={{fontFamily: 'monospace'}}>sin(&theta;) &approx; &theta;</span>. This brilliantly simplifies the differential equation, revealing that the period of an ideal pendulum is completely independent of its mass!
    </p>
    <div className="theory-equation">
      T = 2&pi;&radic;(L/g)
    </div>
    <ul className="theory-list">
      <li><span>T</span> is the period of oscillation.</li>
      <li><span>L</span> is the length of the string.</li>
      <li><span>g</span> is the acceleration due to gravity.</li>
    </ul>
  </>
);

const SimplePendulum = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Simple Pendulum"
        description="A mathematically rigorous 2D pendulum utilizing Euler integration and exact frame-independent time steps."
        canvas={<SimplePendulumCanvas params={params} />}
        controls={<SimplePendulumControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
        theoryContent={pendulumTheory}
      />
    </Layout>
  );
};

export default SimplePendulum;
