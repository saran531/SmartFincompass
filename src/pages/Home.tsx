import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import PlayCircleIcon from "@mui/icons-material/PlayCircleOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MapIcon from "@mui/icons-material/Map";
import ShieldIcon from "@mui/icons-material/Shield";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BarChartIcon from "@mui/icons-material/BarChart";
import MemoryIcon from "@mui/icons-material/Memory";

// ─── Reusable Section Transitions ───
import {
  HeroToFeaturesWave,
  FeaturesToHowItWorksWave,
  HowItWorksToBenefitsWave,
  BenefitsToTestimonialsWave,
  TestimonialsToFaqWave,
} from "../components/waves/SectionWaves";

// ─── Original SmartFin Compass Illustration Assets ───
import HeroBackdrop from "../components/illustrations/HeroBackdrop";
import RupeeCoins from "../components/illustrations/RupeeCoins";

// ─── Provided background / decoration assets ───
import heroBgLeft from "../Assets/images/hero-bg-left.svg";
import heroBgRight from "../Assets/images/hero-bg-right.svg";
import newsletterBg from "../Assets/images/newsletter-bg.svg";
import rocketImg from "../Assets/images/Rocket.png";
import growthChartImg from "../Assets/images/growthchart.png";
import contactImg from "../Assets/images/contactimage.png";
import lightImg from "../Assets/images/light.png";
import yourGoalsImg from "../Assets/images/yourgoals.png";
import builtAroundImg from "../Assets/images/BuiltAround.png";
import yourImg from "../Assets/images/your.png";
import faqQaImg from "../Assets/images/QA.png";
import paperRocketImg from "../Assets/images/PaperRocket.png";
import leafImg from "../Assets/images/Leaf.png";

