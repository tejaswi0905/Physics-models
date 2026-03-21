import React from 'react';
import Navbar from './Navbar/Navbar';
import VectorField from './VectorField';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <VectorField />
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
