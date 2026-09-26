import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SpeedIcon from "@mui/icons-material/Speed";
import PsychologyIcon from "@mui/icons-material/Psychology";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FlareIcon from "@mui/icons-material/Flare";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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

const RISK_TABLE_ROWS = [
  {
    ageGroup: "18–25",
    riskLevel: "Very High",
    growthAssets: "80–90%",
    stableAssets: "10–20%",
    objective: "Wealth Creation",
    indicator: "from-rose-500 to-red-500",
    ring: "#e11d48",
  },
  {
    ageGroup: "26–35",
    riskLevel: "High",
    growthAssets: "70–80%",
    stableAssets: "20–30%",
    objective: "Aggressive Growth",
    indicator: "from-orange-400 to-rose-500",
    ring: "#f97316",
  },
  {
    ageGroup: "36–45",
    riskLevel: "Moderate–High",
    growthAssets: "60–70%",
    stableAssets: "30–40%",
    objective: "Growth + Stability",
    indicator: "from-amber-400 to-orange-500",
    ring: "#f59e0b",
  },
  {
    ageGroup: "46–55",
    riskLevel: "Moderate",
    growthAssets: "50–60%",
    stableAssets: "40–50%",
    objective: "Balanced Growth",
    indicator: "from-yellow-400 to-amber-500",
    ring: "#eab308",
  },
  {
    ageGroup: "56–65",
    riskLevel: "Moderate–Low",
    growthAssets: "35–50%",
    stableAssets: "50–65%",
    objective: "Capital Protection",
    indicator: "from-emerald-400 to-teal-500",
    ring: "#10b981",
  },
  {
    ageGroup: "66–75",
    riskLevel: "Low",
    growthAssets: "20–35%",
    stableAssets: "65–80%",
    objective: "Income + Protection",
    indicator: "from-teal-400 to-sky-500",
    ring: "#14b8a6",
  },
  {
    ageGroup: "75+",
    riskLevel: "Very Low",
    growthAssets: "10–25%",
    stableAssets: "75–90%",
    objective: "Capital Preservation",
    indicator: "from-sky-400 to-brand-green-500",
    ring: "#0ea5e9",
  },
];

