import test from 'node:test';
import assert from 'node:assert/strict';
import { basisStates } from './introduction.js';
import { single_qubit_F } from './singleQubitFidelity.ts';
import { two_qubit_F } from './twoQubitFidelity.ts';

test('basis state counts preserve large integer precision and reject invalid counts', () => {
  assert.equal(basisStates({ qubits: 3 }), '8');
  assert.equal(basisStates({ qubits: 100 }), '1,267,650,600,228,229,401,496,703,205,376');
  for (const qubits of [0, 1.5, 101, NaN]) assert.throws(() => basisStates({ qubits }));
});
test('single-qubit fidelity matches the supplied Python formula', () => {
  assert.ok(Math.abs(single_qubit_F(3000, 100, 80) - 0.9825) < 1e-14);
  assert.equal(single_qubit_F(0, 100, 80), 1);
  assert.ok(single_qubit_F(1000000, 1, 1) < 0); // Preserve the original unclamped result.
  assert.equal(single_qubit_F(3000, 100, 80), single_qubit_F(3000000, 100000, 80000));
});
test('two-qubit fidelity matches Python and is symmetric under exchanging qubits', () => {
  assert.ok(Math.abs(two_qubit_F(2000, 100, 200, 80, 160) - 0.979) < 1e-14);
  assert.equal(two_qubit_F(0, 100, 200, 80, 160), 1);
  assert.equal(two_qubit_F(2000, 100, 200, 80, 160), two_qubit_F(2000, 200, 100, 160, 80));
});
test('fidelity scripts reject invalid times in every parameter', () => {
  for (const [fn, valid] of [[single_qubit_F, [1, 100, 80]], [two_qubit_F, [1, 100, 200, 80, 160]]]) {
    valid.forEach((_, index) => {
      for (const invalid of [-1, NaN, Infinity, ...(index ? [0] : [])]) {
        const values = [...valid]; values[index] = invalid;
        assert.throws(() => fn(...values));
      }
    });
  }
});

test('nanosecond gate times convert to microseconds for both fidelity scripts', () => {
  assert.ok(Math.abs(single_qubit_F(50, 100, 80) - 0.9997083333333333) < 1e-14);
  assert.ok(Math.abs(two_qubit_F(200, 100, 120, 80, 90) - 0.9973777777777778) < 1e-14);
});
