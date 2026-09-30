import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ExploreIcon from "@mui/icons-material/Explore";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InsightsIcon from "@mui/icons-material/Insights";
import ShieldIcon from "@mui/icons-material/Shield";
import MapIcon from "@mui/icons-material/Map";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SendIcon from "@mui/icons-material/Send";
import loginImage from "../Assets/images/Login.png";
import paperRocketImg from "../Assets/images/PaperRocket.png";
import contactImage from "../Assets/images/contactimage.png";

const BENEFITS = [
  {
    icon: InsightsIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "AI-Powered Insights",
    desc: "Get intelligent insights about your financial health.",
  },
  {
    icon: ShieldIcon,
    color: "text-blue-600 bg-blue-50",
    title: "Secure & Private",
    desc: "Your data is encrypted and protected with bank-level security.",
  },
  {
    icon: MapIcon,
    color: "text-purple-600 bg-purple-50",
    title: "Personalized Roadmap",
    desc: "Continue where you left off and achieve your financial goals.",
  },
];

const TRUST_ITEMS = [
  {
    icon: SecurityIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Bank-Level Security",
    desc: "Your data is 100% secure",
  },
  {
    icon: GroupsIcon,
    color: "text-blue-600 bg-blue-50",
    title: "10,000+ Users",
    desc: "Trust SmartFin Compass",
  },
  {
    icon: AutoGraphIcon,
    color: "text-purple-600 bg-purple-50",
    title: "AI-Powered Platform",
    desc: "Smart insights for you",
  },
  {
    icon: TrendingUpIcon,
    color: "text-orange-600 bg-orange-50",
    title: "Financial Freedom",
    desc: "Achieve your goals",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate("/welcome");
    } else {
      setError(result.error || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ─── MAIN CONTENT ─── */}
      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50/80 via-white to-brand-green-50/50">
          {/* Decorative background layer */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
            <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-brand-green-200/40 blur-3xl" />
            <div className="absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
            <div className="absolute -left-16 top-8 h-72 w-72 rounded-full border border-cyan-300/40" />
            <div className="absolute -left-4 top-28 h-40 w-40 rounded-full border border-brand-green-300/30" />
            <div className="absolute right-12 top-12 h-56 w-56 rounded-full border border-cyan-200/50" />
            <div className="absolute right-40 top-56 h-24 w-24 rounded-full border border-brand-green-200/60" />
            <div
              className="absolute right-20 top-24 h-24 w-36 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(13,37,73,0.18) 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
            <div className="absolute left-1/3 top-6 h-2.5 w-2.5 rounded-full bg-cyan-300/80" />
            <div className="absolute right-1/4 top-44 h-3 w-3 rounded-full bg-brand-green-300/80" />
            <div className="absolute left-12 top-2/3 h-2 w-2 rounded-full bg-sky-300/70" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            {/* LEFT SIDE — Welcome + Benefits + Illustration */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-extrabold leading-tight text-navy-950 sm:text-4xl lg:text-5xl">
                Welcome Back!
              </h1>
              <h2 className="mt-2 text-xl font-bold text-brand-green-600 sm:text-2xl lg:text-3xl">
                Login to your account
              </h2>
              <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-navy-900/70">
                Access your personalized financial dashboard and continue your
                journey towards financial freedom.
              </p>

              <div className="mt-10 space-y-6">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex items-start gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${b.color}`}
                    >
                      <b.icon sx={{ fontSize: 24 }} />
                    </span>
                    <div>
                      <p className="text-base sm:text-lg font-bold text-navy-950">
                        {b.title}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-navy-900/70 font-medium">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Illustration */}
              <div className="mt-8 flex justify-center lg:justify-start">
                <img
                  src={loginImage}
                  alt="Financial security illustration"
                  className="h-auto max-h-[420px] w-full max-w-[520px] object-contain"
                />
              </div>
            </div>

            {/* RIGHT SIDE — Login Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="login-card relative w-full max-w-[440px] rounded-3xl border border-white/10 bg-[#0d2747] p-8 shadow-[0_24px_60px_-18px_rgba(2,12,32,0.55)] sm:p-10 [background-image:radial-gradient(140%_90%_at_90%_-10%,rgba(16,185,129,0.14),transparent_55%),radial-gradient(120%_80%_at_-10%_110%,rgba(16,185,129,0.08),transparent_60%),radial-gradient(100%_60%_at_0%_0%,rgba(255,255,255,0.07),transparent_50%),linear-gradient(165deg,#10325c_0%,#0d2747_55%,#0a1e3a_100%)]">
                <style>{`
                  .login-card input::placeholder { color: rgb(148, 163, 184) !important; }
                  .login-card input[type="checkbox"]:checked {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' d='M3.8 8.4l2.9 2.9 5.5-5.6'/%3E%3C/svg%3E");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                  }
                `}</style>
                {/* Decorative paper rocket above the card corner */}
                <img
                  src={paperRocketImg}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-10 z-10 w-20 select-none drop-shadow-xl sm:-right-5 sm:-top-12 sm:w-24 lg:-right-6 lg:-top-14 lg:w-28"
                />
                {/* Logo */}
                <div className="flex justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-brand-green-400">
                    <ExploreIcon sx={{ fontSize: 32 }} />
                  </span>
                </div>

                <h2 className="mt-6 text-center text-2xl font-extrabold text-white sm:text-3xl">
                  Login
                </h2>
                <p className="mt-2 text-center text-sm sm:text-base text-slate-300">
                  Enter your credentials to access your account
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm sm:text-base font-semibold text-white">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        <EmailIcon sx={{ fontSize: 20 }} />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-slate-400 transition-all duration-250 hover:border-white/30 focus:border-brand-green-400 focus:outline-none focus:ring-2 focus:ring-brand-green-400/30"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm sm:text-base font-semibold text-white">
                      Password
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        <LockIcon sx={{ fontSize: 20 }} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] px-12 pr-12 text-sm sm:text-base text-white placeholder:text-slate-400 transition-all duration-250 hover:border-white/30 focus:border-brand-green-400 focus:outline-none focus:ring-2 focus:ring-brand-green-400/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-white"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <VisibilityIcon sx={{ fontSize: 20 }} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember / Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded border border-white/40 bg-white/5 appearance-none checked:border-brand-green-500 checked:bg-brand-green-500 focus:ring-brand-green-400/40"
                      />
                      <span className="text-sm sm:text-base text-slate-300 font-medium">
                        Remember Me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm sm:text-base font-semibold text-brand-green-400 transition-colors hover:text-brand-green-100"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm sm:text-base text-red-300">
                      {error}
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green-500 text-sm sm:text-base font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98] active:shadow-sm"
                  >
                    <LockIcon sx={{ fontSize: 18 }} />
                    Login
                  </button>
                </form>

                {/* OR Divider */}
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/15" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-400">
                    or
                  </span>
                  <div className="h-px flex-1 bg-white/15" />
                </div>

                {/* Google Button */}
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-navy-950/10 bg-white text-sm sm:text-base font-semibold text-navy-950 transition-all duration-250 hover:border-navy-950/20 hover:shadow-sm active:scale-[0.98]"
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
                  Continue with Google
                </button>

                {/* Create Account */}
                <p className="mt-7 text-center text-sm sm:text-base text-slate-300">
                  Don't have an account?{" "}
                  <Link
                    to="/create-account"
                    className="font-semibold text-brand-green-400 transition-colors hover:text-brand-green-100"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ─── TRUST BAR ─── */}
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
          <div className="grid grid-cols-1 gap-0 rounded-2xl border border-navy-950/5 bg-white shadow-[0_10px_40px_-12px_rgba(13,37,73,0.12)] sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`flex items-center gap-4 px-8 py-6 ${
                  i < TRUST_ITEMS.length - 1
                    ? "border-b border-navy-950/5 sm:border-b-0 sm:border-r lg:border-r"
                    : ""
                } ${i === 0 ? "rounded-tl-2xl sm:rounded-bl-2xl" : ""} ${
                  i === TRUST_ITEMS.length - 1 ? "rounded-br-2xl sm:rounded-r-2xl" : ""
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.color}`}
                >
                  <item.icon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <p className="text-sm sm:text-base font-bold text-navy-950">{item.title}</p>
                  <p className="text-xs sm:text-sm font-medium text-navy-900/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ─── NEWSLETTER ─── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-green-600 via-brand-green-600 to-brand-green-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-14 sm:flex-row lg:px-10 xl:pr-56">
          <div className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-brand-green-600">
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
              className="h-[50px] min-w-0 flex-1 rounded-lg border border-white/40 bg-white px-5 text-sm text-navy-950 placeholder:text-navy-900/40 transition-all duration-250 hover:border-white/70 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <button
              type="submit"
              className="h-[50px] shrink-0 rounded-lg bg-navy-950 px-8 text-sm font-semibold text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg active:scale-[0.98] active:translate-y-0 active:shadow-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Decorative newsletter illustration — stacked below on small screens */}
        <img
          src={contactImage}
          alt=""
          aria-hidden="true"
          className="mx-auto -mt-2 mb-10 w-44 select-none object-contain sm:w-52 xl:hidden"
        />
        {/* Decorative newsletter illustration — right side on large screens */}
        <img
          src={contactImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 right-6 hidden h-[calc(100%-24px)] w-auto select-none drop-shadow-xl 2xl:right-10 xl:block"
        />
      </section>
    </div>
  );
}