const RISK_PROFILES = [
  {
    ageGroup: "18–25",
    riskLevel: "Very High",
    icon: FlareIcon,
    iconColor: "bg-rose-50 text-rose-600",
    title: "18–25 — Very High Risk",
    text: "Focus on long-term wealth creation. Higher exposure to growth-oriented investments may be suitable because there is more time to recover from market volatility.",
  },
  {
    ageGroup: "26–35",
    riskLevel: "High",
    icon: TrendingUpIcon,
    iconColor: "bg-orange-50 text-orange-600",
    title: "26–35 — High Risk",
    text: "Prioritize wealth accumulation while maintaining a foundation of stable investments.",
  },
  {
    ageGroup: "36–45",
    riskLevel: "Moderate–High",
    icon: SpeedIcon,
    iconColor: "bg-amber-50 text-amber-600",
    title: "36–45 — Moderate–High Risk",
    text: "Balance growth with increasing stability as financial responsibilities typically increase.",
  },
  {
    ageGroup: "46–55",
    riskLevel: "Moderate",
    icon: InsightsIcon,
    iconColor: "bg-yellow-50 text-yellow-600",
    title: "46–55 — Moderate Risk",
    text: "Focus on building wealth while gradually protecting accumulated capital.",
  },
  {
    ageGroup: "56–65",
    riskLevel: "Moderate–Low",
    icon: PsychologyIcon,
    iconColor: "bg-emerald-50 text-emerald-600",
    title: "56–65 — Moderate–Low Risk",
    text: "Reduce volatility and increase the focus on capital preservation and future income.",
  },
  {
    ageGroup: "66–75",
    riskLevel: "Low",
    icon: AccountBalanceWalletIcon,
    iconColor: "bg-teal-50 text-teal-600",
    title: "66–75 — Low Risk",
    text: "Prioritize predictable income, liquidity and preservation of accumulated wealth.",
  },
  {
    ageGroup: "75+",
    riskLevel: "Very Low",
    icon: ShieldIcon,
    iconColor: "bg-sky-50 text-sky-600",
    title: "75+ — Very Low Risk",
    text: "Focus primarily on capital preservation, income needs and liquidity.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function RiskIndicator({
  gradient,
  ring,
  label,
}: {
  gradient: string;
  ring: string;
  label: string;
}) {
  return (
    <span
      className="group/risk inline-flex items-center gap-2.5"
      title={label}
    >
      <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center">
        <span
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-20 transition-transform duration-300 group-hover/risk:scale-125`}
        />
        <span
          className={`relative h-2.5 w-2.5 rounded-full bg-gradient-to-br ${gradient} ring-2 transition-transform duration-300 group-hover/risk:scale-125`}
          style={{ ["--tw-ring-color" as string]: ring }}
        />
      </span>
      <span className="font-semibold text-navy-950">{label}</span>
    </span>
  );
}

export default function KnowYourRisk() {
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
                className="group/nav relative text-[15px] font-medium text-navy-900/70 transition-colors duration-250 hover:text-brand-green-600"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-brand-green-500 transition-all duration-300 group-hover/nav:w-full" />
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

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green-500/15 via-navy-900/50 to-transparent" />
        <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl animate-pulse-glow" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-28">
          {/* ── LEFT: Hero Text ── */}
          <div className="animate-fade-in-up">
            <p className="section-eyebrow text-brand-green-400">
              Investment Guidance
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Know Your{" "}
              <span className="text-brand-green-400">Risk</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Understand how age can influence your investment risk planning.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                to="/login"
                className="group/cta btn-hover-effect inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-green-500/25 transition-all duration-250 hover:bg-brand-green-400 sm:text-base"
              >
                Start Your Assessment
                <ArrowForwardIcon
                  fontSize="small"
                  className="transition-transform duration-250 group-hover/cta:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Risk Meter Visual ── */}
          <div className="animate-fade-in-up delay-200">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500/20 text-brand-green-400">
                  <ShieldIcon sx={{ fontSize: 22 }} />
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Risk Spectrum
                </p>
              </div>
              <p className="mt-5 text-lg font-bold text-white">
                Higher Risk → Higher Growth Potential
              </p>
              <div className="mt-7">
                <div className="flex h-3 w-full overflow-hidden rounded-full">
                  {RISK_TABLE_ROWS.map((row) => (
                    <div
                      key={row.riskLevel}
                      className={`h-full flex-1 bg-gradient-to-r ${row.indicator}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>Very High</span>
                  <span>Moderate</span>
                  <span>Very Low</span>
                </div>
              </div>
              <div className="mt-7 space-y-3 border-t border-white/10 pt-6">
                {["18–25", "26–45", "46–65", "75+"].map((age, i) => (
                  <div
                    key={age}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-bold text-brand-green-400 ${
                        i > 0 ? "opacity-70" : ""
                      }`}
                    >
                      {age.replace(/[^0-9+]/g, "").replace("+", "")}
                    </span>
                    <span>
                      Age {age} ·{" "}
                      {RISK_TABLE_ROWS.filter((r) =>
                        age === "18–25"
                          ? r.ageGroup === "18–25"
                          : age === "26–45"
                          ? r.ageGroup === "26–35" || r.ageGroup === "36–45"
                          : age === "46–65"
                          ? r.ageGroup === "46–55" || r.ageGroup === "56–65"
                          : r.ageGroup === "66–75" || r.ageGroup === "75+"
                      ).map((r) => r.riskLevel).join(" → ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-slate-50">
        {/* ─── SECTION 1: RISK LEVEL PLANNING BY AGE ─── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-eyebrow text-brand-green-600">
                Age-Based Planning
              </p>
              <h2 className="heading-section mt-3">
                Risk Level Planning by Age
              </h2>
              <p className="mt-5 text-body">
                A general framework for how investment risk appetites can
                evolve across different stages of life.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="bg-navy-950 text-white">
                      {[
                        "Age Group",
                        "Risk Level",
                        "Growth Assets",
                        "Stable Assets",
                        "Primary Objective",
                      ].map((col) => (
                        <th
                          key={col}
                          className="px-6 py-4 text-xs font-bold uppercase tracking-wider sm:text-sm"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RISK_TABLE_ROWS.map((row, i) => (
                      <tr
                        key={row.ageGroup}
                        className={`border-t border-slate-100 transition-colors duration-200 hover:bg-brand-green-50/60 ${
                          i % 2 === 1 ? "bg-slate-50/50" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-bold text-navy-950 sm:text-base">
                          {row.ageGroup}
                        </td>
                        <td className="px-6 py-4">
                          <RiskIndicator
                            gradient={row.indicator}
                            ring={row.ring}
                            label={row.riskLevel}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-navy-900/80 sm:text-base">
                          {row.growthAssets}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-navy-900/80 sm:text-base">
                          {row.stableAssets}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-brand-green-600 sm:text-base">
                          {row.objective}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─── SECTION 2: YOUR RISK LEVEL BY AGE ─── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="section-eyebrow text-brand-green-600">
                  Personal Perspective
                </p>
                <h2 className="heading-section mt-3">
                  Your Risk Level by Age
                </h2>
                <div className="mt-5 flex flex-col items-center justify-center gap-2 text-sm font-semibold text-navy-900/70 sm:flex-row sm:gap-8 sm:text-base">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-rose-500 to-red-500" />
                    Younger = More Growth Potential
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-400 to-brand-green-500" />
                    Older = More Stability &amp; Protection
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {RISK_PROFILES.map((profile, i) => (
                <Reveal key={profile.ageGroup} delay={(i % 3) * 100}>
                  <div className="card-hover-effect h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.05)]">
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${profile.iconColor}`}
                      >
                        <profile.icon sx={{ fontSize: 22 }} />
                      </span>
                      <h3 className="heading-card">{profile.title}</h3>
                    </div>
                    <p className="mt-4 text-body-sm">{profile.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: EDUCATIONAL NOTE ─── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <Reveal>
            <div className="flex flex-col gap-5 rounded-2xl border border-brand-green-200 bg-brand-green-50/60 p-7 sm:flex-row sm:items-start sm:gap-6 sm:p-9">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                <InfoOutlinedIcon sx={{ fontSize: 24 }} />
              </span>
              <div>
                <h3 className="heading-card text-navy-950">
                  A Starting Point for Understanding Risk
                </h3>
                <p className="mt-3 text-body">
                  This is general educational information designed to help you
                  begin thinking about investment risk as you age. Every
                  investor is different, and personal circumstances should
                  always be considered before making financial decisions.
                </p>
              </div>
            </div>
          </Reveal>
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
              <p className="mt-5 max-w-xs text-sm leading-relaxed sm:text-base">
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
                          className="text-sm transition-colors duration-200 hover:text-brand-green-400 sm:text-base"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          className="text-sm transition-colors duration-200 hover:text-brand-green-400 sm:text-base"
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

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-white/60 sm:flex-row sm:text-sm">
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