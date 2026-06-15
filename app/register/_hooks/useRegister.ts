import { register as registerUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RegisterFormValues } from "../_schemas/formSchema";
import { FormValidationHTTPError } from "@/utils/formValidationError";
import { handleFormValidationError } from "@/utils/handleFormValidationError";
import { useRegisterForm } from "./useRegisterForm";
import { toast } from "sonner";

export function useRegister(form: ReturnType<typeof useRegisterForm>) {
  const router = useRouter();

  const mutation = useMutation<
    void,
    FormValidationHTTPError,
    RegisterFormValues
  >({
    mutationFn: async (data) => {
      const registerData: {
        email: string;
        name: string;
        password: string;
        password_confirmation: string;
      } = {
        email: data.email,
        name: data.name,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      };
      await registerUser(registerData);
    },
    onError: (error) => {
      const hasErrors = handleFormValidationError(error, form);
      if (!hasErrors) {
        toast.error("Erro ao registrar. Tente novamente.");
      }
    },
    onSuccess: () => {
      toast.success("Registro realizado com sucesso!");
      router.push("/login");
    },
  });

  return {
    loading: mutation.status === "pending",
    register: mutation.mutate,
  };
}
