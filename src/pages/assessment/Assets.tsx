import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import CurrencyInput from "./components/CurrencyInput";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WalletIcon from "@mui/icons-material/Wallet";
import SavingsIcon from "@mui/icons-material/Savings";
import GoldIcon from "@mui/icons-material/Toll";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PieChartIcon from "@mui/icons-material/PieChart";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShieldIcon from "@mui/icons-material/Shield";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";
import AssessmentHeader from "../../components/AssessmentHeader";

const ASSET_CATEGORIES = [
  {
    key: "bankBalance",
    label: "Bank Balance",
    desc: "Total balance in all\nsavings & current accounts",
    icon: AccountBalanceIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    row: "border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50/90",
    chartColor: "#22b573",
  },
  {
    key: "cash",
    label: "Cash",
    desc: "Physical cash you\ncurrently hold",
    icon: WalletIcon,
    color: "text-sky-500 bg-sky-50",
    row: "border-sky-100 bg-sky-50/50 hover:bg-sky-50/90",
    chartColor: "#3b82f6",
  },
  {
    key: "fixedDeposits",
    label: "Fixed Deposits (FD)",
    desc: "Total value of all your\nfixed deposits",
    icon: SavingsIcon,
    color: "text-violet-500 bg-violet-50",
    row: "border-violet-100 bg-violet-50/50 hover:bg-violet-50/90",
    chartColor: "#8b5cf6",
  },
  {
    key: "gold",
    label: "Gold",
    desc: "Current value of gold\nyou own",
    icon: GoldIcon,
    color: "text-amber-500 bg-amber-50",
    row: "border-amber-100 bg-amber-50/50 hover:bg-amber-50/90",
    chartColor: "#f59e0b",
  },
  {
    key: "property",
    label: "Property",
    desc: "Market value of your\nproperties",
    icon: HomeIcon,
    color: "text-orange-500 bg-orange-50",
    row: "border-orange-100 bg-orange-50/50 hover:bg-orange-50/90",
    chartColor: "#f97316",
  },
  {
    key: "stocks",
    label: "Stocks",
    desc: "Total value of stocks\nand shares",
    icon: TrendingUpIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    row: "border-teal-100 bg-teal-50/50 hover:bg-teal-50/90",
    chartColor: "#22b573",
  },
  {
    key: "mutualFunds",
    label: "Mutual Funds",
    desc: "Current value of all your\nmutual fund investments",
    icon: PieChartIcon,
    color: "text-purple-500 bg-purple-50",
    row: "border-purple-100 bg-purple-50/50 hover:bg-purple-50/90",
    chartColor: "#a855f7",
  },
  {
    key: "crypto",
    label: "Crypto",
    desc: "Current value of your\ncryptocurrency holdings",
    icon: CurrencyBitcoinIcon,
    color: "text-amber-600 bg-amber-50",
    row: "border-yellow-100 bg-yellow-50/50 hover:bg-yellow-50/90",
    chartColor: "#d97706",
  },
  {
    key: "vehicle",
    label: "Vehicle",
    desc: "Current market value of\nyour vehicle(s)",
    icon: DirectionsCarIcon,
    color: "text-sky-500 bg-sky-50",
    row: "border-blue-100 bg-blue-50/50 hover:bg-blue-50/90",
    chartColor: "#0ea5e9",
  },
];

type AssetEntry = {
  id: string;
  name: string;
  amount: string;
};

type MutualFundEntry = {
  id: string;
  name: string;
  type: "Lumpsum" | "SIP";
  amount: string;
};

const DYNAMIC_ASSET_CONFIG: Record<
  string,
  { addLabel: string; nameLabel: string; namePlaceholder: string } | undefined
> = {
  bankBalance: {
    addLabel: "+ Add Bank Account",
    nameLabel: "Bank Name / Account Description",
    namePlaceholder: "e.g. SBI Savings Account",
  },
  fixedDeposits: {
    addLabel: "+ Add Fixed Deposit",
    nameLabel: "FD Name / Description",
    namePlaceholder: "e.g. SBI FD",
  },
  property: {
    addLabel: "+ Add Property",
    nameLabel: "Property Description / Type",
    namePlaceholder: "e.g. Residential House",
  },
  vehicle: {
    addLabel: "+ Add Vehicle",
    nameLabel: "Vehicle Description / Type",
    namePlaceholder: "e.g. Car",
  },
  mutualFunds: {
    addLabel: "+ Add Mutual Fund",
    nameLabel: "Fund / Investment Name",
    namePlaceholder: "e.g. HDFC Flexi Cap Fund",
  },
};

