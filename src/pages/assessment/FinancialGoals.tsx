import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import FlagIcon from "@mui/icons-material/Flag";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlightIcon from "@mui/icons-material/Flight";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";
import AssessmentHeader from "../../components/AssessmentHeader";

interface GoalDef {
  key: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  timeline: string;
  timelineRange: string;
  priorityDesc: string;
  priorityLabel: string;
  priorityColor: string;
}

const GOALS: GoalDef[] = [
  {
    key: "emergency",
    label: "Emergency Fund",
    desc: "Build a safety net for unexpected expenses",
    icon: <FlagIcon sx={{ fontSize: 30 }} />,
    color: "bg-brand-green-50 text-brand-green-600",
    timeline: "Short Term",
    timelineRange: "Within 1 year",
    priorityDesc: "My top priority is to build a strong emergency fund",
    priorityLabel: "Highest",
    priorityColor: "bg-brand-green-500",
  },
  {
    key: "home",
    label: "Home",
    desc: "Buy your dream home",
    icon: <HomeWorkIcon sx={{ fontSize: 30 }} />,
    color: "bg-amber-50 text-amber-600",
    timeline: "Medium Term",
    timelineRange: "1 - 5 years",
    priorityDesc: "Want to own a home for my family",
    priorityLabel: "High",
    priorityColor: "bg-amber-500",
  },
  {
    key: "education",
    label: "Education",
    desc: "Plan for higher education",
    icon: <MenuBookIcon sx={{ fontSize: 30 }} />,
    color: "bg-blue-50 text-blue-600",
    timeline: "Medium to Long Term",
    timelineRange: "3 - 7 years",
    priorityDesc: "Planning for my children's higher education",
    priorityLabel: "Medium",
    priorityColor: "bg-blue-500",
  },
  {
    key: "marriage",
    label: "Marriage",
    desc: "Plan for a happy married life",
    icon: <FavoriteIcon sx={{ fontSize: 30 }} />,
    color: "bg-pink-50 text-pink-600",
    timeline: "Medium Term",
    timelineRange: "2 - 5 years",
    priorityDesc: "Planning for our future marriage",
    priorityLabel: "Medium",
    priorityColor: "bg-blue-500",
  },
  {
    key: "retirement",
    label: "Retirement",
    desc: "Secure and enjoy your retirement",
    icon: <ShieldIcon sx={{ fontSize: 30 }} />,
    color: "bg-emerald-50 text-emerald-600",
    timeline: "Long Term",
    timelineRange: "10+ years",
    priorityDesc: "Financial freedom in retirement",
    priorityLabel: "Low",
    priorityColor: "bg-orange-500",
  },
  {
    key: "travel",
    label: "Travel",
    desc: "Explore the world with ease",
    icon: <FlightIcon sx={{ fontSize: 30 }} />,
    color: "bg-sky-50 text-sky-600",
    timeline: "Short to Medium Term",
    timelineRange: "1 - 3 years",
    priorityDesc: "Travel and make memorable experiences",
    priorityLabel: "Low",
    priorityColor: "bg-orange-500",
  },
  {
    key: "business",
    label: "Business",
    desc: "Start or grow your own business",
    icon: <BusinessCenterIcon sx={{ fontSize: 30 }} />,
    color: "bg-purple-50 text-purple-600",
    timeline: "Medium to Long Term",
    timelineRange: "3 - 10 years",
    priorityDesc: "Build and grow my own business",
    priorityLabel: "Lower",
    priorityColor: "bg-red-400",
  },
  {
    key: "other",
    label: "Other Goal",
    desc: "Add any other financial goal",
    icon: <MoreHorizIcon sx={{ fontSize: 30 }} />,
    color: "bg-teal-50 text-teal-600",
    timeline: "Custom",
    timelineRange: "Flexible",
    priorityDesc: "Other financial objective",
    priorityLabel: "Lower",
    priorityColor: "bg-red-400",
  },
];

const TIMELINE_DOT_COLORS = [
  "bg-brand-green-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-emerald-600",
  "bg-sky-500",
  "bg-purple-500",
];

