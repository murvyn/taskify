import { connectDB } from "@/lib/mongodb";
import Task from "@/models/taskSchema";
import { LoginUserProps } from "@/types";
import { signIn } from "next-auth/react";

export const loginUser = async ({ email, password }: LoginUserProps) => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  return res;
};

export const completeTask = async (id: string, bool: boolean) => {
  try {
    await connectDB();
    const task = await Task.findById(id);
    task.complete = bool;
  } catch (error) {
    console.log(error)
  }
};
