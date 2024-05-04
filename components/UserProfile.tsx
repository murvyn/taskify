"use client";
import React, { useState } from "react";
import noUser from "@/public/no-user.jpg";
import Image from "next/image";
import { FaRegPenToSquare } from "react-icons/fa6";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { IUser } from "@/types";
import { FaTimes } from "react-icons/fa";
import ImageUploadCard from "./ImageUploadCard";

interface FormData {
  firstName?: string;
  lastName?: string;
  oldPassword?: string;
  newPassword?: string;
}

const UserProfile = () => {
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editInfo, setEditInfo] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { update, data: session, status } = useSession();
  const user = session?.user as IUser;
  const schema: ZodType<FormData> = z.object({
    firstName: z
      .string({ invalid_type_error: "Field has to be characters" })
      .optional(),
    lastName: z
      .string({ invalid_type_error: "Field has to be characters" })
      .optional(),
    oldPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "Password has to be 6 letters long")
      .optional(),
  });

  const toggleCard = () => {
    setShowCard(!showCard);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getFieldState,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (res.ok) {
        await update({ ...session, user: { ...response.res } });
        reset();
        setError("");
        setEditInfo(false);
        setChangePassword(false);
      }
      if (response.error === "incorrect password") {
        setError(response.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex space-x-5 items-center ">
        <div className="avatar w-[10rem] h-[10rem]">
          <Image
            src={user?.photoUrl ? user?.photoUrl : noUser}
            width={100}
            height={100}
            alt="image"
            priority={true}
            className="rounded-full object-cover"
          />
        </div>
        <span
          onClick={toggleCard}
          className="text-lg btn rounded-full btn-ghost "
        >
          <FaRegPenToSquare />
        </span>
      </div>
      {!user ? (
        <div>
          <div className="skeleton h-10 w-full mt-8 sm:w-96 mb-4"></div>
          <div className="skeleton h-10 w-full sm:w-96 mb-4"></div>
          <div className="skeleton h-10 w-full sm:w-96 mb-4"></div>
          <div className="skeleton h-10 w-full sm:w-96 mb-4"></div>
          <div className="skeleton h-12 w-24 mb-4"></div>
        </div>
      ) : (
        <>
          <form
            autoComplete="off"
            className="mt-8 flex flex-col"
            onSubmit={handleSubmit(submit)}
          >
            <input
              disabled={!editInfo}
              {...register("firstName")}
              type="text"
              placeholder={!editInfo ? user?.firstName : "First Name"}
              className="input input-bordered w-full sm:w-96 capitalize mb-4 "
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
            <input
              disabled={!editInfo}
              {...register("lastName")}
              type="text"
              placeholder={!editInfo ? user?.lastName : "Last Name"}
              className="input input-bordered w-full sm:w-96 mb-4 capitalize  "
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
            {!editInfo && (
              <input
                disabled={true}
                type="text"
                placeholder={user && user?.email}
                className="input input-bordered w-full sm:w-96 mb-4"
              />
            )}
            <div className="flex flex-row">
              <input
                {...register("oldPassword")}
                disabled={!changePassword}
                type="password"
                placeholder={!editInfo ? "*********" : "Old Password"}
                className="input input-bordered w-full sm:w-96 mb-4"
              />
              {editInfo && (
                <span
                  onClick={() => setChangePassword(!changePassword)}
                  className="btn btn-ghost"
                >
                  {changePassword ? <FaTimes /> : <FaRegPenToSquare />}
                </span>
              )}
            </div>
            {error && <span className="text-error">{error}</span>}

            {changePassword && (
              <>
                <input
                  {...register("newPassword")}
                  type="password"
                  placeholder="New Password"
                  className="input input-bordered w-full sm:w-96 mb-4"
                />
                {errors.newPassword && (
                  <span className="text-error">
                    {errors.newPassword.message}
                  </span>
                )}
              </>
            )}
            {editInfo && (
              <>
                <div className="flex flex-row gap-3 mt-5">
                  <button
                    disabled={loading}
                    type="submit"
                    className="block btn btn-primary"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <div
                    className="btn btn-error"
                    onClick={() => {
                      setEditInfo(false);
                      setError("");
                      reset();
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </>
            )}
          </form>
          {!editInfo && (
            <div
              className="btn btn-active"
              onClick={() => {
                setEditInfo(true);
              }}
            >
              Edit info
            </div>
          )}
        </>
      )}
      {showCard && <ImageUploadCard toggleCard={toggleCard} />}
    </div>
  );
};

export default UserProfile;
