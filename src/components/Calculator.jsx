import { useState } from 'react';

export default function Calculator({ fields, calculate, description }) {
  const [values, setValues] = useState(Object.fromEntries(fields.map(field => [field.name, String(field.initial)])));
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    try {
      if (Object.values(values).some(value => value.trim() === '')) throw new Error('Please fill in every input.');
      setResult(calculate(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]))));
      setError('');
    } catch (error) { setError(error.message); setResult(''); }
  }
  return <section className="calculator" aria-label="Interactive calculation">
    <h3>Try it yourself</h3><p>{description}</p>
    <form onSubmit={submit}>
      <div className="input-grid">{fields.map(field => <label key={field.name}>{field.label}
        <input type="number" required step={field.step ?? 'any'} min={field.min} max={field.max} value={values[field.name]}
          onChange={event => { setValues({ ...values, [field.name]: event.target.value }); setResult(''); setError(''); }} />
      </label>)}</div>
      <button className="primary-button" type="submit">Calculate result <span aria-hidden="true">→</span></button>
    </form>
    <div role="status" className={result || error ? 'calculation-result' : ''}>{error || result}</div>
  </section>;
}
