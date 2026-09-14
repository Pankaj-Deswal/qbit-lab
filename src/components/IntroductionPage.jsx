import ArticleLayout from './ArticleLayout.jsx';
import Calculator from './Calculator.jsx';
import { basisStates } from '../scripts/introduction.js';

export default function IntroductionPage() {
  return <ArticleLayout title="Introduction to quantum effects">
    <p>Quantum physics describes matter and light at very small scales, where probability, measurement, and discrete energy levels play central roles.</p>
    <p>A register of n qubits has 2ⁿ computational basis states. This describes its state space; a single measurement yields just one bit string.</p>
    <Calculator description="Explore how the number of basis states grows with the number of qubits."
      fields={[{ name: 'qubits', label: 'Number of qubits', initial: 3, min: 1, max: 100, step: 1 }]}
      calculate={values => `${basisStates(values)} computational basis states`} />
  </ArticleLayout>;
}