const DEFAULT_SELECTED_GOALS = ["emergency", "home", "education", "retirement"];

export default function FinancialGoals() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();

  const saved = assessmentData.goals || {};

  const [selectedGoals, setSelectedGoals] = useState<string[]>(() => {
    const raw =
      saved.selectedGoals && saved.selectedGoals.length > 0
        ? saved.selectedGoals
        : DEFAULT_SELECTED_GOALS;
    return Array.from(
      new Set(raw.filter((k: string) => GOALS.some((g) => g.key === k)))
    );
  });

  const [priorities, setPriorities] = useState<string[]>(() => {
    if (saved.goalPriorities && saved.goalPriorities.length > 0) {
      return Array.from(
        new Set(saved.goalPriorities.filter((k: string) => GOALS.some((g) => g.key === k)))
      );
    }
    return DEFAULT_SELECTED_GOALS;
  });

  const [dragIdx, setDragIdx] = useState<number | null>(null);

  // Derive rendered priorities directly & strictly from selectedGoals:
  // 1. Maintain custom order from priorities state for items currently in selectedGoals
  // 2. Append any selected item not yet in priorities
  // 3. Ensure absolute uniqueness with no duplicate entries
  const renderedPriorities = useMemo(() => {
    const result: string[] = [];
    for (const key of priorities) {
      if (selectedGoals.includes(key) && !result.includes(key)) {
        result.push(key);
      }
    }
    for (const key of selectedGoals) {
      if (!result.includes(key)) {
        result.push(key);
      }
    }
    return result;
  }, [priorities, selectedGoals]);

  const toggleGoal = (key: string) => {
    setSelectedGoals((prev) => {
      const isSelected = prev.includes(key);
      const nextSelected = isSelected
        ? prev.filter((k) => k !== key)
        : [...prev, key];

      setPriorities((prevP) => {
        if (isSelected) {
          return prevP.filter((k) => k !== key);
        } else {
          return prevP.includes(key) ? prevP : [...prevP, key];
        }
      });

      return Array.from(new Set(nextSelected));
    });
  };

  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...renderedPriorities];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(idx, 0, moved);
    setPriorities(next);
    setDragIdx(idx);
  };
  const handleDragEnd = () => setDragIdx(null);

  const getPriorityLabel = (idx: number, total: number) => {
    if (idx === 0) return "Highest";
    if (idx === 1) return "High";
    if (idx === 2) return "Lower";
    if (idx === 3) return "Low";
    if (idx < total - 1) return "Low";
    return "Lower";
  };

  const getPriorityBadgeColor = (label: string) => {
    if (label === "Highest") return "bg-brand-green-500";
    if (label === "High") return "bg-amber-500";
    if (label === "Medium") return "bg-blue-500";
    if (label === "Low") return "bg-orange-500";
    return "bg-red-400";
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
      <AssessmentHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={10}
          title="Financial Goals"
          subtitle="Define your goals and priorities so we can help you build the right financial roadmap."
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-6">
            {/* ── Select Your Financial Goals ── */}
            <div className="mb-4">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <FlagIcon sx={{ fontSize: 24 }} />
                </span>
              <p className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
                Select Your Financial Goals
              </p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Choose the goals that are important to you
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {GOALS.map((goal) => {
                  const selected = selectedGoals.includes(goal.key);
                  return (
                    <button
                      key={goal.key}
                      type="button"
                      onClick={() => toggleGoal(goal.key)}
                      className={`option-card-interactive flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center cursor-pointer transition-all duration-200 ${
                        selected
                          ? "selected border-brand-green-500 bg-brand-green-50/80 shadow-xs"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      <span
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${goal.color}`}
                      >
                        {goal.icon}
                      </span>
                      <div>
                        <p className="text-base font-bold text-navy-950">
                          {goal.label}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-600">
                          {goal.desc}
                        </p>
                      </div>
                      <span
                        className={`flex items-center gap-1.5 text-xs font-bold ${
                          selected ? "text-brand-green-700" : "text-slate-600"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
                            selected
                              ? "border-brand-green-500 bg-brand-green-500"
                              : "border-slate-400 bg-white"
                          }`}
                        >
                          {selected && (
                            <CheckCircleIcon
                              sx={{ fontSize: 14 }}
                              className="text-white"
                            />
                          )}
                        </span>
                        {selected ? "Selected" : "Select"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Set Your Goal Priorities ── */}
            <div className="mb-6">
              <p className="flex items-center gap-2 text-lg font-extrabold text-navy-950">
                <span className="label-icon"><LowPriorityIcon sx={{ fontSize: 15 }} /></span>
                Set Your Goal Priorities
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Rank your selected goals in order of importance
              </p>

              <div className="mt-5 space-y-3">
                {renderedPriorities.map((key, idx) => {
                  const goal = GOALS.find((g) => g.key === key);
                  if (!goal) return null;
                  const pLabel = getPriorityLabel(idx, renderedPriorities.length);
                  const badgeColor = getPriorityBadgeColor(pLabel);
                  return (
                    <div
                      key={key}
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-4 rounded-xl border border-slate-200/90 bg-white p-4 transition-all duration-200 ${
                        dragIdx === idx
                          ? "opacity-50 shadow-md"
                          : "hover:shadow-md hover:border-brand-green-300 hover:bg-brand-green-50/20"
                      }`}
                    >
                      <span className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing">
                        <DragIndicatorIcon sx={{ fontSize: 20 }} />
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${badgeColor}`}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${goal.color}`}
                      >
                        {goal.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-bold text-navy-950">
                          {goal.label}
                        </p>
                        <p className="text-xs font-medium text-slate-600">
                          {goal.priorityDesc}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-lg px-3 py-1 text-xs font-bold text-white ${badgeColor}`}
                      >
                        {pLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Buttons ── */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/investment-experience")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  updateAssessment("goals", { selectedGoals, goalPriorities: renderedPriorities });
                  navigate("/government-documents");
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
            {/* Card 1: Goal Timeline */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="flex items-center gap-2.5 mb-1 text-base font-bold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><FlagIcon sx={{ fontSize: 22 }} /></span>
                Goal Timeline
              </h3>
              <p className="mb-5 text-sm font-medium text-slate-700">
                When do you plan to achieve these goals?
              </p>

              <div className="relative">
                {selectedGoals.map((key, idx) => {
                  const goal = GOALS.find((g) => g.key === key);
                  if (!goal) return null;
                  const dotColor = TIMELINE_DOT_COLORS[idx % TIMELINE_DOT_COLORS.length];
                  return (
                    <div key={key} className="flex gap-4">
                      {/* Timeline line + dot */}
                      <div className="flex flex-col items-center">
                        <span
                          className={`z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${dotColor}`}
                        >
                          <span className="h-2 w-2 rounded-full bg-white" />
                        </span>
                        {idx < selectedGoals.length - 1 && (
                          <div className="w-0.5 flex-1 bg-slate-200" />
                        )}
                      </div>
                      {/* Content */}
                      <div
                        className={`flex flex-1 items-start justify-between pb-6 ${
                          idx === selectedGoals.length - 1 ? "pb-0" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${goal.color}`}
                          >
                            {goal.icon}
                          </span>
                          <div>
                            <p className="text-base font-bold text-navy-950">
                              {goal.label}
                            </p>
                            <p className="text-xs font-medium text-slate-600">
                              {goal.timeline}
                            </p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          {goal.timelineRange}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-100 p-4">
                <CalendarTodayIcon
                  sx={{ fontSize: 18 }}
                  className="mt-0.5 shrink-0 text-slate-600"
                />
                <p className="text-xs font-medium leading-relaxed text-slate-700">
                  You can update or modify goal timelines anytime in your dashboard.
                </p>
              </div>
            </div>

            {/* Card 2: Why Set Financial Goals? */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why Set Financial Goals?
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Clear goals give direction to your money, help you stay focused, and achieve financial freedom faster.
              </p>
            </div>

            {/* Card 3: We're Here to Help */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <ShieldIcon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  We're Here to Help
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Our AI will analyze your goals and create a personalized plan to help you achieve them efficiently.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
