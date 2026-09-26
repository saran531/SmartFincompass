import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShieldIcon from "@mui/icons-material/Shield";
import InsightsIcon from "@mui/icons-material/Insights";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SendIcon from "@mui/icons-material/Send";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import createAccountImage from "../Assets/images/CreateAccount.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const BENEFITS = [
  {
    icon: ShieldIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Secure & Private",
    desc: "Bank-level encryption to keep your data safe and secure.",
  },
  {
    icon: InsightsIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Personalized Insights",
    desc: "AI-powered analysis and recommendations tailored to your goals.",
  },
  {
    icon: EmojiEventsIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Achieve Your Goals",
    desc: "Smart roadmap to help you plan, save and grow your wealth.",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Know Your Risk", href: "/know-your-risk" },
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

export default function CreateAccount() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <main>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            {/* LEFT SIDE — Marketing Content */}
            <div className="flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-green-600">
                Join SmartFin Compass
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-navy-950 sm:text-5xl">
                Create Your Account
                <br />
                & Take Control of
                <br />
                <span className="text-brand-green-600">Your Financial Future</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-navy-900/55">
                Start your journey to financial clarity and security with
                AI-powered insights personalized just for you.
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
                      <p className="text-base font-bold text-navy-950">
                        {b.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-navy-900/55">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Illustration */}
              <div className="mt-8 flex justify-center lg:justify-start">
                <img
                  src={createAccountImage}
                  alt="Create Account illustration"
                  className="h-auto max-h-[420px] w-full max-w-[520px] object-contain"
                />
              </div>
            </div>

            {/* RIGHT SIDE — Create Account Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[440px] rounded-3xl border border-navy-950/5 bg-white p-8 shadow-[0_8px_40px_rgba(13,37,73,0.08)] sm:p-10">
                {/* Logo */}
                <div className="flex justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green-50 text-brand-green-600">
                    <ExploreIcon sx={{ fontSize: 32 }} />
                  </span>
                </div>

                <h2 className="mt-6 text-center text-2xl font-extrabold text-navy-950">
                  Create Account
                </h2>
                <p className="mt-2 text-center text-sm text-navy-900/55">
                  Fill in your details to get started
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                        className="h-12 w-full rounded-xl border border-navy-950/10 bg-white pl-12 pr-4 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
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
                        className="h-12 w-full rounded-xl border border-navy-950/10 bg-white pl-12 pr-4 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
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
                        className="h-12 w-full rounded-xl border border-navy-950/10 bg-white pl-12 pr-4 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
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
                        className="h-12 w-full rounded-xl border border-navy-950/10 bg-white px-12 pr-12 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
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
                        className="h-12 w-full rounded-xl border border-navy-950/10 bg-white px-12 pr-12 text-sm text-navy-950 placeholder:text-navy-900/35 transition-all duration-250 hover:border-navy-950/20 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20"
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
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-green-500 text-[15px] font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md active:scale-[0.98] active:shadow-sm"
                  >
                    <PersonAddIcon sx={{ fontSize: 18 }} />
                    Create Account
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
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-navy-950/10 bg-white text-[15px] font-semibold text-navy-950 transition-all duration-250 hover:border-navy-950/20 hover:shadow-sm active:scale-[0.98]"
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
        </section>
      </main>

      {/* ─── NEWSLETTER ─── */}
      <section className="bg-brand-green-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-14 sm:flex-row lg:px-10">
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
      </section>

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
