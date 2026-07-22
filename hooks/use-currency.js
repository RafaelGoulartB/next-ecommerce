import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Next.js can evaluate this module in separate server bundles (the custom App
// and the current page). Keep the context shared between those module copies.
const CURRENCY_CONTEXT_KEY = Symbol.for('quantum.currency.context');
const globalScope = globalThis;
const CurrencyContext =
  globalScope[CURRENCY_CONTEXT_KEY] ||
  (globalScope[CURRENCY_CONTEXT_KEY] = createContext(null));

// Product and order values are stored in USD. This rate is only used for display.
const USD_TO_EUR_RATE = 0.92;
const CURRENCY_STORAGE_KEY = 'quantum-currency';

const currencyConfig = {
  USD: {
    locale: 'en-US',
    rate: 1,
  },
  EUR: {
    locale: 'en-US',
    rate: USD_TO_EUR_RATE,
  },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState('USD');

  useEffect(() => {
    const storedCurrency = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (storedCurrency && currencyConfig[storedCurrency]) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }, [currency]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key && event.key !== CURRENCY_STORAGE_KEY) return;
      if (event.newValue && currencyConfig[event.newValue]) {
        setCurrencyState(event.newValue);
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  function setCurrency(nextCurrency) {
    if (currencyConfig[nextCurrency]) setCurrencyState(nextCurrency);
  }

  const value = useMemo(() => {
    const config = currencyConfig[currency];

    return {
      currency,
      setCurrency,
      formatPrice(valueToFormat) {
        const valueInUsd = Number(valueToFormat || 0);
        const convertedValue = valueInUsd * config.rate;

        return new Intl.NumberFormat(config.locale, {
          style: 'currency',
          currency,
        }).format(convertedValue);
      },
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export default function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }

  return context;
}
