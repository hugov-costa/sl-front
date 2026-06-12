import { Breadcrumbs } from "./breadcrumbs";
import { BreadcrumbsItem } from "@/interfaces/breadcrumbItem";
import { NavigationMenuBar } from "../navigation-menu/navigation-menu";

interface DashboardProps {
  breadcrumbs?: BreadcrumbsItem[];
  children: React.ReactNode;
}

export function Dashboard({ breadcrumbs, children }: DashboardProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="mt-5 flex items-center gap-2 px-4">
          <NavigationMenuBar />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 m-4">{children}</div>
    </>
  );
}
