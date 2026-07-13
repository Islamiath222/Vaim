import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────────────────
   Constants & helpers
───────────────────────────────────────────────────────────────────────── */
const ACCENT = '#3eb489';

const PaystackLogo = () => (
  <svg width="30" height="24" viewBox="0 0 38 30" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0"  width="38" height="8" rx="3" fill="#00B8D9" />
    <rect x="0" y="11" width="38" height="8" rx="3" fill="#00B8D9" opacity="0.7" />
    <rect x="0" y="22" width="38" height="8" rx="3" fill="#00B8D9" opacity="0.4" />
  </svg>
);

function SuccessState({ message, onReset }) {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#e8f5ef' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="font-semibold text-base text-center text-gray-800">{message}</p>
      <button onClick={onReset} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
        New Donation
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TRANSFER PANEL
───────────────────────────────────────────────────────────────────────── */
function TransferPanel({ amount, currency, onReset }) {
  const [copied, setCopied] = useState(null);
  const [paid, setPaid] = useState(false);

  const details = [
    { label: 'Bank Name',       value: 'First Bank Nigeria',                              copyKey: null  },
    { label: 'Account Number',  value: currency.code === 'NGN' ? '2047889080' : '2048707352', copyKey: 'acct' },
    { label: 'Account Name',    value: 'Victoria Alabaster International Women Ministry',  copyKey: null  },
    { label: 'Amount',          value: `${currency.symbol}${parseFloat(amount || 0).toLocaleString()} ${currency.code}`, copyKey: 'amount', green: true },
  ];

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (paid) return <SuccessState message="Transfer recorded! Thank you 🎉" onReset={onReset} />;

  return (
    <div className="space-y-2.5">
      <p className="text-sm text-gray-500 text-center leading-snug px-2">
        Transfer{' '}
        <strong style={{ color: ACCENT }}>
          {currency.symbol}{parseFloat(amount || 0).toLocaleString()} {currency.code}
        </strong>{' '}
        to the account below
      </p>

      <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
        {details.map(({ label, value, copyKey, green }) => (
          <div key={label} className="flex justify-between items-center px-3 py-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-right max-w-[170px] break-words" style={green ? { color: ACCENT } : { color: '#374151' }}>
                {value}
              </span>
              {copyKey && (
                <button
                  onClick={() => copyText(value, copyKey)}
                  className="text-[10px] px-2 py-0.5 rounded border font-bold transition-all shrink-0"
                  style={{
                    borderColor: copied === copyKey ? ACCENT : '#d1d5db',
                    color: copied === copyKey ? ACCENT : '#9ca3af',
                    background: copied === copyKey ? '#e8f5ef' : 'transparent',
                  }}
                >
                  {copied === copyKey ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-snug">
        After transferring, notify us via the <strong>Contact page</strong> with your name, amount, and transfer date.
      </p>

      <button
        onClick={() => setPaid(true)}
        className="w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-between px-4 text-sm"
      >
        <span>I've sent the money</span>
        <span className="text-gray-400 text-lg">›</span>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CARD PANEL
───────────────────────────────────────────────────────────────────────── */
function CardPanel({ amount, currency, onReset }) {
  const [num, setNum]   = useState('');
  const [exp, setExp]   = useState('');
  const [cvv, setCvv]   = useState('');
  const [paid, setPaid] = useState(false);

  const fmtNum = (v) => v.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19);
  const fmtExp = (v) => { const d = v.replace(/\D/g,''); return d.length > 2 ? `${d.slice(0,2)} / ${d.slice(2,4)}` : d; };
  const ready = num.replace(/\s/g,'').length === 16 && exp.length >= 4 && cvv.length >= 3;

  if (paid) return <SuccessState message="Payment successful! Thank you 🎉" onReset={onReset} />;

  return (
    <div className="space-y-5">
      <p className="text-center text-sm font-semibold text-gray-700">Enter your card details to pay</p>

      {/* Card number */}
      <div className="border border-gray-200 rounded-lg px-4 pt-2 pb-3 focus-within:border-gray-400 transition-colors">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Card Number</label>
        <input
          type="text" maxLength={19} value={fmtNum(num)}
          onChange={(e) => setNum(e.target.value.replace(/\s/g,''))}
          placeholder="0000 0000 0000 0000"
          className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300"
        />
      </div>

      {/* Expiry + CVV */}
      <div className="flex gap-3">
        <div className="flex-1 border border-gray-200 rounded-lg px-4 pt-2 pb-3 focus-within:border-gray-400 transition-colors">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Card Expiry</label>
          <input
            type="text" maxLength={7} value={fmtExp(exp)} onChange={(e) => setExp(e.target.value)}
            placeholder="MM / YY"
            className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300"
          />
        </div>
        <div className="flex-1 border border-gray-200 rounded-lg px-4 pt-2 pb-3 focus-within:border-gray-400 transition-colors">
          <div className="flex justify-between">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">CVV</label>
            <span className="text-[10px] font-bold mb-1" style={{ color: ACCENT }}>HELP?</span>
          </div>
          <input
            type="password" maxLength={4} value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g,''))}
            placeholder="123"
            className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300"
          />
        </div>
      </div>

      <button
        onClick={() => ready && setPaid(true)} disabled={!ready}
        className="w-full py-4 rounded-lg font-bold text-white text-sm transition-all disabled:opacity-50 active:scale-[0.98]"
        style={{ background: ready ? ACCENT : '#d1d5db' }}
      >
        Pay {currency.symbol}{parseFloat(amount || 0).toLocaleString()} {currency.code}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BANK PANEL — Nigerian + American banks
───────────────────────────────────────────────────────────────────────── */
const ALL_BANKS = [
  // Nigerian banks
  'Access Bank','Carbon','Citibank Nigeria','Ecobank Nigeria','Fidelity Bank',
  'First Bank Nigeria','First City Monument Bank (FCMB)','GTBank','Heritage Bank',
  'Keystone Bank','Kuda Bank','Opay (OPay Digital Services)','Palmpay',
  'Polaris Bank','Providus Bank','Stanbic IBTC Bank','Standard Chartered Nigeria',
  'Sterling Bank','SunTrust Bank','Union Bank','United Bank for Africa (UBA)',
  'Unity Bank','VFD Microfinance Bank','Wema Bank','Zenith Bank',
  // American banks
  'Bank of America','Chase Bank','Citibank USA','Citizens Bank',
  'Fifth Third Bank','Goldman Sachs','HSBC USA','JPMorgan Chase',
  'KeyBank','M&T Bank','Morgan Stanley','Navy Federal Credit Union',
  'PNC Bank','Regions Bank','SunTrust Bank USA','TD Bank','Truist Bank',
  'U.S. Bank','Union Bank USA','Wells Fargo',
];

function BankPanel({ amount, currency, onReset }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [acct, setAcct] = useState('');
  const [paid, setPaid] = useState(false);
  const filtered = ALL_BANKS.filter(b => b.toLowerCase().includes(query.toLowerCase()));

  if (paid) return <SuccessState message="Bank debit initiated! Thank you 🎉" onReset={onReset} />;

  return (
    <div className="space-y-5">
      <div className="flex justify-center py-1">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: '#e8f5ef' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a3a2a" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M16 10v11M20 10v11"/>
          </svg>
        </div>
      </div>
      <h3 className="text-center font-semibold text-gray-800 text-sm">Choose your bank to start the payment</h3>

      {/* Bank dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-left flex items-center justify-between bg-white hover:border-gray-300 transition-colors"
        >
          <span className={selected ? 'text-gray-800 font-medium' : 'text-gray-400'}>
            {selected || 'Search for your bank'}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        {open && (
          <div className="mt-2 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-inner">
            <div className="px-3 py-2 border-b border-gray-150 bg-white">
              <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Type to search your bank..." className="w-full text-sm outline-none placeholder-gray-400 text-gray-800" />
            </div>
            <div className="max-h-48 overflow-y-auto divide-y divide-gray-100">
              {filtered.length === 0 && (
                <p className="text-sm text-gray-400 px-4 py-3">No banks found</p>
              )}
              {filtered.map(b => (
                <button type="button" key={b} onClick={() => { setSelected(b); setOpen(false); setQuery(''); }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-white transition-colors text-gray-700 font-medium">{b}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected && (
        <>
          <div className="border border-gray-200 rounded-lg px-4 pt-2 pb-3 focus-within:border-gray-400 transition-colors">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Account Number</label>
            <input type="text" maxLength={10} value={acct}
              onChange={e => setAcct(e.target.value.replace(/\D/g,''))}
              placeholder="Enter 10-digit account number"
              className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300" />
          </div>
          <button
            onClick={() => { if (acct.length >= 8) setPaid(true); }}
            disabled={acct.length < 8}
            className="w-full py-4 rounded-lg font-bold text-white text-sm transition-all disabled:opacity-50 active:scale-[0.98]"
            style={{ background: acct.length >= 8 ? ACCENT : '#d1d5db' }}
          >
            Debit {currency.symbol}{parseFloat(amount || 0).toLocaleString()} {currency.code}
          </button>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   USSD PANEL
───────────────────────────────────────────────────────────────────────── */
function USSDPanel({ amount, currency, onReset }) {
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);

  const ussdCode = `*894*${Math.round(parseFloat(amount || 0))}#`;

  const copyCode = () => {
    navigator.clipboard.writeText(ussdCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (done) return <SuccessState message="Payment confirmed! Thank you 🎉" onReset={onReset} />;

  return (
    <div className="space-y-2.5">
      <h3 className="text-center font-semibold text-gray-800 text-sm">Pay via First Bank USSD</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <p className="text-xs text-blue-700 mb-2 text-center">
          Dial the code below to complete your payment with First Bank:
        </p>
        <button
          type="button"
          onClick={copyCode}
          className="w-full text-center text-xl font-black text-blue-900 tracking-widest py-2 rounded-lg border border-blue-300 bg-white hover:bg-blue-50 transition-colors"
        >
          {ussdCode}
        </button>
        <p className="text-[10px] text-blue-500 text-center mt-1.5">
          {copied ? '✓ Copied to clipboard!' : 'Click code to copy'}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setDone(true)}
        className="w-full py-3 rounded-lg font-bold text-white text-sm transition-all active:scale-[0.98]"
        style={{ background: ACCENT }}
      >
        I've completed the payment
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Methods config — Transfer, Card, Bank, USSD only
───────────────────────────────────────────────────────────────────────── */
const METHODS = [
  {
    id: 'transfer', label: 'Transfer', Panel: TransferPanel,
    desc: 'Send directly to our First Bank account',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7M4 10v10a1 1 0 001 1h4v-6h6v6h4a1 1 0 001-1V10"/></svg>,
  },
  {
    id: 'card', label: 'Card', Panel: CardPanel,
    desc: 'Pay with debit or credit card',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  },
  {
    id: 'bank', label: 'Bank', Panel: BankPanel,
    desc: 'Debit directly from your bank account',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M16 10v11M20 10v11"/></svg>,
  },
  {
    id: 'ussd', label: 'USSD', Panel: USSDPanel,
    desc: 'Dial a USSD code to pay instantly',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/></svg>,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Desktop sidebar
───────────────────────────────────────────────────────────────────────── */
function MethodSidebar({ activeMethod, onSelect }) {
  return (
    <>
      <div className="px-5 pt-5 pb-3 border-b border-gray-200">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Pay With</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-1">
        {METHODS.map((m) => {
          const isActive = activeMethod === m.id;
          return (
            <button
              type="button"
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition-all ${
                isActive ? 'bg-white font-semibold' : 'font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
              style={isActive ? { color: ACCENT, borderRight: `2.5px solid ${ACCENT}` } : {}}
            >
              <span style={{ color: isActive ? ACCENT : '#9ca3af' }}>{m.icon}</span>
              <span>{m.label}</span>
              {isActive && (
                <span className="ml-auto w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Mobile: method list view
───────────────────────────────────────────────────────────────────────── */
function MobileMethodList({ amount, currency, email, onSelect, onCancel }) {
  const truncEmail = email.length > 20 ? email.slice(0, 20) + '...' : email;
  return (
    <div className="flex flex-col h-auto">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <PaystackLogo />
        <div className="text-right">
          <p className="text-xs text-gray-400 leading-none mb-0.5">{truncEmail}</p>
          <p className="text-sm font-bold leading-none" style={{ color: ACCENT }}>
            Pay {currency.symbol}{parseFloat(amount || 0).toLocaleString()} {currency.code}
          </p>
        </div>
      </div>
      <div className="px-5 pt-4 pb-2">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Pay With</p>
      </div>
      <div className="px-4 space-y-2 pb-4">
        {METHODS.map((m) => (
          <button
            type="button"
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100" style={{ background: '#f8f9fa' }}>
              <span className="text-gray-500">{m.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-gray-800">{m.label}</span>
              <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-gray-100">
        <button type="button" onClick={onCancel}
          className="w-full py-3.5 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all active:scale-95">
          Cancel Payment
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Mobile: active panel view
───────────────────────────────────────────────────────────────────────── */
function MobilePanelView({ method, amount, currency, email, onBack, onCancel, onReset }) {
  const truncEmail = email.length > 20 ? email.slice(0, 20) + '...' : email;
  const Panel = method.Panel;
  return (
    <div className="flex flex-col h-auto">
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
          </svg>
          <span>Back</span>
        </button>
        <div className="flex-1 flex justify-end">
          <div className="text-right">
            <p className="text-[11px] text-gray-400 leading-none mb-0.5">{truncEmail}</p>
            <p className="text-xs font-bold leading-none" style={{ color: ACCENT }}>
              Pay {currency.symbol}{parseFloat(amount || 0).toLocaleString()} {currency.code}
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <span className="text-gray-400">{method.icon}</span>
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{method.label}</span>
      </div>
      <div className="px-5 py-5">
        <Panel amount={amount} currency={currency} email={email} onReset={onReset} />
      </div>
      <div className="px-5 py-4 border-t border-gray-100">
        <button type="button" onClick={onCancel}
          className="w-full py-3.5 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all active:scale-95">
          Cancel Payment
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Main Modal
───────────────────────────────────────────────────────────────────────── */
export default function PaymentModal({ isOpen, onClose, onReset, amount, currency, email }) {
  const [activeMethod, setActiveMethod] = useState('transfer');
  const [mobileView, setMobileView] = useState('list');
  const [mobileMethod, setMobileMethod] = useState(METHODS[0]);

  useEffect(() => {
    if (isOpen) {
      setMobileView('list');
      setMobileMethod(METHODS[0]);
      setActiveMethod('transfer');
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  const activeM = METHODS.find(m => m.id === activeMethod);
  const ActivePanel = activeM?.Panel;
  const truncEmail = email.length > 16 ? email.slice(0, 16) + '...' : email;

  const handleMobileSelect = (id) => {
    const m = METHODS.find(m => m.id === id);
    setMobileMethod(m);
    setMobileView('panel');
  };

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="min-h-screen px-4 text-center"
           onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        {/* Trick to vertically center the modal */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

        <div className="inline-block relative w-full text-left align-middle transition-all mt-16 mb-8" 
             style={{ maxWidth: '540px' }}
             onClick={(e) => e.stopPropagation()}>
             
          {/* Close button outside */}
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-10 right-0 sm:-right-8 z-50 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
            aria-label="Close payment"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div
            className="bg-white w-full sm:rounded-2xl rounded-2xl shadow-2xl flex flex-col sm:flex-row h-auto overflow-hidden border border-gray-100"
            style={{ WebkitOverflowScrolling: 'touch' }}
            role="dialog" aria-modal="true"
          >

          {/* ── MOBILE layout (< sm) ── */}
          <div className="flex sm:hidden flex-col w-full h-auto">
            {mobileView === 'list' ? (
              <MobileMethodList amount={amount} currency={currency} email={email} onSelect={handleMobileSelect} onCancel={onClose} />
            ) : (
              <MobilePanelView method={mobileMethod} amount={amount} currency={currency} email={email}
                onBack={() => setMobileView('list')} onCancel={onClose} onReset={onReset} />
            )}
          </div>

          {/* ── DESKTOP layout (≥ sm) ── */}
          <div className="hidden sm:flex flex-row flex-1 h-auto">
            {/* Sidebar */}
            <aside className="w-36 flex-shrink-0 bg-[#f8f9fa] border-r border-gray-200 flex flex-col">
              <MethodSidebar activeMethod={activeMethod} onSelect={setActiveMethod} />
            </aside>

            {/* Main area */}
            <main className="flex-1 flex flex-col">
              {/* Header */}
              <header className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 pr-10">
                <PaystackLogo />
                <div className="text-right max-w-xs">
                  <p className="text-xs text-gray-400 leading-none mb-0.5 truncate" title={email}>{truncEmail}</p>
                  <p className="text-lg font-bold leading-none truncate" style={{ color: ACCENT }}>
                    Pay {currency.symbol}{parseFloat(amount || 0).toLocaleString()} {currency.code}
                  </p>
                </div>
              </header>

              {/* Panel */}
              <div className="flex-1 px-5 py-5 h-auto">
                {ActivePanel && <ActivePanel amount={amount} currency={currency} email={email} onReset={onReset} />}
              </div>

              {/* Footer */}
              <footer className="px-5 py-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                <button onClick={onClose} className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                  Cancel Payment
                </button>
                <div className="flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <span className="text-[11px] text-gray-400">Secured by <strong className="text-gray-500">paystack</strong></span>
                </div>
              </footer>
            </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
