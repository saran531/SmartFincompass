import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import CurrencyInput from "./components/CurrencyInput";
import CategoryIcon from "@mui/icons-material/Category";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessIcon from "@mui/icons-material/Business";
import HomeIcon from "@mui/icons-material/Home";
import ComputerIcon from "@mui/icons-material/Computer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShieldIcon from "@mui/icons-material/Shield";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";

const INCOME_SOURCES = [
  {
    key: "salary",
    label: "Salary (In-hand)",
    desc: "Your take-home salary after deductions",
    icon: AccountBalanceWalletIcon,
    color: "text-brand-green-600 bg-brand-green-50 border border-brand-green-100",
    row: "border-emerald-100 bg-emerald-50/60 hover:bg-emerald-50",
  },
  {
    key: "business",
    label: "Business Income",
    desc: "Profit from your business or self-owned company",
    icon: BusinessIcon,
    color: "text-violet-600 bg-violet-50 border border-violet-100",
    row: "border-violet-100 bg-violet-50/60 hover:bg-violet-50",
  },
  {
    key: "rental",
    label: "Rental Income",
    desc: "Income from rent, lease or property",
    icon: HomeIcon,
    color: "text-amber-600 bg-amber-50 border border-amber-100",
    row: "border-amber-100 bg-amber-50/60 hover:bg-amber-50",
  },
  {
    key: "freelance",
    label: "Freelance Income",
    desc: "Earnings from freelance work or projects",
    icon: ComputerIcon,
    color: "text-sky-600 bg-sky-50 border border-sky-100",
    row: "border-sky-100 bg-sky-50/60 hover:bg-sky-50",
  },
  {
    key: "commission",
    label: "Commission Income",
    desc: "Income from commissions or referrals",
    icon: ReceiptIcon,
    color: "text-orange-600 bg-orange-50 border border-orange-100",
    row: "border-orange-100 bg-orange-50/60 hover:bg-orange-50",
  },
  {
    key: "other",
    label: "Other Income",
    desc: "Any other regular income not listed above",
    icon: MoreHorizIcon,
    color: "text-teal-600 bg-teal-50 border border-teal-100",
    row: "border-teal-100 bg-teal-50/60 hover:bg-teal-50",
  },
];

const CHART_COLORS = {
  salary: "#189a63",
  business: "#8b5cf6",
  rental: "#d97706",
  freelance: "#2563eb",
  commission: "#f97316",
  other: "#0d9488",
};

const CHART_LABELS: Record<string, string> = {
  salary: "Salary",
  business: "Business",
  rental: "Rental",
  freelance: "Freelance",
  commission: "Commission",
  other: "Other Income",
};

let otherIncomeIdSeq = 0;
const createOtherIncomeId = () => `other-income-${++otherIncomeIdSeq}`;

