import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import CurrencyInput from "./components/CurrencyInput";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
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
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";
import AssessmentHeader from "../../components/AssessmentHeader";

const EXPENSE_CATEGORIES = [
  {
    key: "food",
    label: "Food",
    desc: "Groceries, dining out,\nfood delivery, etc.",
    icon: RestaurantIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    row: "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50/90",
    chartColor: "#22b573",
  },
  {
    key: "transport",
    label: "Transport",
    desc: "Fuel, public transport,\ntaxi, maintenance, etc.",
    icon: DirectionsCarIcon,
    color: "text-sky-500 bg-sky-50",
    row: "border-sky-100 bg-sky-50/50 hover:bg-sky-50/90",
    chartColor: "#3b82f6",
  },
  {
    key: "emi",
    label: "EMI",
    desc: "Home loan, personal loan,\ncredit card EMI, etc.",
    icon: HomeWorkIcon,
    color: "text-violet-500 bg-violet-50",
    row: "border-violet-100 bg-violet-50/50 hover:bg-violet-50/90",
    chartColor: "#8b5cf6",
  },
  {
    key: "insurance",
    label: "Insurance",
    desc: "Life, health, vehicle,\nor any other insurance",
    icon: ShieldIcon,
    color: "text-amber-500 bg-amber-50",
    row: "border-amber-100 bg-amber-50/50 hover:bg-amber-50/90",
    chartColor: "#f59e0b",
  },
  {
    key: "utilities",
    label: "Utilities",
    desc: "Electricity, water, gas,\ninternet, mobile, etc.",
    icon: BoltIcon,
    color: "text-yellow-500 bg-yellow-50",
    row: "border-yellow-100 bg-yellow-50/50 hover:bg-yellow-50/90",
    chartColor: "#eab308",
  },
  {
    key: "medical",
    label: "Medical",
    desc: "Medicines, doctor consultation,\nhealth checkups, etc.",
    icon: LocalHospitalIcon,
    color: "text-red-500 bg-red-50",
    row: "border-red-100 bg-red-50/50 hover:bg-red-50/90",
    chartColor: "#ef4444",
  },
  {
    key: "entertainment",
    label: "Entertainment",
    desc: "Movies, OTT, gaming,\nevents, hobbies, etc.",
    icon: MovieIcon,
    color: "text-purple-500 bg-purple-50",
    row: "border-purple-100 bg-purple-50/50 hover:bg-purple-50/90",
    chartColor: "#a855f7",
  },
  {
    key: "shopping",
    label: "Shopping",
    desc: "Clothing, accessories,\npersonal care, etc.",
    icon: ShoppingBagIcon,
    color: "text-pink-500 bg-pink-50",
    row: "border-pink-100 bg-pink-50/50 hover:bg-pink-50/90",
    chartColor: "#ec4899",
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    desc: "OTT, software, gym,\nnews, memberships, etc.",
    icon: SubscriptionsIcon,
    color: "text-indigo-500 bg-indigo-50",
    row: "border-blue-100 bg-blue-50/50 hover:bg-blue-50/90",
    chartColor: "#6366f1",
  },
  {
    key: "other",
    label: "Other",
    desc: "Any other regular\nmonthly expenses",
    icon: MoreHorizIcon,
    color: "text-teal-500 bg-teal-50",
    row: "border-teal-100 bg-teal-50/50 hover:bg-teal-50/90",
    chartColor: "#0d9488",
  },
];

let expenseEntryIdSeq = 0;
const createExpenseEntryId = () => `expense-${++expenseEntryIdSeq}`;

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
        <span className="text-xl font-black text-navy-950">
          ₹{total.toLocaleString("en-IN")}
        </span>
        <span className="text-center text-xs font-medium text-slate-500">
          Total Expenses
        </span>
      </div>
    </div>
  );
}

