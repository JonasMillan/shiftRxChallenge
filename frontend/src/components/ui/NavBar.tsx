"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/app/context/UserContext";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { memo } from "react";

const NavBar = () => {
  const router = useRouter();
  const { userData, logout } = useUser();
  const pathname = usePathname();

  const handleLogOut = () => {
    logout();
    router.push("/login");
  };
  return (
    <div className="w-full py-3">
      <NavigationMenu className="w-full">
        <NavigationMenuList className="flex items-center justify-end">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                active={pathname === "/"}
                className={navigationMenuTriggerStyle()}
              >
                Auctions!
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {!userData?.user ? (
            <div className="flex justify-end">
              <NavigationMenuItem>
                <Link href="/register" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/register"}
                    className={navigationMenuTriggerStyle()}
                  >
                    Register
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/login"}
                    className={navigationMenuTriggerStyle()}
                  >
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-5">
              <NavigationMenuItem>
                <Link href="/create-auctions" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/create-auctions"}
                    className={navigationMenuTriggerStyle()}
                  >
                    Create Auction
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <p>Hello {userData?.user?.name}</p>
              <Button onClick={handleLogOut}>LogOut</Button>
            </div>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default memo(NavBar);
