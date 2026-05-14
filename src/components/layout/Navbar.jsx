import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, Sun, LogOut, User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-slate-950 dark:border-slate-800">
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search anything..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-slate-800">
          <Bell size={18} />
        </button>

        <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-slate-800">
          <Sun size={18} />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
              <User size={16} />
            </div>

            <div className="text-left text-sm">
              <p className="font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.role || "admin"}</p>
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow dark:border-slate-700 dark:bg-slate-900">
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}