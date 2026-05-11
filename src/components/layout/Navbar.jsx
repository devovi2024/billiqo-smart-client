import useTheme from "../../hooks/useTheme";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-14 px-6 flex items-center justify-between border-b bg-white dark:bg-gray-900 dark:text-white">
      
      <h1 className="font-semibold">AI Billing Dashboard</h1>

      <div className="flex items-center gap-3">

        <input
          placeholder="Search..."
          className="px-3 py-1 border rounded-md text-sm dark:bg-gray-800"
        />

        <button
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
          className="px-3 py-1 border rounded-md text-sm"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="w-8 h-8 rounded-full bg-black dark:bg-white" />
      </div>
    </div>
  );
}