import useCurrency from '../hooks/use-currency';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <label className="currency-selector">
      <span className="sr-only">Currency</span>
      <select
        aria-label="Currency"
        value={currency}
        onChange={(event) => setCurrency(event.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <style jsx>{`
        .currency-selector {
          display: inline-flex;
          align-items: center;
        }
        select {
          padding: 0 17px 0 0;
          border: 0;
          background: transparent;
          color: var(--quantum-muted);
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          font-weight: 500;
        }
        select:focus {
          outline: 2px solid rgba(96, 123, 150, .35);
          outline-offset: 3px;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </label>
  );
}
