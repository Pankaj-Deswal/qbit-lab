/** Gate time tg is in nanoseconds; relaxation and Ramsey decay times are in microseconds. Returns the supplied formula without clamping. */
export function two_qubit_F(tg: number, T1a: number, T1b: number, T2a: number, T2b: number): number {
  if (!Number.isFinite(tg) || tg < 0 || ![T1a, T1b, T2a, T2b].every(time => Number.isFinite(time) && time > 0)) {
    throw new Error('Gate time must be nonnegative; all relaxation and Ramsey decay times must be positive finite times.');
  }
  const gamma1a = 1 / T1a;
  const gamma_phia = 1 / T2a - gamma1a / 2;
  const gamma1b = 1 / T1b;
  const gamma_phib = 1 / T2b - gamma1b / 2;
  const tgMicroseconds = tg / 1000;
  const inf = (2 / 5) * tgMicroseconds * (gamma1a + gamma_phia + gamma1b + gamma_phib);
  const F = 1 - inf;
  if (!Number.isFinite(F)) throw new Error('These times exceed the numerical range. Please use less extreme values.');
  return F;
}

/** Sweep 10–100 ns inclusive at 1 ns intervals. Coherence times are in μs. */
export function twoQubitInfidelityRange(T1a: number, T1b: number, T2a: number, T2b: number): { gateTime: number; infidelity: number }[] {
  return Array.from({ length: 91 }, (_, index) => {
    const gateTime = 10 + index;
    const infidelity = 1 - two_qubit_F(gateTime, T1a, T1b, T2a, T2b);
    if (!Number.isFinite(infidelity) || infidelity <= 0) {
      throw new Error('These coherence times produce infidelity outside the positive numerical range needed for the log plot. Please use less extreme values.');
    }
    return { gateTime, infidelity };
  });
}
