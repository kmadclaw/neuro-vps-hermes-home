import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import groceriesData from './data/groceries.json';
import './styles.css';

export const homePageText = 'This page is managed by Neuro VPS Hermes Agent';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="page-shell" aria-label="Neuro VPS Hermes Agent app">
      <section className="hero-card">
        <p className="eyebrow">Neuro VPS</p>
        <nav className="tabs" aria-label="App sections">
          <button
            className={activeTab === 'home' ? 'tab active' : 'tab'}
            type="button"
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            className={activeTab === 'groceries' ? 'tab active' : 'tab'}
            type="button"
            onClick={() => setActiveTab('groceries')}
          >
            Groceries
          </button>
        </nav>

        {activeTab === 'home' ? (
          <div className="panel home-panel">
            <h1>{homePageText}</h1>
          </div>
        ) : (
          <div className="panel groceries-panel">
            <h1>Groceries</h1>
            <p className="subtitle">Shopping list tracked in this GitHub repo.</p>

            <section className="list-section" aria-labelledby="to-buy-heading">
              <h2 id="to-buy-heading">To buy</h2>
              <ul className="grocery-list">
                {groceriesData.toBuy.map((item) => (
                  <li key={item}>
                    <span className="checkbox" aria-hidden="true">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="list-section" aria-labelledby="bought-heading">
              <h2 id="bought-heading">Bought</h2>
              {groceriesData.bought.length > 0 ? (
                <ul className="grocery-list bought-list">
                  {groceriesData.bought.map((item) => (
                    <li key={item}>
                      <span className="checkbox" aria-hidden="true">☑</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">Nothing bought yet.</p>
              )}
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
