import { Login } from "@/interfaces/login";
import { login, checkAuth } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginFormValues } from "../_schemas/formSchema";
import { FormValidationHTTPError } from "@/utils/formValidationError";
import { handleFormValidationError } from "@/utils/handleFormValidationError";
import { useLoginForm } from "./useLoginForm";
import { useUser } from "@/contexts/user-context";
import { LoginResponse } from "@/interfaces/authResponse";
import { useQueryClient } from "@tanstack/react-query";

export function useLogin(form: ReturnType<typeof useLoginForm>) {
  const router = useRouter();
  const { setUser } = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    LoginResponse,
    FormValidationHTTPError,
    LoginFormValues
  >({
    mutationFn: async (data) => {
      return await login(data as Login);
    },
    onError: (error) => {
      handleFormValidationError(error, form);
    },
    onSuccess: async (data) => {
      setUser({
        id: data.user?.id,
        email: data.user?.email ?? "",
        name: data.user?.name ?? "",
        updated_at: data.user?.updated_at,
      });

      queryClient.invalidateQueries({ queryKey: ["authenticatedUser"] });

      try {
        await checkAuth();
      } catch {}

      router.push("/");
    },
  });

  return {
    loading: mutation.status === "pending",
    login: mutation.mutate,
  };
}
