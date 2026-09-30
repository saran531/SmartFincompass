import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, calculateAge } from "../../context/AppContext";
import PersonIcon from "@mui/icons-material/Person";
import ManIcon from "@mui/icons-material/Man";
import FemaleIcon from "@mui/icons-material/Female";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ShieldIcon from "@mui/icons-material/Shield";
import LockIcon from "@mui/icons-material/Lock";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AssessmentInput from "./components/AssessmentInput";
import AssessmentSelect from "./components/AssessmentSelect";
import AssessmentDatePicker from "./components/AssessmentDatePicker";
import PhoneInput from "./components/PhoneInput";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";

const GENDER_OPTIONS = [
  { label: "Male", icon: ManIcon, tone: "bg-sky-50 text-sky-600" },
  { label: "Female", icon: FemaleIcon, tone: "bg-pink-50 text-pink-600" },
  { label: "Other", icon: PersonIcon, tone: "bg-violet-50 text-violet-600" },
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
    icon: BarChartIcon,
    color: "text-sky-600 bg-sky-50 border border-sky-100",
    title: "Accurate Recommendations",
    desc: "Enables better financial recommendations",
  },
  {
    icon: TrendingUpIcon,
    color: "text-violet-600 bg-violet-50 border border-violet-100",
    title: "Benchmarking",
    desc: "Compare your financial health with relevant peers",
  },
];

export default function PersonalInformation() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();

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
    <div className="assessment-page min-h-screen">
      <style>{`
        .pi-fullname .label-icon { background-color: #eff6ff !important; color: #2563eb !important; }
        .pi-email .label-icon { background-color: #fdf2f8 !important; color: #db2777 !important; }
        .pi-phone .label-icon { background-color: #eafbf3 !important; color: #128052 !important; }
        .pi-dob .label-icon { background-color: #f5f3ff !important; color: #7c3aed !important; }
        .pi-gender .label-icon { background-color: #fff7ed !important; color: #ea580c !important; }
        .pi-marital .label-icon { background-color: #eafbf3 !important; color: #128052 !important; }
        .pi-dependents .label-icon { background-color: #eff6ff !important; color: #2563eb !important; }
        .pi-education .label-icon { background-color: #f5f3ff !important; color: #7c3aed !important; }
        .assessment-page .label-icon { height: 28px !important; width: 28px !important; border-radius: 9px !important; }
        .assessment-page .label-icon svg { font-size: 20px !important; }
        .assessment-page main label.mb-2 { margin-bottom: 6px !important; }
        .assessment-page .pi-gender label { margin-bottom: 6px !important; }
        .assessment-page .asmt-btn-next {
          border-radius: 9999px !important;
          background: linear-gradient(135deg, #128052 0%, #22b573 100%);
          box-shadow: 0 6px 16px rgba(18, 128, 82, 0.3), 0 0 10px rgba(34, 181, 115, 0.18);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .assessment-page .asmt-btn-next:hover {
          background: linear-gradient(135deg, #16975f 0%, #27c77f 100%);
          box-shadow: 0 10px 24px rgba(18, 128, 82, 0.42), 0 0 16px rgba(34, 181, 115, 0.34);
          transform: translateY(-1px);
        }
        .assessment-page .asmt-btn-next:active { transform: translateY(0); }
      `}</style>
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={1}
          title="Personal Information"
          subtitle="Please enter your personal details below to begin your financial wellness assessment."
        />

        {/* ─── MAIN CONTENT: Form + Sidebar ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            {/* Basic Details Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <PersonIcon sx={{ fontSize: 24 }} />
                </span>
                <h2 className="asmt-section-title text-lg font-bold text-navy-950">
                  Basic Details
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <AssessmentInput
                  label="Full Name"
                  className="pi-fullname"
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
                  className="pi-email"
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
              <div className="pi-phone mt-5">
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
            <div className="pi-dob mt-5">
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
            <div className="pi-gender mt-5">
              <label className="mb-3 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
                <span className="label-icon">
                  <PersonIcon sx={{ fontSize: 20 }} />
                </span>
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
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${opt.tone}`}
                    >
                      <opt.icon sx={{ fontSize: 24 }} />
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
            <div className="pi-marital mt-5">
                <AssessmentSelect
                  label="Marital Status"
                  value={maritalStatus}
                  onChange={(v) => setMaritalStatus(v)}
                  options={MARITAL_STATUS_OPTIONS}
                  placeholder="Select your marital status"
                  icon={<FavoriteIcon sx={{ fontSize: 20 }} />}
                />
            </div>

            {/* Dependents + Education — side by side */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="pi-dependents">
                <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
                  <span className="label-icon">
                    <GroupsIcon sx={{ fontSize: 20 }} />
                  </span>
                  Dependents
                </label>
                <p className="mb-3 text-xs sm:text-sm font-semibold text-slate-600">
                  Include spouse, children, parents or other dependents
                </p>
                <div className="space-y-2">
                  {[
                    { key: "spouse", label: "Spouse", Icon: PersonIcon, tone: "bg-pink-50 text-pink-600" },
                    { key: "children", label: "Children", Icon: ChildCareIcon, tone: "bg-orange-50 text-orange-600" },
                    { key: "parents", label: "Parents", Icon: FamilyRestroomIcon, tone: "bg-sky-50 text-sky-600" },
                    { key: "other", label: "Other Dependents", Icon: GroupsIcon, tone: "bg-violet-50 text-violet-600" },
                  ].map((cat) => (
                    <div key={cat.key} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                      <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-navy-950">
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${cat.tone}`}>
                          <cat.Icon sx={{ fontSize: 20 }} />
                        </span>
                        {cat.label}
                      </span>
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
              <div className="pi-education">
                <AssessmentSelect
                  label="Education"
                  value={education}
                  onChange={(v) => {
                    setEducation(v);
                    if (v !== "Other") setEducationOther("");
                  }}
                  options={EDUCATION_OPTIONS}
                  placeholder="Select your education level"
                  icon={<SchoolIcon sx={{ fontSize: 20 }} />}
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
            <div className="mt-4 flex justify-end">
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
                className="asmt-btn-next flex h-12 items-center gap-2 rounded-full px-8 text-base font-bold"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
            <p className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <span className="text-brand-green-600">
                <CheckCircleIcon sx={{ fontSize: 18 }} />
              </span>
              Your information is safe with us and 100% secure
            </p>
          </div>

          </div>

          {/* RIGHT — Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {/* Card 1: Your Information is Safe */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
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
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2.5 mb-5 text-base sm:text-lg font-extrabold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-100"><LightbulbIcon sx={{ fontSize: 22 }} /></span>
                Why We Ask This
              </h3>
              <div className="space-y-5">
                {WHY_WE_ASK.map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span
                      className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <item.icon sx={{ fontSize: 24 }} />
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
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700 border border-brand-green-100">
                  <HeadsetMicIcon sx={{ fontSize: 22 }} />
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
        <div className="mt-3 rounded-2xl border border-brand-green-200/80 bg-brand-green-50/60 px-5 py-4 shadow-xs">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700 border border-brand-green-200/80">
              <LockIcon sx={{ fontSize: 24 }} />
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
    </div>
  );
}

