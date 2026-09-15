import { useState } from 'react';
import InfidelityPlot from './InfidelityPlot.jsx';
import ArticleLayout from './ArticleLayout.jsx';
import Calculator from './Calculator.jsx';
import { single_qubit_F, singleQubitInfidelityRange } from '../scripts/singleQubitFidelity.ts';

export default function SingleQubitFidelityPage() {
  const [mode, setMode] = useState('single');
  return <ArticleLayout title="Single-qubit fidelity">
    <p>Calculate decoherence-limited fidelity from the gate time, relaxation time, and Ramsey decay time using your supplied formula.</p>
    <p>For each qubit, γ₁ = 1 / T1 and γφ = 1 / T2 − γ₁ / 2.</p>
    <p>{'F = 1 − ((tg / 1000) / 3) × (γ₁ + γφ)'}</p>
    <fieldset className="calculation-mode">
      <legend>Gate time mode</legend>
      <label><input type="radio" name="gate-time-mode" checked={mode === 'single'} onChange={() => setMode('single')} /> Single gate time</label>
      <label><input type="radio" name="gate-time-mode" checked={mode === 'range'} onChange={() => setMode('range')} /> Gate time range (10–100 ns)</label>
    </fieldset>
    {mode === 'single' ? <Calculator key="single" description="Enter gate time in nanoseconds (ns), and relaxation and Ramsey decay times in microseconds (μs). Gate time can be zero; relaxation and Ramsey decay times must be greater than zero."
      fields={[
        { name: 'tg', label: 'Gate time tg (ns)', initial: 50, min: 0 },
        { name: 'T1', label: 'Relaxation time T1 (μs)', initial: 100, min: 0 },
        { name: 'T2', label: 'Ramsey decay time T2 (μs)', initial: 80, min: 0 },
      ]}
      calculate={values => {
        const F = single_qubit_F(values.tg, values.T1, values.T2);
        return `Decoherence-limited fidelity (F): ${F.toPrecision(10)} · Fidelity: ${(F * 100).toFixed(6)}%`;
      }} /> : <Calculator key="range"
        description="Calculate infidelity across gate times from 10 to 100 ns. Enter relaxation and Ramsey decay times in microseconds (μs)."
        fields={[
          { name: 'T1', label: 'Relaxation time T1 (μs)', initial: 100, min: 0 },
          { name: 'T2', label: 'Ramsey decay time T2 (μs)', initial: 80, min: 0 },
        ]}
        calculate={values => <InfidelityPlot points={singleQubitInfidelityRange(values.T1, values.T2)} />}
      />}
    <p className="source-note">The result follows the supplied formula directly and is not clamped to the range 0–1.</p>
  </ArticleLayout>;
}
