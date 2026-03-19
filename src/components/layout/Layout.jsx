import React from 'react';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="app-bg-glow"></div>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
