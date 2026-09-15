import ArticleLayout from './ArticleLayout.jsx';
import Calculator from './Calculator.jsx';
import { calculateTransmon } from '../scripts/transmon.ts';

export default function TransmonPage() {
  return <ArticleLayout title="Transmon frequency & anharmonicity">
    <p>Calculate the qubit transition frequency and anharmonicity from Josephson energy EJ and charging energy EC.</p>
    <p>Equation 6 defines ξ = √(2EC/EJ). The calculator evaluates all terms in the Appendix B expansions: B1 for frequency and B2 for anharmonicity, including the ξ²⁴ terms inside their brackets.</p>
    <Calculator description="Enter energies divided by Planck’s constant h: EJ/h in GHz and EC/h in MHz. Results use ordinary frequency units, not radians per second."
      fields={[
        { name: 'EJGHz', label: 'Josephson energy EJ/h (GHz)', initial: 10, min: 0 },
        { name: 'ECMHz', label: 'Charging energy EC/h (MHz)', initial: 200, min: 0 },
      ]}
      calculate={values => {
        const result = calculateTransmon(values.EJGHz, values.ECMHz);
        return <div>
          <dl className="transmon-results">
            <div><dt>Qubit frequency f₀₁ = ω/(2π)</dt><dd>{result.frequencyGHz.toFixed(6)} GHz</dd></div>
            <div><dt>Anharmonicity η/(2π) = f₀₁ − f₁₂ (paper convention)</dt><dd>{result.anharmonicityMHz.toFixed(6)} MHz</dd></div>
            <div><dt>Signed anharmonicity α = f₁₂ − f₀₁</dt><dd>{result.signedAnharmonicityMHz.toFixed(6)} MHz</dd></div>
            <div><dt>Expansion parameter ξ</dt><dd>{result.xi.toPrecision(6)}</dd></div>
            <div><dt>Energy ratio EJ/EC</dt><dd>{result.energyRatio.toPrecision(6)}</dd></div>
          </dl>
          {result.warning && <p>{result.warning}</p>}
        </div>;
      }} />
    <p className="source-note">Perturbative estimates for the transmon regime (EJ ≫ EC). Displayed digits do not imply guaranteed accuracy. Source: <a href="https://arxiv.org/pdf/1706.06566v2" target="_blank" rel="noreferrer">Didier et al., Analytical modeling of parametrically-modulated transmon qubits — Eqs. 6, B1 and B2</a>.</p>
  </ArticleLayout>;
}
