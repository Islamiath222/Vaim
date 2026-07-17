import { useState, useCallback } from 'react';
import PaystackPop from '@paystack/inline-js';

/* ─── Card brand SVGs ───────────────────────────────────────────────────── */
function MastercardIcon() {
  return (
    <svg viewBox="0 0 38 24" width="36" height="22" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
      <circle cx="15" cy="12" r="7" fill="#EB001B" />
      <circle cx="23" cy="12" r="7" fill="#F79E1B" />
      <path d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z" fill="#FF5F00" />
    </svg>
  );
}
function VisaIcon() {
  return (
    <svg viewBox="0 0 38 24" width="36" height="22" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#1A1F71" />
      <text x="5" y="17" fontSize="12" fontWeight="bold" fill="#fff" fontFamily="Arial">VISA</text>
    </svg>
  );
}
function VerveIcon() {
  return (
    <svg viewBox="0 0 38 24" width="36" height="22" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
      <text x="4" y="17" fontSize="11" fontWeight="bold" fill="#C8102E" fontFamily="Arial">Verve</text>
    </svg>
  );
}
function PaystackBadgeIcon() {
  return (
    <svg viewBox="0 0 38 24" width="36" height="22" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="24" rx="3" fill="#00B8D9" />
      <rect x="6"  y="5"  width="4" height="14" rx="1.5" fill="#fff" />
      <rect x="12" y="8"  width="4" height="11" rx="1.5" fill="#fff" />
      <rect x="18" y="11" width="4" height="8"  rx="1.5" fill="#fff" />
    </svg>
  );
}

/* ─── Currency config ────────────────────────────────────────────────────── */
const CURRENCIES = [
  { code: 'NGN', symbol: '₦', label: 'NGN' },
  { code: 'USD', symbol: '$', label: 'USD' },
];

/* ─── Fieldset ────────────────────────────────────────────────────────────── */
function Field({ id, label, required, error, children }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-semibold text-green-900 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 5v6m0 2v2"/></svg>
        {error}
      </p>}
    </div>
  );
}

const inputCls = (hasErr) =>
  `w-full px-4 py-3.5 bg-green-50/40 border rounded-xl text-gray-800 placeholder-gray-400 text-sm
   focus:outline-none focus:ring-2 transition-all
   ${hasErr
     ? 'border-red-400 focus:ring-red-200'
     : 'border-green-200 focus:ring-green-300/40 focus:border-green-400'}`;

/* ─── Paystack public key — never expose SECRET key ──────────────────────── */
const PAYSTACK_PK = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

/* ─── Convert amount to the minor unit Paystack expects ─────────────────── */
// Paystack always receives amounts in the smallest currency unit (kobo for NGN, cents for USD, etc.)
const toMinorUnit = (amount, currencyCode) => {
  const numeric = parseFloat(amount) || 0;
  // All currencies Paystack supports use a 100-subunit factor (kobo, cents, etc.)
  return Math.round(numeric * 100);
};

