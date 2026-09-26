import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SpeedIcon from "@mui/icons-material/Speed";
import MapIcon from "@mui/icons-material/Map";
import InsightsIcon from "@mui/icons-material/Insights";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DescriptionIcon from "@mui/icons-material/Description";
import FlagIcon from "@mui/icons-material/Flag";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

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

// ─── Provided background / decoration assets ───
import featuresHeroImage from "../Assets/images/Features.png";
import growthChartImg from "../Assets/images/growthchart.png";
import heroBgLeft from "../Assets/images/hero-bg-left.svg";
import heroBgRight from "../Assets/images/hero-bg-right.svg";

// ─── Provided section illustration assets ───
import lightImg from "../Assets/images/light.png";
import laptopImg from "../Assets/images/laptop.png";
import yourImg from "../Assets/images/your.png";
import yourGoalsImg from "../Assets/images/yourgoals.png";
import yourRiskProfileImg from "../Assets/images/YourRiskProfile.png";
import yourFinancialImg from "../Assets/images/YourFinancial.png";
import yourRoadmapImg from "../Assets/images/Yourroadmap.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const FEATURES = [
  {
    icon: PsychologyIcon,
    color: "text-violet-500 bg-violet-50",
    cardBg:
      "bg-white border-violet-200/80 ring-1 ring-violet-500/10 hover:border-violet-400 hover:ring-violet-500/25",
    title: "AI Financial Analysis",
    desc: "Get a complete AI-powered analysis of your financial health, including income, expenses, assets, liabilities, savings, investments, and risk.",
  },
  {
    icon: SpeedIcon,
    color: "text-sky-500 bg-sky-50",
    cardBg:
      "bg-white border-sky-200/80 ring-1 ring-sky-500/10 hover:border-sky-400 hover:ring-sky-500/25",
    title: "Financial Health Score",
    desc: "Understand your overall financial wellness with a simple score that evaluates your financial stability, preparedness, and progress.",
  },
  {
    icon: MapIcon,
    color: "text-rose-500 bg-rose-50",
    cardBg:
      "bg-white border-rose-200/80 ring-1 ring-rose-500/10 hover:border-rose-400 hover:ring-rose-500/25",
    title: "Personalized Financial Roadmap",
    desc: "Receive a step-by-step financial roadmap tailored to your goals, financial profile, priorities, and current situation.",
  },
  {
    icon: InsightsIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    cardBg:
      "bg-white border-brand-green-200/80 ring-1 ring-brand-green-500/10 hover:border-brand-green-500 hover:ring-brand-green-500/25",
    title: "Cash Flow & Expense Analysis",
    desc: "Understand where your money comes from, where it goes, and how your spending patterns affect your financial future.",
  },
  {
    icon: ShieldIcon,
    color: "text-amber-accent bg-amber-50",
    cardBg:
      "bg-white border-amber-200/80 ring-1 ring-amber-500/10 hover:border-amber-400 hover:ring-amber-500/25",
    title: "Intelligent Risk Assessment",
    desc: "Evaluate your financial risk profile across debt, savings, emergency preparedness, investments, and overall financial capacity.",
  },
  {
    icon: TrendingUpIcon,
    color: "text-emerald-600 bg-emerald-50",
    cardBg:
      "bg-white border-emerald-200/80 ring-1 ring-emerald-500/10 hover:border-emerald-400 hover:ring-emerald-500/25",
    title: "Investment Readiness",
    desc: "Understand whether you are financially prepared to invest and discover opportunities aligned with your financial goals and risk profile.",
  },
  {
    icon: AutoAwesomeIcon,
    color: "text-indigo-500 bg-indigo-50",
    cardBg:
      "bg-white border-indigo-200/80 ring-1 ring-indigo-500/10 hover:border-indigo-400 hover:ring-indigo-500/25",
    title: "AI-Powered Recommendations",
    desc: "Get practical recommendations that help you prioritize the actions that can make the biggest difference to your financial wellness.",
  },
  {
    icon: DescriptionIcon,
    color: "text-teal-600 bg-teal-50",
    cardBg:
      "bg-white border-teal-200/80 ring-1 ring-teal-500/10 hover:border-teal-400 hover:ring-teal-500/25",
    title: "Financial Document Readiness",
    desc: "Track important financial documents and understand what is complete, pending, or required for better financial preparedness.",
  },
];

