/** Gate time tg is in nanoseconds; relaxation and Ramsey decay times are in microseconds. Returns the supplied formula without clamping. */
export function single_qubit_F(tg: number, T1: number, T2: number): number {
  if (!Number.isFinite(tg) || tg < 0 || ![T1, T2].every(time => Number.isFinite(time) && time > 0)) {
    throw new Error('Gate time must be nonnegative; T1 and T2 must be positive finite times.');
  }
  const gamma1 = 1 / T1;
  const gamma_phi = 1 / T2 - gamma1 / 2;
  const tgMicroseconds = tg / 1000;
  const inf = (1 / 3) * tgMicroseconds * (gamma1 + gamma_phi);
  const F = 1 - inf;
  if (!Number.isFinite(F)) throw new Error('These times exceed the numerical range. Please use less extreme values.');
  return F;
}
