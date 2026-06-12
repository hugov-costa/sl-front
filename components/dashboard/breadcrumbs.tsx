"use client";

import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Undo2 } from "lucide-react";
import { BreadcrumbsItem } from "@/interfaces/breadcrumbItem";
import { useRouter, usePathname } from "next/navigation";

interface BreadcrumbsProps {
  breadcrumbs?: BreadcrumbsItem[];
}

export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <Breadcrumb className="mx-5">
      <BreadcrumbList className="text-sm">
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink
            className={breadcrumbs ? "cursor-pointer" : ""}
            onClick={() => router.push("/")}
          >
            Início
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb, i) => (
            <Fragment key={i}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                {breadcrumb.onClick && i !== breadcrumbs.length - 1 ? (
                  <BreadcrumbLink
                    className="cursor-pointer"
                    onClick={breadcrumb.onClick}
                  >
                    {breadcrumb.label}
                  </BreadcrumbLink>
                ) : breadcrumb.href && i !== breadcrumbs.length - 1 ? (
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="md:block">
          <BreadcrumbLink
            className={
              isHomePage ? "opacity-50 pointer-events-none" : "cursor-pointer"
            }
            onClick={() => !isHomePage && router.back()}
          >
            <Undo2 className="mr-2 h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