let assetEntryIdSeq = 0;
const createAssetEntryId = () => `asset-${++assetEntryIdSeq}`;

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
    return ASSET_CATEGORIES.filter((c) => values[c.key] > 0).map((cat) => {
      const pct = values[cat.key] / total;
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
        <span className="text-center text-xs font-medium text-slate-500">Total Assets</span>
      </div>
    </div>
  );
}

export default function Assets() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();

  const savedAst = assessmentData.assets || {};
  const savedAstEx = savedAst as typeof savedAst & {
    mutualFundsList?: Array<{ name: string; type?: "Lumpsum" | "SIP"; amount: string }>;
  };

  const seedEntries = (
    list: Array<{ name: string; amount: string }> | undefined,
    legacyAmount: string
  ): AssetEntry[] => {
    const rows = (list || []).map((item) => ({
      id: createAssetEntryId(),
      name: item.name,
      amount: item.amount,
    }));
    if (legacyAmount && rows.length === 0) {
      rows.push({ id: createAssetEntryId(), name: "", amount: legacyAmount });
    }
    return rows;
  };

  const [assetEntries, setAssetEntries] = useState<Record<string, AssetEntry[]>>(() => ({
    bankBalance: seedEntries(savedAst.bankAccountsList, savedAst.bankAccounts),
    fixedDeposits: seedEntries(savedAst.fixedDepositsList, savedAst.fixedDeposits || ""),
    property: seedEntries(savedAst.propertyList, savedAst.realEstate),
    vehicle: seedEntries(savedAst.vehicleList, savedAst.vehicles),
  }));

  const [mutualFundEntries, setMutualFundEntries] = useState<MutualFundEntry[]>(() => {
    const saved = savedAstEx.mutualFundsList;
    if (saved && saved.length > 0) {
      return saved.map((item) => ({
        id: createAssetEntryId(),
        name: item.name,
        type: item.type === "SIP" ? "SIP" : "Lumpsum",
        amount: item.amount,
      }));
    }
    const info = savedAst.mutualFundInfo;
    if (info?.mode === "SIP" && info.sipAmount) {
      return [{ id: createAssetEntryId(), name: "", type: "SIP" as const, amount: info.sipAmount }];
    }
    if (info?.mode === "Lumpsum" && info.lumpsumAmount) {
      return [{ id: createAssetEntryId(), name: "", type: "Lumpsum" as const, amount: info.lumpsumAmount }];
    }
    return savedAst.mutualFunds
      ? [{ id: createAssetEntryId(), name: "", type: "Lumpsum" as const, amount: savedAst.mutualFunds }]
      : [];
  });

  const [amounts, setAmounts] = useState<Record<string, string>>({
    cash: "",
    gold: savedAst.gold || "",
    stocks: savedAst.stocks || "",
    crypto: savedAst.crypto || "",
  });

  const sumRows = (rows: Array<{ amount: string }>) =>
    rows.reduce((acc, item) => acc + parseMoney(item.amount), 0);

  const bankTotal = useMemo(() => sumRows(assetEntries.bankBalance || []), [assetEntries]);
  const fdTotal = useMemo(() => sumRows(assetEntries.fixedDeposits || []), [assetEntries]);
  const propertyTotal = useMemo(() => sumRows(assetEntries.property || []), [assetEntries]);
  const vehicleTotal = useMemo(() => sumRows(assetEntries.vehicle || []), [assetEntries]);
  const mutualFundTotal = useMemo(() => sumRows(mutualFundEntries), [mutualFundEntries]);

  const numericValues = useMemo(() => {
    const simple = (k: string) => parseMoney(amounts[k]);
    return {
      bankBalance: bankTotal,
      cash: simple("cash"),
      fixedDeposits: fdTotal,
      gold: simple("gold"),
      property: propertyTotal,
      stocks: simple("stocks"),
      mutualFunds: mutualFundTotal,
      crypto: simple("crypto"),
      vehicle: vehicleTotal,
    } as Record<string, number>;
  }, [bankTotal, fdTotal, propertyTotal, vehicleTotal, mutualFundTotal, amounts]);

  const grandTotal = useMemo(
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

  const addEntry = (key: string) =>
    setAssetEntries((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { id: createAssetEntryId(), name: "", amount: "" }],
    }));

  const updateEntry = (key: string, id: string, patch: Partial<AssetEntry>) =>
    setAssetEntries((prev) => ({
      ...prev,
      [key]: (prev[key] || []).map((entry) =>
        entry.id === id ? { ...entry, ...patch } : entry
      ),
    }));

  const removeEntry = (key: string, id: string) =>
    setAssetEntries((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((entry) => entry.id !== id),
    }));

  const addMutualFund = () =>
    setMutualFundEntries((prev) => [
      ...prev,
      { id: createAssetEntryId(), name: "", type: "Lumpsum", amount: "" },
    ]);

  const updateMutualFund = (id: string, patch: Partial<MutualFundEntry>) =>
    setMutualFundEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry))
    );

  const removeMutualFund = (id: string) =>
    setMutualFundEntries((prev) => prev.filter((entry) => entry.id !== id));

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
      <AssessmentHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={5}
          title="Assets"
          subtitle="Add details of your assets to get a complete picture of your net worth."
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-6">
            <div className="mb-6">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <AccountBalanceIcon sx={{ fontSize: 24 }} />
                </span>
              <p className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
                Add Your Assets
              </p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Enter the current value of your assets
              </p>
            </div>

            {/* Asset Rows */}
            <div className="space-y-4">
              {ASSET_CATEGORIES.map((cat) => {
                const dynamic = DYNAMIC_ASSET_CONFIG[cat.key];

                if (!dynamic) {
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
                        <p className="text-base font-bold text-navy-950">
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
                }

                const catEntries =
                  cat.key === "mutualFunds"
                    ? mutualFundEntries
                    : assetEntries[cat.key] || [];
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
                      <div className="ml-auto flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
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
                          onClick={() =>
                            cat.key === "mutualFunds"
                              ? addMutualFund()
                              : addEntry(cat.key)
                          }
                          className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-brand-green-400 px-3.5 py-2.5 text-sm font-bold text-brand-green-700 transition-all hover:-translate-y-0.5 hover:border-brand-green-500 hover:bg-brand-green-50 hover:shadow-sm sm:px-4"
                        >
                          {dynamic.addLabel}
                        </button>
                      </div>
                    </div>

                    {catEntries.length > 0 && (
                      <div className="space-y-3 border-t border-slate-200/80 px-4 pb-4 pt-4">
                        {catEntries.map((entry) =>
                          cat.key === "mutualFunds" ? (
                            <div
                              key={entry.id}
                              className="flex items-end gap-3 rounded-xl border border-navy-950/10 bg-white p-3 shadow-xs sm:gap-4 sm:p-4"
                            >
                              <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                  <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
                                    <span className="label-icon"><Inventory2Icon sx={{ fontSize: 15 }} /></span>
                                    {dynamic.nameLabel}
                                  </label>
                                  <input
                                    type="text"
                                    value={entry.name}
                                    onChange={(e) =>
                                      updateMutualFund(entry.id, {
                                        name: e.target.value,
                                      })
                                    }
                                    placeholder={dynamic.namePlaceholder}
                                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm sm:text-base font-semibold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
                                    <span className="label-icon"><PieChartIcon sx={{ fontSize: 15 }} /></span>
                                    Investment Type
                                  </label>
                                  <select
                                    value={(entry as MutualFundEntry).type}
                                    onChange={(e) =>
                                      updateMutualFund(entry.id, {
                                        type: e.target.value as "Lumpsum" | "SIP",
                                      })
                                    }
                                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm sm:text-base font-semibold text-navy-950 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                                  >
                                    <option value="Lumpsum">Lumpsum</option>
                                    <option value="SIP">SIP</option>
                                  </select>
                                </div>
                                <CurrencyInput
                                  label="Amount (₹)"
                                  value={entry.amount}
                                  onChange={(v) =>
                                    updateMutualFund(entry.id, { amount: v })
                                  }
                                  placeholder="0"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeMutualFund(entry.id)}
                                aria-label={`Remove ${cat.label} entry`}
                                className="mb-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition-colors hover:border-red-200 hover:bg-red-100 hover:text-red-600"
                              >
                                <DeleteOutlinedIcon sx={{ fontSize: 22 }} />
                              </button>
                            </div>
                          ) : (
                            <div
                              key={entry.id}
                              className="flex items-end gap-3 rounded-xl border border-navy-950/10 bg-white p-3 shadow-xs sm:gap-4 sm:p-4"
                            >
                              <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                  <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
                                    <span className="label-icon"><Inventory2Icon sx={{ fontSize: 15 }} /></span>
                                    {dynamic.nameLabel}
                                  </label>
                                  <input
                                    type="text"
                                    value={entry.name}
                                    onChange={(e) =>
                                      updateEntry(cat.key, entry.id, {
                                        name: e.target.value,
                                      })
                                    }
                                    placeholder={dynamic.namePlaceholder}
                                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm sm:text-base font-semibold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                                  />
                                </div>
                                <CurrencyInput
                                  label="Amount (₹)"
                                  value={entry.amount}
                                  onChange={(v) =>
                                    updateEntry(cat.key, entry.id, {
                                      amount: v,
                                    })
                                  }
                                  placeholder="0"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeEntry(cat.key, entry.id)}
                                aria-label={`Remove ${cat.label} entry`}
                                className="mb-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition-colors hover:border-red-200 hover:bg-red-100 hover:text-red-600"
                              >
                                <DeleteOutlinedIcon sx={{ fontSize: 22 }} />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total Assets Value */}
            <div className="mt-6 flex items-center justify-between rounded-xl border-2 border-brand-green-300 bg-brand-green-50/80 px-5 py-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <p className="text-base font-bold text-navy-950">
                    Total Assets Value
                  </p>
                  <p className="text-xs font-medium text-slate-700">
                    Sum of all your assets
                  </p>
                </div>
              </div>
              <span className="text-xl font-black text-brand-green-700">
                ₹
                {grandTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/monthly-expenses")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  const lumpsumSum = mutualFundEntries
                    .filter((e) => e.type === "Lumpsum")
                    .reduce((acc, e) => acc + parseMoney(e.amount), 0);
                  const sipSum = mutualFundEntries
                    .filter((e) => e.type === "SIP")
                    .reduce((acc, e) => acc + parseMoney(e.amount), 0);
                  const mfMode = lumpsumSum > 0 && sipSum === 0
                    ? "Lumpsum"
                    : sipSum > 0 && lumpsumSum === 0
                    ? "SIP"
                    : mutualFundEntries.length > 0
                    ? "Lumpsum"
                    : "";
                  const payload = {
                    cash: amounts.cash || "",
                    gold: amounts.gold || "",
                    stocks: amounts.stocks || "",
                    crypto: amounts.crypto || "",
                    bankAccounts: String(bankTotal || ""),
                    fixedDeposits: String(fdTotal || ""),
                    realEstate: String(propertyTotal || ""),
                    vehicles: String(vehicleTotal || ""),
                    mutualFunds: String(mutualFundTotal || ""),
                    bankAccountsList: assetEntries.bankBalance || [],
                    fixedDepositsList: assetEntries.fixedDeposits || [],
                    propertyList: assetEntries.property || [],
                    vehicleList: assetEntries.vehicle || [],
                    mutualFundsList: mutualFundEntries,
                    mutualFundInfo: {
                      mode: mfMode,
                      lumpsumAmount: String(lumpsumSum || ""),
                      sipAmount: String(sipSum || ""),
                    },
                  };
                  updateAssessment("assets", payload);
                  navigate("/liabilities");
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
            {/* Card 1: Assets Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="flex items-center gap-2.5 mb-2 text-base font-bold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><AccountBalanceIcon sx={{ fontSize: 22 }} /></span>
                Assets Summary
              </h3>
              <p className="mb-4 text-sm font-medium text-slate-700">
                Total Assets Value
              </p>
              <p className="mb-5 text-2xl font-black text-brand-green-700">
                ₹
                {grandTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <DonutChart values={numericValues} total={grandTotal} />

              {/* Legend */}
              <div className="mt-5 space-y-2.5">
                {ASSET_CATEGORIES.map((cat) => {
                  const val = numericValues[cat.key];
                  const pct = grandTotal > 0 ? Math.round((val / grandTotal) * 100) : 0;
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

            {/* Card 2: Why Track Your Assets? */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why Track Your Assets?
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Knowing your assets helps us calculate your net worth and build
                a stronger financial plan for your future.
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
