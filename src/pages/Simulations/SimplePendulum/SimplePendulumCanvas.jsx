import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

const sharedState = {
  length: 250,
  gravity: 9.81,
  mass: 20,
  damping: 0.995,
  canvasWidth: 0,
  canvasHeight: 0
};

const sketch = (p5) => {
  p5.disableFriendlyErrors = true; // Optimize performance and stop background memory leaks
  let angle = Math.PI / 4;
  let angleVelocity = 0;
  let origin = p5.createVector(0, 0);
  let bob = p5.createVector(0, 0);
  let isDragging = false;

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.canvas.style.display = 'block';
  };

  p5.draw = () => {
    if (sharedState.unmounted) {
      p5.noLoop();
      return;
    }

    if (sharedState.canvasWidth > 0 && sharedState.canvasHeight > 0) {
      if (Math.abs(p5.width - sharedState.canvasWidth) >= 2 || Math.abs(p5.height - sharedState.canvasHeight) >= 2) {
        p5.resizeCanvas(sharedState.canvasWidth, sharedState.canvasHeight);
        sharedState.canvasWidth = p5.width;
        sharedState.canvasHeight = p5.height;
      }
    }

    p5.background('#0a0a0c');

    origin.x = p5.width / 2;
    origin.y = p5.height * 0.25;

    const dt = Math.min(p5.deltaTime / 1000 || (1 / 60), 0.1); 

    if (isDragging) {
      let dx = p5.mouseX - origin.x;
      let dy = p5.mouseY - origin.y;
      angle = Math.atan2(dx, dy);
      angleVelocity = 0; 
    } else {
      const lengthInMeters = sharedState.length / 100;
      const angularAcceleration = (-sharedState.gravity / lengthInMeters) * p5.sin(angle);
      angleVelocity += angularAcceleration * dt;
      angleVelocity *= Math.pow(sharedState.damping, dt * 60); 
      angle += angleVelocity * dt;
    }

    bob.x = origin.x + sharedState.length * p5.sin(angle);
    bob.y = origin.y + sharedState.length * p5.cos(angle);

    p5.stroke('#a1a1aa'); 
    p5.strokeWeight(3);
    p5.line(origin.x, origin.y, bob.x, bob.y);

    p5.fill('#8b5cf6'); 
    p5.noStroke();
    p5.circle(origin.x, origin.y, 10);

    let d = p5.dist(p5.mouseX, p5.mouseY, bob.x, bob.y);
    let isHovering = d < sharedState.mass * 1.5;

    p5.noStroke();
    p5.fill(139, 92, 246, isHovering || isDragging ? 80 : 30); 
    p5.circle(bob.x, bob.y, sharedState.mass * 2.5);
    
    p5.fill('#d946ef'); 
    if (isHovering || isDragging) p5.stroke(255);
    else p5.noStroke();
    p5.strokeWeight(2);
    p5.circle(bob.x, bob.y, sharedState.mass * 2);
    
    if (isDragging) p5.cursor('grabbing');
    else if (isHovering) p5.cursor('grab');
    else p5.cursor('default');
  };

  p5.mousePressed = () => {
    let d = p5.dist(p5.mouseX, p5.mouseY, bob.x, bob.y);
    if (d < sharedState.mass * 1.5) isDragging = true;
  };

  p5.mouseReleased = () => {
    isDragging = false;
  };
};

const SimplePendulumCanvas = ({ params }) => {
  const containerRef = useRef(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  if (params) {
    sharedState.length = params.length;
    sharedState.gravity = params.gravity;
    sharedState.mass = params.mass;
    sharedState.damping = params.damping;
  }

  useEffect(() => {
    sharedState.unmounted = false;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = Math.floor(entry.contentRect.width);
        const height = Math.floor(entry.contentRect.height);
        
        if (width > 0 && height > 0) {
          sharedState.canvasWidth = width;
          sharedState.canvasHeight = height;
          if (!hasDimensions) setHasDimensions(true);
        }
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      sharedState.unmounted = true;
      observer.disconnect();
    };
  }, [hasDimensions]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>
      {hasDimensions && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <P5Canvas sketch={sketch} />
        </div>
      )}
    </div>
  );
};

export default SimplePendulumCanvas;