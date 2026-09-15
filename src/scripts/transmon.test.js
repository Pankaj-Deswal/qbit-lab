import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTransmon } from './transmon.ts';

test('B1/B2 agree with independent 30-state oscillator diagonalization at xi=0.2', () => {
  // NumPy eigh: H = 4 EC N² - EJ cos(phi), phi=sqrt(xi)(a+a†),
  // N=i(a†-a)/(2sqrt(xi)); matrix cosine evaluated via spectral decomposition.
  const result = calculateTransmon(10, 200);
  assert.equal(result.xi, 0.2);
  assert.equal(result.energyRatio, 50);
  assert.ok(Math.abs(result.frequencyGHz - 3.7883798218198566) < 1e-9);
  assert.ok(Math.abs(result.anharmonicityMHz - 229.714422832748) < 1e-5);
  assert.equal(result.signedAnharmonicityMHz, -result.anharmonicityMHz);
  assert.equal(result.warning, null);
});

test('consistent energy scaling preserves xi and scales both frequencies', () => {
  const a = calculateTransmon(10, 200);
  const b = calculateTransmon(20, 400);
  assert.equal(a.xi, b.xi);
  assert.equal(b.frequencyGHz, 2 * a.frequencyGHz);
  assert.equal(b.anharmonicityMHz, 2 * a.anharmonicityMHz);
});

test('invalid inputs are rejected and larger xi is flagged', () => {
  for (const invalid of [0, -1, NaN, Infinity]) {
    assert.throws(() => calculateTransmon(invalid, 200));
    assert.throws(() => calculateTransmon(10, invalid));
  }
  assert.ok(calculateTransmon(9, 200).warning);
  assert.throws(() => calculateTransmon(0.01, 200));
});
