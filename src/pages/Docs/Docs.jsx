import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import TableOfContents from './components/TableOfContents';
import ScrollToTop from './components/ScrollToTop';
import AddSimulationDocs from './content/AddSimulationDocs';
import ConversionDocs from './content/ConversionDocs';
import './Docs.css';

const Docs = () => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Deliberate small timeout to ensure child components render their DOM nodes first.
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('.docs-content h2[id], .docs-content h3[id]'));
      const items = elements.map((el) => ({
        id: el.id,
        title: el.textContent,
        level: Number(el.tagName.charAt(1))
      }));
      setHeadings(items);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="docs-page-bleed">
        <div className="docs-container">
          <main className="docs-content">
            <h1>Documentation</h1>
            <p className="docs-lead">
              Welcome to the Physics Models Engine developer documentation. This guide will walk you through setting up your computational environment, creating new mathematical models, and flawlessly bridging the gap between standalone Vanilla JavaScript physics files and the state-driven React ecosystem.
            </p>

            <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '1.5rem', marginBottom: '3.5rem' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Generative AI Master Prompt</h3>
              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '1.25rem' }}>
                Here is a Master Prompt! Copy and paste this incredibly detailed instruction-set securely into any LLM to accurately learn absolutely everything I am explicitly teaching in the Masterclass below!
              </p>
              <button 
                onClick={(e) => {
                  const promptText = "I have a pure Vanilla JavaScript p5.js physics simulation spanning multiple OOP classes (like particle.js and quadtree.js) natively wrapped by a global sketch.js utilizing highly intensive setup() and draw() algorithmic loops. I urgently need to securely port this into a cleanly scalable modern React ecosystem using react-p5-wrapper. Please explicitly explain the devastating architectural pitfalls of the 'Imperative Trap' causing Virtual-DOM memory leaks, and precisely demonstrate natively how to isolate the p5 algorithmic engine securely inside an Instance Mode functional Closure. Finally, explicitly teach me natively how to build a dynamic asynchronous Mutative Shared State Object Bridge precisely to effortlessly pipe React UI Slider variables directly into the deep 60fps p5.draw() math loop seamlessly without viciously mutating or unmounting my React components continuously!";
                  navigator.clipboard.writeText(promptText);
                  const btn = e.target;
                  btn.textContent = "Copied to Clipboard!";
                  btn.style.background = 'rgba(16, 185, 129, 0.2)';
                  btn.style.borderColor = '#10b981';
                  btn.style.color = '#10b981';
                  setTimeout(() => {
                    btn.textContent = "Copy Master Prompt";
                    btn.style.background = 'transparent';
                    btn.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                    btn.style.color = '#38bdf8';
                  }, 3000);
                }}
                style={{
                  background: 'transparent',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onMouseOver={(e) => { if (e.target.textContent !== "Copied to Clipboard!") e.target.style.background = 'rgba(56, 189, 248, 0.2)' }}
                onMouseOut={(e) => { if (e.target.textContent !== "Copied to Clipboard!") e.target.style.background = 'transparent' }}
              >
                Copy Master Prompt
              </button>
            </div>
            
            <AddSimulationDocs />
            <ConversionDocs />
          </main>
          
          <aside className="docs-sidebar-wrapper">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
      <ScrollToTop />
    </Layout>
  );
};

export default Docs;
