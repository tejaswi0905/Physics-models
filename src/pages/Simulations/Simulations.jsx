import React from 'react';
import Layout from '../../components/layout/Layout';

const Simulations = () => {
  return (
    <Layout>
      <div className="container" style={{ paddingTop: '6rem' }}>
        <h2>Available Simulations</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select a simulation to explore.</p>
        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Card placeholders will go here */}
        </div>
      </div>
    </Layout>
  );
};

export default Simulations;
