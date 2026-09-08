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
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import ComputerIcon from "@mui/icons-material/Computer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShieldIcon from "@mui/icons-material/Shield";
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
  { label: "Income Sources", active: true },
  { label: "Review & Insights", completed: false },
];

const INCOME_SOURCES = [
  {
    key: "salary",
    label: "Salary (In-hand)",
    desc: "Your take-home salary after deductions",
    icon: AccountBalanceWalletIcon,
    color: "text-brand-green-600 bg-brand-green-50 border border-brand-green-100",
  },
  {
    key: "business",
    label: "Business Income",
    desc: "Profit from your business or self-owned company",
    icon: BusinessIcon,
    color: "text-violet-600 bg-violet-50 border border-violet-100",
  },
  {
    key: "rental",
    label: "Rental Income",
    desc: "Income from rent, lease or property",
    icon: HomeIcon,
    color: "text-amber-600 bg-amber-50 border border-amber-100",
  },
  {
    key: "freelance",
    label: "Freelance Income",
    desc: "Earnings from freelance work or projects",
    icon: ComputerIcon,
    color: "text-sky-600 bg-sky-50 border border-sky-100",
  },
  {
    key: "other",
    label: "Other Income",
    desc: "Any other regular income not listed above",
    icon: MoreHorizIcon,
    color: "text-teal-600 bg-teal-50 border border-teal-100",
  },
];

const CHART_COLORS = {
  salary: "#189a63",
  business: "#8b5cf6",
  rental: "#d97706",
  freelance: "#2563eb",
  other: "#0d9488",
};

const CHART_LABELS: Record<string, string> = {
  salary: "Salary",
  business: "Business",
  rental: "Rental",
  freelance: "Freelance",
  other: "Other Income",
};

