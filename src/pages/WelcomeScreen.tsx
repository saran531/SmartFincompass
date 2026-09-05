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
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
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
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Financial Health Score",
    desc: "Get a comprehensive score that shows your overall financial wellness.",
  },
  {
    icon: TimelineIcon,
    color: "text-sky-500 bg-sky-50",
    title: "Personalized Insights",
    desc: "AI-powered insights based on your financial habits and behavior.",
  },
  {
    icon: CheckCircleIcon,
    color: "text-violet-500 bg-violet-50",
    title: "Custom Roadmap",
    desc: "A step-by-step financial plan tailored to your goals and priorities.",
  },
  {
    icon: NotificationsActiveIcon,
    color: "text-amber-accent bg-amber-50",
    title: "Smart Recommendations",
    desc: "Actionable tips and recommendations to improve your financial future.",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/#features" },
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
    ],
  },
];

export default function WelcomeScreen() {
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
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`group/nav relative text-[15px] font-medium transition-colors duration-250 ${
                  i === 0 ? "text-navy-950" : "text-navy-900/70 hover:text-brand-green-600"
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
              className="rounded-lg border border-navy-950/15 px-6 py-2.5 text-sm font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98]"
            >
              Login
            </Link>
            <Link
              to="/create-account"
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
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-navy-900/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
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
                to="/create-account"
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
        {/* ─── HERO SECTION ─── */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-brand-green-50/40 blur-3xl" />
            <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-sky-50/50 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-20">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-green-200 bg-brand-green-50 px-4 py-1.5 text-sm font-semibold text-brand-green-700">
                Welcome to SmartFin Compass 👋
              </span>

              <h1 className="mt-7 text-4xl font-extrabold leading-[1.1] text-navy-950 sm:text-5xl">
                Let's Assess Your
                <br />
                <span className="text-brand-green-600">Financial Readiness</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-navy-900/55">
                Our AI-powered assessment will analyze your financial
                health and create a personalized roadmap to help you
                achieve your goals.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600">
                    <ShieldIcon sx={{ fontSize: 20 }} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-950">
                      100% Secure & Private
                    </p>
                    <p className="mt-0.5 text-sm text-navy-900/50">
                      Your data is encrypted and never shared.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600">
                    <VerifiedUserIcon sx={{ fontSize: 20 }} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-950">
                      Personalized for You
                    </p>
                    <p className="mt-0.5 text-sm text-navy-900/50">
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
                className="h-auto max-h-[580px] w-full max-w-[700px] object-contain"
              />
            </div>
          </div>
        </section>

        {/* ─── ASSESSMENT OVERVIEW ─── */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="rounded-3xl border border-navy-950/5 bg-white p-8 shadow-[0_4px_24px_rgba(13,37,73,0.06)] sm:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_auto]">
              {/* Left — Steps */}
              <div>
                <h2 className="text-xl font-extrabold text-navy-950">
                  Assessment Overview
                </h2>
                <div className="relative mt-8">
                  {/* Dashed connector line */}
                  <div className="absolute left-[28px] top-6 hidden h-px w-[calc(100%-56px)] border-t-2 border-dashed border-navy-950/10 lg:block" />

                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {ASSESSMENT_STEPS.map((step) => (
                      <div key={step.title} className="flex flex-col items-center text-center">
                        <span
                          className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                            step.active
                              ? "bg-brand-green-500 text-white shadow-[0_0_20px_rgba(34,181,115,0.3)]"
                              : "bg-brand-green-50 text-brand-green-600"
                          }`}
                        >
                          <step.icon sx={{ fontSize: 24 }} />
                          {step.active && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm">
                              <CheckCircleIcon sx={{ fontSize: 14 }} />
                            </span>
                          )}
                        </span>
                        <p className="mt-3 text-sm font-bold text-navy-950">
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-xs text-navy-900/45">
                          {step.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle — Details */}
              <div className="flex flex-col gap-5 border-l border-navy-950/5 pl-8">
                <h3 className="text-base font-bold text-navy-950">
                  Assessment Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-navy-900/50">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs text-navy-900/45">Estimated Time</p>
                      <p className="text-sm font-semibold text-navy-950">20–25 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-navy-900/50">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs text-navy-900/45">Total Sections</p>
                      <p className="text-sm font-semibold text-navy-950">4 Sections</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-navy-900/50">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20V10" />
                        <path d="M18 20V4" />
                        <path d="M6 20v-4" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs text-navy-900/45">Questions</p>
                      <p className="text-sm font-semibold text-navy-950">~30 Questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── START ASSESSMENT CTA ─── */}
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-navy-950/5 bg-brand-green-50/40 px-8 py-14 text-center shadow-[0_4px_24px_rgba(34,181,115,0.08)]">
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600">
              <CheckCircleIcon sx={{ fontSize: 28 }} />
            </span>
            <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
              Ready to Begin?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-900/55">
              Take the first step towards financial clarity and better decisions.
              Your personalized assessment is just one click away.
            </p>
            <Link
              to="/personal-information"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-brand-green-500 px-14 py-6 text-xl font-bold text-white shadow-[0_8px_30px_rgba(34,181,115,0.35)] transition-all duration-250 hover:bg-brand-green-600 hover:shadow-[0_12px_40px_rgba(34,181,115,0.45)] hover:-translate-y-1 active:scale-[0.97]"
            >
              Start Assessment
              <ArrowForwardIcon sx={{ fontSize: 24 }} />
            </Link>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-navy-900/45">
              <LockIcon sx={{ fontSize: 12 }} />
              You can save and continue later
            </p>
          </div>
        </section>

        {/* ─── WHAT YOU'LL GET ─── */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <h2 className="text-center text-3xl font-extrabold text-navy-950">
            What You'll Get
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-navy-950/5 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:border-brand-green-100"
              >
                <span
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${f.color}`}
                >
                  <f.icon sx={{ fontSize: 28 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy-900/55">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECURITY BAR ─── */}
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-navy-950/5 bg-sky-50/50 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600">
                <ShieldIcon sx={{ fontSize: 20 }} />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-950">
                  Your financial data is safe with us
                </p>
                <p className="mt-0.5 text-xs text-navy-900/50">
                  We use bank-level encryption and follow industry best practices to protect your information.
                </p>
              </div>
            </div>
            <a
              href="#"
              className="shrink-0 text-sm font-semibold text-brand-green-600 transition-colors hover:text-brand-green-700"
            >
              Learn more about our security →
            </a>
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
                AI-powered financial wellness platform that helps you make
                smarter financial decisions.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, LinkedInIcon, TwitterIcon, InstagramIcon].map(
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
              <p className="text-sm font-bold text-white">Contact Us</p>
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
