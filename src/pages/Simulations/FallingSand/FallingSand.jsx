import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import FallingSandControls from './FallingSandControls';
import FallingSandCanvas from './FallingSandCanvas';

const DEFAULT_PARAMS = { 
  brushSize: 5, 
  gravityEnabled: true 
};

const sandTheory = (
  <>
    <h3>Cellular Automata</h3>
    <p>
      Unlike classical vector physics engines that dynamically track continuous positions and velocities of floating objects, Falling Sand engines use a discrete mathematical matrix known as a <strong>Cellular Automaton</strong>. 
    </p>
    <p>
      The screen is divided into a massive 2D matrix of tiny grids (or "cells"). Every single visual frame, the engine scans the matrix from bottom to top, evaluating a set of hardcoded neighbor-rules to decide the next deterministic physical state of the system immediately.
    </p>
    <h3>Behavioral Logic Rules</h3>
    <ul className="theory-list">
      <li><span>Gravity:</span> If the cell directly beneath a sand particle is completely empty, the sand particle is mathematically translated one cell downward.</li>
      <li><span>Displacement:</span> If the cell directly below is structurally occupied, the particle evaluates the bottom-left and bottom-right neighbors. If one is empty, it simulates sliding by occupying that valid index.</li>
      <li><span>Static Friction:</span> If all three downward neighbors are completely occupied, the particle immediately enters a "resting" state and stops broadcasting updates to heavily save CPU simulation cycles.</li>
    </ul>
    <div className="theory-equation">
      Grid(x, y+1) == EMPTY &rArr; Grid(x, y+1) = SAND
    </div>
  </>
);

const FallingSand = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Falling Sand Engine"
        description="A high-performance cellular automata simulation. Draw sand to see granular physics and acceleration in action."
        canvas={<FallingSandCanvas params={params} />}
        controls={<FallingSandControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
        theoryContent={sandTheory}
      />
    </Layout>
  );
};

export default FallingSand;