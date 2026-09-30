import { Link } from "react-router-dom";
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
import welcomeImage from "../Assets/images/Welcomescreen.png";
import builtAroundImg from "../Assets/images/BuiltAround.png";

const ASSESSMENT_STEPS = [
  {
    icon: PersonIcon,
    color: "bg-brand-green-50 text-brand-green-700 border border-brand-green-200",
    title: "Personal Info",
    time: "5–7 min",
    active: true,
  },
  {
    icon: AccountBalanceIcon,
    color: "bg-sky-50 text-sky-600 border border-sky-200",
    title: "Income & Expenses",
    time: "8–10 min",
    active: false,
  },
  {
    icon: FlagIcon,
    color: "bg-amber-50 text-amber-600 border border-amber-200",
    title: "Goals & Preferences",
    time: "5–7 min",
    active: false,
  },
  {
    icon: RateReviewIcon,
    color: "bg-violet-50 text-violet-600 border border-violet-200",
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

export default function WelcomeScreen() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4fbff_25%,#eefbf5_55%,#ffffff_80%,#f5fcff_100%)]">
      {/* ─── Premium fintech page background ─── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Extremely subtle navy-blue wash across the page */}
        <div className="absolute left-1/2 top-0 h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(13,37,73,0.06),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[18%] left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(13,37,73,0.04),transparent_70%)] blur-2xl" />

        {/* Soft gradient blobs */}
        <div className="absolute -left-48 -top-40 h-[520px] w-[520px] rounded-full bg-sky-200/45 blur-[120px] animate-float" />
        <div className="absolute -right-52 top-[18%] h-[560px] w-[560px] rounded-full bg-emerald-200/40 blur-[130px] animate-float" />
        <div className="absolute -left-40 top-[45%] h-[460px] w-[460px] rounded-full bg-brand-green-100/70 blur-[120px]" />
        <div className="absolute -right-44 top-[68%] h-[480px] w-[480px] rounded-full bg-sky-100/80 blur-[120px] animate-float" />
        <div className="absolute bottom-[4%] left-[10%] h-[420px] w-[420px] rounded-full bg-emerald-100/70 blur-[110px]" />

        {/* Curved ring shapes */}
        <div className="absolute -left-32 top-[12%] h-80 w-80 rounded-full border border-sky-200/60" />
        <div className="absolute right-[6%] top-[6%] h-56 w-56 rounded-full border border-brand-green-200/50" />
        <div className="absolute left-[8%] top-[58%] h-64 w-64 rounded-full border border-emerald-200/60" />
        <div className="absolute bottom-[12%] right-[4%] h-72 w-72 rounded-full border border-sky-200/50" />

        {/* Soft wave bands */}
        <div className="absolute left-[-10%] top-[36%] h-64 w-[70%] rotate-[-4deg] rounded-full bg-gradient-to-r from-sky-100/70 to-transparent blur-2xl" />
        <div className="absolute right-[-10%] top-[74%] h-60 w-[65%] rotate-[3deg] rounded-full bg-gradient-to-l from-brand-green-100/70 to-transparent blur-2xl" />

        {/* Light floating circles */}
        <div className="absolute left-[6%] top-[26%] h-3.5 w-3.5 rounded-full bg-sky-400/60 animate-float" />
        <div className="absolute right-[12%] top-[34%] h-2.5 w-2.5 rounded-full bg-brand-green-400/60" />
        <div className="absolute left-[18%] top-[70%] h-2.5 w-2.5 rounded-full bg-emerald-400/60 animate-float" />
        <div className="absolute bottom-[24%] right-[22%] h-4 w-4 rounded-full bg-sky-300/60" />
        <div className="absolute left-[45%] top-[8%] h-2 w-2 rounded-full bg-brand-green-300/70" />
        <div className="absolute bottom-[8%] left-[52%] h-3 w-3 rounded-full bg-teal-300/60" />

        {/* Subtle dotted patterns */}
        <div
          className="absolute left-[2%] top-[8%] h-36 w-36 opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.45) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute right-[3%] top-[52%] h-32 w-32 opacity-45"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(34,181,115,0.45) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute bottom-[6%] left-[10%] h-32 w-32 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(45,212,191,0.45) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      <main className="relative z-10">
        {/* ─── HERO SECTION ─── */}
        <section className="relative animate-fade-in px-4 pb-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
          <div className="relative mx-auto grid max-w-7xl gap-12 overflow-hidden rounded-[28px] border border-sky-200/80 bg-[radial-gradient(ellipse_at_top_left,rgba(13,37,73,0.07),transparent_55%),linear-gradient(135deg,rgba(56,189,248,0.10)_0%,rgba(45,212,191,0.12)_55%,rgba(255,255,255,0.7)_100%)] px-6 py-14 shadow-[0_20px_60px_-20px_rgba(13,37,73,0.25),0_0_0_1px_rgba(255,255,255,0.7)_inset] sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-20">
            {/* Hero decorative shapes */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-brand-green-100/70 blur-3xl" />
              <div className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full bg-sky-100/80 blur-3xl" />
              <div className="absolute right-[8%] top-16 h-40 w-40 rounded-full border border-sky-200/70" />
              <div className="absolute bottom-10 left-[4%] h-3 w-3 rounded-full bg-sky-400/70 animate-float" />
              <div className="absolute right-[38%] top-8 h-2.5 w-2.5 rounded-full bg-brand-green-400/70" />
              <div
                className="absolute left-[2%] top-[30%] h-32 w-32 opacity-45"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.45) 1.5px, transparent 1.5px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div
                className="absolute bottom-[12%] right-[6%] h-28 w-28 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(34,181,115,0.45) 1.5px, transparent 1.5px)",
                  backgroundSize: "16px 16px",
                }}
              />
            </div>
            {/* Left Content */}
            <div className="relative z-10">
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
                  <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700 border border-brand-green-200 shadow-sm ring-4 ring-brand-green-500/10">
                    <ShieldIcon sx={{ fontSize: 24 }} />
                  </span>
                  <div>
                    <p className="text-base font-bold text-navy-950">
                      100% Secure & Private
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-slate-700">
                      Your data is encrypted and never shared.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 border border-sky-200 shadow-sm ring-4 ring-sky-500/10">
                    <VerifiedUserIcon sx={{ fontSize: 24 }} />
                  </span>
                  <div>
                    <p className="text-base font-bold text-navy-950">
                      Personalized for You
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-slate-700">
                      Get insights that are tailored to your unique
                      financial profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green-200/35 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute right-[12%] top-[18%] h-24 w-24 rounded-full bg-sky-200/50 blur-2xl" />
              <img
                src={welcomeImage}
                alt="Financial dashboard laptop illustration"
                className="relative h-auto max-h-[580px] w-full max-w-[700px] object-contain drop-shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ─── ASSESSMENT OVERVIEW ─── */}
        <section className="relative animate-fade-in-up delay-100">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(56,189,248,0.08)_0%,rgba(255,255,255,0)_50%,rgba(45,212,191,0.05)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-12 sm:py-14 lg:px-10">
            <div className="rounded-3xl border border-sky-200/70 bg-gradient-to-b from-white/95 via-white/90 to-sky-50/40 p-8 shadow-[0_10px_40px_-12px_rgba(56,189,248,0.18),0_6px_28px_rgba(13,37,73,0.07)] backdrop-blur-sm sm:p-10 ring-1 ring-brand-green-500/5">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_auto]">
              {/* Left — Steps */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">
                  Assessment Overview
                </h2>
                <div className="relative mt-8">
                  {/* Colorful connector line */}
                  <div className="absolute left-[calc(12.5%-12px)] right-[calc(12.5%-12px)] top-8 hidden h-1 rounded-full bg-gradient-to-r from-brand-green-400 via-sky-400 to-violet-400 opacity-60 shadow-[0_0_10px_rgba(34,181,115,0.25)] lg:block" />

                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {ASSESSMENT_STEPS.map((step) => (
                      <div key={step.title} className="flex flex-col items-center text-center">
                        <span
                          className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 sm:h-16 sm:w-16 ${
                            step.active
                              ? "bg-brand-green-500 text-white shadow-[0_0_20px_rgba(34,181,115,0.35)]"
                              : `${step.color} shadow-sm hover:-translate-y-0.5 hover:shadow-md`
                          }`}
                        >
                          <step.icon sx={{ fontSize: 28 }} />
                          {step.active && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm">
                              <CheckCircleIcon sx={{ fontSize: 14 }} />
                            </span>
                          )}
                        </span>
                        <p className="mt-3 text-sm sm:text-base font-extrabold text-navy-950">
                          {step.title}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-200 shadow-sm">
                      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700">Estimated Time</p>
                      <p className="text-sm sm:text-base font-extrabold text-navy-950">20–25 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700 border border-brand-green-200 shadow-sm">
                      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700">Total Sections</p>
                      <p className="text-sm sm:text-base font-extrabold text-navy-950">4 Sections</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 border border-violet-200 shadow-sm">
                      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20V10" />
                        <path d="M18 20V4" />
                        <path d="M6 20v-4" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700">Questions</p>
                      <p className="text-sm sm:text-base font-extrabold text-navy-950">~30 Questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* ─── START ASSESSMENT CTA SECTION ─── */}
        <section className="relative animate-fade-in-up delay-200">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(45,212,191,0.07)_0%,rgba(56,189,248,0.06)_50%,rgba(45,212,191,0.04)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-2 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-brand-green-300/70 bg-gradient-to-br from-brand-green-50/90 via-white to-sky-50/70 shadow-[0_14px_44px_rgba(24,154,99,0.14),0_6px_24px_rgba(13,37,73,0.06)]">
            {/* Subtle background glow highlights */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-green-200/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-sky-200/30 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-brand-green-300/40" />
            <div className="pointer-events-none absolute bottom-8 left-10 h-20 w-20 rounded-full border border-sky-200/70" />
            <div className="pointer-events-none absolute left-6 top-6 h-3 w-3 rounded-full bg-brand-green-400/60 animate-float" />
            <div className="pointer-events-none absolute bottom-10 right-16 h-2.5 w-2.5 rounded-full bg-sky-400/60" />
            <div
              className="pointer-events-none absolute right-8 top-1/2 h-28 w-28 opacity-40"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(34,181,115,0.45) 1.5px, transparent 1.5px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative z-10 grid items-center gap-8 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-2 lg:gap-10 lg:px-14">
              {/* LEFT — Illustration */}
              <div className="flex justify-center lg:justify-start">
                <img
                  src={builtAroundImg}
                  alt="Financial goals assessment illustration"
                  className="h-auto w-full max-w-[340px] object-contain drop-shadow-xl sm:max-w-[420px] lg:max-w-[500px]"
                />
              </div>

              {/* RIGHT — CTA content */}
              <div className="flex flex-col items-center text-center">
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
                  <div className="pointer-events-none absolute -inset-2 animate-pulse-glow rounded-3xl bg-brand-green-400/40 blur-xl" />
                  <Link
                    to="/personal-information"
                    className="relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-green-500 via-brand-green-500 to-emerald-500 px-10 py-4.5 text-lg font-bold text-white shadow-[0_12px_34px_rgba(24,154,99,0.45)] ring-1 ring-white/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r hover:from-brand-green-600 hover:via-brand-green-600 hover:to-emerald-600 hover:shadow-[0_18px_46px_rgba(24,154,99,0.6)] active:translate-y-0 active:scale-[0.98] sm:px-12 sm:py-5 sm:text-xl"
                  >
                    Start Assessment
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                      <ArrowForwardIcon sx={{ fontSize: 24 }} />
                    </span>
                  </Link>
                </div>

                <p className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <LockIcon className="text-brand-green-600" sx={{ fontSize: 16 }} />
                  You can save and continue later
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ─── WHAT YOU'LL GET ─── */}
        <section className="relative animate-fade-in-up delay-300">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(56,189,248,0.07)_0%,rgba(255,255,255,0)_45%,rgba(56,189,248,0.05)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-12 sm:py-14 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-sky-200/70 bg-white/70 p-8 shadow-[0_10px_40px_-14px_rgba(56,189,248,0.16),0_6px_24px_rgba(13,37,73,0.06)] backdrop-blur-sm sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-6 h-24 w-24 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.45) 1.5px, transparent 1.5px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 left-6 h-24 w-24 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(34,181,115,0.45) 1.5px, transparent 1.5px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative z-10">
            <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              What You'll Get
            </h2>

            <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-2xl border border-sky-200/60 bg-gradient-to-b from-white/95 via-white/90 to-sky-50/50 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green-300 hover:shadow-card hover:ring-2 hover:ring-brand-green-500/10 sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 -z-10 h-28 w-28 rounded-full bg-gradient-to-br from-sky-400/10 to-brand-green-400/10 blur-2xl"
                  />
                  <span
                    className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${f.color}`}
                  >
                    <f.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className="text-lg font-extrabold text-navy-950">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium leading-relaxed text-slate-700">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
            </div>
          </div>
        </section>

        {/* ─── SECURITY BAR ─── */}
        <section className="relative animate-fade-in-up delay-400">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(45,212,191,0.07)_0%,rgba(45,212,191,0.04)_55%,rgba(56,189,248,0.05)_100%)]"
          />
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-4 lg:px-10">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-brand-green-300/70 bg-gradient-to-r from-brand-green-50 via-emerald-50/80 to-sky-50/60 px-8 py-6 shadow-[0_10px_34px_-14px_rgba(24,154,99,0.3)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700 border border-brand-green-200 shadow-sm ring-4 ring-brand-green-500/10">
                <ShieldIcon sx={{ fontSize: 24 }} />
              </span>
              <div>
                <p className="text-base font-extrabold text-navy-950">
                  Your financial data is safe with us
                </p>
                <p className="mt-0.5 text-sm font-medium text-slate-700">
                  We use bank-level encryption and follow industry best practices to protect your information.
                </p>
              </div>
            </div>
            <a
              href="#"
              className="shrink-0 rounded-lg px-2 py-1 text-sm font-bold text-brand-green-700 transition-colors hover:bg-brand-green-100 hover:text-brand-green-800 hover:underline"
            >
              Learn more about our security →
            </a>
          </div>
          </div>
        </section>
      </main>
    </div>
  );
}
