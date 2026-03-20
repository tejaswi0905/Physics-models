import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

const make2DArray = (cols, rows) => {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
};

// Global bridging state. React writes here, P5 reads here.
// This completely bypasses any React component remounts or library bugs.
const sharedState = {
  brushSize: 5,
  gravityEnabled: true,
  canvasWidth: 0,
  canvasHeight: 0
};

const sketch = (p5) => {
  p5.disableFriendlyErrors = true; // Optimize performance and stop background memory leaks
  
  let grid;
  let nextGrid;
  let velocityGrid;
  let nextVelocityGrid;
  
  const w = 6;
  let cols, rows;
  let hueValue = 200;

  const initGrids = () => {
    cols = p5.ceil(p5.width / w);
    rows = p5.ceil(p5.height / w); 
    grid = make2DArray(cols, rows);
    nextGrid = make2DArray(cols, rows);
    velocityGrid = make2DArray(cols, rows);
    nextVelocityGrid = make2DArray(cols, rows);
  };

  const resizeGrids = (newCols, newRows) => {
    let newGrid = make2DArray(newCols, newRows);
    let newNextGrid = make2DArray(newCols, newRows);
    let newVelGrid = make2DArray(newCols, newRows);
    let newNextVelGrid = make2DArray(newCols, newRows);

    if (grid && velocityGrid) {
      for (let i = 0; i < Math.min(cols, newCols); i++) {
        for (let j = 0; j < Math.min(rows, newRows); j++) {
          newGrid[i][j] = grid[i][j];
          newVelGrid[i][j] = velocityGrid[i][j];
        }
      }
    }

    cols = newCols;
    rows = newRows;
    grid = newGrid;
    nextGrid = newNextGrid;
    velocityGrid = newVelGrid;
    nextVelocityGrid = newNextVelGrid;
  };

  const withinCols = (i) => i >= 0 && i < cols;
  const withinRows = (j) => j >= 0 && j < rows;

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.canvas.style.display = 'block';
    p5.colorMode(p5.HSB, 360, 255, 255);
    initGrids();
  };

  p5.draw = () => {
    // 0. Aggressive Memory Leak Murder-Switch
    // If React unmounts this component but the p5-wrapper orphans the instance, shut it down.
    if (sharedState.unmounted) {
      p5.noLoop();
      return;
    }

    // 1. Manual Reactive Resize with strict deadzone to prevent infinite layout oscillation loops
    if (sharedState.canvasWidth > 0 && sharedState.canvasHeight > 0) {
      if (Math.abs(p5.width - sharedState.canvasWidth) >= 2 || Math.abs(p5.height - sharedState.canvasHeight) >= 2) {
        p5.resizeCanvas(sharedState.canvasWidth, sharedState.canvasHeight);
        let newCols = p5.ceil(p5.width / w);
        let newRows = p5.ceil(p5.height / w);
        if (newCols !== cols || newRows !== rows) {
          resizeGrids(newCols, newRows);
        }
        // Cement the matching dimensions to prevent fractional rebounce
        sharedState.canvasWidth = p5.width;
        sharedState.canvasHeight = p5.height;
      }
    }

    p5.background('#0a0a0c');

    // 1. Handle Input
    if (p5.mouseIsPressed) {
      let mouseCol = p5.floor(p5.mouseX / w);
      let mouseRow = p5.floor(p5.mouseY / w);

      let extent = p5.floor(sharedState.brushSize / 2);
      let spawnDensity = p5.map(sharedState.brushSize, 1, 15, 0.8, 0.15);

      for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
          if (p5.random(1) < spawnDensity) {
            let col = mouseCol + i;
            let row = mouseRow + j;
            if (withinCols(col) && withinRows(row)) {
              grid[col][row] = hueValue;
              velocityGrid[col][row] = 1;
            }
          }
        }
      }
      hueValue = (hueValue + 0.5) % 360;
    }

    const gravity = sharedState.gravityEnabled ? 0.3 : 0.02;

    // 2. Clear Next Frame Buffers
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nextGrid[i][j] = 0;
        nextVelocityGrid[i][j] = 0;
      }
    }

    // 3. Render Current Frame & Calculate Physics
    p5.noStroke();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        
        if (state > 0) {
          p5.fill(state, 255, 255);
          p5.square(i * w, j * w, w);

          let velocity = velocityGrid[i][j];
          let moved = false;
          let newPos = p5.floor(j + velocity);
          
          for (let y = newPos; y > j; y--) {
            if (!withinRows(y)) continue;

            let below = grid[i][y];
            let dir = p5.random(1) < 0.5 ? 1 : -1;
            
            let belowA = withinCols(i + dir) ? grid[i + dir][y] : -1;
            let belowB = withinCols(i - dir) ? grid[i - dir][y] : -1;

            let maxSpeed = 15;
            if (below === 0) {
              nextGrid[i][y] = state;
              nextVelocityGrid[i][y] = Math.min(velocity + gravity, maxSpeed);
              moved = true;
              break;
            } else if (belowA === 0) {
              nextGrid[i + dir][y] = state;
              nextVelocityGrid[i + dir][y] = Math.min(velocity + gravity, maxSpeed);
              moved = true;
              break;
            } else if (belowB === 0) {
              nextGrid[i - dir][y] = state;
              nextVelocityGrid[i - dir][y] = Math.min(velocity + gravity, maxSpeed);
              moved = true;
              break;
            }
          }

          if (!moved) {
            nextGrid[i][j] = state;
            // CRITICAL FIX: Terminal velocity of resting sand must be reset to 1!
            // If it is 0, the next frame's loop will never check the space below it, causing flying/stuck sand.
            // If we cap it at 1, it checks exactly 1 block beneath itself forever without infinite CPU scaling.
            nextVelocityGrid[i][j] = 1;
          }
        }
      }
    }

    // 4. Swap Buffers
    let tempG = grid;
    grid = nextGrid;
    nextGrid = tempG;

    let tempV = velocityGrid;
    velocityGrid = nextVelocityGrid;
    nextVelocityGrid = tempV;
  };
};

const FallingSandCanvas = ({ params }) => {
  const containerRef = useRef(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  // High-performance pass: React writes directly to the shared JS object instance
  if (params) {
    sharedState.brushSize = params.brushSize;
    sharedState.gravityEnabled = params.gravityEnabled;
  }

  useEffect(() => {
    sharedState.unmounted = false; // Reset on mount

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
      sharedState.unmounted = true; // Trigger memory-leak Killswitch in p5 thread
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

export default FallingSandCanvas;