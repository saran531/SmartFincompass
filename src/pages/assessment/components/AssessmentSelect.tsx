import { useState, useRef, useEffect, type ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ValidationMessage from "./ValidationMessage";

interface AssessmentSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  otherLabel?: string;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  otherPlaceholder?: string;
  otherError?: string;
  className?: string;
}

export default function AssessmentSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
  error,
  otherLabel = "Other",
  otherValue = "",
  onOtherChange,
  otherPlaceholder = "Please specify",
  otherError,
  className = "",
}: AssessmentSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const isOther = value === "Other" || value === "Others" || value === otherLabel;
  const hasOtherOption = options.includes("Other") || options.includes("Others") || options.includes(otherLabel);

  return (
    <div className={className}>
      <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
        {icon && <span className="label-icon">{icon}</span>}
        {label}
      </label>
      <div className="relative" ref={ref}>
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-slate-600 font-medium">
            {icon}
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-sm sm:text-base cursor-pointer transition-all duration-200 hover:border-slate-400 hover:bg-slate-50/50 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 active:scale-[0.99] ${
            icon ? "pl-11" : ""
          } ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
              : "border-slate-300"
          }`}
        >
          <span className={value ? "text-navy-950 font-bold" : "text-slate-400 font-medium"}>
            {value || placeholder || "Select an option"}
          </span>
          <KeyboardArrowDownIcon
            sx={{ fontSize: 22 }}
            className={`text-slate-600 transition-transform duration-200 ${
              open ? "rotate-180 text-brand-green-600" : ""
            }`}
          />
        </button>
        {open && (
          <div className="absolute z-50 mt-1.5 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-300 bg-white py-1.5 shadow-2xl">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm sm:text-base cursor-pointer transition-all duration-150 ${
                  value === opt
                    ? "font-bold text-brand-green-700 bg-brand-green-50/90 shadow-2xs"
                    : "font-medium text-navy-950 hover:bg-brand-green-50/60 hover:text-brand-green-700 hover:translate-x-1"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      {isOther && hasOtherOption && onOtherChange && (
        <div className="mt-3">
          <label className="mb-1.5 block text-xs sm:text-sm font-bold text-slate-700">
            Please specify
          </label>
          <input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value.replace(/[^a-zA-Z0-9\s,-]/g, ""))}
            placeholder={otherPlaceholder}
            className={`h-11 w-full rounded-xl border bg-white px-4 text-sm sm:text-base font-semibold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
              otherError ? "border-red-500 focus:border-red-600" : "border-slate-300"
            }`}
          />
          <ValidationMessage message={otherError} />
        </div>
      )}
      <ValidationMessage message={error} />
    </div>
  );
}

