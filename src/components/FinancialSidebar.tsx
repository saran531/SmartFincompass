import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useApp } from "../context/AppContext";

const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/financial-dashboard",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "AI Financial Report",
    href: "/ai-financial-report",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

export function FinancialSidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useApp();

  return (
    <>
      <nav className="space-y-1.5">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 sm:text-base ${
                isActive
                  ? "bg-gradient-to-r from-[#189a63] to-[#22b573] text-white shadow-[0_10px_22px_-8px_rgba(24,154,99,0.65)]"
                  : "text-white/70 hover:translate-x-1 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="mt-5 flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-bold text-white transition-all duration-250 hover:border-red-400/60 hover:bg-red-500/15 hover:text-red-300 sm:text-base"
      >
        <LogoutIcon sx={{ fontSize: 20 }} />
        Logout
      </button>
    </>
  );
}

export default function FinancialSidebar() {
  return (
    <aside className="hidden w-[260px] shrink-0 lg:block">
      <div className="sticky top-28 rounded-3xl bg-[#0D2742] p-5 shadow-[0_24px_60px_-28px_rgba(13,39,66,0.6)] ring-1 ring-white/5">
        <FinancialSidebarContent />
      </div>
    </aside>
  );
}
