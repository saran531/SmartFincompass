import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp, calculateAge } from "../../context/AppContext";
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
  { label: "Personal Info", icon: PersonIcon, active: true, completed: false },
  { label: "Income & Expenses", icon: FormatListBulletedIcon, active: false, completed: false },
  { label: "Goals & Preferences", icon: FlagIcon, active: false, completed: false },
  { label: "Review & Insights", icon: ReviewIcon, active: false, completed: false },
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
  "Un Educated",
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
    color: "text-brand-green-600 bg-brand-green-50 border border-brand-green-100",
    title: "Personalized Insights",
    desc: "Helps us provide insights tailored to your profile",
  },
  {
    icon: AnalyticsIcon,
    color: "text-sky-600 bg-sky-50 border border-sky-100",
    title: "Accurate Recommendations",
    desc: "Enables better financial recommendations",
  },
  {
    icon: CompareArrowsIcon,
    color: "text-violet-600 bg-violet-50 border border-violet-100",
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
  const [_dependents, _setDependents] = useState(Number(assessmentData.personalInfo?.dependents) || 0);
  const [dependentsBreakdown, setDependentsBreakdown] = useState(
    assessmentData.personalInfo?.dependentsBreakdown || { spouse: 0, children: 0, parents: 0, other: 0 }
  );

  const initialEdu = assessmentData.personalInfo?.education || "";
  const isStdEdu = EDUCATION_OPTIONS.includes(initialEdu);
  const [education, setEducation] = useState(isStdEdu ? initialEdu : (initialEdu ? "Other" : ""));
  const [educationOther, setEducationOther] = useState(isStdEdu ? "" : initialEdu);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (fullName.trim() && fullName.trim().length < 2) {
      e.fullName = "Full name must be at least 2 characters long.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Please enter a valid email address.";
    }

    if (phone.trim() && phone.trim().length < 7) {
      e.phone = "Please enter a valid phone number.";
    }

    if (dob) {
      const age = calculateAge(dob);
      if (age < 14) {
        e.dob = "Age must be at least 14 years.";
      } else if (age > 120) {
        e.dob = "Please enter a valid date of birth.";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }, [fullName, email, phone, dob]);

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
              Personal Information
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 font-medium">
              Please enter your personal details below to begin your financial wellness assessment.
            </p>
          </div>

          {/* Assessment Progress Card */}
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">
                Assessment Progress
              </p>
              <span className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-bold text-brand-green-700">
                Step 1 of 12
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-[20px] top-4 h-0.5 w-[calc(100%-40px)] bg-slate-200" />
              <div className="absolute left-[20px] top-4 h-0.5 w-[calc(100%-40px)] bg-brand-green-500" style={{ width: "8.33%" }} />
              <div className="flex items-start justify-between overflow-x-auto pb-2">
                {PROGRESS_STEPS.map((step, i) => (
                  <div
                    key={step.label}
                    className="flex shrink-0 flex-col items-center text-center px-1"
                    style={{ minWidth: "48px" }}
                  >
                    <span
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        step.active
                          ? "bg-brand-green-500 text-white shadow-sm ring-4 ring-brand-green-100"
                          : step.completed
                          ? "bg-brand-green-500 text-white shadow-sm"
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

        {/* ─── MAIN CONTENT: Form + Sidebar ─── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            {/* Basic Details Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 text-lg font-bold text-navy-950 border-b border-slate-100 pb-3">
                Basic Details
              </h2>

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
                onChange={(v) => { setDob(v); if (errors.dob) setErrors((p) => { const n = { ...p }; delete n.dob; return n; }); }}
                placeholder="DD / MM / YYYY"
                max={new Date().toISOString().split("T")[0]}
                icon={<CalendarTodayIcon sx={{ fontSize: 20 }} />}
              />
              {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob}</p>}
            </div>

            {/* Gender */}
            <div className="mt-5">
              <label className="mb-3 block text-sm sm:text-base font-bold text-navy-950">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-4">
                {GENDER_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setGender(opt.label)}
                    className={`option-card-interactive flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left cursor-pointer transition-all duration-200 ${
                      gender === opt.label
                        ? "selected border-brand-green-500 bg-brand-green-50/80 shadow-xs"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        gender === opt.label
                          ? "bg-brand-green-100 text-brand-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <opt.icon sx={{ fontSize: 20 }} />
                    </span>
                    <span className="text-sm sm:text-base font-bold text-navy-950">
                      {opt.label}
                    </span>
                    <span
                      className={`ml-auto h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        gender === opt.label
                          ? "border-brand-green-500"
                          : "border-slate-300"
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
                <label className="mb-2 block text-sm sm:text-base font-bold text-navy-950">
                  Dependents
                </label>
                <p className="mb-3 text-xs sm:text-sm font-semibold text-slate-600">
                  Include spouse, children, parents or other dependents
                </p>
                <div className="space-y-2">
                  {[
                    { key: "spouse", label: "Spouse", icon: "👤" },
                    { key: "children", label: "Children", icon: "👶" },
                    { key: "parents", label: "Parents", icon: "👨‍👩‍👦" },
                    { key: "other", label: "Other Dependents", icon: "👥" },
                  ].map((cat) => (
                    <div key={cat.key} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <span className="text-xs sm:text-sm font-semibold text-navy-950">{cat.icon} {cat.label}</span>
                      <div className="flex items-center gap-0">
                        <button
                          type="button"
                          onClick={() => setDependentsBreakdown((d) => ({ ...d, [cat.key]: Math.max(0, d[cat.key as keyof typeof d] - 1) }))}
                          className="flex h-7 w-7 items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-slate-100 text-sm font-bold text-navy-950 hover:bg-slate-200 active:bg-slate-300"
                        >
                          −
                        </button>
                        <span className="flex h-7 w-8 items-center justify-center border-y border-slate-300 bg-white text-xs font-bold text-navy-950">
                          {dependentsBreakdown[cat.key as keyof typeof dependentsBreakdown]}
                        </span>
                        <button
                          type="button"
                          onClick={() => setDependentsBreakdown((d) => ({ ...d, [cat.key]: Math.min(10, d[cat.key as keyof typeof d] + 1) }))}
                          className="flex h-7 w-7 items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-slate-100 text-sm font-bold text-navy-950 hover:bg-slate-200 active:bg-slate-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
          </div>

            {/* Next Button */}
            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (!validate()) return;
                  updateAssessment("personalInfo", {
                    fullName, email, phone, dateOfBirth: dob, gender, maritalStatus,
                    dependents: String(Object.values(dependentsBreakdown).reduce((a, b) => a + b, 0)),
                    dependentsBreakdown,
                    education: education === "Other" ? educationOther : education,
                  });
                  navigate("/employment-details");
                }}
                className="flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-brand-green-500 text-base font-bold text-white shadow-md transition-all duration-250 hover:bg-brand-green-600 hover:shadow-lg active:scale-[0.98]"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
              <p className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <span className="text-brand-green-600">
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                </span>
                Your information is safe with us and 100% secure
              </p>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Card 1: Your Information is Safe */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm">
              {/* Illustration placeholder */}
              <div className="relative mb-5 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-sky-50 to-brand-green-50/70 px-4 py-8 border border-slate-100">
                <div className="relative">
                  {/* Shield icon */}
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md border border-brand-green-100">
                    <ShieldIcon
                      sx={{ fontSize: 42 }}
                      className="text-brand-green-600"
                    />
                  </span>
                </div>
                {/* Checkmark badge */}
                <span className="absolute bottom-6 right-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-500 text-white shadow-md">
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                </span>
              </div>

              <h3 className="text-center text-base sm:text-lg font-extrabold text-navy-950">
                Your Information is Safe
              </h3>
              <p className="mt-2 text-center text-sm font-medium leading-relaxed text-slate-600">
                We use bank-level encryption to protect your data and ensure
                your privacy.
              </p>
            </div>

            {/* Card 2: Why We Ask This */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm">
              <h3 className="mb-5 text-base sm:text-lg font-extrabold text-navy-950">
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
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700 border border-brand-green-100">
                  <CallIcon sx={{ fontSize: 18 }} />
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-navy-950">
                  Need Help?
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-600">
                If you have any questions, we're here to help.
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

        {/* ─── PRIVACY BANNER ─── */}
        <div className="mt-10 rounded-2xl border border-brand-green-200/80 bg-brand-green-50/60 px-7 py-6 shadow-xs">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700 border border-brand-green-200/80">
              <LockIcon sx={{ fontSize: 20 }} />
            </span>
            <div>
              <p className="text-base font-extrabold text-navy-950">
                We respect your privacy.
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">
                Your data is never shared with third parties and used only for
                improving your financial wellness.
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