const parseMoney = (value: string): number => {
  if (!value) return 0;
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
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

  const savedInc = assessmentData.income || {};
  const [amounts, setAmounts] = useState<Record<string, string>>({
    salary: savedInc.salary || "",
    business: savedInc.business || "",
    rental: savedInc.rental || "",
    freelance: savedInc.freelance || "",
    commission: savedInc.commission || "",
    other: savedInc.other || "",
  });

  const [otherIncomes, setOtherIncomes] = useState<
    Array<{ id: string; type: string; amount: string }>
  >(() =>
    (savedInc.otherIncomes || []).map((entry) => ({
      id: createOtherIncomeId(),
      type: entry.type,
      amount: entry.amount,
    }))
  );

  const otherIncomeTotal = useMemo(
    () => otherIncomes.reduce((acc, item) => acc + parseMoney(item.amount), 0),
    [otherIncomes]
  );

  const numericValues = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(amounts).map(([k, v]) => [
          k,
          k === "other" ? otherIncomeTotal : parseFloat(v) || 0,
        ])
      ) as Record<string, number>,
    [amounts, otherIncomeTotal]
  );

  const total = useMemo(
    () => Object.values(numericValues).reduce((a, b) => a + b, 0),
    [numericValues]
  );

  const grandTotal = total;

  const handleChange = (key: string, value: string) => {
    let cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
    if (parts[1] && parts[1].length > 2) cleaned = parts[0] + "." + parts[1].slice(0, 2);
    setAmounts((prev) => ({ ...prev, [key]: cleaned }));
  };

  const addOtherIncome = () => {
    setOtherIncomes((prev) => [...prev, { id: createOtherIncomeId(), type: "", amount: "" }]);
  };

  const updateOtherIncome = (
    id: string,
    patch: Partial<{ type: string; amount: string }>
  ) => {
    setOtherIncomes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  const removeOtherIncome = (id: string) => {
    setOtherIncomes((prev) => prev.filter((item) => item.id !== id));
  };

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
          currentStep={3}
          title="Income Sources"
          subtitle="Add all your income sources to get a complete view of your monthly earnings."
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-6">
            <div className="mb-6">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <AccountBalanceWalletIcon sx={{ fontSize: 24 }} />
                </span>
              <p className="asmt-section-title text-lg sm:text-xl font-extrabold text-navy-950">
                Add Your Income Sources
              </p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Enter your average monthly income from all sources
              </p>
            </div>

            {/* Income Rows */}
            <div className="space-y-4">
              {INCOME_SOURCES.map((src) => {
                const headerField = src.key === "other" ? (
                  <div className="relative w-full max-w-[200px] shrink-0">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-base sm:text-lg font-black text-navy-950">
                      ₹
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={otherIncomeTotal.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      readOnly
                      placeholder="Enter amount"
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-10 text-sm sm:text-base font-extrabold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs sm:text-sm font-bold text-slate-500">
                      .00
                    </span>
                  </div>
                ) : (
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
                );

                const headerContent = (
                  <>
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${src.color}`}
                    >
                      <src.icon sx={{ fontSize: 24 }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold text-navy-950">
                        {src.label}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm font-medium text-slate-600">
                        {src.desc}
                      </p>
                    </div>
                    {headerField}
                  </>
                );

                if (src.key !== "other") {
                  return (
                    <div
                      key={src.key}
                      className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${src.row}`}
                    >
                      {headerContent}
                    </div>
                  );
                }

                return (
                  <div
                    key={src.key}
                    className={`rounded-xl border ${src.row}`}
                  >
                    <div className="flex items-center gap-4 p-4 transition-colors">
                      {headerContent}
                    </div>

                    {otherIncomes.length > 0 && (
                      <div className="space-y-3 border-t border-slate-200 py-4">
                        {otherIncomes.map((item) => (
                          <div
                            key={item.id}
                            className="mx-4 flex items-end gap-3 rounded-xl border border-navy-950/10 bg-white p-3 shadow-xs sm:gap-4 sm:p-4"
                          >
                            <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
                                  <span className="label-icon"><CategoryIcon sx={{ fontSize: 15 }} /></span>
                                  Income Type
                                </label>
                                <input
                                  type="text"
                                  value={item.type}
                                  onChange={(e) =>
                                    updateOtherIncome(item.id, { type: e.target.value })
                                  }
                                  placeholder="e.g. Interest, Dividend, Pension..."
                                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm sm:text-base font-semibold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                                />
                              </div>
                              <CurrencyInput
                                label="Monthly Amount (₹)"
                                value={item.amount}
                                onChange={(v) => updateOtherIncome(item.id, { amount: v })}
                                placeholder="0"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeOtherIncome(item.id)}
                              aria-label="Remove income source"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition-colors hover:border-red-200 hover:bg-red-100 hover:text-red-600"
                            >
                              <DeleteOutlinedIcon sx={{ fontSize: 22 }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="px-4 pb-4">
                      <button
                        type="button"
                        onClick={addOtherIncome}
                        className="flex items-center gap-2 rounded-xl border-2 border-dashed border-brand-green-300 px-4 py-2 text-sm font-semibold text-brand-green-700 transition-all hover:-translate-y-0.5 hover:border-brand-green-500 hover:bg-brand-green-50 hover:shadow-sm"
                      >
                        + Add Another Income
                      </button>
                    </div>
                  </div>
                );
              })}
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
                ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/employment-details")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm sm:text-base font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  updateAssessment("income", {
                    ...amounts,
                    other: otherIncomeTotal ? String(otherIncomeTotal) : "",
                    commission: amounts.commission || "",
                    otherIncomes: otherIncomes.map(({ type, amount }) => ({ type, amount })),
                  });
                  navigate("/monthly-expenses");
                }}
                className="asmt-btn-next flex h-12 items-center gap-2 rounded-full px-8 text-sm sm:text-base font-bold"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <LockIcon sx={{ fontSize: 18 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-3">
            {/* Card 1: Monthly Income Overview */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2.5 mb-5 text-base sm:text-lg font-extrabold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><AccountBalanceWalletIcon sx={{ fontSize: 22 }} /></span>
                Monthly Income Overview
              </h3>

              <DonutChart values={numericValues} total={grandTotal} />

              {/* Legend */}
              <div className="mt-5 space-y-3">
                {INCOME_SOURCES.map((src) => {
                  const val = numericValues[src.key];
                  const pct = grandTotal > 0 ? Math.round((val / grandTotal) * 100) : 0;
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
            <div className="rounded-2xl border border-brand-green-200/80 bg-brand-green-50/50 p-6 shadow-xs">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700 border border-brand-green-200">
                  <TrendingUpIcon sx={{ fontSize: 22 }} />
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
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 border border-sky-200">
                  <ShieldIcon sx={{ fontSize: 22 }} />
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
    </div>
  );
}

