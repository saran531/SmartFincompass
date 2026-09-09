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
import ShieldIcon from "@mui/icons-material/Shield";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import BadgeIcon from "@mui/icons-material/Badge";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PublicIcon from "@mui/icons-material/Public";
import CakeIcon from "@mui/icons-material/Cake";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
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
  { label: "Income", completed: true },
  { label: "Expenses", completed: true },
  { label: "Assets", completed: true },
  { label: "Liabilities", completed: true },
  { label: "Savings", completed: true },
  { label: "Insurance", completed: true },
  { label: "Investment", completed: true },
  { label: "Goals", completed: true },
  { label: "Documents", active: true },
  { label: "Review", completed: false },
];

interface DocumentDef {
  key: string;
  name: string;
  question: string;
  desc: string;
  icon: React.ReactNode;
  iconColor: string;
  category?: string;
}

const GENERAL_DOCUMENTS: DocumentDef[] = [
  {
    key: "aadhaar",
    name: "Aadhaar",
    question: "Do you have an Aadhaar Card?",
    desc: "Proof of Identity & Address",
    icon: <FingerprintIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-amber-50 text-amber-600",
  },
  {
    key: "pan",
    name: "PAN",
    question: "Do you have a PAN Card?",
    desc: "Permanent Account Number",
    icon: <CreditCardIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-sky-50 text-sky-600",
  },
  {
    key: "passport",
    name: "Passport",
    question: "Do you have a Passport?",
    desc: "Identity for International Use",
    icon: <MenuBookIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-purple-50 text-purple-600",
  },
  {
    key: "drivingLicence",
    name: "Driving Licence",
    question: "Do you have a Driving Licence?",
    desc: "Proof to drive vehicles",
    icon: <DriveEtaIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-orange-50 text-orange-600",
  },
  {
    key: "voterId",
    name: "Voter ID",
    question: "Do you have a Voter ID?",
    desc: "Electoral Identity Card",
    icon: <BadgeIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-indigo-50 text-indigo-600",
  },
  {
    key: "twoWheelerRC",
    name: "2 Wheeler Registration Certificate",
    question: "Do you have a 2 Wheeler Registration Certificate?",
    desc: "Two-wheeler registration proof",
    icon: <TwoWheelerIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-teal-50 text-teal-600",
  },
  {
    key: "fourWheelerRC",
    name: "4 Wheeler Registration Certificate",
    question: "Do you have a 4 Wheeler Registration Certificate?",
    desc: "Four-wheeler registration proof",
    icon: <DirectionsCarIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    key: "insurance",
    name: "Insurance",
    question: "Do you have Insurance?",
    desc: "Life / Health / Term / Vehicle Insurance",
    icon: <HealthAndSafetyIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    key: "marriageCertificate",
    name: "Marriage Certificate",
    question: "Do you have a Marriage Certificate?",
    desc: "Legal proof of marriage",
    icon: <FamilyRestroomIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-rose-50 text-rose-600",
  },
  {
    key: "communityCertificate",
    name: "Community Certificate",
    question: "Do you have a Community Certificate?",
    desc: "Category / Caste / Community proof",
    icon: <GroupsIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-amber-50 text-amber-700",
  },
  {
    key: "birthCertificate",
    name: "Birth Certificate",
    question: "Do you have a Birth Certificate?",
    desc: "Official proof of date of birth",
    icon: <CakeIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-cyan-50 text-cyan-600",
  },
  {
    key: "rationCard",
    name: "Ration Card",
    question: "Do you have a Ration Card?",
    desc: "Family identity & address card",
    icon: <DescriptionIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-lime-50 text-lime-700",
  },
  {
    key: "ociCard",
    name: "OCI Card",
    question: "Do you have an OCI Card?",
    desc: "Overseas Citizen of India card",
    icon: <PublicIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-violet-50 text-violet-600",
  },
  {
    key: "property",
    name: "Property",
    question: "Do you have Property Ownership Documents?",
    desc: "Property ownership & deed documents",
    icon: <HomeWorkIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "will",
    name: "Will",
    question: "Do you have a Will?",
    desc: "Last Will & Testament",
    icon: <DescriptionIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-violet-50 text-violet-600",
  },
  {
    key: "nominee",
    name: "Nominee",
    question: "Do you have Nominee Details / Declarations?",
    desc: "Nominee Details / Declarations",
    icon: <GroupsIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-orange-50 text-orange-600",
  },
];

