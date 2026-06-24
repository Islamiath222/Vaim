import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────── */
const ACCENT = '#3eb489';

/* ─────────────────────────────────────────────────────────────────────────
   Shared UI helpers
───────────────────────────────────────────────────────────────────────── */
const PaystackLogo = () => (
  <svg width="30" height="24" viewBox="0 0 38 30" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0"  width="38" height="8" rx="3" fill="#00B8D9" />
    <rect x="0" y="11" width="38" height="8" rx="3" fill="#00B8D9" opacity="0.7" />
    <rect x="0" y="22" width="38" height="8" rx="3" fill="#00B8D9" opacity="0.4" />
  </svg>
);

function SuccessState({ message }) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#e8f5ef' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="font-semibold text-base text-center text-gray-800">{message}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   QR Code (static realistic-looking)
───────────────────────────────────────────────────────────────────────── */
function QRCode() {
  const size = 150;
  const seed = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0],
    [0,1,1,0,1,0,0,0,1,0,0,1,0,1,1,0,0,1,0,1,1],
    [1,0,0,1,1,1,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0],
    [0,1,0,0,0,1,0,1,1,0,1,0,0,1,1,0,0,1,0,1,0],
    [1,1,1,0,1,0,1,0,0,1,1,0,1,0,0,0,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,0,0,1,0,1,1],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,1,0,0],
    [1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,1,0,1,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,1,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,1,0,0,1],
  ];
  const cs = size / seed.length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" />
      {seed.flatMap((row, r) =>
        row.map((col, c) =>
          col ? <rect key={`${r}-${c}`} x={c * cs} y={r * cs} width={cs} height={cs} fill="#111" /> : null
        )
      )}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Panels
───────────────────────────────────────────────────────────────────────── */
function ZapPanel({ amount, currency, onReset }) {
  const [done, setDone] = useState(false);
  if (done) return (
  <div className="flex flex-col items-center gap-4 py-12">
    <SuccessState message="Payment confirmed! Thank you 🎉" />
    <button onClick={onReset} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">New Donation</button>
  </div>
);
  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div className="border border-gray-200 rounded-2xl p-3 shadow-sm bg-white">
        <QRCode />
      </div>
      <p className="text-sm text-gray-500 text-center leading-relaxed">
        Scan the QR code to open Zap and<br />complete this payment
      </p>
      <button
        onClick={() => setDone(true)}
        className="w-full border border-gray-200 text-gray-700 font-medium py-3.5 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-between px-4 text-sm"
      >
        <span>I've completed the payment</span>
        <span className="text-gray-400 text-lg">›</span>
      </button>
      <div className="w-full border border-gray-200 rounded-xl p-3 flex items-center gap-3 bg-gray-50">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-base">Z</span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Speed up your checkout with Zap.</p>
          <p className="text-sm font-semibold text-gray-800">Download Zap by Paystack <span className="text-gray-400">›</span></p>
        </div>
      </div>
    </div>
  );
}

function CardPanel({ amount, currency, onReset }) {
  const [num, setNum]   = useState('');
  const [exp, setExp]   = useState('');
  const [cvv, setCvv]   = useState('');
  const [paid, setPaid] = useState(false);

  const fmtNum = (v) => v.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19);
  const fmtExp = (v) => { const d = v.replace(/\D/g,''); return d.length > 2 ? `${d.slice(0,2)} / ${d.slice(2,4)}` : d; };
  const ready = num.replace(/\s/g,'').length === 16 && exp.length >= 4 && cvv.length >= 3;

  if (paid) return (
  <div className="flex flex-col items-center gap-4 py-12">
    <SuccessState message="Payment successful! Thank you 🎉" />
    <button onClick={onReset} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">New Donation</button>
  </div>
);
  return (
    <div className="space-y-5">
      <h3 className="text-center font-semibold text-gray-800">Enter your card details to pay</h3>
      <div className="border border-gray-200 rounded-lg px-4 pt-2 pb-3 focus-within:border-gray-400 transition-colors">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Card Number</label>
        <input
          type="text" maxLength={19} value={fmtNum(num)}
          onChange={(e) => setNum(e.target.value.replace(/\s/g,''))}
          placeholder="0000 0000 0000 0000"
          className="w-full text-sm text-gray-800 bg-transparent outline-none placeholder-gray-300"
        />
      </div>
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
        Pay {currency.symbol}{parseFloat(amount).toLocaleString()} {currency.code}
      </button>
    </div>
  );
}

