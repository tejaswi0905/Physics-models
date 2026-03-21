import React from 'react';

const AddSimulationDocs = () => {
  return (
    <section>
      <h2 id="adding-simulations">Adding a New Simulation</h2>
      <p>
        This engine is built with an extremely modular architecture so you can easily plug in new <code>p5.js</code> physics models. You do not need to touch the core layout or wrapper logic—just follow these steps.
      </p>

      <h3 id="step-1-register-data">Step 1: Register the Simulation Data</h3>
      <p>Open <code>src/data/simulationsData.js</code> and add a new object to the array. This automatically generates the card on the Landing Page and Feature Gallery.</p>
      <pre><code>{`{
  id: 'bouncing-balls',
  title: 'Bouncing Balls',
  description: 'A 2D kinematic collision engine.',
  tags: ['Kinematics', 'Energy'],
  path: '/simulations/bouncing-balls',
  image: 'https://images.unsplash.com/photo-1620...?w=600&q=80',
}`}</code></pre>

      <h3 id="step-2-component-folder">Step 2: Create Component Folder</h3>
      <p>Go to <code>src/pages/Simulations/</code> and create a new folder for your model, completely isolated from the others. For example: <code>src/pages/Simulations/BouncingBalls/</code></p>
      <p>Inside this folder, you will always create 3 interconnected mathematical UI tracking files.</p>
      <div className="docs-file-tree">
        src/pages/Simulations/BouncingBalls/<br/>
        ├── BouncingBalls.jsx<br/>
        ├── BouncingBallsControls.jsx<br/>
        └── BouncingBallsCanvas.jsx
      </div>

      <h3 id="step-2a-main-page">2a. The Main Page</h3>
      <p>This file ties everything together. Use the <code>useSimulationState</code> hook to define the default mathematical starting parameters, and pass them universally to the globally styled <code>SimulationWrapper</code>.</p>
      <pre><code>{`import React from 'react';
import Layout from '../../../components/layout/Layout';
import SimulationWrapper from '../../../components/simulations/SimulationWrapper/SimulationWrapper';
import { useSimulationState } from '../../../hooks/useSimulationState';
import BouncingBallsControls from './BouncingBallsControls';
import BouncingBallsCanvas from './BouncingBallsCanvas';

const DEFAULT_PARAMS = { speed: 5, restitution: 0.8 };

const BouncingBalls = () => {
  const { params, updateParam, resetParams } = useSimulationState(DEFAULT_PARAMS);

  return (
    <Layout>
      <SimulationWrapper 
        title="Bouncing Balls"
        description="A 2D kinematic collision engine."
        canvas={<BouncingBallsCanvas params={params} />}
        controls={<BouncingBallsControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};
export default BouncingBalls;`}</code></pre>

      <h3 id="step-2b-controls-panel">2b. The Controls Panel</h3>
      <p>This component reads your parameters and renders them as interactive UI Elements (like frosted Sliders). It cleanly uses the <code>updateParam</code> function to logically alter the active React structural state dynamically whenever a user drags a value.</p>
      <pre><code>{`import React from 'react';
import Slider from '../../../components/ui/Slider/Slider';

const BouncingBallsControls = ({ params, updateParam }) => (
  <div className="flex flex-col gap-4">
    <Slider 
      label="Speed Base" 
      min={1} max={20} step={1} 
      value={params.speed} 
      onChange={(val) => updateParam('speed', val)} 
    />
  </div>
);
export default BouncingBallsControls;`}</code></pre>

      <h3 id="step-2c-p5-engine">2c. The p5.js Engine</h3>
      <p>This matrix is primarily where the hardcore continuous math happens. You forcefully extract your real-time layout params directly via React props, safely overwrite the isolated structural Canvas scope, and strictly pass the compiled output visually into the abstract <code>P5Canvas</code> wrapper boundary.</p>
      <blockquote>We will cover the exact architectural details of converting Vanilla Object-Oriented p5.js logic into a robust React Context directly in the vastly deeper upcoming section of this documentation.</blockquote>

      <h3 id="step-3-add-router">Step 3: Add to Router</h3>
      <p>Finally, open <code>src/App.jsx</code> and dynamically import your newly established abstract page, then safely mount the <code>&lt;Route&gt;</code> natively inside the suspenseful loading <code>&lt;Routes&gt;</code> block to finalize compilation:</p>
      <pre><code>{`const BouncingBalls = lazy(() => import('./pages/Simulations/BouncingBalls/BouncingBalls'));

// ... visually nested inside <Routes>
<Route path="/simulations/bouncing-balls" element={<BouncingBalls />} />`}</code></pre>

      <p><strong>That's fundamentally it!</strong> The universal <code>SimulationWrapper</code> automatically intercepts and effortlessly handles generating the responsive container layout, framing the active dark Workspace styling, spawning the persistent mathematical Vector background dynamically, and securely handling wiping all active variables back to their exact defaults whenever the user triggers a physical configuration Reset sequentially!</p>
    </section>
  );
};

export default AddSimulationDocs;
