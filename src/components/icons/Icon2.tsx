import { cn } from "@/utils/cn"

export default function TaskIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("w-16 h-16 dark:text-neutral-700 text-neutral-300 hover:text-orange-500 transition-transform duration-300 hover:scale-[1.02]", className)}
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

        {/* Abstract book/task stack */}
        <path d="M-12 6h24v12h-24V6zm-3-9h18v6h-18V-3z" className="fill-current opacity-100" />
      </g>

      {/* Subtle sparkle accent */}
      {/* <path d="M44 24l-2 3 3-2 3 2-2-3 2-3-3 2-3-2z" className="fill-neutral-300/70" /> */}
    </svg>
  );
}
