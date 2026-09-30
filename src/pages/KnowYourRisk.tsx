import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BalanceIcon from "@mui/icons-material/Balance";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import knowYourRiskImg from "../Assets/images/Knowyourrisk.png";
import calculatorImg from "../Assets/images/calculator.png";
import sandImg from "../Assets/images/sand.png";
import yourGoalsImg from "../Assets/images/yourgoals.png";
import growthChartImg from "../Assets/images/growthchart.png";
import paperImg from "../Assets/images/paper.png";
import { HeroToFeaturesWave } from "../components/waves/SectionWaves";



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

const SPECTRUM_BADGE_TINTS = [
  "bg-teal-100 text-teal-700 ring-1 ring-teal-200",
  "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
];

const RISK_PROFILES = [
  {
    ageGroup: "18–25",
    riskLevel: "Very High",
    icon: RocketLaunchIcon,
    iconColor:
      "bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-lg shadow-rose-500/25",
    title: "18–25 — Very High Risk",
    text: "Focus on long-term wealth creation. Higher exposure to growth-oriented investments may be suitable because there is more time to recover from market volatility.",
  },
  {
    ageGroup: "26–35",
    riskLevel: "High",
    icon: TrendingUpIcon,
    iconColor:
      "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/25",
    title: "26–35 — High Risk",
    text: "Prioritize wealth accumulation while maintaining a foundation of stable investments.",
  },
  {
    ageGroup: "36–45",
    riskLevel: "Moderate–High",
    icon: BalanceIcon,
    iconColor:
      "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25",
    title: "36–45 — Moderate–High Risk",
    text: "Balance growth with increasing stability as financial responsibilities typically increase.",
  },
  {
    ageGroup: "46–55",
    riskLevel: "Moderate",
    icon: EnergySavingsLeafIcon,
    iconColor:
      "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/25",
    title: "46–55 — Moderate Risk",
    text: "Focus on building wealth while gradually protecting accumulated capital.",
  },
  {
    ageGroup: "56–65",
    riskLevel: "Moderate–Low",
    icon: ShieldIcon,
    iconColor:
      "bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-lg shadow-teal-500/25",
    title: "56–65 — Moderate–Low Risk",
    text: "Reduce volatility and increase the focus on capital preservation and future income.",
  },
  {
    ageGroup: "66–75",
    riskLevel: "Low",
    icon: AccountBalanceWalletIcon,
    iconColor:
      "bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-lg shadow-sky-500/25",
    title: "66–75 — Low Risk",
    text: "Prioritize predictable income, liquidity and preservation of accumulated wealth.",
  },
  {
    ageGroup: "75+",
    riskLevel: "Very Low",
    icon: SavingsIcon,
    iconColor:
      "bg-gradient-to-br from-brand-green-400 to-brand-green-600 text-white shadow-lg shadow-brand-green-500/25",
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

  return (
    <div className="min-h-screen bg-white">

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

            {/* Hero Illustration — below the CTA */}
            <div className="mt-10 sm:mt-12">
              <img
                src={knowYourRiskImg}
                alt="Know your risk assessment illustration"
                className="mx-auto w-full max-w-md object-contain drop-shadow-2xl sm:mx-0 lg:max-w-lg"
              />
            </div>
          </div>

          {/* ── RIGHT: Risk Meter Visual ── */}
          <div className="animate-fade-in-up delay-200">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_28px_60px_-20px_rgba(2,10,30,0.55)] transition-transform duration-300 ease-out hover:rotate-0 motion-reduce:transform-none sm:p-8 lg:-rotate-2">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-600 shadow-sm">
                    <ShieldIcon sx={{ fontSize: 22 }} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-900/60">
                    Risk Spectrum
                  </p>
                </span>
                {/* Subtle decorative mini-chart (matches reference) */}
                <span
                  aria-hidden="true"
                  className="hidden items-end gap-1 sm:flex"
                >
                  <span className="h-3 w-1.5 rounded-sm bg-brand-green-200" />
                  <span className="h-5 w-1.5 rounded-sm bg-brand-green-300" />
                  <span className="h-7 w-1.5 rounded-sm bg-brand-green-400" />
                  <span className="h-9 w-1.5 rounded-sm bg-brand-green-500" />
                </span>
              </div>
              <p className="mt-5 text-lg font-extrabold text-navy-950">
                Higher Risk → Higher Growth Potential
              </p>
              <div className="mt-6">
                <div className="flex h-3.5 w-full overflow-hidden rounded-full ring-1 ring-black/5">
                  {RISK_TABLE_ROWS.map((row) => (
                    <div
                      key={row.riskLevel}
                      className={`h-full flex-1 bg-gradient-to-r ${row.indicator}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-[11px] font-semibold text-slate-500">
                  <span>Very High</span>
                  <span>Moderate</span>
                  <span>Very Low</span>
                </div>
              </div>
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                {["18–25", "26–45", "46–65", "75+"].map((age, i) => (
                  <div
                    key={age}
                    className="flex items-center gap-3 text-sm font-medium text-navy-900/80"
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${SPECTRUM_BADGE_TINTS[i]}`}
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

        {/* Dark hero → light content wave transition */}
        <HeroToFeaturesWave />
      </section>

      <main className="bg-white">
        {/* ─── SECTION 1: RISK LEVEL PLANNING BY AGE ─── */}
        <section className="relative overflow-hidden">
          {/* Soft decorative accents */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-green-100/70 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-10 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
            <Reveal>
              <div className="grid grid-cols-2 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-10">
                <img
                  src={calculatorImg}
                  alt="Risk planning calculator"
                  className="order-2 mx-auto w-full max-w-[200px] object-contain drop-shadow-xl sm:max-w-[240px] lg:order-1 lg:col-start-1 lg:row-start-1 lg:max-w-[260px]"
                />
                <div className="order-1 col-span-2 text-center lg:order-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
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
                <img
                  src={yourGoalsImg}
                  alt="Your investment goals by age"
                  className="order-3 mx-auto w-full max-w-[180px] object-contain drop-shadow-xl sm:max-w-[210px] lg:col-start-3 lg:row-start-1 lg:max-w-[240px]"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(13,37,73,0.08)]">
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
                      {RISK_TABLE_ROWS.map((row) => (
                        <tr
                          key={row.ageGroup}
                          className="border-t border-slate-100 bg-white transition-colors duration-200 hover:bg-brand-green-50/60"
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
          </div>
        </section>

        {/* ─── SECTION 2: YOUR RISK LEVEL BY AGE ─── */}
        <section className="relative overflow-hidden bg-slate-50">
          {/* Soft decorative accents */}
          <div className="pointer-events-none absolute top-1/4 -right-28 h-72 w-72 rounded-full bg-brand-green-100/70 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 -left-24 h-64 w-64 rounded-full bg-emerald-50 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
            <Reveal>
              <div className="grid grid-cols-2 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-10">
                <img
                  src={sandImg}
                  alt="Risk level sand visual"
                  className="order-2 mx-auto w-full max-w-[200px] object-contain drop-shadow-xl sm:max-w-[240px] lg:order-1 lg:col-start-1 lg:row-start-1 lg:max-w-[260px]"
                />
                <div className="order-1 col-span-2 text-center lg:order-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
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
                <img
                  src={growthChartImg}
                  alt="Growth chart by age"
                  className="order-3 mx-auto w-full max-w-[180px] object-contain drop-shadow-xl sm:max-w-[210px] lg:col-start-3 lg:row-start-1 lg:max-w-[240px]"
                />
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {RISK_PROFILES.map((profile, i) => (
                <Reveal key={profile.ageGroup} delay={(i % 3) * 100} className="h-full">
                  <div className="group card-hover-effect flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_rgba(13,37,73,0.06)] transition-colors duration-300 hover:border-brand-green-400 sm:p-7">
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 ${profile.iconColor}`}
                      >
                        <profile.icon sx={{ fontSize: 24 }} />
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
        <section className="relative overflow-hidden">
          {/* Soft decorative accents */}
          <div className="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-brand-green-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
            <Reveal>
              <div className="grid items-center gap-8 rounded-3xl border border-brand-green-200 bg-gradient-to-br from-brand-green-50 via-brand-green-50 to-white p-7 shadow-[0_8px_30px_rgba(18,128,82,0.10)] sm:p-9 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                    <InfoOutlinedIcon sx={{ fontSize: 24 }} />
                  </span>
                  <div>
                    <h3 className="heading-card text-navy-950">
                      A Starting Point for Understanding Risk
                    </h3>
                    <p className="mt-3 text-body">
                      This is general educational information designed to help
                      you begin thinking about investment risk as you age. Every
                      investor is different, and personal circumstances should
                      always be considered before making financial decisions.
                    </p>
                  </div>
                </div>
                <img
                  src={paperImg}
                  alt="Educational notes on understanding risk"
                  className="mx-auto w-full max-w-[240px] object-contain drop-shadow-xl sm:max-w-[300px] lg:max-w-[340px]"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

    </div>
  );
}