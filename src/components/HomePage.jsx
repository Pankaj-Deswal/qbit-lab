import QuantumComputerGraphic from './QuantumComputerGraphic.jsx';

export default function HomePage({ onNavigate }) {
  return <div className="home-page">
    <div className="home-hero">
      <div className="home-copy"><p className="eyebrow">Welcome to the quantum world</p>
        <h2 id="article-title">Small particles.<br/><span>Extraordinary possibilities.</span></h2>
        <p>Explore the ideas behind quantum computing. Read an article, change the inputs, and see the mathematics come to life.</p>
        <button className="primary-button" onClick={() => onNavigate('introduction')}>Start exploring <span aria-hidden="true">→</span></button>
      </div>
      <QuantumComputerGraphic />
    </div>
    <div className="home-cards">
      {[
        ['01', 'introduction', 'Build your foundation', 'Discover qubits and the size of their state space.'],
        ['02', 'single-qubit-fidelity', 'Single-qubit fidelity', 'Calculate fidelity from gate, relaxation, and Ramsey decay times.'],
        ['03', 'two-qubit-fidelity', 'Two-qubit fidelity', 'Calculate fidelity using the coherence times of both qubits.'],
        ['04', 'transmon', 'Transmon parameters', 'Calculate frequency and anharmonicity from EJ and EC.'],
      ].map(([number, id, title, description]) => <button className="home-card" key={id} onClick={() => onNavigate(id)}><span className="eyebrow">{number} / Explore</span><h3>{title}</h3><p>{description}</p><span aria-hidden="true">↗</span></button>)}
    </div>
    <section className="creators" aria-labelledby="creators-title">
      <p className="eyebrow">The people behind Quantum Effects</p>
      <h2 id="creators-title">Meet the creators</h2>
      <div className="creator-grid">
        <article className="creator-card"><h3>Anuj Aggarwal</h3><p>Co-creator</p><a href="https://www.linkedin.com/in/anuj-aggarwal-365b6886/" target="_blank" rel="noopener noreferrer">Anuj on LinkedIn <span aria-hidden="true">↗</span></a></article>
        <article className="creator-card"><h3>Pankaj Kumar Deswal</h3><p>Co-creator</p><a href="https://www.linkedin.com/in/pankaj-kumar-deswal/" target="_blank" rel="noopener noreferrer">Pankaj on LinkedIn <span aria-hidden="true">↗</span></a></article>
      </div>
    </section>
  </div>;
}
