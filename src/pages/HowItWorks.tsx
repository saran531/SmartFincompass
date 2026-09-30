import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MapIcon from "@mui/icons-material/Map";
import SpeedIcon from "@mui/icons-material/Speed";
import InsightsIcon from "@mui/icons-material/Insights";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import FlagIcon from "@mui/icons-material/Flag";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SecurityIcon from "@mui/icons-material/Security";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import FolderIcon from "@mui/icons-material/Folder";

// ─── Reusable Section Transitions ───
import {
  HeroToFeaturesWave,
  FeaturesToHowItWorksWave,
  HowItWorksToBenefitsWave,
  BenefitsToTestimonialsWave,
  TestimonialsToFaqWave,
} from "../components/waves/SectionWaves";

// ─── Decorative illustration backdrops ───
import HeroBackdrop from "../components/illustrations/HeroBackdrop";

// ─── Provided section illustration assets ───
import financialClarityImg from "../Assets/images/FinancialClarity.png";
import growthChartImg from "../Assets/images/growthchart.png";
import rocketImg from "../Assets/images/Rocket.png";
import smarterWayImg from "../Assets/images/SmarterWay.png";
import financialPictureImg from "../Assets/images/FinancialPicture.png";
import yourGoalsImg from "../Assets/images/yourgoals.png";
import builtAroundImg from "../Assets/images/BuiltAround.png";
import yourImg from "../Assets/images/your.png";
import financialFutureImg from "../Assets/images/FinancialFuture.png";


const JOURNEY_STEPS = [
  {
    step: "01",
    icon: PersonIcon,
    color: "text-violet-500 bg-violet-50",
    ringColor: "ring-violet-100",
    title: "Create Your Profile",
    desc: "Tell us about yourself, your income, expenses, assets, liabilities, insurance, investments and financial goals.",
    points: ["Personal Information", "Employment & Income", "Expenses & Spending", "Assets & Liabilities"],
  },
  {
    step: "02",
    icon: DescriptionIcon,
    color: "text-sky-500 bg-sky-50",
    ringColor: "ring-sky-100",
    title: "Complete Your Assessment",
    desc: "Answer a guided set of questions designed to understand your complete financial picture.",
    points: ["Income Sources", "Monthly Expenses", "Assets", "Liabilities", "Insurance", "Investment Experience", "Financial Goals", "Document Readiness"],
  },
  {
    step: "03",
    icon: PsychologyIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    ringColor: "ring-brand-green-100",
    title: "AI Analyzes Your Finances",
    desc: "Our AI evaluates your financial information to identify strengths, gaps, risks and opportunities.",
    points: ["Financial Health Analysis", "Cash Flow Analysis", "Debt Analysis", "Risk Assessment", "Investment Readiness", "Financial Behaviour Insights"],
  },
  {
    step: "04",
    icon: MapIcon,
    color: "text-rose-500 bg-rose-50",
    ringColor: "ring-rose-100",
    title: "Get Your Personalized Roadmap",
    desc: "Receive personalized recommendations and a practical roadmap designed around your financial situation and goals.",
    points: ["Financial Health Score", "Personalized Insights", "Smart Recommendations", "Goal-Based Planning", "Actionable Next Steps"],
  },
];

