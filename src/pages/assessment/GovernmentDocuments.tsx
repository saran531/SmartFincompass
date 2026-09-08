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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import ScheduleIcon from "@mui/icons-material/Schedule";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
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
  desc: string;
  icon: React.ReactNode;
  iconColor: string;
  initialStatus: "uploaded" | "pending";
}

const DOCUMENTS: DocumentDef[] = [
  {
    key: "aadhaar",
    name: "Aadhaar",
    desc: "Proof of Identity & Address",
    icon: <FingerprintIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-amber-50 text-amber-600",
    initialStatus: "pending",
  },
  {
    key: "pan",
    name: "PAN",
    desc: "Permanent Account Number",
    icon: <CreditCardIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-sky-50 text-sky-600",
    initialStatus: "pending",
  },
  {
    key: "passport",
    name: "Passport",
    desc: "Identity for International Use",
    icon: <MenuBookIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-purple-50 text-purple-600",
    initialStatus: "pending",
  },
  {
    key: "driving",
    name: "Driving Licence",
    desc: "Proof to Drive",
    icon: <DriveEtaIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-orange-50 text-orange-600",
    initialStatus: "pending",
  },
  {
    key: "insurance",
    name: "Insurance",
    desc: "Life / Health / General Insurance",
    icon: <HealthAndSafetyIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-blue-50 text-blue-600",
    initialStatus: "pending",
  },
  {
    key: "property",
    name: "Property",
    desc: "Property Ownership Documents",
    icon: <HomeWorkIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-emerald-50 text-emerald-600",
    initialStatus: "pending",
  },
  {
    key: "will",
    name: "Will",
    desc: "Last Will & Testament",
    icon: <DescriptionIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-violet-50 text-violet-600",
    initialStatus: "pending",
  },
  {
    key: "nominee",
    name: "Nominee",
    desc: "Nominee Details / Declarations",
    icon: <GroupsIcon sx={{ fontSize: 22 }} />,
    iconColor: "bg-orange-50 text-orange-600",
    initialStatus: "pending",
  },
];

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
const ALLOWED_EXTS = [".pdf", ".jpg", ".jpeg", ".png"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

interface UploadedFileInfo {
  name: string;
  size: number;
}

function UploadStatusDonut({
  uploaded,
  pending,
  total,
}: {
  uploaded: number;
  pending: number;
  total: number;
}) {
  const radius = 60;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const uploadedPct = total > 0 ? uploaded / total : 0;
  const pendingPct = total > 0 ? pending / total : 0;

  const uploadedDash = uploadedPct * circumference;
  const pendingDash = pendingPct * circumference;
  const gap = 4;

  return (
    <div className="relative mx-auto flex h-[160px] w-[160px] items-center justify-center">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={strokeWidth}
        />
        {uploaded > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#22b573"
            strokeWidth={strokeWidth}
            strokeDasharray={`${Math.max(0, uploadedDash - gap)} ${circumference - uploadedDash + gap}`}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
        )}
        {pending > 0 && (
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${Math.max(0, pendingDash - gap)} ${circumference - pendingDash + gap}`}
            strokeDashoffset={-(uploadedDash + gap)}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <InsertDriveFileIcon
          sx={{ fontSize: 28 }}
          className="text-brand-green-600"
        />
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
  const [statuses, setStatuses] = useState<Record<string, "uploaded" | "pending">>(() => {
    const initial: Record<string, "uploaded" | "pending"> = {};
    DOCUMENTS.forEach((d) => {
      initial[d.key] = (savedDocs as any)[d.key] === "uploaded" ? "uploaded" : "pending";
    });
    return initial;
  });

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileInfo>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const [docNumbers, setDocNumbers] = useState<Record<string, string>>(() => ({
    pan: typeof savedDocs.pan === "string" && !["uploaded", "pending"].includes(savedDocs.pan) ? savedDocs.pan : "",
    aadhaar: typeof savedDocs.aadhaar === "string" && !["uploaded", "pending"].includes(savedDocs.aadhaar) ? savedDocs.aadhaar : "",
    passport: typeof savedDocs.passport === "string" && !["uploaded", "pending"].includes(savedDocs.passport) ? savedDocs.passport : "",
    drivingLicence: typeof savedDocs.drivingLicence === "string" && !["uploaded", "pending"].includes(savedDocs.drivingLicence) ? savedDocs.drivingLicence : "",
  }));

  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = (key: string, file: File | null) => {
    if (!file) return;

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const isValidType = ALLOWED_TYPES.includes(file.type.toLowerCase()) || ALLOWED_EXTS.includes(ext);

    if (!isValidType) {
      setFileErrors((prev) => ({
        ...prev,
        [key]: "Please upload a PDF, JPG, JPEG or PNG file.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileErrors((prev) => ({
        ...prev,
        [key]: "File size must be 10 MB or less.",
      }));
      return;
    }

    setFileErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

    setUploadedFiles((prev) => ({
      ...prev,
      [key]: { name: file.name, size: file.size },
    }));
    setStatuses((prev) => ({ ...prev, [key]: "uploaded" }));
  };

  const handleRemoveFile = (key: string) => {
    setUploadedFiles((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setStatuses((prev) => ({ ...prev, [key]: "pending" }));
    setFileErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const uploadedCount = useMemo(
    () => Object.values(statuses).filter((s) => s === "uploaded").length,
    [statuses]
  );
  const pendingCount = useMemo(
    () => Object.values(statuses).filter((s) => s === "pending").length,
    [statuses]
  );
  const total = DOCUMENTS.length;
  const readiness = total > 0 ? Math.round((uploadedCount / total) * 100) : 0;

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
              Financial Document Readiness
            </h1>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-700">
              Ensure you have all the important documents in place for a secure financial future.
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
              <div className="absolute left-[20px] top-4 h-0.5 w-[calc(100%-40px)] bg-brand-green-500" style={{ width: "91.66%" }} />
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
            <div className="mb-6">
              <p className="text-base font-bold text-navy-950">
                Document Checklist
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Review and upload your important documents
              </p>
            </div>

            {/* Document Rows */}
            <div className="space-y-3">
              {DOCUMENTS.map((doc) => {
                const status = statuses[doc.key];
                const isUploaded = status === "uploaded";
                const isExpanded = expanded === doc.key;
                const uploadedFile = uploadedFiles[doc.key];
                const fileError = fileErrors[doc.key];

                return (
                  <div
                    key={doc.key}
                    className="rounded-xl border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggleExpand(doc.key)}
                      className="flex w-full items-center gap-4 p-4 text-left"
                      aria-expanded={isExpanded}
                    >
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${doc.iconColor}`}
                      >
                        {doc.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-navy-950">
                          {doc.name}
                        </p>
                        <p className="text-xs font-medium text-slate-600">{doc.desc}</p>
                      </div>
                      <span
                        className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold ${
                          isUploaded
                            ? "bg-brand-green-100 text-brand-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isUploaded ? "Uploaded" : "Pending"}
                        {isUploaded ? (
                          <CheckCircleIcon sx={{ fontSize: 14 }} />
                        ) : (
                          <ScheduleIcon sx={{ fontSize: 14 }} />
                        )}
                      </span>
                      {isExpanded ? (
                        <ExpandLessIcon
                          sx={{ fontSize: 20 }}
                          className="shrink-0 text-slate-500"
                        />
                      ) : (
                        <ExpandMoreIcon
                          sx={{ fontSize: 20 }}
                          className="shrink-0 text-slate-500"
                        />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-slate-200 px-4 py-4 space-y-4">
                        {["pan", "aadhaar", "passport", "driving"].includes(doc.key) && (
                          <div>
                            <label className="block text-xs font-bold text-navy-950 mb-1">
                              {doc.name} Number / Details
                            </label>
                            <input
                              type="text"
                              value={docNumbers[doc.key === "driving" ? "drivingLicence" : doc.key] || ""}
                              onChange={(e) => {
                                let val = e.target.value;
                                if (doc.key === "pan") {
                                  val = val.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
                                } else if (doc.key === "aadhaar") {
                                  val = val.replace(/[^0-9]/g, "").slice(0, 12);
                                } else {
                                  val = val.toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, 20);
                                }
                                setDocNumbers((prev) => ({
                                  ...prev,
                                  [doc.key === "driving" ? "drivingLicence" : doc.key]: val,
                                }));
                              }}
                              placeholder={`Enter your ${doc.name} number`}
                              className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-navy-950 placeholder:text-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                            />
                          </div>
                        )}

                        {/* File Upload Area */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-navy-950">
                              Upload {doc.name} Document
                            </p>
                            <span className="text-[11px] font-semibold text-slate-500">
                              PDF, JPG, JPEG or PNG • Max 10 MB
                            </span>
                          </div>

                          {uploadedFile ? (
                            <div className="flex items-center justify-between rounded-xl border border-brand-green-300 bg-brand-green-50/70 p-3.5">
                              <div className="flex items-center gap-3 min-w-0">
                                <InsertDriveFileIcon
                                  className="text-brand-green-600 shrink-0"
                                  sx={{ fontSize: 24 }}
                                />
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-navy-950 truncate max-w-[200px] sm:max-w-[300px]">
                                    {uploadedFile.name}
                                  </p>
                                  <p className="text-[11px] font-medium text-slate-600">
                                    {formatFileSize(uploadedFile.size)} • Uploaded
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <label className="cursor-pointer text-xs font-bold text-brand-green-700 hover:text-brand-green-800 hover:underline">
                                  Replace File
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0] || null;
                                      handleFileSelect(doc.key, file);
                                      e.target.value = "";
                                    }}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(doc.key)}
                                  className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
                                >
                                  Remove File
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label className="flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-4 text-center transition-all hover:border-brand-green-500 hover:bg-brand-green-50/40">
                              <UploadFileIcon
                                sx={{ fontSize: 22 }}
                                className="text-slate-500"
                              />
                              <span className="text-xs font-semibold text-slate-700">
                                Click to select file (PDF, JPG, PNG • Max 10 MB)
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  handleFileSelect(doc.key, file);
                                  e.target.value = "";
                                }}
                              />
                            </label>
                          )}

                          {fileError && (
                            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-600">
                              <span>⚠️</span>
                              <span>{fileError}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Document Readiness Card */}
            <div className="mt-6 rounded-xl border border-brand-green-300 bg-brand-green-50/60 p-5">
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
                      Keep your documents updated for a secure financial journey.
                    </p>
                  </div>
                </div>
                <ReadinessRing pct={readiness} />
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
                onClick={() => {
                  const finalDocs = {
                    ...statuses,
                    pan: docNumbers.pan || statuses.pan,
                    aadhaar: docNumbers.aadhaar || statuses.aadhaar,
                    passport: docNumbers.passport || statuses.passport,
                    drivingLicence: docNumbers.drivingLicence || statuses.drivingLicence,
                  };
                  updateAssessment("documents", finalDocs as any);
                  navigate("/review-submit");
                }}
                className="flex h-12 items-center gap-2 rounded-xl bg-brand-green-500 px-8 text-[15px] font-bold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
              >
                Review & Finish
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
            {/* Card 1: Upload Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="mb-5 text-base font-bold text-navy-950">
                Upload Status
              </h3>

              <div className="flex items-center gap-6">
                <UploadStatusDonut
                  uploaded={uploadedCount}
                  pending={pendingCount}
                  total={total}
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-brand-green-500" />
                      <span className="text-xs font-medium text-slate-700">Uploaded</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-navy-950">
                        {uploadedCount}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {total > 0
                          ? Math.round((uploadedCount / total) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="text-xs font-medium text-slate-700">Pending</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-navy-950">
                        {pendingCount}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {total > 0
                          ? Math.round((pendingCount / total) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-slate-300" />
                      <span className="text-xs font-medium text-slate-700">
                        Not Uploaded
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-navy-950">
                        {total - uploadedCount}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {total > 0
                          ? Math.round(((total - uploadedCount) / total) * 100)
                          : 0}
                        %
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
                    {uploadedCount} of {total} Documents Uploaded
                  </p>
                  <p className="mt-0.5 text-xs font-medium leading-relaxed text-slate-700">
                    {uploadedCount === total
                      ? "Great job! All documents have been uploaded."
                      : "Keep going! Complete the pending documents to improve your readiness."}
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
                Complete and updated documents help in faster verification, smooth loan approvals, claim settlements, and secure your financial future.
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
                We use bank-level encryption to protect your documents and personal information. Your privacy is our priority.
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
                  Ensure documents are clear and valid
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                  Upload colored scans or high-quality photos
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                  Keep documents updated regularly
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
