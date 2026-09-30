import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShieldIcon from "@mui/icons-material/Shield";
import InsightsIcon from "@mui/icons-material/Insights";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SendIcon from "@mui/icons-material/Send";
import createAccountImage from "../Assets/images/CreateAccount.png";
import leafImg from "../Assets/images/Leaf.png";
import contactImage from "../Assets/images/contactimage.png";

const BENEFITS = [
  {
    icon: ShieldIcon,
    color: "bg-emerald-100 text-emerald-600 ring-emerald-300/40",
    title: "Secure & Private",
    desc: "Bank-level encryption to keep your data safe and secure.",
  },
  {
    icon: InsightsIcon,
    color: "bg-blue-100 text-blue-600 ring-blue-300/40",
    title: "Personalized Insights",
    desc: "AI-powered analysis and recommendations tailored to your goals.",
  },
  {
    icon: EmojiEventsIcon,
    color: "bg-orange-100 text-orange-600 ring-orange-300/40",
    title: "Achieve Your Goals",
    desc: "Smart roadmap to help you plan, save and grow your wealth.",
  },
];

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

export default function CreateAccount() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (/\d/.test(fullName)) {
      newErrors.fullName = "Full name should not contain numbers.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10,15}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits).";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      navigate("/otp-verification");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ─── MAIN CONTENT ─── */}
      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(165deg,#071c3a_0%,#04152c_55%,#053048_100%)]">
          {/* ─── Decorative background layer ─── */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-tech-grid-dark opacity-25" />
            <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand-green-500/20 blur-[120px]" />
            <div className="absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[130px]" />
            <div className="absolute right-[12%] top-1/3 h-96 w-96 rounded-full bg-brand-green-400/15 blur-[110px]" />
            <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="absolute -left-24 top-1/3 h-80 w-80 rounded-full border border-brand-green-400/15" />
            <div className="absolute right-10 top-10 h-64 w-64 rounded-full border border-cyan-400/15" />
            <div className="absolute bottom-24 right-1/4 h-40 w-40 rounded-full border border-brand-green-400/10" />
            <div
              className="absolute left-6 top-16 h-44 w-44 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(34,181,115,0.4) 1.5px, transparent 1.5px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="absolute left-16 top-1/2 h-2.5 w-2.5 rounded-full bg-cyan-300/70" />
            <div className="absolute right-1/3 top-24 h-3 w-3 rounded-full bg-brand-green-300/70" />
            <div className="absolute left-1/3 bottom-40 h-2 w-2 rounded-full bg-sky-300/60" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-brand-green-600/25 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start lg:gap-16">
              {/* LEFT SIDE — Marketing Content */}
              <div className="flex flex-col">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-green-400">
                  Join SmartFin Compass
                </p>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                  Create Your Account
                  <br />
                  & Take Control of
                  <br />
                  <span className="text-brand-green-400">Your Financial Future</span>
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-slate-300/80">
                  Start your journey to financial clarity and security with
                  AI-powered insights personalized just for you.
                </p>

                <div className="mt-10 space-y-6">
                  {BENEFITS.map((b) => (
                    <div key={b.title} className="flex items-start gap-4">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${b.color}`}
                      >
                        <b.icon sx={{ fontSize: 24 }} />
                      </span>
                      <div>
                        <p className="text-base font-bold text-white">
                          {b.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300/80">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Illustration */}
                <div className="relative mt-10 flex justify-center lg:justify-start">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green-500/20 blur-3xl lg:left-1/3"
                  />
                  <img
                    src={createAccountImage}
                    alt="Create Account illustration"
                    className="relative h-auto max-h-[420px] w-full max-w-[520px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* RIGHT SIDE — Create Account Card */}
              <div className="relative flex justify-center lg:justify-end">
                {/* Leaf above the Create Account card */}
                <Leaf className="-top-14 right-0 w-24 rotate-12 sm:-top-20 sm:w-32 lg:-right-4 lg:w-36" />
                {/* Leaf peeking from behind the left edge of the card */}
                <Leaf className="top-24 -left-6 hidden w-28 -rotate-12 scale-x-[-1] sm:block lg:-left-24 lg:w-36" />

                <div className="relative z-10 w-full max-w-[440px] rounded-[28px] border border-white/10 bg-white p-7 shadow-[0_35px_80px_-25px_rgba(0,0,0,0.7)] sm:p-9 lg:p-10">
                  {/* Logo */}
                  <div className="flex justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green-50 text-brand-green-600 ring-1 ring-brand-green-100">
                      <ExploreIcon sx={{ fontSize: 32 }} />
                    </span>
                  </div>

                  <h2 className="mt-6 text-center text-2xl font-extrabold text-navy-950">
                    Create Account
                  </h2>
                  <p className="mt-2 text-center text-sm text-navy-900/55">
                    Fill in your details to get started
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy-950">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-navy-900/30">
                          <PersonIcon sx={{ fontSize: 20 }} />
                        </span>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!/\d/.test(val)) setFullName(val);
                          }}
                          placeholder="Enter your full name"
                          className="h-12 w-full rounded-xl border border-navy-950/12 bg-white pl-12 pr-4 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-brand-green-500/50 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                        />
                      </div>
                      {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy-950">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-navy-900/30">
                          <EmailIcon sx={{ fontSize: 20 }} />
                        </span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="h-12 w-full rounded-xl border border-navy-950/12 bg-white pl-12 pr-4 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-brand-green-500/50 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy-950">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-navy-900/30">
                          <PhoneIcon sx={{ fontSize: 20 }} />
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setPhone(val);
                          }}
                          placeholder="Enter your phone number"
                          className="h-12 w-full rounded-xl border border-navy-950/12 bg-white pl-12 pr-4 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-brand-green-500/50 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy-950">
                        Password
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-navy-900/30">
                          <LockIcon sx={{ fontSize: 20 }} />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
                          className="h-12 w-full rounded-xl border border-navy-950/12 bg-white px-12 pr-12 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-brand-green-500/50 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute inset-y-0 right-0 flex items-center pr-4 text-navy-900/30 transition-colors hover:text-navy-900/60"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <VisibilityIcon sx={{ fontSize: 20 }} />
                          )}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy-950">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-navy-900/30">
                          <LockIcon sx={{ fontSize: 20 }} />
                        </span>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="h-12 w-full rounded-xl border border-navy-950/12 bg-white px-12 pr-12 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-brand-green-500/50 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          className="absolute inset-y-0 right-0 flex items-center pr-4 text-navy-900/30 transition-colors hover:text-navy-900/60"
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <VisibilityIcon sx={{ fontSize: 20 }} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                    </div>

                    {/* Terms Checkbox */}
                    <div>
                      <label className="flex cursor-pointer items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => {
                            setAgreeTerms(e.target.checked);
                            if (e.target.checked) setErrors((prev) => ({ ...prev, terms: "" }));
                          }}
                          className="mt-0.5 h-4 w-4 rounded border-navy-950/20 text-brand-green-500 focus:ring-brand-green-500/20"
                        />
                        <span className="text-sm text-navy-900/70">
                          I agree to the{" "}
                          <a href="#" className="font-semibold text-brand-green-600 hover:text-brand-green-700">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="font-semibold text-brand-green-600 hover:text-brand-green-700">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                      {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
                    </div>

                    {/* Create Account Button */}
                    <button
                      type="submit"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-green-500 to-brand-green-600 text-[15px] font-semibold text-white shadow-[0_12px_26px_-10px_rgba(24,154,99,0.7)] transition-all duration-250 hover:from-brand-green-600 hover:to-brand-green-700 hover:shadow-[0_16px_32px_-10px_rgba(24,154,99,0.8)] active:scale-[0.98] active:shadow-sm"
                    >
                      <PersonAddIcon sx={{ fontSize: 18 }} />
                      Create Account
                      <ArrowForwardIcon sx={{ fontSize: 18 }} />
                    </button>
                  </form>

                  {/* OR Divider */}
                  <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-navy-950/10" />
                    <span className="text-xs font-medium text-navy-900/40">
                      or
                    </span>
                    <div className="h-px flex-1 bg-navy-950/10" />
                  </div>

                  {/* Google Button */}
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-navy-950/12 bg-white text-[15px] font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500/50 hover:shadow-md active:scale-[0.98]"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign up with Google
                  </button>

                  {/* Login Link */}
                  <p className="mt-7 text-center text-sm text-navy-900/60">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-brand-green-600 transition-colors hover:text-brand-green-700"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Leaf at the bottom-left of the section */}
            <Leaf className="bottom-0 left-0 hidden w-32 -rotate-6 opacity-90 lg:block xl:w-40" />
          </div>
        </section>
      </main>

      {/* ─── NEWSLETTER ─── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-green-600 via-brand-green-600 to-brand-green-700">
        {/* Decorative background layer */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-brand-green-400/30 blur-3xl" />
          <div className="absolute inset-0 bg-tech-grid-light opacity-40" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-14 sm:flex-row lg:px-10 xl:pr-72">
          <div className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-brand-green-600 shadow-[0_10px_25px_-8px_rgba(3,40,25,0.5)]">
              <SendIcon sx={{ fontSize: 24 }} />
            </span>
            <div>
              <p className="text-xl font-bold text-white">
                Stay Updated with Financial Insights
              </p>
              <p className="mt-1 text-sm text-white/80">
                Subscribe to our newsletter and never miss an update.
              </p>
            </div>
          </div>
          <form
            className="flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="h-[50px] min-w-0 flex-1 rounded-xl border border-white/40 bg-white px-5 text-sm text-navy-950 placeholder:text-navy-900/40 transition-all duration-250 hover:border-white/70 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <button
              type="submit"
              className="flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-xl bg-navy-950 px-8 text-sm font-semibold text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg active:scale-[0.98] active:translate-y-0 active:shadow-sm"
            >
              <SendIcon sx={{ fontSize: 18 }} />
              Subscribe
            </button>
          </form>
        </div>

        {/* Decorative newsletter illustration — stacked below on small screens */}
        <img
          src={contactImage}
          alt=""
          aria-hidden="true"
          className="relative z-10 mx-auto -mt-2 mb-10 w-44 select-none object-contain sm:w-52 xl:hidden"
        />
        {/* Decorative newsletter illustration — right side on large screens */}
        <img
          src={contactImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 right-6 hidden h-[calc(100%-24px)] w-auto max-w-[260px] select-none object-contain drop-shadow-xl xl:block"
        />
      </section>
    </div>
  );
}
