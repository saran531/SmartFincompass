import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
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
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";
import AssessmentHeader from "../../components/AssessmentHeader";

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
    icon: <FingerprintIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-amber-50 text-amber-600",
  },
  {
    key: "pan",
    name: "PAN",
    question: "Do you have a PAN Card?",
    desc: "Permanent Account Number",
    icon: <CreditCardIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-sky-50 text-sky-600",
  },
  {
    key: "passport",
    name: "Passport",
    question: "Do you have a Passport?",
    desc: "Identity for International Use",
    icon: <MenuBookIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-purple-50 text-purple-600",
  },
  {
    key: "drivingLicence",
    name: "Driving Licence",
    question: "Do you have a Driving Licence?",
    desc: "Proof to drive vehicles",
    icon: <DriveEtaIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-orange-50 text-orange-600",
  },
  {
    key: "voterId",
    name: "Voter ID",
    question: "Do you have a Voter ID?",
    desc: "Electoral Identity Card",
    icon: <BadgeIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-indigo-50 text-indigo-600",
  },
  {
    key: "twoWheelerRC",
    name: "2 Wheeler Registration Certificate",
    question: "Do you have a 2 Wheeler Registration Certificate?",
    desc: "Two-wheeler registration proof",
    icon: <TwoWheelerIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-teal-50 text-teal-600",
  },
  {
    key: "fourWheelerRC",
    name: "4 Wheeler Registration Certificate",
    question: "Do you have a 4 Wheeler Registration Certificate?",
    desc: "Four-wheeler registration proof",
    icon: <DirectionsCarIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    key: "insurance",
    name: "Insurance",
    question: "Do you have Insurance?",
    desc: "Life / Health / Term / Vehicle Insurance",
    icon: <HealthAndSafetyIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    key: "marriageCertificate",
    name: "Marriage Certificate",
    question: "Do you have a Marriage Certificate?",
    desc: "Legal proof of marriage",
    icon: <FamilyRestroomIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-rose-50 text-rose-600",
  },
  {
    key: "communityCertificate",
    name: "Community Certificate",
    question: "Do you have a Community Certificate?",
    desc: "Category / Caste / Community proof",
    icon: <GroupsIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-amber-50 text-amber-700",
  },
  {
    key: "birthCertificate",
    name: "Birth Certificate",
    question: "Do you have a Birth Certificate?",
    desc: "Official proof of date of birth",
    icon: <CakeIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-cyan-50 text-cyan-600",
  },
  {
    key: "rationCard",
    name: "Ration Card",
    question: "Do you have a Ration Card?",
    desc: "Family identity & address card",
    icon: <DescriptionIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-lime-50 text-lime-700",
  },
  {
    key: "ociCard",
    name: "OCI Card",
    question: "Do you have an OCI Card?",
    desc: "Overseas Citizen of India card",
    icon: <PublicIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-violet-50 text-violet-600",
  },
  {
    key: "property",
    name: "Property",
    question: "Do you have Property Ownership Documents?",
    desc: "Property ownership & deed documents",
    icon: <HomeWorkIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "will",
    name: "Will",
    question: "Do you have a Will?",
    desc: "Last Will & Testament",
    icon: <DescriptionIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-violet-50 text-violet-600",
  },
  {
    key: "nominee",
    name: "Nominee",
    question: "Do you have Nominee Details / Declarations?",
    desc: "Nominee Details / Declarations",
    icon: <GroupsIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-orange-50 text-orange-600",
  },
];

const EDUCATION_DOCUMENTS: DocumentDef[] = [
  {
    key: "education10th",
    name: "10th",
    question: "Do you have this document?",
    desc: "Secondary School Certificate (SSLC / 10th)",
    icon: <SchoolIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-sky-50 text-sky-600",
  },
  {
    key: "education12th",
    name: "12th",
    question: "Do you have this document?",
    desc: "Higher Secondary Certificate (HSC / 12th)",
    icon: <SchoolIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    key: "diploma",
    name: "Diploma",
    question: "Do you have this document?",
    desc: "Diploma Certificate",
    icon: <SchoolIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-indigo-50 text-indigo-600",
  },
  {
    key: "bachelors",
    name: "Bachelors",
    question: "Do you have this document?",
    desc: "Undergraduate Degree Certificate",
    icon: <SchoolIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-purple-50 text-purple-600",
  },
  {
    key: "masters",
    name: "Masters",
    question: "Do you have this document?",
    desc: "Postgraduate Degree Certificate",
    icon: <SchoolIcon sx={{ fontSize: 26 }} />,
    iconColor: "bg-violet-50 text-violet-600",
  },
  {
    key: "courses",
    name: "Courses",
    question: "Do you have this document?",
    desc: "Professional Course / Skill Certificates",
    icon: <SchoolIcon sx={{ fontSize: 26 }} />,
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
        <span className="text-[13px] font-bold text-slate-500">Available</span>
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
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${doc.iconColor}`}
            >
              {doc.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy-950 truncate">{doc.name}</p>
              <p className="text-xs font-semibold text-slate-700">{doc.question}</p>
              <p className="text-[13px] font-medium text-slate-600 mt-0.5">{doc.desc}</p>
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
            <p className="flex items-center gap-2 text-xs font-bold text-navy-950 mb-2.5">
              <span className="label-icon"><HealthAndSafetyIcon sx={{ fontSize: 15 }} /></span>
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
    <div className="assessment-page min-h-screen">
      <style>{`
        .assessment-page .label-icon { height: 28px !important; width: 28px !important; border-radius: 9px !important; font-size: 17px; }
        .assessment-page .label-icon svg { font-size: 20px !important; }
        .assessment-page main label.mb-2 { margin-bottom: 6px !important; }
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
        }
      `}</style>
      <AssessmentHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={11}
          title="Financial Document Availability"
          subtitle="Select whether you possess each document to evaluate your financial readiness."
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Document Checklist */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)] sm:p-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <div className="mb-1.5 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                    <DescriptionIcon sx={{ fontSize: 24 }} />
                  </span>
                <p className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
                  Document Checklist
                </p>
                </div>
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
            <div className="mt-6 mb-4 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 font-bold">
                  <SchoolIcon sx={{ fontSize: 24 }} />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy-950">
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
            <div className="mt-6 rounded-xl border border-brand-green-300 bg-brand-green-50/60 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-100">
                    <ShieldIcon
                      sx={{ fontSize: 24 }}
                      className="text-brand-green-700"
                    />
                  </span>
                  <div>
                    <p className="text-base font-bold text-navy-950">
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
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/financial-goals")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="asmt-btn-next flex h-12 items-center gap-2 rounded-full px-8 text-[15px] font-bold"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
            </div>

            {/* Security Message */}
            <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
              <LockIcon sx={{ fontSize: 18 }} className="text-brand-green-600" />
              Your information is secure and encrypted
            </p>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-3">
            {/* Card 1: Availability Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="flex items-center gap-2.5 mb-5 text-base font-bold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><DescriptionIcon sx={{ fontSize: 22 }} /></span>
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
                  sx={{ fontSize: 26 }}
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <VerifiedUserIcon sx={{ fontSize: 22 }} />
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <LockIcon sx={{ fontSize: 22 }} />
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <LightbulbIcon sx={{ fontSize: 22 }} />
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
    </div>
  );
}
