import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import DonationAmountSelector from './DonationAmountSelector';
import PayPalDonationButton from './PayPalDonationButton';
import PayPalSubscriptionButton from './PayPalSubscriptionButton';
import DonationSuccess from './DonationSuccess';

// ─── Environment ─────────────────────────────────────────────────────────────
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';
const PAYPAL_PLAN_ID   = import.meta.env.VITE_PAYPAL_PLAN_ID   || '';

const isPayPalConfigured =
  Boolean(PAYPAL_CLIENT_ID) &&
  PAYPAL_CLIENT_ID !== 'test_paypal_client_id_placeholder' &&
  PAYPAL_CLIENT_ID !== 'test';

const isPlanConfigured = isPayPalConfigured && Boolean(PAYPAL_PLAN_ID);

// ─── Per-mode SDK options ─────────────────────────────────────────────────────
// IMPORTANT: These two configs require DIFFERENT PayPal SDK scripts.
// PayPal does not allow mixing intent=capture and intent=subscription in the
// same script load. We solve this with usePayPalScriptReducer / resetOptions,
// which tells the single PayPalScriptProvider to unload and reload the SDK
// with the correct options for the currently-selected mode.
const SDK_OPTIONS = {
  'one-time': {
    'client-id': PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
  },
  monthly: {
    'client-id': PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'subscription',
    vault: 'true',
  },
};

