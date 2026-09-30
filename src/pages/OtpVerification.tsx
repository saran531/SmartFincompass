import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ShieldIcon from "@mui/icons-material/Shield";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import RefreshIcon from "@mui/icons-material/Refresh";
import otpImage from "../Assets/images/OTP.png";
import leafImg from "../Assets/images/Leaf.png";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* Decorative leaf accent used across the reference design */
function Leaf({ className = "" }: { className?: string }) {
  return (
    <img
      src={leafImg}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute z-0 select-none ${className}`}
    />
  );
}

export default function OtpVerification() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-[#04152c]">
      {/* ─── MAIN CONTENT ─── */}
      <main className="relative overflow-hidden bg-[linear-gradient(165deg,#071c3a_0%,#04152c_55%,#053048_100%)]">
        {/* ─── Decorative background layer ─── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-tech-grid-dark opacity-25" />
          <div className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-brand-green-500/20 blur-[120px]" />
          <div className="absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[130px]" />
          <div className="absolute right-[15%] top-1/3 h-96 w-96 rounded-full bg-brand-green-400/10 blur-[110px]" />
          <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full border border-brand-green-400/15" />
          <div className="absolute right-8 top-8 h-64 w-64 rounded-full border border-cyan-400/15" />
          <div className="absolute bottom-32 right-1/4 h-40 w-40 rounded-full border border-brand-green-400/10" />
          {/* Soft dot grids */}
          <div
            className="absolute left-[4%] top-[12%] h-40 w-40 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(34,181,115,0.4) 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div
            className="absolute right-[6%] bottom-[15%] h-36 w-36 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(34,211,238,0.4) 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="absolute left-16 top-1/2 h-2.5 w-2.5 rounded-full bg-cyan-300/70" />
          <div className="absolute right-1/3 top-24 h-3 w-3 rounded-full bg-brand-green-300/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-10">
          {/* Decorative leaf — above the section on mobile/tablet */}
          <img
            src={leafImg}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none mx-auto mb-4 w-28 select-none drop-shadow-xl sm:w-36 lg:hidden"
          />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* LEFT SIDE — OTP Illustration */}
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green-500/20 blur-3xl"
              />
              <img
                src={otpImage}
                alt="OTP Verification illustration"
                className="relative h-auto w-full max-w-[420px] object-contain drop-shadow-2xl sm:max-w-[480px] xl:max-w-[540px]"
              />
            </div>

            {/* RIGHT SIDE — Verify Your Account Card */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Leaf above / around the upper area of the card */}
              <Leaf className="-top-14 right-0 hidden w-36 -rotate-12 sm:-top-20 sm:-right-4 lg:block xl:-right-10 xl:-top-24 xl:w-44" />

              <div className="otp-card relative z-10 w-full max-w-[560px] rounded-[28px] border border-white/10 bg-white p-7 shadow-[0_35px_80px_-25px_rgba(0,0,0,0.7)] sm:p-9 lg:p-10">
                {/* OTP box states + premium focus/fill animations */}
                <style>{`
                  .otp-card .otp-box {
                    border: 2px solid rgba(10, 31, 61, 0.16);
                    background-color: #ffffff;
                    box-shadow: 0 1px 2px rgba(13, 37, 73, 0.06);
                    transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease, background-color 250ms ease;
                  }
                  .otp-card .otp-box:hover:not(:focus) {
                    border-color: rgba(34, 181, 115, 0.6) !important;
                  }
                  .otp-card .otp-box.is-filled:not(.is-active) {
                    border-color: #22b573;
                    background-color: #f2fdf7;
                  }
                  .otp-card .otp-box.is-active {
                    border: 3px solid #189a63 !important;
                    transform: scale(1.05);
                    box-shadow: 0 0 0 4px rgba(34, 181, 115, 0.2), 0 12px 24px -12px rgba(24, 154, 99, 0.6) !important;
                  }
                  .otp-card .otp-box.is-filled {
                    animation: otpDigitPop 280ms cubic-bezier(0.16, 1, 0.3, 1) both;
                  }
                  .otp-card .otp-box.is-filled.is-active {
                    animation-name: otpDigitPopActive;
                  }
                  .otp-card .otp-box:focus-visible {
                    outline: none;
                  }
                  @keyframes otpDigitPop {
                    0% { transform: scale(0.9); opacity: 0.6; }
                    60% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                  }
                  @keyframes otpDigitPopActive {
                    0% { transform: scale(0.9); opacity: 0.6; }
                    60% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1.05); opacity: 1; }
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .otp-card .otp-box {
                      transition: none;
                      animation: none;
                    }
                  }
                `}</style>

                {/* Top Icon */}
                <div className="flex justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-50 ring-1 ring-brand-green-100">
                    <ShieldIcon sx={{ fontSize: 32, color: "#128052" }} />
                  </span>
                </div>

                {/* Title */}
                <h1 className="mt-6 text-center text-2xl font-extrabold text-navy-950 sm:text-3xl">
                  Verify Your <span className="text-brand-green-600">Account</span>
                </h1>

                {/* Description */}
                <p className="mt-3 text-center text-sm font-medium text-navy-900/75">
                  We've sent a 6-digit verification code to
                </p>

                {/* Email Row */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  <EmailIcon sx={{ fontSize: 16, color: "#0a1f3d", opacity: 0.6 }} />
                  <span className="text-sm font-semibold text-navy-950">
                    john.doe@example.com
                  </span>
                  <button className="text-sm font-bold text-brand-green-700 transition-colors hover:text-brand-green-800 hover:underline">
                    Change
                  </button>
                </div>

                {/* OTP Instruction */}
                <p className="mt-7 text-center text-sm font-medium text-navy-900/75">
                  Enter the 6-digit code below
                </p>

                {/* OTP Inputs */}
                <div className="mt-5 flex items-center justify-center gap-2.5 sm:gap-3">
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
                      className={`otp-box h-14 w-11 rounded-xl border-2 bg-white text-center text-xl font-bold text-navy-950 focus:outline-none sm:h-16 sm:w-14 ${
                        activeIndex === i ? "is-active" : digit ? "is-filled" : ""
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
                  <span className="text-sm font-medium text-navy-900/75">
                    The OTP will expire in
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green-300 bg-brand-green-100 px-3 py-1 text-sm font-semibold text-brand-green-800 shadow-sm">
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
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-[15px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(24,154,99,0.75)] transition-all duration-250 hover:from-brand-green-600 hover:to-brand-green-700 hover:shadow-[0_18px_36px_-10px_rgba(24,154,99,0.85)] active:scale-[0.98] active:shadow-sm sm:h-[52px]"
                >
                  <ShieldIcon sx={{ fontSize: 18 }} />
                  Verify & Continue
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-navy-950/15" />
                  <span className="text-xs font-semibold text-navy-900/75">
                    Didn't receive the code?
                  </span>
                  <div className="h-px flex-1 bg-navy-950/15" />
                </div>

                {/* Resend OTP */}
                <div className="flex flex-col items-center gap-2.5">
                  <button
                    onClick={handleResend}
                    disabled={!canResend}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-[15px] font-semibold transition-all duration-250 ${
                      canResend
                        ? "text-brand-green-700 shadow-sm hover:bg-brand-green-100 hover:text-brand-green-800 hover:shadow-md active:scale-[0.98] cursor-pointer"
                        : "bg-navy-950/5 text-navy-900/55 cursor-not-allowed"
                    }`}
                  >
                    <RefreshIcon sx={{ fontSize: 18 }} />
                    Resend OTP
                  </button>
                  <p className="text-xs font-medium text-navy-900/70">
                    You can resend the code in{" "}
                    <span className={`font-bold ${canResend ? "text-brand-green-700" : "text-navy-950"}`}>
                      {formatTime(resendTimeLeft)}
                    </span>{" "}
                    seconds
                  </p>
                </div>

                {/* Security Message */}
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-brand-green-300/80 bg-brand-green-100/70 px-5 py-4 shadow-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-green-600 text-white shadow-sm">
                    <LockIcon sx={{ fontSize: 16 }} />
                  </span>
                  <p className="text-xs font-medium leading-relaxed text-navy-950/80">
                    Your security is our priority. We never share your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
