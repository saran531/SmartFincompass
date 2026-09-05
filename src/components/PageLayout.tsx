import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

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

export default function PageLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-navy-950/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-500 text-white">
              <ExploreIcon fontSize="small" />
            </span>
            <span className="text-lg font-bold leading-tight text-navy-950">
              SmartFin
              <span className="block -mt-1 text-brand-green-600">Compass</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`relative text-sm sm:text-base font-medium text-navy-900/80 transition-colors hover:text-brand-green-600 ${
                  location.pathname === link.href ? "text-navy-950 font-semibold" : ""
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-brand-green-500" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-lg border border-navy-950/15 px-5 py-2 text-sm sm:text-base font-semibold text-navy-950 transition-colors hover:border-navy-950/30"
            >
              Login
            </Link>
            <Link
              to="/create-account"
              className="rounded-lg bg-brand-green-500 px-5 py-2 text-sm sm:text-base font-semibold text-white shadow-soft transition-colors hover:bg-brand-green-600"
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
                  className="text-base font-medium text-navy-900/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full rounded-lg border border-navy-950/15 px-5 py-2.5 text-center text-sm sm:text-base font-semibold text-navy-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/create-account"
                className="w-full rounded-lg bg-brand-green-500 px-5 py-2.5 text-center text-sm sm:text-base font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950">
          {title}
        </h1>
        {children}
      </main>

      {/* NEWSLETTER */}
      <section className="bg-brand-green-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-10">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-brand-green-600">
              <SendIcon fontSize="small" />
            </span>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">
                Stay Updated with Financial Insights
              </p>
              <p className="text-sm sm:text-base text-white/85">
                Subscribe to our newsletter and never miss an update.
              </p>
            </div>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full rounded-lg border-0 px-4 py-3 text-sm sm:text-base text-navy-950 placeholder:text-navy-900/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-navy-950 px-6 py-3 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-navy-900"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-950 pt-16 text-white/75">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-500 text-white">
                  <ExploreIcon fontSize="small" />
                </span>
                <span className="text-xl font-bold leading-tight text-white">
                  SmartFin
                  <span className="block -mt-1 text-brand-green-400">
                    Compass
                  </span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm sm:text-base leading-relaxed">
                Your AI-powered financial companion for a secure and prosperous
                future.
              </p>
              <div className="mt-5 flex gap-3">
                {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-brand-green-500 hover:text-white"
                    >
                      <Icon sx={{ fontSize: 17 }} />
                    </a>
                  )
                )}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-base font-bold text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm sm:text-base hover:text-brand-green-400"
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
              <ul className="mt-4 space-y-3 text-sm sm:text-base">
                <li className="flex items-center gap-2">
                  <EmailIcon sx={{ fontSize: 16 }} />
                  support@smartfincompass.com
                </li>
                <li className="flex items-center gap-2">
                  <CallIcon sx={{ fontSize: 16 }} />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <PlaceIcon sx={{ fontSize: 16 }} />
                  Bangalore, Karnataka, India
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs sm:text-sm text-white/60 sm:flex-row">
            <p>© 2025 SmartFin Compass. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-green-400">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-brand-green-400">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
