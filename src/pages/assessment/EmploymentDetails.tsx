import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FactoryIcon from "@mui/icons-material/Factory";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import HandymanIcon from "@mui/icons-material/Handyman";
import HistoryIcon from "@mui/icons-material/History";
import HubIcon from "@mui/icons-material/Hub";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TimelineIcon from "@mui/icons-material/Timeline";
import TodayIcon from "@mui/icons-material/Today";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ComputerIcon from "@mui/icons-material/Computer";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import LockIcon from "@mui/icons-material/Lock";
import BadgeIcon from "@mui/icons-material/Badge";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HeadsetIcon from "@mui/icons-material/Headset";
import AssessmentInput from "./components/AssessmentInput";
import AssessmentSelect from "./components/AssessmentSelect";
import CurrencyInput from "./components/CurrencyInput";
import PhoneInput from "./components/PhoneInput";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";
import salariedImg from "../../Assets/images/salaried.png";
import selfEmployedImg from "../../Assets/images/selfemployed.png";
import businessOwnerImg from "../../Assets/images/Businessowner.png";
import freelancerImg from "../../Assets/images/freelauncer.png";
import studentImg from "../../Assets/images/studennt.png";
import AssessmentHeader from "../../components/AssessmentHeader";

const EMPLOYMENT_TYPES = [
  { label: "Salaried", img: salariedImg },
  { label: "Self Employed", img: selfEmployedImg },
  { label: "Business Owner", img: businessOwnerImg },
  { label: "Freelancer", img: freelancerImg },
  { label: "Student", img: studentImg },
];

