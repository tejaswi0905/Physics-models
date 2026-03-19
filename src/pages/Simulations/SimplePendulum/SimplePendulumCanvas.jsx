import React from 'react';
import { P5Canvas } from '@p5-wrapper/react';

const sketch = (p5) => {
  let angle = Math.PI / 4; // Initial angle
  let angleVelocity = 0;
  let angleAcceleration = 0;
  
  let length = 200;
  let gravity = 9.81;
  let mass = 20;
  let damping = 0.995;
  
  let origin;
  let bob;
  let isDragging = false;

  p5.setup = () => {
    // We make the canvas size adapt to its parent container
    const container = document.querySelector('.sim-canvas-area');
    const width = container ? container.clientWidth : 800;
    const height = container ? container.clientHeight : 600;
    p5.createCanvas(width, height);
    
    origin = p5.createVector(width / 2, height * 0.2);
    bob = p5.createVector(width / 2, height * 0.2 + length);
  };

  p5.updateWithProps = (props) => {
    if (props.params) {
      length = props.params.length;
      gravity = props.params.gravity;
      mass = props.params.mass;
      damping = props.params.damping;
    }
  };

  p5.draw = () => {
    p5.background(10, 10, 12); // --bg-primary

    origin.x = p5.width / 2;
    origin.y = p5.height * 0.2;

    if (isDragging) {
      // Calculate angle from origin to mouse
      let diff = p5.createVector(p5.mouseX - origin.x, p5.mouseY - origin.y);
      angle = diff.heading() - p5.HALF_PI;
      angleVelocity = 0; // stop moving while dragging
    } else {
      // Pendulum Physics Math
      // Angular acceleration = (-g / L) * sin(θ)
      // Note: we scale gravity slightly for better visual effect on screen
      let force = gravity * 0.1; 
      angleAcceleration = (-force / length) * p5.sin(angle);
      
      angleVelocity += angleAcceleration;
      angleVelocity *= damping; // Air resistance / friction
      angle += angleVelocity;
    }

    // Calculate bob position
    bob.x = origin.x + length * p5.sin(angle);
    bob.y = origin.y + length * p5.cos(angle);

    // Draw the line (string)
    p5.stroke(161, 161, 170); // var(--text-secondary)
    p5.strokeWeight(2);
    p5.line(origin.x, origin.y, bob.x, bob.y);

    // Draw the origin pivot point
    p5.fill(139, 92, 246); // var(--accent-primary)
    p5.noStroke();
    p5.circle(origin.x, origin.y, 8);

    // Draw the bob (mass)
    // Draw glow
    p5.fill(139, 92, 246, 40); // var(--accent-glow)
    p5.circle(bob.x, bob.y, mass * 2.5);
    
    // Draw actual mathematical mass
    p5.fill(217, 70, 239); // var(--accent-secondary)
    p5.circle(bob.x, bob.y, mass);
    
    // Check if mouse is hovering over the bob
    let d = p5.dist(p5.mouseX, p5.mouseY, bob.x, bob.y);
    if (d < mass * 1.5) {
      p5.fill(255, 255, 255, 100);
      p5.circle(bob.x, bob.y, mass);
      p5.cursor('grab');
    } else if (!isDragging) {
      p5.cursor('default');
    }
  };

  p5.mousePressed = () => {
    let d = p5.dist(p5.mouseX, p5.mouseY, bob.x, bob.y);
    if (d < mass * 1.5) {
      isDragging = true;
      p5.cursor('grabbing');
    }
  };

  p5.mouseReleased = () => {
    isDragging = false;
  };

  p5.windowResized = () => {
    const container = document.querySelector('.sim-canvas-area');
    if (container) {
      p5.resizeCanvas(container.clientWidth, container.clientHeight);
    }
  };
};

const SimplePendulumCanvas = ({ params }) => {
  return <P5Canvas sketch={sketch} params={params} />;
};

export default SimplePendulumCanvas;
