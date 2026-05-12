import InsightCard from "../components/InsightCard/InsightCard";
import AIInsightsSkeleton from "../components/skeletons/AIInsightsSkeleton";
import ErrorMessage from "../components/Error/ErrorMessage";
import { useAIInsights } from "../hooks/useAIInsights";

export default function AIInsights() {
  const { data, isLoading, isError } = useAIInsights();

  if (isLoading) return <AIInsightsSkeleton />;
  if (isError) return <ErrorMessage />;

  const insights = data?.insights ?? [];
  const summary = data?.summary ?? "No summary available";
  const hasInsights = insights.length > 0;

  return (
    <div className="p-6 space-y-6">
      <header>
        <h2 className="text-xl font-bold">AI Business Insights</h2>
      </header>

      <section className="bg-black dark:bg-gray-900 text-white p-5 rounded-xl shadow">
        <h3 className="font-semibold">AI Summary</h3>
        <p className="text-sm mt-1 text-gray-300">{summary}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hasInsights ? (
          insights.map(({ id, type, message }) => (
            <InsightCard key={id} type={type} message={message} />
          ))
        ) : (
          <EmptyState message="No insights available" />
        )}
      </section>
    </div>
  );
}

function EmptyState({ message }) {
  return <p className="text-gray-500">{message}</p>;
}