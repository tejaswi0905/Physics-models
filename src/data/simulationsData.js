import pendulumSim from '../assets/pendulum_sim.png';
import collisionsSim from '../assets/collisions_sim.png';
import sandSim from '../assets/sand_sim.png';
import springSim from '../assets/spring_sim.png';
import hullSim from '../assets/hull_sim.png';
import raycastingSim from '../assets/raycasting_sim.png';

export const simulationsData = [
  {
    id: 'simple-pendulum',
    title: 'Simple Pendulum',
    description: 'A mathematical model of a pendulum with interactive gravity, length, and mass parameters.',
    tags: ['Mechanics', 'Oscillation', 'Interactive'],
    path: '/simulations/simple-pendulum',
    image: pendulumSim, // Beautiful placeholder
  },
  {
  id: 'elastic-collisions',
  title: 'Elastic Collisions',
  description: 'Quadtree-optimized kinetic energy conservation.',
  tags: ['Kinematics', 'Optimization', 'Data Structures'],
  path: '/simulations/elastic-collisions',
  image: collisionsSim,
},
{
  id: 'falling-sand',
  title: 'Granular Physics (Falling Sand)',
  description: 'A cellular automata physics engine simulating granular materials and fluid dynamics.',
  tags: ['Cellular Automata', 'Particle System', 'Grid Math'],
  path: '/simulations/falling-sand',
  image: sandSim,
},
{
  id: 'simple-spring',
  title: 'Harmonic Oscillator (Spring)',
  description: 'An interactive system demonstrating Hooke\'s Law, damped harmonic motion, and elastic potential energy.',
  tags: ['Dynamics', 'Harmonic Motion', 'Hooke\'s Law'],
  path: '/simulations/simple-spring',
  image: springSim,
},
{
  id: 'convex-hull',
  title: 'Convex Hull (Gift Wrapping)',
  description: 'Visualizing the Jarvis March algorithm to compute the convex hull of a 2D point cloud.',
  tags: ['Algorithms', 'Computational Geometry', 'Math'],
  path: '/simulations/convex-hull',
  image: hullSim,
},
{
  id: 'raycasting',
  title: '2D Raycasting',
  description: 'A 2D visibility and lighting simulation utilizing pure line-line intersection mathematics.',
  tags: ['Optics', 'Geometry', 'Rendering'],
  path: '/simulations/raycasting',
  image: raycastingSim,
}
];
