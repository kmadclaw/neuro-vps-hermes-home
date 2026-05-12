import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import groceriesData from './data/groceries.json';
import habitsData from './data/habits.json';
import tradingCommitteeData from './data/tradingCommittee.json';
import './styles.css';

export const homePageText = 'This page is managed by Neuro VPS Hermes Agent';
export const habitsPageTitle = 'Good Habits for an 8 Year Old';
export const tradingCommitteePageTitle = 'Trading Committee';

function MarkdownBlock({ markdown }) {
  const elements = [];
  const lines = markdown.split('\n');
  let listItems = [];
  let paragraphLines = [];

  function flushList() {
    if (listItems.length === 0) return;
    elements.push({ type: 'list', items: listItems });
    listItems = [];
  }

  function flushParagraph() {
    if (paragraphLines.length === 0) return;
    elements.push({ type: 'paragraph', text: paragraphLines.join(' ') });
    paragraphLines = [];
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (index === 0 && line.startsWith('# ')) return;
    if (!line) {
      flushList();
      flushParagraph();
      return;
    }
    if (line.startsWith('## ')) {
      flushList();
      flushParagraph();
      elements.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
      return;
    }
    if (line.startsWith('# ')) {
      flushList();
      flushParagraph();
      elements.push({ type: 'h1', text: line.replace(/^#\s+/, '') });
      return;
    }
    if (line.startsWith('- ')) {
      flushParagraph();
      listItems.push(line.replace(/^-\s+/, ''));
      return;
    }
    flushList();
    paragraphLines.push(line);
  });
  flushList();
  flushParagraph();

  return (
    <div className="markdown-report">
      {elements.map((element, index) => {
        if (element.type === 'h1') return <h1 key={index}>{element.text}</h1>;
        if (element.type === 'h2') return <h2 key={index}>{element.text}</h2>;
        if (element.type === 'list') {
          return (
            <ul key={index}>
              {element.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }
        return <p key={index}>{element.text}</p>;
      })}
    </div>
  );
}

function TradingCommitteePanel() {
  const defaultNoteId = tradingCommitteeData.notes.find((note) => note.ticker === 'NVDA')?.id ?? tradingCommitteeData.notes[0]?.id ?? '';
  const [ticker, setTicker] = useState('NVDA');
  const [selectedNoteId, setSelectedNoteId] = useState(defaultNoteId);
  const [copied, setCopied] = useState(false);

  const selectedNote = useMemo(
    () => tradingCommitteeData.notes.find((note) => note.id === selectedNoteId) ?? tradingCommitteeData.notes[0],
    [selectedNoteId],
  );

  const prompt = `Analyze ${ticker.toUpperCase()} with trading committee`;

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="panel committee-panel">
      <div className="committee-hero">
        <div>
          <p className="committee-kicker">Hermes-native · No API-key LLM billing</p>
          <h1>{tradingCommitteePageTitle}</h1>
          <p className="subtitle">{tradingCommitteeData.subtitle}</p>
        </div>
        <div className="committee-status" aria-label="Trading committee runtime">
          <span>Runtime</span>
          <strong>Hermes / Codex</strong>
        </div>
      </div>

      <section className="committee-chat-card" aria-labelledby="committee-chat-heading">
        <div>
          <h2 id="committee-chat-heading">Talk to the committee</h2>
          <p>Compose a prompt, copy it, then send it to Hermes in Telegram, Slack, or CLI.</p>
        </div>
        <div className="committee-prompt-row">
          <input
            aria-label="Ticker symbol"
            value={ticker}
            onChange={(event) => setTicker(event.target.value)}
            placeholder="NVDA"
          />
          <button type="button" onClick={copyPrompt}>{copied ? 'Copied' : 'Copy prompt'}</button>
        </div>
        <code>{prompt}</code>
      </section>

      <section className="committee-layout" aria-label="Saved trading committee analysis viewer">
        <aside className="committee-note-list">
          <h2>Saved analyses</h2>
          {tradingCommitteeData.notes.map((note) => (
            <button
              className={note.id === selectedNote?.id ? 'note-picker active' : 'note-picker'}
              key={note.id}
              type="button"
              onClick={() => setSelectedNoteId(note.id)}
            >
              <span>{note.ticker}</span>
              <strong>{note.bias}</strong>
              <small>{note.date} · {note.confidence}</small>
            </button>
          ))}
        </aside>

        {selectedNote && (
          <article className="committee-report-card">
            <header className="report-header">
              <div>
                <p className="committee-kicker">{selectedNote.path}</p>
                <h2>{selectedNote.title}</h2>
              </div>
              <div className="report-badges">
                <span>{selectedNote.bias}</span>
                <span>{selectedNote.horizon}</span>
                <span>{selectedNote.confidence}</span>
              </div>
            </header>
            <MarkdownBlock markdown={selectedNote.markdown} />
          </article>
        )}
      </section>
    </div>
  );
}

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
          <button
            className={activeTab === 'habits' ? 'tab active' : 'tab'}
            type="button"
            onClick={() => setActiveTab('habits')}
          >
            Habits
          </button>
          <button
            className={activeTab === 'committee' ? 'tab active' : 'tab'}
            type="button"
            onClick={() => setActiveTab('committee')}
          >
            Committee
          </button>
        </nav>

        {activeTab === 'home' && (
          <div className="panel home-panel">
            <p className="home-kicker">Live VPS dashboard</p>
            <h1 className="home-title" aria-label={homePageText}>
              <span className="home-title-line">This page is</span>
              <span className="home-title-line">managed by</span>
              <span className="home-title-highlight">Neuro VPS</span>
              <span className="home-title-line">Hermes Agent</span>
            </h1>
            <p className="home-subtitle">A clean control surface for your hosted agent workflows.</p>
          </div>
        )}

        {activeTab === 'groceries' && (
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

        {activeTab === 'habits' && (
          <div className="panel habits-panel">
            <h1>{habitsPageTitle}</h1>
            <p className="subtitle">{habitsData.subtitle}</p>

            <section className="habit-grid" aria-label="Daily habit tasks">
              {habitsData.tasks.map((task) => (
                <article className="habit-card" key={task.name}>
                  <div className="habit-check" aria-hidden="true">☆</div>
                  <div>
                    <h2>{task.name}</h2>
                    <p className="habit-when">{task.when}</p>
                    <p className="habit-goal">{task.goal}</p>
                  </div>
                </article>
              ))}
            </section>
          </div>
        )}

        {activeTab === 'committee' && <TradingCommitteePanel />}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
