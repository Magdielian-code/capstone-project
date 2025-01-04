import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const CurrencySelector = () => {
  const [fromAmount, setFromAmount] = useState('2.00');
  const [toAmount, setToAmount] = useState('0.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('GBP');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencyConfig = {
    USD: { flag: '🇺🇸', name: 'US Dollar' },
    EUR: { flag: '🇪🇺', name: 'Euro' },
    GBP: { flag: '🇬🇧', name: 'British Pound' },
    NGN: { flag: '🇳🇬', name: 'Nigerian Naira' },
    JPY: { flag: '🇯🇵', name: 'Japanese Yen' },
    AUD: { flag: '🇦🇺', name: 'Australian Dollar' },
    CAD: { flag: '🇨🇦', name: 'Canadian Dollar' },
    CHF: { flag: '🇨🇭', name: 'Swiss Franc' },
    CNY: { flag: '🇨🇳', name: 'Chinese Yuan' },
    NZD: { flag: '🇳🇿', name: 'New Zealand Dollar' },
    INR: { flag: '🇮🇳', name: 'Indian Rupee' },
    BRL: { flag: '🇧🇷', name: 'Brazilian Real' },
    ZAR: { flag: '🇿🇦', name: 'South African Rand' },
    SGD: { flag: '🇸🇬', name: 'Singapore Dollar' },
    HKD: { flag: '🇭🇰', name: 'Hong Kong Dollar' },
    SEK: { flag: '🇸🇪', name: 'Swedish Krona' },
  };

  const handleConvert = async () => {
    if (!fromAmount || isNaN(fromAmount)) {
      setToAmount('0.00');
      return;
    }

    if (fromCurrency === toCurrency) {
      setToAmount(parseFloat(fromAmount).toFixed(2));
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${fromAmount}&from=${fromCurrency}&to=${toCurrency}`
      );
      if (!response.ok) throw new Error('Conversion failed');
      const data = await response.json();
      setToAmount(data.rates[toCurrency].toFixed(2));
    } catch (error) {
      setError('Failed to convert currency. Please try again.');
      console.error("Error converting:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce function to prevent too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleConvert();
    }, 500); // Wait 500ms after the last change before converting

    return () => clearTimeout(timeoutId);
  }, [fromAmount, fromCurrency, toCurrency]);

  const CurrencyInput = ({ value, currency, onChange, onCurrencyChange, readOnly = false }) => (
    <div className="relative flex items-center w-full p-2 mb-3 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-xl w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full">
          {currencyConfig[currency].flag}
        </span>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="appearance-none bg-transparent focus:outline-none pr-6 font-medium"
        >
          {Object.entries(currencyConfig).map(([code, { flag, name }]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative flex items-center w-full">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-right focus:outline-none"
          min="0"
          step="0.01"
          readOnly={readOnly}
          placeholder="0.00"
        />
        {loading && <Loader2 className="w-4 h-4 animate-spin absolute right-2" />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen max-w-md mx-auto mt-20 p-5">
      <h2 className="mb-6 text-2xl font-semibold text-center">
        Currency Converter
      </h2>

      <div className="p-6 bg-white rounded-lg shadow-sm">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <CurrencyInput
          value={fromAmount}
          currency={fromCurrency}
          onChange={setFromAmount}
          onCurrencyChange={setFromCurrency}
        />
        
        <CurrencyInput
          value={toAmount}
          currency={toCurrency}
          onChange={setToAmount}
          onCurrencyChange={setToCurrency}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default CurrencySelector;