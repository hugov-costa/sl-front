import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface DataTableSearchBarProps<TData> {
  createHref?: string;
  searchFields?: Partial<Record<keyof TData, string>>;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export function DataTableSearchBar<TData>({
  createHref,
  searchFields,
  searchQuery = "",
  setSearchQuery = () => {},
}: DataTableSearchBarProps<TData>) {
  const router = useRouter();

  const getSearchPlaceholder = () => {
    if (!searchFields) return "Pesquisar...";

    const fieldNames = Object.values(searchFields);
    if (fieldNames.length === 0) return "Pesquisar...";

    return `Pesquisar por ${fieldNames.join(", ")}...`;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 md:w-full md:items-center">
        <Input
          className="w-full md:flex-1 md:max-w-lg"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={getSearchPlaceholder()}
          value={searchQuery}
        />
      </div>

      {createHref && (
        <Button
          className="cursor-pointer w-full md:w-auto px-6 shadow-md hover:shadow-lg font-medium"
          onClick={() => router.push(createHref)}
        >
          Criar
        </Button>
      )}
    </>
  );
}
