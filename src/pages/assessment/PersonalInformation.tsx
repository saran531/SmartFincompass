import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShieldIcon from "@mui/icons-material/Shield";
import LockIcon from "@mui/icons-material/Lock";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FlagIcon from "@mui/icons-material/Flag";
import ReviewIcon from "@mui/icons-material/RateReview";
import AssessmentInput from "./components/AssessmentInput";
import AssessmentSelect from "./components/AssessmentSelect";
import AssessmentDatePicker from "./components/AssessmentDatePicker";
import PhoneInput from "./components/PhoneInput";

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
  { label: "Personal Info", icon: PersonIcon, active: true },
  { label: "Income & Expenses", icon: FormatListBulletedIcon, active: false },
  { label: "Goals & Preferences", icon: FlagIcon, active: false },
  { label: "Review & Insights", icon: ReviewIcon, active: false },
];

const GENDER_OPTIONS = [
  { label: "Male", icon: PersonIcon },
  { label: "Female", icon: PersonIcon },
  { label: "Other", icon: PersonIcon },
];

const MARITAL_STATUS_OPTIONS = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Prefer not to say",
];

const EDUCATION_OPTIONS = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Professional Degree",
  "Other",
];

const WHY_WE_ASK = [
  {
    icon: LightbulbIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Personalized Insights",
    desc: "Helps us provide insights tailored to your profile",
  },
  {
    icon: AnalyticsIcon,
    color: "text-sky-500 bg-sky-50",
    title: "Accurate Recommendations",
    desc: "Enables better financial recommendations",
  },
  {
    icon: CompareArrowsIcon,
    color: "text-violet-500 bg-violet-50",
    title: "Benchmarking",
    desc: "Compare your financial health with relevant peers",
  },
];

