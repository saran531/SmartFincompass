import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
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

const PROGRESS_STEPS = [
  { label: "Personal Info", completed: true },
  { label: "Employment", completed: true },
  { label: "Income Sources", completed: true },
  { label: "Expenses", completed: true },
  { label: "Assets", completed: true },
  { label: "Liabilities", completed: true },
  { label: "Financial Goals", completed: true },
  { label: "Documents", active: true },
];

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
    icon: <FlagIcon sx={{ fontSize: 28 }} />,
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
    icon: <HomeWorkIcon sx={{ fontSize: 28 }} />,
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
    icon: <MenuBookIcon sx={{ fontSize: 28 }} />,
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
    icon: <FavoriteIcon sx={{ fontSize: 28 }} />,
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
    icon: <ShieldIcon sx={{ fontSize: 28 }} />,
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
    icon: <FlightIcon sx={{ fontSize: 28 }} />,
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
    icon: <BusinessCenterIcon sx={{ fontSize: 28 }} />,
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
    icon: <MoreHorizIcon sx={{ fontSize: 28 }} />,
    color: "bg-slate-100 text-slate-600",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className="text-navy-900/50"
              />
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
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-navy-900/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <button className="relative grid h-10 w-10 place-items-center rounded-full text-navy-900/60">
                <NotificationsNoneIcon sx={{ fontSize: 22 }} />
              </button>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                VG
              </span>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* ─── TOP ROW: Title + Assessment Progress ─── */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Financial Goals
            </h1>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-700">
              Define your goals and priorities so we can help you build the right financial roadmap.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-bold text-brand-green-700">
                Step 10 of 12
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(100%-80px)] bg-slate-200" />
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(100%-80px)] bg-brand-green-500" />
              <div className="flex items-start justify-between">
                {PROGRESS_STEPS.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center text-center"
                    style={{ width: `${100 / 8}%` }}
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        step.completed
                          ? "bg-brand-green-500 text-white shadow-[0_0_10px_rgba(34,181,115,0.25)]"
                          : step.active
                          ? "bg-brand-green-500 text-white shadow-[0_0_10px_rgba(34,181,115,0.25)]"
                          : "border-2 border-slate-300 bg-white text-slate-600"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircleIcon sx={{ fontSize: 18 }} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <p
                      className={`mt-2 text-[10px] font-bold leading-tight ${
                        step.active
                          ? "text-brand-green-700"
                          : step.completed
                          ? "text-brand-green-700"
                          : "text-slate-600"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-8">
            {/* ── Select Your Financial Goals ── */}
            <div className="mb-10">
              <p className="text-base font-bold text-navy-950">
                Select Your Financial Goals
              </p>
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
                        <p className="text-sm font-bold text-navy-950">
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
            <div className="mb-8">
              <p className="text-base font-bold text-navy-950">
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
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${goal.color}`}
                      >
                        {goal.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-navy-950">
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
                className="flex h-12 items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-6 text-sm font-bold text-brand-green-600 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  updateAssessment("goals", { selectedGoals, goalPriorities: renderedPriorities });
                  navigate("/government-documents");
                }}
                className="flex h-12 items-center gap-2 rounded-xl bg-brand-green-500 px-8 text-[15px] font-bold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
              <LockIcon sx={{ fontSize: 16 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Goal Timeline */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="mb-1 text-base font-bold text-navy-950">
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
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${goal.color}`}
                          >
                            {goal.icon}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-navy-950">
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
            <div className="rounded-2xl border border-brand-green-200/70 bg-brand-green-50/60 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 18 }} />
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
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <ShieldIcon sx={{ fontSize: 18 }} />
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

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-950 pt-20 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white">
                  <ExploreIcon fontSize="small" />
                </span>
                <span className="text-xl font-bold leading-tight text-white">
                  SmartFin
                  <span className="block -mt-1 text-brand-green-400">
                    Compass
                  </span>
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-sm font-normal leading-relaxed text-slate-300">
                AI-powered financial wellness platform that helps you make
                smarter financial decisions.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, LinkedInIcon, TwitterIcon, InstagramIcon].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all duration-200 hover:scale-110 hover:bg-brand-green-500 hover:text-white"
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </a>
                  )
                )}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-bold text-white">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-slate-300 transition-colors duration-200 hover:text-brand-green-400"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-sm font-bold text-white">Contact Us</p>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
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

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-slate-400 sm:flex-row">
            <p>© 2025 SmartFin Compass. All rights reserved.</p>
            <div className="flex gap-5">
              <a
                href="#"
                className="transition-colors duration-200 hover:text-brand-green-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="transition-colors duration-200 hover:text-brand-green-400"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
