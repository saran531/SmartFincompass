import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShieldIcon from "@mui/icons-material/Shield";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SpeedIcon from "@mui/icons-material/Speed";
import InsightsIcon from "@mui/icons-material/Insights";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import StarIcon from "@mui/icons-material/Star";
import PsychologyIcon from "@mui/icons-material/Psychology";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const PLANS = [
  {
    name: "Free",
    monthlyPrice: "₹0",
    yearlyPrice: "₹0",
    monthlyBilling: "Forever",
    yearlyBilling: "Forever",
    desc: "Start understanding your financial health with the essentials.",
    cta: "Get Started",
    ctaLink: "/login",
    highlighted: false,
    features: [
      "Create your financial profile",
      "Basic financial assessment",
      "Financial Health Score",
      "Basic financial insights",
      "Financial goals tracking",
      "Secure account",
      "Save and continue your assessment",
    ],
  },
  {
    name: "Smart",
    monthlyPrice: "₹499",
    yearlyPrice: "₹4,999",
    monthlyBilling: "/ month",
    yearlyBilling: "/ year",
    desc: "Get deeper insights and personalized recommendations for your financial journey.",
    cta: "Start Smart Plan →",
    ctaLink: "/login",
    highlighted: true,
    badge: "RECOMMENDED",
    features: [
      "Everything in Free",
      "Detailed Financial Health Analysis",
      "Cash Flow Analysis",
      "Net Worth Analysis",
      "Debt Analysis",
      "Emergency Fund Assessment",
      "Insurance Readiness",
      "Investment Readiness",
      "Financial Behaviour Analysis",
      "Personalized AI Insights",
      "Personalized Financial Roadmap",
      "Smart Recommendations",
      "Goal-based planning",
      "Downloadable financial report",
    ],
  },
  {
    name: "Premium",
    monthlyPrice: "₹999",
    yearlyPrice: "₹9,999",
    monthlyBilling: "/ month",
    yearlyBilling: "/ year",
    desc: "Complete financial intelligence and continuous guidance for long-term wealth building.",
    cta: "Go Premium →",
    ctaLink: "/login",
    highlighted: false,
    features: [
      "Everything in Smart",
      "Advanced AI Financial Analysis",
      "Advanced Risk Analysis",
      "Advanced Investment Readiness",
      "Detailed Financial Behaviour Analysis",
      "Comprehensive Financial Wellness Report",
      "Advanced Goal Planning",
      "Priority Recommendations",
      "Personalized Action Plan",
      "Financial Progress Tracking",
      "Regular AI-powered insights",
      "Premium financial guidance experience",
    ],
  },
];

const COMPARISON_ROWS = [
  { label: "Financial Profile", free: true, smart: true, premium: true },
  { label: "Basic Assessment", free: true, smart: true, premium: true },
  { label: "Financial Health Score", free: true, smart: true, premium: true },
  { label: "Cash Flow Analysis", free: false, smart: true, premium: true },
  { label: "Net Worth Analysis", free: false, smart: true, premium: true },
  { label: "Debt Analysis", free: false, smart: true, premium: true },
  { label: "Emergency Fund Analysis", free: false, smart: true, premium: true },
  { label: "Insurance Analysis", free: false, smart: true, premium: true },
  { label: "Investment Readiness", free: false, smart: true, premium: true },
  { label: "Financial Behaviour Analysis", free: false, smart: true, premium: true },
  { label: "Financial Goals", free: true, smart: true, premium: true },
  { label: "AI Insights", free: false, smart: true, premium: true },
  { label: "Personalized Roadmap", free: false, smart: true, premium: true },
  { label: "Smart Recommendations", free: false, smart: true, premium: true },
  { label: "Financial Wellness Report", free: false, smart: true, premium: true },
  { label: "Progress Tracking", free: false, smart: false, premium: true },
  { label: "Advanced Analysis", free: false, smart: false, premium: true },
  { label: "Priority Recommendations", free: false, smart: false, premium: true },
];

