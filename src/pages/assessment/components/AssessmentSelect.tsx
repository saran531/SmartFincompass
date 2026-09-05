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
  required?: boolean;
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
  required,
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
      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative" ref={ref}>
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-navy-900/40">
            {icon}
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-sm sm:text-base transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : "border-navy-950/10"
          }`}
        >
          <span className={value ? "text-navy-950 font-medium" : "text-navy-900/40"}>
            {value || placeholder || "Select an option"}
          </span>
          <KeyboardArrowDownIcon
            sx={{ fontSize: 20 }}
            className={`text-navy-900/40 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        {open && (
          <div className="absolute z-30 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-navy-950/8 bg-white py-1 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm sm:text-base transition-colors hover:bg-brand-green-50 ${
                  value === opt
                    ? "font-semibold text-brand-green-600"
                    : "text-navy-950"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      {isOther && hasOtherOption && onOtherChange && (
        <div className="mt-2.5">
          <label className="mb-1 block text-xs font-semibold text-navy-900/70">
            Please specify <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value.replace(/[^a-zA-Z0-9\s,-]/g, ""))}
            placeholder={otherPlaceholder}
            className={`h-11 w-full rounded-xl border bg-white px-4 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/40 transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
              otherError ? "border-red-400 focus:border-red-500" : "border-navy-950/10"
            }`}
          />
          <ValidationMessage message={otherError} />
        </div>
      )}
      <ValidationMessage message={error} />
    </div>
  );
}
