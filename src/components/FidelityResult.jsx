export default function FidelityResult({ fidelity }) {
  return <div className="fidelity-result"><p className="result-label">Decoherence-limited fidelity</p><strong className="result-number">{(fidelity * 100).toFixed(6)}<span>%</span></strong><dl><div><dt>Fidelity F</dt><dd>{fidelity.toPrecision(10)}</dd></div><div><dt>Infidelity 1 − F</dt><dd>{(1 - fidelity).toExponential(6)}</dd></div></dl></div>;
}
