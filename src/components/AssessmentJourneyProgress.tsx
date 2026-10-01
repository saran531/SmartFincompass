import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalculateIcon from "@mui/icons-material/Calculate";
import HomeIcon from "@mui/icons-material/Home";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SavingsIcon from "@mui/icons-material/Savings";
import ShieldIcon from "@mui/icons-material/Shield";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import DescriptionIcon from "@mui/icons-material/Description";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CheckIcon from "@mui/icons-material/Check";
import menImg from "../Assets/images/men.png";

export interface JourneyStep {
  label: string;
  icon: ElementType;
  tint?: string;
}

export interface AssessmentJourneyProgressProps {
  currentStep: number;
  totalSteps?: number;
  steps?: JourneyStep[];
  title?: string;
  subtitle?: string;
  headerExtra?: ReactNode;
}

const DEFAULT_STEPS: JourneyStep[] = [
  { label: "Personal Info", icon: PersonIcon, tint: "bg-sky-100 text-sky-600" },
  { label: "Employment Details", icon: WorkIcon, tint: "bg-violet-100 text-violet-600" },
  { label: "Income Details", icon: AccountBalanceWalletIcon, tint: "bg-emerald-100 text-emerald-600" },
  { label: "Monthly Expenses", icon: CalculateIcon, tint: "bg-amber-100 text-amber-600" },
  { label: "Assets", icon: HomeIcon, tint: "bg-indigo-100 text-indigo-600" },
  { label: "Liabilities", icon: RequestQuoteIcon, tint: "bg-rose-100 text-rose-600" },
  { label: "Savings", icon: SavingsIcon, tint: "bg-teal-100 text-teal-600" },
  { label: "Insurance", icon: ShieldIcon, tint: "bg-sky-100 text-sky-700" },
  { label: "Investment Experience", icon: ShowChartIcon, tint: "bg-fuchsia-100 text-fuchsia-600" },
  { label: "Financial Goals", icon: TrackChangesIcon, tint: "bg-red-100 text-red-500" },
  { label: "Documents", icon: DescriptionIcon, tint: "bg-cyan-100 text-cyan-600" },
  { label: "Review & Submit", icon: EmojiEventsIcon, tint: "bg-amber-100 text-amber-500" },
];

const JOURNEY_H = 300;
const INNER_MIN_W = 1120;

interface Pt {
  x: number;
  y: number;
}

function buildPoints(width: number, height: number, count: number): Pt[] {
  const x0 = width * 0.055;
  const x1 = width * 0.945;
  const pts: Pt[] = [];
  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0;
    const base = 0.62 - 0.34 * t;
    const wave = Math.sin(i * 1.9) * 0.05;
    const fy = Math.min(0.66, Math.max(0.3, base + wave));
    pts.push({
      x: x0 + (x1 - x0) * t,
      y: height * fy,
    });
  }
  return pts;
}

function smoothPath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function milestoneFractions(pts: Pt[]): number[] {
  const segLens: number[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    let len = 0;
    let prev = p1;
    const steps = 24;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const mt = 1 - t;
      const x =
        mt * mt * mt * p1.x + 3 * mt * mt * t * c1.x + 3 * mt * t * t * c2.x + t * t * t * p2.x;
      const y =
        mt * mt * mt * p1.y + 3 * mt * mt * t * c1.y + 3 * mt * t * t * c2.y + t * t * t * p2.y;
      len += Math.hypot(x - prev.x, y - prev.y);
      prev = { x, y };
    }
    segLens.push(len);
  }
  const total = segLens.reduce((a, b) => a + b, 0) || 1;
  const fr: number[] = [0];
  let acc = 0;
  for (const l of segLens) {
    acc += l;
    fr.push(acc / total);
  }
  return fr;
}

function Cloud({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      className={`journey-cloud absolute rounded-full bg-white/90 ${className ?? ""}`}
      style={{
        boxShadow: "26px 6px 0 -8px rgba(255,255,255,0.9), 52px 2px 0 -12px rgba(255,255,255,0.85)",
        ...style,
      }}
    />
  );
}

