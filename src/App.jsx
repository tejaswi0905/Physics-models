import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

// Dynamically lazy-loaded routes split the JavaScript bundle, radically accelerating application load-times!
const Simulations = lazy(() => import('./pages/Simulations/Simulations'));
const SimplePendulum = lazy(() => import('./pages/Simulations/SimplePendulum/SimplePendulum'));
const ElasticCollisions = lazy(() => import('./pages/Simulations/ElasticCollisions/ElasticCollisions'));
const FallingSand = lazy(() => import('./pages/Simulations/FallingSand/FallingSand'));
const SimpleSpring = lazy(() => import('./pages/Simulations/SimpleSpring/SimpleSpring'));
const ConvexHull = lazy(() => import('./pages/Simulations/ConvexHull/ConvexHull'));
const RayCasting = lazy(() => import('./pages/Simulations/RayCasting/RayCasting'));
const PiCollisions = lazy(() => import('./pages/Simulations/PiCollisions/PiCollisions'));
const FourierSeries = lazy(() => import('./pages/Simulations/FourierSeries/FourierSeries'));

import './App.css';

// Sophisticated rendering fallback while the physics engines natively compile
const PhysicsEngineLoader = () => (
  <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ color: '#64748b', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
      Booting Physics Engine...
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PhysicsEngineLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/simulations/simple-pendulum" element={<SimplePendulum />} />
          <Route path="/simulations/elastic-collisions" element={<ElasticCollisions />} />
          <Route path="/simulations/falling-sand" element={<FallingSand />} />
          <Route path="/simulations/simple-spring" element={<SimpleSpring />} />
          <Route path="/simulations/convex-hull" element={<ConvexHull />} />
          <Route path="/simulations/raycasting" element={<RayCasting />} />
          <Route path="/simulations/pi-collisions" element={<PiCollisions />} />
          <Route path="/simulations/fourier-series" element={<FourierSeries />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
