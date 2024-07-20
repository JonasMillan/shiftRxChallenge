import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavBar from "../components/NavBar";
import { UserProvider } from "./context/UserContext";
import { TokenProvider } from "./context/TokenContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShiftRx",
  description: "Shift Rx Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <UserProvider>
            <NavBar />
            <TokenProvider>{children}</TokenProvider>
          </UserProvider>
      </body>
    </html>
  );
}
