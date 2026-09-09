import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/Shield";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LoginIcon from "@mui/icons-material/Login";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import WorkIcon from "@mui/icons-material/Work";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LoadingIcon from "@mui/icons-material/Autorenew";
import contactHeroImage from "../Assets/images/contact.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SUBJECTS = [
  "General Enquiry",
  "SmartFin Compass Assessment",
  "Account & Login",
  "Pricing",
  "Financial Dashboard",
  "AI Financial Report",
  "Technical Support",
  "Partnership",
  "Other",
];

const HELP_CARDS = [
  { icon: PersonIcon, color: "text-violet-500 bg-violet-50", title: "Getting Started", desc: "Learn how to create your profile and begin your financial assessment.", cta: "Get Started →", link: "/login" },
  { icon: DescriptionIcon, color: "text-sky-500 bg-sky-50", title: "Assessment Support", desc: "Need help completing your SmartFin Compass assessment?", cta: "Assessment Help →", link: "/how-it-works" },
  { icon: LoginIcon, color: "text-brand-green-600 bg-brand-green-50", title: "Account & Login", desc: "Questions about creating an account, logging in or verification?", cta: "Account Help →", link: "/login" },
  { icon: AttachMoneyIcon, color: "text-rose-500 bg-rose-50", title: "Pricing & Plans", desc: "Understand SmartFin Compass plans and available features.", cta: "View Pricing →", link: "/pricing" },
  { icon: InsightsIcon, color: "text-amber-accent bg-amber-50", title: "Financial Insights", desc: "Questions about your Financial Health Score, insights or roadmap?", cta: "Learn More →", link: "/features" },
  { icon: WorkIcon, color: "text-emerald-600 bg-emerald-50", title: "Partnerships", desc: "Interested in working with SmartFin Compass?", cta: "Contact Our Team →", link: "/contact" },
];

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Financial Guide", href: "/financial-guide" },
      { label: "FAQs", href: "/pricing" },
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
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  agree: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agree: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!form.name.trim()) {
      errs.name = "Full name is required.";
    } else if (/^\d+$/.test(form.name.trim())) {
      errs.name = "Name cannot be only numbers.";
    }

    if (!form.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (form.phone.trim() && !/^[+]?[\d\s-]{7,15}$/.test(form.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }

    if (!form.subject) {
      errs.subject = "Please select a subject.";
    }

    if (!form.message.trim()) {
      errs.message = "Message is required.";
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    // Simulate submission — replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", subject: "", message: "", agree: false });
    setErrors({});
    setIsSubmitted(false);
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`group/nav relative text-[15px] font-medium transition-colors duration-250 ${
                  link.label === "Contact" ? "text-navy-950" : "text-navy-900/70 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                  link.label === "Contact" ? "w-full" : "w-0 group-hover/nav:w-full"
                }`} />
              </Link>
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
              to="/login"
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
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-navy-900/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
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
                to="/login"
                className="w-full rounded-lg bg-brand-green-500 px-5 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-navy-950 text-white border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-green-500/15 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10 lg:py-28">
            <div className="animate-fade-in-up">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                Get in Touch
              </p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Let's Talk About Your{" "}
                <span className="text-brand-green-400">Financial Journey</span>
              </h1>
              <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-slate-300">
                Have a question about SmartFin Compass, your financial assessment, pricing or how the platform works? Our team is here to help.
              </p>
              <p className="mt-3 text-sm sm:text-base font-semibold text-slate-300">
                We'd love to hear from you.
              </p>
            </div>

            {/* Hero Visual Image */}
            <div className="relative flex items-center justify-center lg:justify-end animate-fade-in-up delay-200">
              <div className="relative w-full max-w-lg lg:max-w-xl rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 shadow-2xl">
                <img
                  src={contactHeroImage}
                  alt="SmartFin Compass Contact Us"
                  className="h-auto max-h-[520px] w-full object-contain drop-shadow-2xl rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONTACT INFO + FORM ─── */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              {/* Left — Contact Info */}
              <div>
                <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
                  Get in Touch
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-navy-900/75">
                  Reach out to the SmartFin Compass team and we'll help you find the right information.
                </p>

                <div className="mt-10 space-y-5">
                  <a
                    href="mailto:support@smartfincompass.com"
                    className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-soft card-hover-effect hover:border-brand-green-300"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition-transform duration-300 group-hover:scale-110">
                      <EmailIcon sx={{ fontSize: 24 }} />
                    </span>
                    <div>
                      <p className="text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">Email Us</p>
                      <p className="mt-0.5 text-base font-semibold text-brand-green-600">support@smartfincompass.com</p>
                      <p className="mt-1 text-sm font-medium text-navy-900/70">For general questions, support and assistance.</p>
                    </div>
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-soft card-hover-effect hover:border-brand-green-300"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600 transition-transform duration-300 group-hover:scale-110">
                      <CallIcon sx={{ fontSize: 24 }} />
                    </span>
                    <div>
                      <p className="text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">Call Us</p>
                      <p className="mt-0.5 text-base font-semibold text-brand-green-600">+91 98765 43210</p>
                      <p className="mt-1 text-sm font-medium text-navy-900/70">For assistance and general enquiries.</p>
                    </div>
                  </a>

                  <div className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-soft card-hover-effect">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-500 transition-transform duration-300 group-hover:scale-110">
                      <PlaceIcon sx={{ fontSize: 24 }} />
                    </span>
                    <div>
                      <p className="text-lg font-bold text-navy-950">Office</p>
                      <p className="mt-0.5 text-base font-semibold text-navy-950">Bangalore, Karnataka, India</p>
                      <p className="mt-1 text-sm font-medium text-navy-900/70">Our base for building smarter financial experiences.</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-soft card-hover-effect">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition-transform duration-300 group-hover:scale-110">
                      <HeadsetMicIcon sx={{ fontSize: 24 }} />
                    </span>
                    <div>
                      <p className="text-lg font-bold text-navy-950">Need Help?</p>
                      <p className="mt-0.5 text-base font-semibold text-navy-950">Support Team</p>
                      <p className="mt-1 text-sm font-medium text-navy-900/70">Have an issue with your assessment or account? Contact our support team for assistance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Contact Form */}
              <div className="rounded-3xl border border-navy-950/10 bg-white p-8 shadow-card sm:p-10 card-hover-effect">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-base text-navy-900/75">
                  Fill in the details below and tell us how we can help.
                </p>

                {isSubmitted ? (
                  <div className="mt-10 flex flex-col items-center text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-600">
                      <CheckCircleIcon sx={{ fontSize: 40 }} />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-navy-950">
                      Message Sent Successfully
                    </h3>
                    <p className="mt-3 max-w-sm text-sm sm:text-base leading-relaxed text-navy-900/75">
                      Thank you for contacting SmartFin Compass. Our team will review your message and get back to you.
                    </p>
                    <button
                      onClick={resetForm}
                      className="btn-hover-effect mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-green-500 px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-soft"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                    {/* Name */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Full Name <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={`h-12 w-full rounded-xl border bg-slate-50/60 px-4 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/45 transition-all duration-200 focus:border-brand-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
                          errors.name ? "border-rose-400" : "border-navy-950/15"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-500 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Email Address <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        className={`h-12 w-full rounded-xl border bg-slate-50/60 px-4 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/45 transition-all duration-200 focus:border-brand-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
                          errors.email ? "border-rose-400" : "border-navy-950/15"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-500 font-medium">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9+\-\s]/g, "");
                          handleChange("phone", val);
                        }}
                        placeholder="Enter your phone number"
                        className={`h-12 w-full rounded-xl border bg-slate-50/60 px-4 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/45 transition-all duration-200 focus:border-brand-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
                          errors.phone ? "border-rose-400" : "border-navy-950/15"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-500 font-medium">{errors.phone}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Subject <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        className={`h-12 w-full rounded-xl border bg-slate-50/60 px-4 text-sm sm:text-base text-navy-950 transition-all duration-200 focus:border-brand-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 ${
                          errors.subject ? "border-rose-400" : "border-navy-950/15"
                        } ${!form.subject ? "text-navy-900/45" : ""}`}
                      >
                        <option value="" disabled className="text-navy-900/60">What can we help you with?</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s} className="text-navy-950 font-medium">{s}</option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-500 font-medium">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Message <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tell us how we can help..."
                        rows={5}
                        className={`w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/45 transition-all duration-200 focus:border-brand-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 resize-none ${
                          errors.message ? "border-rose-400" : "border-navy-950/15"
                        }`}
                      />
                      <p className="mt-1.5 text-xs sm:text-sm font-medium text-navy-900/60">
                        Please provide as much detail as possible.
                      </p>
                      {errors.message && (
                        <p className="mt-1 text-xs sm:text-sm text-rose-500 font-medium">{errors.message}</p>
                      )}
                    </div>

                    {/* Agree */}
                    <label className="flex items-start gap-3 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => handleChange("agree", e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-navy-950/20 text-brand-green-500 focus:ring-brand-green-500/30"
                      />
                      <span className="text-sm sm:text-base font-medium text-navy-900/75">
                        I agree to be contacted regarding my enquiry.
                      </span>
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-hover-effect flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-brand-green-500 text-base font-semibold text-white shadow-[0_4px_16px_rgba(34,181,115,0.25)] hover:shadow-[0_6px_24px_rgba(34,181,115,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingIcon sx={{ fontSize: 20 }} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowForwardIcon sx={{ fontSize: 20 }} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: HOW CAN WE HELP? (DARK BLUE) ─── */}
        <section className="bg-navy-950 text-white py-24 border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green-400">
                How Can We Help?
              </p>
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-[40px]">
                Find the Right Support
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HELP_CARDS.map((c) => (
                <Link
                  key={c.title}
                  to={c.link}
                  className="group rounded-2xl border border-white/10 bg-navy-900/90 p-7 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-navy-900 hover:border-brand-green-500/50"
                >
                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.color.replace('bg-', 'bg-white/').replace('50', '15')}`}>
                    <c.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-green-400 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-300">
                    {c.desc}
                  </p>
                  <p className="mt-5 text-sm sm:text-base font-semibold text-brand-green-400 flex items-center gap-1 group-hover:gap-2 transition-all duration-250">
                    {c.cta}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: QUICK RESPONSE / FAQS (WHITE) ─── */}
        <section className="bg-white text-navy-950 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-3xl border border-navy-950/10 bg-slate-50/80 px-8 py-12 text-center sm:px-16 sm:py-16 shadow-soft card-hover-effect">
              <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600">
                <HelpOutlineIcon sx={{ fontSize: 28 }} />
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950">
                Looking for Quick Answers?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-navy-900/75">
                Check our frequently asked questions for answers to common questions about SmartFin Compass, assessments, accounts and financial insights.
              </p>
              <Link
                to="/pricing"
                className="btn-hover-effect mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-green-500 px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-soft"
              >
                Visit FAQs
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: SECURITY / PRIVACY (DARK BLUE) ─── */}
        <section className="bg-navy-950 text-white py-24 border-y border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-3xl border border-white/10 bg-navy-900/90 p-8 shadow-2xl sm:p-12">
              <div className="mx-auto max-w-2xl text-center">
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-500/15 text-brand-green-400">
                  <ShieldIcon sx={{ fontSize: 28 }} />
                </span>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Your Privacy Matters
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                  When you contact SmartFin Compass, your information should be handled responsibly. We are committed to protecting your personal information and maintaining a trustworthy experience.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-navy-950/80 p-6 sm:p-8 text-center transition-all duration-200 hover:border-white/20">
                  <LockIcon sx={{ fontSize: 32, color: "#22b573" }} />
                  <p className="mt-4 text-lg font-bold text-white">Private</p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                    Your contact information is treated with care.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-navy-950/80 p-6 sm:p-8 text-center transition-all duration-200 hover:border-white/20">
                  <VerifiedUserIcon sx={{ fontSize: 32, color: "#22b573" }} />
                  <p className="mt-4 text-lg font-bold text-white">Secure</p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                    We follow security-focused practices when handling information.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-navy-950/80 p-6 sm:p-8 text-center transition-all duration-200 hover:border-white/20">
                  <PrivacyTipIcon sx={{ fontSize: 32, color: "#22b573" }} />
                  <p className="mt-4 text-lg font-bold text-white">Responsible</p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                    We use your information only for appropriate communication and support.
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-base font-semibold text-brand-green-400 transition-colors duration-200 hover:text-brand-green-300"
                >
                  Read Privacy Policy
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FINAL CTA (WHITE) ─── */}
        <section className="bg-white text-navy-950 py-24">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
            <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl lg:text-5xl">
              Ready to Take the{" "}
              <span className="text-brand-green-600">First Step?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-navy-900/75">
              If you're ready to understand your financial health and build a clearer financial roadmap, start your SmartFin Compass assessment.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                to="/login"
                className="btn-hover-effect group/btn inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-10 py-4 text-base font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600"
              >
                Start Your Assessment
                <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-0.5" />
              </Link>
              <Link
                to="/how-it-works"
                className="btn-hover-effect group/btn inline-flex items-center gap-2.5 rounded-lg border border-navy-950/15 px-10 py-4 text-base font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600"
              >
                How It Works
              </Link>
            </div>

            <p className="mt-6 text-sm font-medium text-navy-900/60">
              20–25 minutes &bull; Guided assessment &bull; Personalized financial insights
            </p>
          </div>
        </section>
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
                AI-powered financial wellness platform that helps you make smarter financial decisions.
              </p>
              <div className="mt-6 flex gap-3.5">
                {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
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
                      <Link
                        to={l.href}
                        className="text-sm transition-colors duration-200 hover:text-brand-green-400"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-sm font-bold text-white">Contact Info</p>
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
            <p>&copy; 2025 SmartFin Compass. All rights reserved.</p>
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
