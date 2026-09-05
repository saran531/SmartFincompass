import ExploreIcon from "@mui/icons-material/Explore";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";

const COLUMNS = [
  {
    title: "Quick Links",
    links: ["Home", "Features", "How It Works", "Pricing", "About", "Contact"],
  },
  {
    title: "Resources",
    links: ["Blog", "Financial Guide", "FAQs", "Privacy Policy", "Terms of Service"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Partners", "Contact Us"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 pt-16 text-white/75">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-500 text-white">
                <ExploreIcon fontSize="small" />
              </span>
              <span className="text-xl font-bold leading-tight text-white">
                SmartFin
                <span className="block -mt-1 text-brand-green-400">
                  Compass
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm sm:text-base leading-relaxed">
              Your AI-powered financial companion for a secure and
              prosperous future.
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

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-base font-bold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm sm:text-base hover:text-brand-green-400">
                      {l}
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
  );
}
