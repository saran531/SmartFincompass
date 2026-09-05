import { type ReactNode, useRef } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ValidationMessage from "./ValidationMessage";

interface AssessmentDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  required?: boolean;
  max?: string;
  min?: string;
  className?: string;
}

export default function AssessmentDatePicker({
  label,
  value,
  onChange,
  placeholder = "Select date",
  icon,
  error,
  required,
  max,
  min,
  className = "",
}: AssessmentDatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      if ("showPicker" in inputRef.current && typeof inputRef.current.showPicker === "function") {
        try {
          inputRef.current.showPicker();
        } catch {
          inputRef.current.focus();
        }
      } else {
        inputRef.current.focus();
      }
    }
  };

  const formatDisplay = (iso: string) => {
    if (!iso) return "";
    const parts = iso.split("-");
    if (parts.length !== 3) return iso;
    const [y, m, d] = parts;
    return `${d} / ${m} / ${y}`;
  };

  return (
    <div className={className}>
      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="relative cursor-pointer" onClick={handleClick}>
        {icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-navy-900/40">
            {icon}
          </span>
        ) : (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-navy-900/40">
            <CalendarTodayIcon sx={{ fontSize: 18 }} />
          </span>
        )}
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          max={max}
          min={min}
          className="absolute inset-0 z-20 h-12 w-full cursor-pointer opacity-0"
        />
        <div
          className={`flex h-12 w-full items-center rounded-xl border bg-white pr-4 transition-all duration-250 hover:border-navy-950/20 focus-within:border-brand-green-500 focus-within:ring-2 focus-within:ring-brand-green-500/20 ${
            icon ? "pl-10" : "pl-10"
          } ${
            error
              ? "border-red-400"
              : "border-navy-950/10"
          }`}
        >
          <span className={value ? "text-sm sm:text-base font-medium text-navy-950" : "text-sm sm:text-base text-navy-900/40"}>
            {value ? formatDisplay(value) : placeholder}
          </span>
          <span className="pointer-events-none ml-auto text-navy-900/30">
            <CalendarTodayIcon sx={{ fontSize: 18 }} />
          </span>
        </div>
      </div>
      <ValidationMessage message={error} />
    </div>
  );
}
