import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LayersIcon from "@mui/icons-material/Layers";
import InsightsIcon from "@mui/icons-material/Insights";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import MessageIcon from "@mui/icons-material/Message";
import LabelIcon from "@mui/icons-material/Label";
import LoadingIcon from "@mui/icons-material/Autorenew";
import contactHeroImage from "../Assets/images/contact.png";

// ─── Illustrations ───
import financialFutureImg from "../Assets/images/FinancialFuture.png";
import yourImg from "../Assets/images/your.png";
import builtAroundImg from "../Assets/images/BuiltAround.png";
import smarterWayImg from "../Assets/images/SmarterWay.png";
import leafImg from "../Assets/images/Leaf.png";

// ─── Reusable Section Transitions ───
import {
  HeroToFeaturesWave,
  FeaturesToHowItWorksWave,
  HowItWorksToBenefitsWave,
  BenefitsToTestimonialsWave,
  TestimonialsToFaqWave,
} from "../components/waves/SectionWaves";


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
  { icon: RocketLaunchIcon, color: "bg-brand-green-500", chip: "bg-brand-green-500/15 text-brand-green-400", title: "Getting Started", desc: "Learn how to create your profile and begin your financial assessment.", cta: "Get Started →", link: "/login" },
  { icon: DescriptionIcon, color: "bg-sky-500", chip: "bg-sky-500/15 text-sky-400", title: "Assessment Support", desc: "Need help completing your SmartFin Compass assessment?", cta: "Assessment Help →", link: "/how-it-works" },
  { icon: PersonIcon, color: "bg-orange-500", chip: "bg-rose-500/15 text-rose-400", title: "Account & Login", desc: "Questions about creating an account, logging in or verification?", cta: "Account Help →", link: "/login" },
  { icon: LayersIcon, color: "bg-amber-500", chip: "bg-brand-green-500/15 text-brand-green-400", title: "Pricing & Plans", desc: "Understand SmartFin Compass plans and available features.", cta: "View Pricing →", link: "/pricing" },
  { icon: InsightsIcon, color: "bg-violet-500", chip: "bg-violet-500/15 text-violet-400", title: "Financial Insights", desc: "Questions about your Financial Health Score, insights or roadmap?", cta: "Learn More →", link: "/features" },
  { icon: HandshakeIcon, color: "bg-purple-500", chip: "bg-sky-500/15 text-sky-400", title: "Partnerships", desc: "Interested in working with SmartFin Compass?", cta: "Contact Our Team →", link: "/contact" },
];


