import { type ReactNode, type ClipboardEvent } from "react";
import ValidationMessage from "./ValidationMessage";

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  allowDecimals?: boolean;
  className?: string;
}

export default function CurrencyInput({
  label,
  value,
  onChange,
  placeholder = "Enter amount",
  icon,
  error,
  allowDecimals = true,
  className = "",
}: CurrencyInputProps) {
  const sanitizeCurrency = (raw: string): string => {
    const pattern = allowDecimals ? /[^0-9.]/g : /[^0-9]/g;
    let cleaned = raw.replace(pattern, "");
    if (allowDecimals) {
      const parts = cleaned.split(".");
      if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
      if (parts[1] && parts[1].length > 2) cleaned = parts[0] + "." + parts[1].slice(0, 2);
    }
    return cleaned;
  };

  const handleChange = (raw: string) => {
    onChange(sanitizeCurrency(raw));
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const cleaned = sanitizeCurrency(pastedText);
    if (cleaned !== pastedText) {
      e.preventDefault();
      const input = e.currentTarget;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      const newValue = value.slice(0, start) + cleaned + value.slice(end);
      onChange(sanitizeCurrency(newValue));
    }
  };

  return (
    <div className={className}>
      <label className="mb-2 flex items-center gap-2 text-sm sm:text-base font-bold text-navy-950">
        <span className="label-icon">₹</span>
        {label}
      </label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-navy-950 font-bold text-base sm:text-lg">
            {icon}
          </span>
        ) : (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-base sm:text-lg font-black text-navy-950">
            ₹
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onPaste={handlePaste}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border bg-white pr-11 text-sm sm:text-base font-extrabold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
            icon ? "pl-11" : "pl-9"
          } ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
              : "border-slate-300"
          }`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs sm:text-sm font-bold text-slate-500">
          .00
        </span>
      </div>
      <ValidationMessage message={error} />
    </div>
  );
}

