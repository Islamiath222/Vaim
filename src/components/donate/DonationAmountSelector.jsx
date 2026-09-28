import React from 'react';

const PRESET_AMOUNTS = [25, 50, 100, 250];

export default function DonationAmountSelector({ 
  selectedAmount, 
  setSelectedAmount, 
  customAmount, 
  setCustomAmount 
}) {
  const isCustomSelected = selectedAmount === 'custom';

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-green-900 mb-3">
        Select Donation Amount (USD)
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {PRESET_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => {
              setSelectedAmount(amount);
              setCustomAmount('');
            }}
            className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
              selectedAmount === amount
                ? 'bg-green-700 border-green-700 text-white shadow-md'
                : 'bg-white border-green-200 text-green-800 hover:border-green-400 hover:bg-green-50'
            }`}
          >
            ${amount}
          </button>
        ))}
        
        <button
          type="button"
          onClick={() => setSelectedAmount('custom')}
          className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
            isCustomSelected
              ? 'bg-green-700 border-green-700 text-white shadow-md'
              : 'bg-white border-green-200 text-green-800 hover:border-green-400 hover:bg-green-50'
          }`}
        >
          Other Amount
        </button>
      </div>

      {/* Custom Amount Input Field */}
      <div 
        className={`transition-all duration-300 overflow-hidden ${
          isCustomSelected ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <label htmlFor="custom-amount" className="sr-only">Enter Custom Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 font-semibold text-sm select-none">
            $
          </span>
          <input
            id="custom-amount"
            type="number"
            min="1"
            step="1"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-3.5 bg-green-50/40 border border-green-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-300/40 focus:border-green-400 transition-all"
          />
        </div>
        {isCustomSelected && customAmount && parseFloat(customAmount) <= 0 && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 5v6m0 2v2"/></svg>
            Please enter an amount greater than 0
          </p>
        )}
      </div>
    </div>
  );
}