/* Decorative leaf accent used across the reference design */
function Leaf({ className = "" }: { className?: string }) {
  return (
    <img
      src={leafImg}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute z-0 select-none opacity-70 ${className}`}
    />
  );
}

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

  const fieldIconCls = "pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-navy-900/40";
  const fieldInputCls = "h-12 sm:h-13 w-full rounded-xl border bg-white pl-12 pr-4 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/45 transition-all duration-200 focus:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20";

  return (
    <div className="min-h-screen bg-white">

      <main>
        {/* ─── SECTION 1: HERO (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-navy-950 text-white">
          {/* Premium fintech backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-15" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[700px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-green-500/20 via-navy-900/40 to-transparent" />
          <div className="pointer-events-none absolute -left-40 top-1/4 z-0 h-96 w-96 rounded-full bg-brand-green-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-10 z-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-28 left-1/3 z-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
          <Leaf className="hidden left-3 top-24 w-14 opacity-50 lg:block xl:w-16" />
          <Leaf className="hidden right-4 bottom-32 w-14 rotate-90 opacity-50 lg:block xl:w-16" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:py-24">
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

            {/* Hero Visual Illustration — floating, no frame */}
            <div className="relative flex items-center justify-center lg:justify-end animate-fade-in-up delay-200">
              <div className="relative w-full max-w-lg lg:max-w-xl">
                <div className="pointer-events-none absolute inset-x-6 bottom-2 h-10 rounded-[100%] bg-black/30 blur-2xl" />
                <img
                  src={contactHeroImage}
                  alt="SmartFin Compass Contact Us"
                  className="relative h-auto max-h-[480px] w-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          <HeroToFeaturesWave />
        </section>

        {/* ─── SECTION 2: CONTACT INFO + FORM (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 right-0 z-0 h-[380px] w-[640px] rounded-full bg-brand-green-100/50 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-10 left-10 z-0 h-72 w-72 rounded-full bg-cyan-100/60 blur-[120px]" />
          <Leaf className="hidden left-4 top-6 w-16 opacity-60 lg:block xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
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
                    className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-soft card-hover-effect transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-500/40 hover:shadow-card"
                  >
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition-transform duration-300 group-hover:scale-110">
                      <EmailIcon sx={{ fontSize: 26 }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">Email Us</p>
                      <p className="mt-0.5 text-base font-semibold text-brand-green-600">support@smartfincompass.com</p>
                      <p className="mt-1 text-sm font-medium text-navy-900/70">For general questions, support and assistance.</p>
                    </div>
                    <ChevronRightIcon
                      sx={{ fontSize: 22 }}
                      className="mt-2 shrink-0 text-navy-900/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-green-500"
                    />
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-soft card-hover-effect transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-500/40 hover:shadow-card"
                  >
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-600 transition-transform duration-300 group-hover:scale-110">
                      <CallIcon sx={{ fontSize: 26 }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-bold text-navy-950 group-hover:text-brand-green-600 transition-colors duration-300">Call Us</p>
                      <p className="mt-0.5 text-base font-semibold text-brand-green-600">+91 98765 43210</p>
                      <p className="mt-1 text-sm font-medium text-navy-900/70">For assistance and general enquiries.</p>
                    </div>
                    <ChevronRightIcon
                      sx={{ fontSize: 22 }}
                      className="mt-2 shrink-0 text-navy-900/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-green-500"
                    />
                  </a>

                  <div className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-soft card-hover-effect transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-500/40 hover:shadow-card">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-500 transition-transform duration-300 group-hover:scale-110">
                      <PlaceIcon sx={{ fontSize: 26 }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-bold text-navy-950">Office</p>
                      <p className="mt-0.5 text-base font-semibold text-navy-950">Bangalore, Karnataka, India</p>
                      <p className="mt-1 text-sm font-medium text-navy-900/70">Our base for building smarter financial experiences.</p>
                    </div>
                    <ChevronRightIcon
                      sx={{ fontSize: 22 }}
                      className="mt-2 shrink-0 text-navy-900/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-green-500"
                    />
                  </div>

                  <div className="group flex items-start gap-4 rounded-2xl border border-navy-950/10 bg-white p-6 shadow-soft card-hover-effect transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-500/40 hover:shadow-card">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition-transform duration-300 group-hover:scale-110">
                      <HeadsetMicIcon sx={{ fontSize: 26 }} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-lg font-bold text-navy-950">Need Help?</p>
                      <p className="mt-0.5 text-base font-semibold text-navy-950">Support Team</p>
                      <p className="mt-1 text-sm font-medium text-navy-900/70">Have an issue with your assessment or account? Contact our support team for assistance.</p>
                    </div>
                    <ChevronRightIcon
                      sx={{ fontSize: 22 }}
                      className="mt-2 shrink-0 text-navy-900/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right — Contact Form */}
              <div className="relative rounded-3xl border border-navy-950/10 bg-white p-7 shadow-card sm:p-9">
                {/* Decorative paper plane */}
                <SendIcon
                  sx={{ fontSize: 44 }}
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 right-6 hidden rotate-[20deg] text-sky-400/70 sm:block"
                />

                <div className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.3)]">
                    <SendIcon sx={{ fontSize: 22 }} />
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                    Send Us a Message
                  </h2>
                </div>
                <p className="mt-3 text-base text-navy-900/75">
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
                  <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
                    {/* Name */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Full Name <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <PersonIcon sx={{ fontSize: 20 }} className={fieldIconCls} />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          className={`${fieldInputCls} ${
                            errors.name ? "border-rose-400" : "border-navy-950/15"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-500 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Email Address <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <EmailIcon sx={{ fontSize: 20 }} className={fieldIconCls} />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="Enter your email address"
                          className={`${fieldInputCls} ${
                            errors.email ? "border-rose-400" : "border-navy-950/15"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-500 font-medium">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Phone Number
                      </label>
                      <div className="relative">
                        <CallIcon sx={{ fontSize: 20 }} className={fieldIconCls} />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9+\-\s]/g, "");
                            handleChange("phone", val);
                          }}
                          placeholder="Enter your phone number"
                          className={`${fieldInputCls} ${
                            errors.phone ? "border-rose-400" : "border-navy-950/15"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-500 font-medium">{errors.phone}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Subject <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <LabelIcon sx={{ fontSize: 20 }} className={fieldIconCls} />
                        <select
                          value={form.subject}
                          onChange={(e) => handleChange("subject", e.target.value)}
                          className={`${fieldInputCls} appearance-none pr-10 ${
                            errors.subject ? "border-rose-400" : "border-navy-950/15"
                          } ${!form.subject ? "text-navy-900/45" : ""}`}
                        >
                          <option value="" disabled className="text-navy-900/60">What can we help you with?</option>
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s} className="text-navy-950 font-medium">{s}</option>
                          ))}
                        </select>
                        <svg
                          aria-hidden="true"
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/50"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {errors.subject && (
                        <p className="mt-1.5 text-xs sm:text-sm text-rose-500 font-medium">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-2 block text-sm sm:text-base font-semibold text-navy-950">
                        Message <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <MessageIcon sx={{ fontSize: 20 }} className="pointer-events-none absolute left-4 top-5 z-10 text-navy-900/40" />
                        <textarea
                          value={form.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder="Tell us how we can help..."
                          rows={5}
                          className={`w-full rounded-xl border bg-white pl-12 pr-4 py-3 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/45 transition-all duration-200 focus:border-brand-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 resize-none ${
                            errors.message ? "border-rose-400" : "border-navy-950/15"
                          }`}
                        />
                      </div>
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
                          <SendIcon sx={{ fontSize: 19 }} />
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

          {/* Multi-layer Wave Transition */}
          <FeaturesToHowItWorksWave />
        </section>

        {/* ─── SECTION 3: HOW CAN WE HELP? (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute left-1/4 top-10 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 z-0 h-80 w-80 rounded-full bg-[#00E676]/10 blur-[120px]" />
          <Leaf className="hidden right-4 top-8 w-16 opacity-50 xl:block 2xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
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
                  className="group relative rounded-2xl border border-white/15 bg-navy-900/80 p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-green-400/50 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.8)] sm:p-8"
                >
                  {/* Decorative corner arrow */}
                  <ArrowForwardIcon
                    sx={{ fontSize: 18 }}
                    className="absolute right-6 top-6 -rotate-45 text-white/25 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-white/60"
                  />

                  <span className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${c.color}`}>
                    <c.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-green-400 transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-300">
                    {c.desc}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-sm sm:text-base font-semibold text-brand-green-400 flex items-center gap-1 group-hover:gap-2 transition-all duration-250">
                      {c.cta}
                    </p>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 group-hover:scale-110 ${c.chip}`}>
                      <ArrowForwardIcon sx={{ fontSize: 16 }} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <HowItWorksToBenefitsWave />
          </div>
        </section>

        {/* ─── SECTION 4: QUICK RESPONSE / FAQS (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-24">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-10 right-10 z-0 h-72 w-72 rounded-full bg-brand-green-500/5 blur-[120px]" />
          <Leaf className="hidden left-4 top-8 w-16 opacity-60 md:block xl:w-20" />
          <Leaf className="hidden right-5 bottom-8 w-16 rotate-90 opacity-60 lg:block xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
              {/* FinancialFuture illustration — left */}
              <div className="flex justify-center lg:justify-start">
                <img
                  src={financialFutureImg}
                  alt="SmartFin Compass financial future illustration"
                  draggable={false}
                  className="w-64 max-w-full select-none drop-shadow-xl sm:w-80 lg:w-[380px] xl:w-[430px]"
                />
              </div>

              {/* Content — centre/right */}
              <div className="mx-auto max-w-xl text-center">
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-600 shadow-sm">
                  <HelpOutlineIcon sx={{ fontSize: 28 }} />
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950">
                  Looking for Quick Answers?
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-navy-900/75">
                  Check our frequently asked questions for answers to common questions about SmartFin Compass, assessments, accounts and financial insights.
                </p>
                <Link
                  to="/pricing"
                  className="btn-hover-effect group/faq mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-green-500 px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md"
                >
                  Visit FAQs
                  <ArrowForwardIcon sx={{ fontSize: 18 }} className="transition-transform duration-250 group-hover/faq:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Multi-layer Wave Transition */}
          <BenefitsToTestimonialsWave />
        </section>

        {/* ─── SECTION 5: SECURITY / PRIVACY (DARK BLUE) ─── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1F3D] via-[#0d2a4e] to-[#0A1F3D] py-16 text-white lg:py-24">
          {/* Dark Tech Grid & Glowing Orbs Backdrop */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-dark opacity-20" />
          <div className="pointer-events-none absolute -top-24 left-1/4 z-0 h-80 w-80 rounded-full bg-brand-green-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 z-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <Leaf className="hidden left-4 top-6 w-16 opacity-50 xl:block 2xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
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

              {/* your.png — privacy illustration on the right */}
              <div className="flex justify-center lg:justify-end">
                <img
                  src={yourImg}
                  alt="Financial information security illustration"
                  draggable={false}
                  className="w-56 max-w-full select-none drop-shadow-2xl sm:w-72 lg:w-80 xl:w-96"
                />
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-navy-900/80 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.8)]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.3)]">
                  <LockIcon sx={{ fontSize: 22 }} />
                </span>
                <p className="mt-4 text-lg font-bold text-white">Private</p>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                  Your contact information is treated with care.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-navy-900/80 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.8)]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.3)]">
                  <VerifiedUserIcon sx={{ fontSize: 22 }} />
                </span>
                <p className="mt-4 text-lg font-bold text-white">Secure</p>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                  We follow security-focused practices when handling information.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-navy-900/80 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green-400/50 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.8)]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-[0_4px_16px_rgba(34,181,115,0.3)]">
                  <PrivacyTipIcon sx={{ fontSize: 22 }} />
                </span>
                <p className="mt-4 text-lg font-bold text-white">Responsible</p>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                  We use your information only for appropriate communication and support.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <a
                href="#"
                className="group/privacy inline-flex items-center gap-2 text-base font-semibold text-brand-green-400 transition-colors duration-200 hover:text-brand-green-300"
              >
                Read Privacy Policy
                <ArrowForwardIcon sx={{ fontSize: 18 }} className="transition-transform duration-250 group-hover/privacy:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Reusable Section Transition */}
          <div className="relative z-10 mt-10 sm:mt-14">
            <TestimonialsToFaqWave />
          </div>
        </section>

        {/* ─── SECTION 6: FINAL CTA (WHITE) ─── */}
        <section className="relative overflow-hidden bg-white py-16 text-navy-950 lg:py-20">
          {/* Soft tinted atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-tech-grid-light opacity-25" />
          <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-brand-green-100/50 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-72 w-72 rounded-full bg-cyan-100/60 blur-[120px]" />
          <Leaf className="hidden left-5 top-5 w-16 opacity-60 lg:block xl:w-20" />
          <Leaf className="hidden right-5 bottom-5 w-16 rotate-90 opacity-60 xl:block 2xl:w-20" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10">
              {/* BuiltAround illustration — left */}
              <img
                src={builtAroundImg}
                alt="SmartFin Compass journey illustration"
                draggable={false}
                className="hidden w-44 max-w-full select-none drop-shadow-xl lg:block xl:w-52 2xl:w-56"
              />

              {/* Centre CTA content */}
              <div className="min-w-0 text-center">
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

              {/* SmarterWay illustration — right */}
              <img
                src={smarterWayImg}
                alt="SmartFin Compass smarter way illustration"
                draggable={false}
                className="hidden w-28 max-w-full select-none drop-shadow-xl lg:block xl:w-32 2xl:w-36"
              />
            </div>

            {/* Stacked CTA illustrations (mobile/tablet) */}
            <div className="mt-10 flex items-center justify-center gap-10 lg:hidden">
              <img
                src={builtAroundImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="w-32 select-none drop-shadow-lg sm:w-40"
              />
              <img
                src={smarterWayImg}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="w-24 select-none drop-shadow-lg sm:w-28"
              />
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
