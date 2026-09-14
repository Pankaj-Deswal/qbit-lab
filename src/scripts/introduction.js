export function basisStates({ qubits }) {
  if (!Number.isInteger(qubits) || qubits < 1 || qubits > 100) throw new Error('Enter a whole number of qubits between 1 and 100.');
  return (2n ** BigInt(qubits)).toLocaleString('en-US');
}
