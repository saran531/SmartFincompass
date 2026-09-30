import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import ShieldIcon from "@mui/icons-material/Shield";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentInput from "./components/AssessmentInput";
import AssessmentSelect from "./components/AssessmentSelect";
import AssessmentDatePicker from "./components/AssessmentDatePicker";
import PhoneInput from "./components/PhoneInput";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";

const INSURANCE_ITEMS = [
  {
    key: "life",
    label: "Life Insurance",
    desc: "Financial protection for your family",
    icon: FavoriteIcon,
    color: "text-rose-500 bg-rose-50",
    amountLabel: "Sum Assured (₹)",
  },
  {
    key: "health",
    label: "Health Insurance",
    desc: "Coverage for your medical expenses",
    icon: HealthAndSafetyIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    amountLabel: "Sum Insured (₹)",
  },
  {
    key: "vehicle",
    label: "Vehicle Insurance",
    desc: "Protection for your vehicle",
    icon: DirectionsCarIcon,
    color: "text-sky-500 bg-sky-50",
    amountLabel: "Insured Value (₹)",
  },
  {
    key: "property",
    label: "Property Insurance",
    desc: "Protection for your property",
    icon: HomeIcon,
    color: "text-amber-500 bg-amber-50",
    amountLabel: "Insured Value (₹)",
  },
];

const PROVIDERS = ["LIC", "HDFC Life", "ICICI Prudential", "SBI Life", "Max Life", "Other"];
const RELATIONSHIPS = ["Spouse", "Parent", "Child", "Sibling", "Other"];

