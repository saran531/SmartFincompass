import { type ClipboardEvent } from "react";
import ValidationMessage from "./ValidationMessage";

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function PhoneInput({
  label = "Phone Number",
  value,
  onChange,
  placeholder = "Enter 10-digit mobile number",
  error,
  required,
  className = "",
  id,
}: PhoneInputProps) {
  const sanitizePhone = (raw: string): string => {
    return raw.replace(/[^0-9]/g, "").slice(0, 10);
  };

  const handleChange = (raw: string) => {
    onChange(sanitizePhone(raw));
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const cleaned = sanitizePhone(pastedText);
    if (cleaned !== pastedText) {
      e.preventDefault();
      const input = e.currentTarget;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      const newValue = value.slice(0, start) + cleaned + value.slice(end);
      onChange(sanitizePhone(newValue));
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="flex">
        <div className="relative flex shrink-0 items-center gap-1.5 rounded-l-xl border border-r-0 border-navy-950/10 bg-slate-50/80 px-3.5 select-none">
          <span className="text-lg leading-none" role="img" aria-label="India flag">🇮🇳</span>
          <span className="text-sm sm:text-base font-bold text-navy-950">+91</span>
        </div>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onPaste={handlePaste}
          placeholder={placeholder}
          maxLength={10}
          className={`h-12 w-full rounded-r-xl border bg-white px-4 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/40 transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : "border-navy-950/10"
          }`}
        />
      </div>
      <ValidationMessage message={error} />
    </div>
  );
}
