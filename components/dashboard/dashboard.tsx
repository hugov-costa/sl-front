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
      <header className="flex h-16 shrink-0 items-center gap-3 transition-[width,height] ease-linear border-b border-border bg-background/50 backdrop-blur-sm group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="mt-5 flex items-center gap-3 px-4">
          <NavigationMenuBar />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-5 p-5 pt-0 m-4">{children}</div>
    </>
  );
}
