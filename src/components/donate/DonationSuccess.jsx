import React from 'react';
import { Link } from 'react-router-dom';

export default function DonationSuccess({ transactionDetails, onReset }) {
  const donorName = transactionDetails?.payer?.name?.given_name || 'Generous Donor';

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-green-100 max-w-md w-full mx-auto">
      <div className="h-1 -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, #0F5132, #D4AF37)' }} />
      <div className="flex flex-col items-center gap-5 py-6 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-50">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="#15803d" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-green-900">Thank You for Your Generosity</h2>
        
        <p className="text-sm text-gray-600 leading-relaxed max-w-[320px]">
          Your donation has been successfully received. Thank you for supporting Victoria Alabaster International Women Ministry and helping us continue making a difference in communities and lives.
        </p>
        
        <div className="w-full flex flex-col gap-3 mt-4">
          <button
            onClick={onReset}
            className="w-full px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-colors text-sm font-semibold shadow-sm"
          >
            Make Another Donation
          </button>
          
          <Link
            to="/"
            className="w-full px-6 py-3 border border-green-200 text-green-700 rounded-xl hover:bg-green-50 transition-colors text-sm font-semibold"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
