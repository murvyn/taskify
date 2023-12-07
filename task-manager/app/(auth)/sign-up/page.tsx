import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl">Create An Account</h1>
        <form className="m-8 space-y-4">
          <div className="flex flex-row space-x-3">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <div className="flex flex-row space-x-3">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Sign up</button>
        </form>
        <div>
            <p>Already have an account? <Link href="/login" className="link link-primary hover:cursor-pointer">login</Link></p>
          </div>
      </div>
    </div>
  );
};

export default SignUp;
