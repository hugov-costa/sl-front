import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "@/components/delete-modal/delete-modal";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/interfaces/product";
import { deleteProduct } from "@/services/productsService";

export function ProductActions({ product }: { product: Product | undefined }) {
  const router = useRouter();

  if (!product?.id) return null;

  const handleDeleteProduct = async (id: string | number): Promise<void> => {
    await deleteProduct(Number(id));
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        className="transition-colors hover:text-primary"
        onClick={() => router.push(`/products/${product.id}`)}
        size="sm"
        variant="ghost"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <DeleteModal
        deleteService={handleDeleteProduct}
        resourceId={product.id}
        queryKeysToInvalidate={[["products"]]}
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
