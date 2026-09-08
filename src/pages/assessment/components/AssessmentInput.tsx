import { type ReactNode, type ClipboardEvent } from "react";
import ValidationMessage from "./ValidationMessage";

interface AssessmentInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  type?: string;
  mode?: "text-only" | "number-only" | "alphanumeric" | "all";
  error?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export default function AssessmentInput({
  label,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  mode = "all",
  error,
  maxLength,
  disabled,
  className = "",
  id,
}: AssessmentInputProps) {
  const sanitizeValue = (val: string): string => {
    if (mode === "text-only") {
      return val.replace(/[^a-zA-Z\s]/g, "");
    }
    if (mode === "number-only") {
      return val.replace(/[^0-9]/g, "");
    }
    return val;
  };

  const handleChange = (val: string) => {
    const cleaned = sanitizeValue(val);
    onChange(cleaned);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (mode === "text-only" || mode === "number-only") {
      const pastedText = e.clipboardData.getData("text");
      const cleaned = sanitizeValue(pastedText);
      if (cleaned !== pastedText) {
        e.preventDefault();
        const input = e.currentTarget;
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;
        const newValue = value.slice(0, start) + cleaned + value.slice(end);
        onChange(newValue);
      }
    }
  };

  return (
    <div className={className}>
      <label className="mb-2 block text-sm sm:text-base font-bold text-navy-950">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-600 font-medium">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onPaste={handlePaste}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={`h-12 w-full rounded-xl border bg-white pr-4 text-sm sm:text-base font-semibold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
            icon ? "pl-11" : "pl-4"
          } ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
              : "border-slate-300"
          } ${disabled ? "bg-slate-100 opacity-70 cursor-not-allowed text-slate-600" : ""}`}
        />
      </div>
      <ValidationMessage message={error} />
    </div>
  );
}


