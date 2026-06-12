import { logout } from "@/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HTTPError } from "@/utils/httpError";
import { LogoutResponse } from "@/interfaces/authResponse";
import { useUser } from "@/contexts/user-context";

export function useLogout() {
  const router = useRouter();
  const { clearUser } = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation<LogoutResponse, HTTPError>({
    mutationFn: async () => {
      return await logout();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      toast.success("Logout realizado com sucesso.");
      router.push("/login");
    },
  });

  return {
    loading: mutation.status === "pending",
    logout: mutation.mutate,
  };
}
