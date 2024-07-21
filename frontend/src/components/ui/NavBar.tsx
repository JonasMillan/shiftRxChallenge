"use client";
import { useRouter, usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./button";
import { getUserData, logout } from "@/app/server/auth";

type UserData = {
  id: number;
  name: string;
  email: string;
};

const NavBar = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogOut = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getUserData();
      setUserData(data);
    }

    fetchData();
  }, []);

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
          {!userData?.name ? (
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
                <Link href="/create-auction" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/create-auction"}
                    className={navigationMenuTriggerStyle()}
                  >
                    Create Auction
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/dashboard"}
                    className={navigationMenuTriggerStyle()}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <p>Hello {userData?.name}</p>
              <Button onClick={handleLogOut}>LogOut</Button>
            </div>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default memo(NavBar);
