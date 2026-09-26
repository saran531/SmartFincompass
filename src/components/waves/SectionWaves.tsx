import React from "react";
import sectionWaveLight from "../../Assets/images/section-wave-light.svg";
import testimonialWave from "../../Assets/images/testimonial-wave.svg";

/**
 * Layered section transitions for the SmartFin Compass home page.
 * Uses the provided wave assets as the fill shape and adds a soft
 * emerald/cyan accent glow along the curve for the premium fintech look.
 * Existing component names/exports stay the same.
 */

/* Top edge of section-wave-light.svg */
const EDGE_LIGHT = "M0 0 C 240 70, 480 100, 720 70 C 960 40, 1200 80, 1440 30";
/* Top edge of testimonial-wave.svg */
const EDGE_DARK = "M0 0 C 320 80, 640 100, 960 40 C 1120 10, 1280 30, 1440 60";

type WaveTone = "light" | "dark";

interface WaveProps {
  /** Colour the transition flows into: light section or dark navy section */
  tone: WaveTone;
  className?: string;
}

const LayeredWave: React.FC<WaveProps> = ({ tone, className = "" }) => {
  const isLight = tone === "light";
  const id = isLight ? "swl" : "swd";
  const edge = isLight ? EDGE_LIGHT : EDGE_DARK;

  const accentFrom = isLight ? "#22b573" : "#2563eb";
  const accentMid = isLight ? "#06b6d4" : "#06b6d4";
  const lineFrom = isLight ? "#6ee7b7" : "#60a5fa";
  const lineMid = isLight ? "#22d3ee" : "#22d3ee";
  const lineTo = isLight ? "#60a5fa" : "#34d399";

  return (
    <div
      aria-hidden="true"
      className={`relative w-full max-w-full overflow-hidden leading-none z-20 pointer-events-none ${className}`}
    >
      {/* Coloured accent glow sitting behind the wave fill */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={accentFrom} />
            <stop offset="50%" stopColor={accentMid} />
            <stop offset="100%" stopColor={accentFrom} />
          </linearGradient>
          <filter id={`${id}-soft`} x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <path
          d={edge}
          stroke={`url(#${id}-accent)`}
          strokeWidth="44"
          strokeLinecap="round"
          opacity="0.5"
          filter={`url(#${id}-soft)`}
        />
      </svg>

      <div className="relative h-14 w-full sm:h-20 md:h-24 lg:h-28">
        {/* Provided wave asset (fill shape) */}
        <img
          src={isLight ? sectionWaveLight : testimonialWave}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full select-none"
        />

        {/* Glowing edge line (the dark asset already ships its own line) */}
        {isLight && (
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={lineFrom} />
                <stop offset="50%" stopColor={lineMid} />
                <stop offset="100%" stopColor={lineTo} />
              </linearGradient>
            </defs>
            <path d={EDGE_LIGHT} stroke={`url(#${id}-line)`} strokeWidth="3" />
          </svg>
        )}
      </div>
    </div>
  );
};

/* 1. Hero (deep navy) → Features (white) */
export const HeroToFeaturesWave: React.FC = () => <LayeredWave tone="light" className="-mb-1" />;

/* 2. Features (white) → How It Works (deep navy)
   Negative margin cancels the section's bottom padding so the wave
   sits flush against the next section (no colour band in between). */
export const FeaturesToHowItWorksWave: React.FC = () => (
  <LayeredWave tone="dark" className="-mb-16 mt-12 sm:mt-20 lg:-mb-24" />
);

/* 3. How It Works (deep navy) → Benefits (light) */
export const HowItWorksToBenefitsWave: React.FC = () => (
  <LayeredWave tone="light" className="-mb-16 lg:-mb-24" />
);

/* 4. Benefits (light) → Testimonials (deep navy) */
export const BenefitsToTestimonialsWave: React.FC = () => (
  <LayeredWave tone="dark" className="-mb-16 mt-12 sm:mt-20 lg:-mb-24" />
);

/* 5. Testimonials (deep navy) → FAQ (white) */
export const TestimonialsToFaqWave: React.FC = () => (
  <LayeredWave tone="light" className="-mb-16 lg:-mb-24" />
);
