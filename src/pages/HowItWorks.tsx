import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SecurityIcon from "@mui/icons-material/Security";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import FolderIcon from "@mui/icons-material/Folder";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
  { num: "01", title: "Personal Information", desc: "Build your financial profile with essential personal and professional information.", icon: PersonIcon },
  { num: "02", title: "Income & Expenses", desc: "Understand your earning capacity, spending patterns and savings behaviour.", icon: ReceiptLongIcon },
  { num: "03", title: "Assets & Liabilities", desc: "See what you own, what you owe and how your net worth is positioned.", icon: AccountBalanceWalletIcon },
  { num: "04", title: "Insurance & Investments", desc: "Evaluate your protection, investment experience, risk appetite and financial readiness.", icon: SecurityIcon },
  { num: "05", title: "Financial Goals", desc: "Define the goals that matter most — from emergency funds and home ownership to retirement and wealth creation.", icon: FlagCircleIcon },
  { num: "06", title: "Documents", desc: "Improve financial readiness by organizing important financial documents.", icon: FolderIcon },
  { num: "07", title: "AI Analysis", desc: "SmartFin Compass processes your information to generate a comprehensive financial assessment.", icon: PsychologyIcon },
  { num: "08", title: "Personalized Roadmap", desc: "Get clear priorities, recommendations and next actions based on your financial profile.", icon: MapIcon },
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

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
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