const VALUE_CARDS = [
  { icon: SpeedIcon, color: "text-violet-500 bg-violet-50", title: "Know Your Financial Health", desc: "Understand where you stand across savings, debt, investments, insurance and financial resilience." },
  { icon: InsightsIcon, color: "text-sky-500 bg-sky-50", title: "Understand Your Numbers", desc: "See your income, expenses, assets, liabilities and net worth in one connected financial picture." },
  { icon: AutoAwesomeIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Get Personalized Insights", desc: "Receive AI-powered insights based on your financial profile, behaviour and goals." },
  { icon: RocketLaunchIcon, color: "text-rose-500 bg-rose-50", title: "Know What to Do Next", desc: "Follow a personalized roadmap with clear priorities and actionable financial steps." },
];

const WHY_CARDS = [
  { icon: PsychologyIcon, color: "text-violet-500 bg-violet-50", title: "AI-Powered", desc: "Intelligent analysis turns your financial information into useful insights." },
  { icon: PersonIcon, color: "text-sky-500 bg-sky-50", title: "Personalized", desc: "Recommendations are based on your unique financial profile and goals." },
  { icon: FlagIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Goal-Oriented", desc: "Your financial priorities shape your personalized roadmap." },
  { icon: ShieldIcon, color: "text-rose-500 bg-rose-50", title: "Secure & Private", desc: "Your financial information is handled with strong privacy and security practices." },
  { icon: RocketLaunchIcon, color: "text-amber-accent bg-amber-50", title: "Actionable", desc: "Get practical next steps instead of generic financial advice." },
];

const FAQS = [
  { q: "Can I start SmartFin Compass for free?", a: "Yes. You can start with the Free plan and complete the essential financial assessment without paying." },
  { q: "Can I upgrade my plan later?", a: "Yes. You can upgrade when you want access to deeper analysis, personalized recommendations and additional financial insights." },
  { q: "Is my financial information secure?", a: "SmartFin Compass is designed with privacy and security in mind to help protect your financial information." },
  { q: "What do I get from the financial assessment?", a: "The assessment helps build a complete picture of your financial health, including income, expenses, assets, liabilities, goals, insurance and investment readiness." },
  { q: "How long does the assessment take?", a: "The guided assessment typically takes around 20–25 minutes, depending on how much information you provide." },
  { q: "Can I save and continue later?", a: "Yes. Your assessment journey is designed so you can save your progress and continue later." },
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

export default function Pricing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("Smart");
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

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
                  link.label === "Pricing" ? "text-navy-950" : "text-navy-900/70 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                  link.label === "Pricing" ? "w-full" : "w-0 group-hover/nav:w-full"
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
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green-500/15 via-navy-900/50 to-transparent" />
          <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl animate-pulse-glow" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-28 animate-fade-in-up">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
              Smarter Financial Decisions
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white">
              Choose the Right Plan for Your{" "}
              <span className="text-brand-green-400">Financial Journey</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
              Get the financial insights, personalized recommendations and guidance you need to understand your money and build a stronger financial future.
            </p>
            <p className="mt-3 text-xs sm:text-sm font-medium text-slate-400">
              Simple plans. Clear value. No confusing financial jargon.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/login"
                className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-brand-green-500/25 transition-all duration-250 hover:bg-brand-green-400"
              >
                Start Your Assessment
                <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-1" />
              </Link>
              <a
                href="#compare"
                className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-250 hover:border-white/40 hover:bg-white/10"
              >
                Compare Plans
              </a>
            </div>
          </div>
        </section>

        {/* ─── PRICING TOGGLE + CARDS ─── (SECTION 2: WHITE) */}
        <section className="relative z-10 bg-white py-16 text-navy-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Segmented Control Toggle */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-1 rounded-full border border-navy-950/10 bg-slate-100/90 p-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setBillingPeriod("monthly")}
                  aria-pressed={billingPeriod === "monthly"}
                  className={`rounded-full px-6 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
                    billingPeriod === "monthly"
                      ? "bg-brand-green-500 text-white shadow-md"
                      : "text-navy-900/60 hover:text-navy-950"
                  }`}
                >
                  Monthly
                </button>

                <button
                  type="button"
                  onClick={() => setBillingPeriod("yearly")}
                  aria-pressed={billingPeriod === "yearly"}
                  className={`rounded-full px-6 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
                    billingPeriod === "yearly"
                      ? "bg-brand-green-500 text-white shadow-md"
                      : "text-navy-900/60 hover:text-navy-950"
                  }`}
                >
                  Yearly
                </button>
              </div>

              <span
                className={`rounded-full bg-brand-green-50 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-brand-green-600 transition-all duration-200 ${
                  billingPeriod === "yearly"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none hidden sm:inline-block"
                }`}
              >
                Save up to 20%
              </span>
            </div>

            {/* Pricing Cards */}
            <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.name;
                return (
                  <div
                    key={plan.name}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedPlan(plan.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPlan(plan.name);
                      }
                    }}
                    className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 cursor-pointer card-hover-effect ${
                      plan.highlighted
                        ? "border-2 border-brand-green-400 bg-white shadow-[0_8px_40px_rgba(34,181,115,0.15)] scale-[1.02] lg:scale-105 z-10"
                        : isSelected
                        ? "border-2 border-brand-green-500 bg-white shadow-card ring-2 ring-brand-green-500/20"
                        : "border border-navy-950/10 bg-white shadow-soft hover:border-brand-green-300"
                    }`}
                  >
                    <div>
                      {plan.badge && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-green-500 px-4 py-1 text-xs font-bold text-white shadow-[0_2px_12px_rgba(34,181,115,0.3)]">
                          {plan.badge}
                        </span>
                      )}

                      <div className="flex items-center justify-between">
                        <p className={`text-xl font-bold ${plan.highlighted || isSelected ? "text-brand-green-600" : "text-navy-950"}`}>
                          {plan.name}
                        </p>
                        {isSelected && !plan.highlighted && (
                          <span className="rounded-full bg-brand-green-50 px-2.5 py-0.5 text-xs font-bold text-brand-green-600">
                            Selected
                          </span>
                        )}
                      </div>

                      <div className="mt-5 flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-extrabold text-navy-950">
                          {billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-navy-900/60">
                        {billingPeriod === "yearly" ? plan.yearlyBilling : plan.monthlyBilling}
                      </p>

                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-navy-900/70">
                        {plan.desc}
                      </p>

                      <Link
                        to={plan.ctaLink}
                        onClick={(e) => e.stopPropagation()}
                        className={`mt-6 flex h-12 w-full items-center justify-center rounded-xl text-sm sm:text-base font-semibold transition-all duration-250 active:scale-[0.98] ${
                          plan.highlighted
                            ? "bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.25)] hover:bg-brand-green-600 hover:shadow-[0_6px_24px_rgba(34,181,115,0.35)]"
                            : "border border-navy-950/15 text-navy-950 hover:border-brand-green-500 hover:text-brand-green-600"
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    </div>

                    <div className="mt-7 border-t border-navy-950/5 pt-6">
                      <p className="mb-4 text-xs font-bold uppercase tracking-wider text-navy-900/60">
                        What's included
                      </p>
                      <ul className="space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <CheckCircleIcon sx={{ fontSize: 16, color: "#22b573", mt: 0.25 }} />
                            <span className="text-sm sm:text-base text-navy-900/70">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── COMPARISON MATRIX ─── (SECTION 3: DARK BLUE) */}
        <section id="compare" className="relative z-10 bg-navy-950 py-24 text-white border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                COMPARE PLANS
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Everything You Need to Make Smarter Financial Decisions
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                Compare features across plans and choose the level of financial intelligence that fits your journey.
              </p>
            </div>

            <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-navy-900/90 p-4 sm:p-8 shadow-xl backdrop-blur-md text-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="w-2/5 pb-6 text-left text-base sm:text-lg font-bold text-white">
                        Feature
                      </th>
                      <th className="w-1/5 pb-6 text-center text-base sm:text-lg font-bold text-white">
                        Free
                      </th>
                      <th className="w-1/5 pb-6 text-center text-base sm:text-lg font-bold text-brand-green-400 bg-brand-green-500/20 rounded-t-xl py-3 border-x border-t border-brand-green-400/30">
                        Smart <span className="block text-xs font-semibold text-brand-green-300">(Recommended)</span>
                      </th>
                      <th className="w-1/5 pb-6 text-center text-base sm:text-lg font-bold text-white">
                        Premium
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {COMPARISON_ROWS.map((row) => (
                      <tr
                        key={row.label}
                        className="group/row transition-colors duration-150 hover:bg-white/5"
                      >
                        <td className="py-4 px-2 text-sm sm:text-base font-semibold text-slate-200">
                          {row.label}
                        </td>
                        <td className="py-4 text-center">
                          {row.free ? (
                            <CheckCircleIcon sx={{ fontSize: 22, color: "#22b573" }} />
                          ) : (
                            <RemoveIcon sx={{ fontSize: 20, color: "#64748b" }} />
                          )}
                        </td>
                        <td className="py-4 text-center bg-brand-green-500/10 border-x border-brand-green-400/20">
                          {row.smart ? (
                            <CheckCircleIcon sx={{ fontSize: 22, color: "#22b573" }} />
                          ) : (
                            <RemoveIcon sx={{ fontSize: 20, color: "#64748b" }} />
                          )}
                        </td>
                        <td className="py-4 text-center">
                          {row.premium ? (
                            <CheckCircleIcon sx={{ fontSize: 22, color: "#22b573" }} />
                          ) : (
                            <RemoveIcon sx={{ fontSize: 20, color: "#64748b" }} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHAT YOU GET ─── (SECTION 4: WHITE) */}
        <section className="bg-white py-24 text-navy-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                More Than a Score
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-navy-900/70">
                SmartFin Compass helps you understand the story behind your numbers and gives you practical direction for what to do next.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUE_CARDS.map((c) => (
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

        {/* ─── WHY SMARTFIN COMPASS ─── (SECTION 5: DARK BLUE) */}
        <section className="bg-navy-950 py-24 text-white border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Why Choose SmartFin Compass?
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {WHY_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group card-hover-effect rounded-2xl border border-white/10 bg-navy-900/90 p-7 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-brand-green-400/50"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
                    <c.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-green-400 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-300">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── (SECTION 6: WHITE) */}
        <section className="bg-white py-24 text-navy-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mx-auto mt-14 max-w-3xl space-y-3">
              {FAQS.map((f, i) => {
                const isOpen = faqOpenIndex === i;
                return (
                  <div
                    key={f.q}
                    className={`group/faq overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                      isOpen
                        ? "border-brand-green-400 bg-brand-green-50/20 shadow-[0_4px_20px_rgba(34,181,115,0.1)]"
                        : "border-navy-950/10 shadow-soft hover:border-brand-green-200 hover:shadow-[0_4px_16px_rgba(13,37,73,0.08)]"
                    }`}
                  >
                    <button
                      onClick={() => setFaqOpenIndex(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-3 px-6 py-5 text-left text-base sm:text-lg font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 rounded-xl"
                    >
                      <span className={`flex-1 transition-colors duration-300 ${isOpen ? "text-brand-green-700 font-bold" : "text-navy-950 group-hover/faq:text-brand-green-600"}`}>
                        {f.q}
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 bg-brand-green-500 text-white shadow-sm"
                            : "bg-slate-100 text-navy-900/40 group-hover/faq:bg-brand-green-50 group-hover/faq:text-brand-green-600"
                        }`}
                      >
                        <AddIcon sx={{ fontSize: 16 }} />
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      {f.a && (
                        <p className="px-6 pb-5 pt-0 text-sm sm:text-base leading-relaxed text-navy-900/70">
                          {f.a}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── SECURITY BANNER ─── (SECTION 7: DARK BLUE) */}
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
                    Your Financial Information Deserves to Be Protected
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                    SmartFin Compass is built with privacy and security at the center of the experience, so you can focus on improving your financial future with confidence.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                    <VerifiedUserIcon sx={{ fontSize: 28, color: "#22b573" }} />
                    <p className="mt-4 text-base font-bold text-white">Secure & Private</p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                      Your information is protected.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                    <StarIcon sx={{ fontSize: 28, color: "#22b573" }} />
                    <p className="mt-4 text-base font-bold text-white">Trusted Financial Experience</p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                      Designed to help you make informed financial decisions.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                    <PrivacyTipIcon sx={{ fontSize: 28, color: "#22b573" }} />
                    <p className="mt-4 text-base font-bold text-white">Your Data, Your Control</p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                      You stay in control of your financial journey.
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
              Start Building a Smarter{" "}
              <span className="text-brand-green-600">Financial Future</span> Today
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-navy-900/75">
              Discover your financial health, understand your priorities and get a personalized roadmap designed around your goals.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/login"
                className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-10 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-brand-green-500/25 transition-all duration-250 hover:bg-brand-green-600"
              >
                Start Your Assessment
                <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-1" />
              </Link>
              <a
                href="#compare"
                className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg border border-navy-950/20 px-10 py-4 text-sm sm:text-base font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600"
              >
                View Plans
              </a>
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
