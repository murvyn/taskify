import { LoginUserProps, UserContextProps } from "@/types";
import { signIn } from "next-auth/react";

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

export const getDate = (date: Date) => {
  const currentDate = new Date(date);
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  return `${currentYear}-${currentMonth}-${currentDay}`;
};

export const getTime = (date: Date) => {
  const currentDate = new Date(date);
  const currentHour = currentDate.getHours();
  const currentMin = currentDate.getMinutes();
  return `${currentHour}:${currentMin}`;
};

export const PastDate = (date: Date) => {
  const current = new Date();
  const taskDate = getDate(date)
  const currentDate = getDate(current)
  const taskTime = getTime(date)
  const currentTime = getTime(current)
  const currentFull = `${currentDate} ${currentTime}`
  const taskFull = `${taskDate} ${taskTime}`
  // console.log(taskFull >= currentFull, taskFull, currentFull, taskTime <= currentTime )
  return taskDate <= currentDate && taskTime <= currentTime
};
