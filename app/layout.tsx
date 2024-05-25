import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Providers";
import { TaskProvider } from "@/contexts/taskContext";
import ToastComp from "@/components/ToastComp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taskify",
  description: "Task manager",
  icons: {
    icon: './icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html  lang="en">
      <head>
      <link rel="icon" href="./icon.png" />
      </head>
      <body  className={inter.className}>
        <AuthProvider>
            <TaskProvider>
              <main >
                {children}
                <ToastComp />
              </main>
            </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