export default function MonthlyExpenses() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();

  const savedExp = assessmentData.expenses || {};
  const savedAmountFor = (key: string): string => {
    switch (key) {
      case "food":
        return savedExp.food || "";
      case "transport":
        return savedExp.transport || "";
      case "emi":
        return savedExp.emi || savedExp.housing || "";
      case "insurance":
        return savedExp.insurance || "";
      case "utilities":
        return savedExp.utilities || "";
      case "medical":
        return savedExp.medical || savedExp.healthcare || "";
      case "entertainment":
        return savedExp.entertainment || "";
      case "shopping":
        return savedExp.shopping || "";
      case "subscriptions":
        return savedExp.subscriptions || "";
      case "other":
        return savedExp.other || "";
      default:
        return "";
    }
  };

  const [expenseEntries, setExpenseEntries] = useState<Record<string, Array<{ id: string; description: string; amount: string }>>>(
    () =>
      Object.fromEntries(
        EXPENSE_CATEGORIES.map((cat) => {
          const savedAmount = savedAmountFor(cat.key);
          return [
            cat.key,
            savedAmount
              ? [{ id: createExpenseEntryId(), description: "", amount: savedAmount }]
              : [],
          ];
        })
      )
  );

  const numericValues = useMemo(
    () =>
      Object.fromEntries(
        EXPENSE_CATEGORIES.map((cat) => [
          cat.key,
          (expenseEntries[cat.key] || []).reduce(
            (sum, entry) => sum + parseMoney(entry.amount),
            0
          ),
        ])
      ) as Record<string, number>,
    [expenseEntries]
  );

  const total = useMemo(
    () => Object.values(numericValues).reduce((a, b) => a + b, 0),
    [numericValues]
  );

  const addExpenseEntry = (key: string) => {
    setExpenseEntries((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { id: createExpenseEntryId(), description: "", amount: "" }],
    }));
  };

  const updateExpenseEntry = (
    key: string,
    id: string,
    patch: Partial<{ description: string; amount: string }>
  ) => {
    setExpenseEntries((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((entry) =>
        entry.id === id ? { ...entry, ...patch } : entry
      ),
    }));
  };

  const removeExpenseEntry = (key: string, id: string) => {
    setExpenseEntries((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((entry) => entry.id !== id),
    }));
  };

  return (
    <div className="assessment-page min-h-screen">
      <style>{`
        .assessment-page .label-icon { height: 28px !important; width: 28px !important; border-radius: 9px !important; font-size: 17px; }
        .assessment-page .label-icon svg { font-size: 20px !important; }
        .assessment-page main label.mb-2 { margin-bottom: 6px !important; }
        .me-type .label-icon { background-color: #eff6ff !important; color: #2563eb !important; }
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
      <AssessmentHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={4}
          title="Monthly Expenses"
          subtitle="Add your average monthly expenses to help us understand your spending pattern."
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-6">
            <div className="mb-6">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <ReceiptIcon sx={{ fontSize: 24 }} />
                </span>
              <p className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
                Add Your Monthly Expenses
              </p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Enter your average monthly spending across all categories
              </p>
            </div>

            {/* Expense Rows */}
            <div className="space-y-4">
              {EXPENSE_CATEGORIES.map((cat) => {
                const catEntries = expenseEntries[cat.key] || [];
                const catTotal = numericValues[cat.key] || 0;
                return (
                  <div
                    key={cat.key}
                    className={`rounded-xl border transition-colors ${cat.row}`}
                  >
                    <div className="flex flex-wrap items-center gap-3 p-4 sm:gap-4">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${cat.color}`}
                      >
                        <cat.icon sx={{ fontSize: 28 }} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-bold text-navy-950">
                          {cat.label}
                        </p>
                        <p className="mt-0.5 whitespace-pre-line text-xs font-medium text-slate-600">
                          {cat.desc}
                        </p>
                      </div>
                      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                        <div className="relative w-[170px] shrink-0 sm:w-[200px]">
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-base font-extrabold text-navy-950">
                            ₹
                          </span>
                          <input
                            type="text"
                            value={
                              catTotal > 0
                                ? catTotal.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
                                : ""
                            }
                            readOnly
                            placeholder="Enter amount"
                            className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-8 pr-10 text-sm font-bold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                          />
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs sm:text-sm font-bold text-slate-500">
                            .00
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => addExpenseEntry(cat.key)}
                          className="flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-dashed border-brand-green-400 px-3.5 py-2.5 text-sm font-bold text-brand-green-700 transition-all hover:-translate-y-0.5 hover:border-brand-green-500 hover:bg-brand-green-50 hover:shadow-sm sm:px-4"
                        >
                          + Add
                        </button>
                      </div>
                    </div>

                    {catEntries.length > 0 && (
                      <div className="space-y-3 border-t border-slate-200/80 px-4 pb-4 pt-4">
                        {catEntries.map((entry) => (
                          <div
                            key={entry.id}
                            className="flex items-end gap-3 rounded-xl border border-navy-950/10 bg-white p-3 shadow-xs sm:gap-4 sm:p-4"
                          >
                            <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
                                  <span className="label-icon me-type"><ReceiptIcon sx={{ fontSize: 15 }} /></span>
                                  Expense Type
                                </label>
                                <input
                                  type="text"
                                  value={entry.description}
                                  onChange={(e) =>
                                    updateExpenseEntry(cat.key, entry.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  placeholder="e.g. Groceries, Rent..."
                                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm sm:text-base font-semibold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                                />
                              </div>
                              <CurrencyInput
                                label="Monthly Amount (₹)"
                                value={entry.amount}
                                onChange={(v) =>
                                  updateExpenseEntry(cat.key, entry.id, {
                                    amount: v,
                                  })
                                }
                                placeholder="0"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeExpenseEntry(cat.key, entry.id)}
                              aria-label={`Remove ${cat.label} expense`}
                              className="mb-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition-colors hover:border-red-200 hover:bg-red-100 hover:text-red-600"
                            >
                              <DeleteOutlinedIcon sx={{ fontSize: 22 }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total Monthly Expenses */}
            <div className="mt-6 flex items-center justify-between rounded-xl border-2 border-brand-green-300 bg-brand-green-50/80 px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <p className="text-base font-bold text-navy-950">
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
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/income-details")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  const persisted = Object.fromEntries(
                    EXPENSE_CATEGORIES.map((cat) => [
                      cat.key,
                      String(numericValues[cat.key] || ""),
                    ])
                  );
                  updateAssessment("expenses", persisted);
                  navigate("/assets");
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
            {/* Card 1: Expense Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="flex items-center gap-2.5 mb-2 text-base font-bold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><ReceiptIcon sx={{ fontSize: 22 }} /></span>
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
            <div className="rounded-2xl border border-brand-green-200/70 bg-brand-green-50/60 p-6">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 22 }} />
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
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-6">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-amber-500">
                  <TipsAndUpdatesIcon sx={{ fontSize: 22 }} />
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
                    <span className="text-base font-bold text-navy-950">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
