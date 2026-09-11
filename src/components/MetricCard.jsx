import './MetricCard.css';

export default function MetricCard({ value, label, unit, className = '', delay = 0 }) {
  return (
    <div className={`metric-card glass ${className}`} style={{ '--delay': `${delay}ms` }}>
      <span className="metric-card__label t-label">{label}</span>
      <div className="metric-card__value-row">
        <span className="metric-card__value">{value}</span>
        {unit && <span className="metric-card__unit">{unit}</span>}
      </div>
    </div>
  );
}
