import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import WarningIcon from "@mui/icons-material/Warning";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DescriptionIcon from "@mui/icons-material/Description";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
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

export default function About() {
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
                  link.label === "About" ? "text-navy-950" : "text-navy-900/70 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                  link.label === "About" ? "w-full" : "w-0 group-hover/nav:w-full"
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
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-gradient-to-br from-brand-green-50 via-white to-sky-50" />

          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10 lg:py-28">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                About SmartFin Compass
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-navy-950 sm:text-5xl lg:text-6xl">
                Helping You Navigate Your{" "}
                <span className="text-brand-green-600">Financial Future</span>{" "}
                With Confidence
              </h1>
              <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-navy-900/70">
                SmartFin Compass is an AI-powered financial wellness platform designed to help you understand where you stand financially, identify what needs attention and take smarter steps toward your goals.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/login"
                  className="group/btn inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:shadow-sm active:translate-y-0"
                >
                  Start Your Assessment
                  <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-0.5" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="group/btn inline-flex items-center gap-2.5 rounded-lg border border-navy-950/15 px-7 py-3.5 text-[15px] font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98]"
                >
                  See How It Works
                </Link>
              </div>
            </div>

            {/* Hero Visual — Ecosystem */}
            <div className="relative">
              <div className="rounded-3xl border border-navy-950/5 bg-white p-7 shadow-card sm:p-8">
                <div className="flex flex-col items-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.3)]">
                    <AutoAwesomeIcon sx={{ fontSize: 28 }} />
                  </span>
                  <p className="mt-3 text-sm font-bold text-navy-950">SmartFin Compass AI</p>
                  <p className="text-xs text-navy-900/45">Financial Intelligence</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { icon: SpeedIcon, label: "Health Score", color: "text-brand-green-600 bg-brand-green-50" },
                    { icon: AccountBalanceIcon, label: "Income", color: "text-sky-500 bg-sky-50" },
                    { icon: CreditCardOffIcon, label: "Expenses", color: "text-rose-500 bg-rose-50" },
                    { icon: SavingsIcon, label: "Savings", color: "text-violet-500 bg-violet-50" },
                    { icon: TrendingUpIcon, label: "Investments", color: "text-emerald-600 bg-emerald-50" },
                    { icon: ShieldIcon, label: "Insurance", color: "text-amber-accent bg-amber-50" },
                    { icon: FlagIcon, label: "Goals", color: "text-sky-500 bg-sky-50" },
                    { icon: MapIcon, label: "Roadmap", color: "text-brand-green-600 bg-brand-green-50" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 rounded-xl border border-navy-950/5 bg-slate-50/60 px-3 py-2.5"
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                        <item.icon sx={{ fontSize: 16 }} />
                      </span>
                      <span className="text-xs font-semibold text-navy-950">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-brand-green-50/50 px-4 py-3 text-center">
                  <p className="text-xs font-semibold text-brand-green-700">
                    AI-powered personalized financial insights & roadmap
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── OUR STORY ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                Our Story
              </p>
              <h2 className="mt-4 text-2xl font-extrabold text-navy-950 sm:text-3xl lg:text-4xl">
                Financial Decisions Should Feel Clear, Not Complicated
              </h2>
              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-navy-900/70">
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

            {/* Visual Journey */}
            <div className="rounded-3xl border border-navy-950/5 bg-white p-8 shadow-card">
              <p className="mb-6 text-sm font-bold text-navy-950">The SmartFin Compass Journey</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Financial Data", color: "text-sky-500 bg-sky-50", icon: DescriptionIcon },
                  { label: "AI Analysis", color: "text-violet-500 bg-violet-50", icon: PsychologyIcon },
                  { label: "Financial Insights", color: "text-brand-green-600 bg-brand-green-50", icon: InsightsIcon },
                  { label: "Personalized Roadmap", color: "text-rose-500 bg-rose-50", icon: MapIcon },
                  { label: "Better Decisions", color: "text-emerald-600 bg-emerald-50", icon: RocketLaunchIcon },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                        <item.icon sx={{ fontSize: 20 }} />
                      </span>
                      {i < 4 && <div className="my-1 h-4 w-0.5 rounded-full bg-navy-950/10" />}
                    </div>
                    <div className="flex-1 rounded-xl border border-navy-950/5 bg-slate-50/60 px-4 py-3">
                      <p className="text-sm font-semibold text-navy-950">{item.label}</p>
                    </div>
                    {i < 4 && <ArrowForwardIcon sx={{ fontSize: 16 }} className="text-navy-900/25" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── THE PROBLEM ─── */}
        <section className="bg-slate-50/60 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                The Challenge
              </p>
              <h2 className="mt-4 text-2xl font-extrabold text-navy-950 sm:text-3xl lg:text-4xl">
                Your Financial Life Is Connected. Your Decisions Should Be Too.
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-navy-900/70">
                Financial decisions are often made independently — saving here, investing there, managing debt somewhere else. Without a complete picture, it can be difficult to know what should come first.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CHALLENGE_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border border-navy-950/5 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-100"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
                    <c.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-navy-900/60 font-medium">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR MISSION ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-green-50 via-white to-sky-50 py-24">
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                Our Mission
              </p>
              <h2 className="mt-4 text-2xl font-extrabold text-navy-950 sm:text-3xl lg:text-4xl">
                Make Financial Clarity Accessible to Everyone
              </h2>
              <p className="mt-5 text-base sm:text-lg font-bold text-navy-950">
                Our mission is to make personal financial understanding simpler, more personalized and more actionable through intelligent technology.
              </p>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-navy-900/70">
                We believe people should be able to understand their financial position without needing to become financial experts.
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-navy-900/70">
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
                  className="group rounded-2xl border border-navy-950/5 bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-100"
                >
                  <span className={`mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${p.color}`}>
                    <p.icon sx={{ fontSize: 32 }} />
                  </span>
                  <h3 className="text-xl font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-900/55">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR VISION ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-green-600">
                Our Vision
              </p>
              <h2 className="mt-4 text-3xl font-extrabold text-navy-950 sm:text-4xl">
                A World Where Everyone Can Navigate Their Financial Future
              </h2>
              <p className="mt-7 text-[15px] leading-relaxed text-navy-900/55">
                We envision a future where financial planning is not confusing, intimidating or reserved for people with specialized knowledge.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-navy-900/55">
                SmartFin Compass aims to make financial intelligence easier to understand and easier to act upon — helping individuals build stronger financial habits, prepare for uncertainty and work toward meaningful goals.
              </p>
            </div>

            <div className="rounded-3xl border border-navy-950/5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-10 text-center">
              <p className="text-2xl font-extrabold text-white sm:text-3xl">
                Understand Better.
              </p>
              <p className="mt-3 text-2xl font-extrabold text-brand-green-400 sm:text-3xl">
                Decide Smarter.
              </p>
              <p className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                Move Forward.
              </p>
            </div>
          </div>
        </section>

        {/* ─── WHAT SMARTFIN COMPASS DOES ─── */}
        <section className="bg-slate-50/60 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-green-600">
                The SmartFin Compass Platform
              </p>
              <h2 className="mt-4 text-3xl font-extrabold text-navy-950 sm:text-4xl">
                One Connected View of Your Financial Wellness
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-navy-900/55">
                SmartFin Compass brings the key dimensions of your financial life together into one structured assessment and intelligent analysis experience.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PLATFORM_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border border-navy-950/5 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-100"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
                    <c.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className="text-base font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy-900/55">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW WE ARE DIFFERENT ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-green-600">
              What Makes Us Different
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Not Just Financial Data. Financial Context.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Traditional */}
            <div className="rounded-3xl border border-navy-950/10 bg-white p-8 shadow-soft">
              <p className="text-lg font-bold text-navy-950">Traditional Financial Information</p>
              <ul className="mt-6 space-y-4">
                {[
                  "Information is often scattered",
                  "Numbers without context",
                  "Generic recommendations",
                  "Difficult to identify priorities",
                  "Limited connection between goals and actions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <RemoveIcon sx={{ fontSize: 18, color: "#d1d5db", mt: 0.25 }} />
                    <span className="text-sm text-navy-900/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SmartFin Compass */}
            <div className="rounded-3xl border-2 border-brand-green-400 bg-white p-8 shadow-[0_8px_40px_rgba(34,181,115,0.12)]">
              <p className="text-lg font-bold text-brand-green-600">SmartFin Compass</p>
              <ul className="mt-6 space-y-4">
                {[
                  "Connected financial picture",
                  "AI-powered analysis",
                  "Personalized insights",
                  "Clear priorities",
                  "Goal-oriented roadmap",
                  "Actionable next steps",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon sx={{ fontSize: 18, color: "#22b573", mt: 0.25 }} />
                    <span className="text-sm font-medium text-navy-950">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── OUR PRINCIPLES ─── */}
        <section className="bg-slate-50/60 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
                What We Believe
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="group rounded-2xl border border-navy-950/5 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-100"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${p.color}`}>
                    <p.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className="text-base font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy-900/55">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AI + HUMAN-CENTERED DESIGN ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-green-600">
              Intelligence With Purpose
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Technology Should Make Financial Decisions Easier
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-navy-900/55">
              SmartFin Compass uses AI to analyze financial information and identify patterns, opportunities and areas that may need attention.
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-900/55">
              The goal is not to overwhelm you with more data.
            </p>
            <p className="mt-2 text-[15px] font-medium text-navy-950">
              The goal is to turn complexity into clarity.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-10 hidden border-t-2 border-dashed border-navy-950/10 lg:block" />
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { step: "01", title: "Collect", desc: "Build a structured understanding of your financial profile.", icon: DescriptionIcon },
                { step: "02", title: "Analyze", desc: "Evaluate financial health, behaviour, risks and opportunities.", icon: PsychologyIcon },
                { step: "03", title: "Guide", desc: "Present personalized insights, recommendations and a practical roadmap.", icon: MapIcon },
              ].map((s) => (
                <div key={s.step} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full bg-brand-green-500 ring-[6px] ring-white shadow-[0_0_30px_rgba(34,181,115,0.2)]">
                    <s.icon className="text-white" sx={{ fontSize: 28 }} />
                    <span className="absolute -bottom-2 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white ring-2 ring-white">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-navy-950">{s.title}</h3>
                  <p className="mt-2.5 max-w-[260px] text-sm leading-relaxed text-navy-900/55">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-navy-900/40">
            SmartFin Compass is designed to support better financial decision-making. It does not replace professional financial, tax or legal advice.
          </p>
        </section>

        {/* ─── SECURITY & TRUST ─── */}
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-navy-950/5 bg-gradient-to-br from-sky-50 via-brand-green-50/30 to-sky-50 px-8 py-16 sm:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-green-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto max-w-2xl text-center">
                <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600">
                  <ShieldIcon sx={{ fontSize: 32 }} />
                </span>
                <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
                  Your Financial Information Deserves Trust
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-navy-900/55">
                  Financial information is personal. SmartFin Compass is designed with privacy and security as an important part of the experience.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-navy-950/5 bg-white p-6 text-center shadow-soft">
                  <VerifiedUserIcon sx={{ fontSize: 28, color: "#22b573" }} />
                  <p className="mt-4 text-sm font-bold text-navy-950">Secure & Private</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/50">
                    Your financial information is handled with security and privacy in mind.
                  </p>
                </div>
                <div className="rounded-2xl border border-navy-950/5 bg-white p-6 text-center shadow-soft">
                  <AutoAwesomeIcon sx={{ fontSize: 28, color: "#22b573" }} />
                  <p className="mt-4 text-sm font-bold text-navy-950">Responsible AI</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/50">
                    AI-generated insights are designed to help users understand their financial information and consider possible next steps.
                  </p>
                </div>
                <div className="rounded-2xl border border-navy-950/5 bg-white p-6 text-center shadow-soft">
                  <LockIcon sx={{ fontSize: 28, color: "#22b573" }} />
                  <p className="mt-4 text-sm font-bold text-navy-950">User Control</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/50">
                    You remain in control of your financial information and financial decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHO SMARTFIN COMPASS IS FOR ─── */}
        <section className="bg-slate-50/60 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
                Built for Every Stage of Your Financial Journey
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCE_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border border-navy-950/5 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-100"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
                    <c.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className="text-base font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-navy-900/55">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── THE SMARTFIN COMPASS JOURNEY ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
              From Understanding to Action
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-navy-900/55">
              SmartFin Compass is designed to make the journey from financial information to financial action simple and structured.
            </p>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-navy-950/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-soft transition-all duration-200 hover:border-brand-green-300 hover:shadow-card">
                  {step}
                </span>
                {i < JOURNEY_STEPS.length - 1 && (
                  <ArrowForwardIcon sx={{ fontSize: 16 }} className="text-navy-900/25" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-600 transition-colors duration-200 hover:text-brand-green-700"
            >
              See How It Works
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="relative overflow-hidden bg-navy-950 py-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Your Financial Future Starts With{" "}
              <span className="text-brand-green-400">Understanding Where You Stand</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/55">
              Take the first step toward greater financial clarity. Complete your assessment and discover the insights, priorities and roadmap designed around your financial situation.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/login"
                className="group/btn inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-10 py-4 text-[15px] font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Start Your Assessment
                <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-0.5" />
              </Link>
              <Link
                to="/features"
                className="group/btn inline-flex items-center gap-2.5 rounded-lg border border-white/20 px-10 py-4 text-[15px] font-semibold text-white transition-all duration-250 hover:border-white/40 hover:text-brand-green-400 active:scale-[0.98]"
              >
                Explore Features
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/40">
              20–25 minutes &bull; Guided assessment &bull; Personalized financial insights
            </p>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-950 pt-20 text-white/70">
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
              <p className="mt-5 max-w-xs text-sm leading-relaxed">
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
                <p className="text-sm font-bold text-white">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm transition-colors duration-200 hover:text-brand-green-400"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-sm font-bold text-white">Contact Info</p>
              <ul className="mt-5 space-y-4 text-sm">
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

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs sm:flex-row">
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
