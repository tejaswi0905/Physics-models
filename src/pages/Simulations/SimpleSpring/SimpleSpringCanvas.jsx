import React, { useRef, useState, useEffect } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

const sharedState = {
  restLength: 200,
  stiffness: 0.05,
  gravity: 0.5,
  damping: 0.98,
  isIdeal: false,
  canvasWidth: 0,
  canvasHeight: 0
};

const sketch = (p5) => {
  let anchorX = 0, anchorY = 0;
  let bobX = 0, bobY = 0;
  let vx = 0, vy = 0;
  let isDragging = false;
  let bobRadius = 30;

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.canvas.style.display = 'block';
    
    anchorX = p5.width / 2;
    anchorY = p5.height * 0.1;
    bobX = anchorX;
    bobY = anchorY + sharedState.restLength;
  };

  p5.draw = () => {
    if (sharedState.canvasWidth > 0 && sharedState.canvasHeight > 0) {
      if (Math.abs(p5.width - sharedState.canvasWidth) >= 2 || Math.abs(p5.height - sharedState.canvasHeight) >= 2) {
        p5.resizeCanvas(sharedState.canvasWidth, sharedState.canvasHeight);
        anchorX = p5.width / 2;
        anchorY = p5.height * 0.1;
        sharedState.canvasWidth = p5.width;
        sharedState.canvasHeight = p5.height;
      }
    }

    p5.background('#0a0a0c');

    const dtScale = Math.min(p5.deltaTime / (1000/60) || 1, 3); 

    if (isDragging) {
      bobX = p5.mouseX;
      bobY = p5.mouseY;
      vx = 0;
      vy = 0;
    } else {
      let dx = bobX - anchorX;
      let dy = bobY - anchorY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        let stretch = distance - sharedState.restLength;
        let forceMag = -sharedState.stiffness * stretch;
        
        let fx = (dx / distance) * forceMag;
        let fy = (dy / distance) * forceMag;
        
        vx += fx * dtScale;
        vy += (fy + sharedState.gravity) * dtScale;
      }

      let activeDamping = sharedState.isIdeal ? 1.0 : sharedState.damping;
      vx *= activeDamping;
      vy *= activeDamping;
      bobX += vx * dtScale;
      bobY += vy * dtScale;
    }

    let dxMouse = p5.mouseX - bobX;
    let dyMouse = p5.mouseY - bobY;
    let isHovering = (dxMouse * dxMouse + dyMouse * dyMouse) < (bobRadius * bobRadius);

    if (isDragging) p5.cursor('grabbing');
    else if (isHovering) p5.cursor('grab');
    else p5.cursor('default');

    p5.strokeWeight(3);
    p5.stroke('#a1a1aa');
    p5.line(anchorX, anchorY, bobX, bobY);

    p5.noStroke();
    p5.fill('#8b5cf6');
    p5.circle(anchorX, anchorY, 16);

    p5.fill(139, 92, 246, isHovering || isDragging ? 80 : 30);
    p5.circle(bobX, bobY, bobRadius * 2.5);

    p5.fill('#2dd4bf');
    if (isHovering || isDragging) p5.stroke(255);
    else p5.noStroke();
    p5.strokeWeight(2);
    p5.circle(bobX, bobY, bobRadius * 2);
  };

  p5.mousePressed = () => {
    let dx = p5.mouseX - bobX;
    let dy = p5.mouseY - bobY;
    if ((dx * dx + dy * dy) < (bobRadius * bobRadius)) {
      isDragging = true;
    }
  };

  p5.mouseReleased = () => {
    isDragging = false;
  };
};

const SimpleSpringCanvas = ({ params }) => {
  const containerRef = useRef(null);
  const [hasDimensions, setHasDimensions] = useState(false);

  if (params) {
    sharedState.restLength = params.restLength;
    sharedState.stiffness = params.stiffness;
    sharedState.gravity = params.gravity;
    sharedState.damping = params.damping;
    sharedState.isIdeal = params.isIdeal;
  }

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
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <P5Canvas sketch={sketch} />
        </div>
      )}
    </div>
  );
};

export default SimpleSpringCanvas;