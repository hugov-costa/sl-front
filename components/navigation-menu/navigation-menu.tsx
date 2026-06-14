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
          <NavigationMenuTrigger className="text-md">
            <Menu className="mr-2 h-6 w-6" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-60">
              <ListItem href="/clients" title="Clientes">
                <Contact />
              </ListItem>
              <ListItem href="/products" title="Produtos">
                <ScanBarcode />
              </ListItem>
              <ListItem title="Sair" onClick={logout} disabled={loading}>
                <LogOut />
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
