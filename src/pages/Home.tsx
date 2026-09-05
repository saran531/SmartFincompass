import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircleOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MapIcon from "@mui/icons-material/Map";
import InsightsIcon from "@mui/icons-material/Insights";
import ShieldIcon from "@mui/icons-material/Shield";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SCORE_BREAKDOWN = [
  { label: "Income Stability", value: 85 },
  { label: "Savings Rate", value: 72 },
  { label: "Debt Management", value: 65 },
  { label: "Investment Readiness", value: 88 },
  { label: "Emergency Fund", value: 75 },
];

const ROADMAP = [
  {
    icon: SavingsIcon,
    color: "text-sky-500 bg-sky-50",
    title: "Build Emergency Fund",
    time: "0-3 Months",
  },
  {
    icon: CreditCardOffIcon,
    color: "text-rose-500 bg-rose-50",
    title: "Clear High-Interest Debt",
    time: "3-6 Months",
  },
  {
    icon: TrendingUpIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Invest for Growth",
    time: "6-12 Months",
  },
  {
    icon: AccountBalanceIcon,
    color: "text-violet-500 bg-violet-50",
    title: "Wealth Building",
    time: "12+ Months",
  },
];

const FEATURES = [
  {
    icon: PsychologyIcon,
    color: "text-violet-500 bg-violet-50",
    title: "AI Financial Analysis",
    desc: "Advanced AI analyzes your income, expenses, debts, and investments.",
  },
  {
    icon: MapIcon,
    color: "text-rose-500 bg-rose-50",
    title: "Personalized Roadmap",
    desc: "Get a custom financial plan tailored to your goals and risk profile.",
  },
  {
    icon: InsightsIcon,
    color: "text-brand-green-600 bg-brand-green-50",
    title: "Real-time Tracking",
    desc: "Track your progress with interactive dashboards and insights.",
  },
  {
    icon: ShieldIcon,
    color: "text-sky-500 bg-sky-50",
    title: "Risk Assessment",
    desc: "Understand your financial risks and get expert recommendations.",
  },
  {
    icon: NotificationsActiveIcon,
    color: "text-amber-accent bg-amber-50",
    title: "Smart Alerts",
    desc: "Receive timely alerts and reminders to stay on track with your goals.",
  },
];

const STEPS = [
  {
    icon: PersonIcon,
    step: 1,
    title: "Create Your Profile",
    desc: "Sign up and share your basic financial information securely.",
  },
  {
    icon: DescriptionIcon,
    step: 2,
    title: "AI Analysis",
    desc: "Our AI analyzes your financial health across 100+ data points.",
  },
  {
    icon: ExploreIcon,
    step: 3,
    title: "Get Your Roadmap",
    desc: "Receive a personalized financial roadmap with actionable steps.",
  },
  {
    icon: RocketLaunchIcon,
    step: 4,
    title: "Track & Grow",
    desc: "Track your progress and achieve your financial goals.",
  },
];

const BENEFITS = [
  {
    icon: VerifiedUserIcon,
    highlight: "100%",
    tag: "Secure & Private",
    desc: "Bank-level security to protect your data",
  },
  {
    icon: AutoGraphIcon,
    highlight: "AI",
    tag: "Powered Insights",
    desc: "Advanced AI & machine learning algorithms",
  },
  {
    icon: PersonPinIcon,
    highlight: "Personalized",
    tag: "Just for You",
    desc: "Tailored recommendations based on your goals",
  },
  {
    icon: SavingsIcon,
    highlight: "Save More",
    tag: "Build Wealth",
    desc: "Optimized strategies to maximize your savings",
  },
  {
    icon: EmojiEventsIcon,
    highlight: "Achieve Goals",
    tag: "Faster",
    desc: "Structured roadmap to financial freedom",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SmartFin Compass gave me clarity about my finances like never before. I'm now on track to achieve my dreams!",
    name: "Rohit Sharma",
    role: "IT Professional",
    color: "#1c3f73",
  },
  {
    quote:
      "The personalized roadmap is incredible. I was able to clear my debt and start investing with confidence.",
    name: "Priya Mehta",
    role: "Business Consultant",
    color: "#e07a9e",
  },
  {
    quote:
      "An amazing platform for anyone serious about their financial future. Highly recommended!",
    name: "Amit Verma",
    role: "Marketing Manager",
    color: "#22b573",
  },
];

