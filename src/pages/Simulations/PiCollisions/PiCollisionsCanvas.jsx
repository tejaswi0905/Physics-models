import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

// The Shared Memory Bridge
const sharedState = {
  digits: 5,
  status: 'idle',
  canvasWidth: 0,
  canvasHeight: 0,
  updateReact: null
};

class Block {
  constructor(x, w, m, v, xc, height) {
    this.x = x;
    this.y = height - w;
    this.w = w;
    this.v = v;
    this.m = m;
    this.xConstraint = xc;
  }

  hitWall() {
    return (this.x <= 0);
  }

  reverse() {
    this.v *= -1;
  }

  collide(other) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }

  bounce(other) {
    let sumM = this.m + other.m;
    let newV = ((this.m - other.m) / sumM) * this.v;
    newV += ((2 * other.m) / sumM) * other.v;
    return newV;
  }

  update() {
    this.x += this.v;
  }
}

const sketch = (p5) => {
  let clackSound;
  
  let block1, block2;
  let localCount = 0;
  let localStatus = 'idle';
  let localDigits = 5;
  let timeSteps = 10000;

  const initUniverse = () => {
    localCount = 0;
    localStatus = 'idle';
    timeSteps = Math.pow(10, localDigits - 1);
    
    // Base block sizes
    const w1 = 30;
    // Scale the big block visually based on digits (from 60px to 180px)
    const w2 = 60 + (localDigits - 3) * 30; 

    // Setup blocks based on precision
    block1 = new Block(100, w1, 1, 0, 0, p5.height);
    const m2 = Math.pow(100, localDigits - 1);
    
    // Move block2 further right if it gets wider so it doesn't spawn inside block1
    block2 = new Block(p5.width / 2, w2, m2, -1 / timeSteps, w1, p5.height);

    if (sharedState.updateReact) {
      sharedState.updateReact('count', 0);
    }
  };

  p5.setup = () => {
    p5.createCanvas(800, 400);
    p5.canvas.style.display = 'block';
    clackSound = new Audio('/piWithCollision/clack.wav');
    localDigits = sharedState.digits;
    initUniverse();
  };

  p5.draw = () => {
    // 1. Handle Resizes
    if (sharedState.canvasWidth > 0 && sharedState.canvasHeight > 0) {
      if (Math.abs(p5.width - sharedState.canvasWidth) >= 2 || Math.abs(p5.height - sharedState.canvasHeight) >= 2) {
        p5.resizeCanvas(sharedState.canvasWidth, sharedState.canvasHeight);
        sharedState.canvasWidth = p5.width;
        sharedState.canvasHeight = p5.height;
        initUniverse();
        if (sharedState.updateReact && sharedState.status !== 'idle') {
          sharedState.updateReact('status', 'idle');
        }
      }
    }

    // 2. Sync React State
    if (sharedState.status === 'idle' && localStatus !== 'idle') {
      initUniverse();
    } else if (sharedState.digits !== localDigits) {
      localDigits = sharedState.digits;
      initUniverse();
    }
    localStatus = sharedState.status;

    p5.background('#0a0a0c');

    // Draw the "Wall"
    p5.stroke('#3f3f46'); // Zinc 700
    p5.strokeWeight(4);
    p5.line(0, 0, 0, p5.height);

    // 3. Render Blocks (Dynamic Shapes)
    const x1 = Math.max(block1.x, block1.xConstraint);
    const x2 = Math.max(block2.x, block2.xConstraint);
    
    p5.noStroke();
    
    // Block 1 (Small Mass)
    p5.fill('#2dd4bf'); // Teal
    p5.rect(x1, block1.y, block1.w, block1.w, 4);
    
    // Block 2 (Huge Mass)
    p5.fill('#ec4899'); // Pink
    p5.rect(x2, block2.y, block2.w, block2.w, 8);

    // Render Mass Text
    p5.fill(255);
    p5.noStroke();
    p5.textAlign(p5.CENTER);
    p5.textSize(14);
    
    p5.text("m = 1", x1 + block1.w / 2, block1.y - 15);
    // Display massive exponent math (e.g., m = 10^12)
    p5.text(`m = 10^${(localDigits - 1) * 2}`, x2 + block2.w / 2, block2.y - 15);

    // 4. Physics Engine Loop
    if (localStatus === 'running') {
      let playSoundThisFrame = false;

      for (let i = 0; i < timeSteps; i++) {
        if (block1.collide(block2)) {
          const v1 = block1.bounce(block2);
          const v2 = block2.bounce(block1);
          block1.v = v1;
          block2.v = v2;
          playSoundThisFrame = true;
          localCount++;
        }

        if (block1.hitWall()) {
          block1.reverse();
          playSoundThisFrame = true;
          localCount++;
        }

        block1.update();
        block2.update();
      }

      // Audio throttling
      if (playSoundThisFrame && clackSound) {
        clackSound.currentTime = 0;
        clackSound.play().catch(() => {}); 
      }

      // Update the React UI counter 
      if (sharedState.updateReact) {
        if (p5.frameCount % 3 === 0) {
          sharedState.updateReact('count', localCount);
        }
      }

      // 5. Check Simulation Completion
      if (block2.x > p5.width) {
        localStatus = 'done';
        sharedState.status = 'done';
        if (sharedState.updateReact) {
          sharedState.updateReact('count', localCount); 
          sharedState.updateReact('status', 'done');
        }
      }
    }
  };
};

const PiCollisionsCanvas = ({ params, updateParam }) => {
  const containerRef = useRef(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  // Sync React State Down to Bridge
  if (params) {
    sharedState.digits = params.digits;
    sharedState.status = params.status;
  }
  
  // Pass React Updater Up to Bridge
  sharedState.updateReact = (key, value) => {
    updateParam(key, value);
  };

  useEffect(() => {
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
    return () => observer.disconnect();
  }, [hasDimensions]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px', borderBottom: '2px solid var(--text-secondary)', borderLeft: '4px solid #3f3f46' }}>
      {hasDimensions && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <P5Canvas sketch={sketch} />
        </div>
      )}
    </div>
  );
};

export default PiCollisionsCanvas;