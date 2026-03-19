# Adding a New Simulation

This project is built with a modular architecture so you can easily plug in new p5.js physics models. You don't need to touch the core layout or wrapper logic—just follow these **4 steps**.

## Step 1: Register the Simulation Data
Open `src/data/simulationsData.js` and add a new object to the array. This automatically generates the card on the Landing Page and Feature Gallery.

```javascript
{
  id: 'bouncing-balls',
  title: 'Bouncing Balls',
  description: 'A 2D kinematic collision engine.',
  tags: ['Kinematics', 'Energy'],
  path: '/simulations/bouncing-balls',
  image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80',
}
```

## Step 2: Create Your Component Folder
Go to `src/pages/Simulations/` and create a new folder for your model, completely isolated from the others.
For example: `src/pages/Simulations/BouncingBalls/`

Inside this folder, you will always create **3 files**:

### 1. The Main Page (`BouncingBalls.jsx`)
This file ties everything together. Use the `useSimulationState` hook to define the default parameters, and pass them to the `SimulationWrapper`.
```jsx
import React from 'react';
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
        canvasComponent={() => <BouncingBallsCanvas params={params} />}
        controlsComponent={() => <BouncingBallsControls params={params} updateParam={updateParam} />}
        onReset={resetParams}
      />
    </Layout>
  );
};
export default BouncingBalls;
```

### 2. The Controls panel (`BouncingBallsControls.jsx`)
This reads your parameters and renders them as interactive Sliders. It uses the `updateParam` function to alter the state dynamically.
```jsx
import React from 'react';
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
export default BouncingBallsControls;
```

### 3. The p5.js Engine (`BouncingBallsCanvas.jsx`)
This is where the math happens. You access your real-time params inside `p5.updateWithProps`. You can duplicate the `ResizeObserver` setup from `SimplePendulumCanvas` so that your sketch always perfectly fits the container!
```jsx
import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

const sketch = (p5) => {
  let speed = 5;

  p5.setup = () => { p5.createCanvas(800, 600); };

  p5.updateWithProps = (props) => {
    if (props.params) speed = props.params.speed;
    // Handle reliable resizing
    if (props.params.width && props.params.height && p5.canvas) {
        if (p5.width !== props.params.width || p5.height !== props.params.height) {
          p5.resizeCanvas(props.params.width, props.params.height);
        }
    }
  };

  p5.draw = () => {
    p5.background(10, 10, 12);
    // Draw physics using `speed`...
  };
};

// ... Include the same ResizeObserver wrapper used in SimplePendulumCanvas
```

## Step 3: Add to Router
Finally, tell React Router that the new page exists. Open `src/App.jsx` and add the `<Route>` definition inside the `<Routes>` block:
```jsx
import BouncingBalls from './pages/Simulations/BouncingBalls/BouncingBalls';

// ... inside <Routes>
<Route path="/simulations/bouncing-balls" element={<BouncingBalls />} />
```

---

**That's it!** The `SimulationWrapper` automatically handles layout, sidebar styling, and resetting parameters for you. 
