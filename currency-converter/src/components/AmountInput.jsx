import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AmountInput = ({ 
  value, 
  currency, 
  onChange, 
  onCurrencyChange, 
  currencyConfig,
  loading = false,
  readOnly = false,
  layoutId = '' // For coordinated animations
}) => (
  <motion.div
    layoutId={layoutId}
    className="relative flex items-center w-full p-2 mb-3 bg-white border border-gray-200 rounded-lg"
  >
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
  </motion.div>
);

export default AmountInput;