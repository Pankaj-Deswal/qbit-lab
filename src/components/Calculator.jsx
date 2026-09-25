import { useId, useState } from 'react';

export default function Calculator({ fields, calculate, description, actionLabel = 'Calculate result', interpretation }) {
  const id = useId();
  const initialValues = () => Object.fromEntries(fields.map(field => [field.name, String(field.initial)]));
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  function submit(event) {
    event.preventDefault();
    try {
      if (Object.values(values).some(value => value.trim() === '')) throw new Error('Please fill in every input.');
      setResult(calculate(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]))));
      setError('');
    } catch (error) { setError(error.message); setResult(null); }
  }
  return <section className="calculator" aria-label="Interactive calculation">
    <div className="calculator-inputs"><p className="eyebrow">01 / Inputs</p><h3>Set your parameters</h3><p id={`${id}-description`}>{description}</p>
      <form onSubmit={submit} aria-describedby={`${id}-description`}>
        <div className="input-grid">{fields.map(field => {
          const unit = field.label.match(/\((ns|μs|GHz|MHz)\)$/)?.[1];
          const label = unit ? field.label.replace(/\s*\((ns|μs|GHz|MHz)\)$/, '') : field.label;
          return <label key={field.name}>{label}<span className="input-with-unit"><input type="number" aria-label={field.label} required step={field.step ?? 'any'} min={field.min} max={field.max} value={values[field.name]}
            onChange={event => { setValues({ ...values, [field.name]: event.target.value }); setResult(null); setError(''); }} />{unit && <span aria-hidden="true">{unit}</span>}</span></label>;
        })}</div>
        <div className="calculator-actions"><button className="primary-button" type="submit">{actionLabel} <span aria-hidden="true">→</span></button><button className="reset-button" type="button" onClick={() => { setValues(initialValues()); setResult(null); setError(''); }}>Reset</button></div>
        {error && <p className="input-error" role="alert">{error}</p>}
      </form>
    </div>
    <div className={`calculator-output ${result !== null ? 'has-result' : ''}`}>
      <p className="eyebrow">02 / Result</p>
      {result !== null ? <><div className="calculation-result">{result}</div>{interpretation && <div className="result-interpretation"><h4>What does this mean?</h4><p>{interpretation}</p></div>}</> : <div className="result-placeholder"><h3>Your result will appear here</h3><p>Set your inputs and select “{actionLabel}” to explore the calculation.</p></div>}
      <span className="sr-only" role="status">{result !== null ? 'Calculation complete. Results are available.' : ''}</span>
    </div>
  </section>;
}
