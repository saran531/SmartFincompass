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
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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

interface DocMeta {
  key: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  iconColor: string;
}

interface CategoryDef {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  docs: DocMeta[];
}

const CATEGORIES: CategoryDef[] = [
  {
    id: "personal",
    title: "Personal & Identity Documents",
    icon: <FingerprintIcon sx={{ fontSize: 20 }} />,
    iconColor: "bg-sky-100 text-sky-700",
    docs: [
      {
        key: "aadhaar",
        name: "Aadhaar",
        desc: "Proof of Identity & Address",
        icon: <FingerprintIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-amber-50 text-amber-600",
      },
      {
        key: "pan",
        name: "PAN",
        desc: "Permanent Account Number",
        icon: <CreditCardIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-sky-50 text-sky-600",
      },
      {
        key: "passport",
        name: "Passport",
        desc: "Identity for International Use",
        icon: <MenuBookIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-purple-50 text-purple-600",
      },
      {
        key: "drivingLicence",
        name: "Driving Licence",
        desc: "Proof to drive vehicles",
        icon: <DriveEtaIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-orange-50 text-orange-600",
      },
      {
        key: "voterId",
        name: "Voter ID",
        desc: "Electoral Identity Card",
        icon: <BadgeIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-indigo-50 text-indigo-600",
      },
      {
        key: "ociCard",
        name: "OCI Card",
        desc: "Overseas Citizen of India card",
        icon: <PublicIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-violet-50 text-violet-600",
      },
    ],
  },
  {
    id: "vehicle_insurance",
    title: "Vehicle & Insurance Documents",
    icon: <HealthAndSafetyIcon sx={{ fontSize: 20 }} />,
    iconColor: "bg-emerald-100 text-emerald-700",
    docs: [
      {
        key: "twoWheelerRC",
        name: "2 Wheeler Registration Certificate",
        desc: "Two-wheeler registration proof",
        icon: <TwoWheelerIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-teal-50 text-teal-600",
      },
      {
        key: "fourWheelerRC",
        name: "4 Wheeler Registration Certificate",
        desc: "Four-wheeler registration proof",
        icon: <DirectionsCarIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-blue-50 text-blue-600",
      },
      {
        key: "insurance",
        name: "Insurance",
        desc: "Life / Health / Term / Vehicle Insurance",
        icon: <HealthAndSafetyIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-blue-50 text-blue-600",
      },
    ],
  },
  {
    id: "family_legal",
    title: "Family & Legal Documents",
    icon: <FamilyRestroomIcon sx={{ fontSize: 20 }} />,
    iconColor: "bg-rose-100 text-rose-700",
    docs: [
      {
        key: "marriageCertificate",
        name: "Marriage Certificate",
        desc: "Legal proof of marriage",
        icon: <FamilyRestroomIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-rose-50 text-rose-600",
      },
      {
        key: "communityCertificate",
        name: "Community Certificate",
        desc: "Category / Caste / Community proof",
        icon: <GroupsIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-amber-50 text-amber-700",
      },
      {
        key: "birthCertificate",
        name: "Birth Certificate",
        desc: "Official proof of date of birth",
        icon: <CakeIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-cyan-50 text-cyan-600",
      },
      {
        key: "rationCard",
        name: "Ration Card",
        desc: "Family identity & address card",
        icon: <DescriptionIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-lime-50 text-lime-700",
      },
      {
        key: "will",
        name: "Will",
        desc: "Last Will & Testament",
        icon: <DescriptionIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-violet-50 text-violet-600",
      },
      {
        key: "nominee",
        name: "Nominee",
        desc: "Nominee Details / Declarations",
        icon: <GroupsIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-orange-50 text-orange-600",
      },
    ],
  },
  {
    id: "property",
    title: "Property Documents",
    icon: <HomeWorkIcon sx={{ fontSize: 20 }} />,
    iconColor: "bg-indigo-100 text-indigo-700",
    docs: [
      {
        key: "property",
        name: "Property",
        desc: "Property ownership & deed documents",
        icon: <HomeWorkIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-emerald-50 text-emerald-600",
      },
    ],
  },
  {
    id: "education",
    title: "Education Documents",
    icon: <SchoolIcon sx={{ fontSize: 20 }} />,
    iconColor: "bg-purple-100 text-purple-700",
    docs: [
      {
        key: "education10th",
        name: "10th",
        desc: "Secondary School Certificate (SSLC / 10th)",
        icon: <SchoolIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-sky-50 text-sky-600",
      },
      {
        key: "education12th",
        name: "12th",
        desc: "Higher Secondary Certificate (HSC / 12th)",
        icon: <SchoolIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-blue-50 text-blue-600",
      },
      {
        key: "diploma",
        name: "Diploma",
        desc: "Diploma Certificate",
        icon: <SchoolIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-indigo-50 text-indigo-600",
      },
      {
        key: "bachelors",
        name: "Bachelors",
        desc: "Undergraduate Degree Certificate",
        icon: <SchoolIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-purple-50 text-purple-600",
      },
      {
        key: "masters",
        name: "Masters",
        desc: "Postgraduate Degree Certificate",
        icon: <SchoolIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-violet-50 text-violet-600",
      },
      {
        key: "courses",
        name: "Courses",
        desc: "Professional Course / Skill Certificates",
        icon: <SchoolIcon sx={{ fontSize: 22 }} />,
        iconColor: "bg-emerald-50 text-emerald-600",
      },
    ],
  },
];

