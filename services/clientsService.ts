import {
  CreateClientResponse,
  DeleteClientResponse,
  GetClientResponse,
  ListClientsResponse,
  UpdateClientResponse,
} from "@/interfaces/clientResponse";
import { apiClient } from "@/lib/api-client";
import { HttpMethodType } from "@/types/httpMethod";

export const createClient = async (
  data: Record<string, unknown>,
): Promise<CreateClientResponse> => {
  return apiClient<CreateClientResponse>({
    body: data,
    errorMessage: "Erro ao criar cliente.",
    method: HttpMethodType.POST,
    url: "/clients",
  });
};

export const deleteClient = async (
  id: number,
): Promise<DeleteClientResponse> => {
  return apiClient<DeleteClientResponse>({
    errorMessage: "Erro ao excluir cliente.",
    method: HttpMethodType.DELETE,
    url: `/clients/${id}`,
  });
};

export const getClient = async (id: number): Promise<GetClientResponse> => {
  return apiClient<GetClientResponse>({
    errorMessage: "Erro ao buscar cliente.",
    method: HttpMethodType.GET,
    url: `/clients/${id}`,
  });
};

export const listClients = async (): Promise<ListClientsResponse> => {
  return apiClient<ListClientsResponse>({
    errorMessage: "Erro ao buscar clientes.",
    method: HttpMethodType.GET,
    url: "/clients",
  });
};

export const updateClient = async (
  id: number,
  data: Record<string, unknown>,
): Promise<UpdateClientResponse> => {
  return apiClient<UpdateClientResponse>({
    body: data,
    errorMessage: "Erro ao atualizar cliente.",
    method: HttpMethodType.PUT,
    url: `/clients/${id}`,
  });
};
