import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShieldIcon from "@mui/icons-material/Shield";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import aiProcessingImage from "../Assets/images/AIProcessing.png";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-950 pt-20 text-white/70">
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
              <p className="mt-5 max-w-xs text-sm leading-relaxed">
                AI-powered financial wellness platform that helps you make
                smarter financial decisions.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, LinkedInIcon, TwitterIcon, InstagramIcon].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-all duration-200 hover:scale-110 hover:bg-brand-green-500 hover:text-white"
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
                        className="text-sm transition-colors duration-200 hover:text-brand-green-400"
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
              <ul className="mt-5 space-y-4 text-sm">
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

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs sm:flex-row">
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
