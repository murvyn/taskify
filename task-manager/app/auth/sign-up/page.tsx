"use client";

import { loginUser } from "@/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { ZodType, z } from "zod";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const schema: ZodType<FormData> = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email(),
    password: z.string().nonempty("Password is required").min(5),
    confirmPassword: z
      .string()
      .superRefine(({ password, confirmPassword }: any, ctx) => {
        if (password !== confirmPassword) {
          ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Passwords do not match",
          });
        }
      }),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitHandler = async ({
    firstName,
    lastName,
    password,
    email,
  }: FormData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (data.error === "Email already exists") {
        toast.error("Email already exists", {
          duration: 3000,
          position: "bottom-left",
        });
        return;
      } else if (data.error) {
        toast.error("Something went wrong, try again", {
          duration: 3000,
          position: "bottom-left",
        });
        return;
      }
      if (res.ok) {
        await loginUser({ email, password });
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("an error ocurred", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="m-3">
        <span
          className="btn btn-ghost text-lg"
          onClick={() => router.push("/")}
        >
          {" "}
          <FaHome />{" "}
        </span>
      </div>
      <div className="fixed top-0 left-0 z-40 w-full h-full  ">
        <div className="items-center h-full w-full justify-center flex flex-col">
          <h1 className="mb-1 font-bold text-4xl">Join Taskify</h1>
          <h2 className="text-xl">Sign Up for Task Management</h2>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="max-w-100  m-8 space-y-4"
          >
            <div className="flex flex-row space-x-3">
              <div className="flex flex-col">
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered w-full "
                />
                {errors.firstName && (
                  <span className="text-error text-sm ">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered w-full"
                />
                {errors.firstName && (
                  <span className="text-error text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
            </div>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <span className="text-error text-sm">{errors.email.message}</span>
            )}
            <div className="flex flex-row space-x-3">
              <div className="flex flex-col">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
                {errors.password && (
                  <span className="text-error text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  {...register("confirmPassword", { required: true })}
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full"
                />
                {errors.confirmPassword && (
                  <span className="text-error text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-full"
            >
              {loading && (
                <span className="loading loading-dots loading-sm"></span>
              )}
              Sign up
            </button>
          </form>
          <div>
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="link link-primary hover:cursor-pointer"
              >
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
      {error && (
        <div className="toast">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