const TIMELINE_STEPS = [
  { num: "01", title: "Personal Information", desc: "Build your financial profile with essential personal and professional information.", icon: PersonIcon, color: "text-sky-400 bg-sky-500/20" },
  { num: "02", title: "Income & Expenses", desc: "Understand your earning capacity, spending patterns and savings behaviour.", icon: ReceiptLongIcon, color: "text-emerald-400 bg-emerald-500/20" },
  { num: "03", title: "Assets & Liabilities", desc: "See what you own, what you owe and how your net worth is positioned.", icon: AccountBalanceWalletIcon, color: "text-amber-accent bg-amber-500/20" },
  { num: "04", title: "Insurance & Investments", desc: "Evaluate your protection, investment experience, risk appetite and financial readiness.", icon: SecurityIcon, color: "text-cyan-400 bg-cyan-500/20" },
  { num: "05", title: "Financial Goals", desc: "Define the goals that matter most — from emergency funds and home ownership to retirement and wealth creation.", icon: FlagCircleIcon, color: "text-rose-400 bg-rose-500/20" },
  { num: "06", title: "Documents", desc: "Improve financial readiness by organizing important financial documents.", icon: FolderIcon, color: "text-violet-400 bg-violet-500/20" },
  { num: "07", title: "AI Analysis", desc: "SmartFin Compass processes your information to generate a comprehensive financial assessment.", icon: PsychologyIcon, color: "text-brand-green-400 bg-brand-green-500/20" },
  { num: "08", title: "Personalized Roadmap", desc: "Get clear priorities, recommendations and next actions based on your financial profile.", icon: MapIcon, color: "text-pink-400 bg-pink-500/20" },
];

