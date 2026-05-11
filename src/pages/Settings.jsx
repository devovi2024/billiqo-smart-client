export default function Settings() {
  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="space-y-4">

        <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border dark:border-gray-800 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">
            Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update your personal information
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border dark:border-gray-800 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">
            Security
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Change password and security settings
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border dark:border-gray-800 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">
            Preferences
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Theme, notifications, and more
          </p>
        </div>

      </div>

    </div>
  );
}