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
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
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
  { label: "Income Sources", completed: true },
  { label: "Expenses", completed: true },
  { label: "Assets", completed: true },
  { label: "Liabilities", active: true },
];

const LIABILITY_CATEGORIES = [
  {
    key: "homeLoan",
    label: "Home Loan",
    desc: "Outstanding amount for\nhome loan",
    icon: HomeWorkIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    chartColor: "#22b573",
  },
  {
    key: "personalLoan",
    label: "Personal Loan",
    desc: "Outstanding amount for\npersonal loan",
    icon: PersonIcon,
    color: "text-sky-500 bg-sky-50",
    chartColor: "#3b82f6",
  },
  {
    key: "vehicleLoan",
    label: "Vehicle Loan",
    desc: "Outstanding amount for\nvehicle loan",
    icon: DirectionsCarIcon,
    color: "text-violet-500 bg-violet-50",
    chartColor: "#8b5cf6",
  },
  {
    key: "creditCard",
    label: "Credit Card",
    desc: "Total outstanding credit\ncard dues",
    icon: CreditCardIcon,
    color: "text-pink-500 bg-pink-50",
    chartColor: "#ec4899",
  },
  {
    key: "educationLoan",
    label: "Education Loan",
    desc: "Outstanding amount for\neducation loan",
    icon: SchoolIcon,
    color: "text-amber-500 bg-amber-50",
    chartColor: "#f59e0b",
  },
];

const CHART_LEGEND = [
  { key: "homeLoan", label: "Home Loan", color: "#22b573" },
  { key: "personalLoan", label: "Personal Loan", color: "#3b82f6" },
  { key: "vehicleLoan", label: "Vehicle Loan", color: "#8b5cf6" },
  { key: "creditCard", label: "Credit Card", color: "#ec4899" },
  { key: "educationLoan", label: "Education Loan", color: "#f59e0b" },
  { key: "other", label: "Other Liabilities", color: "#94a3b8" },
];

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
    let accumulated = 0;
    return CHART_LEGEND.filter((c) => (values[c.key] || 0) > 0).map((item) => {
      const val = values[item.key] || 0;
      const pct = val / total;
      const dashArray = pct * circumference;
      const dashOffset = -accumulated * circumference;
      accumulated += pct;
      return {
        key: item.key,
        color: item.color,
        dashArray,
        dashOffset,
      };
    });
  }, [values, total, circumference]);

  return (
    <div className="relative mx-auto flex h-[200px] w-[200px] items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#eef1f6"
          strokeWidth={strokeWidth}
        />
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
        <span className="text-lg font-bold text-navy-950">
          ₹{total.toLocaleString("en-IN")}
        </span>
        <span className="text-center text-xs text-navy-900/50">
          Total Liabilities
        </span>
      </div>
    </div>
  );
}

export default function Liabilities() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const savedLiab = assessmentData.liabilities || {};
  const [amounts, setAmounts] = useState<Record<string, string>>({
    homeLoan: savedLiab.homeLoan || "",
    personalLoan: savedLiab.personalLoan || "",
    vehicleLoan: savedLiab.carLoan || "",
    creditCard: savedLiab.creditCard || "",
    educationLoan: savedLiab.educationLoan || "",
  });

  const numericValues = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(amounts).map(([k, v]) => [k, parseFloat(v) || 0])
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
              Liabilities
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-navy-900/55">
              Provide details of your liabilities to help us understand your
              financial obligations.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-lg rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-50 px-3 py-1 text-xs font-semibold text-brand-green-600">
                Step 6 of 6
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
                    style={{ width: `${100 / 6}%` }}
                  >
                    <span
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        step.completed
                          ? "bg-brand-green-500 text-white shadow-[0_0_12px_rgba(34,181,115,0.25)]"
                          : step.active
                          ? "bg-brand-green-500 text-white shadow-[0_0_12px_rgba(34,181,115,0.25)]"
                          : "border-2 border-navy-950/10 bg-white text-navy-900/40"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <p
                      className={`mt-2.5 text-[11px] font-semibold leading-tight ${
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
                Add Your Liabilities
              </p>
              <p className="mt-1 text-sm text-navy-900/50">
                Enter the outstanding amount for each liability
              </p>
            </div>

            {/* Liability Rows */}
            <div className="space-y-4">
              {LIABILITY_CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  className="flex items-center gap-4 rounded-xl border border-navy-950/5 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.color}`}
                  >
                    <cat.icon sx={{ fontSize: 22 }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-navy-950">
                      {cat.label}
                    </p>
                    <p className="mt-0.5 whitespace-pre-line text-xs text-navy-900/45">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="relative w-full max-w-[200px] shrink-0">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-base font-bold text-navy-950">
                      ₹
                    </span>
                    <input
                      type="text"
                      value={amounts[cat.key]}
                      onChange={(e) => handleChange(cat.key, e.target.value)}
                      inputMode="decimal"
                      placeholder="Enter amount"
                      className="h-11 w-full rounded-xl border border-navy-950/10 bg-white pl-8 pr-10 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/40 transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs sm:text-sm font-medium text-navy-900/40">
                      .00
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Outstanding Amount */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-brand-green-200 bg-brand-green-50/50 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-600">
                  <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-950">
                    Total Outstanding Amount
                  </p>
                  <p className="text-xs text-navy-900/45">
                    Sum of all your liabilities
                  </p>
                </div>
              </div>
              <span className="text-xl font-extrabold text-brand-green-600">
                ₹
                {total.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/assets")}
                className="flex h-12 items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-6 text-sm font-semibold text-brand-green-600 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  updateAssessment("liabilities", amounts);
                  navigate("/savings");
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
            {/* Card 1: Liabilities Summary */}
            <div className="rounded-2xl border border-navy-950/5 bg-brand-green-50/30 p-7">
              <h3 className="mb-2 text-base font-bold text-navy-950">
                Liabilities Summary
              </h3>
              <p className="mb-4 text-sm text-navy-900/50">
                Total Outstanding Amount
              </p>
              <p className="mb-5 text-2xl font-extrabold text-brand-green-600">
                ₹
                {total.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <DonutChart values={numericValues} total={total} />

              {/* Legend */}
              <div className="mt-5 space-y-2.5">
                {CHART_LEGEND.map((item) => {
                  const val = numericValues[item.key] || 0;
                  const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-navy-900/60">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-navy-950">
                          ₹
                          {val.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="w-10 text-right text-xs text-navy-900/40">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Why Report Liabilities? */}
            <div className="rounded-2xl border border-navy-950/5 bg-brand-green-50/30 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600">
                  <TrendingUpIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why Report Liabilities?
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-navy-900/55">
                Understanding your liabilities helps us assess your
                debt-to-income ratio and provide personalized recommendations
                for better financial health.
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
