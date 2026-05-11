import InsightCard from "../components/InsightCard/InsightCard";
import AIInsightsSkeleton from "../components/skeletons/AIInsightsSkeleton";
import { useAIInsights } from "../hooks/useAIInsights";

export default function AIInsights() {
  const { data, isLoading, isError } = useAIInsights();

  if (isLoading) return <AIInsightsSkeleton />;

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Something went wrong. Try again.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-xl font-bold">
        AI Business Insights
      </h2>

      <div className="bg-black dark:bg-gray-900 text-white p-5 rounded-xl shadow">
        <h3 className="font-semibold">AI Summary</h3>
        <p className="text-sm mt-1 text-gray-300">
          {data?.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.insights?.length > 0 ? (
          data.insights.map((insight) => (
            <InsightCard
              key={insight.id}
              type={insight.type}
              message={insight.message}
            />
          ))
        ) : (
          <p className="text-gray-500">No insights available</p>
        )}
      </div>

    </div>
  );
}