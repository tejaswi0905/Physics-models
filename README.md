# Physics Models Engine
🔴 **[Live Demo: physics-models.vercel.app](https://physics-models.vercel.app/)**

<img width="271" height="211" alt="image" src="https://github.com/user-attachments/assets/d42cda5b-caab-4ab7-8bfa-92102a911d0a" />


An immersive, high-performance web application merging deep algorithmic `p5.js` physics simulations with a pristine, state-driven React.js architecture.

## 🧪 The Physics & Algorithm Library

This engine features 8 robust computational models, exploring everything from geometric time complexity to granular fluid dynamics:

* 🟢 **Kinematics:** Simple Pendulum, Elastic Bouncing Balls
* 🟢 **Algorithms:** Jarvis March (Convex Hull), 2D Raycasting (Visibility & Optics)
* 🟢 **Granular Physics:** Cellular Automata (Falling Sand)
* 🟢 **Signal Processing:** Discrete Fourier Transform (Epicycle Drawing)
* 🟢 **Dynamics:** Damped Harmonic Oscillator (Hooke's Law Spring)
* 🟢 **Mathematics:** Galperin's Pi Collision Theorem

## 🧠 Architecture & Deep Optimizations

Building a 60-FPS physics engine inside a React Single Page Application requires bypassing standard DOM bottlenecks. This engine features several systems-level optimizations:

* **The React-to-p5 Memory Bridge:** Completely decoupled the UI state from the WebGL/Canvas render loop using mutable `sharedState` references. This allows React sliders to update physics parameters instantly without triggering disastrous React component re-renders during high-frequency math cycles.
* **Pure Scalar Mathematics:** Stripped out heavy object-oriented `p5.Vector` instantiations in the **Raycasting** and **Pi Collisions** models. By utilizing pure scalar algebraic equations (e.g., Cramer's rule for line intersections), the engine handles millions of intersection checks per frame with zero Garbage Collection (GC) stutters.
* **Cellular Automata Double Buffering:** The **Falling Sand** granular simulation utilizes a double-buffered 2D array architecture. Reading from a static frame and writing to a next-frame buffer prevents memory leaks and read/write race conditions during massive grid updates.
* **Layout-Locked Canvas Geometry:** Engineered a custom `ResizeObserver` layout clamp using `Math.floor()` that prevents the notorious HTML5 Canvas flexbox stretching bug, keeping particle boundaries mathematically rigid to the CSS UI.

## 🚀 Key Features

* **60 FPS Performance:** Engineered using isolated Instance Mode Closures and external memory bridges to absolutely bypass heavy React Virtual-DOM re-renders.
* **Premium Glassmorphism UX:** A globally reactive unified dark-palette interface, seamlessly matching a native interactive VectorField background canvas.
* **Developer Documentation:** A massive dedicated `/docs` portal natively built *into* the web app, teaching engineers precisely how to translate raw imperative p5.js logic into a scalable React ecosystem.

## 📦 Installation

To boot the physics engines safely on your local machine:

```bash
# Clone the repository natively
git clone [https://github.com/tejaswi0905/Physics-models.git](https://github.com/tejaswi0905/Physics-models.git)

# Navigate directly into the architecture
cd Physics-models

# Install crucial node modules
npm install

# Spin up the Vite development server
npm run dev
```

## 📚 Interactive Documentation

This repository physically ships with a world-class documentation portal directly injected into the frontend. 
Simply run the app and click the **Docs** link located strictly in the main navigation Header to natively explore:
- Comprehensive guides explicitly detailing how to architect and plug-in your own custom mathematical matrices.
- The definitive masterclass effectively tearing down massive `O(n log n)` Vanilla Javascript Class modules and successfully wiring them securely into instantaneous 60 Frame-Per-Second React rendering pipelines using Shared Variables.

## 🛠️ Technology Setup
- **Core Engine:** React 18 / Vite
- **Physics Computations:** p5.js / `react-p5-wrapper`
- **Routing State:** react-router-dom
- **UI Architecture:** Custom pure CSS / Modern CSS Variables / Flexbox
- **Interaction Spies:** Web `IntersectionObserver` & `ResizeObserver` APIs
