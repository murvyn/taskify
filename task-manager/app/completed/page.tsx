"use client";
import React, { Suspense, useContext } from "react";
import CardLoading from "@/components/CardLoading";
import { TaskContext } from "@/contexts/taskContext";

const TaskCard = React.lazy(() => import("@/components/TaskCard"));

const CompletedBox = () => {
  const { tasks } = useContext(TaskContext);
  const completedTasks = tasks?.filter((task) => task.complete === true);
  return (
    <>
      <div className="card w-full h-[96vh] bg-base-300 border border-stone-700 shadow-2xl p-5 overflow-hidden sm:hover:overflow-y-scroll max-sm:overflow-y-scroll">
        <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
          Completed
          <span className=" w-1/12 h-1 bg-primary"></span>
        </h2>
        <Suspense fallback={<CardLoading />}>
          <TaskCard tasks={completedTasks} />
        </Suspense>
      </div>
    </>
  );
};

export default CompletedBox;
