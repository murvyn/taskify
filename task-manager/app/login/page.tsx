"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z.string().nonempty("Password is required"),
  });

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitHandler = async ({ email, password }: FormData) => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      // console.log(res)
      router.replace("/")
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return (
    <>
      <div className="justify-center items-center w-100 h-[100vh] flex ">
        <div className="items-center flex flex-col">
          <h1 className="mb-3 text-3xl font-bold">Login</h1>
          <form
            className="w-96 m-8 space-y-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="mb-3">
              <input
                {...register("email", { required: true })}
                className="input input-bordered w-full "
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-error text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <input
                {...register("password", { required: true })}
                className="input input-bordered w-full "
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-error text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button className="btn btn-primary w-full" type="submit">
              Login
            </button>
          </form>
          <div>
            <p>
              Need an account?{" "}
              <Link
                href="/sign-up"
                className="link link-primary hover:cursor-pointer"
              >
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
