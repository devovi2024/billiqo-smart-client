
export default function ErrorMessage({ message = "Something went wrong. Try again." }) {
  return (
    <div className="p-6 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">
      {message}
    </div>
  );
}