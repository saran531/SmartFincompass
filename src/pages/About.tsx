import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import ShieldIcon from "@mui/icons-material/Shield";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SpeedIcon from "@mui/icons-material/Speed";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MapIcon from "@mui/icons-material/Map";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import WarningIcon from "@mui/icons-material/Warning";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DescriptionIcon from "@mui/icons-material/Description";

// ─── Illustrations ───
import financialFutureImg from "../Assets/images/FinancialFuture.png";
import builtAroundImg from "../Assets/images/BuiltAround.png";
import clockImg from "../Assets/images/clock.png";
import yourGoalsImg from "../Assets/images/yourgoals.png";
import worldImg from "../Assets/images/World.png";
import computerImg from "../Assets/images/computer.png";
import yourImg from "../Assets/images/your.png";
import financialPictureImg from "../Assets/images/FinancialPicture.png";
import rocketImg from "../Assets/images/Rocket.png";
import leafImg from "../Assets/images/Leaf.png";

// ─── Reusable Section Transitions ───
import {
  HeroToFeaturesWave,
  FeaturesToHowItWorksWave,
  HowItWorksToBenefitsWave,
  BenefitsToTestimonialsWave,
  TestimonialsToFaqWave,
} from "../components/waves/SectionWaves";


const CHALLENGE_CARDS = [
  { icon: WarningIcon, color: "text-rose-500 bg-rose-50", title: "Scattered Information", desc: "Important financial information can exist across multiple documents, accounts and decisions." },
  { icon: HelpOutlineIcon, color: "text-amber-accent bg-amber-50", title: "Unclear Priorities", desc: "Knowing what to do first can be just as difficult as knowing what to do." },
  { icon: PersonIcon, color: "text-violet-500 bg-violet-50", title: "Generic Advice", desc: "Financial recommendations often fail to account for an individual's actual situation and goals." },
  { icon: VisibilityOffIcon, color: "text-sky-500 bg-sky-50", title: "Limited Visibility", desc: "Without a complete financial picture, risks and opportunities can remain hidden." },
];

