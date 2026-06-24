// Signature motif: a hand-stitched "thread" line that recurs through the site,
// evoking weaving/mending communities together and the ministry's "Alabaster" — something
// carved and restored to beauty. Used sparingly: hero, section dividers, profile cards.

export function ThreadDivider({ className = '', color = '#D4AF37' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 12 C 40 2, 60 22, 100 12 C 140 2, 160 22, 200 12 C 240 2, 260 22, 300 12 C 340 2, 360 22, 400 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 7"
      />
    </svg>
  )
}

export function ThreadFlourish({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 60 C 10 25, 40 10, 60 10 C 95 10, 110 40, 95 65 C 82 87, 50 90, 40 75 C 32 63, 45 50, 58 58"
        stroke="#D4AF37"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="58" cy="58" r="3" fill="#D4AF37" />
    </svg>
  )
}
