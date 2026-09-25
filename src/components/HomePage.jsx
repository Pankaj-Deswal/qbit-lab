import qubitImage from '../assets/qubit-bloch-sphere-themed.png';

const tools = [
  ['single-qubit-fidelity', 'Single-qubit fidelity', 'Estimate the effect of gate time and coherence on one qubit.', '1Q'],
  ['two-qubit-fidelity', 'Two-qubit fidelity', 'Explore gate fidelity using the coherence times of both qubits.', '2Q'],
  ['transmon', 'Transmon parameters', 'Find frequency and anharmonicity from Josephson and charging energies.', 'ƒ'],
];
export default function HomePage({ onNavigate }) {
  return <div className="home-page">
    <div className="home-hero">
      <div className="home-copy"><p className="eyebrow">Concepts, calculations, understanding</p>
        <h2 id="article-title">QubitLab</h2>
        <p className="brand-tagline">Explore quantum computing through interactive models and calculations.</p>
        <p>Build your intuition, explore qubit fidelity, and calculate transmon parameters. Change an input and see what it means.</p>
        <div className="hero-actions"><button className="primary-button" onClick={() => onNavigate('home', 'learn')}>Start learning <span aria-hidden="true">→</span></button><a className="secondary-button" href="#calculators">Explore calculators</a></div>
      </div>
      <figure className="qubit-hero"><img src={qubitImage} width="1644" height="957" alt="Qubit: the basic unit of quantum information. A Bloch sphere shows the states zero and one at its poles, with a state vector psi described by angles theta and phi." /></figure>
    </div>
    <section id="learn" className="learning-section" aria-labelledby="learn-title"><p className="eyebrow">Start here</p><h2 id="learn-title">Build your foundation</h2>
      <button className="learning-card" onClick={() => onNavigate('introduction')}><span className="tool-icon" aria-hidden="true">ψ</span><span><strong>Quantum fundamentals</strong><span>Qubits, states, and the size of a quantum state space.</span></span><span className="card-action">Read introduction →</span></button>
    </section>
    <section id="calculators" className="learning-section" aria-labelledby="calculators-title"><p className="eyebrow">Put the ideas to work</p><h2 id="calculators-title">Interactive calculators</h2><p className="section-description">Choose a tool. Enter your parameters. Explore the result.</p>
      <div className="home-cards">{tools.map(([id, title, description, icon]) => <button className="home-card" key={id} onClick={() => onNavigate(id)}><span className="tool-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p><span className="card-action">Open calculator →</span></button>)}</div>
    </section>
    <footer id="about" className="creators" aria-labelledby="creators-title"><div><p className="eyebrow">About this project</p><h2 id="creators-title">QubitLab</h2><p>Interactive tools for exploring quantum concepts, created by Anuj Aggarwal and Pankaj Kumar Deswal.</p></div><div className="creator-links"><a href="https://www.linkedin.com/in/anuj-aggarwal-365b6886/" target="_blank" rel="noopener noreferrer">Anuj Aggarwal · LinkedIn ↗</a><a href="https://www.linkedin.com/in/pankaj-kumar-deswal/" target="_blank" rel="noopener noreferrer">Pankaj Kumar Deswal · LinkedIn ↗</a></div></footer>
  </div>;
}
