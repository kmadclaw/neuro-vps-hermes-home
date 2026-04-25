import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

export const homePageText = 'This page is managed by Neuro VPS Hermes Agent';

function App() {
  return (
    <main className="page-shell" aria-label="Neuro VPS Hermes Agent homepage">
      <section className="hero-card">
        <p className="eyebrow">Neuro VPS</p>
        <h1>{homePageText}</h1>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
