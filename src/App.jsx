import { useEffect, useState } from 'react';
import { pagePath as routePath, resolvePage } from './routes.js';

import HomePage from './components/HomePage.jsx';
import IntroductionPage from './components/IntroductionPage.jsx';
import SingleQubitFidelityPage from './components/SingleQubitFidelityPage.jsx';
import TwoQubitFidelityPage from './components/TwoQubitFidelityPage.jsx';

import TransmonPage from './components/TransmonPage.jsx';

const basePath = import.meta.env.BASE_URL;
const pagePath = id => routePath(basePath, id);

const pages = [
  { id: 'introduction', title: 'Introduction to quantum effects', icon: '01', component: IntroductionPage },
  { id: 'single-qubit-fidelity', title: 'Single-qubit fidelity', icon: '02', component: SingleQubitFidelityPage },
  { id: 'two-qubit-fidelity', title: 'Two-qubit fidelity', icon: '03', component: TwoQubitFidelityPage },
  { id: 'transmon', title: 'Transmon frequency & anharmonicity', icon: '04', component: TransmonPage },
];

export default function App() {
  const [location, setLocation] = useState(() => ({ pathname: window.location.pathname, hash: window.location.hash }));
  const { pathname, hash } = location;
  const isHome = pathname === basePath || pathname === basePath.slice(0, -1);
  const route = resolvePage(basePath, pathname);
  const page = pages.find(page => page.id === route?.id);
  const ActivePage = isHome ? HomePage : page?.component;

  useEffect(() => {
    function onPopState() { setLocation({ pathname: window.location.pathname, hash: window.location.hash }); }
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onPopState);
    return () => { window.removeEventListener('popstate', onPopState); window.removeEventListener('hashchange', onPopState); };
  }, []);

  useEffect(() => {
    document.title = `${isHome ? 'Home' : page?.title || 'Page not found'} | QubitLab`;
  }, [pathname, isHome, page]);

  // Run after React has mounted the destination page, including direct hash URLs.
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);

  function navigate(id, section = '') {
    const nextPath = pagePath(id);
    const nextHash = section ? `#${section}` : '';
    if (window.location.pathname + window.location.hash !== nextPath + nextHash) {
      window.history.pushState(null, '', nextPath + nextHash);
    }
    setLocation({ pathname: nextPath, hash: nextHash });
    if (!section) window.scrollTo(0, 0);
  }
  function linkClick(event, id, section = '') {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(id, section);
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="header">
        <a href={basePath} className="brand-home" onClick={event => linkClick(event, 'home')} aria-label="QubitLab home">
          <span className="brand-mark" aria-hidden="true">Q</span>
          <h1>QubitLab</h1>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href={basePath} className="home-link" aria-current={isHome && !hash ? 'page' : undefined} onClick={event => linkClick(event, 'home')}>Home</a>
          <a className="section-nav-link" href={`${basePath}#learn`} aria-current={isHome && hash === '#learn' ? 'location' : undefined} onClick={event => linkClick(event, 'home', 'learn')}>Learn</a>
          <a className="section-nav-link" href={`${basePath}#calculators`} aria-current={isHome && hash === '#calculators' ? 'location' : undefined} onClick={event => linkClick(event, 'home', 'calculators')}>Calculators</a>
          <a className="section-nav-link" href={`${basePath}#about`} aria-current={isHome && hash === '#about' ? 'location' : undefined} onClick={event => linkClick(event, 'home', 'about')}>About</a>
        </nav>
      </header>
      <div className="page-layout">
        <main id="main-content" className={isHome ? 'home-main' : 'workspace'} aria-labelledby="article-title">
          {!isHome && <nav className="breadcrumbs" aria-label="Breadcrumb"><a href={basePath} onClick={event => linkClick(event, 'home')}>Home</a><span aria-hidden="true">/</span><span>{route?.section === 'learn' ? 'Learn' : 'Calculators'}</span><span aria-hidden="true">/</span><span aria-current="page">{page?.title || 'Page not found'}</span></nav>}
          {ActivePage ? <ActivePage key={pathname} onNavigate={navigate} /> : <article className="article"><h2 id="article-title">Page not found</h2><p>Choose a calculator from Home or <a href={basePath} onClick={event => linkClick(event, 'home')}>return home</a>.</p></article>}
          {!isHome && <span className="workspace-footer">QubitLab / {route?.section === 'learn' ? 'Learn' : 'Calculators'}</span>}
        </main>
      </div>
    </div>
  );
}
