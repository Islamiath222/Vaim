import React from 'react';

const currencySymbols = { NGN: '₦', USD: '$' };

// Reusable mock component for Paystack integration
export function PaystackButton({ amount, email, phone, currency = 'NGN', onSuccess }) {
  const symbol = currencySymbols[currency] || currency;
  const handlePayment = () => {
    alert(
      `Paystack Payment\n\nAmount: ${symbol}${parseFloat(amount).toLocaleString()} ${currency}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\n(Replace this alert with your actual Paystack inline integration)`
    );
    if (onSuccess) onSuccess();
  };

  return (
    <button
      onClick={handlePayment}
      type="button"
      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#09A5DB] hover:bg-[#0785b3] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.98]"
    >
      Pay with Paystack
    </button>
  );
}

// Reusable mock component for Flutterwave integration
export function FlutterwaveButton({ amount, email, phone, currency = 'NGN', onSuccess }) {
  const symbol = currencySymbols[currency] || currency;
  const handlePayment = () => {
    alert(
      `Flutterwave Payment\n\nAmount: ${symbol}${parseFloat(amount).toLocaleString()} ${currency}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\n(Replace this alert with your actual Flutterwave inline integration)`
    );
    if (onSuccess) onSuccess();
  };

  return (
    <button
      onClick={handlePayment}
      type="button"
      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#FB9129] hover:bg-[#db7a1d] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.98]"
    >
      Pay with Flutterwave
    </button>
  );
}

// Reusable mock component for PayPal integration (USD only)
export function PayPalButton({ amount, email, currency = 'USD', onSuccess }) {
  const handlePayment = () => {
    alert(
      `PayPal Payment\n\nAmount: $${parseFloat(amount).toLocaleString()} USD\nEmail: ${email}\n\n(Replace this alert with your actual PayPal Smart Buttons)`
    );
    if (onSuccess) onSuccess();
  };

  return (
    <button
      onClick={handlePayment}
      type="button"
      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#003087] hover:bg-[#002266] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.98]"
    >
      Pay with PayPal
    </button>
  );
}
