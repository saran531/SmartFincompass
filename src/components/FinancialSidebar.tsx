import { Link, useLocation } from "react-router-dom";

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

export default function FinancialSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-64 shrink-0 pr-8 lg:block">
      <div className="sticky top-28">
        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm sm:text-base transition-all ${
                  isActive
                    ? "bg-brand-green-50 font-semibold text-brand-green-700"
                    : "font-medium text-navy-900/60 hover:bg-slate-100 hover:text-navy-950"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
