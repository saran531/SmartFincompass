import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-navy-950/10 bg-white/95 shadow-[0_10px_30px_-22px_rgba(10,31,61,0.45)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-sm shadow-brand-green-500/30 transition-transform duration-300 group-hover:scale-105">
            <ExploreIcon fontSize="small" />
          </span>
          <span className="text-lg font-bold leading-tight text-navy-950">
            SmartFin
            <span className="block -mt-1 text-brand-green-600">Compass</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`group/nav relative rounded-lg px-3 py-2 text-[15px] font-semibold transition-all duration-250 ${
                  isActive
                    ? "text-brand-green-600"
                    : "text-navy-900/75 hover:bg-brand-green-50 hover:text-brand-green-600"
                }`}
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute inset-x-3 bottom-0.5 h-0.5 origin-left rounded-full bg-brand-green-500 transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover/nav:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="btn-hover-effect cursor-pointer rounded-lg border border-navy-950/15 bg-white px-4 py-2 text-sm font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 active:scale-[0.98]"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="btn-hover-effect cursor-pointer rounded-lg bg-gradient-to-r from-[#189a63] to-[#22b573] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(24,154,99,0.75)] transition-all duration-250 hover:brightness-110 hover:shadow-[0_10px_22px_-8px_rgba(24,154,99,0.85)] focus:outline-none focus:ring-2 focus:ring-brand-green-500/25 active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-navy-950 transition-all hover:bg-slate-100 lg:hidden cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-950/10 bg-white px-6 py-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`relative rounded-lg px-3 py-2.5 text-[15px] font-semibold transition-all duration-250 ${
                    isActive
                      ? "bg-brand-green-50 text-brand-green-600"
                      : "text-navy-900/80 hover:bg-brand-green-50 hover:text-brand-green-600"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-brand-green-500" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-navy-950/10 pt-4">
            <Link
              to="/login"
              className="btn-hover-effect w-full rounded-lg border border-navy-950/15 bg-white px-5 py-2.5 text-center text-sm font-semibold text-navy-950 transition-all duration-250 hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98]"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/login"
              className="btn-hover-effect w-full rounded-lg bg-gradient-to-r from-[#189a63] to-[#22b573] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(24,154,99,0.75)] transition-all duration-250 hover:brightness-110 active:scale-[0.98]"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
