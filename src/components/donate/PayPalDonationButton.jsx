import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

export default function PayPalDonationButton({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Validate amount
  const isValidAmount = amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;

  if (!isValidAmount) {
    return (
      <div className="py-3.5 px-4 text-center text-sm font-semibold text-gray-500 bg-gray-100 rounded-xl border border-gray-200">
        Please select or enter a valid donation amount to continue.
      </div>
    );
  }

  return (
    <div className="mt-6 relative z-0">
      {isProcessing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 rounded-xl">
          <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
            </svg>
            Processing with PayPal...
          </div>
        </div>
      )}
      
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'donate',
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: amount.toString()
                    }
                  }
                },
                description: "Donation to Victoria's Alabaster Ministry",
                items: [
                  {
                    name: "Donation",
                    quantity: "1",
                    unit_amount: {
                      currency_code: 'USD',
                      value: amount.toString()
                    },
                    category: 'DONATION'
                  }
                ]
              },
            ],
            intent: 'CAPTURE'
          });
        }}
        onApprove={(data, actions) => {
          setIsProcessing(true);
          return actions.order.capture().then((details) => {
            setIsProcessing(false);
            onSuccess(details);
          }).catch(err => {
            setIsProcessing(false);
            onError(err);
          });
        }}
        onCancel={() => {
          setIsProcessing(false);
          // Optional: handle cancel quietly
        }}
        onError={(err) => {
          setIsProcessing(false);
          onError(err);
        }}
        onClick={() => {
          setIsProcessing(false);
        }}
      />
    </div>
  );
}
