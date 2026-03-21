import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

const sharedState = {
  pointCount: 50,
  status: 'idle',
  canvasWidth: 0,
  canvasHeight: 0,
  markDone: null
};

const sketch = (p5) => {
  p5.disableFriendlyErrors = true; // Optimize performance and stop background memory leaks
  let points = [];
  let hull = [];
  
  let leftMost, currentVertex, nextVertex, checking;
  let index = 0;
  
  let localStatus = 'idle';
  let localPointCount = 50;

  const initUniverse = () => {
    points = [];
    hull = [];
    let buffer = 40;
    
    // Generate Random Points
    for (let i = 0; i < localPointCount; i++) {
      points.push({
        x: p5.random(buffer, Math.max(p5.width - buffer, 100)),
        y: p5.random(buffer, Math.max(p5.height - buffer, 100))
      });
    }
    
    // Sort to find leftmost point
    points.sort((a, b) => a.x - b.x);
    leftMost = points[0];
    currentVertex = leftMost;
    hull.push(currentVertex);
    nextVertex = points[1];
    index = 2;
    localStatus = 'idle';
  };

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.canvas.style.display = 'block';
    localPointCount = sharedState.pointCount;
    initUniverse();
  };

  p5.draw = () => {
    if (document.hidden) return;
    // 0. Manual Reactive Resize
    if (sharedState.unmounted) {
      p5.noLoop();
      return;
    }

    if (sharedState.canvasWidth > 0 && sharedState.canvasHeight > 0) {
      if (Math.abs(p5.width - sharedState.canvasWidth) >= 2 || Math.abs(p5.height - sharedState.canvasHeight) >= 2) {
        p5.resizeCanvas(sharedState.canvasWidth, sharedState.canvasHeight);
        sharedState.canvasWidth = p5.width;
        sharedState.canvasHeight = p5.height;
        initUniverse(); // Cancel animation on screen resize
        if (sharedState.markDone && sharedState.status !== 'idle') {
          sharedState.markDone('idle');
        }
      }
    }

    // 1. Sync State Changes
    if (sharedState.status === 'idle' && localStatus !== 'idle') {
      initUniverse();
    } else if (sharedState.pointCount !== localPointCount) {
      localPointCount = sharedState.pointCount;
      initUniverse();
    }
    localStatus = sharedState.status;

    p5.background('#0a0a0c');

    // 2. Draw all points (Base layer)
    p5.stroke(255);
    p5.strokeWeight(8);
    for (let p of points) {
      p5.point(p.x, p.y);
    }

    // 3. State: Idle (Wait for user)
    if (localStatus === 'idle') return;

    // 4. Draw established hull lines
    p5.stroke('#3b82f6'); // var(--accent-primary equivalent)
    p5.fill(59, 130, 246, 50); // transparent fill
    p5.strokeWeight(2);
    p5.beginShape();
    for (let p of hull) {
      p5.vertex(p.x, p.y);
    }
    if (localStatus === 'done') p5.endShape(p5.CLOSE);
    else p5.endShape();

    // 5. State: Done (Algorithm complete)
    if (localStatus === 'done') return;

    // 6. State: Running (Compute one step per frame)
    p5.stroke('#10b981'); // Green marker
    p5.strokeWeight(16);
    p5.point(leftMost.x, leftMost.y);

    p5.stroke('#d946ef'); // Purple marker
    p5.strokeWeight(16);
    p5.point(currentVertex.x, currentVertex.y);

    p5.stroke('#10b981'); // Green line tracking best next vertex
    p5.strokeWeight(2);
    p5.line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y);

    checking = points[index];
    p5.stroke(255, 150); // Ghost white line scanning points
    p5.line(currentVertex.x, currentVertex.y, checking.x, checking.y);

    // Pure Scalar Cross Product (Z-component)
    let ax = nextVertex.x - currentVertex.x;
    let ay = nextVertex.y - currentVertex.y;
    let bx = checking.x - currentVertex.x;
    let by = checking.y - currentVertex.y;
    let crossZ = (ax * by) - (ay * bx);

    // If point is to the right of the line, it is the new outermost candidate
    if (crossZ < 0) {
      nextVertex = checking;
    }

    index++;
    
    // Reached end of point array, finalize edge
    if (index === points.length) {
      if (nextVertex === leftMost) {
        // Algorithm complete
        localStatus = 'done';
        sharedState.status = 'done';
        if (sharedState.markDone) sharedState.markDone('done');
      } else {
        hull.push(nextVertex);
        currentVertex = nextVertex;
        index = 0;
        nextVertex = leftMost;
      }
    }
  };
};

const ConvexHullCanvas = ({ params, updateParam }) => {
  const containerRef = useRef(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  // Sync React State to P5 Thread Bridge
  if (params) {
    sharedState.pointCount = params.pointCount;
    sharedState.status = params.status;
  }
  
  // Expose React updater to P5 Thread perfectly reliably
  sharedState.markDone = (newStatus) => {
    updateParam('status', newStatus);
  };

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

export default ConvexHullCanvas;