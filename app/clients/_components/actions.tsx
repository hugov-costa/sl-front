import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "@/components/delete-modal/delete-modal";
import { Pencil, Trash2 } from "lucide-react";
import { Client } from "@/interfaces/client";
import { deleteClient } from "@/services/clientsService";

export function ClientActions({ client }: { client: Client | undefined }) {
  const router = useRouter();

  if (!client?.id) return null;

  const handleDeleteClient = async (id: string | number): Promise<void> => {
    await deleteClient(Number(id));
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        className="transition-colors hover:text-primary"
        onClick={() => router.push(`/clients/${client.id}`)}
        size="sm"
        variant="ghost"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <DeleteModal
        deleteService={handleDeleteClient}
        resourceId={client.id}
        queryKeysToInvalidate={[["clients"]]}
      >
        <Button
          className="transition-colors hover:text-primary"
          size="sm"
          variant="ghost"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DeleteModal>
    </div>
  );
}
