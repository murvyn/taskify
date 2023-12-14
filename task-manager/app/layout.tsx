import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Providers";
import SideBar from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="halloween" lang="en">
      <body className={inter.className}>
        <AuthProvider>
            <main className="p-5 flex gap-5">
            <SideBar />
              {children}
            </main>
        </AuthProvider>
      </body>
    </html>
  );
}
