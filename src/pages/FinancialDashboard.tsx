import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AssessmentHeader from "../components/AssessmentHeader";
import FinancialSidebar, { FinancialSidebarContent } from "../components/FinancialSidebar";
import financialFuture from "../Assets/images/FinancialFuture.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShieldIcon from "@mui/icons-material/Shield";
import PaidIcon from "@mui/icons-material/Paid";
import SecurityIcon from "@mui/icons-material/Security";
import SavingsIcon from "@mui/icons-material/Savings";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DescriptionIcon from "@mui/icons-material/Description";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PercentIcon from "@mui/icons-material/Percent";

/* ─────────── Building blocks ─────────── */
function GaugeChart({
  value,
  max,
  color,
  bgColor,
  size = 96,
}: {
  value: number;
  max: number;
  color: string;
  bgColor: string;
  size?: number;
}) {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const pct = value / max;
  const dash = pct * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ height: size, width: size }}>
      <svg viewBox="0 0 90 90" className="h-full w-full -rotate-90">
        <circle cx="45" cy="45" r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
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
    <svg viewBox="0 0 80 40" className="h-12 w-32" aria-hidden="true">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="5,35 20,28 35,30 50,20 65,15 75,8"
      />
      <polyline fill={`${color}22`} stroke="none" points="5,35 20,28 35,30 50,20 65,15 75,8 75,40 5,40" />
    </svg>
  );
}

function MiniBars({ color }: { color: string }) {
  const bars = [22, 32, 27, 40, 52];
  return (
    <svg viewBox="0 0 64 56" className="h-14 w-16" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 13 + 3}
          y={56 - h}
          width="9"
          height={h}
          rx="3.5"
          fill={color}
          opacity={0.28 + i * 0.16}
        />
      ))}
    </svg>
  );
}

function IconTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-sm ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function DonutChart({
  segments,
  centerLabel,
  centerValue,
  size = 160,
}: {
  segments: { color: string; pct: number }[];
  centerLabel: string;
  centerValue: string;
  size?: number;
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
    <div className="relative shrink-0 items-center justify-center" style={{ height: size, width: size, display: "flex" }}>
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#eef1f6" strokeWidth={strokeWidth} />
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
        <span className="text-[11px] font-bold text-navy-900/75 sm:text-xs">{centerLabel}</span>
        <span className="text-sm font-extrabold text-navy-950 sm:text-base">{centerValue}</span>
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
  const chartH = 210;
  const padL = 48;
  const padB = 30;
  const padT = 10;
  const plotW = chartW - padL;
  const plotH = chartH - padT - padB;

  const toX = (i: number) => padL + (i / (months.length - 1)) * plotW;
  const toY = (v: number) => padT + plotH - (v / maxVal) * plotH;

  const makePath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const makeArea = (data: number[]) =>
    `${makePath(data)} L${toX(data.length - 1)},${toY(0)} L${toX(0)},${toY(0)} Z`;

  const series = [
    { key: "income", data: income, color: "#22b573", grad: "fdGradIncome" },
    { key: "expenses", data: expenses, color: "#ef4444", grad: "fdGradExpenses" },
    { key: "savings", data: savings, color: "#3b82f6", grad: "fdGradSavings" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-[380px]">
        <defs>
          {series.map((s) => (
            <linearGradient key={s.grad} id={s.grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {/* Grid lines */}
        {[0, 30, 60, 90, 120].map((v) => (
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={chartW} y2={toY(v)} stroke="#e2e8f0" strokeWidth="1" />
            <text
              x={padL - 8}
              y={toY(v) + 4}
              textAnchor="end"
              className="fill-navy-900/80 font-bold"
              fontSize="12"
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
            y={chartH - 6}
            textAnchor="middle"
            className="fill-navy-900/80 font-bold"
            fontSize="12"
          >
            {m}
          </text>
        ))}
        {/* Soft gradient areas (same data) */}
        {series.map((s) => (
          <path key={`area-${s.key}`} d={makeArea(s.data)} fill={`url(#${s.grad})`} />
        ))}
        {/* Lines */}
        {series.map((s) => (
          <polyline
            key={`line-${s.key}`}
            fill="none"
            stroke={s.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={makePath(s.data)}
          />
        ))}
        {/* Data points */}
        {series.map((s) =>
          s.data.map((v, i) => (
            <circle
              key={`${s.key}-${i}`}
              cx={toX(i)}
              cy={toY(v)}
              r="4"
              fill={s.color}
              stroke="white"
              strokeWidth="1.8"
            />
          ))
        )}
      </svg>
    </div>
  );
}

export default function FinancialDashboard() {
  const navigate = useNavigate();
  const { isAssessmentCompleted } = useApp();
  const [timeFilter, setTimeFilter] = useState("6M");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[linear-gradient(165deg,#eef6ff_0%,#ffffff_42%,#f0fdf7_78%,#ecf5ff_100%)]">
      {/* ─── Soft fintech atmosphere ─── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-44 h-[440px] w-[440px] rounded-full bg-sky-300/25 blur-[120px]" />
        <div className="absolute -left-36 top-1/3 h-[380px] w-[380px] rounded-full bg-emerald-200/25 blur-[120px]" />
        <div className="absolute -bottom-56 right-0 h-[560px] w-[760px] rounded-full bg-blue-400/20 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-96 rounded-full bg-brand-green-300/15 blur-[110px]" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(13,37,73,0.045) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      </div>

      <AssessmentHeader />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:h-[calc(100vh_-_90px)]">
        {/* ─── SIDEBAR (white rounded panel) ─── */}
        <div className="hidden w-[260px] shrink-0 flex-col lg:flex lg:overflow-y-auto">
          <FinancialSidebar />
          <img
            src={financialFuture}
            alt="Financial future"
            className="mt-6 h-auto w-full max-w-full"
          />
        </div>

        {/* ─── MOBILE DRAWER ─── */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <div
              className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="absolute left-0 top-0 flex h-full w-[290px] flex-col bg-[#0D2742] p-5 shadow-2xl">
              <div className="mb-4 flex justify-end">
                <span
                  role="button"
                  aria-label="Close menu"
                  tabIndex={0}
                  className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-xl text-white transition-colors hover:bg-white/10"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <CloseIcon />
                </span>
              </div>
              <FinancialSidebarContent onNavigate={() => setMobileNavOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 lg:overflow-y-auto">
          {/* ─── Dashboard Header ─── */}
          <div className="mb-7 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-2xl border border-slate-200 bg-white text-navy-950 shadow-sm transition-all hover:bg-slate-50 lg:hidden"
            >
              <MenuIcon />
            </button>
            <h1 className="flex flex-wrap items-center gap-2 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Financial
              <span className="bg-gradient-to-r from-[#189a63] to-[#22b573] bg-clip-text text-transparent">
                Dashboard
              </span>
              <TrendingUpIcon sx={{ fontSize: 30 }} className="text-brand-green-500" />
            </h1>
          </div>

          {/* ─── EMPTY STATE ─── */}
          {!isAssessmentCompleted && (
            <div className="rounded-[24px] border border-white bg-white/90 p-10 shadow-[0_10px_40px_-20px_rgba(13,37,73,0.25)] backdrop-blur">
              <div className="mx-auto max-w-2xl text-center">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-green-50 to-sky-50 shadow-inner">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#189a63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                  className="btn-hover-effect mt-8 inline-flex cursor-pointer items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#189a63] to-[#22b573] px-10 py-4 text-lg font-bold text-white shadow-[0_14px_30px_-12px_rgba(24,154,99,0.7)] transition-all duration-250 hover:brightness-105 active:scale-[0.98]"
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
                {/* Financial Health Score */}
                <div className="card-hover-effect rounded-[20px] border border-slate-200/70 bg-white p-5 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <IconTile className="bg-brand-green-50 text-brand-green-600">
                        <FavoriteIcon sx={{ fontSize: 22 }} />
                      </IconTile>
                      <p className="text-[15px] font-bold leading-tight text-navy-950">Financial Health Score</p>
                    </div>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} className="shrink-0 text-navy-900/45 transition-colors hover:text-navy-950 cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative">
                      <GaugeChart value={78} max={100} color="#22b573" bgColor="#eef1f6" size={104} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-extrabold text-navy-950">78</span>
                        <span className="text-xs font-bold text-navy-900/70">/ 100</span>
                      </div>
                    </div>
                    <MiniBars color="#22b573" />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <TrendingUpIcon sx={{ fontSize: 16 }} className="text-brand-green-500" />
                    <span className="text-sm font-bold text-brand-green-600">Good</span>
                  </div>
                </div>

                {/* Investment Readiness */}
                <div className="card-hover-effect rounded-[20px] border border-slate-200/70 bg-white p-5 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <IconTile className="bg-purple-50 text-purple-600">
                        <BarChartIcon sx={{ fontSize: 22 }} />
                      </IconTile>
                      <p className="text-[15px] font-bold leading-tight text-navy-950">Investment Readiness</p>
                    </div>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} className="shrink-0 text-navy-900/45 transition-colors hover:text-navy-950 cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative">
                      <GaugeChart value={72} max={100} color="#8b5cf6" bgColor="#eef1f6" size={104} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-extrabold text-navy-950">72</span>
                        <span className="text-xs font-bold text-navy-900/70">/ 100</span>
                      </div>
                    </div>
                    <MiniBars color="#8b5cf6" />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <TrendingUpIcon sx={{ fontSize: 16 }} className="text-purple-500" />
                    <span className="text-sm font-bold text-purple-600">Moderate</span>
                  </div>
                </div>

                {/* Emergency Fund */}
                <div className="card-hover-effect relative overflow-hidden rounded-[20px] border border-slate-200/70 bg-white p-5 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand-green-100/80 blur-2xl" />
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <IconTile className="bg-brand-green-50 text-brand-green-600">
                        <ShieldIcon sx={{ fontSize: 22 }} />
                      </IconTile>
                      <p className="text-[15px] font-bold leading-tight text-navy-950">Emergency Fund</p>
                    </div>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} className="shrink-0 text-navy-900/45 transition-colors hover:text-navy-950 cursor-pointer" />
                  </div>
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#22b573] to-[#0f8f5b] shadow-[0_12px_24px_-10px_rgba(15,143,91,0.7)] ring-4 ring-brand-green-50">
                      <ShieldIcon sx={{ fontSize: 32 }} className="text-white" />
                    </span>
                    <p className="mt-3 text-2xl font-extrabold text-navy-950">₹ 1,25,000</p>
                    <p className="mt-1 text-[13px] font-bold text-brand-green-700">3.4 Months Covered</p>
                  </div>
                </div>

                {/* Net Worth */}
                <div className="card-hover-effect relative overflow-hidden rounded-[20px] border border-slate-200/70 bg-white p-5 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-sky-100 blur-2xl" />
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <IconTile className="bg-sky-50 text-sky-600">
                        <TrendingUpIcon sx={{ fontSize: 22 }} />
                      </IconTile>
                      <p className="text-[15px] font-bold leading-tight text-navy-950">Net Worth</p>
                    </div>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} className="shrink-0 text-navy-900/45 transition-colors hover:text-navy-950 cursor-pointer" />
                  </div>
                  <div className="relative flex flex-col items-center">
                    <MiniLineChart color="#22b573" />
                    <p className="mt-2 text-2xl font-extrabold text-navy-950">₹ 28,75,000</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <TrendingUpIcon sx={{ fontSize: 15 }} className="text-brand-green-500" />
                      <span className="text-[13px] font-bold text-brand-green-700">12.6% vs last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Metric Cards (Row 2) ─── */}
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Debt Ratio */}
                <div className="card-hover-effect rounded-[20px] border border-slate-200/70 bg-white p-5 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <IconTile className="bg-blue-50 text-blue-600">
                        <DescriptionIcon sx={{ fontSize: 22 }} />
                      </IconTile>
                      <p className="text-[15px] font-bold leading-tight text-navy-950">Debt Ratio</p>
                    </div>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} className="shrink-0 text-navy-900/45 transition-colors hover:text-navy-950 cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative">
                      <GaugeChart value={32} max={100} color="#22b573" bgColor="#eef1f6" size={104} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-extrabold text-navy-950">32%</span>
                      </div>
                    </div>
                    <MiniBars color="#3b82f6" />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <TrendingUpIcon sx={{ fontSize: 16 }} className="text-brand-green-500" />
                    <span className="text-sm font-bold text-brand-green-600">Healthy</span>
                  </div>
                </div>

                {/* Cash Flow */}
                <div className="card-hover-effect relative overflow-hidden rounded-[20px] border border-slate-200/70 bg-white p-5 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-amber-100 blur-2xl" />
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <IconTile className="bg-amber-50 text-amber-600">
                        <PaidIcon sx={{ fontSize: 22 }} />
                      </IconTile>
                      <p className="text-[15px] font-bold leading-tight text-navy-950">Cash Flow</p>
                    </div>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} className="shrink-0 text-navy-900/45 transition-colors hover:text-navy-950 cursor-pointer" />
                  </div>
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_12px_24px_-10px_rgba(249,115,22,0.65)] ring-4 ring-amber-50">
                      <PaidIcon sx={{ fontSize: 32 }} className="text-white" />
                    </span>
                    <p className="mt-3 text-2xl font-extrabold text-navy-950">₹ 45,000</p>
                    <p className="mt-1 text-[13px] font-semibold text-slate-700">Surplus / Month</p>
                  </div>
                </div>

                {/* Insurance Gap */}
                <div className="card-hover-effect relative overflow-hidden rounded-[20px] border border-red-200/70 bg-gradient-to-br from-white to-red-50/70 p-5 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-red-100 blur-2xl" />
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <IconTile className="bg-red-100 text-red-500">
                        <SecurityIcon sx={{ fontSize: 22 }} />
                      </IconTile>
                      <p className="text-[15px] font-bold leading-tight text-navy-950">Insurance Gap</p>
                    </div>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} className="shrink-0 text-navy-900/45 transition-colors hover:text-navy-950 cursor-pointer" />
                  </div>
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[0_12px_24px_-10px_rgba(239,68,68,0.65)] ring-4 ring-red-50">
                      <SecurityIcon sx={{ fontSize: 32 }} className="text-white" />
                    </span>
                    <p className="mt-3 text-2xl font-extrabold text-navy-950">₹ 12,00,000</p>
                    <p className="mt-1 text-[13px] font-bold text-red-600">High Priority</p>
                  </div>
                </div>

                {/* Savings Capacity */}
                <div className="card-hover-effect relative overflow-hidden rounded-[20px] border border-slate-200/70 bg-white p-5 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-pink-100 blur-2xl" />
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <IconTile className="bg-pink-50 text-pink-500">
                        <SavingsIcon sx={{ fontSize: 22 }} />
                      </IconTile>
                      <p className="text-[15px] font-bold leading-tight text-navy-950">Savings Capacity</p>
                    </div>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} className="shrink-0 text-navy-900/45 transition-colors hover:text-navy-950 cursor-pointer" />
                  </div>
                  <div className="relative flex flex-col items-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 shadow-[0_12px_24px_-10px_rgba(236,72,153,0.6)] ring-4 ring-pink-50">
                      <SavingsIcon sx={{ fontSize: 32 }} className="text-white" />
                    </span>
                    <p className="mt-3 text-2xl font-extrabold text-navy-950">₹ 22,000</p>
                    <p className="mt-1 text-[13px] font-semibold text-slate-700">24% of Income</p>
                  </div>
                </div>
              </div>

              {/* ─── Financial Overview + Asset Allocation ─── */}
              <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
                {/* Financial Overview */}
                <div className="card-hover-effect rounded-[22px] border border-slate-200/70 bg-white p-6 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <IconTile className="h-10 w-10 bg-blue-50 text-blue-600">
                        <BarChartIcon sx={{ fontSize: 20 }} />
                      </IconTile>
                      <p className="text-lg font-extrabold text-navy-950">Financial Overview</p>
                    </div>
                    <div className="flex gap-2">
                      {["6M", "1Y", "All"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setTimeFilter(f)}
                          className={`cursor-pointer rounded-xl px-3.5 py-1.5 text-[13px] font-bold transition-all ${
                            timeFilter === f
                              ? "bg-gradient-to-r from-[#189a63] to-[#22b573] text-white shadow-[0_8px_16px_-8px_rgba(24,154,99,0.8)]"
                              : "bg-slate-100 text-navy-950 hover:bg-slate-200"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 flex items-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-brand-green-500" />
                      <span className="text-[13px] font-bold text-navy-950">Income</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-[13px] font-bold text-navy-950">Expenses</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-[13px] font-bold text-navy-950">Savings</span>
                    </div>
                  </div>
                  <FinancialOverviewChart />
                </div>

                {/* Asset Allocation */}
                <div className="card-hover-effect rounded-[22px] border border-slate-200/70 bg-white p-6 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div className="mb-5 flex items-center gap-3">
                    <IconTile className="h-10 w-10 bg-amber-50 text-amber-500">
                      <TrackChangesIcon sx={{ fontSize: 20 }} />
                    </IconTile>
                    <p className="text-lg font-extrabold text-navy-950">Asset Allocation</p>
                  </div>
                  <div className="flex flex-col items-center gap-6 sm:flex-row">
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
                      size={184}
                    />
                    <div className="w-full flex-1 space-y-3">
                      {[
                        { label: "Mutual Funds", pct: "40%", color: "bg-blue-500" },
                        { label: "Stocks", pct: "25%", color: "bg-purple-500" },
                        { label: "Fixed Deposits", pct: "15%", color: "bg-brand-green-500" },
                        { label: "Gold", pct: "10%", color: "bg-amber-500" },
                        { label: "Cash", pct: "10%", color: "bg-orange-500" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span className={`h-5 w-5 shrink-0 rounded-md ${item.color}`} />
                            <span className="truncate text-[13px] font-semibold text-navy-950">{item.label}</span>
                          </div>
                          <span className="text-sm font-extrabold text-navy-950">{item.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── AI Insights + Recommended Actions ─── */}
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* AI Insights */}
                <div className="card-hover-effect rounded-[22px] border border-slate-200/70 bg-white p-6 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <IconTile className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-[0_8px_18px_-8px_rgba(124,58,237,0.7)]">
                        <AutoAwesomeIcon sx={{ fontSize: 20 }} />
                      </IconTile>
                      <p className="text-lg font-extrabold text-navy-950">AI Insights</p>
                    </div>
                    <button type="button" className="cursor-pointer whitespace-nowrap text-[13px] font-bold text-brand-green-600 transition-colors hover:text-brand-green-700 hover:underline">
                      View All Insights →
                    </button>
                  </div>
                  <div className="space-y-3.5">
                    {[
                      {
                        icon: <SavingsIcon sx={{ fontSize: 20 }} />,
                        row: "bg-emerald-50/90",
                        chip: "bg-white text-brand-green-600 shadow-sm",
                        text: "Your savings rate is excellent! You are saving 24% of your income, which is above the recommended 20%.",
                      },
                      {
                        icon: <WarningAmberIcon sx={{ fontSize: 20 }} />,
                        row: "bg-amber-50/90",
                        chip: "bg-white text-amber-600 shadow-sm",
                        text: "Your emergency fund can be improved. Aim for at least 6 months of expenses.",
                      },
                      {
                        icon: <HealthAndSafetyIcon sx={{ fontSize: 20 }} />,
                        row: "bg-red-50/90",
                        chip: "bg-white text-red-500 shadow-sm",
                        text: "You have an insurance gap of ₹ 12,00,000. Consider increasing your coverage.",
                      },
                    ].map((insight, i) => (
                      <div
                        key={i}
                        className={`group flex items-start gap-3.5 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 ${insight.row}`}
                      >
                        <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${insight.chip}`}>
                          {insight.icon}
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-navy-950 sm:text-[15px]">
                          {insight.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Actions */}
                <div className="card-hover-effect rounded-[22px] border border-slate-200/70 bg-white p-6 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <IconTile className="h-10 w-10 bg-violet-50 text-violet-600">
                        <TrackChangesIcon sx={{ fontSize: 20 }} />
                      </IconTile>
                      <p className="text-lg font-extrabold text-navy-950">Recommended Actions</p>
                    </div>
                    <button type="button" className="cursor-pointer whitespace-nowrap text-[13px] font-bold text-brand-green-600 transition-colors hover:text-brand-green-700 hover:underline">
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3.5">
                    {[
                      {
                        icon: <PaidIcon sx={{ fontSize: 20 }} />,
                        iconColor: "bg-amber-50 text-amber-600",
                        title: "Build Emergency Fund",
                        desc: "Increase your emergency fund to 6 months of expenses.",
                        btn: "Take Action",
                      },
                      {
                        icon: <ShieldIcon sx={{ fontSize: 20 }} />,
                        iconColor: "bg-red-50 text-red-500",
                        title: "Increase Insurance Coverage",
                        desc: "Fill your insurance gap and protect your financial future.",
                        btn: "Take Action",
                      },
                      {
                        icon: <ShowChartIcon sx={{ fontSize: 20 }} />,
                        iconColor: "bg-brand-green-50 text-brand-green-600",
                        title: "Invest for Long Term Goals",
                        desc: "Start a SIP of ₹ 10,000/month to build wealth over time.",
                        btn: "Explore",
                      },
                      {
                        icon: <DescriptionIcon sx={{ fontSize: 20 }} />,
                        iconColor: "bg-sky-50 text-sky-600",
                        title: "Reduce Debt",
                        desc: "Consider prepaying high-interest loans to reduce your debt burden.",
                        btn: "Review",
                      },
                    ].map((action, i) => (
                      <div
                        key={i}
                        className="group flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:border-brand-green-200 hover:bg-brand-green-50/40 sm:flex-row sm:items-center"
                      >
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${action.iconColor}`}>
                          {action.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-navy-950 sm:text-[15px]">{action.title}</p>
                          <p className="mt-0.5 text-[13px] font-medium leading-relaxed text-slate-700">{action.desc}</p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex shrink-0 cursor-pointer items-center gap-1 self-start rounded-xl border-[1.5px] border-brand-green-500 bg-white px-4 py-2 text-[13px] font-bold text-brand-green-700 transition-all duration-200 hover:bg-brand-green-500 hover:text-white hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 sm:self-auto"
                        >
                          {action.btn}
                          <ChevronRightIcon sx={{ fontSize: 16 }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ─── Financial Summary ─── */}
              <div className="card-hover-effect mt-6 rounded-[22px] border border-slate-200/70 bg-white p-6 shadow-[0_6px_24px_-10px_rgba(13,37,73,0.12)]">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <IconTile className="h-10 w-10 bg-blue-50 text-blue-600">
                      <DescriptionIcon sx={{ fontSize: 20 }} />
                    </IconTile>
                    <p className="text-lg font-extrabold text-navy-950">Financial Summary</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/ai-financial-report")}
                    className="cursor-pointer whitespace-nowrap text-[13px] font-bold text-brand-green-600 transition-colors hover:text-brand-green-700 hover:underline sm:text-sm"
                  >
                    View Full Report →
                  </button>
                </div>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                  <div className="min-w-0 flex-1 space-y-1">
                    {[
                      { label: "Total Income", value: "₹ 1,85,000 / month", color: "text-navy-950", icon: <PaidIcon sx={{ fontSize: 18 }} />, iconBg: "bg-brand-green-50 text-brand-green-600" },
                      { label: "Total Expenses", value: "₹ 1,40,000 / month", color: "text-red-600 font-extrabold", icon: <ReceiptIcon sx={{ fontSize: 18 }} />, iconBg: "bg-red-50 text-red-500" },
                      { label: "Total Savings", value: "₹ 45,000 / month", color: "text-brand-green-700 font-extrabold", icon: <AccountBalanceWalletIcon sx={{ fontSize: 18 }} />, iconBg: "bg-blue-50 text-blue-600" },
                      { label: "Total Assets", value: "₹ 28,75,000", color: "text-navy-950 font-extrabold", icon: <SavingsIcon sx={{ fontSize: 18 }} />, iconBg: "bg-violet-50 text-violet-600" },
                      { label: "Total Liabilities", value: "₹ 9,20,000", color: "text-navy-950 font-extrabold", icon: <PercentIcon sx={{ fontSize: 18 }} />, iconBg: "bg-amber-50 text-amber-600" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0 last:pb-0"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${row.iconBg}`}>
                            {row.icon}
                          </span>
                          <span className="truncate text-sm font-bold text-navy-950 sm:text-base">{row.label}</span>
                        </span>
                        <span className={`whitespace-nowrap text-sm font-bold sm:text-base ${row.color}`}>{row.value}</span>
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
                      size={150}
                    />
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="h-3.5 w-3.5 rounded-full bg-brand-green-500" />
                        <span className="text-sm font-bold text-navy-950">Assets</span>
                        <span className="text-sm font-extrabold text-brand-green-700">75.7%</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="h-3.5 w-3.5 rounded-full bg-red-500" />
                        <span className="text-sm font-bold text-navy-950">Liabilities</span>
                        <span className="text-sm font-extrabold text-red-600">24.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
