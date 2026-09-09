import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessIcon from "@mui/icons-material/Business";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HeadsetIcon from "@mui/icons-material/Headset";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import AssessmentInput from "./components/AssessmentInput";
import AssessmentSelect from "./components/AssessmentSelect";
import CurrencyInput from "./components/CurrencyInput";
import PhoneInput from "./components/PhoneInput";

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
  { label: "Employment", active: true },
  { label: "Income Sources", completed: false },
  { label: "Review & Insights", completed: false },
];

const EMPLOYMENT_TYPES = [
  { label: "Salaried", icon: WorkIcon, color: "bg-sky-50 text-sky-600 border border-sky-100" },
  { label: "Self Employed", icon: PersonIcon, color: "bg-violet-50 text-violet-600 border border-violet-100" },
  { label: "Business Owner", icon: BusinessIcon, color: "bg-amber-50 text-amber-700 border border-amber-100" },
  { label: "Freelancer", icon: ComputerIcon, color: "bg-sky-50 text-sky-600 border border-sky-100" },
];

const WHAT_YOU_GET = [
  {
    icon: AssessmentIcon,
    color: "text-brand-green-600 bg-brand-green-50 border border-brand-green-100",
    title: "Accurate Financial Assessment",
    desc: "Based on your income profile",
  },
  {
    icon: AutoGraphIcon,
    color: "text-sky-600 bg-sky-50 border border-sky-100",
    title: "Personalized Recommendations",
    desc: "Tailored to your career stage",
  },
  {
    icon: TrendingUpIcon,
    color: "text-brand-green-600 bg-brand-green-50 border border-brand-green-100",
    title: "Better Planning",
    desc: "Plan your finances with confidence",
  },
];

const INDUSTRY_OPTIONS = ["IT / Technology", "Finance / Banking", "Healthcare", "Education", "Manufacturing", "Real Estate", "Retail", "Others"];
const NATURE_OPTIONS = ["Full-time", "Part-time", "Contract", "Temporary"];
const STABILITY_OPTIONS = ["Very Stable", "Stable", "Moderate", "Variable"];
const BUSINESS_TYPE_OPTIONS = ["Sole Proprietorship", "Partnership", "Private Limited", "LLP", "Others"];
const YEARS_OPTIONS = ["Less than 1 year", "1–2 years", "3–5 years", "5–10 years", "10–15 years", "15+ years"];
const PLATFORM_OPTIONS = ["Upwork", "Fiverr", "Freelancer.com", "Toptal", "LinkedIn", "Direct Clients", "Others"];

