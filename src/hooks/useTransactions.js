import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactions";

export const useTransactions = (status) => {
  return useQuery({
    queryKey: ["transactions", status],
    queryFn: () => fetchTransactions({ status }),
  });
};