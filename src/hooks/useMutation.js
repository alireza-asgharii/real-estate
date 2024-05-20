import { signUp } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const res = useMutation({ mutationFn: signUp });
  return res;
};
