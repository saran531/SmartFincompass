import { useState, useRef, useEffect, type ClipboardEvent } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ValidationMessage from "./ValidationMessage";

export interface CountryOption {
  name: string;
  code: string;
  iso: string;
  flag: string;
}

const COUNTRIES: CountryOption[] = [
  { name: "India", code: "+91", iso: "IN", flag: "🇮🇳" },
  { name: "United States", code: "+1", iso: "US", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", iso: "GB", flag: "🇬🇧" },
  { name: "United Arab Emirates", code: "+971", iso: "AE", flag: "🇦🇪" },
  { name: "Singapore", code: "+65", iso: "SG", flag: "🇸🇬" },
  { name: "Australia", code: "+61", iso: "AU", flag: "🇦🇺" },
  { name: "Canada", code: "+1", iso: "CA", flag: "🇨🇦" },
  { name: "Germany", code: "+49", iso: "DE", flag: "🇩🇪" },
  { name: "France", code: "+33", iso: "FR", flag: "🇫🇷" },
  { name: "Japan", code: "+81", iso: "JP", flag: "🇯🇵" },
  { name: "Saudi Arabia", code: "+966", iso: "SA", flag: "🇸🇦" },
  { name: "Qatar", code: "+974", iso: "QA", flag: "🇶🇦" },
  { name: "Oman", code: "+968", iso: "OM", flag: "🇴🇲" },
  { name: "Kuwait", code: "+965", iso: "KW", flag: "🇰🇼" },
  { name: "Bahrain", code: "+973", iso: "BH", flag: "🇧🇭" },
  { name: "Malaysia", code: "+60", iso: "MY", flag: "🇲🇾" },
  { name: "New Zealand", code: "+64", iso: "NZ", flag: "🇳🇿" },
  { name: "South Africa", code: "+27", iso: "ZA", flag: "🇿🇦" },
  { name: "Nepal", code: "+977", iso: "NP", flag: "🇳🇵" },
  { name: "Sri Lanka", code: "+94", iso: "LK", flag: "🇱🇰" },
  { name: "Bangladesh", code: "+880", iso: "BD", flag: "🇧🇩" },
  { name: "Indonesia", code: "+62", iso: "ID", flag: "🇮🇩" },
  { name: "Philippines", code: "+63", iso: "PH", flag: "🇵🇭" },
  { name: "Thailand", code: "+66", iso: "TH", flag: "🇹🇭" },
  { name: "Vietnam", code: "+84", iso: "VN", flag: "🇻🇳" },
  { name: "Italy", code: "+39", iso: "IT", flag: "🇮🇹" },
  { name: "Spain", code: "+34", iso: "ES", flag: "🇪🇸" },
  { name: "Netherlands", code: "+31", iso: "NL", flag: "🇳🇱" },
  { name: "Switzerland", code: "+41", iso: "CH", flag: "🇨🇭" },
  { name: "Sweden", code: "+46", iso: "SE", flag: "🇸🇪" },
  { name: "Ireland", code: "+353", iso: "IE", flag: "🇮🇪" },
];

function CountryFlag({ iso, flag, name }: { iso: string; flag: string; name: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <span className="text-base leading-none shrink-0" role="img" aria-label={name}>
        {flag}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${iso.toLowerCase()}.png`}
      alt={name}
      className="h-3.5 w-5 rounded-2xs object-cover shadow-2xs shrink-0"
      onError={() => setImgFailed(true)}
    />
  );
}

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  id?: string;
}

export default function PhoneInput({
  label = "Phone Number",
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  placeholder = "Enter 10-digit mobile number",
  error,
  className = "",
  id,
}: PhoneInputProps) {
  const [internalCountry, setInternalCountry] = useState("+91");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCode = countryCode ?? internalCountry;
  const currentCountry = COUNTRIES.find((c) => c.code === selectedCode) || COUNTRIES[0];

  const handleCountrySelect = (c: CountryOption) => {
    if (onCountryCodeChange) {
      onCountryCodeChange(c.code);
    } else {
      setInternalCountry(c.code);
    }
    setDropdownOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery) ||
      c.iso.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sanitizePhone = (raw: string): string => {
    return raw.replace(/[^0-9]/g, "").slice(0, 12);
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
        <label className="mb-2 block text-sm sm:text-base font-bold text-navy-950">
          {label}
        </label>
      )}
      <div className="relative flex">
        {/* Country Selector Dropdown Trigger */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className={`flex h-12 items-center gap-2 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100/80 px-3 select-none cursor-pointer transition-all duration-200 hover:bg-slate-200/90 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 active:scale-[0.98] z-10 ${
              error ? "border-red-500" : ""
            }`}
            aria-label="Select country code"
          >
            <CountryFlag iso={currentCountry.iso} flag={currentCountry.flag} name={currentCountry.name} />
            <span className="text-xs font-extrabold text-slate-600 uppercase">
              {currentCountry.iso}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-navy-950">
              {currentCountry.code}
            </span>
            <KeyboardArrowDownIcon
              sx={{ fontSize: 18 }}
              className={`text-slate-600 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180 text-brand-green-600" : ""
              }`}
            />
          </button>

          {/* Country Selector Menu */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full z-50 mt-1.5 w-72 sm:w-84 rounded-xl border border-slate-300 bg-white p-2.5 shadow-2xl">
              {/* Search box inside dropdown */}
              <div className="relative mb-2">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <SearchIcon sx={{ fontSize: 18 }} />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country or code..."
                  className="h-9 w-full rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-3 text-xs sm:text-sm font-medium text-navy-950 placeholder:text-slate-400 transition-all duration-200 focus:border-brand-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                  autoFocus
                />
              </div>

              {/* Country Options List */}
              <div className="max-h-56 overflow-y-auto space-y-0.5">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((c) => (
                    <button
                      key={`${c.name}-${c.code}`}
                      type="button"
                      onClick={() => handleCountrySelect(c)}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm cursor-pointer transition-all duration-150 ${
                        selectedCode === c.code
                          ? "bg-brand-green-50/90 text-brand-green-700 font-bold shadow-2xs"
                          : "text-navy-950 font-medium hover:bg-brand-green-50/60 hover:text-brand-green-700 hover:translate-x-0.5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CountryFlag iso={c.iso} flag={c.flag} name={c.name} />
                        <span className="text-xs font-extrabold text-slate-600 uppercase w-6 shrink-0">{c.iso}</span>
                        <span className="truncate max-w-[130px] font-medium text-navy-950">{c.name}</span>
                      </div>
                      <span className="font-extrabold text-slate-700 text-xs sm:text-sm shrink-0 pl-2">{c.code}</span>
                    </button>
                  ))
                ) : (
                  <p className="p-3 text-center text-xs text-slate-500">No countries found</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Input Field */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onPaste={handlePaste}
          placeholder={placeholder}
          maxLength={12}
          className={`h-12 w-full rounded-r-xl border bg-white px-4 text-sm sm:text-base font-semibold text-navy-950 placeholder:text-slate-400 transition-all duration-250 hover:border-slate-400 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
            error
              ? "border-red-500 focus:border-red-600 focus:ring-red-500/20"
              : "border-slate-300"
          }`}
        />
      </div>
      <ValidationMessage message={error} />
    </div>
  );
}
