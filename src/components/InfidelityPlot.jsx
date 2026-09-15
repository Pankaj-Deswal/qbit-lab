import { useState } from 'react';

export default function InfidelityPlot({ points }) {
  const [scale, setScale] = useState('log');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [measurementEnabled, setMeasurementEnabled] = useState(false);
  const [measuredTime, setMeasuredTime] = useState('50');
  const [measuredFidelity, setMeasuredFidelity] = useState('');
  const [measurement, setMeasurement] = useState(null);
  const [measurementError, setMeasurementError] = useState('');
  function addMeasurement(event) {
    event.preventDefault();
    const gateTime = Number(measuredTime);
    const fidelityPercent = Number(measuredFidelity);
    const fidelity = fidelityPercent / 100;
    if (!measuredTime.trim() || !measuredFidelity.trim() || !Number.isFinite(gateTime) || gateTime < 10 || gateTime > 100 || !Number.isFinite(fidelity) || fidelity < 0 || fidelity > 1) {
      setMeasurementError('Enter a gate time from 10–100 ns and fidelity between 0 and 100%.');
      return;
    }
    const infidelity = 1 - fidelity;
    setMeasurement({ gateTime, fidelity, infidelity });
    setMeasurementError('');
    if (infidelity === 0) setScale('linear');
  }
  const measuredPoint = measurementEnabled ? measurement : null;
  const zeroMeasurement = measuredPoint?.infidelity === 0;
  const left = 86, top = 24, width = 530, height = 280;
  const min = points[0].infidelity;
  const max = points.at(-1).infidelity;
  const plotMin = measuredPoint && measuredPoint.infidelity > 0 ? Math.min(min, measuredPoint.infidelity) : min;
  const plotMax = measuredPoint ? Math.max(max, measuredPoint.infidelity) : max;
  const lower = scale === 'log' ? Math.log10(plotMin) - 0.08 : 0;
  const upper = scale === 'log' ? Math.log10(plotMax) + 0.08 : plotMax * 1.1;
  const x = time => left + (time - 10) / 90 * width;
  const y = value => top + height * (1 - ((scale === 'log' ? Math.log10(value) : value) - lower) / (upper - lower));
  const ticks = Array.from({ length: 5 }, (_, index) => {
    const value = lower + (upper - lower) * index / 4;
    return scale === 'log' ? 10 ** value : value;
  });
  const selected = points[selectedIndex];
  return <section className="infidelity-plot" aria-label="Gate time versus infidelity">
    <div className="plot-heading"><h3>Gate time vs infidelity</h3>
      <label>Y-axis <select value={scale} onChange={event => setScale(event.target.value)}><option value="log" disabled={zeroMeasurement}>Logarithmic</option><option value="linear">Linear</option></select></label>
    </div>
    <p>10–100 ns · 1 ns steps · Infidelity = 1 − F</p>
    <div className="plot-legend" aria-label="Plot legend">
      <span><span className="legend-line" aria-hidden="true" /> Calculated infidelity</span>
      {measuredPoint && <span><span className="legend-star" aria-hidden="true">★</span> Measured data</span>}
    </div>
    <svg viewBox="0 0 650 365" role="img" aria-label={`Gate time versus infidelity, ${scale === 'log' ? 'logarithmic' : 'linear'} Y-axis. Infidelity rises from ${min.toExponential(3)} at 10 ns to ${max.toExponential(3)} at 100 ns.`}>
      {ticks.map((value, index) => <g key={index}><line x1={left} x2={left + width} y1={y(value)} y2={y(value)} stroke="#41485d"/><text x={left - 10} y={y(value) + 4} textAnchor="end">{value.toExponential(1)}</text></g>)}
      {[10, 25, 40, 55, 70, 85, 100].map(value => <g key={value}><line x1={x(value)} x2={x(value)} y1={top + height} y2={top + height + 5} stroke="#a8b0c3"/><text x={x(value)} y={top + height + 23} textAnchor="middle">{value}</text></g>)}
      <path d={`M${left} ${top}V${top + height}H${left + width}`} fill="none" stroke="#a8b0c3"/>
      <polyline points={points.map(point => `${x(point.gateTime)},${y(point.infidelity)}`).join(' ')} fill="none" stroke="#c4aff0" strokeWidth="3"/>
      <circle cx={x(selected.gateTime)} cy={y(selected.infidelity)} r="5" fill="#fff" stroke="#c4aff0" strokeWidth="2"/>
      {measuredPoint && <g transform={`translate(${x(measuredPoint.gateTime)} ${y(measuredPoint.infidelity)})`}>
        <title>{`Measured data: ${measuredPoint.gateTime} ns, fidelity ${measuredPoint.fidelity * 100}%, infidelity ${measuredPoint.infidelity.toExponential(6)}`}</title>
        <polygon points="0,-10 2.94,-4.05 9.51,-3.09 4.76,1.55 5.88,8.09 0,5 -5.88,8.09 -4.76,1.55 -9.51,-3.09 -2.94,-4.05" fill="#ff4d5e" stroke="#ffd2d7" strokeWidth="1" />
      </g>}
      <text x={left + width / 2} y="354" textAnchor="middle">Gate time (ns)</text>
      <text transform="translate(16 164) rotate(-90)" textAnchor="middle">Infidelity (1 − F)</text>
    </svg>
    <label className="plot-inspector">Inspect gate time: {selected.gateTime} ns
      <input type="range" min="0" max={points.length - 1} step="1" value={selectedIndex} onChange={event => setSelectedIndex(Number(event.target.value))} />
    </label>
    <output aria-live="polite">Infidelity at {selected.gateTime} ns: {selected.infidelity.toExponential(6)}</output>
    <div className="measured-data">
      <label><input type="checkbox" checked={measurementEnabled} onChange={event => { setMeasurementEnabled(event.target.checked); setMeasurementError(''); }} /> Add measured fidelity (optional)</label>
      {measurementEnabled && <form onSubmit={addMeasurement}>
        <div className="input-grid">
          <label>Measured gate time (ns)<input type="number" min="10" max="100" step="any" required value={measuredTime} onChange={event => { setMeasuredTime(event.target.value); setMeasurement(null); }} /></label>
          <label>Measured fidelity (%)<input type="number" min="0" max="100" step="any" required placeholder="e.g. 99.9" value={measuredFidelity} onChange={event => { setMeasuredFidelity(event.target.value); setMeasurement(null); }} /></label>
        </div>
        <button className="primary-button" type="submit">Plot measured data</button>
        <p className="measurement-feedback" role="status">{measurementError || (measuredPoint ? `Measured data: ${measuredPoint.gateTime} ns · Fidelity: ${measuredPoint.fidelity * 100}% · Infidelity: ${measuredPoint.infidelity.toExponential(6)}` : 'Enter fidelity as a percentage, for example 99.9.')}</p>
        {zeroMeasurement && <p>Fidelity 100% gives zero infidelity, so the plot uses a linear Y-axis. Zero cannot be displayed on a logarithmic axis.</p>}
      </form>}
    </div>
  </section>;
}
