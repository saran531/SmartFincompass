import { useState } from "react";
import FinancialSidebar from "../components/FinancialSidebar";
import financialFuture from "../Assets/images/FinancialFuture.png";
import AssessmentHeader from "../components/AssessmentHeader";
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
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const CARD = "rounded-[22px] border border-navy-950/5 bg-white shadow-[0_10px_40px_-18px_rgba(13,37,73,0.15)]";

function GaugeChart({
  value,
  max,
  color,
  bgColor,
  size = 170,
}: {
  value: number;
  max: number;
  color: string;
  bgColor: string;
  size?: number;
}) {
  const radius = (size - 20) / 2;
  const strokeWidth = 14;
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
    <div className="relative flex h-[176px] w-[176px] shrink-0 items-center justify-center">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="text-xs font-bold text-navy-900/80">{centerLabel}</span>
        <span className="text-[15px] font-extrabold text-navy-950">{centerValue}</span>
      </div>
    </div>
  );
}

function MiniBars({ color, className = "" }: { color: string; className?: string }) {
  const bars = [22, 32, 27, 40, 52];
  return (
    <svg viewBox="0 0 64 56" className={`h-9 w-14 ${className}`} aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 13 + 3}
          y={56 - h}
          width="9"
          height={h}
          rx="3.5"
          fill={color}
          opacity={0.3 + i * 0.15}
        />
      ))}
    </svg>
  );
}

function MiniLine({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={`h-9 w-16 ${className}`} aria-hidden="true">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="5,33 20,26 35,29 50,18 65,13 75,7"
      />
      <polyline fill={`${color}26`} stroke="none" points="5,33 20,26 35,29 50,18 65,13 75,7 75,40 5,40" />
    </svg>
  );
}

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

