import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import FourierSeriesControls from './FourierSeriesControls';
import FourierSeriesCanvas from './FourierSeriesCanvas';

const DEFAULT_PARAMS = { 
  status: 'prompt', // 'prompt' | 'drawing' | 'ready' | 'animating' | 'done'
};

const fourierTheory = (
  <>
    <h3>Trigonometric Polynomials</h3>
    <p>
      The <strong>Fourier Series</strong> is a way to represent a complex periodic wave as an infinite sum of simple oscillating mathematical sine and cosine functions.
    </p>
    <div className="theory-equation">
      f(t) = a&#8320;/2 + &Sigma; [a&#8324;cos(nt) + b&#8324;sin(nt)]
    </div>
    <ul className="theory-list">
      <li><span>a&#8320; / 2</span> represents the DC offset (constant vertical displacement).</li>
      <li><span>a&#8324;, b&#8324;</span> are the Fourier coefficients mapping to the respective amplitude of each harmonic frequency.</li>
      <li><span>n</span> is the integer harmonic frequency multiplier.</li>
    </ul>
    <h3>Epicycles and Phasors</h3>
    <p>
      Visually, each term in the Fourier series can be represented as a rotating vector (a phasor) or a rotating circle (an epicycle) whose structural center is explicitly attached to the tip of the mathematically previous rotating circle. 
    </p>
    <p>
      As we recursively add more high-frequency epicycles to the chain (increasing <span style={{fontFamily: 'monospace'}}>N</span>), the resulting scalar path converges to perfectly matching the target periodic square wave!
    </p>
  </>
);

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
        theoryContent={fourierTheory}
      />
    </Layout>
  );
};

export default FourierSeries;