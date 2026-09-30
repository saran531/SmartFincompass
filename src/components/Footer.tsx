import { Link, useLocation } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const RESOURCES = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Know Your Risk", href: "/know-your-risk" },
];

const CONTACT_INFO = [
  { icon: EmailIcon, label: "Email", value: "support@smartfincompass.com" },
  { icon: CallIcon, label: "Phone", value: "+91 98765 43210" },
  { icon: PlaceIcon, label: "Location", value: "Bangalore, Karnataka, India" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-bold uppercase tracking-[0.14em] text-white">
      {children}
      <span className="mt-2.5 block h-0.5 w-8 rounded-full bg-brand-green-500" />
    </p>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const linkClass = (href: string) =>
    `inline-block text-sm transition-all duration-250 hover:translate-x-1 hover:text-[#00E676] sm:text-base ${
      href.startsWith("/") && pathname === href
        ? "text-[#00E676]"
        : "text-slate-300/85"
    }`;

  return (
    <footer className="relative overflow-hidden border-t border-brand-green-500/20 bg-navy-950 pt-16 text-slate-300/80">
      {/* Soft atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-15" />
      <div className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-brand-green-500/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-500 text-white shadow-md shadow-brand-green-500/30 transition-transform duration-300 group-hover:scale-105">
                <ExploreIcon fontSize="small" />
              </span>
              <span className="text-xl font-bold leading-tight text-white">
                SmartFin
                <span className="block -mt-1 text-[#00E676]">Compass</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300/85 sm:text-base">
              Your AI-powered financial companion for a secure and prosperous
              future.
            </p>
            <div className="mt-6 flex gap-3">
              {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social media link"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-250 hover:-translate-y-0.5 hover:border-brand-green-500/60 hover:bg-brand-green-500 hover:text-white"
                  >
                    <Icon sx={{ fontSize: 17 }} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:pl-2 lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-8">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    aria-current={
                      pathname === link.href ? "page" : undefined
                    }
                    className={linkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-8">
            <ColumnHeading>Resources</ColumnHeading>
            <ul className="mt-5 space-y-3">
              {RESOURCES.map((link) =>
                link.href.startsWith("/") ? (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      aria-current={
                        pathname === link.href ? "page" : undefined
                      }
                      className={linkClass(link.href)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass(link.href)}>
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8">
            <ColumnHeading>Contact Info</ColumnHeading>
            <ul className="mt-5 space-y-4">
              {CONTACT_INFO.map((item) => (
                <li key={item.label}>
                  <div className="group flex items-start gap-3 rounded-xl p-1.5 -m-1.5 transition-colors duration-250 hover:bg-white/5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-[#00E676] transition-all duration-250 group-hover:border-brand-green-500/60 group-hover:bg-brand-green-500 group-hover:text-white">
                      <item.icon sx={{ fontSize: 17 }} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium break-words text-white transition-colors duration-250 group-hover:text-[#00E676] sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-400 sm:flex-row sm:text-sm">
          <p>© 2025 SmartFin Compass. All rights reserved.</p>
          <div className="flex gap-5">
            <a
              href="#"
              className="transition-colors duration-250 hover:text-[#00E676]"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition-colors duration-250 hover:text-[#00E676]"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
