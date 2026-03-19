import React, { useRef, useEffect } from 'react';
import './Slider.css';

const Slider = ({ label, min, max, step, value, onChange, unit = '' }) => {
  const inputRef = useRef(null);
  const valueRef = useRef(null);

  // Sync initial and external changes when user isn't interacting natively
  useEffect(() => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = value;
      const percentage = ((value - min) / (max - min)) * 100;
      inputRef.current.style.setProperty('--progress', `${percentage}%`);
      
      if (valueRef.current) {
        valueRef.current.textContent = value + unit;
      }
    }
  }, [value, min, max, unit]);

  const handleInput = (e) => {
    const val = Number(e.target.value);
    const percentage = ((val - min) / (max - min)) * 100;
    
    // Instantly update UI off main-thread
    e.target.style.setProperty('--progress', `${percentage}%`);
    if (valueRef.current) valueRef.current.textContent = val + unit;

    // Trigger state changes asynchronously without blocking native drag event
    setTimeout(() => {
      onChange(val);
    }, 0);
  };

  return (
    <div className="slider-container">
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        <span className="slider-value" ref={valueRef}>{value}{unit}</span>
      </div>
      <input 
        ref={inputRef}
        type="range" 
        className="slider-input" 
        min={min} 
        max={max} 
        step={step} 
        defaultValue={value} 
        onInput={handleInput}
      />
    </div>
  );
};

export default Slider;
