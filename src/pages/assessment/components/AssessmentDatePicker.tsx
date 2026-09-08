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
      <label className="mb-2 block text-sm sm:text-base font-bold text-navy-950">
        {label}
      </label>
      <div className="relative cursor-pointer" onClick={handleClick}>
        {icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-slate-600 font-medium">
            {icon}
          </span>
        ) : (
          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 text-slate-600">
            <CalendarTodayIcon sx={{ fontSize: 20 }} />
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
          className={`flex h-12 w-full items-center rounded-xl border bg-white pr-4 transition-all duration-250 hover:border-slate-400 focus-within:border-brand-green-500 focus-within:ring-2 focus-within:ring-brand-green-500/20 ${
            icon ? "pl-11" : "pl-11"
          } ${
            error
              ? "border-red-500 focus-within:border-red-600"
              : "border-slate-300"
          }`}
        >
          <span className={value ? "text-sm sm:text-base font-bold text-navy-950" : "text-sm sm:text-base font-medium text-slate-400"}>
            {value ? formatDisplay(value) : placeholder}
          </span>
          <span className="pointer-events-none ml-auto text-slate-600">
            <CalendarTodayIcon sx={{ fontSize: 20 }} />
          </span>
        </div>
      </div>
      <ValidationMessage message={error} />
    </div>
  );
}

