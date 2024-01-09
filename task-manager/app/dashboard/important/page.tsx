"use client";
import React, { Suspense, useContext } from "react";
import { TaskContext } from "@/contexts/taskContext";
import Loading from "../../loading";

const TaskCard = React.lazy(() => import("@/components/TaskCard"));

const ImportantBox = () => {
  const { tasks } = useContext(TaskContext);
  const importantTasks = tasks?.filter((task) => task.important === true);
  return (
    <>
      <div >
        <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
          Important
          <span className=" w-1/12 h-1 bg-primary"></span>
        </h2>
        <Suspense fallback={<Loading />}>
          <TaskCard tasks={importantTasks} />
        </Suspense>
      </div>
    </>
  );
};

export default ImportantBox;
