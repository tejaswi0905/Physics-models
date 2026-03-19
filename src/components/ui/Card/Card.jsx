import React from 'react';
import './Card.css';

const Card = ({ children, className = '', hoverable = false }) => {
  return (
    <div className={`card glass-panel ${hoverable ? 'card-hoverable' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
