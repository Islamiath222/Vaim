import React, { useState, useCallback } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import DonationAmountSelector from './DonationAmountSelector';
import PayPalDonationButton from './PayPalDonationButton';
import DonationSuccess from './DonationSuccess';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';
// NOTE: @paypal/react-paypal-js does NOT accept an "environment" option.
// Live vs. Sandbox is determined automatically by the Client ID itself.
// A Live Client ID (from developer.paypal.com with dashboard set to LIVE) = real payments.

const isPayPalConfigured = PAYPAL_CLIENT_ID && PAYPAL_CLIENT_ID !== 'test_paypal_client_id_placeholder' && PAYPAL_CLIENT_ID !== 'test';

export default function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState(50); // Default to $50
  const [customAmount, setCustomAmount] = useState('');
  
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const finalAmount = selectedAmount === 'custom' ? customAmount : selectedAmount;

  const handleReset = useCallback(() => {
    setSelectedAmount(50);
    setCustomAmount('');
    setTransactionDetails(null);
    setErrorMsg('');
  }, []);

  const handleSuccess = (details) => {
    setTransactionDetails(details);
    setErrorMsg('');
  };

  const handleError = (err) => {
    console.error('PayPal Error:', err);
    setErrorMsg('We could not process your donation at this time. Please try again later.');
  };

  if (transactionDetails) {
    return <DonationSuccess transactionDetails={transactionDetails} onReset={handleReset} />;
  }

  const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-green-100 max-w-md w-full mx-auto">
      {/* Card header accent bar */}
      <div className="h-1 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, #0F5132, #D4AF37)' }} />

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-green-900 mb-3">Make a Difference Today</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Your generosity helps us continue our mission, support communities, and positively impact lives.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#ef4444" strokeWidth="2" className="mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-red-600 text-xs leading-relaxed">{errorMsg}</p>
        </div>
      )}

      {isPayPalConfigured ? (
        <PayPalScriptProvider options={initialOptions}>
          <DonationAmountSelector 
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
          />

          <div className="pt-2 border-t border-gray-100">
            <PayPalDonationButton 
              amount={finalAmount} 
              onSuccess={handleSuccess} 
              onError={handleError} 
            />
          </div>
        </PayPalScriptProvider>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center">
          <svg className="w-8 h-8 text-yellow-500 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-sm font-bold text-yellow-800 mb-2">Configuration Required</h3>
          <p className="text-xs text-yellow-700 leading-relaxed">
            The PayPal Client ID is currently missing or using a placeholder. 
            Real payments are disabled in development mode. 
            <br className="my-1"/>
            Please add your valid Sandbox or Live Client ID to the <code className="bg-yellow-100 px-1 py-0.5 rounded">.env</code> file.
          </p>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-[11px] text-gray-400 font-medium">
          Secure donation processing by <strong className="text-gray-600">PayPal</strong>
        </p>
      </div>
    </div>
  );
}
