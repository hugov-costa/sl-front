import { Dashboard } from "@/components/dashboard/dashboard";
import { PageTitle } from "@/components/page-title";
import { DataTableSkeleton } from "../skeleton/data-table-skeleton";

interface LoadingPageProps {
  breadcrumbs: { label: string; href: string }[];
  pageTitle: string;
}

export function LoadingDataTable({ breadcrumbs, pageTitle }: LoadingPageProps) {
  return (
    <Dashboard breadcrumbs={breadcrumbs}>
      <PageTitle title={pageTitle} />
      <DataTableSkeleton />
    </Dashboard>
  );
}
