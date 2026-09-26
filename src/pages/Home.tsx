import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
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
import LeafSprig from "../components/illustrations/LeafSprig";
import FaqIllustration from "../components/illustrations/FaqIllustration";
import FooterDecoration from "../components/illustrations/FooterDecoration";

// ─── Provided background / decoration assets ───
import heroBgLeft from "../Assets/images/hero-bg-left.svg";
import heroBgRight from "../Assets/images/hero-bg-right.svg";
import newsletterBg from "../Assets/images/newsletter-bg.svg";
import rocketImg from "../Assets/images/Rocket.png";
import growthChartImg from "../Assets/images/growthchart.png";
import contactImg from "../Assets/images/contactimage.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
    color: "text-sky-400 bg-sky-500/10",
    title: "Build Emergency Fund",
    time: "0-3 Months",
  },
  {
    icon: CreditCardOffIcon,
    color: "text-rose-400 bg-rose-500/10",
    title: "Clear High-Interest Debt",
    time: "3-6 Months",
  },
  {
    icon: TrendingUpIcon,
    color: "text-brand-green-400 bg-brand-green-500/10",
    title: "Invest for Growth",
    time: "6-12 Months",
  },
  {
    icon: AccountBalanceIcon,
    color: "text-violet-400 bg-violet-500/10",
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

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Know Your Risk", href: "/know-your-risk" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Financial Guide", href: "/financial-guide" },
      { label: "FAQs", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" },
      { label: "Contact Us", href: "/contact" },
    ],
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

