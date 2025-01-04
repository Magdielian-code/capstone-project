import React, { useState, useEffect } from 'react';
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult';

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleConvert();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fromAmount, fromCurrency, toCurrency]);

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

        <AmountInput
          value={fromAmount}
          currency={fromCurrency}
          onChange={setFromAmount}
          onCurrencyChange={setFromCurrency}
          currencyConfig={currencyConfig}
          loading={false}
        />
        
        <ConversionResult
          amount={toAmount}
          currency={toCurrency}
          onCurrencyChange={setToCurrency}
          currencyConfig={currencyConfig}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CurrencySelector;