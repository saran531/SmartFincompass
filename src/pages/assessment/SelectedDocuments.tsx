import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
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
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";

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
    <div className="assessment-page min-h-screen">
      <style>{`
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
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={11}
          title="Your Selected Documents"
          subtitle="Here are the documents you confirmed you have."
          headerExtra={
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                <FolderSpecialIcon sx={{ fontSize: 20 }} />
              </span>
              <span className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-extrabold text-brand-green-700">
                {selectedCount} {selectedCount === 1 ? "Document" : "Documents"} Selected
              </span>
            </div>
          }
        />

        {/* ─── MAIN CONTENT: Two Columns ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          {/* LEFT — Selected Documents List / Categories */}
          <div className="space-y-4">
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
              <div className="space-y-4">
                {activeCategories.map((category) => (
                  <div
                    key={category.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(13,37,73,0.06)]"
                  >
                    <div className="mb-3.5 flex items-center gap-3 border-b border-slate-150 pb-3">
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
                  className="asmt-btn-back mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold"
                >
                  <ArrowBackIcon sx={{ fontSize: 16 }} />
                  Return to Document Selection
                </button>
              </div>
            )}

            {/* Navigation Buttons (Requirements 13 & 14) */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <button
                type="button"
                onClick={() => navigate("/government-documents")}
                className="asmt-btn-back flex h-12 items-center gap-2 rounded-full px-6 text-sm font-bold"
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back
              </button>
              <button
                type="button"
                onClick={() => navigate("/review-submit")}
                className="asmt-btn-next flex h-12 items-center gap-2 rounded-full px-8 text-[15px] font-bold"
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
          <div className="flex flex-col gap-3">
            {/* Card 1: Confirmation Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
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
            <div className="rounded-2xl border border-brand-green-200/70 bg-brand-green-50/60 p-6">
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
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
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
    </div>
  );
}
