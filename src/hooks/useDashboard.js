import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

export const useDashboard = () => useQuery({
  queryKey: ["dashboard"],
  queryFn: async () => (await api.get("/dashboard/admin")).data,
  staleTime: 300000,
  gcTime: 600000,
  refetchOnWindowFocus: false,
});

export const useFilteredInvoices = (status, category, search) => useQuery({
  queryKey: ["filtered-invoices", status, category, search],
  queryFn: async () => {
    const params = new URLSearchParams();
    if (status && status !== "All") params.append("status", status);
    if (category && category !== "All") params.append("category", category);
    if (search) params.append("search", search);
    return (await api.get(`/dashboard/invoices/filter?${params.toString()}`)).data;
  },
  enabled: Boolean(status || category || search),
});

export const useFilteredProducts = (category, search) => useQuery({
  queryKey: ["filtered-products", category, search],
  queryFn: async () => {
    const params = new URLSearchParams();
    if (category && category !== "All") params.append("category", category);
    if (search) params.append("search", search);
    return (await api.get(`/dashboard/products/filter?${params.toString()}`)).data;
  },
});

export const useFilteredReviews = (rating, search) => useQuery({
  queryKey: ["filtered-reviews", rating, search],
  queryFn: async () => {
    const params = new URLSearchParams();
    if (rating && rating !== 0) params.append("rating", rating);
    if (search) params.append("search", search);
    return (await api.get(`/dashboard/reviews/filter?${params.toString()}`)).data;
  },
});