export default function PersonalInformation() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [fullName, setFullName] = useState(assessmentData.personalInfo?.fullName || "");
  const [email, setEmail] = useState(assessmentData.personalInfo?.email || "");
  const [phone, setPhone] = useState(assessmentData.personalInfo?.phone || "");
  const [dob, setDob] = useState(assessmentData.personalInfo?.dateOfBirth || "");
  const [gender, setGender] = useState(assessmentData.personalInfo?.gender || "Male");
  const [maritalStatus, setMaritalStatus] = useState(assessmentData.personalInfo?.maritalStatus || "");
  const [dependents, setDependents] = useState(Number(assessmentData.personalInfo?.dependents) || 0);

  const initialEdu = assessmentData.personalInfo?.education || "";
  const isStdEdu = EDUCATION_OPTIONS.includes(initialEdu);
  const [education, setEducation] = useState(isStdEdu ? initialEdu : (initialEdu ? "Other" : ""));
  const [educationOther, setEducationOther] = useState(isStdEdu ? "" : initialEdu);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) {
      e.fullName = "Please enter your full name.";
    } else if (fullName.trim().length < 2) {
      e.fullName = "Full name must be at least 2 characters long.";
    }

    if (!email.trim()) {
      e.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Please enter a valid email address.";
    }

    if (phone && phone.length !== 10) {
      e.phone = "Phone number must contain exactly 10 digits.";
    }

    if (education === "Other" && !educationOther.trim()) {
      e.educationOther = "Please specify your education level.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }, [fullName, email, phone, education, educationOther]);

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
              Personal Information
            </h1>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-900/70">
              Help us understand you better. This information is secure and
              used to create your personalized roadmap.
            </p>
          </div>

          {/* Assessment Progress */}
          <div className="w-full max-w-lg rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm sm:text-base font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-50 px-3 py-1 text-xs font-semibold text-brand-green-600">
                Step 1 of 4
              </span>
            </div>
            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-6 top-5 h-0.5 w-[calc(100%-48px)] bg-navy-950/8" />
              <div className="flex items-start justify-between">
                {PROGRESS_STEPS.map((step) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center text-center"
                    style={{ width: "25%" }}
                  >
                    <span
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        step.active
                          ? "bg-brand-green-500 text-white shadow-[0_0_12px_rgba(34,181,115,0.25)]"
                          : "border-2 border-navy-950/10 bg-white text-navy-900/40"
                      }`}
                    >
                      {step.active ? (
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                      ) : (
                        PROGRESS_STEPS.indexOf(step) + 1
                      )}
                    </span>
                    <p
                      className={`mt-2.5 text-xs sm:text-sm font-semibold ${
                        step.active ? "text-brand-green-600" : "text-navy-900/60"
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
          <div className="rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.04)] sm:p-8">
            {/* Section Heading */}
            <div className="mb-8 flex items-center gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-600">
                <PersonIcon sx={{ fontSize: 22 }} />
              </span>
              <div>
                <p className="text-base sm:text-lg font-bold text-navy-950">
                  Basic Details
                </p>
                <p className="text-xs sm:text-sm font-medium text-navy-900/60">
                  Your basic information helps us personalize your experience.
                </p>
              </div>
            </div>

            {/* Full Name + Email — side by side */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <AssessmentInput
                label="Full Name"
                value={fullName}
                onChange={(v) => {
                  setFullName(v);
                  if (errors.fullName) setErrors((p) => { const n = { ...p }; delete n.fullName; return n; });
                }}
                mode="text-only"
                placeholder="Enter your full name"
                icon={<PersonIcon sx={{ fontSize: 20 }} />}
                required
                error={errors.fullName}
              />
              <AssessmentInput
                label="Email Address"
                value={email}
                onChange={(v) => {
                  setEmail(v);
                  if (errors.email) setErrors((p) => { const n = { ...p }; delete n.email; return n; });
                }}
                type="email"
                placeholder="Enter your email address"
                icon={<EmailIcon sx={{ fontSize: 20 }} />}
                required
                error={errors.email}
              />
            </div>

            {/* Phone Number */}
            <div className="mt-5">
              <PhoneInput
                label="Phone Number"
                value={phone}
                onChange={(v) => {
                  setPhone(v);
                  if (errors.phone) setErrors((p) => { const n = { ...p }; delete n.phone; return n; });
                }}
                placeholder="Enter 10-digit mobile number"
                error={errors.phone}
              />
            </div>

            {/* Date of Birth */}
            <div className="mt-5">
              <AssessmentDatePicker
                label="Date of Birth"
                value={dob}
                onChange={(v) => setDob(v)}
                placeholder="DD / MM / YYYY"
                max={new Date().toISOString().split("T")[0]}
                icon={<CalendarTodayIcon sx={{ fontSize: 20 }} />}
              />
            </div>

            {/* Gender */}
            <div className="mt-5">
              <label className="mb-3 block text-sm sm:text-base font-semibold text-navy-950">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-4">
                {GENDER_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setGender(opt.label)}
                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 ${
                      gender === opt.label
                        ? "border-brand-green-500 bg-brand-green-50/50"
                        : "border-navy-950/8 bg-white hover:border-navy-950/15"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        gender === opt.label
                          ? "bg-brand-green-100 text-brand-green-600"
                          : "bg-slate-100 text-navy-900/40"
                      }`}
                    >
                      <opt.icon sx={{ fontSize: 20 }} />
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-navy-950">
                      {opt.label}
                    </span>
                    <span
                      className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        gender === opt.label
                          ? "border-brand-green-500"
                          : "border-navy-950/15"
                      }`}
                    >
                      {gender === opt.label && (
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-green-500" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Marital Status */}
            <div className="mt-5">
              <AssessmentSelect
                label="Marital Status"
                value={maritalStatus}
                onChange={(v) => setMaritalStatus(v)}
                options={MARITAL_STATUS_OPTIONS}
                placeholder="Select your marital status"
              />
            </div>

            {/* Dependents + Education — side by side */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                  Dependents
                </label>
                <div className="flex items-center gap-0">
                  <span className="flex h-12 items-center pl-3.5 text-navy-900/40">
                    <GroupsIcon sx={{ fontSize: 20 }} />
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setDependents((d) => Math.max(0, d - 1))
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-l-xl border border-r-0 border-navy-950/10 bg-slate-50 text-lg font-bold text-navy-900/50 transition-colors hover:bg-slate-100 active:bg-slate-200"
                  >
                    −
                  </button>
                  <span className="flex h-12 w-14 items-center justify-center border-y border-navy-950/10 bg-white text-sm sm:text-base font-semibold text-navy-950">
                    {dependents}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setDependents((d) => Math.min(20, d + 1))
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-r-xl border border-l-0 border-navy-950/10 bg-slate-50 text-lg font-bold text-navy-900/50 transition-colors hover:bg-slate-100 active:bg-slate-200"
                  >
                    +
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-navy-900/40">
                  Include children, parents or other dependents
                </p>
              </div>
              <div>
                <AssessmentSelect
                  label="Education"
                  value={education}
                  onChange={(v) => {
                    setEducation(v);
                    if (v !== "Other") setEducationOther("");
                  }}
                  options={EDUCATION_OPTIONS}
                  placeholder="Select your education level"
                  otherValue={educationOther}
                  onOtherChange={(v) => {
                    setEducationOther(v);
                    if (errors.educationOther) setErrors((p) => { const n = { ...p }; delete n.educationOther; return n; });
                  }}
                  otherPlaceholder="Please specify your education level"
                  otherError={errors.educationOther}
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (!validate()) return;
                  updateAssessment("personalInfo", { fullName, email, phone, dateOfBirth: dob, gender, maritalStatus, dependents: String(dependents), education: education === "Other" ? educationOther : education });
                  navigate("/employment-details");
                }}
                className="flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-brand-green-500 text-[15px] font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </button>
              <p className="mt-4 flex items-center gap-2 text-sm text-navy-900/50">
                <span className="text-brand-green-500">
                  <CheckCircleIcon sx={{ fontSize: 16 }} />
                </span>
                Your information is safe with us and 100% secure
              </p>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Your Information is Safe */}
            <div className="rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
              {/* Illustration placeholder */}
              <div className="relative mb-5 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-sky-50 to-brand-green-50/50 px-4 py-8">
                <div className="relative">
                  {/* Shield icon */}
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                    <ShieldIcon
                      sx={{ fontSize: 40 }}
                      className="text-brand-green-500"
                    />
                  </span>
                  {/* Person silhouette */}
                  <span className="absolute -bottom-1 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-navy-950/5">
                    <PersonIcon
                      sx={{ fontSize: 20 }}
                      className="text-navy-900/30"
                    />
                  </span>
                </div>
                {/* Decorative dots */}
                <div className="absolute right-6 top-4 flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green-400/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green-400/40" />
                </div>
                <div className="absolute bottom-4 left-6">
                  <span className="h-2 w-2 rounded-full bg-brand-green-300/30" />
                </div>
                <div className="absolute right-10 bottom-6">
                  <span className="h-1 w-1 rounded-full bg-sky-300/40" />
                </div>
                {/* Checkmark badge */}
                <span className="absolute -bottom-2 right-8 flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-500 text-white shadow-md">
                  <CheckCircleIcon sx={{ fontSize: 16 }} />
                </span>
              </div>

              <h3 className="text-center text-base font-bold text-navy-950">
                Your Information is Safe
              </h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-navy-900/50">
                We use bank-level encryption to protect your data and ensure
                your privacy.
              </p>
            </div>

            {/* Card 2: Why We Ask This */}
            <div className="rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
              <h3 className="mb-5 text-base font-bold text-navy-950">
                Why We Ask This
              </h3>
              <div className="space-y-5">
                {WHY_WE_ASK.map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <item.icon sx={{ fontSize: 20 }} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy-950">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-navy-900/50">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Need Help? */}
            <div className="rounded-2xl border border-navy-950/5 bg-white p-7 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-600">
                  <CallIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Need Help?
                </h3>
              </div>
              <p className="text-sm text-navy-900/50">
                If you have any questions, we're here to help.
              </p>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-600 transition-colors hover:text-brand-green-700"
              >
                Contact Support
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </a>
            </div>
          </div>
        </div>

        {/* ─── PRIVACY BANNER ─── */}
        <div className="mt-10 rounded-2xl border border-navy-950/5 bg-brand-green-50/40 px-7 py-6">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600">
              <LockIcon sx={{ fontSize: 20 }} />
            </span>
            <div>
              <p className="text-base font-bold text-navy-950">
                We respect your privacy.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-navy-900/50">
                Your data is never shared with third parties and used only for
                improving your financial wellness.
              </p>
            </div>
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
