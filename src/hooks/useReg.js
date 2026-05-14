import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api";

export const useRegister = (onSuccess) => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
    onSuccess,
  });
};