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
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ShieldIcon from "@mui/icons-material/Shield";
import BoltIcon from "@mui/icons-material/Bolt";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
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
  { label: "Monthly Expenses", active: true },
  { label: "Review & Insights", completed: false },
];

const EXPENSE_CATEGORIES = [
  {
    key: "food",
    label: "Food",
    desc: "Groceries, dining out,\nfood delivery, etc.",
    icon: RestaurantIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    chartColor: "#22b573",
  },
  {
    key: "transport",
    label: "Transport",
    desc: "Fuel, public transport,\ntaxi, maintenance, etc.",
    icon: DirectionsCarIcon,
    color: "text-sky-500 bg-sky-50",
    chartColor: "#3b82f6",
  },
  {
    key: "emi",
    label: "EMI",
    desc: "Home loan, personal loan,\ncredit card EMI, etc.",
    icon: HomeWorkIcon,
    color: "text-violet-500 bg-violet-50",
    chartColor: "#8b5cf6",
  },
  {
    key: "insurance",
    label: "Insurance",
    desc: "Life, health, vehicle,\nor any other insurance",
    icon: ShieldIcon,
    color: "text-amber-500 bg-amber-50",
    chartColor: "#f59e0b",
  },
  {
    key: "utilities",
    label: "Utilities",
    desc: "Electricity, water, gas,\ninternet, mobile, etc.",
    icon: BoltIcon,
    color: "text-yellow-500 bg-yellow-50",
    chartColor: "#eab308",
  },
  {
    key: "medical",
    label: "Medical",
    desc: "Medicines, doctor consultation,\nhealth checkups, etc.",
    icon: LocalHospitalIcon,
    color: "text-red-500 bg-red-50",
    chartColor: "#ef4444",
  },
  {
    key: "entertainment",
    label: "Entertainment",
    desc: "Movies, OTT, gaming,\nevents, hobbies, etc.",
    icon: MovieIcon,
    color: "text-purple-500 bg-purple-50",
    chartColor: "#a855f7",
  },
  {
    key: "shopping",
    label: "Shopping",
    desc: "Clothing, accessories,\npersonal care, etc.",
    icon: ShoppingBagIcon,
    color: "text-pink-500 bg-pink-50",
    chartColor: "#ec4899",
  },
  {
    key: "other",
    label: "Other",
    desc: "Any other regular\nmonthly expenses",
    icon: MoreHorizIcon,
    color: "text-slate-400 bg-slate-50",
    chartColor: "#94a3b8",
  },
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
    return EXPENSE_CATEGORIES.filter((c) => (values[c.key] || 0) > 0).map((cat) => {
      const val = values[cat.key] || 0;
      const pct = val / total;
      const dashArray = pct * circumference;
      const dashOffset = -accumulated * circumference;
      accumulated += pct;
      return {
        key: cat.key,
        color: cat.chartColor,
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
          Total Expenses
        </span>
      </div>
    </div>
  );
}

export default function MonthlyExpenses() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const savedExp = assessmentData.expenses || {};
  const [amounts, setAmounts] = useState<Record<string, string>>({
    food: savedExp.food || "",
    transport: savedExp.transport || "",
    emi: savedExp.emi || savedExp.housing || "",
    insurance: savedExp.insurance || "",
    utilities: savedExp.utilities || "",
    medical: savedExp.medical || savedExp.healthcare || "",
    entertainment: savedExp.entertainment || "",
    shopping: savedExp.shopping || "",
    other: savedExp.other || "",
  });

  const numericValues = useMemo(
    () =>
      Object.fromEntries(
        EXPENSE_CATEGORIES.map((cat) => [cat.key, parseFloat(amounts[cat.key] || "0") || 0])
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
              Monthly Expenses
            </h1>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-700">
              Add your average monthly expenses to help us understand your
              spending pattern.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-bold text-brand-green-700">
                Step 4 of 12
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(100%-80px)] bg-slate-200" />
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(75%-30px)] bg-brand-green-500" />
              <div className="flex items-start justify-between">
                {PROGRESS_STEPS.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center text-center"
                    style={{ width: "20%" }}
                  >
                    <span
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        step.completed
                          ? "bg-brand-green-500 text-white shadow-[0_0_12px_rgba(34,181,115,0.25)]"
                          : step.active
                          ? "bg-brand-green-500 text-white shadow-[0_0_12px_rgba(34,181,115,0.25)]"
                          : "border-2 border-slate-300 bg-white text-slate-600"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <p
                      className={`mt-2.5 text-[11px] font-bold leading-tight ${
                        step.active
                          ? "text-brand-green-700"
                          : step.completed
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
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-8">
            <div className="mb-6">
              <p className="text-base font-bold text-navy-950">
                Add Your Monthly Expenses
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Enter your average monthly spending across all categories
              </p>
            </div>

            {/* Expense Rows */}
            <div className="space-y-4">
              {EXPENSE_CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  className="flex items-center gap-4 rounded-xl border border-slate-200/90 bg-white p-4 transition-colors hover:bg-slate-50/80"
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
                    <p className="mt-0.5 whitespace-pre-line text-xs font-medium text-slate-600">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="relative w-full max-w-[200px] shrink-0">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-base font-extrabold text-navy-950">
                      ₹
                    </span>
                    <input
                      type="text"
                      value={amounts[cat.key]}
                      onChange={(e) => handleChange(cat.key, e.target.value)}
                      inputMode="decimal"
                      placeholder="Enter amount"
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-8 pr-10 text-sm font-bold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs sm:text-sm font-bold text-slate-500">
                      .00
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Monthly Expenses */}
            <div className="mt-6 flex items-center justify-between rounded-xl border-2 border-brand-green-300 bg-brand-green-50/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-950">
                    Total Monthly Expenses
                  </p>
                  <p className="text-xs font-medium text-slate-700">Sum of all expenses</p>
                </div>
              </div>
              <span className="text-xl font-black text-brand-green-700">
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
                onClick={() => navigate("/income-details")}
                className="flex h-12 items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-6 text-sm font-bold text-brand-green-600 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  updateAssessment("expenses", amounts);
                  navigate("/assets");
                }}
                className="flex h-12 items-center gap-2 rounded-xl bg-brand-green-500 px-8 text-[15px] font-bold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
              <LockIcon sx={{ fontSize: 16 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Expense Summary */}
            <div className="rounded-2xl border border-brand-green-200/70 bg-brand-green-50/60 p-7">
              <h3 className="mb-2 text-base font-bold text-navy-950">
                Expense Summary
              </h3>
              <p className="mb-4 text-sm font-medium text-slate-700">
                Total Monthly Expenses
              </p>
              <p className="mb-5 text-2xl font-black text-brand-green-700">
                ₹
                {total.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <DonutChart values={numericValues} total={total} />

              {/* Legend */}
              <div className="mt-5 space-y-2.5">
                {EXPENSE_CATEGORIES.map((cat) => {
                  const val = numericValues[cat.key] || 0;
                  const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                  return (
                    <div
                      key={cat.key}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: cat.chartColor }}
                        />
                        <span className="font-medium text-slate-700">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-navy-950">
                          ₹
                          {val.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
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

            {/* Card 2: Why Track Expenses? */}
            <div className="rounded-2xl border border-brand-green-200/70 bg-brand-green-50/60 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why Track Expenses?
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Tracking expenses helps you identify spending leaks and build
                a better financial future.
              </p>
            </div>

            {/* Card 3: Spending Tip */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <TipsAndUpdatesIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Spending Tip
                </h3>
              </div>
              <p className="mb-3 text-sm font-medium text-slate-700">
                Try the 50/30/20 rule:
              </p>
              <div className="space-y-2">
                {[
                  "50% Needs",
                  "30% Wants",
                  "20% Savings & Investments",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircleIcon
                      sx={{ fontSize: 18 }}
                      className="text-brand-green-600"
                    />
                    <span className="text-sm font-bold text-navy-950">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
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
              <p className="mt-5 max-w-xs text-sm font-normal leading-relaxed text-slate-300">
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
                <p className="text-sm font-bold text-white">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-slate-300 transition-colors duration-200 hover:text-brand-green-400"
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
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
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

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-slate-400 sm:flex-row">
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
