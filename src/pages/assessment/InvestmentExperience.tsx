import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SpeedIcon from "@mui/icons-material/Speed";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import BalanceIcon from "@mui/icons-material/Balance";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event";
import PieChartIcon from "@mui/icons-material/PieChart";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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

const PROGRESS_STEPS = [
  { label: "Personal Info", completed: true },
  { label: "Employment", completed: true },
  { label: "Income Sources", completed: true },
  { label: "Expenses", completed: true },
  { label: "Assets", completed: true },
  { label: "Liabilities", completed: true },
  { label: "Investment", active: true },
];

const RISK_OPTIONS = [
  {
    key: "conservative",
    label: "Conservative",
    sub: "Low Risk",
    icon: ShieldIcon,
    color: "text-brand-green-600 bg-brand-green-50",
  },
  {
    key: "moderate",
    label: "Moderate",
    sub: "Medium Risk",
    icon: AutoModeIcon,
    color: "text-amber-500 bg-amber-50",
  },
  {
    key: "balanced",
    label: "Balanced",
    sub: "Medium to High",
    icon: BalanceIcon,
    color: "text-sky-500 bg-sky-50",
  },
  {
    key: "aggressive",
    label: "Aggressive",
    sub: "High Risk",
    icon: ShowChartIcon,
    color: "text-red-500 bg-red-50",
  },
];

const KNOWLEDGE_OPTIONS = [
  { key: "beginner", label: "Beginner", sub: "Basic understanding" },
  { key: "intermediate", label: "Intermediate", sub: "Some knowledge" },
  { key: "advanced", label: "Advanced", sub: "Good knowledge" },
  { key: "expert", label: "Expert", sub: "Very knowledgeable" },
];

const DURATION_OPTIONS = [
  { key: "short", label: "Short Term", sub: "Less than 1 year" },
  { key: "medium", label: "Medium Term", sub: "1 to 3 years" },
  { key: "long", label: "Long Term", sub: "3 to 7 years" },
  { key: "veryLong", label: "Very Long Term", sub: "More than 7 years" },
];

const INVESTMENT_OPTIONS = [
  "Bank Deposits",
  "Mutual Funds",
  "Stocks / Equity",
  "Bonds",
  "Gold / Silver",
  "Real Estate",
  "PPF / EPF",
  "Crypto Currency",
  "Other",
];

