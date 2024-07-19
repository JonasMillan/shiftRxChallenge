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

const NavBar = () => {
  const pathname = usePathname();

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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
