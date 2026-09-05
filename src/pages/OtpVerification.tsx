import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShieldIcon from "@mui/icons-material/Shield";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import RefreshIcon from "@mui/icons-material/Refresh";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import otpImage from "../Assets/images/OTPVerification.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Financial Guide", href: "/financial-guide" },
      { label: "FAQs", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" },
    ],
  },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function OtpVerification() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP expiry timer: 1:56 = 116 seconds
  const [otpTimeLeft, setOtpTimeLeft] = useState(116);
  // Resend timer: 28 seconds
  const [resendTimeLeft, setResendTimeLeft] = useState(28);
  const canResend = resendTimeLeft <= 0;

  // OTP countdown
  useEffect(() => {
    if (otpTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setOtpTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpTimeLeft]);

  // Resend countdown
  useEffect(() => {
    if (resendTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setResendTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimeLeft]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) {
        // Handle paste
        const digits = value.replace(/\D/g, "").slice(0, 6).split("");
        const newOtp = [...otp];
        digits.forEach((digit, i) => {
          if (index + i < 6) newOtp[index + i] = digit;
        });
        setOtp(newOtp);
        const nextIndex = Math.min(index + digits.length, 5);
        setActiveIndex(nextIndex);
        inputRefs.current[nextIndex]?.focus();
        return;
      }

      if (value && !/^\d$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        setActiveIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handleResend = () => {
    if (!canResend) return;
    setResendTimeLeft(28);
    setOtpTimeLeft(116);
    setOtp(["", "", "", "", "", ""]);
    setActiveIndex(0);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ─── NAVBAR ─── */}
      <header className="sticky top-0 z-50 border-b border-navy-950/5 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white">
              <ExploreIcon fontSize="small" />
            </span>
            <span className="text-xl font-bold leading-tight text-navy-950">
              SmartFin
              <span className="block -mt-1 text-brand-green-600">Compass</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`group/nav relative text-[15px] font-medium transition-colors duration-250 ${
                  i === 0 ? "text-navy-950" : "text-navy-900/70 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                  i === 0 ? "w-full" : "w-0 group-hover/nav:w-full"
                }`} />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              to="/login"
              className="rounded-lg border border-navy-950/15 px-6 py-2.5 text-sm font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98]"
            >
              Login
            </Link>
            <Link
              to="/create-account"
              className="rounded-lg bg-brand-green-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-navy-950 lg:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-navy-950/5 bg-white px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-navy-900/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full rounded-lg border border-navy-950/15 px-5 py-2.5 text-center text-sm font-semibold text-navy-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/create-account"
                className="w-full rounded-lg bg-brand-green-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Left dots pattern */}
          <div className="absolute left-[5%] top-[15%] grid grid-cols-5 gap-2 opacity-30">
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-navy-950/15" />
            ))}
          </div>
          {/* Right dots pattern */}
          <div className="absolute right-[5%] top-[10%] grid grid-cols-5 gap-2 opacity-30">
            {Array.from({ length: 25 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-navy-950/15" />
            ))}
          </div>
          {/* Soft blue curved shapes */}
          <div className="absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full bg-sky-50/60 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-brand-green-50/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="mx-auto max-w-[560px]">
            {/* Main Card */}
            <div className="rounded-3xl border border-navy-950/5 bg-white p-8 shadow-[0_8px_40px_rgba(13,37,73,0.08)] sm:p-10">
              {/* Top Icon */}
              <div className="flex justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-50">
                  <ShieldIcon sx={{ fontSize: 32, color: "#128052" }} />
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-6 text-center text-2xl font-extrabold text-navy-950 sm:text-3xl">
                Verify Your Account
              </h1>

              {/* Description */}
              <p className="mt-3 text-center text-sm text-navy-900/55">
                We've sent a 6-digit verification code to
              </p>

              {/* Email Row */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <EmailIcon sx={{ fontSize: 16, color: "#0a1f3d", opacity: 0.4 }} />
                <span className="text-sm font-semibold text-navy-950">
                  john.doe@example.com
                </span>
                <button className="text-sm font-semibold text-brand-green-600 transition-colors hover:text-brand-green-700">
                  Change
                </button>
              </div>

              {/* Illustration */}
              <div className="mx-auto mt-5 mb-1 flex w-full max-w-[410px] items-center justify-center">
                <img
                  src={otpImage}
                  alt="OTP Verification illustration"
                  className="h-auto max-h-[280px] w-full object-contain"
                />
              </div>

              {/* OTP Instruction */}
              <p className="mt-6 text-center text-sm text-navy-900/55">
                Enter the 6-digit code below
              </p>

              {/* OTP Inputs */}
              <div className="mt-5 flex items-center justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => {
                      handleChange(i, e.target.value);
                      setOtpError("");
                    }}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onFocus={() => setActiveIndex(i)}
                    className={`h-14 w-12 rounded-xl border-2 bg-white text-center text-xl font-bold text-navy-950 transition-all duration-200 focus:outline-none sm:h-16 sm:w-14 ${
                      activeIndex === i
                        ? "border-brand-green-500 ring-2 ring-brand-green-500/20"
                        : digit
                        ? "border-brand-green-300"
                        : "border-navy-950/10 hover:border-navy-950/20"
                    }`}
                  />
                ))}
              </div>

              {/* OTP Error */}
              {otpError && (
                <p className="mt-3 text-center text-sm text-red-500">{otpError}</p>
              )}

              {/* Timer */}
              <div className="mt-5 flex items-center justify-center gap-2.5">
                <span className="text-sm text-navy-900/55">
                  The OTP will expire in
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green-200 bg-brand-green-50 px-3 py-1 text-sm font-semibold text-brand-green-700">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {formatTime(otpTimeLeft)}
                </span>
              </div>

              {/* Verify Button */}
              <button
                type="button"
                onClick={() => {
                  const otpStr = otp.join("");
                  if (otpStr.length !== 6) {
                    setOtpError("Please enter the complete 6-digit OTP.");
                    return;
                  }
                  if (otpStr !== "123456") {
                    setOtpError("Invalid OTP. Please enter the correct verification code.");
                    return;
                  }
                  setOtpError("");
                  navigate("/login");
                }}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green-500 text-[15px] font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98] active:shadow-sm"
              >
                <ShieldIcon sx={{ fontSize: 18 }} />
                Verify & Continue
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-navy-950/10" />
                <span className="text-xs font-medium text-navy-900/40">
                  Didn't receive the code?
                </span>
                <div className="h-px flex-1 bg-navy-950/10" />
              </div>

              {/* Resend OTP */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`inline-flex items-center gap-2 text-[15px] font-semibold transition-colors duration-250 ${
                    canResend
                      ? "text-brand-green-600 hover:text-brand-green-700 cursor-pointer"
                      : "text-navy-900/30 cursor-not-allowed"
                  }`}
                >
                  <RefreshIcon sx={{ fontSize: 18 }} />
                  Resend OTP
                </button>
                <p className="text-xs text-navy-900/45">
                  You can resend the code in{" "}
                  <span className={`font-semibold ${canResend ? "text-brand-green-600" : "text-navy-950"}`}>
                    {formatTime(resendTimeLeft)}
                  </span>{" "}
                  seconds
                </p>
              </div>

              {/* Security Message */}
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-brand-green-100 bg-brand-green-50/50 px-5 py-3.5">
                <LockIcon sx={{ fontSize: 18, color: "#128052" }} />
                <p className="text-xs leading-relaxed text-navy-900/60">
                  Your security is our priority. We never share your information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-950 pt-20 text-white/70">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white">
                  <ExploreIcon fontSize="small" />
                </span>
                <span className="text-xl font-bold leading-tight text-white">
                  SmartFin
                  <span className="block -mt-1 text-brand-green-400">
                    Compass
                  </span>
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed">
                AI-powered financial wellness platform that helps you make
                smarter financial decisions.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, LinkedInIcon, TwitterIcon, InstagramIcon].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-all duration-200 hover:scale-110 hover:bg-brand-green-500 hover:text-white"
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </a>
                  )
                )}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-bold text-white">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm transition-colors duration-200 hover:text-brand-green-400"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-sm font-bold text-white">Contact Us</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-center gap-2.5">
                  <EmailIcon sx={{ fontSize: 16 }} />
                  support@smartfincompass.com
                </li>
                <li className="flex items-center gap-2.5">
                  <CallIcon sx={{ fontSize: 16 }} />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2.5">
                  <PlaceIcon sx={{ fontSize: 16 }} />
                  Bangalore, Karnataka, India
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs sm:flex-row">
            <p>© 2025 SmartFin Compass. All rights reserved.</p>
            <div className="flex gap-5">
              <a
                href="#"
                className="transition-colors duration-200 hover:text-brand-green-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="transition-colors duration-200 hover:text-brand-green-400"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
