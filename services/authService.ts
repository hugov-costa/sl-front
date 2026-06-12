import {
  CheckAuthResponse,
  LoginResponse,
  LogoutResponse,
} from "@/interfaces/authResponse";
import { Login } from "@/interfaces/login";
import { apiClient } from "@/lib/api-client";
import { HttpMethodType } from "@/types/httpMethod";

export const checkAuth = async (): Promise<CheckAuthResponse> => {
  return apiClient<CheckAuthResponse>({
    errorMessage: "Erro ao verificar autenticação.",
    method: HttpMethodType.GET,
    url: "/check-auth",
  });
};

export const login = async (data: Login): Promise<LoginResponse> => {
  return apiClient<LoginResponse>({
    body: data,
    errorMessage: "Erro ao realizar login.",
    method: HttpMethodType.POST,
    url: "/users/login",
  });
};

export const logout = async (): Promise<LogoutResponse> => {
  return apiClient<LogoutResponse>({
    errorMessage: "Erro ao realizar logout.",
    method: HttpMethodType.GET,
    url: "/users/logout",
  });
};
