"use client";
import React, { Suspense, useContext } from "react";
import CardLoading from "@/components/CardLoading";
import { TaskContext } from "@/contexts/taskContext";

const TaskCard = React.lazy(() => import("@/components/TaskCard"));

const DoItTodayBox = () => {
  const { tasks } = useContext(TaskContext);
  const currentDate = new Date();
  const isSameDate = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const DoItTodayTasks = tasks?.filter((task) => {
    return isSameDate(new Date(task.dateTime), currentDate);
  });
  return (
    <>
      <div className="card w-full h-[96vh] bg-base-300 border border-stone-700 shadow-2xl p-5 overflow-hidden sm:hover:overflow-y-scroll max-sm:overflow-y-scroll">
        <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
          Do It Today
          <span className=" w-1/12 h-1 bg-primary"></span>
        </h2>
        <Suspense fallback={<CardLoading />}>
          <TaskCard tasks={DoItTodayTasks} />
        </Suspense>
      </div>
    </>
  );
};

export default DoItTodayBox;
