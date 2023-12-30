'use client'
import React from "react";
import noUser from "@/public/no-user.jpg";
import Image from "next/image";
import { FaRegPenToSquare } from "react-icons/fa6";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { IUser } from "@/types";

interface FormData{
    firstName: string,
    lastName: string,
    oldPassword: string,
    newPassword: string,
}

const UserProfile = () => {
    const { status, data: session } = useSession();
    const user = session?.user! as IUser;
    const schema: ZodType<FormData> = z.object({
        firstName: z.string(),
        lastName: z.string(),
        oldPassword: z.string(),
        newPassword: z.string()
    })
 
    const {register} = useForm<FormData>({resolver: zodResolver(schema), defaultValues: {
        firstName: user?.firstName,
        lastName: user?.lastName
    }})
  return (
    <div>
      <div className="flex space-x-5 items-center ">
        <div className="avatar">
          <Image
            src={noUser}
            width={100}
            height={100}
            alt="image"
            className="rounded-full object-cover cursor-pointer"
          />
        </div>
        <span className="text-lg btn rounded-full btn-ghost ">
          <FaRegPenToSquare />
        </span>
      </div>
      <form className="mt-8">
        <div className="flex flex-row gap-4 mb-5">
          <input
           {...register("firstName")}
           value={user?.firstName}
            type="text"
            placeholder="First Name"
            className="input input-bordered w-96"
          />
          <input
          {...register("lastName")}
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-96"
          />
        </div>
        <div className="flex flex-row gap-4 mb-5">
          <input
            type="password"
            placeholder="Old Password"
            className="input input-bordered w-96"
          />
          <input
            type="password"
            placeholder="New Password"
            className="input input-bordered w-96"
          />
        </div>
        <button type="submit" className="btn btn-primary">
            Save
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Email: </p>
        <span>marvin.asamoah.123@gmail.com</span>
      </div>
    </div>
  );
};

export default UserProfile;
