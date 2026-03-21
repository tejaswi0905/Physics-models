import React, { useEffect, useState } from 'react';

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // Trigger when header hits top 20% of viewport
      { rootMargin: '-10% 0px -70% 0px' } 
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      // Optionally sync React state immediately to prevent visual lag
      setActiveId(id);
    }
  };

  return (
    <nav className="docs-sidebar">
      <div className="toc-title">Table of Contents</div>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id} className="toc-item">
            <a 
              href={`#${heading.id}`}
              className={`toc-link ${heading.level === 3 ? 'indent' : ''} ${activeId === heading.id ? 'active' : ''}`}
              onClick={(e) => handleClick(e, heading.id)}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