function ScoreGauge({ score }: { score: number }) {
  const radius = 70;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative mx-auto flex h-[150px] w-[200px] items-end justify-center">
      <svg viewBox="0 0 180 100" className="h-full w-full overflow-visible">
        <path
          d="M 20 100 A 70 70 0 0 1 160 100"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
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
        <span className="text-5xl font-extrabold text-white tracking-tight">{score}</span>
        <span className="mt-0.5 text-xs font-bold text-brand-green-400 uppercase tracking-wider">
          Good
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialActive, setTestimonialActive] = useState(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
  const [activeRoadmap, setActiveRoadmap] = useState<number | null>(null);

  const handlePrevTestimonial = () => {
    setTestimonialActive((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setTestimonialActive((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-navy-950 selection:bg-brand-green-500 selection:text-white overflow-x-hidden w-full max-w-full">
      {/* ─── NAVBAR ─── */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/95 px-4 shadow-[0_16px_44px_-22px_rgba(13,37,73,0.45)] sm:h-16 sm:px-6">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#22b573] to-[#0e6941] text-white shadow-md shadow-brand-green-500/30 group-hover:scale-105 transition-transform duration-300 sm:h-11 sm:w-11">
                <ExploreIcon fontSize="small" />
              </span>
              <span className="text-lg font-bold leading-tight text-navy-950 sm:text-xl">
                SmartFin
                <span className="block -mt-1 text-brand-green-600">Compass</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-9 lg:flex">
              {NAV_LINKS.map((link, i) =>
                link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`group/nav relative text-[15px] font-semibold transition-colors duration-250 ${
                      i === 0 ? "text-brand-green-600" : "text-navy-900/70 hover:text-brand-green-600"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                        i === 0 ? "w-full" : "w-0 group-hover/nav:w-full"
                      }`}
                    />
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`group/nav relative text-[15px] font-semibold transition-colors duration-250 ${
                      i === 0 ? "text-brand-green-600" : "text-navy-900/70 hover:text-brand-green-600"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                        i === 0 ? "w-full" : "w-0 group-hover/nav:w-full"
                      }`}
                    />
                  </a>
                )
              )}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-navy-900/80 transition-all duration-250 hover:text-brand-green-600 active:scale-95"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="rounded-xl bg-gradient-to-r from-[#189a63] to-[#22b573] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-green-500/30 transition-all duration-250 hover:shadow-lg hover:brightness-110 active:scale-95"
              >
                Get Started
              </Link>
            </div>

            <button
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-navy-950 lg:hidden hover:bg-slate-50"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-6 py-5 lg:hidden animate-fade-in">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) =>
                link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-base font-semibold text-navy-900/80 transition-colors hover:text-brand-green-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-semibold text-navy-900/80 transition-colors hover:text-brand-green-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-navy-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/login"
                className="w-full rounded-xl bg-[#189a63] px-5 py-3 text-center text-sm font-semibold text-white shadow-md shadow-brand-green-500/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

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

              {/* Main Dark Dashboard Glass Card */}
              <div className="relative z-10 rounded-[28px] border border-white/15 bg-gradient-to-b from-[#0e274a]/95 to-[#081a33]/95 p-6 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.9)] backdrop-blur-xl ring-1 ring-white/5 sm:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-lg font-bold text-white">
                    Your Financial Health Score
                  </p>
                  <AutoAwesomeIcon
                    className="text-[#00E676] animate-pulse-glow"
                    sx={{ fontSize: 24 }}
                  />
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-4 px-2">
                    <ScoreGauge score={78} />
                    <span className="mt-1 text-xs font-semibold text-slate-300">
                      Keep it up!
                    </span>
                  </div>

                  <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Score Breakdown
                    </p>
                    <div className="space-y-2.5">
                      {SCORE_BREAKDOWN.map((item) => (
                        <div key={item.label}>
                          <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-300">
                            <span>{item.label}</span>
                            <span className="font-bold text-white">
                              {item.value}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand-green-400"
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Your Personalized Roadmap
                  </p>
                  <p className="mb-3 text-xs font-semibold text-slate-300">
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
                              ? "border-brand-green-400 bg-brand-green-500/20 shadow-[0_2px_12px_rgba(34,181,115,0.25)]"
                              : "border-white/10 bg-white/5 hover:border-brand-green-400/50 hover:bg-white/10"
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
                                  isActive ? "text-[#00E676]" : "text-white"
                                }`}
                              >
                                {item.title}
                              </p>
                              <p
                                className={`mt-0.5 text-[11px] font-medium transition-colors duration-300 ${
                                  isActive ? "text-brand-green-300/90" : "text-slate-400"
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

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Potential Wealth in 5 Years
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-[#00E676]">
                      ₹28,75,000
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-400">
                      Monthly Savings Potential
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-[#00E676]">
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
          <LeafSprig className="pointer-events-none absolute left-1 top-14 hidden w-20 -rotate-12 opacity-80 lg:block xl:w-28" />
          <LeafSprig className="pointer-events-none absolute right-1 top-14 hidden w-20 rotate-12 scale-x-[-1] opacity-80 lg:block xl:w-28" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#189a63]">
                FEATURES
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-navy-950 tracking-tight sm:text-4xl lg:text-5xl">
                Everything You Need for Financial Wellness
              </h2>
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
          <LeafSprig className="pointer-events-none absolute left-1 bottom-16 hidden w-20 -rotate-6 opacity-70 lg:block xl:w-24" />
          <LeafSprig className="pointer-events-none absolute right-1 bottom-16 hidden w-20 rotate-6 scale-x-[-1] opacity-70 lg:block xl:w-24" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#189a63]">
                BENEFITS
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
                Why Choose SmartFin Compass?
              </h2>
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

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full border border-brand-green-500/25 bg-brand-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00E676]">
                TESTIMONIALS
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                What Our Users Say
              </h2>
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
                <FaqIllustration className="mx-auto mt-6 block w-36 lg:hidden" />

                <div className="mt-8 flex items-start gap-6">
                  {/* FAQ illustration — desktop (left of list) */}
                  <FaqIllustration className="mt-4 hidden w-28 shrink-0 animate-float lg:block xl:w-44" />

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
              <LeafSprig className="pointer-events-none absolute -bottom-8 -left-6 hidden w-28 rotate-12 opacity-90 md:block" />

              <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
                <div className="flex items-center gap-5">
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
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative overflow-hidden border-t border-brand-green-500/20 bg-[#050f1f] pt-16 text-slate-300/80">
        {/* Top accent line + glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green-400/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-15 z-0" />
        <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[110px] z-0" />

        {/* Decorative fintech graphic (leaves, coins, wave) */}
        <FooterDecoration className="pointer-events-none absolute bottom-12 right-0 z-0 hidden w-56 opacity-70 md:block lg:w-72" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="group flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#22b573] to-[#0e6941] text-white shadow-md shadow-brand-green-500/20 transition-transform group-hover:scale-105">
                  <ExploreIcon fontSize="small" />
                </span>
                <span className="text-xl font-bold leading-tight text-white">
                  SmartFin
                  <span className="block -mt-1 text-[#00E676]">Compass</span>
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-300">
                Your AI-powered financial companion for a secure and prosperous
                future.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white transition-all duration-250 hover:scale-110 hover:border-[#189a63] hover:bg-[#189a63]"
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </a>
                  )
                )}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-base font-bold text-white">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/") && !l.href.startsWith("/#") ? (
                        <Link
                          to={l.href}
                          className="text-sm transition-colors duration-250 hover:text-[#00E676]"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          className="text-sm transition-colors duration-250 hover:text-[#00E676]"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-2">
              <p className="text-base font-bold text-white">Contact Info</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-center gap-2.5">
                  <EmailIcon sx={{ fontSize: 16 }} className="text-[#00E676]" />
                  <span className="break-all">support@smartfincompass.com</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CallIcon sx={{ fontSize: 16 }} className="text-[#00E676]" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2.5">
                  <PlaceIcon sx={{ fontSize: 16 }} className="text-[#00E676]" />
                  Bangalore, Karnataka, India
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-slate-400 sm:flex-row">
            <p>© 2025 SmartFin Compass. All rights reserved.</p>
            <div className="flex gap-5">
              <a
                href="#"
                className="transition-colors duration-250 hover:text-[#00E676]"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="transition-colors duration-250 hover:text-[#00E676]"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
