"use client";
import Image from "next/image";
import React, { useContext } from "react";
import SidebarLinks from "./SidebarLinks";
import noUser from "@/public/no-user.jpg";
import { LuLogOut } from "react-icons/lu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/userContext";
import { IUser } from "@/types";

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}

const SecondSide = ({ show, setShow }: Props) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const user = session?.user as IUser;
  const handle = async () => {
    await signOut();
    router.push("/")
  };
  return (
    <div
      className={`max-sm:${
        show ? "inline fixed w-full h-full z-40 top-0 left-0 " : "hidden"
      } sm:hidden card bg-base-200 sm:${`w-[15rem] h-[96vh]  flex items-center justify-between py-5`} border border-stone-700 bg-base-300 `}
    >
      <div
        onClick={() => {
          router.push("/dashboard/profile");
          setShow && setShow(!show);
        }}
        className="flex flex-col xl:flex-row justify-around gap-4 items-center my-5 max-sm:flex-row sm:px-4"
      >
        <Image
          src={noUser}
          width={60}
          height={60}
          alt="image"
          className="rounded-full object-cover cursor-pointer"
        />
        <span className="text-xl font-bold text-center  xl:text-left max-sm:text-left cursor-pointer inline-block -sm:hidden ">
          {status === "loading" ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          ) : (
            <p className="capitalize">
              {user && user.firstName} <br /> {user && user.lastName}
            </p>
          )}
        </span>
      </div>
      <SidebarLinks setShow={setShow} show={show} />
      <div>
        <button className="btn btn-ghost rounded-none text-xl" onClick={handle}>
          <LuLogOut className="text-primary" />
          <span className="-sm:hidden">logout</span>
        </button>
      </div>
    </div>
  );
};

export default SecondSide;
