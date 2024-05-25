import { signUp } from "@/services/auth";
import { createAd } from "@/services/dashboard";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const res = useMutation({ mutationFn: signUp });
  return res;
};

export const useCreateAd = () => {
  const res = useMutation({ mutationFn: createAd });
  return res;
};
