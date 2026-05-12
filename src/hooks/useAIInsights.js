import { useQuery } from "@tanstack/react-query";
import { fetchAIInsights } from "@/api/aiInsights";

export const useAIInsights = () => {
  return useQuery({
    queryKey: ["ai-insights"],
    queryFn: fetchAIInsights,
  });
};


// pattern 
// useQuery({
//   queryKey: [],
//   queryFn: apiFunction,
// })

// fetch data from API
// cache the data
// handle loading state
// handle error state
// reduce unnecessary API calls
// keep components clean and reusable