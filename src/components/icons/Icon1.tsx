export default function Icon1() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-16 h-16 text-orange-500 hover:text-orange-600 transition-all duration-300 hover:scale-105"
    >
      {/* Abstract circular base */}
      <circle cx="32" cy="32" r="28" className="fill-current opacity-10" />

      {/* Dynamic core elements */}
      <g className="stroke-current" strokeWidth="2" fill="none">
        {/* Progress circle */}
        <circle cx="32" cy="32" r="20" className="opacity-20" />

        {/* Abstract calendar/task grid */}
        <path d="M26 22h12v12H26V22zm-8 8h4v4h-4v-4zm16 0h4v4h-4v-4z" className="fill-current" />

        {/* Rising progress arrow */}
        <path d="M32 38l5-6h-4v-8h-2v8h-4l5 6z" className="fill-orange-100" />

        {/* Subtle sparkle accent */}
        <path d="M44 24l-2 3 3-2 3 2-2-3 2-3-3 2-3-2z" className="fill-orange-300 animate-pulse" />
      </g>
    </svg>
  );
}
