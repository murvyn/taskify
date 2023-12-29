import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/authOptions";
import { redirect } from "next/navigation";
import TaskBox from "@/components/TaskBox";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <>
      <div className="w-full">
        <TaskBox />
      </div>
    </>
  );
};

export default Home;