function TransferPanel({ amount, currency, onReset }) {
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);
  const acct = '0123456789';
  const copy = () => { navigator.clipboard.writeText(acct).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false), 2000); };
  const rows = [
    { label: 'Bank',           value: 'Wema Bank' },
    { label: 'Account Number', value: acct, hasCopy: true },
    { label: 'Account Name',   value: 'Victoria Alabaster' },
    { label: 'Amount',         value: `${currency.symbol}${parseFloat(amount).toLocaleString()}`, green: true },
  ];
  if (paid) return (
    <div className="flex flex-col items-center gap-4 py-12">
      <SuccessState message="Transfer received! Thank you 🎉" />
      <button onClick={onReset} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">New Donation</button>
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="flex justify-center py-1">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: '#e8f5ef' }}>
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7M4 10v10a1 1 0 001 1h4v-6h6v6h4a1 1 0 001-1V10"/>
          </svg>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center">
        Transfer exactly <strong style={{ color: ACCENT }}>{currency.symbol}{parseFloat(amount).toLocaleString()} {currency.code}</strong> to this account
      </p>
      <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
        {rows.map(({ label, value, hasCopy, green }) => (
          <div key={label} className="flex justify-between items-center px-4 py-3">
            <span className="text-xs text-gray-400">{label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={green ? { color: ACCENT } : { color: '#374151' }}>{value}</span>
              {hasCopy && (
                <button onClick={copy}
                  className="text-[10px] px-2 py-0.5 rounded border font-bold transition-all"
                  style={{ borderColor: copied ? ACCENT : '#d1d5db', color: copied ? ACCENT : '#9ca3af', background: copied ? '#e8f5ef' : 'transparent' }}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <p className="text-xs text-amber-700">Account is valid for this transaction only. Expires in <strong>30 minutes</strong>.</p>
      </div>
      <button onClick={() => setPaid(true)} className="w-full border border-gray-200 text-gray-700 font-medium py-3.5 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-between px-4 text-sm">
        <span>I've sent the money</span><span className="text-gray-400 text-lg">›</span>
      </button>
    </div>
  );
}

const BANKS = ['Access Bank','First Bank','GTBank','Zenith Bank','UBA','Polaris Bank','Fidelity Bank','Sterling Bank','FCMB','Ecobank'];

function BankPanel({ amount, currency, onReset }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [acct, setAcct] = useState('');
  const [paid, setPaid] = useState(false);
  const filtered = BANKS.filter(b => b.toLowerCase().includes(query.toLowerCase()));

  if (paid) return (
  <div className="flex flex-col items-center gap-4 py-12">
    <SuccessState message="Bank debit initiated! Thank you 🎉" />
    <button onClick={onReset} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">New Donation</button>
  </div>
);
  return (
    <div className="space-y-5">
      <div className="flex justify-center py-1">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: '#e8f5ef' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a3a2a" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M16 10v11M20 10v11"/>
          </svg>
        </div>
      </div>
      <h3 className="text-center font-semibold text-gray-800">Choose your bank to start the payment</h3>
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-left flex items-center justify-between bg-white hover:border-gray-300 transition-colors"
        >
          <span className={selected ? 'text-gray-800 font-medium' : 'text-gray-400'}>{selected || 'Search for your bank'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        {open && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100">
              <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Type to search..." className="w-full text-sm outline-none placeholder-gray-400 text-gray-800" />
            </div>
            <div className="max-h-44 overflow-y-auto">
              {filtered.map(b => (
                <button key={b} onClick={() => { setSelected(b); setOpen(false); setQuery(''); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-gray-700">{b}</button>
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
            onClick={() => { if (acct.length === 10) setPaid(true); }}
            disabled={acct.length !== 10}
            className="w-full py-4 rounded-lg font-bold text-white text-sm transition-all disabled:opacity-50 active:scale-[0.98]"
            style={{ background: acct.length === 10 ? ACCENT : '#d1d5db' }}
          >
            Debit {currency.symbol}{parseFloat(amount).toLocaleString()} {currency.code}
          </button>
        </>
      )}
    </div>
  );
}

const USSD_BANKS = [
  { bank: 'Guaranty Trust Bank', code: '*737#' },
  { bank: 'Zenith Bank',         code: '*966#' },
  { bank: 'Access Bank',         code: '*901#' },
  { bank: 'First Bank',          code: '*894#' },
  { bank: 'UBA',                 code: '*919#' },
  { bank: 'Fidelity Bank',       code: '*770#' },
];

function USSDPanel({ amount, currency, onReset }) {
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="flex flex-col items-center gap-4 py-12">
      <SuccessState message="Payment confirmed! Thank you 🎉" />
      <button onClick={onReset} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">New Donation</button>
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="flex justify-center py-1">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#b7f5c4' }}>
          <span className="font-black text-sm" style={{ color: '#166534' }}>*#</span>
        </div>
      </div>
      <h3 className="text-center font-semibold text-gray-800">Choose your bank to start the payment</h3>
      <div className="space-y-1.5">
        {USSD_BANKS.map(({ bank, code }) => (
          <button key={bank} onClick={() => setSelected(bank)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
              selected === bank ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}>
            <span className={`font-medium ${selected === bank ? 'text-green-700' : 'text-gray-700'}`}>{bank}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
              selected === bank ? 'border-green-300 text-green-700 bg-white' : 'border-gray-200 text-gray-500 bg-gray-50'
            }`}>{code}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <p className="text-xs text-blue-700">
              Dial <strong>{USSD_BANKS.find(b => b.bank === selected)?.code}</strong> on your phone and follow the prompts to pay <strong>{currency.symbol}{parseFloat(amount).toLocaleString()}</strong>.
            </p>
          </div>
          <button
            onClick={() => setDone(true)}
            className="w-full py-3.5 rounded-lg font-bold text-white text-sm transition-all active:scale-[0.98]"
            style={{ background: ACCENT }}
          >
            I've completed the payment
          </button>
        </div>
      )}
    </div>
  );
}

function OPayPanel({ amount, currency, onReset }) {
  const [done, setDone] = useState(false);
  if (done) return (
  <div className="flex flex-col items-center gap-4 py-12">
    <SuccessState message="OPay authentication request sent! Check your phone 🎉" />
    <button onClick={onReset} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">New Donation</button>
  </div>
);
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* OPay logo */}
      <div className="flex items-center gap-2">
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="16" stroke="#00b14f" strokeWidth="3.5" fill="none"/>
          <circle cx="18" cy="18" r="7" fill="#1b2a4a"/>
          <path d="M18 2 A16 16 0 0 1 34 18" stroke="#1b2a4a" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </svg>
        <span className="text-2xl font-black" style={{ color: '#1b2a4a' }}>Pay</span>
      </div>
      <p className="text-sm text-gray-500 text-center leading-relaxed">
        Please click the button below to<br />authenticate with your bank
      </p>
      <button
        onClick={() => setDone(true)}
        className="w-full py-4 rounded-lg font-bold text-white text-sm transition-all active:scale-[0.98]"
        style={{ background: ACCENT }}
      >
        Authenticate
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Method definitions
───────────────────────────────────────────────────────────────────────── */
const METHODS = [
  {
    id: 'zap', label: 'Zap', isNew: true, Panel: ZapPanel,
    desc: 'Scan a QR code with the Zap app',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  },
  {
    id: 'card', label: 'Card', Panel: CardPanel,
    desc: 'Pay with debit or credit card',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  },
  {
    id: 'transfer', label: 'Transfer', Panel: TransferPanel,
    desc: 'Send money directly to our account',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7M4 10v10a1 1 0 001 1h4v-6h6v6h4a1 1 0 001-1V10"/></svg>,
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
  {
    id: 'opay', label: 'OPay', Panel: OPayPanel,
    desc: 'Pay with your OPay wallet',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Sidebar (shared between desktop permanent + mobile overlay)
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
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition-all ${
                isActive ? 'bg-white font-semibold' : 'font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
              style={isActive ? { color: ACCENT, borderRight: `2.5px solid ${ACCENT}` } : {}}
            >
              <span style={{ color: isActive ? ACCENT : '#9ca3af' }}>{m.icon}</span>
              <span>{m.label}</span>
              {m.isNew && (
                <span className="ml-auto text-[9px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">NEW</span>
              )}
              {isActive && !m.isNew && (
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
   Mobile method selection list (full-screen)
───────────────────────────────────────────────────────────────────────── */
function MobileMethodList({ amount, currency, email, onSelect, onCancel }) {
  const truncEmail = email.length > 18 ? email.slice(0, 18) + '...' : email;
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <PaystackLogo />
        <div className="text-right">
          <p className="text-xs text-gray-400 leading-none mb-0.5">{truncEmail}</p>
          <p className="text-sm font-bold leading-none" style={{ color: ACCENT }}>
            Pay {currency.symbol}{parseFloat(amount).toLocaleString()} {currency.code}
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Pay With</p>
      </div>

      {/* Method rows — card style on mobile */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
        {METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100" style={{ background: '#f8f9fa' }}>
              <span className="text-gray-500">{m.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">{m.label}</span>
                {m.isNew && (
                  <span className="text-[9px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded uppercase">NEW</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        ))}
      </div>

      {/* Cancel */}
      <div className="px-5 py-4 border-t border-gray-100">
        <button
          onClick={onCancel}
          className="w-full py-3.5 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all active:scale-95"
        >
          Cancel Payment
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Mobile panel view (back button + panel content)
───────────────────────────────────────────────────────────────────────── */
function MobilePanelView({ method, amount, currency, email, onBack, onCancel, onReset }) {
  const truncEmail = email.length > 18 ? email.slice(0, 18) + '...' : email;
  const Panel = method.Panel;
  return (
    <div className="flex flex-col h-full">
      {/* Header with back button */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/>
          </svg>
          <span>Back</span>
        </button>
        <div className="flex-1 flex justify-end">
          <div className="text-right">
            <p className="text-[11px] text-gray-400 leading-none mb-0.5">{truncEmail}</p>
            <p className="text-xs font-bold leading-none" style={{ color: ACCENT }}>
              Pay {currency.symbol}{parseFloat(amount).toLocaleString()} {currency.code}
            </p>
          </div>
        </div>
      </div>

      {/* Active method tab indicator */}
      <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <span className="text-gray-400">{method.icon}</span>
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{method.label}</span>
        {method.isNew && (
          <span className="text-[9px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded uppercase">NEW</span>
        )}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <Panel amount={amount} currency={currency} email={email} onReset={onReset} />
      </div>

      {/* Cancel button */}
      <div className="px-5 py-4 border-t border-gray-100">
        <button
          onClick={onCancel}
          className="w-full py-3.5 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-all active:scale-95"
        >
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
  // Desktop: which sidebar tab is active
  const [activeMethod, setActiveMethod] = useState('zap');
  // Mobile: 'list' | 'panel'
  const [mobileView, setMobileView] = useState('list');
  const [mobileMethod, setMobileMethod] = useState(METHODS[0]);

  // Reset mobile state when modal opens
  useEffect(() => {
    if (isOpen) {
      setMobileView('list');
      setMobileMethod(METHODS[0]);
      setActiveMethod('zap');
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
  const truncEmail = email.length > 14 ? email.slice(0, 14) + '...' : email;

  const handleMobileSelect = (id) => {
    const m = METHODS.find(m => m.id === id);
    setMobileMethod(m);
    setMobileView('panel');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ backgroundColor: 'rgba(20,20,20,0.7)', backdropFilter: 'blur(3px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* ──── MODAL BOX ──── */}
      <div
        className="relative bg-white w-full sm:rounded-2xl shadow-2xl overflow-hidden flex"
        style={{
          maxWidth: '680px',
          /* Mobile: slide up from bottom, full height minus safe area */
          height: 'min(92vh, 600px)',
          /* On mobile screens, round only top corners */
          borderRadius: '1.25rem 1.25rem 0 0',
        }}
        role="dialog" aria-modal="true"
      >
        {/* Close ✕ — always visible */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all"
          aria-label="Close payment"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* ════════ MOBILE LAYOUT (< sm) ════════ */}
        <div className="flex sm:hidden flex-col w-full h-full">
          {mobileView === 'list' ? (
            <MobileMethodList
              amount={amount}
              currency={currency}
              email={email}
              onSelect={handleMobileSelect}
              onCancel={onClose}
            />
          ) : (
            <MobilePanelView
              method={mobileMethod}
              amount={amount}
              currency={currency}
              email={email}
              onBack={() => setMobileView('list')}
              onCancel={onClose}
              onReset={onReset}
            />
          )}
        </div>

        {/* ════════ DESKTOP LAYOUT (≥ sm) ════════ */}
        <div className="hidden sm:flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-44 flex-shrink-0 bg-[#f8f9fa] border-r border-gray-200 flex flex-col">
            <MethodSidebar activeMethod={activeMethod} onSelect={setActiveMethod} />
          </aside>

          {/* Main panel */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 pr-10">
              <PaystackLogo />
              <div className="text-right max-w-xs">
                <p className="text-xs text-gray-400 leading-none mb-0.5 truncate" title={email}>{truncEmail}</p>
                <p className="text-lg font-bold leading-none truncate" style={{ color: ACCENT }}>
                  Pay {currency.symbol}{parseFloat(amount).toLocaleString()} {currency.code}
                </p>
              </div>
            </header>

            {/* Panel */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {ActivePanel && <ActivePanel amount={amount} currency={currency} email={email} onReset={onReset} />}
            </div>

            {/* Footer */}
            <footer className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              {/* Cancel payment */}
              <button
                onClick={onClose}
                className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors flex items-center gap-1"
              >
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
  );
}
