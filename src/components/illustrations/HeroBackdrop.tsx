/**
 * HeroBackdrop — original decorative background for the SmartFin Compass hero.
 * Deep navy gradient atmosphere with flowing emerald/cyan ribbons, ambient
 * glows, subtle tech grid and floating particles. Purely decorative.
 */
export default function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Deep navy gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_10%,#0b2545_0%,#07172c_45%,#04101f_100%)]" />

      {/* Tech grid */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-25" />

      {/* Ambient glows */}
      <div className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[150px] animate-pulse-glow" />
      <div className="absolute right-0 top-10 h-[460px] w-[460px] rounded-full bg-emerald-500/15 blur-[150px] animate-pulse-glow delay-300" />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[130px]" />
      <div className="absolute bottom-10 left-0 h-[360px] w-[560px] rounded-full bg-brand-green-500/10 blur-[140px]" />

      {/* Flowing ribbon waves — bottom sweep */}
      <svg
        className="absolute bottom-0 left-0 h-[62%] w-full"
        viewBox="0 0 1440 520"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hbRibbonA" x1="0" y1="0" x2="1440" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22b573" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="hbRibbonB" x1="0" y1="0" x2="1440" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="hbRibbonC" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ecfdf5" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#a5f3fc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.3" />
          </linearGradient>
          <filter id="hbSoft" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <path
          d="M-80 470 C 240 340, 520 500, 820 400 C 1080 316, 1280 380, 1520 300"
          stroke="url(#hbRibbonA)"
          strokeWidth="90"
          strokeLinecap="round"
          filter="url(#hbSoft)"
          opacity="0.55"
        />
        <path
          d="M-80 500 C 260 400, 560 540, 880 440 C 1140 360, 1320 420, 1520 350"
          stroke="url(#hbRibbonB)"
          strokeWidth="46"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M-80 522 C 300 452, 640 560, 980 470 C 1200 412, 1340 452, 1520 402"
          stroke="url(#hbRibbonC)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Flowing ribbon waves — top-left sweep */}
      <svg
        className="absolute -left-10 top-0 h-[45%] w-[70%]"
        viewBox="0 0 900 420"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hbTopA" x1="0" y1="0" x2="900" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22b573" stopOpacity="0.1" />
          </linearGradient>
          <filter id="hbTopSoft" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <path
          d="M-60 60 C 200 40, 340 180, 560 210 C 740 236, 820 320, 900 400"
          stroke="url(#hbTopA)"
          strokeWidth="70"
          strokeLinecap="round"
          opacity="0.4"
          filter="url(#hbTopSoft)"
        />
        <path
          d="M-60 30 C 220 20, 380 140, 600 170 C 780 196, 840 260, 900 330"
          stroke="url(#hbTopA)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* Abstract flowing data lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M-100 200 Q 350 400, 800 150 T 1600 300" stroke="url(#hbLineA)" strokeWidth="1.5" />
        <path d="M-100 450 Q 400 150, 950 500 T 1600 250" stroke="url(#hbLineB)" strokeWidth="1" strokeDasharray="6 6" />
        <defs>
          <linearGradient id="hbLineA" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="hbLineB" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating particles */}
      <div className="absolute left-12 top-28 h-2 w-2 rounded-full bg-cyan-400/70 shadow-[0_0_10px_rgba(6,182,212,0.9)] animate-particle" />
      <div className="absolute right-28 top-40 h-2.5 w-2.5 rounded-full bg-emerald-400/70 shadow-[0_0_12px_rgba(16,185,129,0.9)] animate-particle delay-300" />
      <div className="absolute left-1/3 bottom-36 h-1.5 w-1.5 rounded-full bg-blue-400/70 shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-particle delay-500" />
      <div className="absolute right-1/3 top-24 h-1.5 w-1.5 rounded-full bg-brand-green-400/70 shadow-[0_0_8px_rgba(34,181,115,0.9)] animate-particle delay-400" />
    </div>
  );
}
