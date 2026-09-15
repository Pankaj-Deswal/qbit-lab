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
  </div>;
}
