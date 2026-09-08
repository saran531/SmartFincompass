import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
import featuresHeroImage from "../Assets/images/Features.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const FEATURES = [
  {
    icon: PsychologyIcon,
    color: "text-violet-500 bg-violet-50",
    title: "AI Financial Analysis",
    desc: "Get a complete AI-powered analysis of your financial health, including income, expenses, assets, liabilities, savings, investments, and risk.",
  },
  {
    icon: SpeedIcon,
    color: "text-sky-500 bg-sky-50",
    title: "Financial Health Score",
    desc: "Understand your overall financial wellness with a simple score that evaluates your financial stability, preparedness, and progress.",
  },
  {
    icon: MapIcon,
    color: "text-rose-500 bg-rose-50",
    title: "Personalized Financial Roadmap",
    desc: "Receive a step-by-step financial roadmap tailored to your goals, financial profile, priorities, and current situation.",
  },
  {
    icon: InsightsIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Cash Flow & Expense Analysis",
    desc: "Understand where your money comes from, where it goes, and how your spending patterns affect your financial future.",
  },
  {
    icon: ShieldIcon,
    color: "text-amber-accent bg-amber-50",
    title: "Intelligent Risk Assessment",
    desc: "Evaluate your financial risk profile across debt, savings, emergency preparedness, investments, and overall financial capacity.",
  },
  {
    icon: TrendingUpIcon,
    color: "text-emerald-600 bg-emerald-50",
    title: "Investment Readiness",
    desc: "Understand whether you are financially prepared to invest and discover opportunities aligned with your financial goals and risk profile.",
  },
  {
    icon: AutoAwesomeIcon,
    color: "text-indigo-500 bg-indigo-50",
    title: "AI-Powered Recommendations",
    desc: "Get practical recommendations that help you prioritize the actions that can make the biggest difference to your financial wellness.",
  },
  {
    icon: DescriptionIcon,
    color: "text-teal-600 bg-teal-50",
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
  },
  {
    step: "02",
    title: "Understand",
    desc: "Your financial profile is evaluated across health, risk, savings, debt, investments, and goals.",
    icon: InsightsIcon,
  },
  {
    step: "03",
    title: "Recommend",
    desc: "You receive personalized actions and recommendations designed around your financial priorities.",
    icon: AutoAwesomeIcon,
  },
];

