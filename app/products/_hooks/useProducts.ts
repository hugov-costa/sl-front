import { useQuery } from "@tanstack/react-query";
import { ListProductsResponse } from "@/interfaces/productResponse";
import { listProducts } from "@/services/productsService";

export function useProducts() {
  const { data, isLoading } = useQuery<ListProductsResponse>({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  return {
    products: data,
    isLoading,
  };
}