const AI_CARDS = [
  { icon: InsightsIcon, color: "text-sky-500 bg-sky-50", title: "Cash Flow", desc: "Understand your income, expenses, savings capacity and spending patterns." },
  { icon: AccountBalanceIcon, color: "text-violet-500 bg-violet-50", title: "Net Worth", desc: "See the relationship between your assets and liabilities and track your financial position." },
  { icon: CreditCardOffIcon, color: "text-rose-500 bg-rose-50", title: "Debt", desc: "Identify debt burden, repayment priorities and opportunities to improve debt management." },
  { icon: ShieldIcon, color: "text-amber-accent bg-amber-50", title: "Risk", desc: "Evaluate your financial risk profile and ability to handle unexpected situations." },
  { icon: TrendingUpIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Investments", desc: "Understand your investment readiness, experience, time horizon and risk appetite." },
  { icon: FlagIcon, color: "text-emerald-600 bg-emerald-50", title: "Goals", desc: "Connect your current financial position with the goals you want to achieve." },
];

const ROADMAP_CARDS = [
  { icon: SavingsIcon, color: "text-sky-500 bg-sky-50", title: "Build Emergency Fund", time: "0–3 Months", desc: "Create a stronger financial safety net." },
  { icon: CreditCardOffIcon, color: "text-rose-500 bg-rose-50", title: "Reduce High-Interest Debt", time: "1–6 Months", desc: "Prioritize expensive debt and improve monthly cash flow." },
  { icon: TrendingUpIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Increase Savings", time: "3–12 Months", desc: "Build consistent savings habits aligned with your goals." },
  { icon: AccountBalanceIcon, color: "text-violet-500 bg-violet-50", title: "Build Wealth", time: "1–5 Years", desc: "Develop an investment strategy based on your readiness and risk profile." },
];

const DIFFERENTIATORS = [
  { icon: PersonIcon, color: "text-violet-500 bg-violet-50", title: "Personalized", desc: "Recommendations are based on your actual financial information and goals." },
  { icon: AutoAwesomeIcon, color: "text-brand-green-600 bg-brand-green-50", title: "AI-Powered", desc: "Advanced analysis helps identify patterns, risks and opportunities across your financial profile." },
  { icon: FlagIcon, color: "text-sky-500 bg-sky-50", title: "Goal-Oriented", desc: "Your financial goals help determine what deserves attention first." },
  { icon: RocketLaunchIcon, color: "text-rose-500 bg-rose-50", title: "Actionable", desc: "Get practical next steps instead of confusing financial jargon." },
];


export default function HowItWorks() {

  return (
    <div className="min-h-screen bg-white">

      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-navy-950 text-white">
          {/* Premium fintech backdrop */}
          <HeroBackdrop />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-10 lg:py-24">
            <div className="relative z-10 animate-fade-in-up">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                How It Works
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white">
                Your Journey to{" "}
                <span className="text-brand-green-400">Financial Clarity</span>{" "}
                Starts Here
              </h1>
              <p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
                SmartFin Compass turns your financial information into clear, personalized insights and actionable recommendations — so you can make smarter decisions with confidence.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/login"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-brand-green-500/25 transition-all duration-250 hover:bg-brand-green-400"
                >
                  Start Your Assessment
                  <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-1" />
                </Link>
                <Link
                  to="/features"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-250 hover:border-white/40 hover:bg-white/10"
                >
                  Explore Features
                </Link>
              </div>
            </div>

            {/* Hero Visual — Financial Clarity illustration + Journey Flow */}
            <div className="relative flex flex-col items-center gap-8 animate-fade-in-up delay-200 lg:block lg:h-[500px] lg:gap-0 xl:h-[560px]">
              {/* Main hero illustration — beside/behind the journey panel */}
              <img
                src={financialClarityImg}
                alt="SmartFin Compass - Your journey to financial clarity"
                draggable={false}
                className="pointer-events-none relative z-0 mx-auto block w-full max-w-[300px] select-none object-contain sm:max-w-sm lg:absolute lg:-right-10 lg:top-1/2 lg:mx-0 lg:w-[240px] lg:max-w-none lg:-translate-y-1/2 min-[1440px]:-right-24 min-[1440px]:w-[300px]"
              />

              {/* Journey Flow Panel */}
              <div className="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/15 bg-navy-900/90 p-6 shadow-2xl backdrop-blur-xl sm:p-7 lg:absolute lg:-left-4 lg:top-1/2 lg:mx-0 lg:w-[330px] lg:max-w-none lg:-translate-y-1/2 xl:w-[360px]">
                <p className="mb-5 text-base sm:text-lg font-bold text-white lg:text-base xl:text-lg">
                  Your SmartFin Compass Journey
                </p>

                <div className="relative flex flex-col gap-1.5">
                  {/* Vertical connector line passing behind icons */}
                  <div className="absolute left-[36px] top-6 bottom-6 w-0.5 -translate-x-1/2 bg-white/10" />

                  {[
                    { icon: PersonIcon, label: "Create Profile", color: "text-violet-400 bg-violet-500/20" },
                    { icon: DescriptionIcon, label: "Complete Assessment", color: "text-sky-400 bg-sky-500/20" },
                    { icon: PsychologyIcon, label: "AI Analysis", color: "text-brand-green-400 bg-brand-green-500/20" },
                    { icon: SpeedIcon, label: "Health Score", color: "text-amber-accent bg-amber-500/20" },
                    { icon: MapIcon, label: "Personalized Roadmap", color: "text-rose-400 bg-rose-500/20" },
                    { icon: RocketLaunchIcon, label: "Financial Growth", color: "text-emerald-400 bg-emerald-500/20" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="group relative grid grid-cols-[48px_1fr_20px] items-center gap-2.5 rounded-2xl px-3 py-1.5 transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
                    >
                      {/* Fixed-width Icon Container */}
                      <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${item.color}`}>
                        <item.icon sx={{ fontSize: 24 }} />
                      </div>

                      {/* Consistently Aligned Text Label */}
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-white transition-colors duration-200 group-hover:text-brand-green-400 lg:text-sm xl:text-base">
                          {item.label}
                        </p>
                      </div>

                      {/* Right-Aligned Arrow */}
                      <div className="flex items-center justify-end">
                        <ArrowForwardIcon
                          sx={{ fontSize: 16 }}
                          className="text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-green-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <HeroToFeaturesWave />
        </section>

        {/* ─── SIMPLE 4-STEP JOURNEY ─── (SECTION 2: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-10 z-0 h-80 w-80 rounded-full bg-brand-green-500/5 blur-[120px]" />

          {/* Green growth chart decoration — top left */}
          <img
            src={growthChartImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-0 top-28 z-0 hidden w-20 select-none animate-float lg:block xl:w-28"
          />

          {/* Rocket decoration — top right */}
          <img
            src={rocketImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute right-3 top-6 z-0 hidden w-20 select-none animate-float delay-300 lg:block lg:right-6 lg:w-24 xl:right-8 xl:w-28"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                The SmartFin Compass Journey
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950">
                From Financial Information to Financial Confidence
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/70">
                Everything is designed to make understanding and improving your financial life simple.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {JOURNEY_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="group card-hover-effect relative rounded-3xl border border-navy-950/15 bg-white p-7 shadow-[0_16px_38px_-18px_rgba(13,37,73,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-500/40 hover:shadow-[0_26px_54px_-20px_rgba(13,37,73,0.4)]"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-4 transition-transform duration-300 group-hover:scale-110 lg:h-16 lg:w-16 ${s.ringColor} ${s.color}`}>
                      <s.icon sx={{ fontSize: 28 }} />
                    </span>
                    <span className="text-xs font-bold text-navy-900/40">{s.step}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-navy-900/70">
                    {s.desc}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm sm:text-base font-medium text-navy-900/70">
                        <CheckCircleIcon sx={{ fontSize: 18, color: "#22b573" }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-layer Wave Transition to A Smarter Way */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── DETAILED PROCESS / TIMELINE ─── (SECTION 3: DARK BLUE) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-10 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 z-0 h-80 w-80 rounded-full bg-[#00E676]/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                How SmartFin Compass Works
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                A Smarter Way to Understand Your Finances
              </h2>
            </div>

            <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
              {/* LEFT — main supporting illustration */}
              <div className="relative flex items-center justify-center">
                <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-r from-cyan-500/20 via-brand-green-500/20 to-blue-500/20 opacity-60 blur-2xl" />
                <img
                  src={smarterWayImg}
                  alt="A smarter way to understand your finances illustration"
                  draggable={false}
                  className="relative z-10 w-full max-w-xs select-none object-contain animate-float sm:max-w-sm lg:max-w-none"
                />
              </div>

              {/* RIGHT — timeline steps */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-brand-green-400/50 via-brand-green-400 to-brand-green-400/50 lg:block" />

                <div className="space-y-6">
                  {TIMELINE_STEPS.map((s) => (
                    <div
                      key={s.num}
                      className="group relative flex items-start gap-5 lg:gap-6"
                    >
                      {/* Step number bubble */}
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green-500 text-sm sm:text-base font-bold text-white shadow-[0_0_20px_rgba(34,181,115,0.25)] ring-4 ring-navy-950 transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(34,181,115,0.35)]">
                        {s.num}
                      </div>

                      {/* Content card */}
                      <div className="card-hover-effect flex-1 rounded-2xl border border-white/15 bg-navy-900/90 p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.07)] transition-all duration-300 group-hover:border-brand-green-400/60 sm:p-6">
                        <div className="flex items-start gap-4">
                          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${s.color}`}>
                            <s.icon sx={{ fontSize: 24 }} />
                          </span>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-green-400 transition-colors duration-300">
                              {s.title}
                            </h3>
                            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                              {s.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="mt-10 sm:mt-14">
            <HowItWorksToBenefitsWave />
          </div>
        </section>

        {/* ─── AI ANALYSIS ─── (SECTION 4: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute left-1/4 top-0 z-0 h-[420px] w-[420px] rounded-full bg-brand-green-500/5 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                AI-Powered Analysis
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950">
                Your Financial Picture, Analyzed From Every Angle
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/70">
                Our AI looks beyond individual numbers to understand how different parts of your financial life work together.
              </p>
            </div>

            <div className="mt-14 grid items-center gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
              {/* LEFT — main supporting illustration */}
              <div className="relative flex items-center justify-center">
                <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-r from-sky-500/15 via-cyan-500/15 to-brand-green-500/15 opacity-70 blur-2xl" />
                <img
                  src={financialPictureImg}
                  alt="Your financial picture analyzed from every angle illustration"
                  draggable={false}
                  className="relative z-10 w-full max-w-xs select-none object-contain animate-float sm:max-w-sm lg:max-w-none"
                />
              </div>

              {/* RIGHT — financial information cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {AI_CARDS.map((c) => (
                  <div
                    key={c.title}
                    className="group card-hover-effect rounded-3xl border border-navy-950/15 bg-white p-7 shadow-[0_16px_38px_-18px_rgba(13,37,73,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-500/40 hover:shadow-[0_26px_54px_-20px_rgba(13,37,73,0.4)]"
                  >
                    <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 lg:h-16 lg:w-16 ${c.color}`}>
                      <c.icon sx={{ fontSize: 30 }} />
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-navy-900/70">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Multi-layer Wave Transition to Know What to Do Next */}
          <BenefitsToTestimonialsWave />
        </section>

        {/* ─── PERSONALIZED ROADMAP ─── (SECTION 5: DARK BLUE) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute -left-20 top-1/3 z-0 h-80 w-80 rounded-full bg-brand-green-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 bottom-1/4 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

          {/* Goals target decoration — upper left */}
          <img
            src={yourGoalsImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute left-3 top-8 z-0 hidden w-16 select-none animate-float delay-300 sm:block sm:w-20 lg:left-6 lg:w-24 xl:left-10 xl:w-28"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                Your Roadmap
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                Know What to Do Next
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
                SmartFin Compass doesn't just tell you where you stand. It helps you understand what actions can move you forward.
              </p>
            </div>

            <div className="relative mt-14">
              <div className="card-hover-effect rounded-3xl border border-white/10 bg-navy-900/85 p-8 shadow-xl backdrop-blur-md sm:p-10">
                <div className="mb-6 flex items-center gap-2">
                  <span className="rounded-full bg-brand-green-500/20 border border-brand-green-400/30 px-3.5 py-1 text-xs sm:text-sm font-semibold text-brand-green-400">
                    Personalized for your financial profile
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {ROADMAP_CARDS.map((r) => (
                    <div
                      key={r.title}
                      className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/60 hover:bg-white/[0.12] hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${r.color}`}>
                          <r.icon sx={{ fontSize: 22 }} />
                        </span>
                        <div>
                          <p className="text-sm sm:text-base font-bold text-white">{r.title}</p>
                          <p className="mt-0.5 text-xs sm:text-sm font-semibold text-brand-green-400">{r.time}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
                        {r.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="mt-10 sm:mt-14">
            <TestimonialsToFaqWave />
          </div>
        </section>

        {/* ─── WHY THIS PROCESS IS DIFFERENT ─── (SECTION 6: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 right-1/4 z-0 h-[420px] w-[560px] rounded-full bg-emerald-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 left-10 z-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950">
                Built Around You — Not Generic Financial Advice
              </h2>
            </div>

            {/* Target / action illustration — right side */}
            <img
              src={builtAroundImg}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none absolute right-2 top-2 z-0 hidden w-20 select-none animate-float delay-300 lg:block lg:w-24 xl:bottom-8 xl:right-4 xl:top-auto xl:w-36"
            />

            <div className="relative z-10 mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:pr-44">
              {DIFFERENTIATORS.map((d) => (
                <div
                  key={d.title}
                  className="group card-hover-effect rounded-3xl border border-navy-950/15 bg-white p-7 shadow-[0_16px_38px_-18px_rgba(13,37,73,0.35)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-500/40 hover:shadow-[0_26px_54px_-20px_rgba(13,37,73,0.4)]"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 lg:h-16 lg:w-16 ${d.color}`}>
                    <d.icon sx={{ fontSize: 30 }} />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {d.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-navy-900/70">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-layer Wave Transition to Data Protection */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── SECURITY ─── (SECTION 7: DARK BLUE) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/3 top-0 z-0 h-96 w-96 rounded-full bg-brand-green-500/10 blur-[130px]" />
          <div className="pointer-events-none absolute right-1/4 bottom-0 z-0 h-96 w-96 rounded-full bg-sky-500/10 blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-900/70 px-6 py-14 shadow-xl backdrop-blur-xl sm:px-10 lg:px-14">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-green-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

              <div className="relative grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                {/* LEFT — security illustration */}
                <div className="relative flex items-center justify-center">
                  <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-r from-brand-green-500/20 via-cyan-500/20 to-sky-500/20 opacity-60 blur-2xl" />
                  <img
                    src={yourImg}
                    alt="Your financial data stays protected illustration"
                    draggable={false}
                    className="relative z-10 w-full max-w-[240px] select-none object-contain animate-float sm:max-w-xs lg:max-w-none"
                  />
                </div>

                {/* RIGHT — heading + description */}
                <div className="text-center">
                  <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-500/15 text-brand-green-400">
                    <ShieldIcon sx={{ fontSize: 32 }} />
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                    Your Financial Data Stays Protected
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                    Your financial information is handled with security and privacy in mind. SmartFin Compass is designed to help you understand your finances without compromising trust.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 text-center shadow-[0_14px_30px_-18px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50 hover:bg-white/[0.1] hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.85)]">
                  <VerifiedUserIcon sx={{ fontSize: 32, color: "#22b573" }} />
                  <p className="mt-4 text-base font-bold text-white">100% Secure & Private</p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                    Your information is protected and never shared unnecessarily.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 text-center shadow-[0_14px_30px_-18px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50 hover:bg-white/[0.1] hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.85)]">
                  <LockIcon sx={{ fontSize: 32, color: "#22b573" }} />
                  <p className="mt-4 text-base font-bold text-white">Bank-Level Security</p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                    Your sensitive financial information is handled using strong security practices.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 text-center shadow-[0_14px_30px_-18px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50 hover:bg-white/[0.1] hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.85)]">
                  <PrivacyTipIcon sx={{ fontSize: 32, color: "#22b573" }} />
                  <p className="mt-4 text-base font-bold text-white">Your Data, Your Control</p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                    You remain in control of your financial information and assessment journey.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-10 text-center">
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-brand-green-400 transition-colors duration-200 hover:text-brand-green-300"
                >
                  Learn More About Security
                  <ArrowForwardIcon sx={{ fontSize: 16 }} />
                </Link>
              </div>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="mt-10 sm:mt-14">
            <HowItWorksToBenefitsWave />
          </div>
        </section>

        {/* ─── FINAL CTA ─── (SECTION 8: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-1/4 z-0 h-[420px] w-[620px] rounded-full bg-cyan-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/3 z-0 h-80 w-80 rounded-full bg-brand-green-500/5 blur-[120px]" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-10">
            {/* LEFT — CTA illustration */}
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-r from-brand-green-500/15 via-cyan-500/15 to-blue-500/15 opacity-70 blur-2xl" />
              <img
                src={financialFutureImg}
                alt="Understand your financial future illustration"
                draggable={false}
                className="relative z-10 w-full max-w-xs select-none object-contain animate-float sm:max-w-sm lg:max-w-[420px]"
              />
            </div>

            {/* RIGHT — CTA content */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                Ready to Understand Your{" "}
                <span className="text-brand-green-600">Financial Future?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-navy-900/75">
                Take the first step toward financial clarity. Complete your SmartFin Compass assessment and discover where you stand — and what you can do next.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <Link
                  to="/login"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-10 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-brand-green-500/25 transition-all duration-250 hover:bg-brand-green-600"
                >
                  Start Your Assessment
                  <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-1" />
                </Link>
                <Link
                  to="/features"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg border border-navy-950/20 px-10 py-4 text-sm sm:text-base font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600"
                >
                  Explore SmartFin Compass
                </Link>
              </div>

              <p className="mt-6 text-sm font-medium text-navy-900/60">
                20–25 minutes &bull; Guided assessment &bull; Personalized financial insights
              </p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