const FINANCIAL_OVERVIEW = [
  { label: "Financial Health Score", value: "78/100", color: "text-brand-green-600" },
  { label: "Net Worth", value: "₹12,45,000", color: "text-navy-950" },
  { label: "Monthly Income", value: "₹85,000", color: "text-navy-950" },
  { label: "Monthly Expenses", value: "₹62,500", color: "text-rose-500" },
  { label: "Savings Ratio", value: "26.5%", color: "text-brand-green-600" },
];

const FINANCIAL_READINESS = [
  { label: "Emergency Fund", status: "Good", color: "text-brand-green-600 bg-brand-green-50" },
  { label: "Debt Management", status: "Moderate", color: "text-amber-600 bg-amber-50" },
  { label: "Insurance Coverage", status: "Needs Review", color: "text-rose-500 bg-rose-50" },
  { label: "Investment Readiness", status: "Strong", color: "text-brand-green-600 bg-brand-green-50" },
  { label: "Document Readiness", status: "Complete", color: "text-sky-500 bg-sky-50" },
];

const AI_INSIGHTS = [
  { text: "Your savings rate is healthy", icon: CheckCircleIcon, color: "text-brand-green-600 bg-brand-green-50" },
  { text: "Consider strengthening your emergency fund", icon: ShieldIcon, color: "text-amber-600 bg-amber-50" },
  { text: "Your current debt level may impact investment readiness", icon: TrendingUpIcon, color: "text-rose-500 bg-rose-50" },
  { text: "You are on track toward your financial goals", icon: FlagIcon, color: "text-sky-500 bg-sky-50" },
];

const AI_STEPS = [
  {
    step: "01",
    title: "Analyze",
    desc: "AI analyzes your financial information and identifies patterns, strengths, and gaps.",
    icon: PsychologyIcon,
    bg: "from-emerald-400 to-emerald-600",
  },
  {
    step: "02",
    title: "Understand",
    desc: "Your financial profile is evaluated across health, risk, savings, debt, investments, and goals.",
    icon: InsightsIcon,
    bg: "from-sky-400 to-blue-600",
  },
  {
    step: "03",
    title: "Recommend",
    desc: "You receive personalized actions and recommendations designed around your financial priorities.",
    icon: AutoAwesomeIcon,
    bg: "from-violet-400 to-violet-600",
  },
];

