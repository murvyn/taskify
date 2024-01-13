"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import SideBar from "./SideBar";

const CheckRoute = ({ children }: { children: ReactNode }) => {
  const route = usePathname();
  if (route === "/login" || route === "/sign-up") {
    return <>{children}</>;
  }
  return (
    <div className="flex gap-2">
      <SideBar />
      <div className="sm:card w-full h-[96vh] sm:bg-base-300 sm:border sm:border-stone-700 sm:shadow-2xl p-5 sm:overflow-hidden sm:hover:overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default CheckRoute;
