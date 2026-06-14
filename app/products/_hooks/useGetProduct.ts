import { useQuery } from "@tanstack/react-query";
import { GetProductResponse } from "@/interfaces/productResponse";
import { getProduct } from "@/services/productsService";

export function useGetProduct(productId: number) {
  const { data, isLoading, isError, error } = useQuery<GetProductResponse>({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
  });

  return {
    product: data?.data,
    isLoading,
    isError,
    error,
  };
}
