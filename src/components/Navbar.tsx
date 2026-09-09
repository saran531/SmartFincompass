import { useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <header className="sticky top-0 z-50 border-b border-navy-950/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-500 text-white">
            <ExploreIcon fontSize="small" />
          </span>
          <span className="text-lg font-bold leading-tight text-navy-950">
            SmartFin
            <span className="block -mt-1 text-brand-green-600">Compass</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              to={link.href}
              className={`relative text-sm sm:text-base font-medium text-navy-900/80 transition-colors hover:text-brand-green-600 ${
                i === 0 ? "text-navy-950 font-semibold" : ""
              }`}
            >
              {link.label}
              {i === 0 && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-brand-green-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="btn-hover-effect cursor-pointer rounded-lg border border-navy-950/15 px-5 py-2 text-sm sm:text-base font-semibold text-navy-950 transition-all hover:border-brand-green-500 hover:text-brand-green-600 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 active:scale-[0.98]"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="btn-hover-effect cursor-pointer rounded-lg bg-brand-green-500 px-5 py-2 text-sm sm:text-base font-semibold text-white shadow-soft transition-all hover:bg-brand-green-600 focus:outline-none focus:ring-2 focus:ring-brand-green-500/20 active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-navy-950 cursor-pointer transition-all hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-950/5 bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-base font-medium text-navy-900/80 transition-colors hover:text-brand-green-600"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/login"
              className="btn-hover-effect text-center w-full rounded-lg border border-navy-950/15 px-5 py-2.5 text-sm sm:text-base font-semibold text-navy-950 transition-all hover:border-brand-green-500 hover:text-brand-green-600 active:scale-[0.98]"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/login"
              className="btn-hover-effect text-center w-full rounded-lg bg-brand-green-500 px-5 py-2.5 text-sm sm:text-base font-semibold text-white transition-all hover:bg-brand-green-600 active:scale-[0.98]"
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