const ALL_KEYS = CATEGORIES.flatMap((c) => c.docs.map((d) => d.key));

export default function SelectedDocuments() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { assessmentData } = useApp();

  const savedDocs = (assessmentData.documents || {}) as Record<string, any>;
  const insuranceTypes: string[] = Array.isArray(savedDocs.insuranceTypes)
    ? savedDocs.insuranceTypes
    : [];

  // Helper to check if document is answered YES
  const isDocumentYes = (key: string): boolean => {
    const val = savedDocs[key];
    return val === true || val === "uploaded";
  };

  // Calculate dynamic count (Insurance counts as 1 document)
  const selectedCount = useMemo(() => {
    return ALL_KEYS.filter((key) => isDocumentYes(key)).length;
  }, [savedDocs]);

  // Group YES-selected documents by Category
  const activeCategories = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const activeDocs = cat.docs.filter((doc) => isDocumentYes(doc.key));
      return {
        ...cat,
        docs: activeDocs,
      };
    }).filter((cat) => cat.docs.length > 0);
  }, [savedDocs]);

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
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                <FolderSpecialIcon sx={{ fontSize: 20 }} />
              </span>
              <span className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-extrabold text-brand-green-700">
                {selectedCount} {selectedCount === 1 ? "Document" : "Documents"} Selected
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
              Your Selected Documents
            </h1>
            <p className="mt-2 text-[15px] font-medium leading-relaxed text-slate-700">
              Here are the documents you confirmed you have.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-bold text-brand-green-700">
                Step 11 of 12 (Confirmation)
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
          {/* LEFT — Selected Documents List / Categories */}
          <div className="space-y-6">
            {/* Dynamic Document Count Summary Box */}
            <div className="rounded-2xl border border-brand-green-300 bg-brand-green-50/70 p-6 flex items-center justify-between shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-sm">
                  <CheckCircleIcon sx={{ fontSize: 26 }} />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-navy-950">
                    {selectedCount} {selectedCount === 1 ? "Document" : "Documents"} Selected
                  </h2>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    {selectedCount > 0
                      ? "Review your confirmed documents below before proceeding to final submit."
                      : "No documents selected. You can proceed or go back to update your choices."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate("/government-documents")}
                className="hidden sm:flex items-center gap-1.5 rounded-xl border border-brand-green-500 bg-white px-3.5 py-2 text-xs font-bold text-brand-green-700 transition-all hover:bg-brand-green-100/60"
              >
                Modify Selections
              </button>
            </div>

            {/* Render Category Sections OR Empty State */}
            {activeCategories.length > 0 ? (
              <div className="space-y-6">
                {activeCategories.map((category) => (
                  <div
                    key={category.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]"
                  >
                    <div className="mb-4 flex items-center gap-3 border-b border-slate-150 pb-3.5">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${category.iconColor}`}
                      >
                        {category.icon}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-navy-950">
                          {category.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-700">
                          {category.docs.length} {category.docs.length === 1 ? "item" : "items"} confirmed
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      {category.docs.map((doc) => {
                        const isInsurance = doc.key === "insurance";

                        return (
                          <div
                            key={doc.key}
                            className="flex flex-col justify-between rounded-xl border border-brand-green-200/80 bg-slate-50/70 p-4 transition-all hover:bg-white hover:shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <span
                                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${doc.iconColor}`}
                                >
                                  {doc.icon}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-navy-950 truncate">
                                    {doc.name}
                                  </p>
                                  <p className="text-[11px] font-medium text-slate-700">
                                    {doc.desc}
                                  </p>
                                </div>
                              </div>
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-500 text-white">
                                <CheckIcon sx={{ fontSize: 15 }} />
                              </span>
                            </div>

                            {/* Sub-types for Insurance if Insurance = YES */}
                            {isInsurance && (
                              <div className="mt-3 border-t border-brand-green-200/60 pt-2.5">
                                <p className="text-[11px] font-bold text-navy-950 mb-1.5">
                                  Selected Insurance Types:
                                </p>
                                {insuranceTypes.length > 0 ? (
                                  <div className="flex flex-wrap gap-1.5">
                                    {insuranceTypes.map((type) => (
                                      <span
                                        key={type}
                                        className="inline-flex items-center gap-1 rounded-lg bg-brand-green-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs"
                                      >
                                        <CheckIcon sx={{ fontSize: 12 }} />
                                        {type}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-lg bg-brand-green-100 px-2.5 py-1 text-[11px] font-bold text-brand-green-800">
                                    <CheckIcon sx={{ fontSize: 12 }} />
                                    General Insurance
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State (Requirement 10) */
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-4">
                  <InfoOutlinedIcon sx={{ fontSize: 36 }} />
                </div>
                <h3 className="text-xl font-extrabold text-navy-950">
                  No documents selected yet
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-700 max-w-md mx-auto">
                  You haven't marked any documents as available.
                </p>
                <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
                  You can still proceed to review and submit your assessment, or click back to update your answers.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/government-documents")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-5 py-2.5 text-xs font-bold text-brand-green-700 hover:bg-brand-green-50 transition-colors"
                >
                  <ArrowBackIcon sx={{ fontSize: 16 }} />
                  Return to Document Selection
                </button>
              </div>
            )}

            {/* Navigation Buttons (Requirements 13 & 14) */}
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <button
                type="button"
                onClick={() => navigate("/government-documents")}
                className="flex h-12 items-center gap-2 rounded-xl border-2 border-brand-green-500 bg-white px-6 text-sm font-bold text-brand-green-600 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => navigate("/review-submit")}
                className="flex h-12 items-center gap-2 rounded-xl bg-brand-green-500 px-8 text-[15px] font-bold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
              <LockIcon sx={{ fontSize: 16 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Confirmation Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="mb-4 text-base font-bold text-navy-950">
                Confirmation Summary
              </h3>
              <p className="text-xs font-medium text-slate-700 leading-relaxed mb-4">
                This page previews all verified items before final submission to your AI Financial Wellness Report.
              </p>

              <div className="space-y-3 border-t border-slate-150 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Confirmed Documents:</span>
                  <span className="font-extrabold text-navy-950 bg-slate-100 px-2.5 py-1 rounded-md">
                    {selectedCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Categories Included:</span>
                  <span className="font-extrabold text-navy-950 bg-slate-100 px-2.5 py-1 rounded-md">
                    {activeCategories.length} of {CATEGORIES.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Status:</span>
                  <span className="font-bold text-brand-green-700 flex items-center gap-1">
                    <CheckCircleIcon sx={{ fontSize: 14 }} /> Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Next Steps */}
            <div className="rounded-2xl border border-brand-green-200/70 bg-brand-green-50/60 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <VerifiedUserIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Next Step: Review & Submit
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                After reviewing your selected documents, click <strong>Next →</strong> to perform a final review of your full financial assessment profile before submission.
              </p>
            </div>

            {/* Card 3: Tips */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-7">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <LightbulbIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">Need Changes?</h3>
              </div>
              <p className="text-xs font-medium text-slate-700 leading-relaxed mb-3">
                If you made a mistake or want to add/remove a document, click the <strong>Back</strong> button anytime to update your Yes / No responses.
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