// ─── Inner form (must live inside PayPalScriptProvider to use the hook) ───────
function DonationFormInner({
  donationType,
  setDonationType,
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  transactionDetails,
  setTransactionDetails,
  errorMsg,
  setErrorMsg,
  isSubscription,
  setIsSubscription,
  onReset,
}) {
  // usePayPalScriptReducer gives us:
  //   isPending  — true while the SDK script is loading/reloading
  //   dispatch   — lets us call resetOptions to swap SDK config
  const [{ isPending, isResolved, isRejected }, dispatch] = usePayPalScriptReducer();

  // Track first render so we don't dispatch resetOptions on mount
  // (the initial options already match 'one-time')
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // User switched modes — reload the PayPal SDK with the correct intent
    dispatch({
      type: 'resetOptions',
      value: SDK_OPTIONS[donationType],
    });
  }, [donationType]); // eslint-disable-line react-hooks/exhaustive-deps

  const finalAmount = selectedAmount === 'custom' ? customAmount : selectedAmount;

  const handleOneTimeSuccess = (details) => {
    setIsSubscription(false);
    setTransactionDetails(details);
    setErrorMsg('');
  };

  const handleSubscriptionSuccess = (details) => {
    setIsSubscription(true);
    setTransactionDetails(details);
    setErrorMsg('');
  };

  const handleError = (err) => {
    console.error('PayPal Error:', err);
    setErrorMsg(
      'We could not process your payment at this time. Please try again or contact us for help.'
    );
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (transactionDetails) {
    return (
      <DonationSuccess
        transactionDetails={transactionDetails}
        isSubscription={isSubscription}
        onReset={onReset}
      />
    );
  }

  // ── Form card ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-green-100 max-w-md w-full mx-auto">
      {/* Top accent bar */}
      <div
        className="h-1 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, #0F5132, #D4AF37)' }}
      />

      {/* Card header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-900 mb-2">Make a Difference Today</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Your generosity empowers communities and spreads hope.
        </p>
      </div>

      {/* ── One-Time / Monthly Toggle ─────────────────────────────────────── */}
      <div className="flex rounded-xl border border-green-200 overflow-hidden mb-6 bg-green-50/40">
        <button
          id="toggle-one-time"
          type="button"
          onClick={() => { setDonationType('one-time'); setErrorMsg(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all duration-200 ${
            donationType === 'one-time'
              ? 'bg-green-700 text-white shadow-inner'
              : 'text-green-800 hover:bg-green-100'
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24"
            fill={donationType === 'one-time' ? 'white' : '#15803d'}>
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          One-Time
        </button>

        <button
          id="toggle-monthly"
          type="button"
          onClick={() => { setDonationType('monthly'); setErrorMsg(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all duration-200 ${
            donationType === 'monthly'
              ? 'bg-green-700 text-white shadow-inner'
              : 'text-green-800 hover:bg-green-100'
          }`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke={donationType === 'monthly' ? 'white' : '#15803d'}
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/>
            <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
          </svg>
          Monthly
        </button>
      </div>

      {/* Monthly info badge */}
      {donationType === 'monthly' && (
        <div className="mb-5 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <span className="text-lg mt-0.5">♻️</span>
          <div>
            <p className="text-xs font-semibold text-green-800 mb-0.5">Recurring Monthly Donation</p>
            <p className="text-[11px] text-green-700 leading-relaxed">
              You'll be billed automatically each month. Cancel anytime through your PayPal account.
              Your consistent support makes our mission possible.
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {errorMsg && (
        <div className="mb-5 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#ef4444" strokeWidth="2" className="mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-red-600 text-xs leading-relaxed">{errorMsg}</p>
        </div>
      )}

      {/* SDK loading spinner — shown while PayPal script loads/reloads */}
      {isPending && (
        <div className="flex items-center justify-center gap-2 py-10 text-green-700 text-sm font-medium">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round"
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
          Loading PayPal…
        </div>
      )}

      {/* SDK failed to load */}
      {isRejected && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-xs text-red-700 leading-relaxed">
            PayPal could not be loaded. Please check your internet connection and refresh the page.
          </p>
        </div>
      )}

      {/* ── ONE-TIME donation buttons (shown only when SDK loaded for capture) ── */}
      {isResolved && donationType === 'one-time' && (
        <>
          <DonationAmountSelector
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
          />
          <div className="pt-2 border-t border-gray-100">
            <PayPalDonationButton
              amount={finalAmount}
              onSuccess={handleOneTimeSuccess}
              onError={handleError}
            />
          </div>
        </>
      )}

      {/* ── MONTHLY subscription button (shown only when SDK loaded for subscriptions) ── */}
      {isResolved && donationType === 'monthly' && (
        isPlanConfigured ? (
          <PayPalSubscriptionButton
            onSuccess={handleSubscriptionSuccess}
            onError={handleError}
          />
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center mt-2">
            <h3 className="text-sm font-bold text-yellow-800 mb-2">Plan ID Not Configured</h3>
            <p className="text-xs text-yellow-700 leading-relaxed">
              Add{' '}
              <code className="bg-yellow-100 px-1 py-0.5 rounded">VITE_PAYPAL_PLAN_ID</code> to your{' '}
              <code className="bg-yellow-100 px-1 py-0.5 rounded">.env</code> file to enable monthly
              donations.
            </p>
          </div>
        )
      )}

      {/* Footer trust badge */}
      <div className="mt-6 text-center">
        <p className="text-[11px] text-gray-400 font-medium">
          Secure payment processing by{' '}
          <strong className="text-gray-600">PayPal</strong>
        </p>
      </div>
    </div>
  );
}

// ─── Outer shell — single PayPalScriptProvider for both modes ────────────────
export default function DonationForm() {
  const [donationType,       setDonationType]       = useState('one-time');
  const [selectedAmount,     setSelectedAmount]     = useState(50);
  const [customAmount,       setCustomAmount]       = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [errorMsg,           setErrorMsg]           = useState('');
  const [isSubscription,     setIsSubscription]     = useState(false);

  const handleReset = useCallback(() => {
    setSelectedAmount(50);
    setCustomAmount('');
    setTransactionDetails(null);
    setErrorMsg('');
    setIsSubscription(false);
  }, []);

  // PayPal not configured at all — render a simple warning without mounting the SDK
  if (!isPayPalConfigured) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-green-100 max-w-md w-full mx-auto">
        <div className="h-1 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, #0F5132, #D4AF37)' }} />
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-center">
          <svg className="w-8 h-8 text-yellow-500 mx-auto mb-3" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-sm font-bold text-yellow-800 mb-2">Configuration Required</h3>
          <p className="text-xs text-yellow-700 leading-relaxed">
            The PayPal Client ID is missing or using a placeholder. Please add your valid Client ID
            to the <code className="bg-yellow-100 px-1 py-0.5 rounded">.env</code> file.
          </p>
        </div>
      </div>
    );
  }

  return (
    /*
     * Single PayPalScriptProvider for the entire donation form.
     *
     * WHY a single provider?
     * PayPal injects its SDK as a <script> tag into window. If two providers
     * with different `intent` values are mounted (even conditionally), the second
     * one silently skips loading because window.paypal already exists — causing
     * the subscription buttons to never render.
     *
     * Instead, we start with the one-time SDK options and let DonationFormInner
     * call dispatch({ type: 'resetOptions', value: ... }) via usePayPalScriptReducer
     * to hot-swap the SDK when the user switches to Monthly mode.
     */
    <PayPalScriptProvider options={SDK_OPTIONS['one-time']}>
      <DonationFormInner
        donationType={donationType}
        setDonationType={setDonationType}
        selectedAmount={selectedAmount}
        setSelectedAmount={setSelectedAmount}
        customAmount={customAmount}
        setCustomAmount={setCustomAmount}
        transactionDetails={transactionDetails}
        setTransactionDetails={setTransactionDetails}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        isSubscription={isSubscription}
        setIsSubscription={setIsSubscription}
        onReset={handleReset}
      />
    </PayPalScriptProvider>
  );
}