export default function Insurance() {
  const navigate = useNavigate();
  const { assessmentData, updateAssessment } = useApp();

  const ins = assessmentData.insurance || {};
  const [providers, setProviders] = useState<Record<string, string>>({});
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [nomineeName, setNomineeName] = useState(ins.nomineeName || "");
  const [relationship, setRelationship] = useState(ins.nomineeRelationship || "");
  const [relationshipOther, setRelationshipOther] = useState("");
  const [dob, setDob] = useState(ins.nomineeDob || "");
  const [contactNumber, setContactNumber] = useState(ins.nomineeContact || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countryDropUp, setCountryDropUp] = useState(false);
  const [selectDropUp, setSelectDropUp] = useState(false);

  useEffect(() => {
    let raf = 0;

    const decideFlip = (
      rect: DOMRect,
      menuH: number,
      navTop: number,
      vh: number,
      nomineeTop: number | null
    ): boolean => {
      const nomineeGap =
        nomineeTop !== null && nomineeTop > rect.bottom
          ? nomineeTop
          : Number.POSITIVE_INFINITY;
      const spaceBelow = Math.min(navTop, vh, nomineeGap) - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow >= menuH) return false;
      if (spaceAbove >= menuH) return true;
      return spaceAbove > spaceBelow;
    };

    const getNomineeTop = (): number | null => {
      const nominee = document.querySelector<HTMLElement>(".asmt-ins-nominee");
      return nominee ? nominee.getBoundingClientRect().top : null;
    };

    const evaluate = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        const nav = document.querySelector<HTMLElement>(".asmt-ins-nav");
        const navTop = nav ? nav.getBoundingClientRect().top : vh;
        const nomineeTop = getNomineeTop();

        const cdTrigger = document.querySelector<HTMLElement>(
          'button[aria-label="Select country code"]'
        );
        if (cdTrigger) {
          const r = cdTrigger.getBoundingClientRect();
          const MENU_H = 310;
          setCountryDropUp(r.bottom + MENU_H > navTop || vh - r.bottom < MENU_H);
        }

        document
          .querySelectorAll<HTMLElement>('[class*="max-h-60"]')
          .forEach((menu) => {
            const trig = menu.previousElementSibling;
            if (!(trig instanceof HTMLElement)) return;
            menu.style.maxHeight = "";
            const rect = trig.getBoundingClientRect();
            const menuH = (menu.offsetHeight || 240) + 6;
            const nomineeGap =
              nomineeTop !== null && nomineeTop > rect.bottom
                ? nomineeTop
                : Number.POSITIVE_INFINITY;
            const spaceBelow = Math.min(navTop, vh, nomineeGap) - rect.bottom;
            const spaceAbove = rect.top;
            const up =
              spaceBelow >= menuH
                ? false
                : spaceAbove >= menuH
                  ? true
                  : spaceAbove > spaceBelow;
            setSelectDropUp(up);
            if (Math.min(spaceAbove, spaceBelow) < menuH) {
              menu.style.maxHeight =
                Math.max(120, Math.max(spaceAbove, spaceBelow) - 12) + "px";
            }
          });
      });
    };

    const onClickCapture = (e: Event) => {
      const target = e.target instanceof Element ? e.target : null;
      const btn = target ? target.closest("button") : null;
      if (
        btn &&
        btn.parentElement &&
        btn.parentElement.classList.contains("relative") &&
        !btn.hasAttribute("aria-label")
      ) {
        const vh = window.innerHeight;
        const nav = document.querySelector<HTMLElement>(".asmt-ins-nav");
        const navTop = nav ? nav.getBoundingClientRect().top : vh;
        setSelectDropUp(
          decideFlip(btn.getBoundingClientRect(), 246, navTop, vh, getNomineeTop())
        );
      }
      evaluate();
    };

    evaluate();
    window.addEventListener("scroll", evaluate, true);
    window.addEventListener("resize", evaluate);
    document.addEventListener("click", onClickCapture, true);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", evaluate, true);
      window.removeEventListener("resize", evaluate);
      document.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const numericAmounts = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(amounts).map(([k, v]) => [k, parseFloat(v) || 0])
      ) as Record<string, number>,
    [amounts]
  );

  const totalCoverage = useMemo(
    () => Object.values(numericAmounts).reduce((a: number, b: number) => a + b, 0),
    [numericAmounts]
  );

  const handleAmountChange = (key: string, value: string) => {
    let cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
    if (parts[1] && parts[1].length > 2) cleaned = parts[0] + "." + parts[1].slice(0, 2);
    setAmounts((prev) => ({ ...prev, [key]: cleaned }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (contactNumber && contactNumber.length > 0 && contactNumber.length < 7) {
      errs.contactNumber = "Please enter a valid phone number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <div className={`assessment-page min-h-screen${countryDropUp ? " ins-cd-up" : ""}${selectDropUp ? " ins-sel-up" : ""}`}>
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
        /* ── Country code dropdown: position, stacking, overflow fixes ── */
        .assessment-page [class*="top-full"] {
          z-index: 1000 !important;
          width: 300px !important;
          max-width: calc(100vw - 32px);
          overflow-x: hidden;
        }
        .assessment-page [class*="top-full"] [class*="overflow-y-auto"] {
          overflow-x: hidden !important;
        }
        .assessment-page.ins-cd-up [class*="top-full"] {
          top: auto !important;
          bottom: calc(100% + 6px) !important;
          margin-top: 0 !important;
        }
        /* ── Select dropdowns (Relationship etc.): position, stacking, overflow fixes ── */
        .assessment-page [class*="max-h-60"] {
          z-index: 1000 !important;
          overflow-x: hidden !important;
        }
        .assessment-page.ins-sel-up [class*="max-h-60"] {
          top: auto !important;
          bottom: calc(100% + 6px) !important;
          margin-top: 0 !important;
        }
      `}</style>
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={8}
          title="Insurance Details"
          subtitle="Please enter details of your insurance policies and nominee information."
        />

        {/* ─── MAIN CONTENT: Grid ─── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2">
            {/* Insurance Policies Section */}
            <div className="rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
                    Insurance Policies
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    Select your current active policies and values
                  </p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600">
                  <ShieldIcon sx={{ fontSize: 26 }} />
                </span>
              </div>

              <div className="space-y-4">
                {INSURANCE_ITEMS.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = !!providers[item.key];

                  return (
                    <div
                      key={item.key}
                      className={`rounded-xl border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-brand-green-500 bg-brand-green-50/20"
                          : "border-navy-950/5 hover:border-navy-950/15"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${item.color}`}
                          >
                            <IconComp sx={{ fontSize: 28 }} />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-navy-950">
                              {item.label}
                            </p>
                            <p className="text-xs text-slate-600">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <AssessmentSelect
                          label="Provider"
                          icon={<VerifiedUserIcon sx={{ fontSize: 16 }} />}
                          value={providers[item.key] || ""}
                          onChange={(val) =>
                            setProviders((prev) => ({
                              ...prev,
                              [item.key]: val,
                            }))
                          }
                          options={PROVIDERS}
                          placeholder="Select provider"
                        />
                        <AssessmentInput
                          label={item.amountLabel}
                          value={amounts[item.key] || ""}
                          onChange={(val) => handleAmountChange(item.key, val)}
                          mode="number-only"
                          placeholder="Enter amount"
                          icon="₹"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nominee Details Section */}
            <div className="asmt-ins-nominee mt-5 rounded-2xl border border-navy-950/5 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.04)]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
                    Nominee Details
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    Primary nominee details for insurance coverage
                  </p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <PersonIcon sx={{ fontSize: 26 }} />
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                    <PersonIcon sx={{ fontSize: 26 }} />
                  </span>
                  <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                    <AssessmentInput
                      label="Nominee Name"
                      icon={<PersonIcon sx={{ fontSize: 16 }} />}
                      value={nomineeName}
                      onChange={(v) => {
                        setNomineeName(v);
                        if (errors.nomineeName) setErrors((p) => { const n = { ...p }; delete n.nomineeName; return n; });
                      }}
                      mode="text-only"
                      placeholder="Enter nominee full name"
                      error={errors.nomineeName}
                    />
                    <AssessmentSelect
                      label="Relationship"
                      icon={<FamilyRestroomIcon sx={{ fontSize: 16 }} />}
                      value={relationship}
                      onChange={(v) => setRelationship(v)}
                      options={RELATIONSHIPS}
                      placeholder="Select relationship"
                      error={errors.relationship}
                      otherValue={relationshipOther}
                      onOtherChange={(v) => setRelationshipOther(v)}
                      otherPlaceholder="Specify relationship"
                      otherError={errors.relationshipOther}
                    />
                    <AssessmentDatePicker
                      label="Date of Birth"
                      value={dob}
                      onChange={(v) => {
                        setDob(v);
                        if (errors.dob) setErrors((p) => { const n = { ...p }; delete n.dob; return n; });
                      }}
                      placeholder="DD / MM / YYYY"
                      max={new Date().toISOString().split("T")[0]}
                      error={errors.dob}
                    />
                    <PhoneInput
                      label="Contact Number"
                      value={contactNumber}
                      onChange={(v) => {
                        setContactNumber(v);
                        if (errors.contactNumber) setErrors((p) => { const n = { ...p }; delete n.contactNumber; return n; });
                      }}
                      placeholder="Enter 10-digit mobile number"
                      error={errors.contactNumber}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* ─── Bottom Navigation: ONE continuous background container ─── */}
            <div className="asmt-ins-nav flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-2xl border bg-white/95 px-5 py-3 shadow-[0_2px_12px_rgba(13,37,73,0.06)] backdrop-blur">
              <button
                type="button"
                onClick={() => navigate("/savings")}
                className="asmt-btn-back order-2 flex h-11 shrink-0 items-center gap-2 rounded-full px-6 text-sm font-bold shadow-sm sm:order-1"
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                Back
              </button>
              <p className="order-1 flex w-full items-center justify-center gap-2 text-sm font-medium text-slate-700 sm:order-2 sm:w-auto">
                <LockIcon sx={{ fontSize: 16 }} className="text-brand-green-600" />
                Your information is secure and encrypted
              </p>
              <button
                type="button"
                onClick={() => {
                  if (!validate()) return;
                  updateAssessment("insurance", { nomineeName, nomineeRelationship: relationship, nomineeDob: dob, nomineeContact: contactNumber });
                  navigate("/investment-experience");
                }}
                className="asmt-btn-next order-3 flex h-11 shrink-0 items-center gap-2 rounded-full px-8 text-[15px] font-bold"
              >
                Next
                <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Card 1: Insurance Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <h3 className="flex items-center gap-2.5 mb-2 text-base font-bold text-navy-950">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-600 shadow-sm ring-1 ring-brand-green-100/80"><HealthAndSafetyIcon sx={{ fontSize: 22 }} /></span>
                Insurance Summary
              </h3>
              <p className="mb-4 text-sm font-medium text-slate-700">
                Total Insurance Coverage
              </p>
              <p className="mb-5 text-2xl font-black text-brand-green-700">
                ₹ {totalCoverage.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>

              {/* Shield Illustration */}
              <div className="relative mb-5 flex items-center justify-center">
                <div className="relative flex h-[160px] w-[160px] items-center justify-center">
                  {/* Outer dashed circle */}
                  <svg
                    viewBox="0 0 160 160"
                    className="absolute inset-0 h-full w-full"
                  >
                    <circle
                      cx="80"
                      cy="80"
                      r="75"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                  </svg>
                  {/* Shield */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-green-400 to-brand-green-600 shadow-lg">
                    <ShieldIcon
                      sx={{ fontSize: 40 }}
                      className="text-white"
                    />
                  </div>
                  {/* Dots */}
                  <span className="absolute right-2 top-6 h-2 w-2 rounded-full bg-brand-green-400" />
                  <span className="absolute bottom-8 left-2 h-2 w-2 rounded-full bg-sky-400" />
                  <span className="absolute right-6 bottom-4 h-1.5 w-1.5 rounded-full bg-amber-400" />
                </div>
              </div>

              {/* Summary Items */}
              <div className="space-y-3">
                {INSURANCE_ITEMS.map((item) => {
                  const amt = numericAmounts[item.key] || 0;
                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-md ${item.color}`}
                        >
                          <item.icon sx={{ fontSize: 16 }} />
                        </span>
                        <span className="font-medium text-slate-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-navy-950">
                          ₹ {amt.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className={`text-xs font-bold ${amt > 0 ? "text-brand-green-700" : "text-slate-500"}`}>
                          {amt > 0 ? "Added" : "Not Added"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm font-bold text-navy-950">
                  Total Coverage
                </span>
                <span className="text-lg font-black text-brand-green-700">
                  ₹ {totalCoverage.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Card 2: Why Insurance Matters? */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                  <TrendingUpIcon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  Why Insurance Matters?
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Insurance safeguards you and your family from unexpected events
                and helps maintain financial stability.
              </p>
            </div>

            {/* Card 3: 100% Secure */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(13,37,73,0.06)]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <ShieldIcon sx={{ fontSize: 22 }} />
                </span>
                <h3 className="text-base font-bold text-navy-950">
                  100% Secure
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                We use bank-level encryption to protect your financial data.
                <br />
                Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
