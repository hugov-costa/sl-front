import { Skeleton } from "@/components/ui/skeleton";

interface DataTableSkeletonProps {
  rows?: number;
}

export function DataTableSkeleton({ rows = 5 }: DataTableSkeletonProps) {
  return (
    <div className="mt-2 w-full space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-9 mt-2 flex-1 max-w-sm rounded-md" />
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="flex items-center gap-4" key={rowIndex}>
          {Array.from({ length: 3 }).map((_, cellIndex) => (
            <Skeleton key={cellIndex} className="h-9 flex-1" />
          ))}
        </div>
      ))}

      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-30" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}