export default function AssessmentJourneyProgress({
  currentStep,
  totalSteps = 12,
  steps,
  title,
  subtitle,
  headerExtra,
}: AssessmentJourneyProgressProps) {
  const allSteps = steps && steps.length > 0 ? steps : DEFAULT_STEPS;
  const count = Math.min(totalSteps, allSteps.length);
  const shownSteps = allSteps.slice(0, count);
  const idx = Math.min(Math.max(currentStep, 1), count) - 1;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const lastLenRef = useRef<number | null>(null);
  const lastDRef = useRef<string | null>(null);
  const lastScrollRef = useRef<number | null>(null);

  const [width, setWidth] = useState(INNER_MIN_W);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(el.offsetWidth, INNER_MIN_W));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const points = useMemo(() => buildPoints(width, JOURNEY_H, count), [width, count]);
  const pathD = useMemo(() => smoothPath(points), [points]);
  const fractions = useMemo(() => milestoneFractions(points), [points]);
  const targetLen = fractions[idx] ?? 0;

  // Keep the active milestone visible when the strip scrolls horizontally
  useEffect(() => {
    const wrap = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const marker = inner.querySelector<HTMLElement>(`[data-step="${idx}"]`);
    if (!marker) return;
    const left = marker.offsetLeft - wrap.clientWidth / 2 + marker.offsetWidth / 2;
    wrap.scrollTo({
      left: Math.max(0, left),
      behavior: lastScrollRef.current === null ? "auto" : "smooth",
    });
    lastScrollRef.current = idx;
  }, [idx, width]);

  // Climb the climber along the rope (forward and backward)
  useEffect(() => {
    const path = ropeRef.current;
    const el = charRef.current;
    if (!path || !el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = (len: number, dir: 1 | -1, bob = 0, tilt = 0) => {
      const total = path.getTotalLength();
      const at = Math.max(0, Math.min(total, len - 50));
      const p = path.getPointAtLength(at);
      el.style.visibility = "visible";
      el.style.transform = `translate(${p.x.toFixed(2)}px, ${(p.y + bob).toFixed(2)}px) translate(-50%, -100%) rotate(${tilt}deg) scaleX(${dir})`;
    };

    const total = path.getTotalLength();
    const target = total * targetLen;

    if (lastDRef.current !== pathD || lastLenRef.current === null || reduce) {
      lastDRef.current = pathD;
      lastLenRef.current = target;
      place(target, 1);
      return;
    }

    const from = lastLenRef.current;
    if (Math.abs(from - target) < 0.5) return;
    const dir: 1 | -1 = target >= from ? 1 : -1;
    const duration = 1000;
    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const len = from + (target - from) * eased;
      const bounce = Math.sin(t * Math.PI * 3) * -5 * (1 - t);
      const tilt = Math.sin(t * Math.PI * 2) * 3 * (1 - t);
      place(len, dir, bounce, tilt);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        lastLenRef.current = target;
        place(target, dir);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetLen, pathD]);

  const completedFrac = (fractions[idx] ?? 0) * 1000;
  const lastPoint = points[points.length - 1];

  return (
    <div className="relative mb-4 overflow-hidden rounded-3xl border border-sky-200/70 bg-gradient-to-b from-sky-100 via-[#eef8ff] to-[#e9faf0] shadow-[0_18px_46px_-20px_rgba(13,37,73,0.28)]">
      <style>{`
        @keyframes journeyPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,181,115,0.55), 0 0 18px rgba(34,181,115,0.45); }
          50% { box-shadow: 0 0 0 9px rgba(34,181,115,0), 0 0 28px rgba(34,181,115,0.65); }
        }
        @keyframes journeyBraid { to { stroke-dashoffset: -36; } }
        @keyframes journeyIdle {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        @keyframes journeyCloud {
          from { transform: translateX(-12px); }
          to { transform: translateX(14px); }
        }
        @keyframes journeyFlag {
          0%, 100% { transform: skewY(0deg); }
          50% { transform: skewY(-8deg); }
        }
        .journey-pulse { animation: journeyPulse 1.8s ease-in-out infinite; }
        .journey-braid { animation: journeyBraid 1.1s linear infinite; }
        .journey-climber { animation: journeyIdle 2.2s ease-in-out infinite; }
        .journey-cloud { animation: journeyCloud 13s ease-in-out infinite alternate; }
        .journey-flag { animation: journeyFlag 1.7s ease-in-out infinite; transform-origin: left center; }
        .journey-scroll { scrollbar-width: none; }
        .journey-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .journey-pulse, .journey-braid, .journey-climber, .journey-cloud, .journey-flag { animation: none !important; }
        }
      `}</style>

      {/* ─── Sky / atmosphere ─── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[7%] top-[4%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95),rgba(255,255,255,0))] blur-[2px]" />
        <Cloud className="left-[4%] top-[10%] h-6 w-16" />
        <Cloud className="right-[18%] top-[7%] h-7 w-20" style={{ animationDelay: "2.5s" }} />
        <Cloud className="left-[38%] top-[4%] h-5 w-14" style={{ animationDelay: "5s" }} />
        <Cloud className="left-[16%] top-[24%] h-5 w-14 opacity-70" style={{ animationDelay: "7s" }} />
        <Cloud className="right-[6%] top-[26%] h-5 w-16 opacity-70" style={{ animationDelay: "3.5s" }} />
      </div>

      {/* ─── Mountain landscape ─── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 340"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] w-full"
      >
        <defs>
          <linearGradient id="jFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d7ebfb" />
            <stop offset="100%" stopColor="#b3d2f0" />
          </linearGradient>
          <linearGradient id="jMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a9cbea" />
            <stop offset="100%" stopColor="#7fadd9" />
          </linearGradient>
          <linearGradient id="jNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#89b8e0" />
            <stop offset="100%" stopColor="#5a93c9" />
          </linearGradient>
          <linearGradient id="jHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8ad9ab" />
            <stop offset="100%" stopColor="#3fae7f" />
          </linearGradient>
          <linearGradient id="jHillFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5cc190" />
            <stop offset="100%" stopColor="#2f9b73" />
          </linearGradient>
        </defs>

        {/* Far range */}
        <polygon
          fill="url(#jFar)"
          points="0,340 0,225 80,160 155,215 245,125 330,220 415,165 505,240 610,135 705,230 795,155 885,235 975,145 1075,230 1150,180 1200,225 1200,340"
        />
        {/* Snow caps — far */}
        <polygon fill="#f2f9ff" points="245,125 278,175 262,168 246,180 228,166 210,178" />
        <polygon fill="#f2f9ff" points="610,135 644,186 628,178 612,192 594,176 576,190" />
        <polygon fill="#f2f9ff" points="975,145 1008,194 992,188 976,200 960,186 944,196" />
        <polygon fill="#f2f9ff" points="80,160 106,202 94,196 80,208 66,194 54,204" />

        {/* Mid range */}
        <polygon
          fill="url(#jMid)"
          points="0,340 0,262 110,205 210,262 330,190 450,265 560,215 690,268 820,200 940,268 1060,215 1160,262 1200,245 1200,340"
        />
        <polygon fill="#e8f3fd" points="330,190 362,238 346,232 330,244 314,230 298,242" />
        <polygon fill="#e8f3fd" points="820,200 852,247 836,241 820,254 804,240 788,250" />

        {/* Main near peak */}
        <polygon fill="url(#jNear)" points="390,340 700,72 1010,340" />
        <polygon fill="#f6fbff" points="700,72 762,158 736,148 712,168 686,146 656,160" />
        <polygon fill="#6ea3d3" points="700,72 1010,340 830,340" opacity="0.35" />
        {/* Left near ridge */}
        <polygon fill="url(#jNear)" points="-40,340 175,150 420,340" opacity="0.9" />
        <polygon fill="#f6fbff" points="175,150 214,208 198,200 180,216 160,198 142,212" />

        {/* Rolling hills */}
        <path
          fill="url(#jHill)"
          d="M0,340 L0,278 Q140,240 300,270 T600,258 T900,272 T1200,256 L1200,340 Z"
        />
        <path
          fill="url(#jHillFront)"
          d="M0,340 L0,312 Q180,282 360,306 T720,300 T1060,310 L1200,304 L1200,340 Z"
        />

        {/* Pine trees along the hills */}
        <g fill="#2e8b68">
          <path d="M52,296 l11,-30 l11,30 z" />
          <path d="M96,302 l9,-24 l9,24 z" />
          <path d="M150,292 l12,-32 l12,32 z" />
          <path d="M232,298 l10,-27 l10,27 z" />
          <path d="M308,304 l9,-23 l9,23 z" />
          <path d="M388,296 l11,-29 l11,29 z" />
          <path d="M470,302 l9,-24 l9,24 z" />
          <path d="M548,294 l11,-30 l11,30 z" />
          <path d="M636,304 l9,-23 l9,23 z" />
          <path d="M718,297 l10,-27 l10,27 z" />
          <path d="M802,303 l9,-24 l9,24 z" />
          <path d="M884,296 l11,-30 l11,30 z" />
          <path d="M968,303 l9,-23 l9,23 z" />
          <path d="M1046,297 l10,-27 l10,27 z" />
          <path d="M1124,303 l9,-24 l9,24 z" />
          <path d="M1176,296 l10,-27 l10,27 z" />
        </g>
        <g fill="#237a5a">
          <path d="M20,330 l10,-26 l10,26 z" />
          <path d="M120,334 l9,-23 l9,23 z" />
          <path d="M260,332 l10,-26 l10,26 z" />
          <path d="M430,336 l9,-22 l9,22 z" />
          <path d="M600,332 l10,-26 l10,26 z" />
          <path d="M770,336 l9,-23 l9,23 z" />
          <path d="M930,332 l10,-26 l10,26 z" />
          <path d="M1090,336 l9,-22 l9,22 z" />
        </g>
      </svg>

      {/* ─── Header: title + subtitle + step chip ─── */}
      <div className="relative z-20 flex flex-col gap-3 px-6 pt-6 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:pt-7">
        <div className="min-w-0">
          {headerExtra}
          {title && (
            <h1 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-2 max-w-xl text-[15px] font-medium leading-relaxed text-navy-900/75 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-brand-green-300/70 bg-white/85 px-3.5 py-1.5 text-xs font-extrabold text-brand-green-700 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-brand-green-500" />
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* ─── Rope journey (scrollable on small screens) ─── */}
      <div ref={wrapperRef} className="journey-scroll relative z-10 mt-1 overflow-x-auto overflow-y-hidden">
        <div
          ref={innerRef}
          className="relative"
          style={{ height: JOURNEY_H, minWidth: INNER_MIN_W }}
        >
          {/* Rope */}
          <svg
            className="absolute inset-0"
            width={width}
            height={JOURNEY_H}
            viewBox={`0 0 ${width} ${JOURNEY_H}`}
            aria-hidden="true"
          >
            {/* Rope shadow */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(13,37,73,0.18)"
              strokeWidth={9}
              strokeLinecap="round"
              transform="translate(0,5)"
            />
            {/* Base rope */}
            <path
              ref={ropeRef}
              d={pathD}
              fill="none"
              stroke="#b9772f"
              strokeWidth={8}
              strokeLinecap="round"
            />
            {/* Rope body highlight */}
            <path
              d={pathD}
              fill="none"
              stroke="#e8a35c"
              strokeWidth={5}
              strokeLinecap="round"
            />
            {/* Braided texture */}
            <path
              className="journey-braid"
              d={pathD}
              fill="none"
              stroke="#8a5522"
              strokeWidth={2.6}
              strokeDasharray="9 8"
              strokeLinecap="round"
              opacity={0.75}
            />
            {/* Completed (green) portion */}
            <path
              d={pathD}
              fill="none"
              stroke="#16a34a"
              strokeWidth={8}
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray={`${completedFrac} 1000`}
              style={{ transition: "stroke-dasharray 1000ms ease-in-out" }}
            />
            <path
              d={pathD}
              fill="none"
              stroke="#bbf7d0"
              strokeWidth={2.6}
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray={`${completedFrac} 1000`}
              style={{ transition: "stroke-dasharray 1000ms ease-in-out" }}
              opacity={0.85}
            />
          </svg>

          {/* Destination flag on the final milestone */}
          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: lastPoint.x,
              top: lastPoint.y - 58,
              transform: "translateX(-50%)",
            }}
            aria-hidden="true"
          >
            <svg width="46" height="56" viewBox="0 0 46 56" fill="none">
              <rect x="21" y="8" width="4" height="48" rx="2" fill="#0f766e" />
              <g className="journey-flag">
                <path d="M25 8 L44 14 L25 22 Z" fill="#16a34a" />
                <path d="M25 8 L44 14 L25 22 Z" fill="url(#flagGrad)" opacity="0.55" />
              </g>
              <circle cx="23" cy="7" r="4" fill="#facc15" />
              <defs>
                <linearGradient id="flagGrad" x1="25" y1="8" x2="44" y2="22">
                  <stop stopColor="#86efac" />
                  <stop offset="100" stopColor="#15803d" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Milestones */}
          {shownSteps.map((step, i) => {
            const p = points[i];
            if (!p) return null;
            const state = i < idx ? "completed" : i === idx ? "active" : "future";
            const Icon = step.icon;

            const circleCls =
              state === "active"
                ? "h-10 w-10 border-[3px] border-white bg-gradient-to-br from-emerald-400 to-brand-green-600 text-white text-[14px] font-extrabold shadow-[0_0_20px_rgba(34,181,115,0.6)] journey-pulse"
                : state === "completed"
                ? "h-8 w-8 border-2 border-white bg-brand-green-500 text-white text-xs font-extrabold shadow-[0_0_14px_rgba(34,181,115,0.45)]"
                : "h-8 w-8 border-2 border-sky-300/80 bg-white text-navy-950 text-xs font-bold shadow-sm";

            const cardCls =
              state === "active"
                ? "border-brand-green-400 bg-white shadow-[0_6px_18px_rgba(24,154,99,0.25)] ring-2 ring-brand-green-500/25"
                : state === "completed"
                ? "border-brand-green-300 bg-brand-green-50/95 shadow-sm"
                : "border-sky-200/80 bg-white/85 shadow-sm";

            const labelCls =
              state === "active"
                ? "text-navy-950 font-extrabold"
                : state === "completed"
                ? "text-brand-green-800 font-bold"
                : "text-navy-900/70 font-bold";

            const iconCls =
              step.tint ??
              (state === "future" ? "bg-slate-100 text-slate-500" : "bg-sky-100 text-sky-600");

            return (
              <div
                key={step.label}
                data-step={i}
                className="absolute flex -translate-x-1/2 flex-col items-center"
                style={{ left: p.x, top: p.y - 18, width: 84 }}
              >
                <span
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ${circleCls}`}
                >
                  {i + 1}
                  {state === "completed" && (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-emerald-500 text-white">
                      <CheckIcon sx={{ fontSize: 11 }} />
                    </span>
                  )}
                </span>
                <div
                  className={`mt-1.5 w-[84px] rounded-xl border px-1 py-1.5 text-center transition-all duration-500 ${cardCls}`}
                >
                  <span
                    className={`mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-md ${iconCls}`}
                  >
                    <Icon sx={{ fontSize: 14 }} />
                  </span>
                  <p className={`text-[12px] leading-[1.15] ${labelCls}`}>{step.label}</p>
                </div>
              </div>
            );
          })}

          {/* Journey character following the rope (men.png) */}
          <div
            ref={charRef}
            className="pointer-events-none absolute left-0 top-0 z-20 will-change-transform"
            style={{ visibility: "hidden" }}
            aria-hidden="true"
          >
            <div className="journey-climber">
              <img
                src={menImg}
                alt=""
                draggable={false}
                className="block h-[60px] w-auto sm:h-[72px] md:h-[80px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
