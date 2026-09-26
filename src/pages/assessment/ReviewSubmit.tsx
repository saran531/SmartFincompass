import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp, calculateAge } from "../../context/AppContext";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FlagIcon from "@mui/icons-material/Flag";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistIcon from "@mui/icons-material/Checklist";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
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
  { label: "Documents", completed: true },
  { label: "Review", active: true },
];

interface SummaryCard {
  key: string;
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  bulletColor: string;
  editRoute: string;
  items: { label: string; value: string; check?: boolean }[];
}

export default function ReviewSubmit() {
  const navigate = useNavigate();
  const { assessmentData, completeAssessment } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [declarationOneAccepted, setDeclarationOneAccepted] = useState(false);
  const [declarationTwoAccepted, setDeclarationTwoAccepted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const DOCUMENT_LABELS: Record<string, string> = {
    aadhaar: "Aadhaar",
    pan: "PAN",
    passport: "Passport",
    drivingLicence: "Driving Licence",
    voterId: "Voter ID",
    twoWheelerRC: "2 Wheeler RC",
    fourWheelerRC: "4 Wheeler RC",
    insurance: "Insurance",
    marriageCertificate: "Marriage Certificate",
    communityCertificate: "Community Certificate",
    birthCertificate: "Birth Certificate",
    rationCard: "Ration Card",
    ociCard: "OCI Card",
    property: "Property Documents",
    will: "Will",
    nominee: "Nominee Details",
    education10th: "10th",
    education12th: "12th",
    diploma: "Diploma",
    bachelors: "Bachelors",
    masters: "Masters",
    courses: "Courses",
  };

  const getSelectedDocumentItems = () => {
    const docs = (assessmentData.documents || {}) as Record<string, any>;
    const items: { label: string; value: string; check?: boolean }[] = [];

    const keysInOrder = [
      "aadhaar",
      "pan",
      "passport",
      "drivingLicence",
      "voterId",
      "twoWheelerRC",
      "fourWheelerRC",
      "insurance",
      "marriageCertificate",
      "communityCertificate",
      "birthCertificate",
      "rationCard",
      "ociCard",
      "property",
      "will",
      "nominee",
      "education10th",
      "education12th",
      "diploma",
      "bachelors",
      "masters",
      "courses",
    ];

    keysInOrder.forEach((key) => {
      const val = docs[key];
      const isYes = val === true || val === "uploaded";
      if (isYes) {
        if (key === "insurance") {
          const types = Array.isArray(docs.insuranceTypes) && docs.insuranceTypes.length > 0
            ? docs.insuranceTypes.join(", ")
            : "Available";
          items.push({
            label: "Insurance",
            value: types,
            check: true,
          });
        } else {
          items.push({
            label: DOCUMENT_LABELS[key] || key,
            value: "Available",
            check: true,
          });
        }
      }
    });

    if (items.length === 0) {
      items.push({
        label: "Available Documents",
        value: "None selected",
      });
    }

    return items;
  };

  const summaryCards: SummaryCard[] = [
    {
      key: "personal",
      title: "Personal Information",
      icon: <PersonIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-brand-green-50 text-brand-green-700",
      bulletColor: "bg-brand-green-500",
      editRoute: "/personal-information",
      items: [
        { label: "Name", value: assessmentData.personalInfo.fullName || "Not provided" },
        { label: "Email", value: assessmentData.personalInfo.email || "Not provided" },
        { label: "Phone", value: assessmentData.personalInfo.phone ? `+91 ${assessmentData.personalInfo.phone}` : "Not provided" },
        { label: "Age", value: assessmentData.personalInfo.dateOfBirth ? `${calculateAge(assessmentData.personalInfo.dateOfBirth)} years` : "Not provided" },
        { label: "Education", value: assessmentData.personalInfo.education || "Not provided" },
        { label: "Dependents", value: assessmentData.personalInfo.dependents || "0" },
      ],
    },
    {
      key: "employment",
      title: "Employment Details",
      icon: <WorkIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-sky-50 text-sky-700",
      bulletColor: "bg-sky-500",
      editRoute: "/employment-details",
      items: [
        { label: "Employment Type", value: assessmentData.employment.employmentType || "Not provided" },
        { label: "Occupation / Role", value: assessmentData.employment.occupation || assessmentData.employment.employerName || "Not provided" },
        ...(assessmentData.employment.employmentType === "Student" ? [
          { label: "Education", value: assessmentData.employment.educationQualification || "Not provided" },
          { label: "Part-time Job", value: assessmentData.employment.partTimeJob || "Not specified" },
        ] : []),
        { label: "Annual Income", value: assessmentData.employment.annualIncome ? `₹ ${Number(assessmentData.employment.annualIncome).toLocaleString("en-IN")}` : "Not provided" },
      ],
    },
    {
      key: "income",
      title: "Income Sources",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-purple-50 text-purple-700",
      bulletColor: "bg-purple-500",
      editRoute: "/income-details",
      items: [
        { label: "Salary", value: assessmentData.income.salary ? `₹ ${Number(assessmentData.income.salary).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Business", value: assessmentData.income.business ? `₹ ${Number(assessmentData.income.business).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Commission", value: assessmentData.income.commission ? `₹ ${Number(assessmentData.income.commission).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Freelance / Rental", value: assessmentData.income.freelance || assessmentData.income.rental ? `₹ ${(Number(assessmentData.income.freelance || 0) + Number(assessmentData.income.rental || 0)).toLocaleString("en-IN")}` : "₹ 0" },
        ...(assessmentData.income.otherIncomes && assessmentData.income.otherIncomes.length > 0
          ? assessmentData.income.otherIncomes.map((oi) => ({
              label: oi.type || "Other Income",
              value: oi.amount ? `₹ ${Number(oi.amount).toLocaleString("en-IN")}` : "₹ 0",
            }))
          : []),
        { label: "Other Income", value: assessmentData.income.other ? `₹ ${Number(assessmentData.income.other).toLocaleString("en-IN")}` : "₹ 0" },
      ],
    },
    {
      key: "expenses",
      title: "Monthly Expenses",
      icon: <ShoppingCartIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-orange-50 text-orange-700",
      bulletColor: "bg-orange-500",
      editRoute: "/monthly-expenses",
      items: [
        {
          label: "Total Expenses",
          value: `₹ ${Object.values(assessmentData.expenses || {}).reduce((acc, curr) => acc + (Number(curr) || 0), 0).toLocaleString("en-IN")}`,
        },
        { label: "Food & Transport", value: `₹ ${(Number(assessmentData.expenses?.food || 0) + Number(assessmentData.expenses?.transport || 0)).toLocaleString("en-IN")}` },
        { label: "EMI & Insurance", value: `₹ ${(Number(assessmentData.expenses?.emi || 0) + Number(assessmentData.expenses?.insurance || 0)).toLocaleString("en-IN")}` },
        { label: "Utilities & Entertainment", value: `₹ ${(Number(assessmentData.expenses?.utilities || 0) + Number(assessmentData.expenses?.entertainment || 0)).toLocaleString("en-IN")}` },
        { label: "Subscriptions", value: assessmentData.expenses?.subscriptions ? `₹ ${Number(assessmentData.expenses.subscriptions).toLocaleString("en-IN")}` : "₹ 0" },
      ],
    },
    {
      key: "assets",
      title: "Assets",
      icon: <SavingsIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-brand-green-50 text-brand-green-700",
      bulletColor: "bg-brand-green-500",
      editRoute: "/assets",
      items: [
        {
          label: "Total Assets",
          value: `₹ ${Object.values(assessmentData.assets || {}).reduce((acc, curr) => acc + (Number(curr) || 0), 0).toLocaleString("en-IN")}`,
        },
        { label: "Bank Balance", value: assessmentData.assets?.bankAccounts ? `₹ ${Number(assessmentData.assets.bankAccounts).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Mutual Funds", value: assessmentData.assets?.mutualFunds ? `₹ ${Number(assessmentData.assets.mutualFunds).toLocaleString("en-IN")}${assessmentData.assets?.mutualFundInfo?.mode ? ` (${assessmentData.assets.mutualFundInfo.mode})` : ""}` : "₹ 0" },
        { label: "Property & Vehicle", value: `₹ ${(Number(assessmentData.assets?.realEstate || 0) + Number(assessmentData.assets?.vehicles || 0)).toLocaleString("en-IN")}` },
      ],
    },
    {
      key: "liabilities",
      title: "Liabilities",
      icon: <CreditCardIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-pink-50 text-pink-700",
      bulletColor: "bg-pink-500",
      editRoute: "/liabilities",
      items: [
        {
          label: "Total Liabilities",
          value: `₹ ${Object.values(assessmentData.liabilities || {}).reduce((acc, curr) => acc + (Number(curr) || 0), 0).toLocaleString("en-IN")}`,
        },
        { label: "Home Loan", value: assessmentData.liabilities?.homeLoan ? `₹ ${Number(assessmentData.liabilities.homeLoan).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Personal Loan", value: assessmentData.liabilities?.personalLoan ? `₹ ${Number(assessmentData.liabilities.personalLoan).toLocaleString("en-IN")}` : "₹ 0" },
        ...(assessmentData.liabilities?.otherName ? [{ label: assessmentData.liabilities.otherName, value: assessmentData.liabilities.other ? `₹ ${Number(assessmentData.liabilities.other).toLocaleString("en-IN")}` : "₹ 0" }] : []),
      ],
    },
    {
      key: "savings",
      title: "Savings & Investments",
      icon: <SavingsIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-brand-green-50 text-brand-green-700",
      bulletColor: "bg-brand-green-500",
      editRoute: "/savings",
      items: [
        { label: "Emergency Fund", value: assessmentData.savings?.emergencyFund ? `₹ ${Number(assessmentData.savings.emergencyFund).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Monthly Savings", value: assessmentData.savings?.monthlySavings ? `₹ ${Number(assessmentData.savings.monthlySavings).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "PPF / EPF", value: `₹ ${(Number(assessmentData.savings?.ppf || 0) + Number(assessmentData.savings?.epf || 0)).toLocaleString("en-IN")}` },
        ...(assessmentData.savings?.otherName ? [{ label: assessmentData.savings.otherName, value: assessmentData.savings.other ? `₹ ${Number(assessmentData.savings.other).toLocaleString("en-IN")}` : "₹ 0" }] : []),
      ],
    },
    {
      key: "insurance",
      title: "Insurance Details",
      icon: <HealthAndSafetyIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-purple-50 text-purple-700",
      bulletColor: "bg-purple-500",
      editRoute: "/insurance",
      items: [
        { label: "Life Insurance", value: `${assessmentData.insurance?.lifeInsurance?.length || 0} Policies` },
        { label: "Health Insurance", value: `${assessmentData.insurance?.healthInsurance?.length || 0} Policies` },
        { label: "Nominee", value: assessmentData.insurance?.nomineeName ? `${assessmentData.insurance.nomineeName} (${assessmentData.insurance.nomineeRelationship || "Nominee"})` : "Not assigned" },
      ],
    },
    {
      key: "investment",
      title: "Investment Experience",
      icon: <TrendingUpIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-amber-50 text-amber-700",
      bulletColor: "bg-amber-500",
      editRoute: "/investment-experience",
      items: [
        { label: "Risk Appetite", value: assessmentData.investment?.riskAppetite ? assessmentData.investment.riskAppetite.charAt(0).toUpperCase() + assessmentData.investment.riskAppetite.slice(1) : "Moderate" },
        { label: "Knowledge Level", value: assessmentData.investment?.investmentKnowledge ? assessmentData.investment.investmentKnowledge.charAt(0).toUpperCase() + assessmentData.investment.investmentKnowledge.slice(1) : "Intermediate" },
        { label: "Current Investments", value: `${assessmentData.investment?.currentInvestments?.length || 0} Categories` },
      ],
    },
    {
      key: "goals",
      title: "Financial Goals",
      icon: <FlagIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-emerald-50 text-emerald-700",
      bulletColor: "bg-emerald-500",
      editRoute: "/financial-goals",
      items: [
        { label: "Selected Goals", value: `${assessmentData.goals?.selectedGoals?.length || 0} Goals` },
        { label: "Top Priority", value: assessmentData.goals?.goalPriorities?.[0] ? assessmentData.goals.goalPriorities[0].toUpperCase() : "Emergency Fund" },
      ],
    },
    {
      key: "documents",
      title: "Document Readiness",
      icon: <DescriptionIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-pink-50 text-pink-700",
      bulletColor: "bg-pink-500",
      editRoute: "/government-documents",
      items: getSelectedDocumentItems(),
    },
    {
      key: "checklist",
      title: "Review Checklist",
      icon: <ChecklistIcon sx={{ fontSize: 22 }} />,
      iconColor: "bg-sky-50 text-sky-700",
      bulletColor: "bg-sky-500",
      editRoute: "/review-submit",
      items: [
        { label: "All Steps Reviewed", value: "", check: true },
        { label: "Data Verified", value: "", check: true },
        { label: "Ready for AI Insights", value: "", check: true },
      ],
    },
  ];

  const handleSubmit = () => {
    if (!declarationOneAccepted || !declarationTwoAccepted) {
      setSubmitAttempted(true);
      return;
    }
    completeAssessment();
    navigate("/ai-processing");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── NAVBAR ─── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
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
                className={`group/nav relative text-[15px] font-semibold transition-colors duration-250 ${
                  i === 0
                    ? "text-navy-950"
                    : "text-slate-700 hover:text-brand-green-600"
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
            <button className="relative grid h-10 w-10 place-items-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy-950">
              <NotificationsNoneIcon sx={{ fontSize: 22 }} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green-500" />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                VG
              </span>
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className="text-slate-600"
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
          <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-slate-700 hover:text-brand-green-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <button className="relative grid h-10 w-10 place-items-center rounded-full text-slate-600">
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
              Review Your Information
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 font-medium">
              Please review all the information you've provided before submitting your assessment.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-bold text-brand-green-700">
                Step 12 of 12
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-[20px] top-4 h-0.5 w-[calc(100%-40px)] bg-slate-200" />
              <div className="absolute left-[20px] top-4 h-0.5 w-[calc(100%-40px)] bg-brand-green-500" />
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

        {/* ─── Section Title + Expand All ─── */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold text-navy-950">
              Summary of Your Information
            </p>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Here's a quick overview of the details you've provided.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex h-10 items-center gap-2 self-start rounded-xl border-2 border-brand-green-600 bg-white px-4 text-sm font-bold text-brand-green-700 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
          >
            <ListIcon sx={{ fontSize: 18 }} />
            {expanded ? "Collapse All" : "Expand All"}
          </button>
        </div>

        {/* ─── Summary Cards Grid ─── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <div
              key={card.key}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconColor}`}
                  >
                    {card.icon}
                  </span>
                  <p className="text-sm font-bold text-navy-950">
                    {card.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(card.editRoute)}
                  className="flex items-center gap-1.5 rounded-lg border-2 border-brand-green-600 bg-white px-3 py-1.5 text-xs font-bold text-brand-green-700 transition-all hover:bg-brand-green-50"
                >
                  <EditIcon sx={{ fontSize: 14 }} />
                  Edit
                </button>
              </div>
              <ul className="space-y-2.5">
                {card.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${card.bulletColor}`}
                      />
                      <span className="text-slate-600 font-medium">{item.label}:</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-navy-950">
                        {item.value}
                      </span>
                      {item.check && (
                        <CheckCircleIcon
                          sx={{ fontSize: 16 }}
                          className="text-brand-green-600"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Declaration Section ─── */}
        <div className="mt-8 rounded-2xl border border-brand-green-300 bg-brand-green-50/60 p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green-100">
              <VerifiedUserIcon
                sx={{ fontSize: 24 }}
                className="text-brand-green-700"
              />
            </span>
            <div className="flex-1">
              <p className="text-base font-extrabold text-navy-950">Declaration</p>
              <div className="mt-3 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeclarationOneAccepted((v) => !v);
                    setSubmitAttempted(false);
                  }}
                  aria-pressed={declarationOneAccepted}
                  className="flex items-start gap-2.5 text-left text-sm leading-relaxed text-slate-700 font-medium"
                >
                  {declarationOneAccepted ? (
                    <CheckBoxIcon
                      sx={{ fontSize: 22 }}
                      className="mt-0.5 shrink-0 text-brand-green-600"
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      sx={{ fontSize: 22 }}
                      className="mt-0.5 shrink-0 text-slate-500"
                    />
                  )}
                  I hereby declare that all the information provided above is true, accurate, and complete to the best of my knowledge.
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeclarationTwoAccepted((v) => !v);
                    setSubmitAttempted(false);
                  }}
                  aria-pressed={declarationTwoAccepted}
                  className="flex items-start gap-2.5 text-left text-sm leading-relaxed text-slate-700 font-medium"
                >
                  {declarationTwoAccepted ? (
                    <CheckBoxIcon
                      sx={{ fontSize: 22 }}
                      className="mt-0.5 shrink-0 text-brand-green-600"
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      sx={{ fontSize: 22 }}
                      className="mt-0.5 shrink-0 text-slate-500"
                    />
                  )}
                  I understand that this information will be used to generate my financial wellness assessment and recommendations.
                </button>
              </div>
              {submitAttempted && (!declarationOneAccepted || !declarationTwoAccepted) && (
                <p className="mt-3 text-xs font-semibold text-red-600">
                  Please agree to both declarations before submitting your assessment.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Action Buttons ─── */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/selected-documents")}
            className="flex h-12 items-center gap-2 rounded-xl border-2 border-brand-green-600 bg-white px-6 text-sm font-bold text-brand-green-700 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            Back
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex h-12 items-center gap-2 rounded-xl border-2 border-brand-green-600 bg-white px-6 text-sm font-bold text-brand-green-700 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
          >
            <DownloadIcon sx={{ fontSize: 18 }} />
            Download Summary
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex h-12 items-center gap-2 rounded-xl bg-brand-green-500 px-8 text-[15px] font-bold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
          >
            Submit Assessment
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Security Message */}
        <p className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600">
          <LockIcon sx={{ fontSize: 16 }} className="text-brand-green-600" />
          Your information is secure and encrypted
        </p>
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
                        className="text-sm font-normal text-slate-300 transition-colors duration-200 hover:text-brand-green-400"
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
              <ul className="mt-5 space-y-4 text-sm font-normal text-slate-300">
                <li className="flex items-center gap-2.5">
                  <EmailIcon sx={{ fontSize: 16 }} className="text-slate-300" />
                  support@smartfincompass.com
                </li>
                <li className="flex items-center gap-2.5">
                  <CallIcon sx={{ fontSize: 16 }} className="text-slate-300" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2.5">
                  <PlaceIcon sx={{ fontSize: 16 }} className="text-slate-300" />
                  Bangalore, Karnataka, India
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs font-normal text-slate-300 sm:flex-row">
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
