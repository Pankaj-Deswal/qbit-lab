import FidelityResult from './FidelityResult.jsx';
import { useState } from 'react';
import InfidelityPlot from './InfidelityPlot.jsx';
import ArticleLayout from './ArticleLayout.jsx';
import Calculator from './Calculator.jsx';
import { two_qubit_F, twoQubitInfidelityRange } from '../scripts/twoQubitFidelity.ts';

export default function TwoQubitFidelityPage() {
  const [mode, setMode] = useState('single');
  return <ArticleLayout title="Two-qubit fidelity">
    <p>Calculate decoherence-limited fidelity from the gate time, relaxation time, and Ramsey decay time using your supplied formula.</p>
    <details className="model-details"><summary>Formula and model details</summary>
    <p>For each qubit, γ₁ = 1 / T1 and γφ = 1 / T2 − γ₁ / 2.</p>
    <p>{'F = 1 − (2 × (tg / 1000) / 5) × (γ₁ₐ + γφₐ + γ₁ᵦ + γφᵦ)'}</p>
    </details>
    <fieldset className="calculation-mode">
      <legend>Gate time mode</legend>
      <label><input type="radio" name="gate-time-mode" checked={mode === 'single'} onChange={() => setMode('single')} /> Single gate time</label>
      <label><input type="radio" name="gate-time-mode" checked={mode === 'range'} onChange={() => setMode('range')} /> Gate time range (10–100 ns)</label>
    </fieldset>
    {mode === 'single' ? <Calculator key="single" actionLabel="Calculate fidelity" interpretation="This estimate includes relaxation and dephasing during the gate. Other error sources are not included. Infidelity is the difference between 1 and the calculated fidelity." description="Enter gate time in nanoseconds (ns), and relaxation and Ramsey decay times in microseconds (μs). Gate time can be zero; relaxation and Ramsey decay times must be greater than zero."
      fields={[
        { name: 'tg', label: 'Gate time tg (ns)', initial: 200, min: 0 },
        { name: 'T1a', label: 'Qubit A relaxation time T1a (μs)', initial: 100, min: 0 },
        { name: 'T1b', label: 'Qubit B relaxation time T1b (μs)', initial: 120, min: 0 },
        { name: 'T2a', label: 'Qubit A Ramsey decay time T2a (μs)', initial: 80, min: 0 },
        { name: 'T2b', label: 'Qubit B Ramsey decay time T2b (μs)', initial: 90, min: 0 },
      ]}
      calculate={values => {
        const F = two_qubit_F(values.tg, values.T1a, values.T1b, values.T2a, values.T2b);
        return <FidelityResult fidelity={F} />;
      }} /> : <Calculator key="range" actionLabel="Plot infidelity" interpretation="The curve shows how calculated infidelity changes with gate duration while coherence times stay fixed. Move across the plot to inspect values, or add a measured point for comparison."
        description="Calculate infidelity across gate times from 10 to 100 ns. Enter relaxation and Ramsey decay times for both qubits in microseconds (μs)."
        fields={[
          { name: 'T1a', label: 'Qubit A relaxation time T1a (μs)', initial: 100, min: 0 },
          { name: 'T1b', label: 'Qubit B relaxation time T1b (μs)', initial: 120, min: 0 },
          { name: 'T2a', label: 'Qubit A Ramsey decay time T2a (μs)', initial: 80, min: 0 },
          { name: 'T2b', label: 'Qubit B Ramsey decay time T2b (μs)', initial: 90, min: 0 },
        ]}
        calculate={values => <InfidelityPlot points={twoQubitInfidelityRange(values.T1a, values.T1b, values.T2a, values.T2b)} />}
      />}
    <p className="source-note">The result follows the supplied formula directly and is not clamped to the range 0–1.</p>
  </ArticleLayout>;
}
