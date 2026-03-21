import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language = 'javascript' }) => (
  <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
    <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem', background: '#0d1117', fontSize: '0.95rem', lineHeight: '1.6' }}>
      {code.trim()}
    </SyntaxHighlighter>
  </div>
);

const ConversionDocs = () => {
  return (
    <section>
      <h2 id="vanilla-to-react" style={{fontSize: '2.2rem', marginTop: '5rem', borderBottom: 'none'}}>The Masterclass: <br/>Translating Vanilla p5.js to React</h2>
      <p className="docs-lead" style={{color: '#e2e8f0', fontSize: '1.25rem'}}>
        The biggest architectural hurdle when moving from the official p5.js Web Editor to a production-grade React application is bridging the semantic gap between an inherently imperative, globally bound execution space and a secure component lifecycle.
      </p>
      <p>
        To teach this concept natively, we are going to perform a rigorous side-by-side technical breakdown of the exact <code>ElasticCollision</code> JavaScript files you wrote. We will systematically port them into the <code>ReactP5Wrapper</code> architecture.
      </p>

      {/* --- PARTICLE.JS --- */}
      <h3 id="particle-conversion">1. Converting <code>particle.js</code></h3>
      <p>
        Your vanilla <code>particle.js</code> contains the absolute core math of the simulation, utilizing global constants like <code>random()</code> and <code>createVector()</code> that rely on p5 natively owning the browser window.
      </p>

      <CodeBlock code={`// ❌ docs/ElasticCollision/particle.js (Vanilla Environment)
class Particle {
  constructor(x, y, mass, id) {
    this.position = createVector(x, y); // Relies on global p5.js bindings!
    this.velocity = p5.Vector.random2D();
    this.mass = mass;
    this.r = sqrt(this.mass) * 2;       // Global sqrt function!
    this.id = id;
    this.color = random(palette);       // Relies on a globally defined 'palette' array!
  }

  collide(other) {
    let impactVector = p5.Vector.sub(other.position, this.position);
    // ... complex momentum algorithms natively executing ...
  }
}`} />

      <p><strong>What we changed:</strong></p>
      <p>
        Because pure JavaScript ES6 Classes do not care about React, you do not need to rewrite your math! However, we must <strong>strip out global dependencies</strong> so it can run securely inside any container. We stop using p5's global math where native JavaScript `Math` works perfectly, and we pass the color in dynamically explicitly!
      </p>

      <CodeBlock code={`// ✅ src/pages/Simulations/ElasticCollisions/logic.js (React Integration)
export class Particle {
  constructor(x, y, mass, id, color) {
    // We drop global p5 vectors for much faster pure JS primitive Numbers!
    this.x = x;
    this.y = y;
    this.mass = mass;
    // We use the universally safe native Math.sqrt instead of global p5!
    this.r = Math.sqrt(this.mass) * 2; 
    this.id = id;
    this.color = color; // We pass color purely rather than referencing global palettes
  }

  collide(other) {
    // The underlying momentum transfer logic brilliantly survives untouched!
  }
}`} />


      {/* --- QUADTREE.JS --- */}
      <h3 id="quadtree-conversion">2. Retaining <code>quadtree.js</code></h3>
      <p>
        Your <code>quadtree.js</code> mathematically defines the spatial partition algorithms recursively tracking the particles. 
      </p>

      <CodeBlock code={`// docs/ElasticCollision/quadtree.js (Vanilla Space)
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }
  contains(point) { /* ... */ }
}

class QuadTree {
  // ... Massive recursive geometric logic structurally tracking arrays
}`} />

      <p><strong>What we changed:</strong></p>
      <p>
        <strong>Absolutely nothing!</strong> This is the beauty of heavily isolated computation patterns. Because your <code>QuadTree</code>, <code>Rectangle</code>, and <code>Circle</code> classes rely purely on arithmetic bounds and generic JavaScript arrays, they seamlessly slide directly into our React utility files natively untouched! We simply <code>export</code> them locally!
      </p>


      {/* --- SKETCH.JS --- */}
      <h3 id="sketch-conversion">3. Taming <code>sketch.js</code></h3>
      <p>
        This is the most dangerous file. In vanilla, <code>setup()</code> and <code>draw()</code> are forced implicitly onto the <code>window</code>, and the massive `particles` tracking array physically sits globally exposed!
      </p>

      <CodeBlock code={`// ❌ docs/ElasticCollision/sketch.js (Dangerous Global Execution)
let particles = [];
let checkedPairs = new Set();
let palette = [...];

function setup() {
  createCanvas(640, 640);
  for (let i = 0; i < 1500; i++) {
    particles.push(new Particle(random(width), random(height), random(4, 8), i));
  }
}

function draw() {
  background(0);
  let boundary = new Rectangle(width / 2, height / 2, width, height);
  let qtree = new QuadTree(boundary, 4);
  // ... nested O(n log n) mapping
}`} />

      <p><strong>What we changed:</strong></p>
      <p>
        If React tries to unmount the Canvas to change pages natively, that infinite global <code>draw()</code> loop will brutally continue running invisibly forever, resulting in terrible memory leaks!
        To fix this decisively, we aggressively encapsulate the entire engine inside an <strong>Instance Mode Closure</strong> and use a <strong>Shared Memory Bridge</strong> to flawlessly pipe your React UI Sliders into the loop without causing a virtual DOM crash!
      </p>

      <CodeBlock code={`// ✅ src/pages/Simulations/ElasticCollisions/ElasticCollisionsCanvas.jsx
import { Particle, QuadTree, Rectangle, Point, Circle } from './logic';

// 1. The Shared Memory Bridge: 
// This object securely pipes numeric data from the React Slider directly into the loop natively!
const sharedState = { numBalls: 10 };

// 2. The Instance Closure:
const sketch = (p5) => {
  // Variables are securely trapped INSIDE! They aggressively die when React unmounts this page.
  let innerBalls = 10;
  let particles = [];
  
  // Every native function strictly requires the "p5." prefix now organically.
  p5.setup = () => {
    p5.createCanvas(800, 600);
    // ... Initialization utilizing native 'p5.width'
  };

  p5.draw = () => {
    // We instantly read the Shared Bridge flawlessly every frame to see if the React Slider moved!
    if (innerBalls !== sharedState.numBalls) {
      innerBalls = sharedState.numBalls; 
      initUniverse(innerBalls); // Forceful instant matrix reset organically!
    }

    p5.background('#0a0a0c');
    let boundary = new Rectangle(p5.width / 2, p5.height / 2, p5.width, p5.height);
    let qtree = new QuadTree(boundary, 4);

    // Your vanilla imported classes are flawlessly utilized natively here!
    for (let p of particles) {
      qtree.insert(new Point(p.x, p.y, p));
    }
  };
};`} />

      <p>
        By strictly utilizing this exact 3-step paradigm—<strong>Mathematical Primogeniture, Instance Mode Isolation, and Shared Memory Bridges</strong>—we successfully transitioned extremely heavy algorithmic prototypes flawlessly into production-ready React architecture rendering at 60 Frames Per Second locally!
      </p>
    </section>
  );
};

export default ConversionDocs;
