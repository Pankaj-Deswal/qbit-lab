import ArticleLayout from './ArticleLayout.jsx';
import Calculator from './Calculator.jsx';
import { single_qubit_F } from '../scripts/singleQubitFidelity.ts';

export default function SingleQubitFidelityPage() {
  return <ArticleLayout title="Single-qubit fidelity">
    <p>Calculate decoherence-limited fidelity from the gate time, relaxation time, and Ramsey decay time using your supplied formula.</p>
    <p>For each qubit, γ₁ = 1 / T1 and γφ = 1 / T2 − γ₁ / 2.</p>
    <p>{'F = 1 − ((tg / 1000) / 3) × (γ₁ + γφ)'}</p>
    <Calculator description="Enter gate time in nanoseconds (ns), and relaxation and Ramsey decay times in microseconds (μs). Gate time can be zero; relaxation and Ramsey decay times must be greater than zero."
      fields={[
        { name: 'tg', label: 'Gate time tg (ns)', initial: 50, min: 0 },
        { name: 'T1', label: 'Relaxation time T1 (μs)', initial: 100, min: 0 },
        { name: 'T2', label: 'Ramsey decay time T2 (μs)', initial: 80, min: 0 },
      ]}
      calculate={values => {
        const F = single_qubit_F(values.tg, values.T1, values.T2);
        return `Decoherence-limited fidelity (F): ${F.toPrecision(10)} · Fidelity: ${(F * 100).toFixed(6)}%`;
      }} />
    <p className="source-note">The result follows the supplied formula directly and is not clamped to the range 0–1.</p>
  </ArticleLayout>;
}
