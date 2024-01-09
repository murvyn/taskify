"use client";
import React, { Suspense, useContext } from "react";
import { TaskContext } from "@/contexts/taskContext";
import Loading from "../../loading";

const TaskCard = React.lazy(() => import("@/components/TaskCard"));

const CompletedBox = () => {
  const { tasks } = useContext(TaskContext);
  const completedTasks = tasks?.filter((task) => task.complete === true);
  return (
    <>
      <div>
        <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
          Completed
          <span className=" w-1/12 h-1 bg-primary"></span>
        </h2>
        <Suspense fallback={<Loading />}>
          <TaskCard tasks={completedTasks} />
        </Suspense>
      </div>
    </>
  );
};

export default CompletedBox;
