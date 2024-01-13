import { IUser, LoginUserProps, UserContextProps } from "@/types";
import { signIn } from "next-auth/react";
import { UTApi } from "uploadthing/server";

export const loginUser = async ({ email, password }: LoginUserProps) => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  return res;
};

export const fetchUser = async ({
  setLoading,
  setUser,
  user,
}: UserContextProps) => {
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
  } finally {
    setLoading(false);
  }
};

export const isSameDate = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const isSameTime = (date1: Date, date2: Date) => {
  const currentHour = date1.getHours();
  const currentMinutes = date1.getMinutes();
  const current = `${currentHour}:${currentMinutes}`;
  const taskHour = date2.getHours();
  const taskMinutes = date2.getMinutes();
  const task = `${taskHour}:${taskMinutes}`;
  return task === current;
};
