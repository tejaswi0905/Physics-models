import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

// --- Pure Mathematics (Decoupled from p5 for performance) ---
class Complex {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }
  add(c) {
    this.re += c.re;
    this.im += c.im;
  }
  mult(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }
}

const dft = (x) => {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complex(0, 0);
    for (let n = 0; n < N; n++) {
      const phi = (2 * Math.PI * k * n) / N;
      const c = new Complex(Math.cos(phi), -Math.sin(phi));
      sum.add(x[n].mult(c));
    }
    sum.re = sum.re / N;
    sum.im = sum.im / N;

    X[k] = {
      re: sum.re,
      im: sum.im,
      freq: k,
      amp: Math.sqrt(sum.re * sum.re + sum.im * sum.im),
      phase: Math.atan2(sum.im, sum.re)
    };
  }
  return X;
};

// --- Shared State Bridge ---
const sharedState = {
  status: 'prompt',
  canvasWidth: 0,
  canvasHeight: 0,
  updateReact: null
};

// --- p5 Engine ---
const sketch = (p5) => {
  let localStatus = 'prompt';
  
  let drawingData = [];
  let path = [];
  let fourierX = [];
  let time = 0;
  let doneTimer = 0;

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.canvas.style.display = 'block';
  };

  const resetToPrompt = () => {
    localStatus = 'prompt';
    sharedState.status = 'prompt';
    drawingData = [];
    path = [];
    fourierX = [];
    time = 0;
    doneTimer = 0;
    if (sharedState.updateReact) sharedState.updateReact('status', 'prompt');
  };

  p5.mousePressed = () => {
    // Ensure click is inside canvas bounds
    if (p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
      if (localStatus === 'prompt' || localStatus === 'done' || localStatus === 'ready') {
        resetToPrompt();
        localStatus = 'drawing';
        sharedState.status = 'drawing';
        if (sharedState.updateReact) sharedState.updateReact('status', 'drawing');
      }
    }
  };

  p5.mouseDragged = () => {
    if (localStatus === 'drawing') {
      let point = p5.createVector(p5.mouseX - p5.width / 2, p5.mouseY - p5.height / 2);
      drawingData.push(point);
    }
  };

  p5.mouseReleased = () => {
    if (localStatus === 'drawing') {
      if (drawingData.length > 5) {
        localStatus = 'ready';
        sharedState.status = 'ready';
        if (sharedState.updateReact) sharedState.updateReact('status', 'ready');

        // Prepare data for DFT
        let xParams = [];
        // Optional optimization: skip points if array is too massive
        const skip = 1; 
        for (let i = 0; i < drawingData.length; i += skip) {
          xParams.push(new Complex(drawingData[i].x, drawingData[i].y));
        }
        
        // Compute and sort by amplitude (largest epicycles first)
        fourierX = dft(xParams);
        fourierX.sort((a, b) => b.amp - a.amp);
      } else {
        // If they just clicked without dragging, reset
        resetToPrompt();
      }
    }
  };

  const drawEpicycles = (x, y, rotation, fourier) => {
    for (let i = 0; i < fourier.length; i++) {
      let prevx = x;
      let prevy = y;
      let freq = fourier[i].freq;
      let radius = fourier[i].amp;
      let phase = fourier[i].phase;
      
      x += radius * p5.cos(freq * time + phase + rotation);
      y += radius * p5.sin(freq * time + phase + rotation);

      p5.stroke(255, 60);
      p5.noFill();
      p5.ellipse(prevx, prevy, radius * 2);
      p5.stroke(255, 150);
      p5.line(prevx, prevy, x, y);
    }
    return p5.createVector(x, y);
  };

  p5.draw = () => {
    // 1. Sync dimensions
    if (sharedState.canvasWidth > 0 && sharedState.canvasHeight > 0) {
      if (Math.abs(p5.width - sharedState.canvasWidth) >= 2 || Math.abs(p5.height - sharedState.canvasHeight) >= 2) {
        p5.resizeCanvas(sharedState.canvasWidth, sharedState.canvasHeight);
        sharedState.canvasWidth = p5.width;
        sharedState.canvasHeight = p5.height;
        resetToPrompt(); 
      }
    }

    // 2. Sync React trigger
    if (sharedState.status === 'animating' && localStatus === 'ready') {
      localStatus = 'animating';
      time = 0;
      path = [];
    }

    p5.background('#0a0a0c');

    if (localStatus === 'prompt') {
      p5.fill(255);
      p5.noStroke();
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(32);
      p5.text("Draw Something!", p5.width / 2, p5.height / 2);
    } 
    
    else if (localStatus === 'drawing' || localStatus === 'ready') {
      p5.stroke('#8b5cf6'); // Accent purple
      p5.noFill();
      p5.strokeWeight(3);
      p5.beginShape();
      for (let v of drawingData) {
        p5.vertex(v.x + p5.width / 2, v.y + p5.height / 2);
      }
      p5.endShape();
    } 
    
    else if (localStatus === 'animating') {
      let v = drawEpicycles(p5.width / 2, p5.height / 2, 0, fourierX);
      path.unshift(v);
      
      p5.beginShape();
      p5.noFill();
      p5.strokeWeight(3);
      p5.stroke('#ec4899'); // Accent pink
      for (let i = 0; i < path.length; i++) {
        p5.vertex(path[i].x, path[i].y);
      }
      p5.endShape();

      const dt = p5.TWO_PI / fourierX.length;
      time += dt;

      if (time >= p5.TWO_PI) {
        localStatus = 'done';
        sharedState.status = 'done';
        doneTimer = 0;
      }
    }

    else if (localStatus === 'done') {
      // Show final drawn path
      p5.beginShape();
      p5.noFill();
      p5.strokeWeight(3);
      p5.stroke('#ec4899');
      for (let i = 0; i < path.length; i++) {
        p5.vertex(path[i].x, path[i].y);
      }
      p5.endShape();

      // Split-second delay (approx 1.5 seconds at 60fps)
      doneTimer++;
      if (doneTimer > 90) {
        resetToPrompt();
      }
    }
  };
};

const FourierSeriesCanvas = ({ params, updateParam }) => {
  const containerRef = useRef(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  // Sync React State Down
  if (params) {
    sharedState.status = params.status;
  }
  
  // Sync Engine State Up
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
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>
      {hasDimensions && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'crosshair' }}>
          <P5Canvas sketch={sketch} />
        </div>
      )}
    </div>
  );
};

export default FourierSeriesCanvas;