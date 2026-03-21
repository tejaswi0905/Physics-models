import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Simulations from './pages/Simulations/Simulations';
import SimplePendulum from './pages/Simulations/SimplePendulum/SimplePendulum';
import ElasticCollisions from './pages/Simulations/ElasticCollisions/ElasticCollisions';
import FallingSand from './pages/Simulations/FallingSand/FallingSand';
import SimpleSpring from './pages/Simulations/SimpleSpring/SimpleSpring';
import ConvexHull from './pages/Simulations/ConvexHull/ConvexHull';
import RayCasting from './pages/Simulations/RayCasting/RayCasting';
import PiCollisions from './pages/Simulations/PiCollisions/PiCollisions';


import './App.css';






function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