function FinancialOverviewChart() {
  const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  const income = [85, 90, 95, 100, 110, 115];
  const expenses = [60, 65, 70, 75, 80, 85];
  const savings = [25, 25, 25, 25, 30, 30];

  const maxVal = 120;
  const chartW = 520;
  const chartH = 240;
  const padL = 52;
  const padB = 34;
  const padT = 12;
  const plotW = chartW - padL;
  const plotH = chartH - padT - padB;

  const toX = (i: number) => padL + (i / (months.length - 1)) * plotW;
  const toY = (v: number) => padT + plotH - (v / maxVal) * plotH;

  const toPts = (data: number[]) => data.map((v, i) => ({ x: toX(i), y: toY(v) }));
  const line = (data: number[]) => smoothPath(toPts(data));
  const area = (data: number[]) =>
    `${line(data)} L${toX(data.length - 1)},${toY(0)} L${toX(0)},${toY(0)} Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full min-w-[380px]">
        <defs>
          <linearGradient id="ovIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22b573" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#22b573" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ovExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ovSavings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 30, 60, 90, 120].map((v) => (
          <g key={v}>
            <line
              x1={padL}
              y1={toY(v)}
              x2={chartW}
              y2={toY(v)}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <text
              x={padL - 7}
              y={toY(v) + 4}
              textAnchor="end"
              className="fill-navy-950 font-bold"
              fontSize="13"
            >
              {v === 0 ? "₹ 0" : v === 30 ? "₹ 50K" : v === 60 ? "₹ 1L" : v === 90 ? "₹ 1.5L" : "₹ 2L"}
            </text>
          </g>
        ))}
        {months.map((m, i) => (
          <text
            key={m}
            x={toX(i)}
            y={chartH - 7}
            textAnchor="middle"
            className="fill-navy-950 font-bold"
            fontSize="13"
          >
            {m}
          </text>
        ))}

        <path d={area(income)} fill="url(#ovIncome)" />
        <path d={area(expenses)} fill="url(#ovExpenses)" />
        <path d={area(savings)} fill="url(#ovSavings)" />

        <path d={line(income)} fill="none" stroke="#22b573" strokeWidth="2.75" strokeLinecap="round" />
        <path d={line(expenses)} fill="none" stroke="#ef4444" strokeWidth="2.75" strokeLinecap="round" />
        <path d={line(savings)} fill="none" stroke="#3b82f6" strokeWidth="2.75" strokeLinecap="round" />

        {income.map((v, i) => (
          <circle key={`inc-${i}`} cx={toX(i)} cy={toY(v)} r="4" fill="#22b573" stroke="white" strokeWidth="1.75" />
        ))}
        {expenses.map((v, i) => (
          <circle key={`exp-${i}`} cx={toX(i)} cy={toY(v)} r="4" fill="#ef4444" stroke="white" strokeWidth="1.75" />
        ))}
        {savings.map((v, i) => (
          <circle key={`sav-${i}`} cx={toX(i)} cy={toY(v)} r="4" fill="#3b82f6" stroke="white" strokeWidth="1.75" />
        ))}
      </svg>
    </div>
  );
}

function SectionTitle({
  icon,
  iconClass,
  title,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        {icon}
      </span>
      <p className="text-xl font-extrabold text-navy-950 sm:text-[22px]">{title}</p>
    </div>
  );
}

export default function AiFinancialReport() {
  const [timeFilter, setTimeFilter] = useState("6M");

  const metrics = [
    { label: "Investment Readiness", value: "72 / 100", status: "Moderate", icon: <AutoGraphIcon sx={{ fontSize: 18 }} />, iconColor: "bg-purple-50 text-purple-600", statusColor: "text-purple-600 font-bold", chart: <MiniBars color="#a855f7" /> },
    { label: "Emergency Fund", value: "3.4 Months", status: "Good", icon: <ShieldIcon sx={{ fontSize: 18 }} />, iconColor: "bg-brand-green-50 text-brand-green-600", statusColor: "text-brand-green-700 font-bold", chart: <MiniBars color="#22b573" /> },
    { label: "Debt Ratio", value: "32%", status: "Healthy", icon: <CreditCardIcon sx={{ fontSize: 18 }} />, iconColor: "bg-orange-50 text-orange-600", statusColor: "text-brand-green-700 font-bold", chart: <MiniBars color="#f97316" /> },
    { label: "Savings Capacity", value: "24%", status: "of Income", icon: <SavingsIcon sx={{ fontSize: 18 }} />, iconColor: "bg-brand-green-50 text-brand-green-600", statusColor: "text-slate-700 font-semibold", chart: <MiniBars color="#3b82f6" /> },
    { label: "Net Worth", value: "₹ 28,75,000", status: "+12.6%", icon: <AccountBalanceWalletIcon sx={{ fontSize: 18 }} />, iconColor: "bg-sky-50 text-sky-600", statusColor: "text-brand-green-700 font-bold", chart: <MiniLine color="#22b573" /> },
    { label: "Cash Flow", value: "₹ 45,000", status: "Surplus / Month", icon: <PaidIcon sx={{ fontSize: 18 }} />, iconColor: "bg-amber-50 text-amber-600", statusColor: "text-slate-700 font-semibold", chart: <MiniBars color="#3b82f6" /> },
    { label: "Insurance Gap", value: "₹ 12,00,000", status: "High", icon: <SecurityIcon sx={{ fontSize: 18 }} />, iconColor: "bg-red-50 text-red-500", statusColor: "text-red-600 font-extrabold", chart: <MiniBars color="#ec4899" /> },
    { label: "Financial Health", value: "Good", status: "Stable", icon: <HealthAndSafetyIcon sx={{ fontSize: 18 }} />, iconColor: "bg-brand-green-50 text-brand-green-600", statusColor: "text-slate-700 font-semibold", chart: <MiniLine color="#22b573" /> },
  ];

  return (
    <div className="relative min-h-screen bg-[linear-gradient(160deg,#eff8ff_0%,#ffffff_40%,#f0fdf7_75%,#eef6ff_100%)]">
      {/* ─── Soft decorative atmosphere ─── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-sky-300/25 blur-[120px]" />
        <div className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-200/25 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-[440px] w-[560px] rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="absolute bottom-10 left-1/5 h-64 w-80 rounded-full bg-brand-green-300/15 blur-[110px]" />
        <svg className="absolute -left-12 bottom-0 h-[340px] w-[460px] text-sky-300/50" viewBox="0 0 460 340" fill="none">
          <path d="M-20 260 C 90 190, 190 320, 470 210" stroke="currentColor" strokeWidth="2.5" />
          <path d="M-20 295 C 110 225, 210 355, 470 245" stroke="currentColor" strokeWidth="1.75" opacity="0.7" />
          <path d="M-20 330 C 130 260, 230 385, 470 280" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
        </svg>
        <AutoAwesomeIcon sx={{ fontSize: 26 }} className="absolute left-[14%] top-[14%] text-sky-300/70" />
        <AutoAwesomeIcon sx={{ fontSize: 16 }} className="absolute right-[9%] top-[38%] text-brand-green-300/70" />
        <AutoAwesomeIcon sx={{ fontSize: 18 }} className="absolute bottom-[22%] right-[16%] text-purple-300/60" />
      </div>

      <AssessmentHeader />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:h-[calc(100vh_-_90px)]">
        {/* ─── SIDEBAR (shared with FinancialDashboard) ─── */}
        <div className="hidden w-[260px] shrink-0 flex-col lg:flex lg:overflow-y-auto">
          <FinancialSidebar />
          <img
            src={financialFuture}
            alt="Financial future"
            className="mt-6 h-auto w-full max-w-full"
          />
        </div>

        <main className="min-w-0 flex-1 lg:overflow-y-auto">
          {/* ─── Report Header ─── */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-navy-950 sm:text-[32px] lg:text-[40px]">
                Personalized{" "}
                <span className="italic text-brand-green-600">Financial</span>{" "}
                Readiness Report
                <AutoAwesomeIcon sx={{ fontSize: 24 }} className="ml-1.5 inline align-middle text-sky-400" />
                <AutoAwesomeIcon sx={{ fontSize: 14 }} className="ml-1 inline align-middle text-brand-green-400" />
              </h1>
              <p className="mt-2.5 text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
                Your AI-powered financial analysis and personalized roadmap to financial freedom.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
              <button className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-5 text-[15px] font-bold text-brand-green-700 transition-all duration-200 hover:bg-brand-green-500 hover:text-white hover:shadow-[0_8px_20px_-8px_rgba(24,154,99,0.6)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500">
                <DownloadIcon sx={{ fontSize: 18 }} />
                Download PDF
              </button>
              <span className="text-[13px] font-semibold text-slate-600 sm:text-right">
                Generated on: May 08, 2025
              </span>
            </div>
          </div>

          {/* ─── Overall Financial Readiness + Metrics ─── */}
          <div className={`relative overflow-hidden p-5 sm:p-7 ${CARD}`}>
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-brand-green-100/50 blur-3xl" />
            <div className="relative">
              <SectionTitle
                icon={<BarChartIcon sx={{ fontSize: 20 }} />}
                iconClass="bg-sky-50 text-sky-600"
                title="Overall Financial Readiness Score"
              />

              <div className="flex flex-col gap-8 xl:flex-row">
                {/* Score area: ring + explanation + improvement badge */}
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-center sm:text-left xl:w-[340px] xl:shrink-0 xl:flex-col xl:justify-start xl:text-center">
                  <div className="relative shrink-0">
                    <GaugeChart value={78} max={100} color="#22b573" bgColor="#eef1f6" size={170} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[42px] font-extrabold leading-none text-navy-950">78</span>
                      <span className="mt-1.5 text-xs font-bold text-navy-900/70">/ 100</span>
                    </div>
                  </div>
                  <div className="w-full max-w-lg xl:max-w-none">
                    <p className="text-base font-bold leading-snug text-navy-950 sm:text-[17px]">
                      You are in a good financial position.
                    </p>
                    <p className="mt-2 text-[15px] font-medium leading-relaxed text-slate-700">
                      Keep going! With a few improvements, you can achieve financial freedom faster.
                    </p>
                    <div className="mt-4 inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl border-2 border-brand-green-200 bg-white px-4 py-2.5 shadow-[0_6px_18px_-8px_rgba(24,154,99,0.4)] sm:justify-start xl:justify-center">
                      <TrendingUpIcon sx={{ fontSize: 20 }} className="text-brand-green-500" />
                      <span className="text-sm font-extrabold leading-tight text-brand-green-700 sm:text-[15px]">
                        +12 points
                      </span>
                      <span className="h-7 w-px bg-brand-green-200" />
                      <span className="text-xs font-semibold leading-tight text-slate-600">
                        vs last
                        <br />
                        assessment
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric cards: responsive grid, no absolute overlays */}
                <div className="min-w-0 flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {metrics.map((m) => (
                      <div
                        key={m.label}
                        className="card-hover-effect flex min-w-0 flex-col rounded-2xl border border-navy-950/10 bg-white p-4 shadow-[0_4px_16px_-8px_rgba(13,37,73,0.1)] sm:p-5"
                      >
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${m.iconColor}`}>
                          {m.icon}
                        </span>
                        <p className="mt-3 break-words text-[15px] font-bold leading-snug text-navy-950">
                          {m.label}
                        </p>
                        <p className="mt-1.5 break-words text-[21px] font-extrabold leading-tight text-navy-950">
                          {m.value}
                        </p>
                        <p className={`mt-1 break-words text-[13px] leading-snug ${m.statusColor}`}>
                          {m.status}
                        </p>
                        <div className="mt-auto flex justify-end pt-2.5">{m.chart}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Financial Overview + Investment Allocation ─── */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
            {/* Financial Overview */}
            <div className={`min-w-0 ${CARD}`}>
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                      <BarChartIcon sx={{ fontSize: 20 }} />
                    </span>
                    <p className="text-xl font-extrabold text-navy-950 sm:text-[22px]">Financial Overview</p>
                  </div>
                  <div className="flex gap-2">
                    {["6M", "1Y", "All"].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setTimeFilter(f)}
                        className={`rounded-lg px-4 py-2 text-[13px] font-bold transition-all cursor-pointer sm:text-sm ${
                          timeFilter === f
                            ? "bg-brand-green-500 text-white shadow-[0_6px_14px_-6px_rgba(24,154,99,0.7)]"
                            : "bg-slate-100 text-navy-950 hover:bg-slate-200"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-green-500" />
                    <span className="text-[13px] font-bold text-navy-950 sm:text-sm">Income</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="text-[13px] font-bold text-navy-950 sm:text-sm">Expenses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="text-[13px] font-bold text-navy-950 sm:text-sm">Savings</span>
                  </div>
                </div>
                <FinancialOverviewChart />
              </div>
            </div>

            {/* Investment Allocation */}
            <div className={`min-w-0 ${CARD}`}>
              <div className="p-5 sm:p-6">
                <SectionTitle
                  icon={<PieChartIcon sx={{ fontSize: 20 }} />}
                  iconClass="bg-orange-50 text-orange-600"
                  title="Investment Allocation"
                />
                <div className="flex flex-col items-center gap-5">
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
                  <div className="w-full space-y-3.5">
                    {[
                      { label: "Mutual Funds", pct: "40%", color: "bg-blue-500" },
                      { label: "Stocks", pct: "25%", color: "bg-purple-500" },
                      { label: "Fixed Deposits", pct: "15%", color: "bg-brand-green-500" },
                      { label: "Gold", pct: "10%", color: "bg-amber-500" },
                      { label: "Cash / Others", pct: "10%", color: "bg-orange-500" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className={`h-3 w-3 shrink-0 rounded-full ${item.color}`} />
                          <span className="break-words text-sm font-semibold text-navy-950 sm:text-[15px]">
                            {item.label}
                          </span>
                        </div>
                        <span className="shrink-0 text-sm font-extrabold text-navy-950 sm:text-[15px]">
                          {item.pct}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[15px] font-bold text-navy-950">Diversification Score</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-extrabold text-brand-green-700">Good</span>
                      <span className="text-[13px] font-bold text-navy-950">72/100</span>
                    </div>
                  </div>
                  <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-green-400 to-brand-green-600"
                      style={{ width: "72%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Strengths + Weaknesses + Recommendations ─── */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Strengths */}
            <div className={`card-hover-effect relative overflow-hidden bg-gradient-to-br from-white via-white to-brand-green-50/50 p-5 sm:p-6 ${CARD}`}>
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-brand-green-100/60 blur-2xl" />
              <div className="relative mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600">
                  <EmojiEventsIcon sx={{ fontSize: 20 }} />
                </span>
                <p className="text-lg font-extrabold text-navy-950 sm:text-xl">Strengths</p>
              </div>
              <ul className="relative space-y-4">
                {[
                  "Good savings rate (24%)",
                  "Emergency fund is on track",
                  "Low debt ratio",
                  "Consistent monthly surplus",
                  "Insurance coverage in place",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <CheckCircleIcon sx={{ fontSize: 19, mt: 0.2 }} className="shrink-0 text-brand-green-500" />
                    <span className="min-w-0 break-words text-[15px] font-semibold leading-relaxed text-navy-950">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className={`card-hover-effect relative overflow-hidden bg-gradient-to-br from-white via-white to-amber-50/50 p-5 sm:p-6 ${CARD}`}>
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-amber-100/70 blur-2xl" />
              <div className="relative mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <WarningAmberIcon sx={{ fontSize: 20 }} />
                </span>
                <p className="text-lg font-extrabold text-navy-950 sm:text-xl">Weaknesses</p>
              </div>
              <ul className="relative space-y-4">
                {[
                  "Insurance gap is high",
                  "Investment returns can improve",
                  "Emergency fund below ideal (6 months)",
                  "High allocation in low-return assets",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <WarningAmberIcon sx={{ fontSize: 19, mt: 0.2 }} className="shrink-0 text-amber-500" />
                    <span className="min-w-0 break-words text-[15px] font-semibold leading-relaxed text-navy-950">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Recommendations */}
            <div className={`card-hover-effect relative overflow-hidden bg-gradient-to-br from-white via-white to-purple-50/50 p-5 sm:p-6 ${CARD}`}>
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-purple-100/60 blur-2xl" />
              <div className="relative mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <LightbulbIcon sx={{ fontSize: 20 }} />
                </span>
                <p className="text-lg font-extrabold text-navy-950 sm:text-xl">Top Recommendations</p>
              </div>
              <ul className="relative space-y-4">
                {[
                  "Increase emergency fund to 6 months",
                  "Close insurance gap of ₹ 12,00,000",
                  "Invest in diversified mutual funds",
                  "Start a long-term SIP of ₹10,000/month",
                  "Reduce high-interest debt",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <CheckCircleIcon sx={{ fontSize: 19, mt: 0.2 }} className="shrink-0 text-purple-500" />
                    <span className="min-w-0 break-words text-[15px] font-semibold leading-relaxed text-navy-950">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ─── Recommended Investment Categories ─── */}
          <div className={`mt-6 p-5 sm:p-6 ${CARD}`}>
            <SectionTitle
              icon={<BarChartIcon sx={{ fontSize: 20 }} />}
              iconClass="bg-sky-50 text-sky-600"
              title="Recommended Investment Categories for You"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {[
                { name: "Equity Funds", pct: "40%", desc: "High Growth Potential", color: "bg-blue-50 text-blue-600", barColor: "bg-blue-500", icon: <ShowChartIcon sx={{ fontSize: 20 }} />, barW: "40%" },
                { name: "Debt Funds", pct: "25%", desc: "Stable Returns", color: "bg-purple-50 text-purple-600", barColor: "bg-purple-500", icon: <ShieldIcon sx={{ fontSize: 20 }} />, barW: "25%" },
                { name: "Gold / Commodities", pct: "10%", desc: "Hedge Against Inflation", color: "bg-amber-50 text-amber-600", barColor: "bg-amber-500", icon: <PieChartIcon sx={{ fontSize: 20 }} />, barW: "10%" },
                { name: "Direct Stocks", pct: "15%", desc: "Long Term Wealth", color: "bg-brand-green-50 text-brand-green-600", barColor: "bg-brand-green-500", icon: <BarChartIcon sx={{ fontSize: 20 }} />, barW: "15%" },
                { name: "Cash / Others", pct: "10%", desc: "Liquidity & Safety", color: "bg-orange-50 text-orange-600", barColor: "bg-orange-500", icon: <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />, barW: "10%" },
              ].map((cat) => (
                <div
                  key={cat.name}
                  className="card-hover-effect flex min-w-0 flex-col rounded-2xl border border-navy-950/10 bg-white p-4 shadow-[0_4px_16px_-8px_rgba(13,37,73,0.1)] sm:p-5"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cat.color}`}>
                    {cat.icon}
                  </span>
                  <p className="mt-3.5 break-words text-[15px] font-bold leading-snug text-navy-950 sm:text-base">
                    {cat.name}
                  </p>
                  <p className="mt-1 break-words text-[26px] font-extrabold leading-tight text-navy-950">
                    {cat.pct}
                  </p>
                  <p className="mt-1.5 break-words text-[13px] font-semibold leading-snug text-slate-700 sm:text-sm">
                    {cat.desc}
                  </p>
                  <div className="mt-auto pt-3.5">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className={`h-full rounded-full ${cat.barColor}`} style={{ width: cat.barW }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Personalized Financial Roadmap ─── */}
          <div className={`relative mt-6 p-5 sm:p-7 ${CARD}`}>
            <SectionTitle
              icon={<RocketLaunchIcon sx={{ fontSize: 20 }} />}
              iconClass="bg-brand-green-50 text-brand-green-600"
              title="Your Personalized Financial Roadmap"
            />
            <div className="relative">
              {/* Dashed timeline connector */}
              <div className="absolute left-[6%] right-[6%] top-8 hidden border-t-2 border-dashed border-slate-300 lg:block" />
              <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
                {[
                  {
                    period: "0 - 3 Months",
                    icon: <EventIcon sx={{ fontSize: 22 }} />,
                    iconColor: "bg-brand-green-50 text-brand-green-600 border-brand-green-300",
                    tasks: ["Build emergency fund to 3 months", "Review & optimize expenses", "Close high-interest debt"],
                  },
                  {
                    period: "3 - 6 Months",
                    icon: <FlagIcon sx={{ fontSize: 22 }} />,
                    iconColor: "bg-brand-green-50 text-brand-green-600 border-brand-green-300",
                    tasks: ["Complete 6 months emergency fund", "Increase insurance coverage", "Start SIP of ₹10,000"],
                  },
                  {
                    period: "6 - 12 Months",
                    icon: <ShowChartIcon sx={{ fontSize: 22 }} />,
                    iconColor: "bg-purple-50 text-purple-600 border-purple-300",
                    tasks: ["Invest in diversified mutual funds", "Review investment performance", "Improve credit score"],
                  },
                  {
                    period: "1 - 3 Years",
                    icon: <RocketLaunchIcon sx={{ fontSize: 22 }} />,
                    iconColor: "bg-orange-50 text-orange-600 border-orange-300",
                    tasks: ["Increase SIP to ₹15,000+", "Build long-term wealth portfolio", "Plan for major goals"],
                  },
                  {
                    period: "3+ Years",
                    icon: <EmojiEventsIcon sx={{ fontSize: 22 }} />,
                    iconColor: "bg-sky-50 text-sky-600 border-sky-300",
                    tasks: ["Achieve financial independence", "Retirement planning", "Wealth protection"],
                  },
                ].map((stage) => (
                  <div key={stage.period} className="relative flex flex-col items-center text-center">
                    <span
                      className={`z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 shadow-[0_8px_18px_-8px_rgba(13,37,73,0.25)] ${stage.iconColor}`}
                    >
                      {stage.icon}
                    </span>
                    <p className="mt-4 text-base font-extrabold text-navy-950 sm:text-[17px]">
                      {stage.period}
                    </p>
                    <ul className="mt-3 w-full space-y-2.5 text-left">
                      {stage.tasks.map((t) => (
                        <li
                          key={t}
                          className="break-words text-[13px] font-medium leading-relaxed text-slate-600 sm:text-sm"
                        >
                          • {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
