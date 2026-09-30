import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, calculateAge } from "../../context/AppContext";
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
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";

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
  { key: "beginner", label: "Beginner", sub: "Basic understanding", icon: SchoolIcon, color: "text-blue-500 bg-blue-50" },
  { key: "intermediate", label: "Intermediate", sub: "Some knowledge", icon: MenuBookIcon, color: "text-violet-500 bg-violet-50" },
  { key: "advanced", label: "Advanced", sub: "Good knowledge", icon: PsychologyIcon, color: "text-amber-500 bg-amber-50" },
  { key: "expert", label: "Expert", sub: "Very knowledgeable", icon: WorkspacePremiumIcon, color: "text-brand-green-600 bg-brand-green-50" },
];

const DURATION_OPTIONS = [
  { key: "short", label: "Short Term", sub: "Less than 1 year", icon: ScheduleIcon, color: "text-sky-500 bg-sky-50" },
  { key: "medium", label: "Medium Term", sub: "1 to 3 years", icon: EventIcon, color: "text-amber-500 bg-amber-50" },
  { key: "long", label: "Long Term", sub: "3 to 7 years", icon: TimelineIcon, color: "text-brand-green-600 bg-brand-green-50" },
  { key: "veryLong", label: "Very Long Term", sub: "More than 7 years", icon: TrendingUpIcon, color: "text-violet-500 bg-violet-50" },
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
          stroke="#cbd5e1"
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
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <PersonIcon sx={{ fontSize: 24 }} className="text-slate-600" />
        </span>
        <span className="mt-1 text-xs font-bold text-navy-950">
          Your Profile
        </span>
      </div>
    </div>
  );
}

