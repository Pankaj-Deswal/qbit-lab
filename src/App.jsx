import { useState } from 'react';

import HomePage from './components/HomePage.jsx';
import IntroductionPage from './components/IntroductionPage.jsx';
import SingleQubitFidelityPage from './components/SingleQubitFidelityPage.jsx';
import TwoQubitFidelityPage from './components/TwoQubitFidelityPage.jsx';

const pages = [
  { id: 'introduction', title: 'Introduction to quantum effects', icon: '01', component: IntroductionPage },
  { id: 'single-qubit-fidelity', title: 'Single-qubit fidelity', icon: '02', component: SingleQubitFidelityPage },
  { id: 'two-qubit-fidelity', title: 'Two-qubit fidelity', icon: '03', component: TwoQubitFidelityPage },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState('home');
  const isHome = selectedId === 'home';
  const ActivePage = isHome ? HomePage : pages.find((page) => page.id === selectedId).component;

  return (
    <div className="app">
      <header className="header">
        <button
          className="menu-toggle"
          aria-label={sidebarOpen ? 'Collapse articles menu' : 'Expand articles menu'}
          aria-expanded={sidebarOpen}
          aria-controls="articles-sidebar"
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <button className="brand-home" onClick={() => setSelectedId('home')} aria-label="Quantum Effects home">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <h1>Quantum Effects</h1>
        </button>
        <button className="home-link" aria-current={isHome ? 'page' : undefined} onClick={() => setSelectedId('home')}>Home</button>
      </header>

      <div className={`layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <aside id="articles-sidebar" className="sidebar" aria-label="Article navigation">
          <div className="sidebar-heading" hidden={!sidebarOpen}>
          <p className="eyebrow">Explore</p>
          <h2 id="articles-title">Articles</h2>
          <p className="sidebar-description">Choose an article to read.</p>
          </div>
          <nav aria-label="Quantum articles">
            {pages.map((article) => (
              <button
                key={article.id}
                className="article-button"
                aria-current={selectedId === article.id ? 'page' : undefined}
                aria-label={article.title}
                title={article.title}
                onClick={() => setSelectedId(article.id)}
              ><span className="article-icon" aria-hidden="true">{article.icon}</span><span className="article-label" hidden={!sidebarOpen}>{article.title}</span></button>
            ))}
          </nav>
        </aside>

        <main className={isHome ? 'home-main' : 'workspace'} aria-labelledby="article-title">
          {!isHome && <span className="workspace-label">Quantum library</span>}
          <ActivePage key={selectedId} onNavigate={setSelectedId} />
          {!isHome && <span className="workspace-footer">Quantum Effects / Articles</span>}
        </main>
      </div>
    </div>
  );
}
