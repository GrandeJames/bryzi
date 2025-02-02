export default function TaskIcon() {
    return (
      <svg
        viewBox="0 0 64 64"
        className="w-16 h-16 text-orange-500 hover:text-orange-600 transition-transform duration-300 hover:scale-[1.02]"
      >
        {/* Concentric timeline rings */}
        <circle cx="32" cy="32" r="24" className="fill-none stroke-current opacity-10" />
        <circle cx="32" cy="32" r="18" className="fill-none stroke-current opacity-15" />
        
        {/* Central core symbol */}
        <g transform="translate(32 32) scale(0.9)">
          {/* Automation wave */}
          <path
            d="M-18 0c0-10 9-18 18-18s18 8 18 18c0 10-9 18-18 18s-18-8-18-18z"
            className="fill-current opacity-20"
          />
          
          {/* Progress pie chart (dynamic element) */}
          <path
            d="M0 -18A18 18 0 1 1 0 18L0 -18z"
            className="fill-orange-100 origin-center animate-spin-slow"
            style={{ transform: 'rotate(120deg)' }}
          />
          
          {/* Abstract book/task stack */}
          <path
            d="M-12 6h24v12h-24V6zm-3-9h18v6h-18V-3z"
            className="fill-current opacity-90"
          />
        
        </g>
        
         {/* Subtle sparkle accent */}
         <path d="M44 24l-2 3 3-2 3 2-2-3 2-3-3 2-3-2z" className="fill-orange-300/70" />
      </svg>
    );
  }


//   module.exports = {
//     theme: {
//       extend: {
//         colors: {
//           orange: {
//             100: '#ffedd5',
//             200: '#fed7aa',
//             300: '#fdba74',
//             400: '#fb923c',
//             500: '#f97316',
//             600: '#ea580c',
//           }
//         },
//         animation: {
//           'spin-slow': 'spin 8s linear infinite',
//           'pulse': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
//         }
//       }
//     }
//   }