import { useState } from "react";
import { Link } from "react-router-dom";
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
import StarIcon from "@mui/icons-material/Star";
import PsychologyIcon from "@mui/icons-material/Psychology";

// ─── Illustrations ───
import pricingImg from "../Assets/images/pricing.png";
import giftImg from "../Assets/images/gift.png";
import crownImg from "../Assets/images/crown.png";
import rocketImg from "../Assets/images/Rocket.png";
import growthChartImg from "../Assets/images/growthchart.png";
import paperRocketImg from "../Assets/images/PaperRocket.png";
import leafImg from "../Assets/images/Leaf.png";
import qaImg from "../Assets/images/QA.png";
import qImg from "../Assets/images/q.png";
import riskProfileImg from "../Assets/images/YourRiskProfile.png";
import computerImg from "../Assets/images/computer.png";

// ─── Reusable Section Transitions ───
import {
  FeaturesToHowItWorksWave,
  HowItWorksToBenefitsWave,
  BenefitsToTestimonialsWave,
  TestimonialsToFaqWave,
} from "../components/waves/SectionWaves";


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

/* Decorative plan illustrations for each pricing card */
const PLAN_IMAGES: Record<string, { src: string; alt: string }> = {
  Free: { src: giftImg, alt: "Free plan gift illustration" },
  Smart: { src: crownImg, alt: "Smart plan crown illustration" },
  Premium: { src: rocketImg, alt: "Premium plan rocket illustration" },
};

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
  { icon: PsychologyIcon, color: "text-white bg-violet-500", title: "AI-Powered", desc: "Intelligent analysis turns your financial information into useful insights." },
  { icon: PersonIcon, color: "text-white bg-sky-500", title: "Personalized", desc: "Recommendations are based on your unique financial profile and goals." },
  { icon: FlagIcon, color: "text-white bg-brand-green-500", title: "Goal-Oriented", desc: "Your financial priorities shape your personalized roadmap." },
  { icon: ShieldIcon, color: "text-white bg-rose-500", title: "Secure & Private", desc: "Your financial information is handled with strong privacy and security practices." },
  { icon: RocketLaunchIcon, color: "text-white bg-amber-500", title: "Actionable", desc: "Get practical next steps instead of generic financial advice." },
];