const WHAT_YOU_GET = [
  {
    icon: AssessmentIcon,
    color: "text-brand-green-600 bg-brand-green-50 border border-brand-green-100",
    title: "Accurate Financial Assessment",
    desc: "Based on your income profile",
  },
  {
    icon: AutoAwesomeIcon,
    color: "text-violet-600 bg-violet-50 border border-violet-100",
    title: "Personalized Recommendations",
    desc: "Tailored to your career stage",
  },
  {
    icon: TrendingUpIcon,
    color: "text-amber-700 bg-amber-50 border border-amber-100",
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

  // Student fields
  const [educationQualification, setEducationQualification] = useState(emp.educationQualification || "");
  const [partTimeJob, setPartTimeJob] = useState(emp.partTimeJob || "");

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
    } else if (employmentType === "Student") {
      savedOccupation = educationQualification || "Student";
      savedExperience = "";
      savedIncome = "";
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
      educationQualification,
      partTimeJob,
    });

    navigate("/income-details");
  };

  return (
    <div className="assessment-page min-h-screen">
      <style>{`
        .assessment-page .label-icon { height: 28px !important; width: 28px !important; border-radius: 9px !important; font-size: 17px; }
        .assessment-page .label-icon svg { font-size: 20px !important; }
        .assessment-page main label.mb-2 { margin-bottom: 6px !important; }
        .ed-sec-head .label-icon { width: 32px !important; height: 32px !important; border-radius: 10px !important; }
        .ed-sec-head .label-icon svg { font-size: 24px !important; }
        .ed-emp .label-icon, .ed-prof .label-icon, .ed-bname .label-icon, .ed-bemp .label-icon, .ed-stu-part .label-icon { background-color: #eff6ff !important; color: #2563eb !important; }
        .ed-job .label-icon, .ed-fserv .label-icon { background-color: #f0f9ff !important; color: #0284c7 !important; }
        .ed-exp .label-icon, .ed-syear .label-icon, .ed-byrs .label-icon, .ed-fyrs .label-icon, .ed-salary .label-icon, .ed-fcli .label-icon, .ed-sec-sal .label-icon { background-color: #eafbf3 !important; color: #128052 !important; }
        .ed-ind .label-icon, .ed-bind .label-icon, .ed-extra .label-icon { background-color: #fff7ed !important; color: #ea580c !important; }
        .ed-nat .label-icon, .ed-btype .label-icon, .ed-sstab .label-icon, .ed-fprof .label-icon, .ed-fplat .label-icon, .ed-stu-edu .label-icon, .ed-sec-self .label-icon { background-color: #f5f3ff !important; color: #7c3aed !important; }
        .ed-sbiz .label-icon, .ed-turn .label-icon, .ed-fstab .label-icon, .ed-sec-biz .label-icon { background-color: #fffbeb !important; color: #d97706 !important; }
        .ed-sec-free .label-icon { background-color: #ecfeff !important; color: #0891b2 !important; }
        .assessment-page .asmt-btn-next {
          border-radius: 9999px !important;
          background: linear-gradient(135deg, #128052 0%, #22b573 100%);
          box-shadow: 0 6px 16px rgba(18, 128, 82, 0.3), 0 0 10px rgba(34, 181, 115, 0.18);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .assessment-page .asmt-btn-back {
          border-radius: 9999px !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }
        @media (prefers-reduced-motion: no-preference) {
          .assessment-page .asmt-btn-next:hover {
            background: linear-gradient(135deg, #16975f 0%, #27c77f 100%);
            box-shadow: 0 10px 24px rgba(18, 128, 82, 0.42), 0 0 16px rgba(34, 181, 115, 0.34);
            transform: translateY(-1px);
          }
          .assessment-page .asmt-btn-next:active { transform: translateY(0); }
          .assessment-page .asmt-btn-back:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(2, 132, 199, 0.22);
          }
          .assessment-page .option-card-interactive:hover {
            box-shadow: 0 10px 22px rgba(13, 37, 73, 0.12);
            transform: translateY(-2px);
          }
        }
      `}</style>
      <AssessmentHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={2}
          title="Employment Details"
          subtitle="Tell us about your employment to help us analyze your income stability and financial profile."
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Form Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-6">
            {/* Employment Type */}
            <div>
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                  <WorkIcon sx={{ fontSize: 24 }} />
                </span>
              <p className="asmt-section-title text-lg sm:text-xl font-extrabold text-navy-950">
                Employment Type
              </p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Select the type of your employment
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
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
                    <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center">
                      <img src={opt.img} alt="" className="h-full w-full object-contain" />
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
                <p className="ed-sec-head ed-sec-sal flex items-center gap-2 text-lg font-extrabold text-navy-950"><span className="label-icon"><WorkIcon sx={{ fontSize: 24 }} /></span>Salaried Employment Details</p>
                <AssessmentInput
                  label="Employer / Company Name"
                  className="ed-emp"
                  value={employerName}
                  onChange={(v) => {
                    setEmployerName(v);
                    if (errors.employerName) setErrors((p) => { const n = { ...p }; delete n.employerName; return n; });
                  }}
                  mode="all"
                  placeholder="Enter employer or company name"
                  icon={<BusinessIcon sx={{ fontSize: 20 }} />}
                  error={errors.employerName}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentInput
                    label="Job Title / Designation"
                    className="ed-job"
                    value={occupation}
                    onChange={(v) => {
                      setOccupation(v);
                      if (errors.occupation) setErrors((p) => { const n = { ...p }; delete n.occupation; return n; });
                    }}
                    mode="all"
                    placeholder="e.g. Software Engineer"
                    icon={<BadgeIcon sx={{ fontSize: 20 }} />}
                    error={errors.occupation}
                  />
                  <AssessmentSelect
                    label="Industry"
                    className="ed-ind"
                    icon={<FactoryIcon sx={{ fontSize: 20 }} />}
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
                    className="ed-exp"
                    icon={<WorkHistoryIcon sx={{ fontSize: 20 }} />}
                    value={experience}
                    onChange={(v) => setExperience(v)}
                    options={YEARS_OPTIONS}
                    placeholder="Select total experience"
                  />
                  <AssessmentSelect
                    label="Employment Type / Nature"
                    className="ed-nat"
                    icon={<AssignmentIndIcon sx={{ fontSize: 20 }} />}
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
                    className="ed-salary"
                    value={monthlySalary}
                    onChange={(v) => setMonthlySalary(v)}
                    placeholder="Enter monthly take-home salary"
                  />
                  <CurrencyInput
                    label="Additional Income (Optional)"
                    className="ed-extra"
                    value={additionalIncome}
                    onChange={(v) => setAdditionalIncome(v)}
                    placeholder="Enter additional monthly income"
                  />
                </div>
              </div>
            )}

            {employmentType === "Self Employed" && (
              <div className="mt-8 space-y-5">
                <p className="ed-sec-head ed-sec-self flex items-center gap-2 text-lg font-extrabold text-navy-950"><span className="label-icon"><HandymanIcon sx={{ fontSize: 24 }} /></span>Self Employment Details</p>
                <AssessmentInput
                  label="Profession / Service"
                  className="ed-prof"
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
                  className="ed-sbiz"
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
                    className="ed-syear"
                    icon={<HistoryIcon sx={{ fontSize: 20 }} />}
                    value={yearsSelfEmployed}
                    onChange={(v) => setYearsSelfEmployed(v)}
                    options={YEARS_OPTIONS}
                    placeholder="Select years self employed"
                  />
                  <AssessmentSelect
                    label="Income Stability"
                    className="ed-sstab"
                    icon={<TrendingUpIcon sx={{ fontSize: 20 }} />}
                    value={incomeStability}
                    onChange={(v) => setIncomeStability(v)}
                    options={STABILITY_OPTIONS}
                    placeholder="Select income stability"
                  />
                </div>
                <CurrencyInput
                  label="Average Monthly Income"
                  className="ed-salary"
                  value={monthlySalary}
                  onChange={(v) => setMonthlySalary(v)}
                  placeholder="Enter average monthly income"
                />
              </div>
            )}

            {employmentType === "Business Owner" && (
              <div className="mt-8 space-y-5">
                <p className="ed-sec-head ed-sec-biz flex items-center gap-2 text-lg font-extrabold text-navy-950"><span className="label-icon"><BusinessCenterIcon sx={{ fontSize: 24 }} /></span>Business Owner Details</p>
                <AssessmentInput
                  label="Business Name"
                  className="ed-bname"
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
                    className="ed-btype"
                    icon={<BusinessCenterIcon sx={{ fontSize: 20 }} />}
                    value={businessType}
                    onChange={(v) => setBusinessType(v)}
                    options={BUSINESS_TYPE_OPTIONS}
                    placeholder="Select business type"
                    otherValue={businessTypeOther}
                    onOtherChange={(v) => setBusinessTypeOther(v)}
                  />
                  <AssessmentSelect
                    label="Industry"
                    className="ed-bind"
                    icon={<StorefrontIcon sx={{ fontSize: 20 }} />}
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
                    className="ed-byrs"
                    icon={<TimelineIcon sx={{ fontSize: 20 }} />}
                    value={yearsInBusiness}
                    onChange={(v) => setYearsInBusiness(v)}
                    options={YEARS_OPTIONS}
                    placeholder="Select years in business"
                  />
                  <AssessmentInput
                    label="Number of Employees"
                    className="ed-bemp"
                    icon={<GroupsIcon sx={{ fontSize: 20 }} />}
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
                    className="ed-turn"
                    value={annualTurnover}
                    onChange={(v) => setAnnualTurnover(v)}
                    placeholder="Enter annual turnover"
                  />
                  <CurrencyInput
                    label="Average Monthly Personal Income"
                    className="ed-salary"
                    value={personalIncome}
                    onChange={(v) => setPersonalIncome(v)}
                    placeholder="Enter monthly personal income"
                  />
                </div>
              </div>
            )}

            {employmentType === "Freelancer" && (
              <div className="mt-8 space-y-5">
                <p className="ed-sec-head ed-sec-free flex items-center gap-2 text-lg font-extrabold text-navy-950"><span className="label-icon"><LaptopMacIcon sx={{ fontSize: 24 }} /></span>Freelancer Details</p>
                <AssessmentInput
                  label="Primary Freelance Profession"
                  className="ed-fprof"
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
                    className="ed-fyrs"
                    icon={<TodayIcon sx={{ fontSize: 20 }} />}
                    value={yearsFreelancing}
                    onChange={(v) => setYearsFreelancing(v)}
                    options={YEARS_OPTIONS}
                    placeholder="Select years freelancing"
                  />
                  <AssessmentSelect
                    label="Income Stability"
                    className="ed-fstab"
                    icon={<TrendingUpIcon sx={{ fontSize: 20 }} />}
                    value={incomeStability}
                    onChange={(v) => setIncomeStability(v)}
                    options={STABILITY_OPTIONS}
                    placeholder="Select income stability"
                  />
                </div>
                <AssessmentInput
                  label="Main Services Offered"
                  className="ed-fserv"
                  icon={<MiscellaneousServicesIcon sx={{ fontSize: 20 }} />}
                  value={mainServices}
                  onChange={(v) => setMainServices(v)}
                  mode="all"
                  placeholder="e.g. Fullstack Web Development, Mobile Apps"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <AssessmentInput
                    label="Number of Active Clients"
                    className="ed-fcli"
                    icon={<GroupAddIcon sx={{ fontSize: 20 }} />}
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
                  className="ed-fplat"
                  icon={<HubIcon sx={{ fontSize: 20 }} />}
                  value={mainPlatform}
                  onChange={(v) => setMainPlatform(v)}
                  options={PLATFORM_OPTIONS}
                  placeholder="Select main platform"
                  otherValue={platformOther}
                  onOtherChange={(v) => setPlatformOther(v)}
                />
                <CurrencyInput
                  label="Average Monthly Income"
                  className="ed-salary"
                  value={monthlySalary}
                  onChange={(v) => setMonthlySalary(v)}
                  placeholder="Enter average monthly income"
                />
              </div>
            )}

            {employmentType === "Student" && (
              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <SchoolIcon sx={{ fontSize: 24 }} />
                  </span>
                  <div>
                    <p className="text-base font-bold text-navy-950">Student Details</p>
                    <p className="text-xs text-slate-600">Tell us about your education</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-navy-950"><span className="label-icon ed-stu-edu"><SchoolIcon sx={{ fontSize: 20 }} /></span>Education Qualification</label>
                    <input
                      type="text"
                      value={educationQualification}
                      onChange={(e) => setEducationQualification(e.target.value)}
                      placeholder="e.g. B.Tech, MBA, etc."
                      className="h-10 w-full rounded-lg border border-navy-950/10 bg-white px-3 text-sm text-navy-950 placeholder:text-navy-900/40 transition-all hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-navy-950"><span className="label-icon ed-stu-part"><WorkIcon sx={{ fontSize: 20 }} /></span>Involved in any part time job?</label>
                    <div className="flex gap-3">
                      {["Yes", "No"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setPartTimeJob(opt)}
                          className={`flex-1 h-10 rounded-lg border-2 px-4 text-sm font-semibold transition-all ${
                            partTimeJob === opt
                              ? "border-brand-green-500 bg-brand-green-50 text-brand-green-700"
                              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Buttons */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/personal-information")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm sm:text-base font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmitNext}
                className="asmt-btn-next flex h-12 items-center gap-2 rounded-full px-8 text-sm sm:text-base font-bold"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <LockIcon sx={{ fontSize: 18 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-3">
            {/* Card 1: Why We Need This */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
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

              <h3 className="flex items-center justify-center gap-2 text-base sm:text-lg font-extrabold text-navy-950">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-100"><LightbulbIcon sx={{ fontSize: 18 }} /></span>
                Why We Need This
              </h3>
              <p className="mt-2 text-center text-sm font-medium leading-relaxed text-slate-600">
                This helps us evaluate your income stability, career growth
                potential, and overall financial strength.
              </p>
            </div>

            {/* Card 2: What You'll Get */}
            <div className="rounded-2xl border border-brand-green-200/80 bg-brand-green-50/50 p-6 shadow-xs">
              <h3 className="flex items-center gap-2.5 mb-5 text-base sm:text-lg font-extrabold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><WorkspacePremiumIcon sx={{ fontSize: 22 }} /></span>
                What You'll Get
              </h3>
              <div className="space-y-5">
                {WHAT_YOU_GET.map((item) => (
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
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 border border-sky-200">
                  <HeadsetIcon sx={{ fontSize: 22 }} />
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
    </div>
  );
}