const FAQS = [
  {
    q: "Is my financial data secure?",
    a: "Yes, we use bank-level encryption and security protocols to ensure your data is 100% safe and private.",
  },
  {
    q: "How accurate is the AI analysis?",
    a: "Our AI analyzes over 100 data points using advanced machine learning algorithms to provide highly accurate financial insights and recommendations.",
  },
  {
    q: "Can I update my information later?",
    a: "Yes, you can update your financial information at any time from your dashboard. Changes will be reflected in your analysis instantly.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes, we offer a free trial so you can explore SmartFin Compass and see how it can help you before committing.",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
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
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

function ScoreGauge({ score }: { score: number }) {
  const radius = 70;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative mx-auto flex h-[150px] w-[200px] items-end justify-center">
      <svg viewBox="0 0 180 100" className="h-full w-full overflow-visible">
        <path
          d="M 20 100 A 70 70 0 0 1 160 100"
          fill="none"
          stroke="#eef1f6"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 70 70 0 0 1 160 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5a623" />
            <stop offset="55%" stopColor="#f5a623" />
            <stop offset="100%" stopColor="#22b573" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-5xl font-extrabold text-navy-950">{score}</span>
        <span className="mt-0.5 text-sm font-semibold text-brand-green-600">
          Good
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialActive, setTestimonialActive] = useState(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);
  const [activeRoadmap, setActiveRoadmap] = useState<number | null>(null);

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
              link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`group/nav relative text-[15px] font-medium transition-colors duration-250 ${
                    i === 0 ? "text-navy-950" : "text-navy-900/70 hover:text-brand-green-600"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-brand-green-500 transition-all duration-300 ${
                    i === 0 ? "w-full" : "w-0 group-hover/nav:w-full"
                  }`} />
                </Link>
              ) : (
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
              )
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
        <section id="home" className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-gradient-to-br from-brand-green-50 via-white to-sky-50" />

          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10 lg:py-28">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-navy-950">
                Know Your{" "}
                <span className="text-brand-green-600">Financial Readiness</span>{" "}
                Before You Invest
              </h1>
              <p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-navy-900/70">
                AI-powered financial wellness platform that analyzes your
                complete financial profile and generates a personalized
                financial roadmap.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/login"
                  className="group/btn inline-flex items-center gap-2.5 rounded-lg bg-brand-green-500 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-soft transition-all duration-250 hover:bg-brand-green-600 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] active:shadow-sm active:translate-y-0"
                >
                  Start Assessment
                  <ArrowForwardIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:translate-x-0.5" />
                </Link>
                <button className="group/btn inline-flex items-center gap-2.5 rounded-lg border border-navy-950/15 px-7 py-3.5 text-sm sm:text-base font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98] active:border-brand-green-600">
                  <PlayCircleIcon fontSize="small" className="transition-transform duration-250 group-hover/btn:scale-110" />
                  Watch Demo
                </button>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["#f5a623", "#22b573", "#1c3f73"].map((c, i) => (
                    <span
                      key={i}
                      className="h-11 w-11 rounded-full border-2 border-white"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-950">
                    Trusted by 10,000+ users
                  </p>
                  <div className="flex items-center gap-1 text-amber-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: 16 }} />
                    ))}
                    <span className="ml-1 text-xs sm:text-sm font-medium text-navy-900/60">
                      4.8/5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <AutoAwesomeIcon className="absolute -top-4 right-8 text-brand-green-400" sx={{ fontSize: 28 }} />
              <div className="rounded-3xl border border-navy-950/5 bg-white p-7 shadow-card sm:p-8">
                <p className="text-base font-bold text-navy-950">
                  Your Financial Health Score
                </p>

                <div className="mt-5 grid gap-7 sm:grid-cols-2">
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50/60 py-5">
                    <ScoreGauge score={78} />
                    <span className="mt-2 text-sm font-medium text-navy-900/60">
                      Keep it up!
                    </span>
                  </div>

                  <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-navy-900/65">
                      Score Breakdown
                    </p>
                    <div className="space-y-3">
                      {SCORE_BREAKDOWN.map((item) => (
                        <div key={item.label}>
                          <div className="mb-1.5 flex items-center justify-between text-xs sm:text-sm font-medium text-navy-900/70">
                            <span>{item.label}</span>
                            <span className="font-bold text-navy-950">
                              {item.value}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-amber-accent to-brand-green-500"
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 border-t border-navy-950/5 pt-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-navy-900/65">
                    Your Personalized Roadmap
                  </p>
                  <p className="mb-4 text-xs font-semibold text-navy-900/60">
                    Recommended Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {ROADMAP.map((item, i) => {
                      const isActive = activeRoadmap === i;
                      return (
                        <button
                          key={item.title}
                          onClick={() => setActiveRoadmap(isActive ? null : i)}
                          className={`group/roadmap text-left rounded-xl border p-3 transition-all duration-300 ${
                            isActive
                              ? "border-brand-green-400 bg-brand-green-50/50 shadow-[0_2px_12px_rgba(34,181,115,0.12)]"
                              : "border-navy-950/8 bg-slate-50/50 hover:border-brand-green-200/60 hover:shadow-[0_4px_16px_rgba(13,37,73,0.1)]"
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span
                              className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                                isActive
                                  ? "scale-110 bg-brand-green-100 text-brand-green-700"
                                  : "group-hover/roadmap:scale-105 " + item.color
                              }`}
                            >
                              <item.icon sx={{ fontSize: 16 }} />
                            </span>
                            <div className="min-w-0">
                              <p className={`text-xs sm:text-sm font-bold leading-snug transition-colors duration-300 ${
                                isActive ? "text-brand-green-700" : "text-navy-950"
                              }`}>
                                {item.title}
                              </p>
                              <p className={`mt-0.5 text-xs font-medium transition-colors duration-300 ${
                                isActive ? "text-brand-green-600/80" : "text-navy-900/60"
                              }`}>
                                {item.time}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-navy-950/5 pt-6">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-navy-900/60">
                      Potential Wealth in 5 Years
                    </p>
                    <p className="text-xl sm:text-2xl font-extrabold text-brand-green-600">
                      ₹28,75,000
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-medium text-navy-900/60">
                      Monthly Savings Potential
                    </p>
                    <p className="text-xl sm:text-2xl font-extrabold text-brand-green-600">
                      ₹12,500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow text-xs sm:text-sm font-bold uppercase text-brand-green-600">
              Features
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
              Everything You Need for Financial Wellness
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {FEATURES.map((f, i) => {
              const isActive = activeFeature === i;
              return (
                <button
                  key={f.title}
                  onClick={() => setActiveFeature(isActive ? null : i)}
                  className={`group text-left rounded-2xl border p-6 sm:p-7 shadow-soft transition-all duration-300 ${
                    isActive
                      ? "border-brand-green-400 bg-brand-green-50/30 shadow-[0_4px_24px_rgba(34,181,115,0.12)]"
                      : "border-navy-950/5 bg-white hover:border-brand-green-200 hover:shadow-card"
                  }`}
                >
                  <span
                    className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "scale-110 bg-brand-green-100 text-brand-green-700"
                        : `group-hover:scale-110 ${f.color}`
                    }`}
                  >
                    <f.icon sx={{ fontSize: 28 }} />
                  </span>
                  <h3 className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
                    isActive ? "text-brand-green-700" : "text-navy-950 group-hover:text-brand-green-600"
                  }`}>
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-navy-900/70">
                    {f.desc}
                  </p>
                  {isActive && (
                    <span className="mt-4 inline-block h-1 w-8 rounded-full bg-brand-green-500" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section
          id="how-it-works"
          className="relative overflow-hidden bg-navy-950 py-28"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-eyebrow text-xs sm:text-sm font-bold uppercase text-brand-green-400">
                How It Works
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white">
                Your Journey to Financial Clarity in 4 Simple Steps
              </h2>
            </div>

            <div className="relative mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="absolute left-0 right-0 top-10 hidden border-t-2 border-dashed border-white/15 lg:block" />
              {STEPS.map((s) => (
                <div
                  key={s.step}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-full bg-navy-800 ring-[6px] ring-navy-950 shadow-[0_0_30px_rgba(34,181,115,0.15)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(34,181,115,0.25)]">
                    <s.icon className="text-white" sx={{ fontSize: 28 }} />
                    <span className="absolute -bottom-2 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-green-500 text-xs font-bold text-white ring-2 ring-navy-950">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg sm:text-xl font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 max-w-[260px] text-sm sm:text-base leading-relaxed text-white/75">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ─── */}
        <section className="bg-slate-50/60 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-eyebrow text-xs sm:text-sm font-bold uppercase text-brand-green-600">
                Benefits
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
                Why Choose SmartFin Compass?
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {BENEFITS.map((b, i) => {
                const isActive = activeBenefit === i;
                return (
                  <button
                    key={b.tag}
                    onClick={() => setActiveBenefit(isActive ? null : i)}
                    className={`group text-center rounded-2xl border p-6 sm:p-7 shadow-soft transition-all duration-300 ${
                      isActive
                        ? "border-brand-green-400 bg-brand-green-50/30 shadow-[0_4px_24px_rgba(34,181,115,0.12)]"
                        : "border-navy-950/5 bg-white hover:border-brand-green-200 hover:shadow-card"
                    }`}
                  >
                    <span className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? "scale-110 bg-brand-green-100 text-brand-green-700 ring-2 ring-brand-green-200"
                        : "bg-brand-green-50 text-brand-green-600 group-hover:scale-110"
                    }`}>
                      <b.icon />
                    </span>
                    <p className={`text-lg font-extrabold transition-colors duration-300 ${
                      isActive ? "text-brand-green-700" : "text-navy-950"
                    }`}>
                      {b.highlight}
                    </p>
                    <p className="text-base font-bold text-brand-green-600">
                      {b.tag}
                    </p>
                    <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-navy-900/70">
                      {b.desc}
                    </p>
                    {isActive && (
                      <span className="mt-3 inline-block h-1 w-8 rounded-full bg-brand-green-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow text-xs sm:text-sm font-bold uppercase text-brand-green-600">
              Testimonials
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy-950">
              What Our Users Say
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => {
              const isActive = activeTestimonial === i;
              return (
                <button
                  key={t.name}
                  onClick={() => setActiveTestimonial(isActive ? null : i)}
                  className={`group text-left rounded-2xl border p-7 shadow-soft transition-all duration-300 ${
                    isActive
                      ? "border-brand-green-400 bg-brand-green-50/20 shadow-[0_4px_24px_rgba(34,181,115,0.1)]"
                      : "border-navy-950/5 bg-white hover:border-brand-green-200 hover:shadow-card"
                  }`}
                >
                  <FormatQuoteIcon
                    sx={{ fontSize: 36 }}
                    className={`transition-all duration-300 ${
                      isActive ? "text-brand-green-600 scale-110" : "text-brand-green-500 group-hover:scale-105"
                    }`}
                  />
                  <p className="mt-3 text-base sm:text-lg leading-relaxed text-navy-900/80">
                    {t.quote}
                  </p>
                  <div className="mt-7 flex items-center gap-3.5">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full text-sm font-bold text-white transition-all duration-300 ${
                        isActive ? "ring-2 ring-brand-green-400 ring-offset-2 scale-105" : "group-hover:scale-105"
                      }`}
                      style={{ backgroundColor: t.color }}
                    >
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className={`text-base font-bold transition-colors duration-300 ${
                        isActive ? "text-brand-green-700" : "text-navy-950"
                      }`}>
                        {t.name}
                      </p>
                      <p className="text-xs sm:text-sm text-navy-900/60">{t.role}</p>
                    </div>
                  </div>
                  <div className="mt-3.5 flex gap-0.5 text-amber-accent">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <StarIcon key={j} sx={{ fontSize: 16 }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center gap-2.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setTestimonialActive(i);
                  setActiveTestimonial(i);
                }}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  testimonialActive === i
                    ? "w-7 bg-brand-green-500"
                    : "w-2.5 bg-navy-950/15 hover:bg-navy-950/25"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ─── FAQ + CONTACT ─── */}
        <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <p className="section-eyebrow text-xs sm:text-sm font-bold uppercase text-brand-green-600">
                FAQs
              </p>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950">
                Frequently Asked Questions
              </h2>

              <div className="mt-8 space-y-3">
                {FAQS.map((f, i) => {
                  const isOpen = faqOpenIndex === i;
                  return (
                    <div
                      key={f.q}
                      className={`group/faq overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                        isOpen
                          ? "border-brand-green-400 bg-brand-green-50/20 shadow-[0_4px_20px_rgba(34,181,115,0.1)]"
                          : "border-navy-950/5 shadow-soft hover:border-brand-green-200 hover:shadow-[0_4px_16px_rgba(13,37,73,0.08)]"
                      }`}
                    >
                      <button
                        onClick={() => setFaqOpenIndex(isOpen ? -1 : i)}
                        className="flex w-full items-center gap-3 px-6 py-5 text-left text-base sm:text-lg font-semibold"
                      >
                        <span className={`flex-1 transition-colors duration-300 ${
                          isOpen ? "text-brand-green-700" : "text-navy-950 group-hover/faq:text-navy-950"
                        }`}>
                          {f.q}
                        </span>
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen
                              ? "rotate-45 bg-brand-green-500 text-white"
                              : "bg-slate-100 text-navy-900/40 group-hover/faq:bg-brand-green-50 group-hover/faq:text-brand-green-600"
                          }`}
                        >
                          <AddIcon sx={{ fontSize: 16 }} />
                        </span>
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "max-h-48 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {f.a && (
                          <p className="px-6 pb-5 pt-0 text-sm sm:text-base leading-relaxed text-navy-900/70">
                            {f.a}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50/60 p-9">
              <p className="section-eyebrow text-xs sm:text-sm font-bold uppercase text-brand-green-600">
                Contact Us
              </p>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950">
                Get in Touch
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green-50 text-brand-green-600">
                    <EmailIcon fontSize="small" />
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-navy-900/60">Email Us</p>
                    <p className="text-sm sm:text-base font-semibold text-navy-950">
                      support@smartfincompass.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green-50 text-brand-green-600">
                    <CallIcon fontSize="small" />
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-navy-900/60">Call Us</p>
                    <p className="text-sm sm:text-base font-semibold text-navy-950">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green-50 text-brand-green-600">
                    <PlaceIcon fontSize="small" />
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-navy-900/60">Office</p>
                    <p className="text-sm sm:text-base font-semibold text-navy-950">
                      Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-10 flex justify-end">
                <HeadsetMicIcon
                  sx={{ fontSize: 72 }}
                  className="text-navy-800/60"
                />
                <span className="absolute right-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-white text-brand-green-600 shadow-soft">
                  <ChatBubbleIcon sx={{ fontSize: 18 }} />
                </span>
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
              <p className="text-xl sm:text-2xl font-bold text-white">
                Stay Updated with Financial Insights
              </p>
              <p className="mt-1 text-sm sm:text-base text-white/85">
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
              className="h-[50px] min-w-0 flex-1 rounded-lg border border-white/40 bg-white px-5 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/50 transition-all duration-250 hover:border-white/70 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <button
              type="submit"
              className="h-[50px] shrink-0 rounded-lg bg-navy-950 px-8 text-sm sm:text-base font-semibold text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg active:scale-[0.98] active:translate-y-0 active:shadow-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-950 pt-20 text-white/75">
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
              <p className="mt-5 max-w-xs text-sm sm:text-base leading-relaxed">
                Your AI-powered financial companion for a secure and prosperous
                future.
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
                <p className="text-base font-bold text-white">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm sm:text-base transition-colors duration-200 hover:text-brand-green-400"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-base font-bold text-white">Contact Info</p>
              <ul className="mt-5 space-y-4 text-sm sm:text-base">
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

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs sm:text-sm text-white/60 sm:flex-row">
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
