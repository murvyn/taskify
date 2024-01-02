import { UserContext } from "@/contexts/userContext";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/taskSchema";
import { LoginUserProps, UserContextProps } from "@/types";
import { signIn } from "next-auth/react";
import { useContext } from "react";

export const loginUser = async ({ email, password }: LoginUserProps) => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  return res;
};

export const fetchUser = async ({setLoading, setUser, user}: UserContextProps) => {
  try {
    setLoading(true);
    const data = await fetch("api/user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const res = await data.json();
    setUser(res.user);
  } catch (error) {
    console.log(error);
  }finally{
    setLoading(false)
  }
};