const PLATFORM_CARDS = [
  { icon: SpeedIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Financial Health", desc: "Understand your overall financial readiness and identify areas that need attention." },
  { icon: InsightsIcon, color: "text-sky-500 bg-sky-50", title: "Cash Flow", desc: "Analyze income, expenses, savings capacity and monthly surplus." },
  { icon: AccountBalanceIcon, color: "text-violet-500 bg-violet-50", title: "Net Worth", desc: "Understand your assets, liabilities and overall financial position." },
  { icon: CreditCardOffIcon, color: "text-rose-500 bg-rose-50", title: "Debt", desc: "Evaluate your debt burden and identify repayment priorities." },
  { icon: ShieldIcon, color: "text-amber-accent bg-amber-50", title: "Insurance", desc: "Understand your protection needs and identify potential coverage gaps." },
  { icon: TrendingUpIcon, color: "text-emerald-600 bg-emerald-50", title: "Investments", desc: "Evaluate your investment readiness, experience and financial capacity." },
  { icon: FlagIcon, color: "text-sky-500 bg-sky-50", title: "Financial Goals", desc: "Connect your current financial position with the goals you want to achieve." },
  { icon: AutoAwesomeIcon, color: "text-indigo-500 bg-indigo-50", title: "AI Insights", desc: "Turn your financial information into personalized insights and actionable recommendations." },
];

const PRINCIPLES = [
  { icon: LightbulbIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Clarity Over Complexity", desc: "Financial information should be easier to understand." },
  { icon: PersonIcon, color: "text-violet-500 bg-violet-50", title: "Personalization Matters", desc: "Your financial situation and goals are unique." },
  { icon: RocketLaunchIcon, color: "text-sky-500 bg-sky-50", title: "Action Over Information", desc: "Insights are valuable when they help you decide what to do next." },
  { icon: ShieldIcon, color: "text-rose-500 bg-rose-50", title: "Privacy Builds Trust", desc: "Financial information deserves careful protection and responsible handling." },
  { icon: TrendingUpIcon, color: "text-amber-accent bg-amber-50", title: "Progress Is a Journey", desc: "Better financial health is built through consistent decisions over time." },
];

const AUDIENCE_CARDS = [
  { icon: PersonIcon, color: "text-violet-500 bg-violet-50", title: "Starting Out", desc: "For people who want to understand their financial foundation and build better habits." },
  { icon: ShieldIcon, color: "text-sky-500 bg-sky-50", title: "Building Stability", desc: "For people focused on savings, emergency funds, debt management and financial resilience." },
  { icon: TrendingUpIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Growing Wealth", desc: "For people looking to improve investment readiness and build long-term wealth." },
  { icon: AccountBalanceIcon, color: "text-rose-500 bg-rose-50", title: "Planning Ahead", desc: "For people preparing for major goals, long-term financial independence and future security." },
];

const JOURNEY_STEPS = [
  "Create Your Profile",
  "Complete Assessment",
  "AI Analysis",
  "Financial Health Score",
  "Personalized Insights",
  "Financial Roadmap",
  "Take Action",
];


/* Decorative leaf accent used across the reference design */
function Leaf({ className = "" }: { className?: string }) {
  return (
    <img
      src={leafImg}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute z-0 select-none opacity-70 ${className}`}
    />
  );
}

/* Readable icon tile colour for dark-section cards */
const darkIconClass = (color: string) => color.split(" ")[0].replace("green-600", "green-400");

export default function About() {

  return (
    <div className="min-h-screen bg-white">

      <main>
        {/* ─── SECTION 1: HERO (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-navy-950 text-white">
          {/* Premium fintech backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-15" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[700px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green-500/15 via-navy-900/50 to-transparent" />
          <div className="pointer-events-none absolute -top-40 -right-40 z-0 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl animate-pulse-glow" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 z-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-28 left-1/3 z-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center lg:gap-6 lg:px-10 lg:py-24 xl:gap-8">
            <div className="animate-fade-in-up">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                About SmartFin Compass
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white">
                Helping You Navigate Your{" "}
                <span className="text-brand-green-400">Financial Future</span>{" "}
                With Confidence
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
                SmartFin Compass is an AI-powered financial wellness platform designed to help you understand where you stand financially, identify what needs attention and take smarter steps toward your goals.
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
                  to="/how-it-works"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-250 hover:border-white/40 hover:bg-white/10"
                >
                  See How It Works
                </Link>
              </div>
            </div>

            {/* Hero illustration — centre of the hero */}
            <img
              src={financialFutureImg}
              alt="SmartFin Compass financial future illustration"
              draggable={false}
              className="mx-auto w-64 max-w-full select-none animate-fade-in-up delay-100 sm:w-72 lg:w-44 xl:w-64 2xl:w-72"
            />

            {/* Hero Visual — Ecosystem */}
            <div className="mx-auto w-full max-w-[560px] animate-fade-in-up delay-200 lg:w-[350px] lg:max-w-none xl:w-[390px] 2xl:w-[420px]">
              <div className="rounded-3xl border border-white/15 bg-navy-900/85 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-500 text-white shadow-[0_4px_20px_rgba(34,181,115,0.3)]">
                    <AutoAwesomeIcon sx={{ fontSize: 28 }} />
                  </span>
                  <p className="mt-3 text-base sm:text-lg font-bold text-white">SmartFin Compass AI</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-300">Financial Intelligence Platform</p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { icon: SpeedIcon, label: "Health Score", color: "text-brand-green-400 bg-brand-green-500/20" },
                    { icon: AccountBalanceIcon, label: "Income", color: "text-sky-400 bg-sky-500/20" },
                    { icon: CreditCardOffIcon, label: "Expenses", color: "text-rose-400 bg-rose-500/20" },
                    { icon: SavingsIcon, label: "Savings", color: "text-violet-400 bg-violet-500/20" },
                    { icon: TrendingUpIcon, label: "Investments", color: "text-emerald-400 bg-emerald-500/20" },
                    { icon: ShieldIcon, label: "Insurance", color: "text-amber-accent bg-amber-500/20" },
                    { icon: FlagIcon, label: "Goals", color: "text-sky-400 bg-sky-500/20" },
                    { icon: MapIcon, label: "Roadmap", color: "text-brand-green-400 bg-brand-green-500/20" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition-all duration-200 hover:border-brand-green-400/40 hover:bg-white/10"
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                        <item.icon sx={{ fontSize: 20 }} />
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-brand-green-500/30 bg-brand-green-500/10 px-4 py-3 text-center">
                  <p className="text-xs sm:text-sm font-bold text-brand-green-400">
                    AI-powered personalized financial insights & roadmap
                  </p>
                </div>
              </div>
            </div>
          </div>

          <HeroToFeaturesWave />
        </section>

        {/* ─── SECTION 2: OUR STORY (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 right-0 z-0 h-[380px] w-[640px] rounded-full bg-brand-green-100/50 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-10 left-10 z-0 h-72 w-72 rounded-full bg-cyan-100/60 blur-[120px]" />
          <Leaf className="hidden right-5 top-5 w-16 lg:block xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                  Our Story
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                  Financial Decisions Should Feel Clear, Not Complicated
                </h2>
                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-navy-900/75">
                  <p>
                    Managing money is rarely about a single number. Your income, expenses, savings, debt, insurance, investments and goals are all connected.
                  </p>
                  <p>
                    Yet financial information is often scattered across documents, accounts and decisions, making it difficult to understand the bigger picture.
                  </p>
                  <p>
                    SmartFin Compass was designed to bring that picture together.
                  </p>
                  <p>
                    By combining structured financial assessment with AI-powered analysis, the platform helps transform complex financial information into clear insights, priorities and practical next steps.
                  </p>
                </div>
              </div>

              {/* Visual Journey + illustration */}
              <div className="flex items-center gap-5 xl:gap-6">
                <div className="min-w-0 flex-1 rounded-3xl border border-navy-950/10 bg-slate-50/80 p-7 shadow-card sm:p-8">
                  <p className="mb-6 text-base sm:text-lg font-bold text-navy-950">The SmartFin Compass Journey</p>
                  <div className="relative flex flex-col gap-3">
                    {/* Vertical connector line */}
                    <div className="absolute left-[36px] top-6 bottom-6 w-0.5 -translate-x-1/2 bg-navy-950/10 z-0" />

                    {[
                      { label: "Financial Data", color: "text-sky-500 bg-sky-50", icon: DescriptionIcon },
                      { label: "AI Analysis", color: "text-violet-500 bg-violet-50", icon: PsychologyIcon },
                      { label: "Financial Insights", color: "text-brand-green-600 bg-brand-green-50", icon: InsightsIcon },
                      { label: "Personalized Roadmap", color: "text-rose-500 bg-rose-50", icon: MapIcon },
                      { label: "Better Decisions", color: "text-emerald-600 bg-emerald-50", icon: RocketLaunchIcon },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="group relative grid grid-cols-[48px_1fr_20px] items-center gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-white hover:shadow-sm hover:translate-x-1"
                      >
                        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${item.color}`}>
                          <item.icon sx={{ fontSize: 24 }} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-semibold text-navy-950 transition-colors duration-200 group-hover:text-brand-green-600">
                            {item.label}
                          </p>
                        </div>

                        <div className="flex items-center justify-end">
                          <ArrowForwardIcon
                            sx={{ fontSize: 16 }}
                            className="text-navy-900/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-green-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section illustration */}
                <img
                  src={builtAroundImg}
                  alt="SmartFin Compass journey illustration"
                  draggable={false}
                  className="hidden w-40 shrink-0 select-none xl:block 2xl:w-48"
                />
              </div>
            </div>
          </div>

          {/* Multi-layer Wave Transition */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── SECTION 3: THE CHALLENGE (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-10 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 z-0 h-80 w-80 rounded-full bg-[#00E676]/10 blur-[120px]" />

          {/* Compass illustration — right of the heading */}
          <img
            src={clockImg}
            alt="Connected financial decisions illustration"
            draggable={false}
            className="pointer-events-none absolute right-4 top-6 z-10 hidden w-32 select-none lg:block xl:right-10 xl:w-40"
          />
          <Leaf className="hidden left-4 top-8 w-16 opacity-50 xl:block 2xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                The Challenge
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Your Financial Life Is Connected. Your Decisions Should Be Too.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
                Financial decisions are often made independently — saving here, investing there, managing debt somewhere else. Without a complete picture, it can be difficult to know what should come first.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CHALLENGE_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border border-white/15 bg-navy-900/90 p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-400/50 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.8)] sm:p-8"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-transform duration-300 group-hover:scale-110 ${darkIconClass(c.color)}`}>
                    <c.icon sx={{ fontSize: 30 }} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-green-400 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300 font-medium">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <HowItWorksToBenefitsWave />
          </div>
        </section>

        {/* ─── SECTION 4: OUR MISSION (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-10 right-10 z-0 h-72 w-72 rounded-full bg-brand-green-500/5 blur-[120px]" />

          {/* yourgoals illustration — left of the heading */}
          <img
            src={yourGoalsImg}
            alt="Financial clarity for everyone illustration"
            draggable={false}
            className="pointer-events-none absolute left-4 top-8 z-10 hidden w-32 select-none lg:block xl:left-10 xl:w-40"
          />
          <Leaf className="hidden right-5 top-5 w-16 opacity-70 md:block xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                Our Mission
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                Make Financial Clarity Accessible to Everyone
              </h2>
              <p className="mt-5 text-lg sm:text-xl font-bold text-navy-950">
                Our mission is to make personal financial understanding simpler, more personalized and more actionable through intelligent technology.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-navy-900/75">
                We believe people should be able to understand their financial position without needing to become financial experts.
              </p>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-navy-900/75">
                SmartFin Compass brings together financial information, AI-powered analysis and personalized recommendations to help people make more informed decisions.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { icon: SpeedIcon, color: "text-violet-500 bg-violet-50", title: "Understand", desc: "Know where you stand financially." },
                { icon: MapIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Plan", desc: "Understand what deserves attention next." },
                { icon: RocketLaunchIcon, color: "text-sky-500 bg-sky-50", title: "Grow", desc: "Take consistent steps toward your financial goals." },
              ].map((p) => (
                <div
                  key={p.title}
                  className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-8 text-center shadow-soft transition-all duration-300 hover:border-brand-green-500/40 hover:shadow-card"
                >
                  <span className={`mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${p.color}`}>
                    <p.icon sx={{ fontSize: 32 }} />
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/70 font-medium">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-layer Wave Transition */}
          <BenefitsToTestimonialsWave />
        </section>

        {/* ─── SECTION 5: OUR VISION (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute -top-24 left-1/4 z-0 h-80 w-80 rounded-full bg-brand-green-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                  Our Vision
                </p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                  A World Where Everyone Can Navigate Their Financial Future
                </h2>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300">
                  We envision a future where financial planning is not confusing, intimidating or reserved for people with specialized knowledge.
                </p>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                  SmartFin Compass aims to make financial intelligence easier to understand and easier to act upon — helping individuals build stronger financial habits, prepare for uncertainty and work toward meaningful goals.
                </p>
              </div>

              <div className="flex items-center justify-center gap-5 lg:justify-end lg:gap-6">
                <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-10 lg:w-72 lg:max-w-none lg:p-8 xl:w-80">
                  <p className="text-2xl font-extrabold text-white xl:text-3xl">
                    Understand Better.
                  </p>
                  <p className="mt-4 text-2xl font-extrabold text-brand-green-400 xl:text-3xl">
                    Decide Smarter.
                  </p>
                  <p className="mt-4 text-2xl font-extrabold text-white xl:text-3xl">
                    Move Forward.
                  </p>
                </div>

                {/* World illustration — far right */}
                <img
                  src={worldImg}
                  alt="A world of financial clarity illustration"
                  draggable={false}
                  className="w-32 shrink-0 select-none xl:w-48"
                />
              </div>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <TestimonialsToFaqWave />
          </div>
        </section>

        {/* ─── SECTION 6: PLATFORM OVERVIEW (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-10 z-0 h-80 w-80 rounded-full bg-brand-green-500/5 blur-[120px]" />
          <Leaf className="hidden left-4 top-5 w-16 lg:block xl:w-20" />
          <Leaf className="hidden bottom-5 right-5 w-16 rotate-90 opacity-60 lg:block xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                The SmartFin Compass Platform
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                One Connected View of Your Financial Wellness
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/75">
                SmartFin Compass brings the key dimensions of your financial life together into one structured assessment and intelligent analysis experience.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PLATFORM_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-7 shadow-soft transition-all duration-300 hover:border-brand-green-500/40 hover:shadow-card sm:p-8"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
                    <c.icon sx={{ fontSize: 30 }} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/70 font-medium">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-layer Wave Transition */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── SECTION 7: WHAT MAKES US DIFFERENT (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/3 top-0 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 right-1/3 z-0 h-80 w-80 rounded-full bg-brand-green-500/10 blur-[120px]" />

          {/* Computer illustration — right of the heading */}
          <img
            src={computerImg}
            alt="Financial context illustration"
            draggable={false}
            className="pointer-events-none absolute right-4 top-6 z-10 hidden w-32 select-none lg:block xl:right-10 xl:w-44"
          />
          <Leaf className="hidden left-4 top-6 w-16 opacity-50 xl:block 2xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                What Makes Us Different
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Not Just Financial Data. Financial Context.
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Traditional Card - Interactive */}
              <div
                tabIndex={0}
                role="button"
                className="group rounded-3xl border border-white/15 bg-navy-900/80 p-8 sm:p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 cursor-pointer"
              >
                <p className="text-xl sm:text-2xl font-bold text-slate-200">Traditional Financial Information</p>
                <ul className="mt-7 space-y-4">
                  {[
                    "Information is often scattered",
                    "Numbers without context",
                    "Generic recommendations",
                    "Difficult to identify priorities",
                    "Limited connection between goals and actions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <RemoveIcon sx={{ fontSize: 22, color: "#94a3b8", mt: 0.25 }} />
                      <span className="text-base sm:text-lg font-medium text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SmartFin Compass Card - Interactive */}
              <div
                tabIndex={0}
                role="button"
                className="group rounded-3xl border-2 border-brand-green-400 bg-navy-900/90 p-8 sm:p-10 shadow-[0_8px_40px_rgba(34,181,115,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(34,181,115,0.3)] cursor-pointer"
              >
                <p className="text-xl sm:text-2xl font-bold text-brand-green-400">SmartFin Compass</p>
                <ul className="mt-7 space-y-4">
                  {[
                    "Connected financial picture",
                    "AI-powered analysis",
                    "Personalized insights",
                    "Clear priorities",
                    "Goal-oriented roadmap",
                    "Actionable next steps",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <CheckCircleIcon sx={{ fontSize: 22, color: "#22b573", mt: 0.25 }} />
                      <span className="text-base sm:text-lg font-bold text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <HowItWorksToBenefitsWave />
          </div>
        </section>

        {/* ─── SECTION 8: CORE PRINCIPLES (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 right-1/4 z-0 h-[380px] w-[640px] rounded-full bg-brand-green-100/50 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 z-0 h-80 w-80 rounded-full bg-cyan-100/60 blur-[120px]" />
          <Leaf className="hidden left-4 top-5 w-16 lg:block xl:w-20" />
          <Leaf className="hidden right-4 top-5 w-16 -scale-x-100 opacity-60 lg:block xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                Core Principles
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                What We Believe
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-7 shadow-soft transition-all duration-300 hover:border-brand-green-500/40 hover:shadow-card sm:p-8"
                >
                  <span className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${p.color}`}>
                    <p.icon sx={{ fontSize: 32 }} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/70 font-medium">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-layer Wave Transition */}
          <BenefitsToTestimonialsWave />
        </section>

        {/* ─── SECTION 9: INTELLIGENCE WITH PURPOSE (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-10 z-0 h-80 w-80 rounded-full bg-brand-green-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                Intelligence With Purpose
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Technology Should Make Financial Decisions Easier
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
                SmartFin Compass uses AI to analyze financial information and identify patterns, opportunities and areas that may need attention.
              </p>
              <p className="mt-3 text-base sm:text-lg font-bold text-white">
                The goal is to turn complexity into clarity.
              </p>
            </div>

            <div className="relative mt-16">
              <div className="absolute left-0 right-0 top-12 hidden border-t-2 border-dashed border-white/20 lg:block" />
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { step: "01", title: "Collect", desc: "Build a structured understanding of your financial profile.", icon: DescriptionIcon },
                  { step: "02", title: "Analyze", desc: "Evaluate financial health, behaviour, risks and opportunities.", icon: PsychologyIcon },
                  { step: "03", title: "Guide", desc: "Present personalized insights, recommendations and a practical roadmap.", icon: MapIcon },
                ].map((s) => (
                  <div key={s.step} className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 grid h-24 w-24 place-items-center rounded-full bg-brand-green-500 ring-[6px] ring-navy-950 shadow-[0_0_36px_rgba(34,181,115,0.45)] transition-transform duration-300 group-hover:scale-105">
                      <s.icon className="text-white" sx={{ fontSize: 40 }} />
                      <span className="absolute -bottom-2 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white ring-2 ring-white/20">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-bold text-white">{s.title}</h3>
                    <p className="mt-3 max-w-[280px] text-sm sm:text-base leading-relaxed text-slate-300 font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mx-auto mt-14 max-w-2xl text-center text-xs sm:text-sm font-medium text-slate-400">
              SmartFin Compass is designed to support better financial decision-making. It does not replace professional financial, tax or legal advice.
            </p>
          </div>

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <TestimonialsToFaqWave />
          </div>
        </section>

        {/* ─── SECTION 10: SECURITY & TRUST (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-0 z-0 h-[420px] w-[720px] rounded-full bg-brand-green-100/50 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 z-0 h-80 w-80 rounded-full bg-cyan-100/60 blur-[120px]" />

          {/* Trust illustration — left side */}
          <img
            src={yourImg}
            alt="Financial information security illustration"
            draggable={false}
            className="pointer-events-none absolute left-4 top-6 z-10 hidden w-36 select-none lg:block xl:left-10 xl:w-44"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
                Your Financial Information Deserves Trust
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-navy-900/75">
                Financial information is personal. SmartFin Compass is designed with privacy and security as an important part of the experience.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-7 text-center shadow-soft transition-all duration-300 hover:border-brand-green-500/40 hover:shadow-card sm:p-8">
                <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-500/10 text-brand-green-600 transition-transform duration-300 group-hover:scale-110">
                  <VerifiedUserIcon sx={{ fontSize: 30 }} />
                </span>
                <p className="text-lg font-bold text-navy-950">Secure & Private</p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/70 font-medium">
                  Your financial information is handled with security and privacy in mind.
                </p>
              </div>
              <div className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-7 text-center shadow-soft transition-all duration-300 hover:border-brand-green-500/40 hover:shadow-card sm:p-8">
                <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-500/10 text-brand-green-600 transition-transform duration-300 group-hover:scale-110">
                  <AutoAwesomeIcon sx={{ fontSize: 30 }} />
                </span>
                <p className="text-lg font-bold text-navy-950">Responsible AI</p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/70 font-medium">
                  AI-generated insights are designed to help users understand their financial information and consider possible next steps.
                </p>
              </div>
              <div className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-7 text-center shadow-soft transition-all duration-300 hover:border-brand-green-500/40 hover:shadow-card sm:p-8">
                <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-500/10 text-brand-green-600 transition-transform duration-300 group-hover:scale-110">
                  <LockIcon sx={{ fontSize: 30 }} />
                </span>
                <p className="text-lg font-bold text-navy-950">User Control</p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/70 font-medium">
                  You remain in control of your financial information and financial decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Multi-layer Wave Transition */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── SECTION 11: TARGET AUDIENCE (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute -top-24 right-1/4 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 left-1/4 z-0 h-80 w-80 rounded-full bg-[#00E676]/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                Target Audience
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Built for Every Stage of Your Financial Journey
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCE_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border border-white/15 bg-navy-900/90 p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-brand-green-400/50 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.8)] sm:p-8"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-transform duration-300 group-hover:scale-110 ${darkIconClass(c.color)}`}>
                    <c.icon sx={{ fontSize: 30 }} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-green-400 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300 font-medium">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <HowItWorksToBenefitsWave />
          </div>
        </section>

        {/* ─── SECTION 12: CLEAR PATH FORWARD (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-72 w-72 rounded-full bg-brand-green-500/5 blur-[120px]" />
          <Leaf className="hidden left-5 bottom-5 w-16 opacity-60 lg:block xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                Clear Path Forward
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                From Understanding to Action
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/75">
                SmartFin Compass is designed to make the journey from financial information to financial action simple and structured.
              </p>
            </div>

            <div className="relative mt-14">
              {/* Soft connector line */}
              <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-navy-950/10 to-transparent lg:block" />

              <div className="relative flex flex-wrap items-center justify-center gap-3">
                {JOURNEY_STEPS.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="rounded-full border border-navy-950/10 bg-white px-6 py-3 text-sm sm:text-base font-semibold text-navy-950 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-green-500/50 hover:shadow-card">
                      {step}
                    </span>
                    {i < JOURNEY_STEPS.length - 1 && (
                      <ArrowForwardIcon sx={{ fontSize: 20 }} className="text-brand-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-brand-green-600 transition-colors duration-200 hover:text-brand-green-700"
              >
                See How It Works
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 13: FINAL CTA ─── */}
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 px-6 py-14 text-center shadow-xl sm:px-10 md:px-36 lg:px-48 xl:px-56">
              <div className="pointer-events-none absolute -left-32 top-0 z-0 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-32 bottom-0 z-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

              {/* Financial Picture — left side (desktop) */}
              <img
                src={financialPictureImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute bottom-0 left-4 z-0 hidden w-28 select-none md:block lg:left-8 lg:w-36 xl:w-40"
              />
              {/* Rocket — right side (desktop) */}
              <img
                src={rocketImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute right-4 top-6 z-0 hidden w-24 select-none md:block lg:right-8 lg:w-28 xl:w-32"
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Your Financial Future Starts With{" "}
                  <span className="text-brand-green-400">Understanding Where You Stand</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  Take the first step toward greater financial clarity. Complete your assessment and discover the insights, priorities and roadmap designed around your financial situation.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                  <Link
                    to="/login"
                    className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-10 py-4 text-[15px] font-semibold text-white shadow-lg shadow-brand-green-500/25 transition-all duration-250 hover:bg-brand-green-400"
                  >
                    Start Your Assessment
                    <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-1" />
                  </Link>
                  <Link
                    to="/features"
                    className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg border border-white/20 px-10 py-4 text-[15px] font-semibold text-white transition-all duration-250 hover:border-white/40 hover:text-brand-green-400"
                  >
                    Explore Features
                  </Link>
                </div>

                <p className="mt-6 text-sm text-slate-400">
                  20–25 minutes &bull; Guided assessment &bull; Personalized financial insights
                </p>
              </div>

              {/* Stacked CTA illustrations (mobile) */}
              <div className="relative z-10 mt-8 flex items-center justify-center gap-8 md:hidden">
                <img
                  src={financialPictureImg}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="w-32 select-none"
                />
                <img
                  src={rocketImg}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="w-28 select-none"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
