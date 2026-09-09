import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShieldIcon from "@mui/icons-material/Shield";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FlagIcon from "@mui/icons-material/Flag";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LockIcon from "@mui/icons-material/Lock";
import InsightsIcon from "@mui/icons-material/Insights";
import TimelineIcon from "@mui/icons-material/Timeline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import welcomeImage from "../Assets/images/Welcomescreen.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const ASSESSMENT_STEPS = [
  {
    icon: PersonIcon,
    title: "Personal Info",
    time: "5–7 min",
    active: true,
  },
  {
    icon: AccountBalanceIcon,
    title: "Income & Expenses",
    time: "8–10 min",
    active: false,
  },
  {
    icon: FlagIcon,
    title: "Goals & Preferences",
    time: "5–7 min",
    active: false,
  },
  {
    icon: RateReviewIcon,
    title: "Review & Insights",
    time: "5 min",
    active: false,
  },
];

const FEATURES = [
  {
    icon: InsightsIcon,
    color: "text-brand-green-600 bg-brand-green-50 border border-brand-green-100",
    title: "Financial Health Score",
    desc: "Get a comprehensive score that shows your overall financial wellness.",
  },
  {
    icon: TimelineIcon,
    color: "text-sky-600 bg-sky-50 border border-sky-100",
    title: "Personalized Insights",
    desc: "AI-powered insights based on your financial habits and behavior.",
  },
  {
    icon: CheckCircleIcon,
    color: "text-violet-600 bg-violet-50 border border-violet-100",
    title: "Custom Roadmap",
    desc: "A step-by-step financial plan tailored to your goals and priorities.",
  },
  {
    icon: NotificationsActiveIcon,
    color: "text-amber-600 bg-amber-50 border border-amber-100",
    title: "Smart Recommendations",
    desc: "Actionable tips and recommendations to improve your financial future.",
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
    ],
  },
];

