import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Invoices", path: "/invoices" },
  { name: "Customers", path: "/customers" },
  { name: "Transactions", path: "/transactions" },
  { name: "AI Insights", path: "/ai-insights" },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-full border-r bg-white dark:bg-gray-900 dark:border-gray-800 p-4">

      <h1 className="text-xl font-bold mb-6">
        AI Billing
      </h1>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

    </div>
  );
}