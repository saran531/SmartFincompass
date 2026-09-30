import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShieldIcon from "@mui/icons-material/Shield";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import aiProcessingImage from "../Assets/images/AIProcessing.png";

type StageStatus = "completed" | "in-progress" | "pending";

interface ProcessingStage {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  iconColor: string;
  status: StageStatus;
}

const INITIAL_STAGES: ProcessingStage[] = [
  {
    key: "income",
    title: "Analyzing Income...",
    desc: "Reviewing your income sources and stability",
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-brand-green-50 text-brand-green-600",
    status: "completed",
  },
  {
    key: "expenses",
    title: "Analyzing Expenses...",
    desc: "Categorizing your expenses and spending patterns",
    icon: <ShoppingCartIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-orange-50 text-orange-600",
    status: "in-progress",
  },
  {
    key: "risk",
    title: "Calculating Risk...",
    desc: "Assessing your financial risk profile and capacity",
    icon: <ShieldIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-purple-50 text-purple-600",
    status: "pending",
  },
  {
    key: "report",
    title: "Generating Report...",
    desc: "Creating your personalized financial wellness report",
    icon: <DescriptionIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-sky-50 text-sky-600",
    status: "pending",
  },
];

function LoadingDots({ color }: { color: string }) {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      <span
        className={`absolute h-5 w-5 rounded-full border-2 border-dashed ${color} animate-spin`}
        style={{ animationDuration: "2s" }}
      />
    </span>
  );
}

export default function AiProcessing() {
  const navigate = useNavigate();
  const { completeAssessment } = useApp();
  const [stages, setStages] = useState<ProcessingStage[]>(INITIAL_STAGES);
  const [progress, setProgress] = useState(62);
  const completedRef = useRef(false);

  useEffect(() => {
    if (completedRef.current) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Stage 2: Expenses completes at ~8s
    timers.push(
      setTimeout(() => {
        if (completedRef.current) return;
        setStages((prev) =>
          prev.map((s) =>
            s.key === "expenses" ? { ...s, status: "completed" as const } : s
          )
        );
        setProgress(78);
      }, 8000)
    );

    // Stage 3: Risk begins at ~9s, completes at ~14s
    timers.push(
      setTimeout(() => {
        if (completedRef.current) return;
        setStages((prev) =>
          prev.map((s) =>
            s.key === "risk" ? { ...s, status: "in-progress" as const } : s
          )
        );
        setProgress(85);
      }, 9000)
    );

    timers.push(
      setTimeout(() => {
        if (completedRef.current) return;
        setStages((prev) =>
          prev.map((s) =>
            s.key === "risk" ? { ...s, status: "completed" as const } : s
          )
        );
        setProgress(92);
      }, 14000)
    );

    // Stage 4: Report begins at ~15s, completes at ~20s
    timers.push(
      setTimeout(() => {
        if (completedRef.current) return;
        setStages((prev) =>
          prev.map((s) =>
            s.key === "report" ? { ...s, status: "in-progress" as const } : s
          )
        );
        setProgress(96);
      }, 15000)
    );

    timers.push(
      setTimeout(() => {
        if (completedRef.current) return;
        completedRef.current = true;
        setStages((prev) =>
          prev.map((s) => ({ ...s, status: "completed" as const }))
        );
        setProgress(100);
      }, 20000)
    );

    // Navigate after completion
    timers.push(
      setTimeout(() => {
        if (completedRef.current) {
          completeAssessment();
          navigate("/financial-dashboard");
        }
      }, 22000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [navigate, completeAssessment]);

  const getStatusDisplay = (status: StageStatus) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircleIcon sx={{ fontSize: 20 }} className="text-brand-green-500" />,
          text: "Completed",
          textColor: "text-brand-green-600",
        };
      case "in-progress":
        return {
          icon: <LoadingDots color="border-orange-400" />,
          text: "In Progress",
          textColor: "text-orange-500",
        };
      case "pending":
        return {
          icon: <LoadingDots color="border-navy-950/20" />,
          text: "Pending",
          textColor: "text-navy-900/45",
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
        {/* ─── Heading ─── */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
            AI Analysis in Progress
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy-900/55">
            Our AI is analyzing your financial data to create personalized
            insights and recommendations for you.
          </p>
        </div>

        {/* ─── AI Illustration ─── */}
        <div className="mt-8 flex justify-center">
          <img
            src={aiProcessingImage}
            alt="AI Processing illustration"
            className="h-auto max-h-[480px] w-full max-w-[680px] object-contain"
          />
        </div>

        {/* ─── Overall Progress Card ─── */}
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-navy-950/5 bg-white p-8 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
          <p className="text-center text-sm font-bold text-navy-950">
            Overall Progress
          </p>
          <p className="mt-2 text-center text-4xl font-extrabold text-brand-green-500">
            {progress}%
          </p>

          {/* Progress Bar */}
          <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-navy-950/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-green-500 to-brand-green-400 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-4 text-center text-sm text-navy-900/55">
            Please wait while we analyze your financial information...
          </p>

          {/* Status List */}
          <div className="mt-6 rounded-xl border border-navy-950/5">
            {stages.map((stage, idx) => {
              const statusDisplay = getStatusDisplay(stage.status);
              return (
                <div
                  key={stage.key}
                  className={`flex items-center gap-4 p-4 ${
                    idx < stages.length - 1
                      ? "border-b border-navy-950/5"
                      : ""
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stage.iconColor}`}
                  >
                    {stage.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-navy-950">
                      {stage.title}
                    </p>
                    <p className="text-xs text-navy-900/50">{stage.desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {statusDisplay.icon}
                    <span
                      className={`text-xs font-semibold ${statusDisplay.textColor}`}
                    >
                      {statusDisplay.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Info Box ─── */}
        <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-brand-green-500/20 bg-brand-green-50/40 p-5">
          <div className="flex items-center gap-3">
            <AutoAwesomeIcon
              sx={{ fontSize: 20 }}
              className="shrink-0 text-brand-green-500"
            />
            <p className="text-sm text-navy-900/60">
              This may take a few moments. Our AI is ensuring detailed and
              accurate insights just for you.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