export default function WelcomeScreen() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ─── NAVBAR ─── */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-sm">
              <ExploreIcon fontSize="small" />
            </span>
            <span className="text-xl font-bold leading-tight text-navy-950">
              SmartFin
              <span className="block -mt-1 text-brand-green-600">Compass</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`group/nav relative text-[15px] font-semibold transition-colors duration-250 ${
                  i === 0 ? "text-navy-950 font-bold" : "text-slate-700 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                  i === 0 ? "w-full" : "w-0 group-hover/nav:w-full"
                }`} />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              to="/login"
              className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-bold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98]"
            >
              Login
            </Link>
            <Link
              to="/create-account"
              className="rounded-lg bg-brand-green-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
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
          <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full rounded-lg border border-slate-300 px-5 py-2.5 text-center text-sm font-bold text-navy-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/create-account"
                className="w-full rounded-lg bg-brand-green-500 px-5 py-2.5 text-center text-sm font-bold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ─── HERO SECTION ─── */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-brand-green-50/50 blur-3xl" />
            <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-sky-50/60 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-20">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-brand-green-300/80 bg-brand-green-50/90 px-4.5 py-1.5 text-sm font-bold text-brand-green-800 shadow-sm">
                Welcome to SmartFin Compass 👋
              </span>

              <h1 className="mt-7 text-4xl font-extrabold leading-[1.1] text-navy-950 sm:text-5xl">
                Let's Assess Your
                <br />
                <span className="text-brand-green-600">Financial Readiness</span>
              </h1>

              <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed font-medium text-slate-700">
                Our AI-powered assessment will analyze your financial
                health and create a personalized roadmap to help you
                achieve your goals.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600 border border-brand-green-100/80 shadow-xs">
                    <ShieldIcon sx={{ fontSize: 20 }} />
                  </span>
                  <div>
                    <p className="text-base font-bold text-navy-950">
                      100% Secure & Private
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-slate-600">
                      Your data is encrypted and never shared.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600 border border-brand-green-100/80 shadow-xs">
                    <VerifiedUserIcon sx={{ fontSize: 20 }} />
                  </span>
                  <div>
                    <p className="text-base font-bold text-navy-950">
                      Personalized for You
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-slate-600">
                      Get insights that are tailored to your unique
                      financial profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <img
                src={welcomeImage}
                alt="Financial dashboard laptop illustration"
                className="h-auto max-h-[580px] w-full max-w-[700px] object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* ─── ASSESSMENT OVERVIEW ─── */}
        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-10">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-[0_6px_28px_rgba(13,37,73,0.07)] sm:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_auto]">
              {/* Left — Steps */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">
                  Assessment Overview
                </h2>
                <div className="relative mt-8">
                  {/* Dashed connector line */}
                  <div className="absolute left-[28px] top-7 hidden h-px w-[calc(100%-56px)] border-t-2 border-dashed border-slate-300 lg:block" />

                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {ASSESSMENT_STEPS.map((step) => (
                      <div key={step.title} className="flex flex-col items-center text-center">
                        <span
                          className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                            step.active
                              ? "bg-brand-green-500 text-white shadow-[0_0_20px_rgba(34,181,115,0.35)]"
                              : "bg-brand-green-50 text-brand-green-700 border border-brand-green-200/80"
                          }`}
                        >
                          <step.icon sx={{ fontSize: 24 }} />
                          {step.active && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm">
                              <CheckCircleIcon sx={{ fontSize: 14 }} />
                            </span>
                          )}
                        </span>
                        <p className="mt-3 text-sm sm:text-base font-extrabold text-navy-950">
                          {step.title}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">
                          {step.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Details */}
              <div className="flex flex-col gap-5 border-t pt-8 border-slate-200/80 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <h3 className="text-lg font-extrabold text-navy-950">
                  Assessment Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700 border border-brand-green-100">
                      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-600">Estimated Time</p>
                      <p className="text-sm sm:text-base font-extrabold text-navy-950">20–25 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700 border border-brand-green-100">
                      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-600">Total Sections</p>
                      <p className="text-sm sm:text-base font-extrabold text-navy-950">4 Sections</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700 border border-brand-green-100">
                      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20V10" />
                        <path d="M18 20V4" />
                        <path d="M6 20v-4" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-600">Questions</p>
                      <p className="text-sm sm:text-base font-extrabold text-navy-950">~30 Questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── START ASSESSMENT CTA SECTION ─── */}
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border-2 border-brand-green-200/90 bg-gradient-to-br from-brand-green-50/90 via-emerald-50/60 to-brand-green-50/90 px-8 py-14 sm:py-16 sm:px-12 text-center shadow-[0_12px_36px_rgba(24,154,99,0.12)]">
            {/* Subtle background glow highlights */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-green-200/30 blur-2xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-200/40 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600 border border-brand-green-200/80 shadow-sm">
                <CheckCircleIcon sx={{ fontSize: 30 }} />
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
                Ready to Begin?
              </h2>
              <p className="mt-3.5 max-w-xl text-base sm:text-lg font-medium leading-relaxed text-slate-700">
                Take the first step towards financial clarity and better decisions.
                Your personalized assessment is just one click away.
              </p>

              {/* Start Assessment Button with visual focus effect */}
              <div className="group relative mt-8">
                <div className="absolute -inset-1 rounded-2xl bg-brand-green-400/30 blur-lg opacity-70 transition duration-300 group-hover:opacity-100 pointer-events-none" />
                <Link
                  to="/personal-information"
                  className="relative inline-flex items-center gap-3 rounded-2xl bg-brand-green-500 px-10 py-4.5 sm:px-12 sm:py-5 text-lg sm:text-xl font-bold text-white shadow-[0_8px_30px_rgba(24,154,99,0.35)] transition-all duration-300 hover:bg-brand-green-600 hover:shadow-[0_12px_35px_rgba(24,154,99,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                  Start Assessment
                  <ArrowForwardIcon sx={{ fontSize: 24 }} />
                </Link>
              </div>

              <p className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <LockIcon className="text-brand-green-600" sx={{ fontSize: 16 }} />
                You can save and continue later
              </p>
            </div>
          </div>
        </section>

        {/* ─── WHAT YOU'LL GET ─── */}
        <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-10">
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            What You'll Get
          </h2>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-200"
              >
                <span
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${f.color}`}
                >
                  <f.icon sx={{ fontSize: 28 }} />
                </span>
                <h3 className="text-lg font-extrabold text-navy-950">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm font-medium leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECURITY BAR ─── */}
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-brand-green-200/80 bg-brand-green-50/40 px-8 py-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700 border border-brand-green-200/80">
                <ShieldIcon sx={{ fontSize: 20 }} />
              </span>
              <div>
                <p className="text-base font-extrabold text-navy-950">
                  Your financial data is safe with us
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-600">
                  We use bank-level encryption and follow industry best practices to protect your information.
                </p>
              </div>
            </div>
            <a
              href="#"
              className="shrink-0 text-sm font-bold text-brand-green-700 transition-colors hover:text-brand-green-800 hover:underline"
            >
              Learn more about our security →
            </a>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-950 pt-20 text-slate-300">
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
              <p className="mt-5 max-w-xs text-sm font-medium leading-relaxed text-slate-300">
                AI-powered financial wellness platform that helps you make
                smarter financial decisions.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, LinkedInIcon, TwitterIcon, InstagramIcon].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all duration-200 hover:scale-110 hover:bg-brand-green-500 hover:text-white"
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </a>
                  )
                )}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-bold text-white uppercase tracking-wider">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-brand-green-400"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</p>
              <ul className="mt-5 space-y-4 text-sm font-medium text-slate-300">
                <li className="flex items-center gap-2.5">
                  <EmailIcon className="text-brand-green-400" sx={{ fontSize: 16 }} />
                  support@smartfincompass.com
                </li>
                <li className="flex items-center gap-2.5">
                  <CallIcon className="text-brand-green-400" sx={{ fontSize: 16 }} />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2.5">
                  <PlaceIcon className="text-brand-green-400" sx={{ fontSize: 16 }} />
                  Bangalore, Karnataka, India
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs font-medium text-slate-400 sm:flex-row">
            <p>© 2025 SmartFin Compass. All rights reserved.</p>
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
