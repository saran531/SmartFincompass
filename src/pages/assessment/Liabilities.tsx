import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import CurrencyInput from "./components/CurrencyInput";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShieldIcon from "@mui/icons-material/Shield";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";

const LIABILITY_CATEGORIES = [
  {
    key: "homeLoan",
    label: "Home Loan",
    desc: "Outstanding amount for\nhome loan",
    icon: HomeWorkIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    row: "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50/90",
    chartColor: "#22b573",
  },
  {
    key: "personalLoan",
    label: "Personal Loan",
    desc: "Outstanding amount for\npersonal loan",
    icon: PersonIcon,
    color: "text-sky-500 bg-sky-50",
    row: "border-sky-100 bg-sky-50/50 hover:bg-sky-50/90",
    chartColor: "#3b82f6",
  },
  {
    key: "vehicleLoan",
    label: "Vehicle Loan",
    desc: "Outstanding amount for\nvehicle loan",
    icon: DirectionsCarIcon,
    color: "text-violet-500 bg-violet-50",
    row: "border-violet-100 bg-violet-50/50 hover:bg-violet-50/90",
    chartColor: "#8b5cf6",
  },
  {
    key: "creditCard",
    label: "Credit Card",
    desc: "Total outstanding credit\ncard dues",
    icon: CreditCardIcon,
    color: "text-pink-500 bg-pink-50",
    row: "border-pink-100 bg-pink-50/50 hover:bg-pink-50/90",
    chartColor: "#ec4899",
  },
  {
    key: "educationLoan",
    label: "Education Loan",
    desc: "Outstanding amount for\neducation loan",
    icon: SchoolIcon,
    color: "text-amber-500 bg-amber-50",
    row: "border-amber-100 bg-amber-50/50 hover:bg-amber-50/90",
    chartColor: "#f59e0b",
  },
  {
    key: "other",
    label: "Other",
    desc: "Any other outstanding\nliabilities",
    icon: MoreHorizIcon,
    color: "text-teal-500 bg-teal-50",
    row: "border-teal-100 bg-teal-50/50 hover:bg-teal-50/90",
    chartColor: "#0d9488",
  },
];

const CHART_LEGEND = [
  { key: "homeLoan", label: "Home Loan", color: "#22b573" },
  { key: "personalLoan", label: "Personal Loan", color: "#3b82f6" },
  { key: "vehicleLoan", label: "Vehicle Loan", color: "#8b5cf6" },
  { key: "creditCard", label: "Credit Card", color: "#ec4899" },
  { key: "educationLoan", label: "Education Loan", color: "#f59e0b" },
  { key: "other", label: "Other Liabilities", color: "#0d9488" },
];

interface OtherLiabilityEntry {
  id: string;
  description: string;
  amount: string;
}

let otherLiabilityIdSeq = 0;
const createOtherLiabilityId = () => `other-liability-${++otherLiabilityIdSeq}`;

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
        <span className="text-xl font-black text-navy-950">
          ₹{total.toLocaleString("en-IN")}
        </span>
        <span className="text-center text-xs font-medium text-slate-500">
          Total Liabilities
        </span>
      </div>
    </div>
  );
}