function ProfileDonutChart() {
  const radius = 65;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const segments = useMemo(() => {
    const data = [
      { color: "#22b573", pct: 0.3 },
      { color: "#3b82f6", pct: 0.25 },
      { color: "#8b5cf6", pct: 0.2 },
      { color: "#f59e0b", pct: 0.15 },
      { color: "#ec4899", pct: 0.1 },
    ];
    let acc = 0;
    return data.map((d) => {
      const dash = d.pct * circumference;
      const offset = -acc * circumference;
      acc += d.pct;
      return { ...d, dash, offset };
    });
  }, [circumference]);

  return (
    <div className="relative mx-auto flex h-[180px] w-[180px] items-center justify-center">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#eef1f6"
          strokeWidth={strokeWidth}
        />
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
            strokeDashoffset={seg.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/5">
          <PersonIcon sx={{ fontSize: 22 }} className="text-navy-900/40" />
        </span>
        <span className="mt-1 text-xs font-semibold text-navy-950">
          Your Profile
        </span>
      </div>
    </div>
  );
}

export default function InvestmentExperience() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { assessmentData, updateAssessment } = useApp();

  const saved = assessmentData.investment || {};
  const [riskAppetite, setRiskAppetite] = useState(saved.riskAppetite || "conservative");
  const [knowledge, setKnowledge] = useState(saved.investmentKnowledge || "beginner");
  const [duration, setDuration] = useState(saved.investmentDuration || "veryLong");
  const [investments, setInvestments] = useState<string[]>(
    saved.currentInvestments && saved.currentInvestments.length > 0
      ? saved.currentInvestments
      : ["Bank Deposits", "Mutual Funds", "Stocks / Equity", "Gold / Silver", "Real Estate", "PPF / EPF"]
  );
  const [otherInvestment, setOtherInvestment] = useState("");

  const toggleInvestment = (opt: string) => {
    setInvestments((prev) =>
      prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
    );
  };

  const riskLabel = RISK_OPTIONS.find((o) => o.key === riskAppetite)?.label || "";
  const knowledgeLabel = KNOWLEDGE_OPTIONS.find((o) => o.key === knowledge)?.label || "";
  const durationLabel = DURATION_OPTIONS.find((o) => o.key === duration)?.sub || "";

  return (
    <div className="min-h-screen bg-slate-50">
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
                  i === 0
                    ? "text-navy-950"
                    : "text-navy-900/70 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                    i === 0 ? "w-full" : "w-0 group-hover/nav:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <button className="relative grid h-10 w-10 place-items-center rounded-full text-navy-900/60 transition-colors hover:bg-slate-100 hover:text-navy-950">
              <NotificationsNoneIcon sx={{ fontSize: 22 }} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green-500" />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                VG
              </span>
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className="text-navy-900/50"
              />
            </div>
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
            <div className="mt-4 flex items-center gap-3">
              <button className="relative grid h-10 w-10 place-items-center rounded-full text-navy-900/60">
                <NotificationsNoneIcon sx={{ fontSize: 22 }} />
              </button>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                VG
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* ─── TOP ROW: Title + Assessment Progress ─── */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Investment
              <br />
              Experience
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-navy-900/55">
              Help us understand your investment experience to provide
              personalized insights.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-lg rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-50 px-3 py-1 text-xs font-semibold text-brand-green-600">
                Step 7 of 7
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(100%-80px)] bg-navy-950/8" />
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(100%-80px)] bg-brand-green-500" />
              <div className="flex items-start justify-between">
                {PROGRESS_STEPS.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center text-center"
                    style={{ width: `${100 / 7}%` }}
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        step.completed
                          ? "bg-brand-green-500 text-white shadow-[0_0_10px_rgba(34,181,115,0.25)]"
                          : step.active
                          ? "bg-brand-green-500 text-white shadow-[0_0_10px_rgba(34,181,115,0.25)]"
                          : "border-2 border-navy-950/10 bg-white text-navy-900/40"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircleIcon sx={{ fontSize: 18 }} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <p
                      className={`mt-2 text-[10px] font-semibold leading-tight ${
                        step.active
                          ? "text-brand-green-600"
                          : step.completed
                          ? "text-navy-900/60"
                          : "text-navy-900/45"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.04)] sm:p-8">
            <div className="mb-6">
              <p className="text-base font-bold text-navy-950">
                Answer a Few Questions
              </p>
              <p className="mt-1 text-sm text-navy-900/50">
                Your answers will help us build better recommendations
              </p>
            </div>

            {/* Question 1: Risk Appetite */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600">
                  <SpeedIcon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-500 text-[11px] font-bold text-white">
                      1
                    </span>
                    <p className="text-sm font-bold text-navy-950">
                      Risk Appetite
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs text-navy-900/50">
                    What is your comfort level with investment risk?
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {RISK_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setRiskAppetite(opt.key)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                      riskAppetite === opt.key
                        ? "border-brand-green-500 bg-brand-green-50/50"
                        : "border-navy-950/8 bg-white hover:border-navy-950/15"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${opt.color}`}
                    >
                      <opt.icon sx={{ fontSize: 20 }} />
                    </span>
                    <span className="text-xs font-bold text-navy-950">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-navy-900/45">
                      {opt.sub}
                    </span>
                    <span
                      className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        riskAppetite === opt.key
                          ? "border-brand-green-500"
                          : "border-navy-950/15"
                      }`}
                    >
                      {riskAppetite === opt.key && (
                        <span className="h-2 w-2 rounded-full bg-brand-green-500" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Investment Knowledge */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                  <MenuBookIcon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-500 text-[11px] font-bold text-white">
                      2
                    </span>
                    <p className="text-sm font-bold text-navy-950">
                      Investment Knowledge
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs text-navy-900/50">
                    How would you rate your knowledge about investments?
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {KNOWLEDGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setKnowledge(opt.key)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                      knowledge === opt.key
                        ? "border-brand-green-500 bg-brand-green-50/50"
                        : "border-navy-950/8 bg-white hover:border-navy-950/15"
                    }`}
                  >
                    <span className="text-xs font-bold text-navy-950">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-navy-900/45">
                      {opt.sub}
                    </span>
                    <span
                      className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        knowledge === opt.key
                          ? "border-brand-green-500"
                          : "border-navy-950/15"
                      }`}
                    >
                      {knowledge === opt.key && (
                        <span className="h-2 w-2 rounded-full bg-brand-green-500" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Investment Duration */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                  <EventIcon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-500 text-[11px] font-bold text-white">
                      3
                    </span>
                    <p className="text-sm font-bold text-navy-950">
                      Investment Duration
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs text-navy-900/50">
                    What is your investment time horizon?
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {DURATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setDuration(opt.key)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                      duration === opt.key
                        ? "border-violet-500 bg-violet-50/50"
                        : "border-navy-950/8 bg-white hover:border-navy-950/15"
                    }`}
                  >
                    <span className="text-xs font-bold text-navy-950">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-navy-900/45">
                      {opt.sub}
                    </span>
                    <span
                      className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        duration === opt.key
                          ? "border-violet-500"
                          : "border-navy-950/15"
                      }`}
                    >
                      {duration === opt.key && (
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Current Investments */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <PieChartIcon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-500 text-[11px] font-bold text-white">
                      4
                    </span>
                    <p className="text-sm font-bold text-navy-950">
                      Current Investments
                    </p>
                    <span className="text-xs text-navy-900/45">
                      (Select all that apply)
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-navy-900/50">
                    Which of the following do you currently invest in?
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {INVESTMENT_OPTIONS.map((opt) => {
                  const checked = investments.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleInvestment(opt)}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                        checked
                          ? "border-brand-green-500 bg-brand-green-50/50"
                          : "border-navy-950/8 bg-white hover:border-navy-950/15"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                          checked
                            ? "border-brand-green-500 bg-brand-green-500"
                            : "border-navy-950/20 bg-white"
                        }`}
                      >
                        {checked && (
                          <CheckCircleIcon
                            sx={{ fontSize: 14 }}
                            className="text-white"
                          />
                        )}
                      </span>
                      <span className="text-xs font-semibold text-navy-950">
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
              {investments.includes("Other") && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={otherInvestment}
                    onChange={(e) => setOtherInvestment(e.target.value)}
                    placeholder="Please specify your other investment"
                    className="h-11 w-full rounded-xl border border-navy-950/10 bg-white px-4 text-sm text-navy-950 placeholder:text-navy-900/40 transition-all hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/insurance")}
                className="flex h-12 items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-6 text-sm font-semibold text-brand-green-600 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  const finalInvestments = investments.map((i) => i === "Other" && otherInvestment.trim() ? `Other: ${otherInvestment.trim()}` : i);
                  updateAssessment("investment", { riskAppetite, investmentKnowledge: knowledge, investmentDuration: duration, currentInvestments: finalInvestments });
                  navigate("/financial-goals");
                }}
                className="flex h-12 items-center gap-2 rounded-xl bg-brand-green-500 px-8 text-[15px] font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-navy-900/50">
              <LockIcon sx={{ fontSize: 16 }} className="text-brand-green-500" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Your Investment Profile */}
            <div className="rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
              <h3 className="mb-2 text-base font-bold text-navy-950">
                Your Investment Profile
              </h3>
              <p className="mb-4 text-sm text-navy-900/50">Profile Summary</p>

              <ProfileDonutChart />

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between border-b border-navy-950/5 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldIcon
                      sx={{ fontSize: 16 }}
                      className="text-brand-green-500"
                    />
                    <span className="text-sm text-navy-900/60">
                      Risk Appetite
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-brand-green-600">
                    {riskLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-navy-950/5 pb-3">
                  <div className="flex items-center gap-2">
                    <MenuBookIcon
                      sx={{ fontSize: 16 }}
                      className="text-brand-green-500"
                    />
                    <span className="text-sm text-navy-900/60">
                      Knowledge Level
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-brand-green-600">
                    {knowledgeLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-navy-950/5 pb-3">
                  <div className="flex items-center gap-2">
                    <EventIcon
                      sx={{ fontSize: 16 }}
                      className="text-brand-green-500"
                    />
                    <span className="text-sm text-navy-900/60">
                      Investment Duration
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-brand-green-600">
                    {durationLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChartIcon
                      sx={{ fontSize: 16 }}
                      className="text-brand-green-500"
                    />
                    <span className="text-sm text-navy-900/60">
                      Current Investments
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-brand-green-600">
                    {investments.length} Selected
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Why We Ask These Questions? */}
            <div className="rounded-2xl border border-navy-950/5 bg-brand-green-50/30 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600">
                  <TrendingUpIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why We Ask These Questions?
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-navy-900/55">
                Understanding your investment experience helps us suggest
                suitable products and strategies aligned with your goals and
                comfort level.
              </p>
            </div>

            {/* Card 3: 100% Secure */}
            <div className="rounded-2xl border border-navy-950/5 bg-sky-50/40 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-500">
                  <ShieldIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  100% Secure
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-navy-900/55">
                We use bank-level encryption to protect your financial data.
                <br />
                Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>
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
