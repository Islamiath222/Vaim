import { useState } from 'react';
import PaymentModal from './PaymentModal';

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
      <label htmlFor={id} className="block text-sm font-semibold text-purple-900 mb-1.5">
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
  `w-full px-4 py-3.5 bg-purple-50/40 border rounded-xl text-gray-800 placeholder-gray-400 text-sm
   focus:outline-none focus:ring-2 transition-all
   ${hasErr
     ? 'border-red-400 focus:ring-red-200'
     : 'border-purple-200 focus:ring-purple-300/40 focus:border-purple-400'}`;

/* ─── DonationForm ───────────────────────────────────────────────────────── */
export default function DonationForm() {
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [formData, setFormData] = useState({ email: '', amount: '', telephone: '' });
  const [errors, setErrors]     = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCurrencyChange = (e) => {
    setCurrency(CURRENCIES.find((c) => c.code === e.target.value));
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address.';
    if (!formData.amount || parseFloat(formData.amount) <= 0) errs.amount = 'Enter a donation amount greater than 0.';
    return errs;
  };

  const handleDonate = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setModalOpen(true);
  };

  const handleReset = () => {
    setFormData({ email: '', amount: '', telephone: '' });
    setErrors({});
    setModalOpen(false);
  };

  return (
    <>
      {/* ── Form card ── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-purple-100 max-w-md w-full mx-auto">

        {/* Card header accent bar */}
        <div className="h-1 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #5B3A8E, #D4AF37)' }} />

        <form onSubmit={handleDonate} noValidate>

          {/* Email */}
          <Field id="don-email" label="Email" required error={errors.email}>
            <input
              id="don-email"
              name="email"
              type="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className={inputCls(!!errors.email)}
            />
          </Field>

          {/* Amount + currency */}
          <Field id="don-amount" label={`Amount (${currency.code})`} required error={errors.amount}>
            <div className="flex gap-2">
              {/* Currency select */}
              <div className="relative flex-shrink-0">
                <select
                  value={currency.code}
                  onChange={handleCurrencyChange}
                  aria-label="Select currency"
                  className="appearance-none h-full px-3 pr-8 py-3.5 bg-purple-50/40 border border-purple-200 rounded-xl text-purple-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-purple-300/40 focus:border-purple-400 transition-all cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.symbol} {c.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-purple-400 text-[10px]">▼</span>
              </div>
              {/* Amount input */}
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 font-semibold text-sm select-none">
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

          {/* Telephone */}
          <Field id="don-telephone" label="Telephone">
            <input
              id="don-telephone"
              name="telephone"
              type="tel"
              placeholder="Enter Telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className={inputCls(false)}
            />
          </Field>

          {/* Compulsory note + Secure badge */}
          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-3">
              <span className="text-red-500 font-bold">*</span> are compulsory
            </p>
            <div className="border border-purple-100 rounded-xl p-3 bg-purple-50/30">
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
              className="flex-1 py-3.5 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-soft text-sm hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #5B3A8E, #7c52b8)' }}
            >
              Donate
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 font-semibold rounded-xl transition-all active:scale-95 text-sm border border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* ── Payment Modal ── */}
      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onReset={handleReset}
        amount={formData.amount}
        currency={currency}
        email={formData.email}
      />
    </>
  );
}
