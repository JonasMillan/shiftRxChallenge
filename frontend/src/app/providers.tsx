"use client";

import dynamic from "next/dynamic";

import { UserProvider } from "./context/UserContext";

const NavBar = dynamic(() => import('../components/ui/NavBar'), { ssr: false })

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <NavBar />
      {children}
    </UserProvider>
  );
}
