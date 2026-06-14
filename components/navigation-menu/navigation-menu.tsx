"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Contact, Menu, ScanBarcode, LogOut } from "lucide-react";
import { ListItem } from "./list-item";
import { useLogout } from "./hooks/useLogout";

export function NavigationMenuBar() {
  const { loading, logout } = useLogout();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-semibold gap-2 hover:bg-muted/50">
            <Menu className="h-5 w-5" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-56 py-1">
              <ListItem href="/clients" title="Clientes">
                <Contact className="h-4 w-4" />
              </ListItem>
              <ListItem href="/products" title="Produtos">
                <ScanBarcode className="h-4 w-4" />
              </ListItem>
              <ListItem title="Sair" onClick={logout} disabled={loading}>
                <LogOut className="h-4 w-4" />
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
