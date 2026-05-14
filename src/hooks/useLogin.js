import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api";

export const useLogin = (onSuccess) => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess,
  });
};