export default function InvestmentExperience() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();
  const userAge = calculateAge(assessmentData.personalInfo?.dateOfBirth || "");
  const suggestedEquity = userAge > 0 ? 100 - userAge : 0;

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
    <div className="assessment-page min-h-screen">
      <style>{`
        .assessment-page .label-icon { height: 28px !important; width: 28px !important; border-radius: 9px !important; font-size: 17px; }
        .assessment-page .label-icon svg { font-size: 20px !important; }
        .assessment-page main label.mb-2 { margin-bottom: 6px !important; }
        .assessment-page .asmt-btn-next {
          border-radius: 9999px !important;
          background: linear-gradient(135deg, #128052 0%, #22b573 100%);
          box-shadow: 0 6px 16px rgba(18, 128, 82, 0.3), 0 0 10px rgba(34, 181, 115, 0.18);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .assessment-page .asmt-btn-back {
          border-radius: 9999px !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }
        @media (prefers-reduced-motion: no-preference) {
          .assessment-page .asmt-btn-next:hover {
            background: linear-gradient(135deg, #16975f 0%, #27c77f 100%);
            box-shadow: 0 10px 24px rgba(18, 128, 82, 0.42), 0 0 16px rgba(34, 181, 115, 0.34);
            transform: translateY(-1px);
          }
          .assessment-page .asmt-btn-next:active { transform: translateY(0); }
          .assessment-page .asmt-btn-back:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(2, 132, 199, 0.22);
          }
        }
      `}</style>
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={9}
          title="Investment Experience"
          subtitle="Help us understand your investment experience to provide personalized insights."
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-6">
            <div className="mb-6">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <ShowChartIcon sx={{ fontSize: 24 }} />
                </span>
              <p className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
                Answer a Few Questions
              </p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Your answers will help us build better recommendations
              </p>
            </div>

            {/* Investment Risk Guideline */}
            <div className="mb-4 rounded-2xl border border-brand-green-200 bg-gradient-to-br from-brand-green-50/80 to-sky-50/50 p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 28 }} />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-950">How much investment risk can you take?</p>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">
                    A simple starting point is the <span className="font-bold text-navy-950">100 − Age Rule</span>:
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm border border-brand-green-100">
                    <span className="text-xs font-semibold text-slate-600">100 − {userAge > 0 ? userAge : "Your Age"}</span>
                    <span className="text-xs font-bold text-navy-950">=</span>
                    <span className="text-xs font-bold text-brand-green-700">{suggestedEquity > 0 ? `${suggestedEquity}%` : "—"}</span>
                    <span className="text-xs font-semibold text-slate-600">Suggested % in Equity</span>
                  </div>
                  {userAge > 0 && (
                    <p className="mt-2 text-[11px] font-medium text-slate-500">
                      Based on your age of {userAge} years. This is a general guideline, not financial advice.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Question 1: Risk Appetite */}
            <div className="mb-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green-50 text-brand-green-700">
                  <SpeedIcon sx={{ fontSize: 26 }} />
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
                  <p className="mt-0.5 text-xs font-medium text-slate-600">
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
                        ? "border-brand-green-500 bg-brand-green-50/70"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${opt.color}`}
                    >
                      <opt.icon sx={{ fontSize: 24 }} />
                    </span>
                    <span className="text-xs font-bold text-navy-950">
                      {opt.label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">
                      {opt.sub}
                    </span>
                    <span
                      className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        riskAppetite === opt.key
                          ? "border-brand-green-500"
                          : "border-slate-300"
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
            <div className="mb-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <MenuBookIcon sx={{ fontSize: 26 }} />
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
                  <p className="mt-0.5 text-xs font-medium text-slate-600">
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
                        ? "border-brand-green-500 bg-brand-green-50/70"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${opt.color}`}
                    >
                      <opt.icon sx={{ fontSize: 24 }} />
                    </span>
                    <span className="text-xs font-bold text-navy-950">
                      {opt.label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">
                      {opt.sub}
                    </span>
                    <span
                      className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        knowledge === opt.key
                          ? "border-brand-green-500"
                          : "border-slate-300"
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
            <div className="mb-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <EventIcon sx={{ fontSize: 26 }} />
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
                  <p className="mt-0.5 text-xs font-medium text-slate-600">
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
                        ? "border-violet-500 bg-violet-50/70"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${opt.color}`}
                    >
                      <opt.icon sx={{ fontSize: 24 }} />
                    </span>
                    <span className="text-xs font-bold text-navy-950">
                      {opt.label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600">
                      {opt.sub}
                    </span>
                    <span
                      className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        duration === opt.key
                          ? "border-violet-500"
                          : "border-slate-300"
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
            <div className="mb-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <PieChartIcon sx={{ fontSize: 26 }} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-500 text-[11px] font-bold text-white">
                      4
                    </span>
                    <p className="text-sm font-bold text-navy-950">
                      Current Investments
                    </p>
                    <span className="text-xs font-bold text-slate-600">
                      (Select all that apply)
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-slate-600">
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
                          ? "border-brand-green-500 bg-brand-green-50/70"
                          : "border-slate-300 bg-white hover:border-slate-400"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                          checked
                            ? "border-brand-green-500 bg-brand-green-500"
                            : "border-slate-400 bg-white"
                        }`}
                      >
                        {checked && (
                          <CheckCircleIcon
                            sx={{ fontSize: 14 }}
                            className="text-white"
                          />
                        )}
                      </span>
                      <span className="text-xs font-bold text-navy-950">
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
                    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-navy-950 placeholder:text-slate-400 transition-all hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/insurance")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  const finalInvestments = investments.map((i) => i === "Other" && otherInvestment.trim() ? `Other: ${otherInvestment.trim()}` : i);
                  updateAssessment("investment", { riskAppetite, investmentKnowledge: knowledge, investmentDuration: duration, currentInvestments: finalInvestments });
                  navigate("/financial-goals");
                }}
                className="asmt-btn-next flex h-12 items-center gap-2 rounded-full px-8 text-[15px] font-bold"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
              <LockIcon sx={{ fontSize: 18 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-3">
            {/* Card 1: Your Investment Profile */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="flex items-center gap-2.5 mb-2 text-base font-bold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><ShowChartIcon sx={{ fontSize: 22 }} /></span>
                Your Investment Profile
              </h3>
              <p className="mb-4 text-sm font-medium text-slate-700">Profile Summary</p>

              <ProfileDonutChart />

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldIcon
                      sx={{ fontSize: 16 }}
                      className="text-brand-green-600"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Risk Appetite
                    </span>
                  </div>
                  <span className="text-sm font-bold text-brand-green-700">
                    {riskLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <MenuBookIcon
                      sx={{ fontSize: 16 }}
                      className="text-brand-green-600"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Knowledge Level
                    </span>
                  </div>
                  <span className="text-sm font-bold text-brand-green-700">
                    {knowledgeLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <EventIcon
                      sx={{ fontSize: 16 }}
                      className="text-brand-green-600"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Investment Duration
                    </span>
                  </div>
                  <span className="text-sm font-bold text-brand-green-700">
                    {durationLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChartIcon
                      sx={{ fontSize: 16 }}
                      className="text-brand-green-600"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Current Investments
                    </span>
                  </div>
                  <span className="text-sm font-bold text-brand-green-700">
                    {investments.length} Selected
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Why We Ask These Questions? */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why We Ask These Questions?
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Understanding your investment experience helps us suggest
                suitable products and strategies aligned with your goals and
                comfort level.
              </p>
            </div>

            {/* Card 3: 100% Secure */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <ShieldIcon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  100% Secure
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                We use bank-level encryption to protect your financial data.
                <br />
                Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