function DonutChart({
  values,
  total,
}: {
  values: Record<string, number>;
  total: number;
}) {
  const radius = 70;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;

  const segments = useMemo(() => {
    if (total === 0) return [];
    const keys = Object.keys(values) as string[];
    let accumulated = 0;
    return keys
      .filter((k) => values[k] > 0)
      .map((key) => {
        const pct = values[key] / total;
        const dashArray = pct * circumference;
        const dashOffset = -accumulated * circumference;
        accumulated += pct;
        return {
          key,
          color: CHART_COLORS[key as keyof typeof CHART_COLORS],
          dashArray,
          dashOffset,
        };
      });
  }, [values, total, circumference]);

  return (
    <div className="relative mx-auto flex h-[200px] w-[200px] items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={strokeWidth}
        />
        {/* Colored segments */}
        {segments.map((seg) => (
          <circle
            key={seg.key}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${seg.dashArray} ${circumference - seg.dashArray}`}
            strokeDashoffset={seg.dashOffset}
            strokeLinecap="butt"
            className="transition-all duration-500"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black text-navy-950">
          ₹{total.toLocaleString("en-IN")}
        </span>
        <span className="text-center text-xs font-bold text-slate-600">
          Total Monthly
          <br />
          Income
        </span>
      </div>
    </div>
  );
}

export default function IncomeDetails() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const savedInc = assessmentData.income || {};
  const [amounts, setAmounts] = useState<Record<string, string>>({
    salary: savedInc.salary || "",
    business: savedInc.business || "",
    rental: savedInc.rental || "",
    freelance: savedInc.freelance || "",
    other: savedInc.other || "",
  });

  const numericValues = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(amounts).map(([k, v]) => [
          k,
          parseFloat(v) || 0,
        ])
      ) as Record<string, number>,
    [amounts]
  );

  const total = useMemo(
    () => Object.values(numericValues).reduce((a, b) => a + b, 0),
    [numericValues]
  );

  const handleChange = (key: string, value: string) => {
    let cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
    if (parts[1] && parts[1].length > 2) cleaned = parts[0] + "." + parts[1].slice(0, 2);
    setAmounts((prev) => ({ ...prev, [key]: cleaned }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
                  i === 0
                    ? "text-navy-950 font-bold"
                    : "text-slate-700 hover:text-brand-green-600"
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
            <button className="relative grid h-10 w-10 place-items-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 hover:text-navy-950">
              <NotificationsNoneIcon sx={{ fontSize: 22 }} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green-500" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white shadow-sm">
                VG
              </span>
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className="text-slate-700 font-bold"
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
            <div className="mt-4 flex items-center gap-3">
              <button className="relative grid h-10 w-10 place-items-center rounded-full text-slate-700">
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
            <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl tracking-tight">
              Income Sources
            </h1>
            <p className="mt-3 text-base sm:text-lg leading-relaxed font-medium text-slate-700">
              Add all your income sources to get a complete view of your
              monthly earnings.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-lg rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-base font-extrabold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-100/90 px-3.5 py-1 text-xs font-extrabold text-brand-green-800 border border-brand-green-200">
                Step 3 of 4
              </span>
            </div>
            <div className="relative">
              {/* Connector lines */}
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(100%-80px)] bg-slate-200" />
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(66.6%-27px)] bg-brand-green-500" />
              <div className="flex items-start justify-between">
                {PROGRESS_STEPS.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center text-center"
                    style={{ width: "25%" }}
                  >
                    <span
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        step.completed || step.active
                          ? "bg-brand-green-500 text-white shadow-[0_0_14px_rgba(34,181,115,0.3)]"
                          : "border-2 border-slate-300 bg-white text-slate-500 font-bold"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <p
                      className={`mt-2.5 text-xs sm:text-sm font-extrabold ${
                        step.active || step.completed
                          ? "text-brand-green-700"
                          : "text-slate-600"
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
          <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-lg sm:text-xl font-extrabold text-navy-950">
                Add Your Income Sources
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Enter your average monthly income from all sources
              </p>
            </div>

            {/* Income Rows */}
            <div className="space-y-4">
              {INCOME_SOURCES.map((src) => (
                <div
                  key={src.key}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/80"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${src.color}`}
                  >
                    <src.icon sx={{ fontSize: 22 }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold text-navy-950">
                      {src.label}
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm font-medium text-slate-600">
                      {src.desc}
                    </p>
                  </div>
                  <div className="relative w-full max-w-[200px] shrink-0">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-base sm:text-lg font-black text-navy-950">
                      ₹
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={amounts[src.key]}
                      onChange={(e) => handleChange(src.key, e.target.value)}
                      placeholder="Enter amount"
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-10 text-sm sm:text-base font-extrabold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs sm:text-sm font-bold text-slate-500">
                      .00
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Monthly Income */}
            <div className="mt-6 flex items-center justify-between rounded-xl border-2 border-brand-green-300 bg-brand-green-50/80 px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700 border border-brand-green-200">
                  <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />
                </span>
                <div>
                  <p className="text-base font-extrabold text-navy-950">
                    Total Monthly Income
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    Sum of all income sources
                  </p>
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-brand-green-700">
                ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/employment-details")}
                className="flex h-12 items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 text-sm sm:text-base font-bold text-navy-950 transition-all duration-250 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  updateAssessment("income", amounts);
                  navigate("/monthly-expenses");
                }}
                className="flex h-12 items-center gap-2 rounded-xl bg-brand-green-500 px-8 text-sm sm:text-base font-bold text-white shadow-md transition-all duration-250 hover:bg-brand-green-600 hover:shadow-lg active:scale-[0.98]"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <LockIcon sx={{ fontSize: 18 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Monthly Income Overview */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm">
              <h3 className="mb-5 text-base sm:text-lg font-extrabold text-navy-950">
                Monthly Income Overview
              </h3>

              <DonutChart values={numericValues} total={total} />

              {/* Legend */}
              <div className="mt-5 space-y-3">
                {INCOME_SOURCES.map((src) => {
                  const val = numericValues[src.key];
                  const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                  return (
                    <div
                      key={src.key}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              CHART_COLORS[src.key as keyof typeof CHART_COLORS],
                          }}
                        />
                        <span className="font-semibold text-slate-700">
                          {CHART_LABELS[src.key]}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-extrabold text-navy-950">
                          ₹{val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="w-10 text-right text-xs font-bold text-slate-600">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Why Track All Income Sources? */}
            <div className="rounded-2xl border border-brand-green-200/80 bg-brand-green-50/50 p-7 shadow-xs">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700 border border-brand-green-200">
                  <TrendingUpIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-navy-950">
                  Why Track All Income Sources?
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-600">
                A complete income picture helps us assess your financial
                strength and create a smarter roadmap for your financial goals.
              </p>
            </div>

            {/* Card 3: 100% Secure */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 border border-sky-200">
                  <ShieldIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-navy-950">
                  100% Secure
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-600">
                We use bank-level encryption to protect your financial data.
                <br />
                Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>
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

