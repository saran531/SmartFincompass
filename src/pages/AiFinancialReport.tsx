import { useState } from "react";
import { Link } from "react-router-dom";
import FinancialSidebar from "../components/FinancialSidebar";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShieldIcon from "@mui/icons-material/Shield";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SavingsIcon from "@mui/icons-material/Savings";
import PaidIcon from "@mui/icons-material/Paid";
import SecurityIcon from "@mui/icons-material/Security";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FlagIcon from "@mui/icons-material/Flag";
import EventIcon from "@mui/icons-material/Event";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

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

function GaugeChart({
  value,
  max,
  color,
  bgColor,
  size = 140,
}: {
  value: number;
  max: number;
  color: string;
  bgColor: string;
  size?: number;
}) {
  const radius = (size - 20) / 2;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const pct = value / max;
  const dash = pct * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
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
        <span className="text-xs font-semibold text-navy-900/60">{centerLabel}</span>
        <span className="text-sm font-bold text-navy-950">{centerValue}</span>
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
        {[0, 30, 60, 90, 120].map((v) => (
          <g key={v}>
            <line
              x1={padL}
              y1={toY(v)}
              x2={chartW}
              y2={toY(v)}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
            <text
              x={padL - 5}
              y={toY(v) + 4}
              textAnchor="end"
              className="fill-navy-900/70 font-semibold"
              fontSize="11"
            >
              {v === 0 ? "₹ 0" : v === 30 ? "₹ 50K" : v === 60 ? "₹ 1L" : v === 90 ? "₹ 1.5L" : "₹ 2L"}
            </text>
          </g>
        ))}
        {months.map((m, i) => (
          <text
            key={m}
            x={toX(i)}
            y={chartH - 5}
            textAnchor="middle"
            className="fill-navy-900/70 font-semibold"
            fontSize="11"
          >
            {m}
          </text>
        ))}
        <polyline fill="none" stroke="#22b573" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={makePath(income)} />
        <polyline fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={makePath(expenses)} />
        <polyline fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={makePath(savings)} />
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

export default function AiFinancialReport() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                VG
              </span>
              <KeyboardArrowDownIcon sx={{ fontSize: 18 }} className="text-navy-900/50" />
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
                <a key={link.label} href={link.href} className="text-sm font-medium text-navy-900/80" onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <button className="relative grid h-10 w-10 place-items-center rounded-full text-navy-900/60">
                <NotificationsNoneIcon sx={{ fontSize: 22 }} />
              </button>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">VG</span>
            </div>
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-7xl px-6 py-8 lg:px-10">
        {/* ─── SIDEBAR ─── */}
        <FinancialSidebar />

        <main className="min-w-0 flex-1">
        {/* ─── Report Header ─── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Personalized Financial Readiness Report
            </h1>
            <p className="mt-2 text-[15px] text-navy-900/55">
              Your AI-powered financial analysis and personalized roadmap to financial freedom.
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <button className="flex h-10 items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-4 text-sm font-semibold text-brand-green-600 transition-all hover:bg-brand-green-50">
              <DownloadIcon sx={{ fontSize: 18 }} />
              Download PDF
            </button>
            <span className="text-xs text-navy-900/45">Generated on: May 08, 2025</span>
          </div>
        </div>

        {/* ─── Overall Financial Readiness + Metrics ─── */}
        <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)] sm:p-8">
          <p className="mb-6 text-base font-bold text-navy-950">Overall Financial Readiness Score</p>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left: Score */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start lg:w-[340px] lg:shrink-0">
              <div className="relative">
                <GaugeChart value={78} max={100} color="#22b573" bgColor="#eef1f6" size={150} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-navy-950">78</span>
                  <span className="text-xs text-navy-900/45">/ 100</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-semibold text-navy-950">You are in a good financial position.</p>
                <p className="mt-1 text-xs leading-relaxed text-navy-900/55">
                  Keep going! With a few improvements, you can achieve financial freedom faster.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-green-50 px-3 py-1.5">
                  <TrendingUpIcon sx={{ fontSize: 14 }} className="text-brand-green-500" />
                  <span className="text-xs font-semibold text-brand-green-600">+12 points</span>
                  <span className="text-[10px] text-navy-900/45">vs last assessment</span>
                </div>
              </div>
            </div>

            {/* Right: Metrics Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: <AutoGraphIcon sx={{ fontSize: 18 }} />, iconColor: "bg-purple-50 text-purple-600", label: "Investment Readiness", value: "72 / 100", status: "Moderate", statusColor: "text-purple-600" },
                  { icon: <ShieldIcon sx={{ fontSize: 18 }} />, iconColor: "bg-brand-green-50 text-brand-green-600", label: "Emergency Fund", value: "3.4 Months", status: "Good", statusColor: "text-brand-green-600" },
                  { icon: <CreditCardIcon sx={{ fontSize: 18 }} />, iconColor: "bg-orange-50 text-orange-600", label: "Debt Ratio", value: "32%", status: "Healthy", statusColor: "text-brand-green-600" },
                  { icon: <SavingsIcon sx={{ fontSize: 18 }} />, iconColor: "bg-brand-green-50 text-brand-green-600", label: "Savings Capacity", value: "24%", status: "of Income", statusColor: "text-navy-900/55" },
                  { icon: <AccountBalanceWalletIcon sx={{ fontSize: 18 }} />, iconColor: "bg-sky-50 text-sky-600", label: "Net Worth", value: "₹ 28,75,000", status: "+12.6%", statusColor: "text-brand-green-600" },
                  { icon: <PaidIcon sx={{ fontSize: 18 }} />, iconColor: "bg-amber-50 text-amber-600", label: "Cash Flow", value: "₹ 45,000", status: "Surplus / Month", statusColor: "text-navy-900/55" },
                  { icon: <SecurityIcon sx={{ fontSize: 18 }} />, iconColor: "bg-red-50 text-red-500", label: "Insurance Gap", value: "₹ 12,00,000", status: "High", statusColor: "text-red-500" },
                  { icon: <HealthAndSafetyIcon sx={{ fontSize: 18 }} />, iconColor: "bg-brand-green-50 text-brand-green-600", label: "Financial Health", value: "Good", status: "Stable", statusColor: "text-navy-900/55" },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl border border-navy-950/5 bg-slate-50/50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${m.iconColor}`}>
                        {m.icon}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-navy-900/70">{m.label}</p>
                    <p className="mt-1 text-lg font-bold text-navy-950">{m.value}</p>
                    <p className={`text-xs font-semibold ${m.statusColor}`}>{m.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Financial Overview + Investment Allocation ─── */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
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
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      timeFilter === f
                        ? "bg-brand-green-500 text-white"
                        : "bg-navy-950/5 text-navy-900/55 hover:bg-navy-950/10"
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
                <span className="text-xs text-navy-900/55">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-xs text-navy-900/55">Expenses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <span className="text-xs text-navy-900/55">Savings</span>
              </div>
            </div>
            <FinancialOverviewChart />
          </div>

          {/* Investment Allocation */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <p className="mb-5 text-base font-bold text-navy-950">Investment Allocation</p>
            <div className="flex items-center gap-6">
              <DonutChart
                segments={[
                  { color: "#3b82f6", pct: 0.4 },
                  { color: "#8b5cf6", pct: 0.25 },
                  { color: "#22b573", pct: 0.15 },
                  { color: "#f59e0b", pct: 0.1 },
                  { color: "#f97316", pct: 0.1 },
                ]}
                centerLabel="Total Investments"
                centerValue="₹ 18,50,000"
              />
              <div className="flex-1 space-y-3">
                {[
                  { label: "Mutual Funds", pct: "40%", color: "bg-blue-500" },
                  { label: "Stocks", pct: "25%", color: "bg-purple-500" },
                  { label: "Fixed Deposits", pct: "15%", color: "bg-brand-green-500" },
                  { label: "Gold", pct: "10%", color: "bg-amber-500" },
                  { label: "Cash / Others", pct: "10%", color: "bg-orange-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <span className="text-xs text-navy-900/60">{item.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-navy-950">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 border-t border-navy-950/5 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-navy-900/55">Diversification Score</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-brand-green-600">Good</span>
                  <span className="text-xs text-navy-900/45">72/100</span>
                </div>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-navy-950/5">
                <div className="h-full rounded-full bg-brand-green-500" style={{ width: "72%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Strengths + Weaknesses + Recommendations ─── */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Strengths */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-600">
                <TrendingUpIcon sx={{ fontSize: 18 }} />
              </span>
              <p className="text-base font-bold text-navy-950">Strengths</p>
            </div>
            <ul className="space-y-3">
              {[
                "Good savings rate (24%)",
                "Emergency fund is on track",
                "Low debt ratio",
                "Consistent monthly surplus",
                "Insurance coverage in place",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircleIcon sx={{ fontSize: 16, mt: 0.3 }} className="shrink-0 text-brand-green-500" />
                  <span className="text-sm text-navy-900/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <WarningAmberIcon sx={{ fontSize: 18 }} />
              </span>
              <p className="text-base font-bold text-navy-950">Weaknesses</p>
            </div>
            <ul className="space-y-3">
              {[
                "Insurance gap is high",
                "Investment returns can improve",
                "Emergency fund below ideal (6 months)",
                "High allocation in low-return assets",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <WarningAmberIcon sx={{ fontSize: 16, mt: 0.3 }} className="shrink-0 text-amber-500" />
                  <span className="text-sm text-navy-900/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Recommendations */}
          <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <LightbulbIcon sx={{ fontSize: 18 }} />
              </span>
              <p className="text-base font-bold text-navy-950">Top Recommendations</p>
            </div>
            <ul className="space-y-3">
              {[
                "Increase emergency fund to 6 months",
                "Close insurance gap of ₹ 12,00,000",
                "Invest in diversified mutual funds",
                "Start a long-term SIP of ₹10,000/month",
                "Reduce high-interest debt",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <LightbulbIcon sx={{ fontSize: 16, mt: 0.3 }} className="shrink-0 text-purple-500" />
                  <span className="text-sm text-navy-900/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Recommended Investment Categories ─── */}
        <div className="mt-6 rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
          <p className="mb-5 text-base font-bold text-navy-950">Recommended Investment Categories for You</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "Equity Funds", pct: "40%", desc: "High Growth Potential", color: "bg-blue-50 text-blue-600", barColor: "bg-blue-500", icon: <ShowChartIcon sx={{ fontSize: 20 }} />, barW: "40%" },
              { name: "Debt Funds", pct: "25%", desc: "Stable Returns", color: "bg-purple-50 text-purple-600", barColor: "bg-purple-500", icon: <ShieldIcon sx={{ fontSize: 20 }} />, barW: "25%" },
              { name: "Gold / Commodities", pct: "10%", desc: "Hedge Against Inflation", color: "bg-amber-50 text-amber-600", barColor: "bg-amber-500", icon: <PieChartIcon sx={{ fontSize: 20 }} />, barW: "10%" },
              { name: "Direct Stocks", pct: "15%", desc: "Long Term Wealth", color: "bg-brand-green-50 text-brand-green-600", barColor: "bg-brand-green-500", icon: <BarChartIcon sx={{ fontSize: 20 }} />, barW: "15%" },
              { name: "Cash / Others", pct: "10%", desc: "Liquidity & Safety", color: "bg-orange-50 text-orange-600", barColor: "bg-orange-500", icon: <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />, barW: "10%" },
            ].map((cat) => (
              <div key={cat.name} className="rounded-xl border border-navy-950/5 bg-slate-50/50 p-4">
                <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${cat.color}`}>
                  {cat.icon}
                </span>
                <p className="mt-3 text-sm font-bold text-navy-950">{cat.name}</p>
                <p className="text-lg font-extrabold text-navy-950">{cat.pct}</p>
                <p className="mt-1 text-xs text-navy-900/55">{cat.desc}</p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy-950/5">
                  <div className={`h-full rounded-full ${cat.barColor}`} style={{ width: cat.barW }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Personalized Financial Roadmap ─── */}
        <div className="mt-6 rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
          <p className="mb-6 text-base font-bold text-navy-950">Your Personalized Financial Roadmap</p>
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-0 top-6 hidden h-0.5 w-full bg-navy-950/10 lg:block" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  period: "0 - 3 Months",
                  icon: <EventIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-brand-green-50 text-brand-green-600",
                  tasks: ["Build emergency fund to 3 months", "Review & optimize expenses", "Close high-interest debt"],
                },
                {
                  period: "3 - 6 Months",
                  icon: <FlagIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-brand-green-50 text-brand-green-600",
                  tasks: ["Complete 6 months emergency fund", "Increase insurance coverage", "Start SIP of ₹10,000"],
                },
                {
                  period: "6 - 12 Months",
                  icon: <ShowChartIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-purple-50 text-purple-600",
                  tasks: ["Invest in diversified mutual funds", "Review investment performance", "Improve credit score"],
                },
                {
                  period: "1 - 3 Years",
                  icon: <RocketLaunchIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-orange-50 text-orange-600",
                  tasks: ["Increase SIP to ₹15,000+", "Build long-term wealth portfolio", "Plan for major goals"],
                },
                {
                  period: "3+ Years",
                  icon: <EmojiEventsIcon sx={{ fontSize: 18 }} />,
                  iconColor: "bg-sky-50 text-sky-600",
                  tasks: ["Achieve financial independence", "Retirement planning", "Wealth protection"],
                },
              ].map((stage) => (
                <div key={stage.period} className="relative flex flex-col items-center text-center">
                  <span className={`z-10 flex h-12 w-12 items-center justify-center rounded-full ${stage.iconColor} shadow-sm`}>
                    {stage.icon}
                  </span>
                  <p className="mt-3 text-sm font-bold text-navy-950">{stage.period}</p>
                  <ul className="mt-2 space-y-1">
                    {stage.tasks.map((t) => (
                      <li key={t} className="text-xs text-navy-900/55">• {t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
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
                AI-powered financial wellness platform that helps you make smarter financial decisions.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, LinkedInIcon, TwitterIcon, InstagramIcon].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-all duration-200 hover:scale-110 hover:bg-brand-green-500 hover:text-white">
                    <Icon sx={{ fontSize: 18 }} />
                  </a>
                ))}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-bold text-white">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm transition-colors duration-200 hover:text-brand-green-400">
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
              <a href="#" className="transition-colors duration-200 hover:text-brand-green-400">Privacy Policy</a>
              <a href="#" className="transition-colors duration-200 hover:text-brand-green-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
