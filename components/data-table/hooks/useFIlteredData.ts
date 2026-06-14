import { normalizeString } from "@/utils/normalizeString";
import { useMemo } from "react";

interface UseFilteredDataParams<TData> {
  data: TData[] | undefined;
  searchFields?: Partial<Record<keyof TData, string>>;
  searchQuery?: string;
}

export function useFilteredData<TData>({
  data,
  searchFields,
  searchQuery,
}: UseFilteredDataParams<TData>) {
  return useMemo(() => {
    let result = data ?? [];

    if (searchQuery && searchFields && Object.keys(searchFields).length > 0) {
      const normalizedQuery = normalizeString(searchQuery);
      const searchFieldKeys = Object.keys(searchFields) as (keyof TData)[];

      result = result.filter((item) =>
        searchFieldKeys.some((field) => {
          const value = item[field];

          return normalizeString(String(value)).includes(normalizedQuery);
        }),
      );
    }

    return result;
  }, [data, searchQuery, searchFields]);
}
