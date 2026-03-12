import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ fullname, email, password }) =>
      signupApi({ fullname, email, password }),
    onSuccess: (user) => {
      toast.success(
        "Account created successfully! Please confirm your email before logging in!",
      );
      //   navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message || "Signup failed. Please try again.");
    },
  });

  return { signup, isSigningUp };
}
