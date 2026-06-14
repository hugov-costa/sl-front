import { useQuery } from "@tanstack/react-query";
import { GetClientResponse } from "@/interfaces/clientResponse";
import { getClient } from "@/services/clientsService";

export function useGetClient(clientId: number) {
  const { data, isLoading, isError, error } = useQuery<GetClientResponse>({
    queryKey: ["clients", clientId],
    queryFn: () => getClient(clientId),
  });

  return {
    client: data?.data,
    isLoading,
    isError,
    error,
  };
}