export default function EmploymentDetails() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const emp = assessmentData.employment || {};
  const [employmentType, setEmploymentType] = useState(emp.employmentType || "Salaried");
  const [employerName, setEmployerName] = useState(emp.employerName || "");
  const [occupation, setOccupation] = useState(emp.occupation || "");
  const [experience, setExperience] = useState(emp.experience || "");
  const [monthlySalary, setMonthlySalary] = useState(emp.annualIncome || "");
  const [additionalIncome, setAdditionalIncome] = useState(emp.additionalIncome || "");
  const [contactNumber, setContactNumber] = useState(emp.contactNumber || "");

  // Salaried fields
  const [industry, setIndustry] = useState("");
  const [industryOther, setIndustryOther] = useState("");
  const [employmentNature, setEmploymentNature] = useState("");

  // Self Employed fields
  const [profession, setProfession] = useState(emp.occupation || "");
  const [yearsSelfEmployed, setYearsSelfEmployed] = useState(emp.experience || "");
  const [incomeStability, setIncomeStability] = useState("");

  // Business Owner fields
  const [businessType, setBusinessType] = useState(
    BUSINESS_TYPE_OPTIONS.includes(emp.occupation || "") ? (emp.occupation || "") : (emp.occupation ? "Others" : "")
  );
  const [businessTypeOther, setBusinessTypeOther] = useState(
    !BUSINESS_TYPE_OPTIONS.includes(emp.occupation || "") ? (emp.occupation || "") : ""
  );
  const [yearsInBusiness, setYearsInBusiness] = useState(emp.experience || "");
  const [annualTurnover, setAnnualTurnover] = useState(emp.businessIncome || "");
  const [numEmployees, setNumEmployees] = useState("");
  const [personalIncome, setPersonalIncome] = useState(emp.annualIncome || "");

  // Freelancer fields
  const [freelanceProfession, setFreelanceProfession] = useState(emp.occupation || "");
  const [yearsFreelancing, setYearsFreelancing] = useState(emp.experience || "");
  const [mainServices, setMainServices] = useState("");
  const [activeClients, setActiveClients] = useState("");
  const [mainPlatform, setMainPlatform] = useState(
    PLATFORM_OPTIONS.includes(emp.employerName || "") ? (emp.employerName || "") : (emp.employerName ? "Others" : "")
  );
  const [platformOther, setPlatformOther] = useState(
    !PLATFORM_OPTIONS.includes(emp.employerName || "") ? (emp.employerName || "") : ""
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTypeChange = (type: string) => {
    setEmploymentType(type);
    setErrors({});
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (contactNumber && contactNumber.length < 7) {
      e.contactNumber = "Please enter a valid phone number.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmitNext = () => {
    if (!validate()) return;

    let savedOccupation = occupation;
    let savedEmployer = employerName;
    let savedIncome = monthlySalary;
    let savedExperience = experience;

    if (employmentType === "Self Employed") {
      savedOccupation = profession;
      savedExperience = yearsSelfEmployed;
    } else if (employmentType === "Business Owner") {
      savedOccupation = businessType === "Others" ? businessTypeOther : businessType;
      savedIncome = personalIncome || annualTurnover;
      savedExperience = yearsInBusiness;
    } else if (employmentType === "Freelancer") {
      savedOccupation = freelanceProfession;
      savedExperience = yearsFreelancing;
      savedEmployer = mainPlatform === "Others" ? platformOther : mainPlatform;
    }

    updateAssessment("employment", {
      employmentType,
      employerName: savedEmployer,
      occupation: savedOccupation,
      experience: savedExperience,
      annualIncome: savedIncome,
      additionalIncome,
      businessIncome: annualTurnover,
      contactNumber,
    });

    navigate("/income-details");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── NAVBAR ─── */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-sm">
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
                    ? "text-navy-950 font-bold"
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
            <button className="relative grid h-10 w-10 place-items-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 hover:text-navy-950">
              <NotificationsNoneIcon sx={{ fontSize: 22 }} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green-500" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white shadow-sm">
                VG
              </span>
              <KeyboardArrowDownIcon
                sx={{ fontSize: 18 }}
                className="text-slate-700 font-bold"
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
                  className="text-sm font-semibold text-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <button className="relative grid h-10 w-10 place-items-center rounded-full text-slate-700">
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
            <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl tracking-tight">
              Employment Details
            </h1>
            <p className="mt-3 text-base sm:text-lg leading-relaxed font-medium text-slate-700">
              Tell us about your employment to help us analyze your income
              stability and financial profile.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-lg rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-base font-extrabold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-100/90 px-3.5 py-1 text-xs font-extrabold text-brand-green-800 border border-brand-green-200">
                Step 2 of 4
              </span>
            </div>
            <div className="relative">
              {/* Connector lines */}
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(100%-80px)] bg-slate-200" />
              <div className="absolute left-[40px] top-5 h-0.5 w-[calc(33.33%-20px)] bg-brand-green-500" />
              <div className="flex items-start justify-between">
                {PROGRESS_STEPS.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center text-center"
                    style={{ width: "25%" }}
                  >
                    <span
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        step.completed || step.active
                          ? "bg-brand-green-500 text-white shadow-[0_0_14px_rgba(34,181,115,0.3)]"
                          : "border-2 border-slate-300 bg-white text-slate-500 font-bold"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <p
                      className={`mt-2.5 text-xs sm:text-sm font-extrabold ${
                        step.active || step.completed
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
          <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm sm:p-8">
            {/* Employment Type */}
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-navy-950">
                Employment Type
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Select the type of your employment
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {EMPLOYMENT_TYPES.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleTypeChange(opt.label)}
                    className={`option-card-interactive relative flex flex-col items-center gap-3 rounded-xl border-2 px-4 py-5 text-center cursor-pointer transition-all duration-200 ${
                      employmentType === opt.label
                        ? "selected border-brand-green-500 bg-brand-green-50/80 shadow-xs"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {employmentType === opt.label && (
                      <span className="absolute right-2 top-2 text-brand-green-600">
                        <CheckCircleIcon sx={{ fontSize: 18 }} />
                      </span>
                    )}
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${opt.color}`}
                    >
                      <opt.icon sx={{ fontSize: 24 }} />
                    </span>
                    <span className="text-sm sm:text-base font-bold text-navy-950">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── EMPLOYMENT TYPE SPECIFIC FIELDS ── */}
            {employmentType === "Salaried" && (
              <div className="mt-8 space-y-5">
                <p className="text-lg font-extrabold text-navy-950">Salaried Employment Details</p>
                <AssessmentInput
                  label="Employer / Company Name"
                  value={employerName}
                  onChange={(v) => {
                    setEmployerName(v);
                    if (errors.employerName) setErrors((p) => { const n = { ...p }; delete n.employerName; return n; });
                  }}
                  mode="all"
                  placeholder="Enter employer or company name"
                  icon={<BusinessCenterIcon sx={{ fontSize: 20 }} />}
                  error={errors.employerName}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentInput
                    label="Job Title / Designation"
                    value={occupation}
                    onChange={(v) => {
                      setOccupation(v);
                      if (errors.occupation) setErrors((p) => { const n = { ...p }; delete n.occupation; return n; });
                    }}
                    mode="all"
                    placeholder="e.g. Software Engineer"
                    icon={<PersonIcon sx={{ fontSize: 20 }} />}
                    error={errors.occupation}
                  />
                  <AssessmentSelect
                    label="Industry"
                    value={industry}
                    onChange={(v) => setIndustry(v)}
                    options={INDUSTRY_OPTIONS}
                    placeholder="Select industry"
                    otherValue={industryOther}
                    onOtherChange={(v) => setIndustryOther(v)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentSelect
                    label="Years of Experience"
                    value={experience}
                    onChange={(v) => setExperience(v)}
                    options={YEARS_OPTIONS}
                    placeholder="Select total experience"
                  />
                  <AssessmentSelect
                    label="Employment Type / Nature"
                    value={employmentNature}
                    onChange={(v) => setEmploymentNature(v)}
                    options={NATURE_OPTIONS}
                    placeholder="Select employment nature"
                  />
                </div>
                <PhoneInput
                  label="HR / Work Contact Number (Optional)"
                  value={contactNumber}
                  onChange={(v) => {
                    setContactNumber(v);
                    if (errors.contactNumber) setErrors((p) => { const n = { ...p }; delete n.contactNumber; return n; });
                  }}
                  placeholder="Enter work phone number"
                  error={errors.contactNumber}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <CurrencyInput
                    label="Monthly Salary (In-hand)"
                    value={monthlySalary}
                    onChange={(v) => setMonthlySalary(v)}
                    placeholder="Enter monthly take-home salary"
                  />
                  <CurrencyInput
                    label="Additional Income (Optional)"
                    value={additionalIncome}
                    onChange={(v) => setAdditionalIncome(v)}
                    placeholder="Enter additional monthly income"
                  />
                </div>
              </div>
            )}

            {employmentType === "Self Employed" && (
              <div className="mt-8 space-y-5">
                <p className="text-lg font-extrabold text-navy-950">Self Employment Details</p>
                <AssessmentInput
                  label="Profession / Service"
                  value={profession}
                  onChange={(v) => {
                    setProfession(v);
                    if (errors.profession) setErrors((p) => { const n = { ...p }; delete n.profession; return n; });
                  }}
                  mode="all"
                  placeholder="e.g. Architect, Financial Consultant"
                  icon={<PersonIcon sx={{ fontSize: 20 }} />}
                  error={errors.profession}
                />
                <AssessmentInput
                  label="Business / Practice Name"
                  value={employerName}
                  onChange={(v) => setEmployerName(v)}
                  mode="all"
                  placeholder="Enter business or practice name"
                  icon={<BusinessCenterIcon sx={{ fontSize: 20 }} />}
                />
                <PhoneInput
                  label="Business Contact Number (Optional)"
                  value={contactNumber}
                  onChange={(v) => {
                    setContactNumber(v);
                    if (errors.contactNumber) setErrors((p) => { const n = { ...p }; delete n.contactNumber; return n; });
                  }}
                  placeholder="Enter business phone number"
                  error={errors.contactNumber}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentSelect
                    label="Years Self Employed"
                    value={yearsSelfEmployed}
                    onChange={(v) => setYearsSelfEmployed(v)}
                    options={YEARS_OPTIONS}
                    placeholder="Select years self employed"
                  />
                  <AssessmentSelect
                    label="Income Stability"
                    value={incomeStability}
                    onChange={(v) => setIncomeStability(v)}
                    options={STABILITY_OPTIONS}
                    placeholder="Select income stability"
                  />
                </div>
                <CurrencyInput
                  label="Average Monthly Income"
                  value={monthlySalary}
                  onChange={(v) => setMonthlySalary(v)}
                  placeholder="Enter average monthly income"
                />
              </div>
            )}

            {employmentType === "Business Owner" && (
              <div className="mt-8 space-y-5">
                <p className="text-lg font-extrabold text-navy-950">Business Owner Details</p>
                <AssessmentInput
                  label="Business Name"
                  value={employerName}
                  onChange={(v) => {
                    setEmployerName(v);
                    if (errors.employerName) setErrors((p) => { const n = { ...p }; delete n.employerName; return n; });
                  }}
                  mode="all"
                  placeholder="Enter business name"
                  icon={<BusinessIcon sx={{ fontSize: 20 }} />}
                  error={errors.employerName}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentSelect
                    label="Business Type"
                    value={businessType}
                    onChange={(v) => setBusinessType(v)}
                    options={BUSINESS_TYPE_OPTIONS}
                    placeholder="Select business type"
                    otherValue={businessTypeOther}
                    onOtherChange={(v) => setBusinessTypeOther(v)}
                  />
                  <AssessmentSelect
                    label="Industry"
                    value={industry}
                    onChange={(v) => setIndustry(v)}
                    options={INDUSTRY_OPTIONS}
                    placeholder="Select industry"
                    otherValue={industryOther}
                    onOtherChange={(v) => setIndustryOther(v)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentSelect
                    label="Years in Business"
                    value={yearsInBusiness}
                    onChange={(v) => setYearsInBusiness(v)}
                    options={YEARS_OPTIONS}
                    placeholder="Select years in business"
                  />
                  <AssessmentInput
                    label="Number of Employees"
                    value={numEmployees}
                    onChange={(v) => setNumEmployees(v)}
                    mode="number-only"
                    placeholder="e.g. 15"
                    maxLength={5}
                  />
                </div>
                <PhoneInput
                  label="Business Phone Number (Optional)"
                  value={contactNumber}
                  onChange={(v) => {
                    setContactNumber(v);
                    if (errors.contactNumber) setErrors((p) => { const n = { ...p }; delete n.contactNumber; return n; });
                  }}
                  placeholder="Enter business phone number"
                  error={errors.contactNumber}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <CurrencyInput
                    label="Annual Turnover"
                    value={annualTurnover}
                    onChange={(v) => setAnnualTurnover(v)}
                    placeholder="Enter annual turnover"
                  />
                  <CurrencyInput
                    label="Average Monthly Personal Income"
                    value={personalIncome}
                    onChange={(v) => setPersonalIncome(v)}
                    placeholder="Enter monthly personal income"
                  />
                </div>
              </div>
            )}

            {employmentType === "Freelancer" && (
              <div className="mt-8 space-y-5">
                <p className="text-lg font-extrabold text-navy-950">Freelancer Details</p>
                <AssessmentInput
                  label="Primary Freelance Profession"
                  value={freelanceProfession}
                  onChange={(v) => {
                    setFreelanceProfession(v);
                    if (errors.freelanceProfession) setErrors((p) => { const n = { ...p }; delete n.freelanceProfession; return n; });
                  }}
                  mode="all"
                  placeholder="e.g. Web Developer, Content Writer"
                  icon={<ComputerIcon sx={{ fontSize: 20 }} />}
                  error={errors.freelanceProfession}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentSelect
                    label="Years Freelancing"
                    value={yearsFreelancing}
                    onChange={(v) => setYearsFreelancing(v)}
                    options={YEARS_OPTIONS}
                    placeholder="Select years freelancing"
                  />
                  <AssessmentSelect
                    label="Income Stability"
                    value={incomeStability}
                    onChange={(v) => setIncomeStability(v)}
                    options={STABILITY_OPTIONS}
                    placeholder="Select income stability"
                  />
                </div>
                <AssessmentInput
                  label="Main Services Offered"
                  value={mainServices}
                  onChange={(v) => setMainServices(v)}
                  mode="all"
                  placeholder="e.g. Fullstack Web Development, Mobile Apps"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentInput
                    label="Number of Active Clients"
                    value={activeClients}
                    onChange={(v) => setActiveClients(v)}
                    mode="number-only"
                    placeholder="e.g. 5"
                    maxLength={4}
                  />
                  <PhoneInput
                    label="Work Contact Number (Optional)"
                    value={contactNumber}
                    onChange={(v) => {
                      setContactNumber(v);
                      if (errors.contactNumber) setErrors((p) => { const n = { ...p }; delete n.contactNumber; return n; });
                    }}
                    placeholder="Enter work contact number"
                    error={errors.contactNumber}
                  />
                </div>
                <AssessmentSelect
                  label="Main Platform / Client Source"
                  value={mainPlatform}
                  onChange={(v) => setMainPlatform(v)}
                  options={PLATFORM_OPTIONS}
                  placeholder="Select main platform"
                  otherValue={platformOther}
                  onOtherChange={(v) => setPlatformOther(v)}
                />
                <CurrencyInput
                  label="Average Monthly Income"
                  value={monthlySalary}
                  onChange={(v) => setMonthlySalary(v)}
                  placeholder="Enter average monthly income"
                />
              </div>
            )}

            {/* Bottom Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/personal-information")}
                className="flex h-12 items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 text-sm sm:text-base font-bold text-navy-950 transition-all duration-250 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmitNext}
                className="flex h-12 items-center gap-2 rounded-xl bg-brand-green-500 px-8 text-sm sm:text-base font-bold text-white shadow-md transition-all duration-250 hover:bg-brand-green-600 hover:shadow-lg active:scale-[0.98]"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <LockIcon sx={{ fontSize: 18 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Why We Need This */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm">
              {/* Illustration */}
              <div className="relative mb-5 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-sky-50 to-brand-green-50/70 px-4 py-8 border border-slate-100">
                <div className="relative">
                  {/* Briefcase */}
                  <span className="flex h-16 w-20 items-center justify-center rounded-xl bg-brand-green-500 shadow-md">
                    <BusinessCenterIcon
                      sx={{ fontSize: 32 }}
                      className="text-white"
                    />
                  </span>
                </div>
                {/* Shield checkmark */}
                <span className="absolute bottom-6 right-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-500 text-white shadow-md">
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                </span>
              </div>

              <h3 className="text-center text-base sm:text-lg font-extrabold text-navy-950">
                Why We Need This
              </h3>
              <p className="mt-2 text-center text-sm font-medium leading-relaxed text-slate-600">
                This helps us evaluate your income stability, career growth
                potential, and overall financial strength.
              </p>
            </div>

            {/* Card 2: What You'll Get */}
            <div className="rounded-2xl border border-brand-green-200/80 bg-brand-green-50/50 p-7 shadow-xs">
              <h3 className="mb-5 text-base sm:text-lg font-extrabold text-navy-950">
                What You'll Get
              </h3>
              <div className="space-y-5">
                {WHAT_YOU_GET.map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <item.icon sx={{ fontSize: 20 }} />
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-extrabold text-navy-950">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm font-medium leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Need Help? */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 border border-sky-200">
                  <HeadsetIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-navy-950">
                  Need Help?
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-600">
                Our support team is here to assist you.
              </p>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-700 transition-colors hover:text-brand-green-800 hover:underline"
              >
                Contact Support
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </a>
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
              <p className="mt-5 max-w-xs text-sm font-medium leading-relaxed text-slate-300">
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
                <p className="text-sm font-bold text-white uppercase tracking-wider">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-brand-green-400"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</p>
              <ul className="mt-5 space-y-4 text-sm font-medium text-slate-300">
                <li className="flex items-center gap-2.5">
                  <EmailIcon className="text-brand-green-400" sx={{ fontSize: 16 }} />
                  support@smartfincompass.com
                </li>
                <li className="flex items-center gap-2.5">
                  <CallIcon className="text-brand-green-400" sx={{ fontSize: 16 }} />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2.5">
                  <PlaceIcon className="text-brand-green-400" sx={{ fontSize: 16 }} />
                  Bangalore, Karnataka, India
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs font-medium text-slate-400 sm:flex-row">
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

