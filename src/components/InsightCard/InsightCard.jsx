export default function InsightCard({ type, message }) {

  const color =
    type === "success"
      ? "text-green-500"
      : type === "warning"
      ? "text-yellow-500"
      : type === "danger"
      ? "text-red-500"
      : "text-blue-500";

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-gray-900 shadow">
      <p className={`font-medium ${color}`}>
        {type.toUpperCase()}
      </p>

      <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
        {message}
      </p>
    </div>
  );
}


// This component displays an insight card UI
// It shows a type (status) with dynamic color and a message
// It is reusable and used for rendering AI insights in a clean way