export function KoshaiLogo() {
  return (
    <svg viewBox="0 0 80 80" className="w-10 h-10" fill="none">
      {/* Blade outline */}
      <path
        d="M40 10 L55 40 L40 70 L25 40 Z"
        stroke="#DA291C"
        strokeWidth="2"
        fill="none"
      />
      {/* Inner detail */}
      <path
        d="M40 25 L50 40 L40 55 L30 40 Z"
        stroke="#DA291C"
        strokeWidth="1.5"
        opacity="0.7"
      />
      {/* Center dot */}
      <circle cx="40" cy="40" r="3" fill="#DA291C" />
    </svg>
  )
}