const EDUCATION_DOCUMENTS: DocumentDef[] = [
  {
    key: "education10th",
    name: "10th",
    question: "Do you have this document?",
    desc: "Secondary School Certificate (SSLC / 10th)",
    icon: <SchoolIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-sky-50 text-sky-600",
  },
  {
    key: "education12th",
    name: "12th",
    question: "Do you have this document?",
    desc: "Higher Secondary Certificate (HSC / 12th)",
    icon: <SchoolIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    key: "diploma",
    name: "Diploma",
    question: "Do you have this document?",
    desc: "Diploma Certificate",
    icon: <SchoolIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-indigo-50 text-indigo-600",
  },
  {
    key: "bachelors",
    name: "Bachelors",
    question: "Do you have this document?",
    desc: "Undergraduate Degree Certificate",
    icon: <SchoolIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-purple-50 text-purple-600",
  },
  {
    key: "masters",
    name: "Masters",
    question: "Do you have this document?",
    desc: "Postgraduate Degree Certificate",
    icon: <SchoolIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-violet-50 text-violet-600",
  },
  {
    key: "courses",
    name: "Courses",
    question: "Do you have this document?",
    desc: "Professional Course / Skill Certificates",
    icon: <SchoolIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-emerald-50 text-emerald-600",
  },
];

const ALL_DOCUMENTS: DocumentDef[] = [...GENERAL_DOCUMENTS, ...EDUCATION_DOCUMENTS];

const INSURANCE_TYPES_OPTIONS = [
  { id: "Health", label: "Health" },
  { id: "Life", label: "Life" },
  { id: "Term", label: "Term" },
  { id: "Vehicle - Car", label: "Vehicle - Car" },
  { id: "Vehicle - Bike", label: "Vehicle - Bike" },
];

function AvailabilityStatusDonut({
  available,
  notAvailable,
  unanswered,
  total,
}: {
  available: number;
  notAvailable: number;
  unanswered: number;
  total: number;
}) {
  const radius = 60;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  
  const availablePct = total > 0 ? available / total : 0;
  const notAvailablePct = total > 0 ? notAvailable / total : 0;
  const unansweredPct = total > 0 ? unanswered / total : 0;

  const availableDash = availablePct * circumference;
  const notAvailableDash = notAvailablePct * circumference;
  const unansweredDash = unansweredPct * circumference;
  const gap = 3;

  return (
    <div className="relative mx-auto flex h-[160px] w-[160px] items-center justify-center">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        {available > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#22b573"
            strokeWidth={strokeWidth}
            strokeDasharray={`${Math.max(0, availableDash - gap)} ${circumference - availableDash + gap}`}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
        )}
        {notAvailable > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#64748b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${Math.max(0, notAvailableDash - gap)} ${circumference - notAvailableDash + gap}`}
            strokeDashoffset={-availableDash}
            strokeLinecap="round"
          />
        )}
        {unanswered > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth={strokeWidth}
            strokeDasharray={`${Math.max(0, unansweredDash - gap)} ${circumference - unansweredDash + gap}`}
            strokeDashoffset={-(availableDash + notAvailableDash)}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-extrabold text-navy-950">{available}</span>
        <span className="text-[11px] font-bold text-slate-500">Available</span>
      </div>
    </div>
  );
}

function ReadinessRing({ pct }: { pct: number }) {
  const radius = 28;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;

  return (
    <div className="relative flex h-[72px] w-[72px] items-center justify-center">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#22b573"
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-xs font-extrabold text-brand-green-700">
        {pct}%
      </span>
    </div>
  );
}