export default function HowItWorks() {
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
                  link.label === "How It Works" ? "text-navy-950" : "text-navy-900/70 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                  link.label === "How It Works" ? "w-full" : "w-0 group-hover/nav:w-full"
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
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-navy-950 text-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green-500/15 via-navy-900/50 to-transparent" />
          <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl animate-pulse-glow" />

          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10 lg:py-28">
            <div className="animate-fade-in-up">
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

            {/* Hero Visual — Journey Flow */}
            <div className="relative animate-fade-in-up delay-200">
              <div className="rounded-3xl border border-white/10 bg-navy-900/90 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
                <p className="mb-6 text-base sm:text-lg font-bold text-white">
                  Your SmartFin Compass Journey
                </p>

                <div className="relative flex flex-col gap-2">
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
                      className="group relative grid grid-cols-[48px_1fr_20px] items-center gap-4 rounded-2xl px-3 py-2.5 transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
                    >
                      {/* Fixed-width Icon Container */}
                      <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${item.color}`}>
                        <item.icon sx={{ fontSize: 22 }} />
                      </div>

                      {/* Consistently Aligned Text Label */}
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-white transition-colors duration-200 group-hover:text-brand-green-400">
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
        </section>

        {/* ─── SIMPLE 4-STEP JOURNEY ─── (SECTION 2: WHITE) */}
        <section className="bg-white py-24 text-navy-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                The SmartFin Compass Journey
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                From Financial Information to Financial Confidence
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/70">
                Everything is designed to make understanding and improving your financial life simple.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {JOURNEY_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="group card-hover-effect relative rounded-2xl border border-navy-950/10 bg-white p-7 shadow-soft transition-all duration-300 hover:border-brand-green-100"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl ring-4 ${s.ringColor} ${s.color} transition-transform duration-300 group-hover:scale-110`}>
                      <s.icon sx={{ fontSize: 24 }} />
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
                        <CheckCircleIcon sx={{ fontSize: 16, color: "#22b573" }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DETAILED PROCESS / TIMELINE ─── (SECTION 3: DARK BLUE) */}
        <section className="bg-navy-950 py-24 text-white border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                How SmartFin Compass Works
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                A Smarter Way to Understand Your Finances
              </h2>
            </div>

            <div className="relative mt-16">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-brand-green-400/50 via-brand-green-400 to-brand-green-400/50 lg:block" />

              <div className="space-y-8">
                {TIMELINE_STEPS.map((s) => (
                  <div
                    key={s.num}
                    className="group relative flex items-start gap-6 lg:gap-10"
                  >
                    {/* Step number bubble */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green-500 text-sm sm:text-base font-bold text-white shadow-[0_0_20px_rgba(34,181,115,0.25)] ring-4 ring-navy-950 transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(34,181,115,0.35)]">
                      {s.num}
                    </div>

                    {/* Content card */}
                    <div className="card-hover-effect flex-1 rounded-2xl border border-white/10 bg-navy-900/90 p-6 shadow-xl transition-all duration-300 group-hover:border-brand-green-400/50">
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-500/20 text-brand-green-400">
                          <s.icon sx={{ fontSize: 20 }} />
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
        </section>

        {/* ─── AI ANALYSIS ─── (SECTION 4: WHITE) */}
        <section className="bg-white py-24 text-navy-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                AI-Powered Analysis
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                Your Financial Picture, Analyzed From Every Angle
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/70">
                Our AI looks beyond individual numbers to understand how different parts of your financial life work together.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {AI_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-7 shadow-soft transition-all duration-300 hover:border-brand-green-100"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
                    <c.icon sx={{ fontSize: 28 }} />
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
        </section>

        {/* ─── PERSONALIZED ROADMAP ─── (SECTION 5: DARK BLUE) */}
        <section className="bg-navy-950 py-24 text-white border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                Your Roadmap
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Know What to Do Next
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
                SmartFin Compass doesn't just tell you where you stand. It helps you understand what actions can move you forward.
              </p>
            </div>

            <div className="relative mt-14">
              <div className="card-hover-effect rounded-3xl border border-white/10 bg-navy-900/90 p-8 shadow-xl backdrop-blur-md sm:p-10">
                <div className="mb-6 flex items-center gap-2">
                  <span className="rounded-full bg-brand-green-500/20 border border-brand-green-400/30 px-3.5 py-1 text-xs sm:text-sm font-semibold text-brand-green-400">
                    Personalized for your financial profile
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {ROADMAP_CARDS.map((r) => (
                    <div
                      key={r.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-brand-green-400/50 hover:bg-white/10"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${r.color}`}>
                          <r.icon sx={{ fontSize: 18 }} />
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
        </section>

        {/* ─── WHY THIS PROCESS IS DIFFERENT ─── (SECTION 6: WHITE) */}
        <section className="bg-white py-24 text-navy-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                Built Around You — Not Generic Financial Advice
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DIFFERENTIATORS.map((d) => (
                <div
                  key={d.title}
                  className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-7 shadow-soft transition-all duration-300 hover:border-brand-green-100"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${d.color}`}>
                    <d.icon sx={{ fontSize: 28 }} />
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
        </section>

        {/* ─── SECURITY ─── (SECTION 7: DARK BLUE) */}
        <section className="bg-navy-950 py-20 text-white border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 px-8 py-16 sm:px-16 shadow-xl">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-green-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

              <div className="relative">
                <div className="mx-auto max-w-2xl text-center">
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

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                    <VerifiedUserIcon sx={{ fontSize: 28, color: "#22b573" }} />
                    <p className="mt-4 text-base font-bold text-white">100% Secure & Private</p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                      Your information is protected and never shared unnecessarily.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                    <LockIcon sx={{ fontSize: 28, color: "#22b573" }} />
                    <p className="mt-4 text-base font-bold text-white">Bank-Level Security</p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                      Your sensitive financial information is handled using strong security practices.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                    <PrivacyTipIcon sx={{ fontSize: 28, color: "#22b573" }} />
                    <p className="mt-4 text-base font-bold text-white">Your Data, Your Control</p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                      You remain in control of your financial information and assessment journey.
                    </p>
                  </div>
                </div>

                <div className="mt-10 text-center">
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
          </div>
        </section>

        {/* ─── FINAL CTA ─── (SECTION 8: WHITE) */}
        <section className="relative overflow-hidden bg-white py-24 text-navy-950 border-t border-navy-950/10">
          <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
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
                AI-powered financial wellness platform that helps you make smarter financial decisions.
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
