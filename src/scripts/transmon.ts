// Didier et al., arXiv:1706.06566v2, Eqs. (6), (B1), (B2).
// https://arxiv.org/pdf/1706.06566v2 — Appendix B, p. 13.
// Each entry is [numerator, power-of-two denominator], ordered by ξ^0 … ξ^24.
// Decimal strings preserve the printed numerators; evaluation uses JS double precision.
const frequencyCoefficients: readonly (readonly [string, number])[] = [
  ['1', 0], // ξ^0
  ['1', 2], // ξ^1
  ['21', 7], // ξ^2
  ['19', 7], // ξ^3
  ['5319', 15], // ξ^4
  ['6649', 15], // ξ^5
  ['1180581', 22], // ξ^6
  ['446287', 20], // ξ^7
  ['1489138635', 31], // ξ^8
  ['648381403', 29], // ξ^9
  ['614557854099', 38], // ξ^10
  ['75265839129', 34], // ξ^11
  ['637411859250147', 46], // ξ^12
  ['86690561488017', 42], // ξ^13
  ['405768570324517701', 53], // ξ^14
  ['15191635582891041', 47], // ξ^15
  ['2497063196283456607731', 63], // ξ^16
  ['102281923716042917215', 57], // ξ^17
  ['2292687293949773041433127', 70], // ξ^18
  ['25544408245062216574759', 62], // ξ^19
  ['4971071120163260007203175705', 78], // ξ^20
  ['59956026877695226936825271', 70], // ξ^21
  ['6299936888270974385982624367587', 85], // ξ^22
  ['20465345194746565030172477629', 75], // ξ^23
  ['36984324599399309412347250837528543', 94], // ξ^24
];

const anharmonicityCoefficients: readonly (readonly [string, number])[] = [
  ['1', 0], // ξ^0
  ['9', 4], // ξ^1
  ['81', 7], // ξ^2
  ['3645', 12], // ξ^3
  ['46899', 15], // ξ^4
  ['1329129', 19], // ξ^5
  ['20321361', 22], // ξ^6
  ['2648273373', 28], // ξ^7
  ['45579861135', 31], // ξ^8
  ['1647988255539', 35], // ξ^9
  ['31160327412879', 38], // ξ^10
  ['2457206583272505', 43], // ξ^11
  ['50387904068904927', 46], // ξ^12
  ['2145673984043982897', 50], // ξ^13
  ['47368663010124907041', 53], // ξ^14
  ['17329540083222030375645', 60], // ξ^15
  ['410048712835835979799431', 63], // ξ^16
  ['20066784213453521778111375', 67], // ξ^17
  ['507447585299180759749453827', 70], // ξ^18
  ['53019019946496461235728807475', 75], // ξ^19
  ['1429754157181172012054040903645', 78], // ξ^20
  ['79571741391885949104006842758911', 82], // ξ^21
  ['2283773190022904454409743892590327', 85], // ξ^22
  ['540565733415401595950277192471356985', 91], // ξ^23
  ['16479511149218202447739080120870460083', 94], // ξ^24
];

function polynomial(coefficients: readonly (readonly [string, number])[], xi: number): number {
  return coefficients.reduceRight((value, [numerator, exponent]) => value * xi + Number(numerator) / 2 ** exponent, 0);
}

export interface TransmonResult {
  xi: number;
  energyRatio: number;
  frequencyGHz: number;
  anharmonicityMHz: number;
  signedAnharmonicityMHz: number;
  warning: string | null;
}

/** EJ/h in GHz; EC/h in MHz. Outputs are ordinary frequencies, not angular frequencies. */
export function calculateTransmon(EJGHz: number, ECMHz: number): TransmonResult {
  if (![EJGHz, ECMHz].every(value => Number.isFinite(value) && value > 0)) {
    throw new Error('EJ/h and EC/h must be positive finite numbers.');
  }
  const ECGHz = ECMHz / 1000;
  const energyRatio = EJGHz / ECGHz;
  const xi = Math.sqrt(2 / energyRatio); // Eq. (6)
  const frequencyGHz = Math.sqrt(8 * ECGHz * EJGHz) - ECGHz * polynomial(frequencyCoefficients, xi); // B1
  const anharmonicityMHz = ECMHz * polynomial(anharmonicityCoefficients, xi); // B2, positive η
  if (![energyRatio, xi, frequencyGHz, anharmonicityMHz].every(Number.isFinite) || xi <= 0 || frequencyGHz <= 0 || anharmonicityMHz <= 0) {
    throw new Error('The expansion does not give a valid transmon result for these inputs. Use positive energies with EJ much larger than EC.');
  }
  return {
    xi, energyRatio, frequencyGHz, anharmonicityMHz,
    signedAnharmonicityMHz: -anharmonicityMHz,
    warning: energyRatio < 50 ? 'EJ/EC is below 50 (ξ > 0.2). This high-order perturbative expansion may be inaccurate outside the small-ξ transmon regime.' : null,
  };
}