export default function GovernmentDocuments() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { assessmentData, updateAssessment } = useApp();

  const savedDocs = assessmentData.documents || {};

  const [answers, setAnswers] = useState<Record<string, boolean | undefined>>(() => {
    const initial: Record<string, boolean | undefined> = {};
    ALL_DOCUMENTS.forEach((doc) => {
      const val = (savedDocs as any)[doc.key];
      if (val === true || val === "uploaded") {
        initial[doc.key] = true;
      } else if (val === false) {
        initial[doc.key] = false;
      } else {
        initial[doc.key] = undefined;
      }
    });
    return initial;
  });

  const [insuranceTypes, setInsuranceTypes] = useState<string[]>(() => {
    return Array.isArray(savedDocs.insuranceTypes) ? savedDocs.insuranceTypes : [];
  });

  const handleSelectAnswer = (key: string, value: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === "insurance" && value === false) {
      setInsuranceTypes([]);
    }
  };

  const toggleInsuranceType = (typeId: string) => {
    setInsuranceTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
  };

  const availableCount = useMemo(
    () => Object.values(answers).filter((a) => a === true).length,
    [answers]
  );

  const notAvailableCount = useMemo(
    () => Object.values(answers).filter((a) => a === false).length,
    [answers]
  );

  const unansweredCount = useMemo(
    () => Object.values(answers).filter((a) => a === undefined).length,
    [answers]
  );

  const total = ALL_DOCUMENTS.length;
  const readinessPct = total > 0 ? Math.round((availableCount / total) * 100) : 0;

  const handleNext = () => {
    const finalDocs = {
      ...savedDocs,
      ...answers,
      insuranceTypes: answers.insurance ? insuranceTypes : [],
    };
    updateAssessment("documents", finalDocs as any);
    navigate("/selected-documents");
  };

  const renderDocCard = (doc: DocumentDef) => {
    const answer = answers[doc.key];
    const isInsurance = doc.key === "insurance";

    return (
      <div
        key={doc.key}
        className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
          answer === true
            ? "border-brand-green-400 bg-brand-green-50/40 shadow-xs"
            : answer === false
            ? "border-slate-300 bg-slate-50/70"
            : "border-slate-200 bg-white hover:border-brand-green-300 hover:shadow-md"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${doc.iconColor}`}
            >
              {doc.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy-950 truncate">{doc.name}</p>
              <p className="text-xs font-semibold text-slate-700">{doc.question}</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">{doc.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => handleSelectAnswer(doc.key, true)}
              className={`flex h-9 min-w-[76px] items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-bold cursor-pointer transition-all duration-200 active:scale-[0.96] ${
                answer === true
                  ? "bg-brand-green-500 text-white shadow-sm ring-2 ring-brand-green-500/30"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-green-500 hover:bg-brand-green-50 hover:text-brand-green-700"
              }`}
            >
              {answer === true && <CheckIcon sx={{ fontSize: 15 }} />}
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleSelectAnswer(doc.key, false)}
              className={`flex h-9 min-w-[76px] items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-bold cursor-pointer transition-all duration-200 active:scale-[0.96] ${
                answer === false
                  ? "bg-slate-700 text-white shadow-sm ring-2 ring-slate-700/30"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {answer === false && <CancelIcon sx={{ fontSize: 15 }} />}
              No
            </button>
          </div>
        </div>

        {/* Insurance options expanded when Insurance = YES */}
        {isInsurance && answer === true && (
          <div className="mt-4 rounded-xl border border-brand-green-300 bg-brand-green-50/50 p-4">
            <p className="text-xs font-bold text-navy-950 mb-2.5">
              Insurance Type (Select all that apply)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {INSURANCE_TYPES_OPTIONS.map((opt) => {
                const isChecked = insuranceTypes.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInsuranceType(opt.id)}
                    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-xs font-bold cursor-pointer transition-all duration-150 text-left active:scale-[0.98] ${
                      isChecked
                        ? "border-brand-green-500 bg-brand-green-500 text-white shadow-sm"
                        : "border-slate-200 bg-white text-navy-950 hover:border-brand-green-400 hover:bg-brand-green-50/50"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        isChecked
                          ? "border-white bg-white text-brand-green-600"
                          : "border-slate-400 bg-white"
                      }`}
                    >
                      {isChecked && <CheckIcon sx={{ fontSize: 12 }} />}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
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
              Financial Document Availability
            </h1>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-700">
              Select whether you possess each document to evaluate your financial readiness.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-bold text-brand-green-700">
                Step 11 of 12
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-[20px] top-4 h-0.5 w-[calc(100%-40px)] bg-slate-200" />
              <div
                className="absolute left-[20px] top-4 h-0.5 w-[calc(100%-40px)] bg-brand-green-500"
                style={{ width: "91.66%" }}
              />
              <div className="flex items-start justify-between overflow-x-auto pb-2">
                {PROGRESS_STEPS.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex shrink-0 flex-col items-center text-center px-1"
                    style={{ minWidth: "48px" }}
                  >
                    <span
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        step.completed
                          ? "bg-brand-green-500 text-white shadow-sm"
                          : step.active
                          ? "bg-brand-green-500 text-white shadow-sm ring-4 ring-brand-green-100"
                          : "border-2 border-slate-300 bg-white text-slate-500"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircleIcon sx={{ fontSize: 16 }} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <p
                      className={`mt-2 text-[10px] font-semibold leading-tight ${
                        step.active
                          ? "text-brand-green-700 font-bold"
                          : step.completed
                          ? "text-slate-700"
                          : "text-slate-500"
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
          {/* LEFT — Document Checklist */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <p className="text-base font-bold text-navy-950">
                  Document Checklist
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  Indicate Yes or No for each financial document.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-green-700 bg-brand-green-100 px-3 py-1 rounded-full self-start sm:self-auto">
                {availableCount} of {total} Available
              </span>
            </div>

            {/* General Documents Section */}
            <div className="space-y-3">
              {GENERAL_DOCUMENTS.map((doc) => renderDocCard(doc))}
            </div>

            {/* Education Documents Section Header */}
            <div className="mt-8 mb-4 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700 font-bold">
                  <SchoolIcon sx={{ fontSize: 20 }} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-navy-950">
                    Education Documents
                  </h3>
                  <p className="text-xs font-semibold text-slate-700">
                    Select Yes or No for each education document level.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                {EDUCATION_DOCUMENTS.map((doc) => renderDocCard(doc))}
              </div>
            </div>

            {/* Document Readiness Card */}
            <div className="mt-8 rounded-xl border border-brand-green-300 bg-brand-green-50/60 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-100">
                    <ShieldIcon
                      sx={{ fontSize: 20 }}
                      className="text-brand-green-700"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-950">
                      Your Document Readiness
                    </p>
                    <p className="text-xs font-medium text-slate-700">
                      {availableCount} of {total} Documents Available ({readinessPct}%)
                    </p>
                  </div>
                </div>
                <ReadinessRing pct={readinessPct} />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/financial-goals")}
                className="flex h-12 items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-6 text-sm font-bold text-brand-green-600 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
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
            {/* Card 1: Availability Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="mb-5 text-base font-bold text-navy-950">
                Document Availability Status
              </h3>

              <div className="flex items-center gap-6">
                <AvailabilityStatusDonut
                  available={availableCount}
                  notAvailable={notAvailableCount}
                  unanswered={unansweredCount}
                  total={total}
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-brand-green-500" />
                      <span className="text-xs font-medium text-slate-700">Available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-navy-950">
                        {availableCount}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {Math.round((availableCount / total) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-600" />
                      <span className="text-xs font-medium text-slate-700">Not Available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-navy-950">
                        {notAvailableCount}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {Math.round((notAvailableCount / total) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-300" />
                      <span className="text-xs font-medium text-slate-700">
                        Unanswered
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-navy-950">
                        {unansweredCount}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {Math.round((unansweredCount / total) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Panel */}
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-brand-green-50/80 p-4">
                <CheckCircleIcon
                  sx={{ fontSize: 22 }}
                  className="mt-0.5 shrink-0 text-brand-green-600"
                />
                <div>
                  <p className="text-sm font-bold text-brand-green-700">
                    {availableCount} of {total} Documents Available
                  </p>
                  <p className="mt-0.5 text-xs font-medium leading-relaxed text-slate-700">
                    {availableCount === total
                      ? "Excellent! All documents are available."
                      : "Keep updating your document checklist to ensure full financial readiness."}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Why Documents Matter? */}
            <div className="rounded-2xl border border-brand-green-200/70 bg-brand-green-50/60 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <VerifiedUserIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why Documents Matter?
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Knowing which financial and personal documents you hold enables accurate verification, smooth claim processing, estate planning, and faster loan approvals.
              </p>
            </div>

            {/* Card 3: Your Data is Safe */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <LockIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Your Data is Safe
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                We use bank-level encryption to protect your document availability information. Your privacy and data security are our top priorities.
              </p>
            </div>

            {/* Card 4: Tips */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <LightbulbIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">Tips</h3>
              </div>
              <ul className="space-y-2 text-sm font-medium text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                  Keep physical and digital copies organized
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                  Ensure insurance and identity records are up-to-date
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                  Update nominee declarations across all financial assets
                </li>
              </ul>
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
