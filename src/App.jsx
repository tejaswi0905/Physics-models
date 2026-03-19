import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Simulations from './pages/Simulations/Simulations';
import SimplePendulum from './pages/Simulations/SimplePendulum/SimplePendulum';
import ElasticCollisions from './pages/Simulations/ElasticCollisions/ElasticCollisions';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulations" element={<Simulations />} />
        <Route path="/simulations/simple-pendulum" element={<SimplePendulum />} />
        <Route path="/simulations/elastic-collisions" element={<ElasticCollisions />} />
      </Routes>
    </Router>
  );
}

export default App;
