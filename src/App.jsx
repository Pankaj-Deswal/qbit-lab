import { useEffect, useRef, useState } from 'react';

import HomePage from './components/HomePage.jsx';
import IntroductionPage from './components/IntroductionPage.jsx';
import SingleQubitFidelityPage from './components/SingleQubitFidelityPage.jsx';
import TwoQubitFidelityPage from './components/TwoQubitFidelityPage.jsx';

import TransmonPage from './components/TransmonPage.jsx';

const basePath = import.meta.env.BASE_URL;
const pagePath = id => id === 'home' ? basePath : `${basePath}articles/${id}`;

const pages = [
  { id: 'introduction', title: 'Introduction to quantum effects', icon: '01', component: IntroductionPage },
  { id: 'single-qubit-fidelity', title: 'Single-qubit fidelity', icon: '02', component: SingleQubitFidelityPage },
  { id: 'two-qubit-fidelity', title: 'Two-qubit fidelity', icon: '03', component: TwoQubitFidelityPage },
  { id: 'transmon', title: 'Transmon frequency & anharmonicity', icon: '04', component: TransmonPage },
];

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const isHome = pathname === basePath || pathname === basePath.slice(0, -1);
  const page = pages.find(page => pathname === pagePath(page.id) || pathname === `${pagePath(page.id)}/`);
  const ActivePage = isHome ? HomePage : page?.component;

  useEffect(() => {
    function onPopState() { setPathname(window.location.pathname); setMenuOpen(false); }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.title = `${isHome ? 'Home' : page?.title || 'Page not found'} | Quantum Effects`;
  }, [pathname, isHome, page]);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOutside(event) {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeEscape(event) {
      if (event.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus(); }
    }
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeEscape);
    };
  }, [menuOpen]);

  function navigate(id) {
    const nextPath = pagePath(id);
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
      setPathname(nextPath);
      window.scrollTo(0, 0);
    }
    setMenuOpen(false);
  }
  function linkClick(event, id) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(id);
  }

  return (
    <div className="app">
      <header className="header">
        <a href={basePath} className="brand-home" onClick={event => linkClick(event, 'home')} aria-label="Quantum Effects home">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <h1>Quantum Effects</h1>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href={basePath} className="home-link" aria-current={isHome ? 'page' : undefined} onClick={event => linkClick(event, 'home')}>Home</a>
          <div className="articles-dropdown" ref={menuRef} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
          }}>
            <button className="articles-toggle" ref={toggleRef} aria-expanded={menuOpen} aria-controls="articles-menu" onClick={() => setMenuOpen(open => !open)}>
              Articles <span aria-hidden="true">▾</span>
            </button>
            <div id="articles-menu" className="articles-menu" hidden={!menuOpen}>
              {pages.map(article => <a key={article.id} href={pagePath(article.id)} aria-current={page?.id === article.id ? 'page' : undefined} onClick={event => linkClick(event, article.id)}>{article.title}</a>)}
            </div>
          </div>
        </nav>
      </header>
      <div className="page-layout">
        <main className={isHome ? 'home-main' : 'workspace'} aria-labelledby="article-title">
          {!isHome && <span className="workspace-label">Quantum library</span>}
          {ActivePage ? <ActivePage key={pathname} onNavigate={navigate} /> : <article className="article"><h2 id="article-title">Page not found</h2><p>Choose an article above or <a href={basePath} onClick={event => linkClick(event, 'home')}>return home</a>.</p></article>}
          {!isHome && <span className="workspace-footer">Quantum Effects / Articles</span>}
        </main>
      </div>
    </div>
  );
}