// ─── Decorative corner leaf ───
function Leaf({ className }: { className?: string }) {
  return (
    <img
      src={leafImg}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none select-none ${className ?? ""}`}
    />
  );
}

const SCORE_BREAKDOWN = [
  { label: "Income Stability", value: 85 },
  { label: "Savings Rate", value: 72 },
  { label: "Debt Management", value: 65 },
  { label: "Investment Readiness", value: 88 },
  { label: "Emergency Fund", value: 75 },
];

const ROADMAP = [
  {
    icon: SavingsIcon,
    color: "text-sky-600 bg-sky-500/10",
    title: "Build Emergency Fund",
    time: "0-3 Months",
  },
  {
    icon: CreditCardOffIcon,
    color: "text-rose-600 bg-rose-500/10",
    title: "Clear High-Interest Debt",
    time: "3-6 Months",
  },
  {
    icon: TrendingUpIcon,
    color: "text-brand-green-600 bg-brand-green-500/10",
    title: "Invest for Growth",
    time: "6-12 Months",
  },
  {
    icon: AccountBalanceIcon,
    color: "text-violet-600 bg-violet-500/10",
    title: "Wealth Building",
    time: "12+ Months",
  },
];

const FEATURES = [
  {
    icon: BarChartIcon,
    color: "text-purple-600 bg-purple-100 group-hover:bg-purple-600 group-hover:text-white shadow-xs",
    cardBg: "bg-white border-purple-200/80 ring-1 ring-purple-500/10 hover:border-purple-400 hover:ring-purple-500/25",
    activeCardBg: "border-purple-500 bg-purple-50/70 shadow-[0_18px_45px_-18px_rgba(147,51,234,0.35)]",
    title: "AI Financial Analysis",
    desc: "Advanced AI analyzes your income, expenses, debts, and investments.",
  },
  {
    icon: MapIcon,
    color: "text-pink-600 bg-pink-100 group-hover:bg-pink-600 group-hover:text-white shadow-xs",
    cardBg: "bg-white border-pink-200/80 ring-1 ring-pink-500/10 hover:border-pink-400 hover:ring-pink-500/25",
    activeCardBg: "border-pink-500 bg-pink-50/70 shadow-[0_18px_45px_-18px_rgba(236,72,153,0.35)]",
    title: "Personalized Roadmap",
    desc: "Get a custom financial plan tailored to your goals and risk profile.",
  },
  {
    icon: TrendingUpIcon,
    color: "text-emerald-600 bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white shadow-xs",
    cardBg: "bg-white border-emerald-200/80 ring-1 ring-emerald-500/10 hover:border-emerald-400 hover:ring-emerald-500/25",
    activeCardBg: "border-emerald-500 bg-emerald-50/70 shadow-[0_18px_45px_-18px_rgba(16,185,129,0.35)]",
    title: "Real-time Tracking",
    desc: "Track your progress with interactive dashboards and insights.",
  },
  {
    icon: ShieldIcon,
    color: "text-sky-600 bg-sky-100 group-hover:bg-sky-600 group-hover:text-white shadow-xs",
    cardBg: "bg-white border-sky-200/80 ring-1 ring-sky-500/10 hover:border-sky-400 hover:ring-sky-500/25",
    activeCardBg: "border-sky-500 bg-sky-50/70 shadow-[0_18px_45px_-18px_rgba(14,165,233,0.35)]",
    title: "Risk Assessment",
    desc: "Understand your financial risks and get expert recommendations.",
  },
  {
    icon: NotificationsActiveIcon,
    color: "text-amber-600 bg-amber-100 group-hover:bg-amber-600 group-hover:text-white shadow-xs",
    cardBg: "bg-white border-amber-200/80 ring-1 ring-amber-500/10 hover:border-amber-400 hover:ring-amber-500/25",
    activeCardBg: "border-amber-500 bg-amber-50/70 shadow-[0_18px_45px_-18px_rgba(245,158,11,0.35)]",
    title: "Smart Alerts",
    desc: "Receive timely alerts and reminders to stay on track with your goals.",
  },
];

const STEPS = [
  {
    icon: PersonIcon,
    step: 1,
    badgeBg: "bg-brand-green-500",
    iconContainerBg: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
    title: "Create Your Profile",
    desc: "Sign up and share your basic financial information securely.",
  },
  {
    icon: DescriptionIcon,
    step: 2,
    badgeBg: "bg-cyan-500",
    iconContainerBg: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    title: "AI Analysis",
    desc: "Our AI analyzes your financial health across 100+ data points.",
  },
  {
    icon: ExploreIcon,
    step: 3,
    badgeBg: "bg-purple-500",
    iconContainerBg: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    title: "Get Your Roadmap",
    desc: "Receive a personalized financial roadmap with actionable steps.",
  },
  {
    icon: RocketLaunchIcon,
    step: 4,
    badgeBg: "bg-amber-500",
    iconContainerBg: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    title: "Track & Grow",
    desc: "Track your progress and achieve your financial goals.",
  },
];

const BENEFITS = [
  {
    icon: VerifiedUserIcon,
    iconContainerBg: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    cardBg: "bg-white border-emerald-200/80 ring-1 ring-emerald-500/10 hover:border-emerald-400 hover:ring-emerald-500/25",
    highlight: "100%",
    tag: "Secure & Private",
    desc: "Bank-level security to protect your data",
  },
  {
    icon: MemoryIcon,
    iconContainerBg: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    cardBg: "bg-white border-emerald-200/80 ring-1 ring-emerald-500/10 hover:border-emerald-400 hover:ring-emerald-500/25",
    highlight: "AI",
    tag: "Powered Insights",
    desc: "Advanced AI & machine learning algorithms",
  },
  {
    icon: PersonIcon,
    iconContainerBg: "bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
    cardBg: "bg-white border-sky-200/80 ring-1 ring-sky-500/10 hover:border-sky-400 hover:ring-sky-500/25",
    highlight: "Personalized",
    tag: "Just for You",
    desc: "Tailored recommendations based on your goals",
  },
  {
    icon: SavingsIcon,
    iconContainerBg: "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    cardBg: "bg-white border-amber-200/80 ring-1 ring-amber-500/10 hover:border-amber-400 hover:ring-amber-500/25",
    highlight: "Save More",
    tag: "Build Wealth",
    desc: "Optimized strategies to maximize your savings",
  },
  {
    icon: EmojiEventsIcon,
    iconContainerBg: "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    cardBg: "bg-white border-amber-200/80 ring-1 ring-amber-500/10 hover:border-amber-400 hover:ring-amber-500/25",
    highlight: "Achieve Goals",
    tag: "Faster",
    desc: "Structured roadmap to financial freedom",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SmartFin Compass gave me clarity about my finances like never before. I'm now on track to achieve my dreams!",
    name: "Rohit Sharma",
    role: "IT Professional",
    color: "#1c3f73",
  },
  {
    quote:
      "The personalized roadmap is incredible. I was able to clear my debt and start investing with confidence.",
    name: "Priya Mehta",
    role: "Business Consultant",
    color: "#e07a9e",
  },
  {
    quote:
      "An amazing platform for anyone serious about their financial future. Highly recommended!",
    name: "Amit Verma",
    role: "Marketing Manager",
    color: "#22b573",
  },
];

const FAQS = [
  {
    q: "Is my financial data secure?",
    a: "Yes, we use bank-level encryption and security protocols to ensure your data is 100% safe and private.",
  },
  {
    q: "How accurate is the AI analysis?",
    a: "Our AI analyzes over 100 data points using advanced machine learning algorithms to provide highly accurate financial insights and recommendations.",
  },
  {
    q: "Can I update my information later?",
    a: "Yes, you can update your financial information at any time from your dashboard. Changes will be reflected in your analysis instantly.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes, we offer a free trial so you can explore SmartFin Compass and see how it can help you before committing.",
  },
];

/* ─── Scroll reveal wrapper (fade/slide into view) ─── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`h-full transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown
          ? "translate-y-0 opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100"
          : "translate-y-8 opacity-0 motion-reduce:translate-y-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Glassmorphic floating bubble (decorative) ─── */
function GlassBubble({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none z-0 grid place-items-center rounded-full border border-white/15 bg-white/10 text-cyan-300 shadow-[0_16px_40px_-16px_rgba(2,10,25,0.9)] backdrop-blur-md animate-float ${className}`}
    >
      {children}
    </span>
  );
}

function ScoreGauge({ score, showGood = true }: { score: number; showGood?: boolean }) {
  const radius = 70;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative mx-auto flex h-[150px] w-[200px] items-end justify-center">
      <svg viewBox="0 0 180 100" className="h-full w-full overflow-visible">
        <path
          d="M 20 100 A 70 70 0 0 1 160 100"
          fill="none"
          stroke="rgba(15,23,42,0.10)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 70 70 0 0 1 160 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5a623" />
            <stop offset="55%" stopColor="#f5a623" />
            <stop offset="100%" stopColor="#22b573" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-1 flex flex-col items-center">
        <span className="text-5xl font-extrabold text-navy-950 tracking-tight">{score}</span>
        <span
          className="mt-0.5 text-xs font-bold text-brand-green-600 uppercase tracking-wider transition-opacity duration-500"
          style={{ opacity: showGood ? 1 : 0 }}
        >
          Good
        </span>
      </div>
    </div>
  );
}

/* ─── Hero card count-up animation ─── */
function useCountUp(
  target: number,
  active: boolean,
  duration = 1400,
  delay = 0,
  instant = false
) {
  const [value, setValue] = useState(() => (instant ? target : 0));

  useEffect(() => {
    if (instant || !active) return;
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, active, duration, delay, instant]);

  return value;
}

/* ─── Score breakdown row: counting number + filling bar ─── */
function BreakdownBar({
  label,
  value,
  delay,
  active,
  instant,
}: {
  label: string;
  value: number;
  delay: number;
  active: boolean;
  instant: boolean;
}) {
  const current = useCountUp(value, active, 1100, delay, instant);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
        <span>{label}</span>
        <span className="font-bold text-navy-950">{current}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand-green-400"
          style={{ width: `${current}%` }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [testimonialActive, setTestimonialActive] = useState(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
  const [activeRoadmap, setActiveRoadmap] = useState<number | null>(null);

  /* ─── Hero card entrance + data animation timeline ─── */
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [cardEntered, setCardEntered] = useState(prefersReducedMotion);
  const [dataStarted, setDataStarted] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setCardEntered(true));
    });
    const dataFallback = window.setTimeout(() => setDataStarted(true), 1800);
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.clearTimeout(dataFallback);
    };
  }, [prefersReducedMotion]);

  const heroScore = useCountUp(78, dataStarted, 1400, 0, prefersReducedMotion);
  const showGood = heroScore >= 70;

  const handlePrevTestimonial = () => {
    setTestimonialActive((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setTestimonialActive((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-navy-950 selection:bg-brand-green-500 selection:text-white overflow-x-hidden w-full max-w-full">
      <main>
        {/* ─── HERO ─── */}
        <section
          id="home"
          className="relative overflow-hidden bg-[#04101f] text-white pt-10 lg:pt-16"
        >
          <HeroBackdrop />

          {/* Provided floating fintech bubbles */}
          <img
            src={heroBgLeft}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-4 top-1 z-0 hidden w-14 animate-float select-none lg:block lg:w-16"
          />
          <img
            src={heroBgRight}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute right-4 top-1 z-0 hidden w-14 animate-float delay-300 select-none lg:block lg:w-16"
          />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-10 lg:pb-32">
            <div className="animate-fade-in-up lg:col-span-6 xl:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-green-400/30 bg-brand-green-500/15 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#00E676] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green-300">
                  AI-Powered Financial Wellness
                </span>
              </div>

              <h1 className="text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                Know Your{" "}
                <span className="relative inline-block bg-gradient-to-r from-[#4ade80] via-[#22b573] to-[#2ee88f] bg-clip-text text-transparent">
                  Financial Readiness
                </span>{" "}
                Before You Invest
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg">
                AI-powered financial wellness platform that analyzes your
                complete financial profile and generates a personalized
                financial roadmap.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/login"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#189a63] to-[#22b573] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-14px_rgba(34,181,115,0.7)] transition-all duration-250 hover:brightness-110 cursor-pointer"
                >
                  Start Assessment
                  <ArrowForwardIcon
                    fontSize="small"
                    className="transition-transform duration-250 group-hover/btn:translate-x-1"
                  />
                </Link>
                <button className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-250 hover:border-white/50 hover:bg-white/15 cursor-pointer">
                  <PlayCircleIcon
                    fontSize="small"
                    className="transition-transform duration-250 group-hover/btn:scale-110"
                  />
                  Watch Demo
                </button>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#071426] bg-gradient-to-tr from-blue-600 to-cyan-400 text-xs font-bold text-white shadow-md">
                    RS
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#071426] bg-gradient-to-tr from-pink-500 to-rose-400 text-xs font-bold text-white shadow-md">
                    PM
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#071426] bg-gradient-to-tr from-emerald-500 to-teal-400 text-xs font-bold text-white shadow-md">
                    AV
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Trusted by 10,000+ users
                  </p>
                  <div className="flex items-center gap-1 text-amber-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: 16 }} />
                    ))}
                    <span className="ml-1 text-xs sm:text-sm font-semibold text-slate-300">
                      4.8/5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Financial Visual Dashboard */}
            <div className="relative animate-fade-in-up delay-200 lg:col-span-6 xl:col-span-5">
              {/* Growth chart decoration */}
              <img
                src={growthChartImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute -top-[76px] right-0 z-20 hidden w-36 select-none animate-float lg:block"
              />

              {/* Rupee coins decoration */}
              <RupeeCoins className="absolute -bottom-20 -right-6 z-20 block w-24 animate-float delay-300 lg:-bottom-24 lg:-right-10 lg:w-32" />

              {/* Bank glass bubble on the card corner */}
              <GlassBubble className="absolute -left-6 -top-6 z-20 hidden h-14 w-14 text-cyan-300 lg:grid">
                <AccountBalanceIcon sx={{ fontSize: 24 }} />
              </GlassBubble>

              {/* Dashboard Ambient Glow Backdrop */}
              <div className="pointer-events-none absolute -inset-3 rounded-[34px] bg-gradient-to-r from-cyan-500/25 via-brand-green-500/25 to-blue-500/25 blur-2xl opacity-70 z-0" />

              {/* Main Premium White Dashboard Card (3D rotate-in entrance) */}
              <div
                className="relative z-10 rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.9)] ring-1 ring-black/5 sm:p-8"
                style={{
                  transform: cardEntered
                    ? "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)"
                    : "perspective(1200px) rotateX(7deg) rotateY(-16deg) translateY(26px) scale(0.95)",
                  opacity: cardEntered ? 1 : 0.25,
                  transition: prefersReducedMotion
                    ? "none"
                    : "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out",
                }}
                onTransitionEnd={(e) => {
                  if (
                    !prefersReducedMotion &&
                    e.target === e.currentTarget &&
                    e.propertyName === "transform"
                  ) {
                    setDataStarted(true);
                  }
                }}
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <p className="text-lg font-bold text-navy-950">
                    Your Financial Health Score
                  </p>
                  <AutoAwesomeIcon
                    className="text-[#00E676] animate-pulse-glow"
                    sx={{ fontSize: 24 }}
                  />
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 py-4 px-2">
                    <ScoreGauge score={heroScore} showGood={showGood} />
                    <span className="mt-1 text-xs font-semibold text-slate-500">
                      Keep it up!
                    </span>
                  </div>

                  <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Score Breakdown
                    </p>
                    <div className="space-y-2.5">
                      {SCORE_BREAKDOWN.map((item, i) => (
                        <BreakdownBar
                          key={item.label}
                          label={item.label}
                          value={item.value}
                          delay={i * 130}
                          active={dataStarted}
                          instant={prefersReducedMotion}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Your Personalized Roadmap
                  </p>
                  <p className="mb-3 text-xs font-semibold text-slate-600">
                    Recommended Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {ROADMAP.map((item, i) => {
                      const isActive = activeRoadmap === i;
                      return (
                        <button
                          key={item.title}
                          onClick={() => setActiveRoadmap(isActive ? null : i)}
                          className={`group/roadmap text-left rounded-xl border p-2.5 transition-all duration-300 cursor-pointer ${
                            isActive
                              ? "border-brand-green-500 bg-brand-green-50 shadow-[0_2px_12px_rgba(34,181,115,0.25)]"
                              : "border-slate-200 bg-slate-50 hover:border-brand-green-400 hover:bg-brand-green-50/60"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span
                              className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                                isActive
                                  ? "scale-110 bg-[#189a63] text-white"
                                  : "group-hover/roadmap:scale-105 " + item.color
                              }`}
                            >
                              <item.icon sx={{ fontSize: 16 }} />
                            </span>
                            <div className="min-w-0">
                              <p
                                className={`text-xs font-bold leading-tight transition-colors duration-300 ${
                                  isActive ? "text-brand-green-600" : "text-navy-950"
                                }`}
                              >
                                {item.title}
                              </p>
                              <p
                                className={`mt-0.5 text-[11px] font-medium transition-colors duration-300 ${
                                  isActive ? "text-brand-green-500" : "text-slate-500"
                                }`}
                              >
                                {item.time}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Potential Wealth in 5 Years
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-brand-green-500">
                      ₹28,75,000
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-500">
                      Monthly Savings Potential
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-brand-green-500">
                      ₹12,500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <HeroToFeaturesWave />
        </section>

        {/* ─── FEATURES ─── */}
        <section
          id="features"
          className="relative overflow-hidden bg-white py-16 lg:py-24"
        >
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 bg-tech-grid-light opacity-25 z-0" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-[130px] z-0" />
          <div className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-brand-green-500/5 blur-[120px] z-0" />

          {/* Floating leaf decorations */}
          <Leaf className="absolute left-2 top-40 z-0 hidden w-20 -rotate-12 opacity-80 lg:block xl:w-28" />
          <Leaf className="absolute right-2 top-40 z-0 hidden w-20 rotate-12 scale-x-[-1] opacity-80 lg:block xl:w-28" />

          {/* Corner illustrations (desktop) */}
          <img
            src={yourGoalsImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-3 top-6 z-0 hidden w-20 select-none animate-float drop-shadow lg:block xl:w-28"
          />
          <img
            src={lightImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute right-3 top-6 z-0 hidden w-24 select-none animate-float drop-shadow lg:block xl:w-32"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#189a63]">
                FEATURES
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-navy-950 tracking-tight sm:text-4xl lg:text-5xl">
                Everything You Need for Financial Wellness
              </h2>
            </div>

            {/* Corner illustrations (mobile) */}
            <div className="mt-8 flex justify-center gap-8 lg:hidden">
              <img
                src={yourGoalsImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="w-24 select-none animate-float drop-shadow"
              />
              <img
                src={lightImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="w-28 select-none animate-float drop-shadow"
              />
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {FEATURES.map((f, i) => {
                const isActive = activeFeature === i;
                return (
                  <Reveal key={f.title} delay={i * 80} className="h-full">
                    <button
                      onClick={() => setActiveFeature(isActive ? null : i)}
                      className={`group card-hover-effect text-center flex h-full w-full flex-col items-center justify-start rounded-3xl border p-6 shadow-[0_10px_40px_-26px_rgba(13,37,73,0.5)] transition-all duration-300 cursor-pointer sm:p-7 ${
                        isActive
                          ? `${f.activeCardBg} -translate-y-2`
                          : `${f.cardBg} hover:shadow-[0_28px_60px_-28px_rgba(13,37,73,0.4)] hover:-translate-y-2`
                      }`}
                    >
                      <span
                        className={`mx-auto mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                          isActive ? "scale-110 shadow-md" : `${f.color}`
                        }`}
                      >
                        <f.icon sx={{ fontSize: 28 }} />
                      </span>
                      <h3
                        className={`text-lg font-bold transition-colors duration-300 ${
                          isActive
                            ? "text-navy-950"
                            : "text-navy-950 group-hover:text-brand-green-600"
                        }`}
                      >
                        {f.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                        {f.desc}
                      </p>
                      {isActive && (
                        <span className="mt-4 inline-block h-1 w-8 rounded-full bg-[#189a63]" />
                      )}
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Multi-layer Wave Transition to How It Works */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section
          id="how-it-works"
          className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24"
        >
          {/* Tech Grid Pattern */}
          <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-20 z-0" />
          <div className="pointer-events-none absolute right-10 top-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px] z-0" />
          <div className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px] z-0" />

          {/* Rocket decoration */}
          <img
            src={rocketImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute right-4 top-6 z-0 w-14 select-none animate-float sm:right-8 sm:top-10 sm:w-[68px] lg:right-12 lg:top-12 lg:w-28"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full border border-brand-green-500/30 bg-brand-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00E676]">
                HOW IT WORKS
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your Journey to Financial Clarity in 4 Simple Steps
              </h2>
            </div>

            <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Connector line with animated travelling glow (desktop) */}
              <div className="pointer-events-none absolute left-16 right-16 top-[52px] z-0 hidden h-0.5 overflow-hidden rounded-full bg-cyan-500/20 lg:block">
                <div className="h-full w-1/3 animate-beam bg-gradient-to-r from-transparent via-[#00E676] to-transparent" />
              </div>

              {STEPS.map((s, idx) => (
                <Reveal key={s.step} delay={idx * 110} className="h-full">
                  <div className="card-hover-effect group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_28px_60px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-400/50 hover:bg-white/[0.1] z-10">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white shadow-lg ring-2 ring-white/10 ${s.badgeBg}`}
                      >
                        {s.step}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
                      <span
                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${s.iconContainerBg}`}
                      >
                        <s.icon sx={{ fontSize: 26 }} />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white sm:text-xl">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300/90">
                      {s.desc}
                    </p>

                    {/* Step connector arrow */}
                    {idx < STEPS.length - 1 && (
                      <span className="absolute -right-4 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0a1e3a] text-cyan-300 shadow-lg lg:flex">
                        <ChevronRightIcon sx={{ fontSize: 20 }} />
                      </span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Reusable Section Transition */}
          <HowItWorksToBenefitsWave />
        </section>

        {/* ─── BENEFITS ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Light atmosphere */}
          <div className="pointer-events-none absolute inset-0 bg-tech-grid-light opacity-25 z-0" />
          <div className="pointer-events-none absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[140px] z-0" />
          <div className="pointer-events-none absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[130px] z-0" />

          {/* Floating leaf decorations */}
          <Leaf className="absolute left-1 bottom-16 z-0 hidden w-20 -rotate-6 opacity-70 lg:block xl:w-24" />
          <Leaf className="absolute right-1 bottom-16 z-0 hidden w-20 rotate-6 scale-x-[-1] opacity-70 lg:block xl:w-24" />

          {/* Corner illustration (desktop) */}
          <img
            src={builtAroundImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-3 top-10 z-0 hidden w-28 select-none animate-float drop-shadow lg:block xl:w-36"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#189a63]">
                BENEFITS
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
                Why Choose SmartFin Compass?
              </h2>

              {/* Corner illustration (mobile) */}
              <img
                src={builtAroundImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="mx-auto mt-6 block w-40 select-none animate-float drop-shadow sm:w-48 lg:hidden"
              />
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {BENEFITS.map((b, i) => {
                const isActive = activeBenefit === i;
                return (
                  <Reveal key={b.tag} delay={i * 80} className="h-full">
                    <button
                      onClick={() => setActiveBenefit(isActive ? null : i)}
                      className={`group card-hover-effect text-center flex h-full w-full flex-col items-center justify-start rounded-3xl border p-6 shadow-[0_10px_40px_-26px_rgba(13,37,73,0.5)] transition-all duration-300 cursor-pointer sm:p-7 ${
                        isActive
                          ? "border-[#189a63] bg-brand-green-50/70 shadow-[0_18px_45px_-18px_rgba(24,154,99,0.35)] -translate-y-2"
                          : `${b.cardBg} hover:shadow-[0_28px_60px_-28px_rgba(13,37,73,0.4)] hover:-translate-y-2`
                      }`}
                    >
                      <span
                        className={`mx-auto mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isActive
                            ? "scale-110 bg-[#189a63] text-white shadow-md shadow-brand-green-500/20"
                            : `${b.iconContainerBg} group-hover:scale-110`
                        }`}
                      >
                        <b.icon sx={{ fontSize: 26 }} />
                      </span>
                      <p
                        className={`flex min-h-16 items-center justify-center text-2xl font-extrabold transition-colors duration-300 ${
                          isActive ? "text-[#128052]" : "text-navy-950"
                        }`}
                      >
                        {b.highlight}
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#189a63]">{b.tag}</p>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                        {b.desc}
                      </p>
                      {isActive && (
                        <span className="mt-3 inline-block h-1 w-8 rounded-full bg-[#189a63]" />
                      )}
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Reusable Section Transition */}
          <BenefitsToTestimonialsWave />
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="relative overflow-hidden bg-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-20 z-0" />
          <div className="pointer-events-none absolute left-1/4 top-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] z-0" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-[#00E676]/10 blur-[120px] z-0" />

          {/* Corner illustration (desktop) */}
          <img
            src={yourImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-3 top-8 z-0 hidden w-24 select-none animate-float drop-shadow lg:block xl:w-32"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full border border-brand-green-500/25 bg-brand-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00E676]">
                TESTIMONIALS
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                What Our Users Say
              </h2>

              {/* Corner illustration (mobile) */}
              <img
                src={yourImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="mx-auto mt-6 block w-32 select-none animate-float drop-shadow sm:w-40 lg:hidden"
              />
            </div>

            <div className="relative mt-14 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => {
                const isActive = activeTestimonial === i || testimonialActive === i;
                return (
                  <Reveal key={t.name} delay={i * 110} className="h-full">
                    <button
                      onClick={() => {
                        setActiveTestimonial(i);
                        setTestimonialActive(i);
                      }}
                      className={`group card-hover-effect flex h-full w-full flex-col justify-between rounded-3xl border p-8 text-left shadow-xl transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "border-[#00E676] bg-gradient-to-b from-[#0e274a] to-[#0a1f3d] shadow-[0_20px_50px_-20px_rgba(0,230,118,0.35)] -translate-y-2 ring-1 ring-[#00E676]/50"
                          : "border-white/10 bg-white/[0.06] backdrop-blur-xl hover:border-brand-green-400/50 hover:bg-white/[0.09] hover:-translate-y-1"
                      }`}
                    >
                      <div>
                        <FormatQuoteIcon
                          sx={{ fontSize: 40 }}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "text-[#00E676] scale-110"
                              : "text-[#00E676]/80 group-hover:scale-105"
                          }`}
                        />
                        <p className="mt-3 text-base italic leading-relaxed text-slate-300">
                          "{t.quote}"
                        </p>
                      </div>

                      <div>
                        <div className="mt-8 flex items-center gap-4">
                          <span
                            className={`grid h-12 w-12 place-items-center rounded-full text-sm font-bold text-white shadow-md transition-all duration-300 ${
                              isActive
                                ? "ring-2 ring-[#00E676] ring-offset-2 ring-offset-[#0A1F3D] scale-105"
                                : "group-hover:scale-105"
                            }`}
                            style={{ backgroundColor: t.color }}
                          >
                            {t.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                          <div>
                            <p
                              className={`text-base font-bold transition-colors duration-300 ${
                                isActive ? "text-[#00E676]" : "text-white"
                              }`}
                            >
                              {t.name}
                            </p>
                            <p className="text-xs text-slate-400">{t.role}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-0.5 text-amber-accent">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <StarIcon key={j} sx={{ fontSize: 16 }} />
                          ))}
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {/* Carousel Arrow Controls & Dots */}
            <div className="mx-auto mt-10 flex max-w-xs items-center justify-between">
              <button
                onClick={handlePrevTestimonial}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-[#00E676] hover:bg-white/15 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon />
              </button>

              <div className="flex items-center gap-2.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTestimonialActive(i);
                      setActiveTestimonial(i);
                    }}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      testimonialActive === i
                        ? "w-8 bg-[#22b573]"
                        : "w-2.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextTestimonial}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:border-[#00E676] hover:bg-white/15 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <TestimonialsToFaqWave />
        </section>

        {/* ─── FAQ + CONTACT ─── */}
        <section
          id="contact"
          className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/60 py-16 lg:py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-tech-grid-light opacity-25 z-0" />
          <div className="pointer-events-none absolute left-10 top-20 h-72 w-72 rounded-full bg-cyan-500/5 blur-[100px] z-0" />
          <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-brand-green-500/5 blur-[100px] z-0" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              {/* FAQ Left Column */}
              <div className="relative">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#189a63]">
                  FAQS
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                  Frequently Asked Questions
                </h2>

                {/* FAQ illustration — mobile (above list) */}
                <img
                  src={faqQaImg}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="mx-auto mt-6 block w-36 select-none drop-shadow-md lg:hidden"
                />

                <div className="mt-8 flex items-start gap-6">
                  {/* FAQ illustration — desktop (left of list) */}
                  <img
                    src={faqQaImg}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="mt-4 hidden w-28 shrink-0 select-none animate-float drop-shadow-xl lg:block xl:w-44"
                  />

                  <div className="min-w-0 flex-1 space-y-3.5">
                    {FAQS.map((f, i) => {
                      const isOpen = faqOpenIndex === i;
                      return (
                        <div
                          key={f.q}
                          className={`group/faq overflow-hidden rounded-2xl border transition-all duration-300 ${
                            isOpen
                              ? "border-[#189a63] bg-brand-green-50/60 shadow-[0_16px_40px_-22px_rgba(24,154,99,0.55)] ring-1 ring-brand-green-400/30"
                              : "border-slate-200/80 bg-white shadow-soft hover:border-brand-green-200 hover:shadow-card"
                          }`}
                        >
                          <button
                            onClick={() => setFaqOpenIndex(isOpen ? -1 : i)}
                            className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold sm:px-6 sm:text-lg"
                          >
                            <span
                              className={`transition-colors duration-300 ${
                                isOpen
                                  ? "text-[#128052]"
                                  : "text-navy-950 group-hover/faq:text-[#189a63]"
                              }`}
                            >
                              {f.q}
                            </span>
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                isOpen
                                  ? "rotate-45 bg-[#189a63] text-white shadow-md"
                                  : "bg-slate-100 text-slate-500 group-hover/faq:bg-brand-green-50 group-hover/faq:text-brand-green-600"
                              }`}
                            >
                              <AddIcon sx={{ fontSize: 18 }} />
                            </span>
                          </button>
                          <div
                            className={`transition-all duration-300 ease-in-out ${
                              isOpen
                                ? "max-h-48 opacity-100"
                                : "max-h-0 overflow-hidden opacity-0"
                            }`}
                          >
                            {f.a && (
                              <p className="mt-1 border-t border-slate-100/80 px-5 pb-5 pt-0 text-sm leading-relaxed text-slate-600 sm:px-6">
                                {f.a}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Us Right Column */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-32px_rgba(13,37,73,0.45)] sm:p-10">
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-brand-green-500/10 blur-[60px]" />
                <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-[60px]" />

                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#189a63]">
                  CONTACT US
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                  Get in Touch
                </h2>

                <div className="relative z-10 mt-8 flex items-start gap-4">
                  <div className="relative z-10 min-w-0 flex-1 space-y-6 sm:pr-40 lg:pr-0 xl:pr-44">
                    <div className="group flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-green-100 text-[#189a63] transition-transform group-hover:scale-110">
                        <EmailIcon fontSize="small" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Email Us</p>
                        <p className="text-sm font-bold break-words text-navy-950 sm:text-base">
                          support@smartfincompass.com
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-green-100 text-[#189a63] transition-transform group-hover:scale-110">
                        <CallIcon fontSize="small" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Call Us</p>
                        <p className="text-base font-bold text-navy-950">
                          +91 98765 43210
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-green-100 text-[#189a63] transition-transform group-hover:scale-110">
                        <PlaceIcon fontSize="small" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Office</p>
                        <p className="text-base font-bold text-navy-950">
                          Bangalore, Karnataka, India
                        </p>
                      </div>
                    </div>
                  </div>

                  <img
                    src={contactImg}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="pointer-events-none absolute inset-y-0 right-0 z-0 my-auto hidden h-fit w-32 select-none animate-float sm:block lg:hidden xl:block xl:w-36"
                  />
                </div>

                <img
                  src={contactImg}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="pointer-events-none mx-auto mt-8 block w-44 select-none sm:hidden lg:block xl:hidden"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="relative overflow-hidden border-t border-brand-green-200/60 bg-gradient-to-b from-[#eaf6f0] via-[#e3f2ea] to-[#eaf6f0] py-14 lg:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green-400/60 to-transparent" />
          <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-brand-green-500/10 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[110px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-[#0a1f3d] via-[#0e2b52] to-[#0a1f3d] p-8 text-white shadow-[0_35px_70px_-35px_rgba(10,31,61,0.9)] sm:p-12">
              {/* Background decoration */}
              <img
                src={newsletterBg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-25" />
              <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-[70px]" />
              <div className="pointer-events-none absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-brand-green-500/20 blur-[70px]" />
              <Leaf className="-bottom-8 -left-6 hidden w-28 rotate-12 opacity-90 md:block" />

              <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
                <div className="flex items-center gap-5">
                  <img
                    src={paperRocketImg}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="hidden w-16 shrink-0 select-none animate-float drop-shadow-lg sm:block lg:w-20"
                  />
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#189a63] to-[#22b573] text-white shadow-lg shadow-brand-green-500/40">
                    <SendIcon sx={{ fontSize: 24 }} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      Stay Updated with Financial Insights
                    </h3>
                    <p className="mt-1 text-sm text-slate-300 sm:text-base">
                      Subscribe to our newsletter and never miss an update.
                    </p>
                  </div>
                </div>

                <form
                  className="flex w-full max-w-lg flex-col gap-3 sm:flex-row"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="h-[52px] min-w-0 flex-1 rounded-xl border-2 border-slate-300 bg-white px-5 text-base font-medium text-navy-950 shadow-sm transition-all duration-250 placeholder:text-slate-500 hover:border-brand-green-400 focus:border-[#189a63] focus:outline-none focus:ring-2 focus:ring-brand-green-500/25"
                  />
                  <button
                    type="submit"
                    className="btn-hover-effect h-[52px] shrink-0 rounded-xl bg-gradient-to-r from-[#189a63] to-[#22b573] px-8 text-base font-semibold text-white shadow-md shadow-brand-green-500/30 transition-all duration-250 hover:brightness-110 active:scale-95 cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Paper rocket (mobile) */}
            <img
              src={paperRocketImg}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="mx-auto mt-8 block w-28 select-none animate-float drop-shadow-lg sm:hidden"
            />
          </div>
        </section>
      </main>

    </div>
  );
}
