import { useQuery } from "@tanstack/react-query";
import { ListClientsResponse } from "@/interfaces/clientResponse";
import { listClients } from "@/services/clientsService";

export function useClients() {
  const { data, isLoading } = useQuery<ListClientsResponse>({
    queryKey: ["clients"],
    queryFn: listClients,
  });

  return {
    clients: data,
    isLoading,
  };
}
