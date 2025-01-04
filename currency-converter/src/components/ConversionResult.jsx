import React from 'react';
import AmountInput from './AmountInput';

const ConversionResult = ({ 
  amount, 
  currency, 
  onCurrencyChange, 
  currencyConfig,
  loading,
  layoutId 
}) => (
  <AmountInput
    value={amount}
    currency={currency}
    onChange={() => {}}
    onCurrencyChange={onCurrencyChange}
    currencyConfig={currencyConfig}
    loading={loading}
    readOnly={true}
    layoutId={layoutId}
  />
);

export default ConversionResult;