export default function Liabilities() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();

  const savedLiab = assessmentData.liabilities || {};
  const [amounts, setAmounts] = useState<Record<string, string>>({
    homeLoan: savedLiab.homeLoan || "",
    personalLoan: savedLiab.personalLoan || "",
    vehicleLoan: savedLiab.carLoan || "",
    creditCard: savedLiab.creditCard || "",
    educationLoan: savedLiab.educationLoan || "",
  });

  const savedOtherLiabilities = (
    savedLiab as unknown as { otherLiabilities?: Array<{
      description?: string;
      amount?: string;
    }> }
  ).otherLiabilities;

  const [otherLiabilities, setOtherLiabilities] = useState<
    OtherLiabilityEntry[]
  >(() =>
    Array.isArray(savedOtherLiabilities) && savedOtherLiabilities.length > 0
      ? (savedOtherLiabilities as Array<{
          description?: string;
          amount?: string;
        }>).map((entry) => ({
          id: createOtherLiabilityId(),
          description: entry.description || "",
          amount: entry.amount || "",
        }))
      : savedLiab.other
      ? [{ id: createOtherLiabilityId(), description: savedLiab.otherName || "", amount: savedLiab.other }]
      : []
  );

  const otherTotal = useMemo(
    () => otherLiabilities.reduce((acc, item) => acc + parseMoney(item.amount), 0),
    [otherLiabilities]
  );

  const numericValues = useMemo(
    () => {
      const values = Object.fromEntries(
        Object.entries(amounts).map(([k, v]) => [k, parseFloat(v) || 0])
      ) as Record<string, number>;
      values.other = otherTotal;
      return values;
    },
    [amounts, otherTotal]
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

  const addOtherLiability = () => {
    setOtherLiabilities((prev) => [
      ...prev,
      { id: createOtherLiabilityId(), description: "", amount: "" },
    ]);
  };

  const updateOtherLiability = (
    id: string,
    patch: Partial<{ description: string; amount: string }>
  ) => {
    setOtherLiabilities((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  const removeOtherLiability = (id: string) => {
    setOtherLiabilities((prev) => prev.filter((item) => item.id !== id));
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
          currentStep={6}
          title="Liabilities"
          subtitle="Provide details of your liabilities to help us understand your financial obligations."
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-6">
            <div className="mb-6">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <CreditCardIcon sx={{ fontSize: 24 }} />
                </span>
              <p className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
                Add Your Liabilities
              </p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Enter the outstanding amount for each liability
              </p>
            </div>

            {/* Liability Rows */}
            <div className="space-y-4">
              {LIABILITY_CATEGORIES.map((cat) => {
                if (cat.key === "other") {
                  const otherCatTotal = numericValues.other || 0;
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
                          <p className="text-sm font-bold text-navy-950">
                            {cat.label}
                          </p>
                          <p className="mt-0.5 whitespace-pre-line text-xs font-medium text-slate-600">
                            {cat.desc}
                          </p>
                        </div>
                        <div className="ml-auto flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <div className="relative w-[170px] shrink-0 sm:w-[200px]">
                          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-base font-extrabold text-navy-950">
                            ₹
                          </span>
                          <input
                            type="text"
                            value={
                              otherCatTotal > 0
                                ? otherCatTotal.toLocaleString("en-IN", {
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
                          onClick={addOtherLiability}
                          className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-brand-green-400 px-3.5 py-2.5 text-sm font-bold text-brand-green-700 transition-all hover:-translate-y-0.5 hover:border-brand-green-500 hover:bg-brand-green-50 hover:shadow-sm sm:px-4"
                        >
                          + Add Other Liability
                        </button>
                        </div>
                      </div>

                      {otherLiabilities.length > 0 && (
                        <div className="space-y-3 border-t border-slate-200/80 px-4 pb-4 pt-4">
                          {otherLiabilities.map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-end gap-3 rounded-xl border border-navy-950/10 bg-white p-3 shadow-xs sm:gap-4 sm:p-4"
                            >
                              <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                  <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
                                    <span className="label-icon"><CreditCardIcon sx={{ fontSize: 15 }} /></span>
                                    Liability Type
                                  </label>
                                  <input
                                    type="text"
                                    value={entry.description}
                                    onChange={(e) =>
                                      updateOtherLiability(entry.id, {
                                        description: e.target.value,
                                      })
                                    }
                                    placeholder="e.g. Gold Loan, Business Loan..."
                                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm sm:text-base font-semibold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                                  />
                                </div>
                                <CurrencyInput
                                  label="Outstanding Amount (₹)"
                                  value={entry.amount}
                                  onChange={(v) =>
                                    updateOtherLiability(entry.id, { amount: v })
                                  }
                                  placeholder="0"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeOtherLiability(entry.id)}
                                aria-label="Remove other liability"
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
                }

                return (
                  <div
                    key={cat.key}
                    className={`flex flex-wrap items-center gap-3 rounded-xl border p-4 transition-colors sm:gap-4 ${cat.row}`}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${cat.color}`}
                    >
                      <cat.icon sx={{ fontSize: 28 }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-navy-950">
                        {cat.label}
                      </p>
                      <p className="mt-0.5 whitespace-pre-line text-xs font-medium text-slate-600">
                        {cat.desc}
                      </p>
                    </div>
                    <div className="relative ml-auto w-[170px] shrink-0 sm:w-[200px]">
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
                );
              })}
            </div>

            {/* Total Outstanding Amount */}
            <div className="mt-6 flex items-center justify-between rounded-xl border-2 border-brand-green-300 bg-brand-green-50/80 px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-950">
                    Total Outstanding Amount
                  </p>
                  <p className="text-xs font-medium text-slate-700">
                    Sum of all your liabilities
                  </p>
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
                onClick={() => navigate("/assets")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  const payload = {
                    ...amounts,
                    other: String(otherTotal || ""),
                    otherName:
                      otherLiabilities.map((e) => e.description).find(Boolean) ||
                      "",
                    otherLiabilities: otherLiabilities.map(({ description, amount }) => ({
                      description,
                      amount,
                    })),
                  };
                  updateAssessment("liabilities", payload);
                  navigate("/savings");
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
            {/* Card 1: Liabilities Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="flex items-center gap-2.5 mb-2 text-base font-bold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><CreditCardIcon sx={{ fontSize: 22 }} /></span>
                Liabilities Summary
              </h3>
              <p className="mb-4 text-sm font-medium text-slate-700">
                Total Outstanding Amount
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
                        <span className="font-medium text-slate-700">{item.label}</span>
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

            {/* Card 2: Why Report Liabilities? */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why Report Liabilities?
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Understanding your liabilities helps us assess your
                debt-to-income ratio and provide personalized recommendations
                for better financial health.
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
