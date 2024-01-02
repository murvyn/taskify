"use client";
import React, { Suspense, useContext, useEffect } from "react";
import { TaskContext } from "@/contexts/taskContext";
import Loading from "@/app/loading";
import { UserContext } from "@/contexts/userContext";
import { fetchUser } from "@/helpers";

const TaskCard = React.lazy(() => import("./TaskCard"));

const TaskBox = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <>
      <div>
        <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
          All Tasks
          <span className=" w-1/12 h-1 bg-primary"></span>
        </h2>
        <Suspense fallback={<Loading />}>
          <TaskCard tasks={tasks} />
        </Suspense>
      </div>
    </>
  );
};

export default TaskBox;
