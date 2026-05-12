import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../api/customers";

export const useCustomers = (search, page) => {
  return useQuery({
    queryKey: ["customers", search, page],
    queryFn: () => fetchCustomers({ search, page }),
    keepPreviousData: true,
  });
};