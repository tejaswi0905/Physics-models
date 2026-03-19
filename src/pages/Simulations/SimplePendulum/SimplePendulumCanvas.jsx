import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

const sketch = (p5) => {
  let angle = Math.PI / 4; 
  let angleVelocity = 0;
  
  let length = 200;
  let gravity = 9.81;
  let mass = 20;
  let damping = 0.995;
  
  let origin = p5.createVector(0, 0);
  let bob = p5.createVector(0, 0);
  let isDragging = false;

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.canvas.style.display = 'block'; // Fixes bottom descender gap
  };

  p5.updateWithProps = (props) => {
    if (props.params) {
      length = props.params.length;
      gravity = props.params.gravity;
      mass = props.params.mass;
      damping = props.params.damping;
    }

    // Handle reliable resizing securely
    if (props.width && props.height && p5.canvas) {
      if (p5.width !== props.width || p5.height !== props.height) {
        p5.resizeCanvas(props.width, props.height);
      }
    }
  };

  p5.draw = () => {
    p5.background('#0a0a0c');

    // Keep origin dynamically centered based on true canvas dimensions
    origin.x = p5.width / 2;
    origin.y = p5.height * 0.25;

    // Safety clamp: Prevent physics explosions if you switch browser tabs
    const dt = Math.min(p5.deltaTime / 1000 || (1 / 60), 0.1); 

    if (isDragging) {
      // THE FIX: Correct inverse trigonometry. 
      // Since x = sin(a) and y = cos(a), angle = atan2(dx, dy)
      let dx = p5.mouseX - origin.x;
      let dy = p5.mouseY - origin.y;
      angle = Math.atan2(dx, dy);
      angleVelocity = 0; 
    } else {
      const lengthInMeters = length / 100;
      const angularAcceleration = (-gravity / lengthInMeters) * p5.sin(angle);
      
      angleVelocity += angularAcceleration * dt;
      angleVelocity *= Math.pow(damping, dt * 60); 
      angle += angleVelocity * dt;
    }

    // Kinematics
    bob.x = origin.x + length * p5.sin(angle);
    bob.y = origin.y + length * p5.cos(angle);

    // Render string
    p5.stroke('#a1a1aa'); 
    p5.strokeWeight(3);
    p5.line(origin.x, origin.y, bob.x, bob.y);

    // Render pivot
    p5.fill('#8b5cf6'); 
    p5.noStroke();
    p5.circle(origin.x, origin.y, 10);

    let d = p5.dist(p5.mouseX, p5.mouseY, bob.x, bob.y);
    let isHovering = d < mass * 1.5;

    // Render bob glow
    p5.fill(139, 92, 246, isHovering || isDragging ? 80 : 30); 
    p5.circle(bob.x, bob.y, mass * 2.5);
    
    // Render bob core
    p5.fill('#d946ef'); 
    if (isHovering || isDragging) p5.stroke(255);
    else p5.noStroke();
    p5.strokeWeight(2);
    p5.circle(bob.x, bob.y, mass);
    
    if (isDragging) p5.cursor('grabbing');
    else if (isHovering) p5.cursor('grab');
    else p5.cursor('default');
  };

  p5.mousePressed = () => {
    let d = p5.dist(p5.mouseX, p5.mouseY, bob.x, bob.y);
    if (d < mass * 1.5) isDragging = true;
  };

  p5.mouseReleased = () => {
    isDragging = false;
  };
};

const SimplePendulumCanvas = ({ params }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = Math.floor(entry.contentRect.width);
        const height = Math.floor(entry.contentRect.height);
        
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    // THE FIX: Position relative container with an absolute canvas wrapper
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>
      {dimensions.width > 0 && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <P5Canvas 
            sketch={sketch} 
            params={params} 
            width={dimensions.width} 
            height={dimensions.height} 
          />
        </div>
      )}
    </div>
  );
};

export default SimplePendulumCanvas;