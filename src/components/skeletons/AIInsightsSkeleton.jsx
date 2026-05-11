import { Skeleton } from "@/components/ui/skeleton";

export default function AIInsightsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-6 w-56" />

      <div className="p-5 rounded-xl bg-gray-200 dark:bg-gray-800 space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-xl space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}