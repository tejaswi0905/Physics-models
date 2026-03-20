import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';
import { Particle, QuadTree, Rectangle, Point, Circle } from './logic';

const sharedState = {
  numBalls: 10,
  canvasWidth: 0,
  canvasHeight: 0
};

const sketch = (p5) => {
  p5.disableFriendlyErrors = true; // Optimize performance and stop background memory leaks
  let numBalls = 10;
  let particles = [];
  const PALETTE = ['#0B6A88', '#2DC5F4', '#70327E', '#9253A1', '#A42963', '#EC015A', '#F063A4', '#F89E4F', '#FCEE21'];

  const initUniverse = (count) => {
    particles = [];
    for (let i = 0; i < count; i++) {
      const x = p5.random(50, Math.max(p5.width - 50, 100));
      const y = p5.random(50, Math.max(p5.height - 50, 100));
      const mass = p5.random(4, 8);
      const color = p5.random(PALETTE);
      particles.push(new Particle(x, y, mass, i, color));
    }
  };

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.canvas.style.display = 'block'; 
    initUniverse(numBalls);
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

    if (numBalls !== sharedState.numBalls) {
      numBalls = sharedState.numBalls;
      if (p5.canvas && p5.width > 0) {
        initUniverse(numBalls);
      }
    }

    p5.background('#0a0a0c');

    let boundary = new Rectangle(p5.width / 2, p5.height / 2, p5.width, p5.height);
    let qtree = new QuadTree(boundary, 4);
    let checkedPairs = new Set();

    for (let p of particles) {
      qtree.insert(new Point(p.x, p.y, p));
    }

    for (let i = 0; i < particles.length; i++) {
      let pA = particles[i];
      let range = new Circle(pA.x, pA.y, pA.r * 2);
      let points = qtree.query(range);

      for (let pt of points) {
        let pB = pt.userData;
        if (pB !== pA) {
          let pairId = pA.id < pB.id ? `${pA.id}-${pB.id}` : `${pB.id}-${pA.id}`;
          if (!checkedPairs.has(pairId)) {
            pA.collide(pB);
            checkedPairs.add(pairId);
          }
        }
      }
    }

    p5.noStroke();
    for (let p of particles) {
      p.update(p5.width, p5.height);
      p5.fill(p.color);
      p5.circle(p.x, p.y, p.r * 2);
    }
  };
};

const ElasticCollisionsCanvas = ({ params }) => {
  const containerRef = useRef(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  if (params && params.numBalls !== undefined) {
    sharedState.numBalls = Number(params.numBalls);
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

export default ElasticCollisionsCanvas;