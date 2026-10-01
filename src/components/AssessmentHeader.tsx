import { useApp } from "../context/AppContext";
import BrandLockup from "./BrandLockup";

export default function AssessmentHeader() {
  const { auth, assessmentData } = useApp();

  const displayName =
    (auth.fullName ||
      assessmentData?.personalInfo?.fullName ||
      auth.email.split("@")[0] ||
      "").trim() || "User";

  const nameParts = displayName.split(/\s+/).filter(Boolean);
  const initials =
    (nameParts[0]?.charAt(0) || "U").toUpperCase() +
    (nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : "");

  return (
    <header className="sticky top-0 z-50 border-b border-navy-950/10 bg-white/95 shadow-[0_10px_30px_-22px_rgba(10,31,61,0.45)] backdrop-blur-md">
      <div className="flex h-[76px] w-full items-center justify-between gap-4 px-4 sm:h-[90px] sm:px-6 lg:px-10">
        {/* Logo + brand text image */}
        <span className="group flex shrink-0 items-center">
          <BrandLockup />
        </span>

        {/* Logged-in user: dynamic initials avatar + name */}
        <span className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(15,143,91,0.20)] bg-[#E8F8F1] text-[16px] font-bold text-[#0F8F5B] shadow-[0_2px_8px_rgba(15,143,91,0.15)]"
            aria-hidden="true"
          >
            {initials}
          </span>
          <span className="max-w-[45vw] truncate text-[17px] font-bold text-[#111827] sm:max-w-[280px] sm:text-[18px]">
            {displayName}
          </span>
        </span>
      </div>
    </header>
  );
}