const FAQS = [
  { q: "Can I start SmartFin Compass for free?", a: "Yes. You can start with the Free plan and complete the essential financial assessment without paying." },
  { q: "Can I upgrade my plan later?", a: "Yes. You can upgrade when you want access to deeper analysis, personalized recommendations and additional financial insights." },
  { q: "Is my financial information secure?", a: "SmartFin Compass is designed with privacy and security in mind to help protect your financial information." },
  { q: "What do I get from the financial assessment?", a: "The assessment helps build a complete picture of your financial health, including income, expenses, assets, liabilities, goals, insurance and investment readiness." },
  { q: "How long does the assessment take?", a: "The guided assessment typically takes around 20–25 minutes, depending on how much information you provide." },
  { q: "Can I save and continue later?", a: "Yes. Your assessment journey is designed so you can save your progress and continue later." },
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

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("Smart");
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white">

      <main>
        {/* ─── HERO ─── (LIGHT — REFERENCE 2) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#eef7fb] via-white to-white text-navy-950">
          {/* Soft fintech backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-30" />
          <div className="pointer-events-none absolute -top-32 -left-32 z-0 h-96 w-96 rounded-full bg-cyan-100/70 blur-[120px]" />
          <div className="pointer-events-none absolute -top-24 right-1/4 z-0 h-80 w-80 rounded-full bg-brand-green-100/60 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 z-0 h-72 w-72 rounded-full bg-sky-100/60 blur-[120px]" />
          <Leaf className="hidden left-3 top-6 w-14 opacity-60 lg:block xl:w-16" />
          <Leaf className="hidden right-6 bottom-8 w-14 rotate-90 opacity-50 xl:block" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:py-24">
            <div className="animate-fade-in-up">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-600">
                Smarter Financial Decisions
              </p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-navy-950">
                Choose the Right Plan for Your{" "}
                <span className="text-brand-green-600">Financial Journey</span>
              </h1>
              <p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-navy-900/75">
                Get the financial insights, personalized recommendations and guidance you need to understand your money and build a stronger financial future.
              </p>
              <p className="mt-3 text-xs sm:text-sm font-medium text-navy-900/60">
                Simple plans. Clear value. No confusing financial jargon.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/login"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-brand-green-500/25 transition-all duration-250 hover:bg-brand-green-600"
                >
                  Start Your Assessment
                  <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-1" />
                </Link>
                <a
                  href="#compare"
                  className="group/btn btn-hover-effect inline-flex items-center gap-2.5 rounded-lg bg-navy-950 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-navy-950/15 transition-all duration-250 hover:bg-navy-900"
                >
                  Compare Plans
                </a>
              </div>
            </div>

            {/* Hero pricing illustration — right */}
            <div className="relative flex items-center justify-center lg:justify-end animate-fade-in-up delay-200">
              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="pointer-events-none absolute inset-x-8 bottom-1 h-10 rounded-[100%] bg-navy-950/10 blur-2xl" />
                <img
                  src={pricingImg}
                  alt="SmartFin Compass pricing illustration"
                  draggable={false}
                  className="relative h-auto w-full object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRICING TOGGLE + CARDS ─── (SECTION 2: WHITE) */}
        <section className="relative z-10 overflow-hidden bg-white py-16 text-navy-950 lg:py-20">
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 right-0 z-0 h-[360px] w-[620px] rounded-full bg-brand-green-100/40 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-10 left-10 z-0 h-72 w-72 rounded-full bg-cyan-100/60 blur-[120px]" />
          <Leaf className="hidden left-4 top-4 w-14 opacity-60 md:block xl:w-16" />
          <Leaf className="hidden right-4 top-4 w-14 rotate-90 opacity-60 md:block xl:w-16" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
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
                const planImage = PLAN_IMAGES[plan.name];
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
                        ? "border-2 border-brand-green-500 bg-white shadow-card ring-2 ring-brand-green-500/20 hover:-translate-y-1"
                        : "border border-navy-950/10 bg-white shadow-soft hover:-translate-y-1 hover:border-brand-green-300 hover:shadow-card"
                    }`}
                  >
                    <div>
                      {plan.badge && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-green-500 px-4 py-1 text-xs font-bold text-white shadow-[0_2px_12px_rgba(34,181,115,0.3)]">
                          {plan.badge}
                        </span>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
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
                        </div>

                        {/* Decorative plan illustration */}
                        {planImage && (
                          <img
                            src={planImage.src}
                            alt={planImage.alt}
                            draggable={false}
                            className="mt-1 w-14 shrink-0 select-none drop-shadow-md sm:w-16 lg:w-20"
                          />
                        )}
                      </div>

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

          {/* Multi-layer Wave Transition */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── COMPARISON MATRIX ─── (SECTION 3: DARK BLUE) */}
        <section id="compare" className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-10 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 z-0 h-80 w-80 rounded-full bg-[#00E676]/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            {/* Decorative illustrations flanking the heading */}
            <img
              src={paperRocketImg}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none absolute left-2 top-4 z-0 hidden w-24 select-none drop-shadow-xl lg:block xl:left-4 xl:w-36"
            />
            <img
              src={growthChartImg}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none absolute right-2 top-4 z-0 hidden w-28 select-none drop-shadow-xl lg:block xl:right-4 xl:w-44"
            />

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

            <div className="relative z-10 mt-14 overflow-hidden rounded-3xl border border-white/10 bg-navy-900/90 p-4 sm:p-8 shadow-xl backdrop-blur-md text-white">
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

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <HowItWorksToBenefitsWave />
          </div>
        </section>

        {/* ─── WHAT YOU GET ─── (SECTION 4: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-10 right-10 z-0 h-72 w-72 rounded-full bg-brand-green-500/5 blur-[120px]" />
          <Leaf className="hidden left-3 top-6 w-14 opacity-60 lg:block xl:w-16" />
          <Leaf className="hidden right-3 bottom-6 w-14 rotate-90 opacity-60 lg:block xl:w-16" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
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
                  className="group card-hover-effect rounded-2xl border border-navy-950/10 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green-500/40 hover:shadow-card"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
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

          {/* Multi-layer Wave Transition */}
          <BenefitsToTestimonialsWave />
        </section>

        {/* ─── WHY SMARTFIN COMPASS ─── (SECTION 5: DARK BLUE) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute -top-24 left-1/4 z-0 h-80 w-80 rounded-full bg-brand-green-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <Leaf className="hidden left-3 top-6 w-14 opacity-50 xl:block" />
          <Leaf className="hidden right-3 bottom-6 w-14 rotate-90 opacity-50 xl:block" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Why Choose SmartFin Compass?
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {WHY_CARDS.map((c) => (
                <div
                  key={c.title}
                  className="group card-hover-effect rounded-2xl border border-white/15 bg-white/[0.06] p-7 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green-400/50 hover:bg-white/[0.09]"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
                    <c.icon sx={{ fontSize: 30 }} />
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

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <TestimonialsToFaqWave />
          </div>
        </section>

        {/* ─── FAQ ─── (SECTION 6: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-100/50 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-10 left-10 z-0 h-72 w-72 rounded-full bg-brand-green-500/5 blur-[120px]" />
          <Leaf className="hidden left-4 top-6 w-14 opacity-60 lg:block xl:w-16" />
          <Leaf className="hidden right-4 top-6 w-14 rotate-90 opacity-60 lg:block xl:w-16" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="relative mt-14">
              {/* QA illustration — left (desktop) */}
              <img
                src={qaImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute -left-6 top-1/2 z-0 hidden w-40 select-none -translate-y-1/2 drop-shadow-xl xl:block xl:left-2 2xl:w-48"
              />
              {/* q illustration — right (desktop) */}
              <img
                src={qImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute -right-6 top-1/2 z-0 hidden w-40 select-none -translate-y-1/2 drop-shadow-xl xl:block xl:right-2 2xl:w-48"
              />

              <div className="relative z-10 mx-auto max-w-3xl space-y-3">
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

              {/* Stacked FAQ illustrations (smaller screens) */}
              <div className="relative z-10 mt-10 flex items-center justify-center gap-8 xl:hidden">
                <img
                  src={qaImg}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="w-28 select-none drop-shadow-md sm:w-32"
                />
                <img
                  src={qImg}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="w-28 select-none drop-shadow-md sm:w-32"
                />
              </div>
            </div>
          </div>

          {/* Multi-layer Wave Transition */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── SECURITY BANNER ─── (SECTION 7: DARK BLUE) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-20">
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-0 z-0 h-80 w-80 rounded-full bg-brand-green-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 px-6 py-14 shadow-xl sm:px-10 lg:px-14">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-green-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

              <div className="relative">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                  {/* YourRiskProfile illustration — left */}
                  <div className="flex justify-center lg:justify-start">
                    <img
                      src={riskProfileImg}
                      alt="Financial information protection illustration"
                      draggable={false}
                      className="w-52 max-w-full select-none drop-shadow-2xl sm:w-64 lg:w-72 xl:w-80"
                    />
                  </div>

                  <div className="text-center lg:text-left">
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
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50">
                    <span className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.3)]">
                      <VerifiedUserIcon sx={{ fontSize: 22 }} />
                    </span>
                    <p className="text-base font-bold text-white">Secure & Private</p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                      Your information is protected.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50">
                    <span className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.3)]">
                      <StarIcon sx={{ fontSize: 22 }} />
                    </span>
                    <p className="text-base font-bold text-white">Trusted Financial Experience</p>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                      Designed to help you make informed financial decisions.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50">
                    <span className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.3)]">
                      <PrivacyTipIcon sx={{ fontSize: 22 }} />
                    </span>
                    <p className="text-base font-bold text-white">Your Data, Your Control</p>
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

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <HowItWorksToBenefitsWave />
          </div>
        </section>

        {/* ─── FINAL CTA ─── (SECTION 8: WHITE) */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-brand-green-100/50 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-72 w-72 rounded-full bg-cyan-100/60 blur-[120px]" />
          <Leaf className="hidden left-4 top-6 w-14 opacity-60 lg:block xl:w-16" />
          <Leaf className="hidden right-4 bottom-6 w-14 rotate-90 opacity-60 lg:block xl:w-16" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10">
              {/* computer illustration — left */}
              <img
                src={computerImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="hidden w-40 max-w-full select-none drop-shadow-xl lg:block xl:w-48"
              />

              {/* Centre CTA content */}
              <div className="min-w-0 text-center">
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

              {/* PaperRocket illustration — right */}
              <img
                src={paperRocketImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="hidden w-32 max-w-full select-none drop-shadow-xl lg:block xl:w-40"
              />
            </div>

            {/* Stacked CTA illustrations (mobile/tablet) */}
            <div className="mt-10 flex items-center justify-center gap-10 lg:hidden">
              <img
                src={computerImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="w-32 select-none drop-shadow-lg sm:w-40"
              />
              <img
                src={paperRocketImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="w-28 select-none drop-shadow-lg sm:w-32"
              />
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
