import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { Bell, CalendarDays, Search, ChevronDown, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search anything..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
          <CalendarDays size={16} />
          May 1 - May 31, 2024
          <ChevronDown size={16} />
        </button>

        <button className="rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
          <Bell size={18} />
        </button>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-2xl border border-slate-200 bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div>
          <Link to="dash">
          Dash
          
          </Link>
        </div>

        <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950">
            JD
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}