import React from 'react';
import './Slider.css';

const Slider = ({ label, min, max, step, value, onChange, unit = '' }) => {
  return (
    <div className="slider-container">
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        <span className="slider-value">{value}{unit}</span>
      </div>
      <input 
        type="range" 
        className="slider-input" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default Slider;