const PERSONALIZED = [
  {
    img: yourGoalsImg,
    color: "text-violet-500 bg-violet-50",
    title: "Your Goals",
    desc: "Set meaningful financial goals and understand what it takes to achieve them.",
  },
  {
    img: yourRiskProfileImg,
    color: "text-sky-500 bg-sky-50",
    title: "Your Risk Profile",
    desc: "Understand your financial risk capacity and readiness.",
  },
  {
    img: yourFinancialImg,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Your Financial Behaviour",
    desc: "Identify spending, saving, and financial behaviour patterns.",
  },
  {
    img: yourRoadmapImg,
    color: "text-rose-500 bg-rose-50",
    title: "Your Roadmap",
    desc: "Follow a personalized roadmap toward greater financial confidence and stability.",
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


export default function Features() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ─── NAVBAR ─── */}
      <header className="sticky top-0 z-50 border-b border-navy-950/5 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white">
              <ExploreIcon fontSize="small" />
            </span>
            <span className="text-xl font-bold leading-tight text-navy-950">
              SmartFin
              <span className="block -mt-1 text-brand-green-600">Compass</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`group/nav relative text-[15px] font-medium transition-colors duration-250 ${
                  link.label === "Features" ? "text-navy-950" : "text-navy-900/70 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                  link.label === "Features" ? "w-full" : "w-0 group-hover/nav:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              to="/login"
              className="rounded-lg border border-navy-950/15 px-6 py-2.5 text-sm font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98]"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="rounded-lg bg-brand-green-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-navy-950 lg:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-navy-950/5 bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-navy-900/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full rounded-lg border border-navy-950/15 px-5 py-2.5 text-center text-sm font-semibold text-navy-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/login"
                className="w-full rounded-lg bg-brand-green-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ─── HERO ─── (deep navy / teal gradient) */}
        <section className="relative overflow-hidden bg-[#04101f] pt-10 text-white lg:pt-16">
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
            {/* ── LEFT: Hero Text Content ── */}
            <div className="animate-fade-in-up lg:col-span-6 xl:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green-400 sm:text-sm">
                Features
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Everything You Need for{" "}
                <span className="bg-gradient-to-r from-[#4ade80] via-[#22b573] to-[#2ee88f] bg-clip-text text-transparent">
                  Financial Wellness
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                SmartFin Compass combines AI-powered financial analysis, personalized insights, and intelligent recommendations to help you understand your finances and make smarter decisions.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/login"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#189a63] to-[#22b573] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(34,181,115,0.7)] transition-all duration-250 hover:brightness-110 sm:text-base"
                >
                  Start Assessment
                  <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-1" />
                </Link>
                <a
                  href="/how-it-works"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-250 hover:border-white/50 hover:bg-white/15 sm:text-base"
                >
                  Explore How It Works
                </a>
              </div>
            </div>

            {/* ── RIGHT: Hero Illustration ── */}
            <div className="relative animate-fade-in-up delay-200 lg:col-span-6 xl:col-span-5">
              {/* Ambient glow behind the illustration */}
              <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-r from-cyan-500/25 via-brand-green-500/25 to-blue-500/25 opacity-70 blur-2xl" />

              {/* Rupee coins decoration */}
              <RupeeCoins className="absolute -bottom-6 -right-3 z-20 hidden w-20 animate-float delay-300 select-none sm:block lg:-bottom-9 lg:-right-6 lg:w-28" />

              <img
                src={featuresHeroImage}
                alt="SmartFin Compass Features - Financial Wellness"
                className="relative z-10 w-full rounded-[28px] border border-white/10 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

          {/* Reusable Section Transition */}
          <HeroToFeaturesWave />
        </section>

        {/* ─── MAIN FEATURES ─── (SECTION 2: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-10 z-0 h-80 w-80 rounded-full bg-brand-green-500/5 blur-[120px]" />

          {/* Floating leaf decorations */}
          <LeafSprig className="pointer-events-none absolute right-1 top-14 z-0 hidden w-20 rotate-12 scale-x-[-1] opacity-80 lg:block xl:w-28" />

          {/* Light-bulb decorative illustration (left side) */}
          <img
            src={lightImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-2 top-2 z-0 w-14 select-none animate-float sm:w-16 lg:left-5 lg:top-16 lg:w-24 xl:left-10 xl:w-32"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green-600 sm:text-sm">
                Powerful Features
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
                Powerful Features. Smarter Financial Decisions.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-navy-900/70 sm:text-lg">
                From understanding your current financial position to planning your future, SmartFin Compass gives you the intelligence and guidance you need at every step.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className={`group card-hover-effect rounded-3xl border p-7 shadow-[0_10px_40px_-26px_rgba(13,37,73,0.5)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_60px_-28px_rgba(13,37,73,0.4)] ${f.cardBg}`}
                >
                  <span className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${f.color}`}>
                    <f.icon sx={{ fontSize: 40 }} />
                  </span>
                  <h3 className="text-base font-bold text-navy-950 transition-colors duration-300 group-hover:text-brand-green-600 sm:text-lg">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-layer Wave Transition to Complete Financial Picture */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── FEATURE DEEP-DIVE ─── (SECTION 3: DARK BLUE WAVE) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Tech Grid Pattern */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute right-10 top-10 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-10 left-10 z-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
              {/* ── Heading ── */}
              <div className="text-center lg:text-left">
                <span className="inline-block rounded-full border border-brand-green-500/30 bg-brand-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00E676]">
                  Complete Picture
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  See Your Complete Financial Picture
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                  SmartFin Compass brings your financial information together so you can understand the bigger picture—not just individual numbers.
                </p>
              </div>

              {/* ── Laptop illustration ── */}
              <div className="relative flex items-center justify-center">
                <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-r from-cyan-500/20 via-brand-green-500/20 to-blue-500/20 opacity-60 blur-2xl" />
                <img
                  src={laptopImg}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="relative z-10 w-full max-w-lg select-none object-contain animate-float lg:max-w-xl xl:max-w-2xl"
                />
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Financial Overview */}
              <div className="card-hover-effect rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-[0_28px_60px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-400/50 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-500/20 text-brand-green-400">
                    <InsightsIcon sx={{ fontSize: 20 }} />
                  </span>
                  <h3 className="text-lg font-bold text-white sm:text-xl">Financial Overview</h3>
                </div>
                <div className="space-y-4">
                  {FINANCIAL_OVERVIEW.map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-slate-300 sm:text-base">{item.label}</span>
                      <span className={`text-sm font-bold sm:text-base ${item.color === 'text-navy-950' ? 'text-white' : 'text-[#00E676]'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Readiness */}
              <div className="card-hover-effect rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-[0_28px_60px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-sky-400/50 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                    <ShieldIcon sx={{ fontSize: 20 }} />
                  </span>
                  <h3 className="text-lg font-bold text-white sm:text-xl">Financial Readiness</h3>
                </div>
                <div className="space-y-3">
                  {FINANCIAL_READINESS.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                      <span className="text-sm font-medium text-slate-300 sm:text-base">{item.label}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${item.color}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="card-hover-effect rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-[0_28px_60px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/50 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                    <AutoAwesomeIcon sx={{ fontSize: 20 }} />
                  </span>
                  <h3 className="text-lg font-bold text-white sm:text-xl">AI Insights</h3>
                </div>
                <div className="space-y-3">
                  {AI_INSIGHTS.map((item, i) => (
                    <div key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 ${item.color.split(" ")[1]}`}>
                      <item.icon sx={{ fontSize: 18 }} className={`mt-0.5 shrink-0 ${item.color.split(" ")[0]}`} />
                      <span className="text-sm font-medium text-navy-950 sm:text-base">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <HowItWorksToBenefitsWave />
        </section>

        {/* ─── AI INTELLIGENCE ─── (SECTION 4: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute left-1/4 top-0 z-0 h-[420px] w-[420px] rounded-full bg-brand-green-500/5 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[130px]" />

          {/* Floating leaf decorations */}
          <LeafSprig className="pointer-events-none absolute left-1 bottom-16 z-0 hidden w-20 -rotate-6 opacity-70 lg:block xl:w-24" />
          <LeafSprig className="pointer-events-none absolute right-1 bottom-16 z-0 hidden w-20 rotate-6 scale-x-[-1] opacity-70 lg:block xl:w-24" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green-600 sm:text-sm">
                AI Intelligence
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
                AI That Understands Your Financial Journey
              </h2>
              <p className="mt-5 text-base leading-relaxed text-navy-900/75 sm:text-lg">
                SmartFin Compass analyzes the information you provide and transforms complex financial data into clear insights, priorities, and actionable recommendations.
              </p>
            </div>

            <div className="relative mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {/* Dotted connector line (desktop) */}
              <div className="absolute left-[16.666%] right-[16.666%] top-9 hidden border-t-2 border-dashed border-navy-950/15 lg:block" />

              {AI_STEPS.map((s, idx) => (
                <div
                  key={s.step}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Chevron connector (desktop, between steps) */}
                  {idx > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute -left-6 top-9 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-navy-950/10 bg-white text-brand-green-600 shadow-soft lg:flex"
                    >
                      <ChevronRightIcon sx={{ fontSize: 20 }} />
                    </span>
                  )}

                  <div className={`relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full bg-gradient-to-br ${s.bg} shadow-lg ring-[6px] ring-slate-100`}>
                    <s.icon className="text-white" sx={{ fontSize: 28 }} />
                    <span className="absolute -bottom-2 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white ring-2 ring-white">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-navy-950 sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-[280px] text-sm leading-relaxed text-navy-900/75 sm:text-base">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reusable Section Transition */}
          <BenefitsToTestimonialsWave />
        </section>

        {/* ─── PERSONALIZED EXPERIENCE ─── (SECTION 5: DARK BLUE WAVE) */}
        <section className="relative overflow-hidden bg-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-10 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 z-0 h-80 w-80 rounded-full bg-[#00E676]/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full border border-brand-green-500/25 bg-brand-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00E676]">
                Personalized
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Built Around You
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PERSONALIZED.map((p) => (
                <div
                  key={p.title}
                  className="group card-hover-effect rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-[0_28px_60px_-32px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-400/50"
                >
                  <img
                    src={p.img}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="mb-5 block h-16 w-16 select-none object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-brand-green-400 sm:text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reusable Section Transition */}
          <TestimonialsToFaqWave />
        </section>

        {/* ─── SECURITY ─── (SECTION 6: LIGHT GREEN CARD) */}
        <section className="bg-white py-16 text-navy-950 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-[32px] border border-brand-green-100 bg-gradient-to-br from-emerald-50 via-teal-50/80 to-cyan-50 shadow-card">
              {/* Decorative glows */}
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-green-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
              <LeafSprig className="pointer-events-none absolute -bottom-6 left-4 hidden w-24 -rotate-6 opacity-70 md:block" />

              <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14 lg:p-14">
                {/* ── Security illustration ── */}
                <div className="mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-md">
                  <img
                    src={yourImg}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="h-auto w-full select-none object-contain animate-float"
                  />
                </div>

                {/* ── Content ── */}
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl lg:text-4xl">
                    Your Financial Data Stays Protected
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-navy-900/70 sm:text-lg">
                    We use bank-level encryption and industry best practices to protect your financial information. Your privacy and security are our priority.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-green-200/80 bg-white px-5 py-3 shadow-soft">
                      <VerifiedUserIcon sx={{ fontSize: 20, color: "#22b573" }} />
                      <span className="text-sm font-semibold text-navy-950 sm:text-base">Secure &amp; Private</span>
                    </span>
                    <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-green-200/80 bg-white px-5 py-3 shadow-soft">
                      <LockIcon sx={{ fontSize: 20, color: "#22b573" }} />
                      <span className="text-sm font-semibold text-navy-950 sm:text-base">Encrypted Data</span>
                    </span>
                    <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-green-200/80 bg-white px-5 py-3 shadow-soft">
                      <PrivacyTipIcon sx={{ fontSize: 20, color: "#22b573" }} />
                      <span className="text-sm font-semibold text-navy-950 sm:text-base">Privacy First</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="bg-slate-50 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#0a1f3d] via-[#0e2b52] to-[#0a1f3d] px-8 py-16 text-center shadow-[0_35px_70px_-35px_rgba(10,31,61,0.9)] sm:px-16">
              {/* Background decoration */}
              <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-25" />
              <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-[70px]" />
              <div className="pointer-events-none absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-brand-green-500/20 blur-[70px]" />

              {/* Growth chart decoration — inside card, lower left */}
              <img
                src={growthChartImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute bottom-0 left-4 z-0 w-20 select-none animate-float sm:left-6 sm:w-28 md:w-36 lg:left-10 lg:w-44 xl:w-52"
              />

              {/* Rupee coins decoration — inside card, lower right */}
              <RupeeCoins className="pointer-events-none absolute bottom-0 right-4 z-0 w-14 select-none animate-float delay-300 sm:right-6 sm:w-20 md:w-24 lg:right-10 lg:w-32 xl:w-36" />

              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[40px]">
                  Ready to Take Control of Your{" "}
                  <span className="bg-gradient-to-r from-[#4ade80] via-[#22b573] to-[#2ee88f] bg-clip-text text-transparent">
                    Financial Future?
                  </span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  Start your personalized financial assessment and discover where you stand, what you should prioritize, and how you can move forward with confidence.
                </p>
                <Link
                  to="/login"
                  className="group/cta btn-hover-effect mt-10 inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#189a63] to-[#22b573] px-10 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(34,181,115,0.7)] transition-all duration-250 hover:brightness-110 sm:text-base"
                >
                  Start Your Assessment
                  <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/cta:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-950 pt-20 text-white/75">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white">
                  <ExploreIcon fontSize="small" />
                </span>
                <span className="text-xl font-bold leading-tight text-white">
                  SmartFin
                  <span className="block -mt-1 text-brand-green-400">
                    Compass
                  </span>
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-sm sm:text-base leading-relaxed">
                Your AI-powered financial companion for a secure and prosperous
                future.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-all duration-200 hover:scale-110 hover:bg-brand-green-500 hover:text-white"
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
                      {l.href.startsWith("/") ? (
                        <Link
                          to={l.href}
                          className="text-sm sm:text-base transition-colors duration-200 hover:text-brand-green-400"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          className="text-sm sm:text-base transition-colors duration-200 hover:text-brand-green-400"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-base font-bold text-white">Contact Info</p>
              <ul className="mt-5 space-y-4 text-sm sm:text-base">
                <li className="flex items-center gap-2.5">
                  <EmailIcon sx={{ fontSize: 16 }} />
                  support@smartfincompass.com
                </li>
                <li className="flex items-center gap-2.5">
                  <CallIcon sx={{ fontSize: 16 }} />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2.5">
                  <PlaceIcon sx={{ fontSize: 16 }} />
                  Bangalore, Karnataka, India
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs sm:text-sm text-white/60 sm:flex-row">
            <p>&copy; 2025 SmartFin Compass. All rights reserved.</p>
            <div className="flex gap-5">
              <a
                href="#"
                className="transition-colors duration-200 hover:text-brand-green-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="transition-colors duration-200 hover:text-brand-green-400"
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
