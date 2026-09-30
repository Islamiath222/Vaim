import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PLAN_ID = import.meta.env.VITE_PAYPAL_PLAN_ID || '';

export default function PayPalSubscriptionButton({ onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Guard: plan ID must be present
  if (!PLAN_ID) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center mt-4">
        <p className="text-xs text-yellow-700 leading-relaxed">
          Monthly subscription is not yet configured.{' '}
          <code className="bg-yellow-100 px-1 py-0.5 rounded">VITE_PAYPAL_PLAN_ID</code> is missing from{' '}
          <code className="bg-yellow-100 px-1 py-0.5 rounded">.env</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 relative z-0">
      {/* Processing overlay */}
      {isProcessing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 rounded-xl">
          <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                strokeLinecap="round" />
            </svg>
            Setting up your subscription…
          </div>
        </div>
      )}

      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'subscribe',
        }}
        createSubscription={(_data, actions) => {
          return actions.subscription.create({ plan_id: PLAN_ID });
        }}
        onApprove={(data) => {
          // Subscription approved — data.subscriptionID is the new subscription ID
          setIsProcessing(true);
          onSuccess({
            subscriptionID: data.subscriptionID,
            orderID: data.orderID,
          });
          setIsProcessing(false);
        }}
        onCancel={() => {
          setIsProcessing(false);
        }}
        onError={(err) => {
          console.error('PayPal Subscription Error:', err);
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
