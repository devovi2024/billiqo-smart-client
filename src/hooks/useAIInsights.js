import { useQuery } from "@tanstack/react-query";
import { fetchAIInsights } from "../api/aiInsights";

export const useAIInsights = () => {
  return useQuery({
    queryKey: ["ai-insights"],
    queryFn: fetchAIInsights,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};