/* ─── DonationForm ───────────────────────────────────────────────────────── */
export default function DonationForm() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    amount: '',
    telephone: '',
  });
  const [errors, setErrors]       = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg]   = useState('');

  /* ── Handlers ── */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (errorMsg) setErrorMsg('');
  };

  const handleCurrencyChange = (e) => {
    setCurrency(CURRENCIES.find((c) => c.code === e.target.value));
  };

  /* ── Validation ── */
  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }
    if (!formData.email) {
      errs.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!formData.telephone.trim()) {
      errs.telephone = 'Phone number is required.';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      errs.amount = 'Enter a donation amount greater than 0.';
    }
    return errs;
  };

  /* ── Reset ── */
  const handleReset = useCallback(() => {
    setFormData({ fullName: '', email: '', amount: '', telephone: '' });
    setErrors({});
    setSuccessMsg('');
    setErrorMsg('');
    setIsLoading(false);
  }, []);

  /* ── Launch Paystack ── */
  const handleDonate = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (!PAYSTACK_PK || PAYSTACK_PK.includes('xxxxxxxxx')) {
      setErrorMsg(
        'Paystack public key is not configured. Please add VITE_PAYSTACK_PUBLIC_KEY to your .env file.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const popup = new PaystackPop();

      popup.newTransaction({
        key: PAYSTACK_PK,
        email: formData.email,
        amount: toMinorUnit(formData.amount, currency.code), // amount in kobo/cents
        currency: currency.code,
        firstname: formData.fullName.split(' ')[0] || formData.fullName,
        lastname: formData.fullName.split(' ').slice(1).join(' ') || '',
        phone: formData.telephone,

        // Payment channels — no PayPal (not a Paystack channel)
        channels: ['card', 'bank_transfer', 'ussd', 'bank'],

        // ── Success callback ──
        onSuccess(transaction) {
          console.log('Paystack transaction reference:', transaction.reference);
          setIsLoading(false);
          setSuccessMsg('Thank you for your generous donation. God bless you.');
        },

        // ── Cancellation callback — do NOT reload; just restore form ──
        onCancel() {
          setIsLoading(false);
          // No error message — user intentionally closed the popup
        },

        // ── Load error ──
        onError(error) {
          console.error('Paystack error:', error);
          setIsLoading(false);
          setErrorMsg(
            'We could not complete your payment at this time. Please check your details and try again.'
          );
        },
      });
    } catch (err) {
      console.error('Failed to initialise Paystack:', err);
      setIsLoading(false);
      setErrorMsg(
        'Something went wrong while launching the payment. Please refresh the page and try again.'
      );
    }
  };

  /* ─────────────────────────────── Render ────────────────────────────────── */

  // Success state: show thank-you message with a "New Donation" button
  if (successMsg) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-green-100 max-w-md w-full mx-auto">
        <div className="h-1 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, #0F5132, #D4AF37)' }} />
        <div className="flex flex-col items-center gap-5 py-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: '#e8f5ef' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="#3eb489" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-semibold text-base text-gray-800 leading-relaxed max-w-xs">
            {successMsg}
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors text-sm font-semibold shadow-sm"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-green-100 max-w-md w-full mx-auto">
      {/* Card header accent bar */}
      <div className="h-1 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, #0F5132, #D4AF37)' }} />

      <form onSubmit={handleDonate} noValidate>

        {/* Error banner */}
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

        {/* Full Name */}
        <Field id="don-fullname" label="Full Name" required error={errors.fullName}>
          <input
            id="don-fullname"
            name="fullName"
            type="text"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className={inputCls(!!errors.fullName)}
            autoComplete="name"
          />
        </Field>

        {/* Email */}
        <Field id="don-email" label="Email Address" required error={errors.email}>
          <input
            id="don-email"
            name="email"
            type="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className={inputCls(!!errors.email)}
            autoComplete="email"
          />
        </Field>

        {/* Phone Number */}
        <Field id="don-telephone" label="Phone Number" required error={errors.telephone}>
          <input
            id="don-telephone"
            name="telephone"
            type="tel"
            placeholder="Enter Phone Number"
            value={formData.telephone}
            onChange={handleInputChange}
            className={inputCls(!!errors.telephone)}
            autoComplete="tel"
          />
        </Field>

        {/* Amount + currency */}
        <Field id="don-amount" label={`Donation Amount (${currency.code})`} required error={errors.amount}>
          <div className="flex gap-2">
            {/* Currency select */}
            <div className="relative flex-shrink-0">
              <select
                id="don-currency"
                name="currency"
                value={currency.code}
                onChange={handleCurrencyChange}
                aria-label="Select currency"
                autoComplete="transaction-currency"
                className="appearance-none h-full px-3 pr-8 py-3.5 bg-green-50/40 border border-green-200 rounded-xl text-green-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-green-300/40 focus:border-green-400 transition-all cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.label}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-green-400 text-[10px]">▼</span>
            </div>
            {/* Amount input */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 font-semibold text-sm select-none">
                {currency.symbol}
              </span>
              <input
                id="don-amount"
                name="amount"
                type="number"
                min="1"
                placeholder="0"
                value={formData.amount}
                onChange={handleInputChange}
                className={inputCls(!!errors.amount) + ' pl-8'}
              />
            </div>
          </div>
        </Field>

        {/* Compulsory note + Secure badge */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-3">
            <span className="text-red-500 font-bold">*</span> are compulsory
          </p>
          <div className="border border-green-100 rounded-xl p-3 bg-green-50/30">
            <p className="text-[11px] text-gray-400 text-center mb-2.5 font-medium">
              Secured by <strong className="text-gray-600">paystack</strong>
            </p>
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <PaystackBadgeIcon />
              <MastercardIcon />
              <VisaIcon />
              <VerveIcon />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            id="donate-submit-btn"
            disabled={isLoading}
            className="flex-1 py-3.5 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-soft text-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #0F5132, #1B5E20)' }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                    strokeLinecap="round" />
                </svg>
                Processing…
              </>
            ) : (
              'Donate Now'
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="flex-1 py-3.5 font-semibold rounded-xl transition-all active:scale-95 text-sm border border-green-200 text-green-700 hover:bg-green-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
