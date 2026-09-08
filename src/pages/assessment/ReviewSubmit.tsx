import { useState } from "react";
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
  const [agreed, setAgreed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

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
        { label: "Business / Other", value: assessmentData.income.business || assessmentData.income.other ? `₹ ${(Number(assessmentData.income.business || 0) + Number(assessmentData.income.other || 0)).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Freelance / Rental", value: assessmentData.income.freelance || assessmentData.income.rental ? `₹ ${(Number(assessmentData.income.freelance || 0) + Number(assessmentData.income.rental || 0)).toLocaleString("en-IN")}` : "₹ 0" },
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
        { label: "Housing & Utilities", value: `₹ ${(Number(assessmentData.expenses?.housing || 0) + Number(assessmentData.expenses?.utilities || 0)).toLocaleString("en-IN")}` },
        { label: "Food & Transport", value: `₹ ${(Number(assessmentData.expenses?.food || 0) + Number(assessmentData.expenses?.transport || 0)).toLocaleString("en-IN")}` },
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
        { label: "Mutual Funds & Stocks", value: `₹ ${(Number(assessmentData.assets?.mutualFunds || 0) + Number(assessmentData.assets?.stocks || 0)).toLocaleString("en-IN")}` },
        { label: "Bank Deposits & Gold", value: `₹ ${(Number(assessmentData.assets?.bankAccounts || 0) + Number(assessmentData.assets?.gold || 0)).toLocaleString("en-IN")}` },
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
        { label: "Home & Car Loans", value: `₹ ${(Number(assessmentData.liabilities?.homeLoan || 0) + Number(assessmentData.liabilities?.carLoan || 0)).toLocaleString("en-IN")}` },
        { label: "Personal & Credit Card", value: `₹ ${(Number(assessmentData.liabilities?.personalLoan || 0) + Number(assessmentData.liabilities?.creditCard || 0)).toLocaleString("en-IN")}` },
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
        { label: "PPF / EPF / RD", value: `₹ ${(Number(assessmentData.savings?.ppf || 0) + Number(assessmentData.savings?.epf || 0) + Number(assessmentData.savings?.recurringDeposit || 0)).toLocaleString("en-IN")}` },
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
      items: [
        { label: "PAN Card", value: assessmentData.documents?.pan ? (["uploaded", "pending"].includes(assessmentData.documents.pan) ? assessmentData.documents.pan.toUpperCase() : "Uploaded") : "Pending" },
        { label: "Aadhaar", value: assessmentData.documents?.aadhaar ? (["uploaded", "pending"].includes(assessmentData.documents.aadhaar) ? assessmentData.documents.aadhaar : "Uploaded") : "Pending" },
      ],
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
    if (!agreed) {
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
              <p className="mt-2 text-sm leading-relaxed text-slate-700 font-medium">
                I hereby declare that all the information provided above is true, accurate, and complete to the best of my knowledge.
                <br />
                I understand that this information will be used to generate my financial wellness assessment and recommendations.
              </p>
              <button
                type="button"
                onClick={() => {
                  setAgreed((v) => !v);
                  setSubmitAttempted(false);
                }}
                className="mt-4 flex items-center gap-2.5 text-sm font-bold text-navy-950"
              >
                {agreed ? (
                  <CheckBoxIcon
                    sx={{ fontSize: 22 }}
                    className="text-brand-green-600"
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    sx={{ fontSize: 22 }}
                    className="text-slate-500"
                  />
                )}
                I agree to the above declaration
              </button>
              {submitAttempted && !agreed && (
                <p className="mt-2 text-xs font-semibold text-red-600">
                  Please agree to the declaration before submitting.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Action Buttons ─── */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/government-documents")}
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
