// Illustrated visual placeholders in the brand palette, standing in for photography.
// Each variant uses simple, warm, abstract human/community forms rather than generic gradients.

const variants = {
  hero: (
    <svg viewBox="0 0 600 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#0B301B" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#heroGrad)" />
      <circle cx="430" cy="160" r="90" fill="#D4AF37" opacity="0.18" />
      <circle cx="120" cy="480" r="130" fill="#D4AF37" opacity="0.12" />
      {/* Stylized figures - mother and child, women standing together */}
      <g opacity="0.92">
        <circle cx="230" cy="260" r="38" fill="#F8F4EE" />
        <path d="M150 420 Q230 320 310 420 L310 470 L150 470 Z" fill="#F8F4EE" />
        <circle cx="370" cy="300" r="28" fill="#D4AF37" />
        <path d="M320 420 Q370 350 420 420 L420 460 L320 460 Z" fill="#D4AF37" />
      </g>
      <path d="M0 540 C150 500, 450 580, 600 520 L600 600 L0 600 Z" fill="#F8F4EE" opacity="0.08" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 500 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="400" fill="#E8F5E9" />
      <circle cx="120" cy="150" r="50" fill="#0F5132" />
      <path d="M50 320 Q120 230 190 320 L190 360 L50 360 Z" fill="#0F5132" />
      <circle cx="260" cy="170" r="42" fill="#D4AF37" />
      <path d="M200 320 Q260 250 320 320 L320 355 L200 355 Z" fill="#D4AF37" />
      <circle cx="390" cy="155" r="48" fill="#81C784" />
      <path d="M325 320 Q390 235 455 320 L455 360 L325 360 Z" fill="#81C784" />
    </svg>
  ),
  office: (
    <svg viewBox="0 0 500 350" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="350" fill="#072112" />
      <rect x="100" y="80" width="300" height="220" fill="#0F5132" />
      <rect x="130" y="120" width="50" height="60" fill="#D4AF37" opacity="0.85" />
      <rect x="225" y="120" width="50" height="60" fill="#F8F4EE" opacity="0.85" />
      <rect x="320" y="120" width="50" height="60" fill="#D4AF37" opacity="0.85" />
      <rect x="130" y="210" width="50" height="60" fill="#F8F4EE" opacity="0.7" />
      <rect x="225" y="210" width="50" height="90" fill="#030D07" />
      <rect x="320" y="210" width="50" height="60" fill="#F8F4EE" opacity="0.7" />
      <polygon points="80,80 250,20 420,80" fill="#030D07" />
    </svg>
  ),
  shelter: (
    <svg viewBox="0 0 500 350" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="500" height="350" fill="#0B301B" />
      <path d="M100 280 L100 160 L250 70 L400 160 L400 280 Z" fill="#4CAF50" />
      <rect x="220" y="190" width="60" height="90" fill="#030D07" />
      <rect x="140" y="200" width="40" height="40" fill="#D4AF37" opacity="0.85" />
      <rect x="320" y="200" width="40" height="40" fill="#D4AF37" opacity="0.85" />
      <circle cx="250" cy="100" r="55" fill="#D4AF37" opacity="0.2" />
      <path d="M250 60 L235 95 L265 95 Z" fill="#F8F4EE" opacity="0.5" />
    </svg>
  ),
  founder: (
    <svg viewBox="0 0 400 480" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="480" fill="#E8F5E9" />
      <circle cx="200" cy="170" r="80" fill="#0F5132" />
      <path d="M70 460 Q200 290 330 460 Z" fill="#0F5132" />
      <circle cx="200" cy="160" r="60" fill="#C8E6C9" />
      <path d="M150 440 Q200 330 250 440 Z" fill="#D4AF37" opacity="0.8" />
    </svg>
  ),
  abstract1: (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#0F5132" />
      <circle cx="320" cy="60" r="70" fill="#4CAF50" opacity="0.6" />
      <circle cx="60" cy="240" r="90" fill="#D4AF37" opacity="0.25" />
    </svg>
  ),
  abstract2: (
    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill="#D4AF37" />
      <circle cx="80" cy="80" r="60" fill="#B8932A" opacity="0.5" />
      <circle cx="320" cy="230" r="80" fill="#F8F4EE" opacity="0.3" />
    </svg>
  ),
}

export default function VisualPlaceholder({ variant = 'abstract1', className = '', rounded = 'rounded-2xl' }) {
  return (
    <div className={`overflow-hidden ${rounded} ${className}`}>
      {variants[variant] || variants.abstract1}
    </div>
  )
}
