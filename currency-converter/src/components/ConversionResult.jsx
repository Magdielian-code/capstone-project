import React from 'react';
import AmountInput from './AmountInput';

const ConversionResult = ({ 
  amount, 
  currency, 
  onCurrencyChange, 
  currencyConfig,
  loading 
}) => (
  <AmountInput
    value={amount}
    currency={currency}
    onChange={() => {}} // Empty function since it's read-only
    onCurrencyChange={onCurrencyChange}
    currencyConfig={currencyConfig}
    loading={loading}
    readOnly={true}
  />
);

export default ConversionResult;