const PERSONALIZED = [
  {
    icon: FlagIcon,
    color: "text-violet-500 bg-violet-50",
    title: "Your Goals",
    desc: "Set meaningful financial goals and understand what it takes to achieve them.",
  },
  {
    icon: ShieldIcon,
    color: "text-sky-500 bg-sky-50",
    title: "Your Risk Profile",
    desc: "Understand your financial risk capacity and readiness.",
  },
  {
    icon: InsightsIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Your Financial Behaviour",
    desc: "Identify spending, saving, and financial behaviour patterns.",
  },
  {
    icon: MapIcon,
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
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-gradient-to-br from-brand-green-50 via-white to-sky-50" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-28">
            {/* ── LEFT: Hero Text Content ── */}
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                Features
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-navy-950">
                Everything You Need for{" "}
                <span className="text-brand-green-600">Financial Wellness</span>
              </h1>
              <p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-navy-900/70">
                SmartFin Compass combines AI-powered financial analysis, personalized insights, and intelligent recommendations to help you understand your finances and make smarter decisions.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/login"
                  className="group/btn inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:shadow-sm active:translate-y-0"
                >
                  Start Assessment
                  <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-0.5" />
                </Link>
                <a
                  href="/how-it-works"
                  className="group/btn inline-flex items-center gap-2.5 rounded-lg border border-navy-950/15 px-7 py-3.5 text-sm sm:text-base font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98]"
                >
                  Explore How It Works
                </a>
              </div>
            </div>

            {/* ── RIGHT: Hero Image ── */}
            <div className="flex items-center justify-center">
              <img
                src={featuresHeroImage}
                alt="SmartFin Compass Features - Financial Wellness"
                className="w-full max-w-[620px] h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* ─── MAIN FEATURES ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
              Powerful Features
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
              Powerful Features. Smarter Financial Decisions.
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/70">
              From understanding your current financial position to planning your future, SmartFin Compass gives you the intelligence and guidance you need at every step.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-navy-950/5 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-100"
              >
                <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${f.color}`}>
                  <f.icon sx={{ fontSize: 28 }} />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-navy-900/70">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURE DEEP-DIVE ─── */}
        <section className="bg-slate-50/60 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                Complete Picture
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                See Your Complete Financial Picture
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/70">
                SmartFin Compass brings your financial information together so you can understand the bigger picture—not just individual numbers.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Financial Overview */}
              <div className="rounded-2xl border border-navy-950/5 bg-white p-8 shadow-soft">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600">
                    <InsightsIcon sx={{ fontSize: 20 }} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-950">Financial Overview</h3>
                </div>
                <div className="space-y-4">
                  {FINANCIAL_OVERVIEW.map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-navy-950/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm sm:text-base font-medium text-navy-900/70">{item.label}</span>
                      <span className={`text-sm sm:text-base font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Readiness */}
              <div className="rounded-2xl border border-navy-950/5 bg-white p-8 shadow-soft">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                    <ShieldIcon sx={{ fontSize: 20 }} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-950">Financial Readiness</h3>
                </div>
                <div className="space-y-3">
                  {FINANCIAL_READINESS.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50/60 px-4 py-3">
                      <span className="text-sm sm:text-base font-medium text-navy-900/70">{item.label}</span>
                      <span className={`rounded-full px-3 py-1 text-xs sm:text-sm font-semibold ${item.color}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="rounded-2xl border border-navy-950/5 bg-white p-8 shadow-soft">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                    <AutoAwesomeIcon sx={{ fontSize: 20 }} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-navy-950">AI Insights</h3>
                </div>
                <div className="space-y-3">
                  {AI_INSIGHTS.map((item, i) => (
                    <div key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 ${item.color.split(" ")[1]}`}>
                      <item.icon sx={{ fontSize: 18 }} className={`mt-0.5 shrink-0 ${item.color.split(" ")[0]}`} />
                      <span className="text-sm sm:text-base font-medium text-navy-950">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── AI INTELLIGENCE ─── */}
        <section className="relative overflow-hidden bg-navy-950 py-28">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                AI Intelligence
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                AI That Understands Your Financial Journey
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/75">
                SmartFin Compass analyzes the information you provide and transforms complex financial data into clear insights, priorities, and actionable recommendations.
              </p>
            </div>

            <div className="relative mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="absolute left-0 right-0 top-10 hidden border-t-2 border-dashed border-white/15 lg:block" />
              {AI_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full bg-navy-800 ring-[6px] ring-navy-950 shadow-[0_0_30px_rgba(34,181,115,0.15)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(34,181,115,0.25)]">
                    <s.icon className="text-white" sx={{ fontSize: 28 }} />
                    <span className="absolute -bottom-2 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-green-500 text-xs font-bold text-white ring-2 ring-navy-950">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg sm:text-xl font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-[280px] text-sm sm:text-base leading-relaxed text-white/75">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PERSONALIZED EXPERIENCE ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
              Personalized
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
              Built Around You
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONALIZED.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-navy-950/5 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-100"
              >
                <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${p.color}`}>
                  <p.icon sx={{ fontSize: 28 }} />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-navy-900/70">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECURITY ─── */}
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-navy-950/5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-green-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative">
              <span className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-500/15 text-brand-green-400">
                <ShieldIcon sx={{ fontSize: 32 }} />
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Your Financial Data Stays Protected
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-white/75">
                We use bank-level encryption and industry best practices to protect your financial information. Your privacy and security are our priority.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <VerifiedUserIcon sx={{ fontSize: 20, color: "#22b573" }} />
                  <span className="text-sm sm:text-base font-semibold text-white">Secure & Private</span>
                </div>
                <div className="flex items-center gap-3">
                  <LockIcon sx={{ fontSize: 20, color: "#22b573" }} />
                  <span className="text-sm sm:text-base font-semibold text-white">Encrypted Data</span>
                </div>
                <div className="flex items-center gap-3">
                  <PrivacyTipIcon sx={{ fontSize: 20, color: "#22b573" }} />
                  <span className="text-sm sm:text-base font-semibold text-white">Privacy First</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="bg-gradient-to-br from-brand-green-50 via-white to-sky-50 py-24">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
              Ready to Take Control of Your{" "}
              <span className="text-brand-green-600">Financial Future?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-navy-900/70">
              Start your personalized financial assessment and discover where you stand, what you should prioritize, and how you can move forward with confidence.
            </p>
            <Link
              to="/login"
              className="group/cta mt-10 inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-10 py-4 text-sm sm:text-base font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Start Your Assessment
              <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/cta:translate-x-0.5" />
            </Link>
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
                      <a
                        href={l.href}
                        className="text-sm sm:text-base transition-colors duration-200 hover:text-brand-green-400"
                      >
                        {l.label}
                      </a>
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
