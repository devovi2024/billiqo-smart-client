import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  CreditCard,
  BarChart3,
  Sparkles,
  FileAxis3D,
  Settings,
  ArrowUpRight,
  User,
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Invoices", path: "/invoices", icon: FileText },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Transactions", path: "/transactions", icon: CreditCard },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "AI Insights", path: "/ai-insights", icon: Sparkles },
  { name: "Reports", path: "/reports", icon: FileAxis3D },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="flex h-full w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="mb-8">
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-cyan-500 p-5 text-white shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <ArrowUpRight size={20} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[.2em] text-emerald-100">InvoiceX AI</p>
              <p className="text-xl font-semibold">Smart Billing</p>
            </div>
          </div>
          <p className="text-sm text-emerald-100/90">Fast analytics and invoicing for your business.</p>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <div className="flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-slate-500 dark:text-slate-400">Pro Plan</p>
            <p className="mt-1 font-semibold">Your plan is active</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-700 dark:text-emerald-300">
            Active
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Invoices</span>
            <span>1,250 / 5,000</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full w-[25%] rounded-full bg-emerald-500" />
          </div>
        </div>

        <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100">
          Upgrade Plan
        </button>

        <div className="flex items-center gap-3 rounded-3xl bg-slate-900/5 p-3 dark:bg-white/5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950">
            <User size={20} />
          </div>
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}