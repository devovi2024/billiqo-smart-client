import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/admin");

      return res.data || { summary: {} };
    },
  });
};