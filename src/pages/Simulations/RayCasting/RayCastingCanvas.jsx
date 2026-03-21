import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

// Bridging React and p5 reliably
const sharedState = {
  obstacleCount: 5,
  triggerReset: 0,
  canvasWidth: 0,
  canvasHeight: 0,
  unmounted: false
};

const sketch = (p5) => {
  let walls = [];
  let rays = []; // Pre-calculate ray direction scalars
  
  let localObstacleCount = 5;
  let localTrigger = 0;

  const initUniverse = () => {
    walls = [];
    
    // Create random interior obstacles
    for (let i = 0; i < localObstacleCount; i++) {
      walls.push({
        x1: p5.random(50, Math.max(p5.width - 50, 100)),
        y1: p5.random(50, Math.max(p5.height - 50, 100)),
        x2: p5.random(50, Math.max(p5.width - 50, 100)),
        y2: p5.random(50, Math.max(p5.height - 50, 100))
      });
    }

    // Create boundaries to constrain light
    walls.push({ x1: -1, y1: -1, x2: p5.width, y2: -1 });
    walls.push({ x1: p5.width, y1: -1, x2: p5.width, y2: p5.height });
    walls.push({ x1: p5.width, y1: p5.height, x2: -1, y2: p5.height });
    walls.push({ x1: -1, y1: p5.height, x2: -1, y2: -1 });

    // Pre-calculate ray unit vectors (0 to 360 degrees)
    rays = [];
    for (let a = 0; a < 360; a += 1) {
      let rad = (a * Math.PI) / 180;
      rays.push({ dx: Math.cos(rad), dy: Math.sin(rad) });
    }
  };

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.canvas.style.display = 'block';
    localObstacleCount = sharedState.obstacleCount;
    localTrigger = sharedState.triggerReset;
    initUniverse();
  };

  p5.draw = () => {
    if (document.hidden) return;
    if (sharedState.unmounted) {
      p5.noLoop();
      return;
    }
    // 1. Sync Dimensions
    if (sharedState.canvasWidth > 0 && sharedState.canvasHeight > 0) {
      if (Math.abs(p5.width - sharedState.canvasWidth) >= 2 || Math.abs(p5.height - sharedState.canvasHeight) >= 2) {
        p5.resizeCanvas(sharedState.canvasWidth, sharedState.canvasHeight);
        sharedState.canvasWidth = p5.width;
        sharedState.canvasHeight = p5.height;
        initUniverse(); 
      }
    }

    // 2. Sync React Input States
    if (sharedState.triggerReset !== localTrigger || sharedState.obstacleCount !== localObstacleCount) {
      localTrigger = sharedState.triggerReset;
      localObstacleCount = sharedState.obstacleCount;
      initUniverse();
    }

    p5.background('#0a0a0c');

    // Draw walls
    p5.stroke('#8b5cf6'); // Accent primary
    p5.strokeWeight(4);
    for (let i = 0; i < walls.length; i++) {
      p5.line(walls[i].x1, walls[i].y1, walls[i].x2, walls[i].y2);
    }

    // Mouse Coordinates for Particle Origin
    let sourceX = p5.mouseX;
    let sourceY = p5.mouseY;

    // Prevent light from jumping off-screen if cursor leaves canvas
    sourceX = Math.max(0, Math.min(sourceX, p5.width));
    sourceY = Math.max(0, Math.min(sourceY, p5.height));

    // Pure Scalar Line-Line Intersection Engine
    p5.stroke(255, 60); // White rays with low opacity
    p5.strokeWeight(1);
    
    // Draw center core
    p5.fill(255);
    p5.noStroke();
    p5.circle(sourceX, sourceY, 6);

    p5.stroke(255, 60);

    for (let i = 0; i < rays.length; i++) {
      let rDirX = rays[i].dx;
      let rDirY = rays[i].dy;
      
      let x3 = sourceX;
      let y3 = sourceY;
      let x4 = x3 + rDirX;
      let y4 = y3 + rDirY;

      let closestX = null;
      let closestY = null;
      let recordDistSq = Infinity;

      for (let j = 0; j < walls.length; j++) {
        let x1 = walls[j].x1;
        let y1 = walls[j].y1;
        let x2 = walls[j].x2;
        let y2 = walls[j].y2;

        let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0) continue; // Parallel

        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        // t must be between 0 and 1 (segment), u must be > 0 (ray looking forward)
        if (t > 0 && t < 1 && u > 0) {
          let ptX = x1 + t * (x2 - x1);
          let ptY = y1 + t * (y2 - y1);
          
          let distSq = (ptX - x3) * (ptX - x3) + (ptY - y3) * (ptY - y3);
          if (distSq < recordDistSq) {
            recordDistSq = distSq;
            closestX = ptX;
            closestY = ptY;
          }
        }
      }

      if (closestX !== null) {
        p5.line(x3, y3, closestX, closestY);
      }
    }
  };
};

const RayCastingCanvas = ({ params, updateParam }) => {
  const containerRef = useRef(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  // Sync React State to Shared Bridge
  if (params) {
    sharedState.obstacleCount = params.obstacleCount;
    sharedState.triggerReset = params.triggerReset;
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

export default RayCastingCanvas;   