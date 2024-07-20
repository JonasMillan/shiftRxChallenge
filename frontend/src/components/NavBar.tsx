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
import { Button } from "./ui/button";
import { useToken } from "@/app/context/TokenContext";
import { useRouter } from "next/navigation";
import { memo } from "react";

const NavBar = () => {
  const router = useRouter();
  const { removeToken } = useToken();
  const { user, logout } = useUser();
  const pathname = usePathname();

  const handleLogOut = () => {
    logout();
    removeToken();
    router.push("/Login");
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
          {!user ? (
            <div className="flex justify-end">
              <NavigationMenuItem>
                <Link href="/Register" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/Register"}
                    className={navigationMenuTriggerStyle()}
                  >
                    Register
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/Login" legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === "/Login"}
                    className={navigationMenuTriggerStyle()}
                  >
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-5">
              <p>Hello {user.name}</p>
              <Button onClick={handleLogOut}>LogOut</Button>
            </div>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default memo(NavBar);
