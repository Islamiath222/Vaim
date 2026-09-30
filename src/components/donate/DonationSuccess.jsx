import React from 'react';
import { Link } from 'react-router-dom';

/**
 * DonationSuccess
 * @param {object} transactionDetails  - PayPal capture details (one-time) OR { subscriptionID } (monthly)
 * @param {boolean} isSubscription     - true when the completed transaction was a monthly subscription
 * @param {function} onReset           - callback to return to the donation form
 */
export default function DonationSuccess({ transactionDetails, isSubscription = false, onReset }) {
  // One-time: payer name from PayPal capture object
  // Subscription: we don't receive a full payer object, fall back gracefully
  const donorName =
    transactionDetails?.payer?.name?.given_name ||
    transactionDetails?.subscriber?.name?.given_name ||
    'Generous Supporter';

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-green-100 max-w-md w-full mx-auto">
      {/* Top accent bar */}
      <div
        className="h-1 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, #0F5132, #D4AF37)' }}
      />

      <div className="flex flex-col items-center gap-5 py-6 text-center">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isSubscription ? 'bg-green-50' : 'bg-green-50'
          }`}
        >
          {isSubscription ? (
            /* Recurring / calendar icon for subscriptions */
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 014-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 01-4 4H3" />
            </svg>
          ) : (
            /* Checkmark for one-time */
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="#15803d" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-green-900">
          {isSubscription
            ? 'Welcome, Monthly Supporter! 🙏'
            : 'Thank You for Your Generosity'}
        </h2>

        {/* Body message */}
        <p className="text-sm text-gray-600 leading-relaxed max-w-[320px]">
          {isSubscription ? (
            <>
              Thank you for becoming a <strong className="text-green-800">monthly supporter</strong> of
              Victoria Alabaster International Women Ministry. Your recurring support helps us continue
              our mission, empower women, and transform communities month after month.
            </>
          ) : (
            <>
              Your donation has been successfully received. Thank you for supporting Victoria Alabaster
              International Women Ministry and helping us continue making a difference in communities
              and lives.
            </>
          )}
        </p>

        {/* Subscription ID (for reference, subscription only) */}
        {isSubscription && transactionDetails?.subscriptionID && (
          <p className="text-[11px] text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 w-full break-all">
            Subscription ID:{' '}
            <span className="font-mono text-gray-600">{transactionDetails.subscriptionID}</span>
          </p>
        )}

        {/* Actions */}
        <div className="w-full flex flex-col gap-3 mt-4">
          <button
            onClick={onReset}
            className="w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors text-sm font-semibold shadow-sm"
          >
            {isSubscription ? 'Back to Donation Page' : 'Make Another Donation'}
          </button>

          <Link
            to="/"
            className="w-full px-6 py-3 border border-green-200 text-green-700 rounded-xl hover:bg-green-50 transition-colors text-sm font-semibold text-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
