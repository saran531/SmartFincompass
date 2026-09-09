import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import FinancialSidebar from "../components/FinancialSidebar";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShieldIcon from "@mui/icons-material/Shield";
import PaidIcon from "@mui/icons-material/Paid";
import SecurityIcon from "@mui/icons-material/Security";
import SavingsIcon from "@mui/icons-material/Savings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DescriptionIcon from "@mui/icons-material/Description";
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

function GaugeChart({
  value,
  max,
  color,
  bgColor,
}: {
  value: number;
  max: number;
  color: string;
  bgColor: string;
}) {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const pct = value / max;
  const dash = pct * circumference;

  return (
    <div className="relative flex h-[90px] w-[90px] items-center justify-center">
      <svg viewBox="0 0 90 90" className="h-full w-full -rotate-90">
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function MiniLineChart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 40" className="h-10 w-20">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="5,35 20,28 35,30 50,20 65,15 75,8"
      />
      <polyline
        fill={`${color}15`}
        stroke="none"
        points="5,35 20,28 35,30 50,20 65,15 75,8 75,40 5,40"
      />
    </svg>
  );
}

function DonutChart({
  segments,
  centerLabel,
  centerValue,
}: {
  segments: { color: string; pct: number }[];
  centerLabel: string;
  centerValue: string;
}) {
  const radius = 55;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;

  const computed = segments.reduce<{ acc: number; items: { color: string; pct: number; dash: number; offset: number }[] }>(
    (curr, seg) => {
      const dash = seg.pct * circumference;
      const offset = -curr.acc * circumference;
      return {
        acc: curr.acc + seg.pct,
        items: [...curr.items, { ...seg, dash, offset }],
      };
    },
    { acc: 0, items: [] }
  ).items;

  return (
    <div className="relative flex h-[160px] w-[160px] items-center justify-center">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#eef1f6"
          strokeWidth={strokeWidth}
        />
        {computed.map((seg, i) => (
          <circle
            key={i}
            cx="80"
            cy="80"
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
        <span className="text-xs font-bold text-navy-900/80">{centerLabel}</span>
        <span className="text-sm font-extrabold text-navy-950">{centerValue}</span>
      </div>
    </div>
  );
}

function FinancialOverviewChart() {
  const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  const income = [85, 90, 95, 100, 110, 115];
  const expenses = [60, 65, 70, 75, 80, 85];
  const savings = [25, 25, 25, 25, 30, 30];

  const maxVal = 120;
  const chartW = 440;
  const chartH = 200;
  const padL = 45;
  const padB = 30;
  const padT = 10;
  const plotW = chartW - padL;
  const plotH = chartH - padT - padB;

  const toX = (i: number) => padL + (i / (months.length - 1)) * plotW;
  const toY = (v: number) => padT + plotH - (v / maxVal) * plotH;

  const makePath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-[360px]">
        {/* Grid lines */}
        {[0, 30, 60, 90, 120].map((v) => (
          <g key={v}>
            <line
              x1={padL}
              y1={toY(v)}
              x2={chartW}
              y2={toY(v)}
              stroke="#cbd5e1"
              strokeWidth="0.75"
            />
            <text
              x={padL - 6}
              y={toY(v) + 4}
              textAnchor="end"
              className="fill-navy-950 font-bold"
              fontSize="11"
            >
              {v === 0 ? "₹ 0" : v === 30 ? "₹ 50K" : v === 60 ? "₹ 1L" : v === 90 ? "₹ 1.5L" : "₹ 2L"}
            </text>
          </g>
        ))}
        {/* X axis labels */}
        {months.map((m, i) => (
          <text
            key={m}
            x={toX(i)}
            y={chartH - 5}
            textAnchor="middle"
            className="fill-navy-950 font-bold"
            fontSize="11"
          >
            {m}
          </text>
        ))}
        {/* Lines */}
        <polyline
          fill="none"
          stroke="#22b573"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={makePath(income)}
        />
        <polyline
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={makePath(expenses)}
        />
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={makePath(savings)}
        />
        {/* Data points */}
        {income.map((v, i) => (
          <circle key={`inc-${i}`} cx={toX(i)} cy={toY(v)} r="3.5" fill="#22b573" stroke="white" strokeWidth="1.5" />
        ))}
        {expenses.map((v, i) => (
          <circle key={`exp-${i}`} cx={toX(i)} cy={toY(v)} r="3.5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
        ))}
        {savings.map((v, i) => (
          <circle key={`sav-${i}`} cx={toX(i)} cy={toY(v)} r="3.5" fill="#3b82f6" stroke="white" strokeWidth="1.5" />
        ))}
      </svg>
    </div>
  );
}

export default function FinancialDashboard() {
  const navigate = useNavigate();
  const { isAssessmentCompleted, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("6M");

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
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="rounded-lg border border-navy-950/15 px-4 py-2 text-sm font-semibold text-navy-950 transition-all duration-250 hover:border-red-400 hover:text-red-500"
            >
              Logout
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

      <div className="mx-auto flex max-w-7xl px-6 py-8 lg:px-10">
        {/* ─── SIDEBAR ─── */}
        <FinancialSidebar />

        <main className="min-w-0 flex-1">
          {/* ─── Page Title ─── */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
                Financial Dashboard
              </h1>
              <p className="mt-2 text-[15px] font-medium text-slate-700">
                {isAssessmentCompleted
                  ? "Here's an overview of your financial health and readiness."
                  : "Complete your assessment to unlock your personalized financial health score, insights, recommendations, and roadmap."}
              </p>
            </div>
            {!isAssessmentCompleted && (
              <div className="relative self-start">
                <button
                  type="button"
                  onClick={() => setDateOpen((v) => !v)}
                  className="flex h-10 items-center gap-2 rounded-xl border border-navy-950/15 bg-white px-4 text-sm font-bold text-navy-950 transition-all hover:border-brand-green-500 hover:text-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 cursor-pointer"
                >
                  <CalendarTodayIcon sx={{ fontSize: 16 }} className="text-navy-900/60" />
                  May 08, 2025
                  <KeyboardArrowDownIcon sx={{ fontSize: 16 }} className="text-navy-900/60" />
                </button>
              </div>
            )}
            {isAssessmentCompleted && (
              <div className="relative self-start">
                <button
                  type="button"
                  onClick={() => setDateOpen((v) => !v)}
                  className="flex h-10 items-center gap-2 rounded-xl border border-navy-950/15 bg-white px-4 text-sm font-bold text-navy-950 transition-all hover:border-brand-green-500 hover:text-brand-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 cursor-pointer"
                >
                  <CalendarTodayIcon sx={{ fontSize: 16 }} className="text-navy-900/60" />
                  May 08, 2025
                  <KeyboardArrowDownIcon sx={{ fontSize: 16 }} className="text-navy-900/60" />
                </button>
                {dateOpen && (
                  <div className="absolute right-0 top-12 z-10 w-48 rounded-xl border border-navy-950/10 bg-white py-2 shadow-lg">
                    {["May 08, 2025", "Apr 08, 2025", "Mar 08, 2025"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDateOpen(false)}
                        className="w-full px-4 py-2 text-left text-sm font-semibold text-navy-950 hover:bg-brand-green-50 hover:text-brand-green-700 transition-colors cursor-pointer"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── EMPTY STATE ─── */}
          {!isAssessmentCompleted && (
            <div className="rounded-2xl border border-navy-950/5 bg-white p-10 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
              <div className="mx-auto max-w-2xl text-center">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-green-50">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#22b573" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </span>
                <h2 className="mt-6 text-2xl font-extrabold text-navy-950">
                  Start Your Financial Assessment
                </h2>
                <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-700">
                  Complete your assessment to unlock your personalized financial health
                  score, insights, recommendations, and roadmap.
                </p>
                <button
                  onClick={() => navigate("/personal-information")}
                  className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-brand-green-500 px-10 py-4 text-lg font-bold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                >
                  Start Assessment
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          )}

        {/* ─── POPULATED DASHBOARD ─── */}
        {isAssessmentCompleted && (
          <>
            {/* ─── Metric Cards (Row 1) ─── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Financial Health Score */}
          <div className="card-hover-effect rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Financial Health Score</p>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-navy-900/50 hover:text-navy-950 transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative">
                <GaugeChart value={78} max={100} color="#22b573" bgColor="#eef1f6" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-navy-950">78</span>
                  <span className="text-xs font-bold text-navy-900/70">/ 100</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUpIcon sx={{ fontSize: 14 }} className="text-brand-green-500" />
                <span className="text-sm font-bold text-brand-green-600">Good</span>
              </div>
            </div>
          </div>

          {/* Card 2: Investment Readiness */}
          <div className="card-hover-effect rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Investment Readiness</p>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-navy-900/50 hover:text-navy-950 transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative">
                <GaugeChart value={72} max={100} color="#8b5cf6" bgColor="#eef1f6" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-navy-950">72</span>
                  <span className="text-xs font-bold text-navy-900/70">/ 100</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUpIcon sx={{ fontSize: 14 }} className="text-purple-500" />
                <span className="text-sm font-bold text-purple-600">Moderate</span>
              </div>
            </div>
          </div>

          {/* Card 3: Emergency Fund */}
          <div className="card-hover-effect rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Emergency Fund</p>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-navy-900/50 hover:text-navy-950 transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-50">
                <ShieldIcon sx={{ fontSize: 28 }} className="text-brand-green-500" />
              </span>
              <p className="mt-3 text-xl font-extrabold text-navy-950">₹ 1,25,000</p>
              <p className="mt-1 text-xs font-bold text-brand-green-700">3.4 Months Covered</p>
            </div>
          </div>

          {/* Card 4: Net Worth */}
          <div className="card-hover-effect rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Net Worth</p>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-navy-900/50 hover:text-navy-950 transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-col items-center">
              <MiniLineChart color="#3b82f6" />
              <p className="mt-2 text-xl font-extrabold text-navy-950">₹ 28,75,000</p>
              <div className="mt-1 flex items-center gap-1">
                <TrendingUpIcon sx={{ fontSize: 14 }} className="text-brand-green-500" />
                <span className="text-xs font-bold text-brand-green-700">12.6% vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Metric Cards (Row 2) ─── */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 5: Debt Ratio */}
          <div className="card-hover-effect rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Debt Ratio</p>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-navy-900/50 hover:text-navy-950 transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative">
                <GaugeChart value={32} max={100} color="#22b573" bgColor="#eef1f6" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-navy-950">32%</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUpIcon sx={{ fontSize: 14 }} className="text-brand-green-500" />
                <span className="text-sm font-bold text-brand-green-600">Healthy</span>
              </div>
            </div>
          </div>

          {/* Card 6: Cash Flow */}
          <div className="card-hover-effect rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Cash Flow</p>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-navy-900/50 hover:text-navy-950 transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
                <PaidIcon sx={{ fontSize: 28 }} className="text-amber-500" />
              </span>
              <p className="mt-3 text-xl font-extrabold text-navy-950">₹ 45,000</p>
              <p className="mt-1 text-xs font-semibold text-slate-700">Surplus / Month</p>
            </div>
          </div>

          {/* Card 7: Insurance Gap */}
          <div className="card-hover-effect rounded-2xl border border-red-200/60 bg-red-50/30 p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Insurance Gap</p>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-navy-900/50 hover:text-navy-950 transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                <SecurityIcon sx={{ fontSize: 28 }} className="text-red-500" />
              </span>
              <p className="mt-3 text-xl font-extrabold text-navy-950">₹ 12,00,000</p>
              <p className="mt-1 text-xs font-bold text-red-600">High Priority</p>
            </div>
          </div>

          {/* Card 8: Savings Capacity */}
          <div className="card-hover-effect rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Savings Capacity</p>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} className="text-navy-900/50 hover:text-navy-950 transition-colors cursor-pointer" />
            </div>
            <div className="flex flex-col items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50">
                <SavingsIcon sx={{ fontSize: 28 }} className="text-pink-500" />
              </span>
              <p className="mt-3 text-xl font-extrabold text-navy-950">₹ 22,000</p>
              <p className="mt-1 text-xs font-semibold text-slate-700">24% of Income</p>
            </div>
          </div>
        </div>

        {/* ─── Financial Overview + Asset Allocation ─── */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* Financial Overview */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-base font-bold text-navy-950">Financial Overview</p>
              <div className="flex gap-2">
                {["6M", "1Y", "All"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setTimeFilter(f)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      timeFilter === f
                        ? "bg-brand-green-500 text-white shadow-sm"
                        : "bg-slate-100 text-navy-950 hover:bg-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3 flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-green-500" />
                <span className="text-xs font-bold text-navy-950">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-xs font-bold text-navy-950">Expenses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <span className="text-xs font-bold text-navy-950">Savings</span>
              </div>
            </div>
            <FinancialOverviewChart />
          </div>

          {/* Asset Allocation */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <p className="mb-5 text-base font-bold text-navy-950">Asset Allocation</p>
            <div className="flex items-center gap-6">
              <DonutChart
                segments={[
                  { color: "#3b82f6", pct: 0.4 },
                  { color: "#8b5cf6", pct: 0.25 },
                  { color: "#22b573", pct: 0.15 },
                  { color: "#f59e0b", pct: 0.1 },
                  { color: "#f97316", pct: 0.1 },
                ]}
                centerLabel="Total Assets"
                centerValue="₹ 28,75,000"
              />
              <div className="flex-1 space-y-3">
                {[
                  { label: "Mutual Funds", pct: "40%", color: "bg-blue-500" },
                  { label: "Stocks", pct: "25%", color: "bg-purple-500" },
                  { label: "Fixed Deposits", pct: "15%", color: "bg-brand-green-500" },
                  { label: "Gold", pct: "10%", color: "bg-amber-500" },
                  { label: "Cash", pct: "10%", color: "bg-orange-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <span className="text-xs font-semibold text-navy-950">{item.label}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-navy-950">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── AI Insights + Recommended Actions ─── */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* AI Insights */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AutoAwesomeIcon sx={{ fontSize: 18 }} className="text-brand-green-500" />
                <p className="text-base font-bold text-navy-950">AI Insights</p>
              </div>
              <button type="button" className="text-xs font-bold text-brand-green-600 transition-colors hover:text-brand-green-700 hover:underline cursor-pointer">
                View All Insights →
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: <SavingsIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-brand-green-50 text-brand-green-600",
                  text: "Your savings rate is excellent! You are saving 24% of your income, which is above the recommended 20%.",
                },
                {
                  icon: <WarningAmberIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-amber-50 text-amber-600",
                  text: "Your emergency fund can be improved. Aim for at least 6 months of expenses.",
                },
                {
                  icon: <HealthAndSafetyIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-red-50 text-red-500",
                  text: "You have an insurance gap of ₹ 12,00,000. Consider increasing your coverage.",
                },
              ].map((insight, i) => (
                <div
                  key={i}
                  className={`group flex items-start gap-3 rounded-xl p-1.5 transition-colors hover:bg-slate-50 ${
                    i < 2 ? "border-b border-slate-100 pb-4" : ""
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${insight.iconColor}`}
                  >
                    {insight.icon}
                  </span>
                  <p className="text-sm sm:text-[15px] font-medium leading-relaxed text-navy-950">
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-base font-bold text-navy-950">Recommended Actions</p>
              <button type="button" className="text-xs font-bold text-brand-green-600 transition-colors hover:text-brand-green-700 hover:underline cursor-pointer">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: <PaidIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-amber-50 text-amber-600",
                  title: "Build Emergency Fund",
                  desc: "Increase your emergency fund to 6 months of expenses.",
                  btn: "Take Action",
                },
                {
                  icon: <ShieldIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-red-50 text-red-500",
                  title: "Increase Insurance Coverage",
                  desc: "Fill your insurance gap and protect your financial future.",
                  btn: "Take Action",
                },
                {
                  icon: <ShowChartIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-brand-green-50 text-brand-green-600",
                  title: "Invest for Long Term Goals",
                  desc: "Start a SIP of ₹ 10,000/month to build wealth over time.",
                  btn: "Explore",
                },
                {
                  icon: <DescriptionIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-sky-50 text-sky-600",
                  title: "Reduce Debt",
                  desc: "Consider prepaying high-interest loans to reduce your debt burden.",
                  btn: "Review",
                },
              ].map((action, i) => (
                <div
                  key={i}
                  className={`group flex items-start gap-3 rounded-xl p-1.5 transition-colors hover:bg-slate-50 ${
                    i < 3 ? "border-b border-slate-100 pb-4" : ""
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${action.iconColor}`}
                  >
                    {action.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-navy-950">{action.title}</p>
                    <p className="mt-0.5 text-xs sm:text-sm font-medium leading-relaxed text-slate-700">{action.desc}</p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg border-2 border-brand-green-500 bg-white px-3.5 py-1.5 text-xs font-bold text-brand-green-700 transition-all duration-200 hover:bg-brand-green-500 hover:text-white hover:shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 cursor-pointer"
                  >
                    {action.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Financial Summary ─── */}
        <div className="mt-6 rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-base font-bold text-navy-950">Financial Summary</p>
            <button type="button" onClick={() => navigate("/ai-financial-report")} className="text-xs sm:text-sm font-bold text-brand-green-600 transition-colors hover:text-brand-green-700 hover:underline cursor-pointer">
              View Full Report →
            </button>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-3">
              {[
                { label: "Total Income", value: "₹ 1,85,000 / month", color: "text-navy-950" },
                { label: "Total Expenses", value: "₹ 1,40,000 / month", color: "text-red-600 font-extrabold" },
                { label: "Total Savings", value: "₹ 45,000 / month", color: "text-brand-green-700 font-extrabold" },
                { label: "Total Assets", value: "₹ 28,75,000", color: "text-navy-950 font-extrabold" },
                { label: "Total Liabilities", value: "₹ 9,20,000", color: "text-navy-950 font-extrabold" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-sm sm:text-base font-bold text-navy-950">{row.label}</span>
                  <span className={`text-sm sm:text-base font-bold ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <DonutChart
                segments={[
                  { color: "#22b573", pct: 0.757 },
                  { color: "#ef4444", pct: 0.243 },
                ]}
                centerLabel=""
                centerValue=""
              />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-green-500" />
                  <span className="text-xs sm:text-sm font-bold text-navy-950">Assets</span>
                  <span className="text-xs sm:text-sm font-extrabold text-brand-green-700">75.7%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="text-xs sm:text-sm font-bold text-navy-950">Liabilities</span>
                  <span className="text-xs sm:text-sm font-extrabold text-red-600">24.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
        </main>
      </div>

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
                  <span className="block -mt-1 text-brand-green-400">Compass</span>
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
              <a href="#" className="transition-colors duration-200 hover:text-brand-green-400">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors duration-200 hover:text-brand-green-400">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
