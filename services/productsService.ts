import {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductResponse,
  ListProductsResponse,
  UpdateProductResponse,
} from "@/interfaces/productResponse";
import { apiClient } from "@/lib/api-client";
import { HttpMethodType } from "@/types/httpMethod";

export const createProduct = async (
  data: Record<string, unknown>,
): Promise<CreateProductResponse> => {
  return apiClient<CreateProductResponse>({
    body: data,
    errorMessage: "Erro ao criar produto.",
    method: HttpMethodType.POST,
    url: "/products",
  });
};

export const deleteProduct = async (
  id: number,
): Promise<DeleteProductResponse> => {
  return apiClient<DeleteProductResponse>({
    errorMessage: "Erro ao excluir produto.",
    method: HttpMethodType.DELETE,
    url: `/products/${id}`,
  });
};

export const getProduct = async (id: number): Promise<GetProductResponse> => {
  return apiClient<GetProductResponse>({
    errorMessage: "Erro ao buscar produto.",
    method: HttpMethodType.GET,
    url: `/products/${id}`,
  });
};

export const listProducts = async (): Promise<ListProductsResponse> => {
  return apiClient<ListProductsResponse>({
    errorMessage: "Erro ao buscar produtos.",
    method: HttpMethodType.GET,
    url: "/products",
  });
};

export const updateProduct = async (
  id: number,
  data: Record<string, unknown>,
): Promise<UpdateProductResponse> => {
  return apiClient<UpdateProductResponse>({
    body: data,
    errorMessage: "Erro ao atualizar produto.",
    method: HttpMethodType.PUT,
    url: `/products/${id}`,
  });
};
