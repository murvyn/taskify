"use client";
import React, { Suspense, useContext, useEffect } from "react";
import { TaskContext } from "@/contexts/taskContext";
import Loading from "@/app/loading";
import { UserContext } from "@/contexts/userContext";
import { fetchUser, isSameDate } from "@/helpers";
import { BiBell, BiSolidBellRing } from "react-icons/bi";

const TaskCard = React.lazy(() => import("./TaskCard"));

interface Props {
  notificationEnabled: boolean;
  toggleNotification: () => void;
}
const TaskBox = ({notificationEnabled, toggleNotification}: Props) => {
  const {
    tasks,
    setAllTaskCount,
    setCompletedCount,
    setImportantCount,
    setTodayCount,
    allTaskCount,
    completedCount,
    importantCount,
    todayCount,
  } = useContext(TaskContext);
  const completedTasks = tasks?.filter((task) => task.complete === true);
  const currentDate = new Date();
  const importantTasks = tasks?.filter((task) => task.important === true);
  const DoItTodayTasks = tasks?.filter((task) => {
    return isSameDate(new Date(task.dateTime), currentDate);
  });
  useEffect(() => {
    setAllTaskCount(tasks!.length);
    setCompletedCount(completedTasks!.length);
    setTodayCount(DoItTodayTasks!.length);
    setImportantCount(importantTasks!.length);
  }, [
    allTaskCount,
    completedCount,
    importantCount,
    todayCount,
    DoItTodayTasks,
    importantTasks,
    tasks,
    completedTasks,
  ]);
  return (
    <>
      <div>
        <div className="flex flex-row space-x-4 ">
          <h2 className="card-title mb-5 w-auto flex flex-col items-start ">
            All Tasks
            <span className=" w-1/2 h-1 bg-primary"></span>
          </h2>
          <span onClick={toggleNotification} className="self-center -mt-5 text-2xl cursor-pointer">
            {notificationEnabled ? <BiSolidBellRing /> : <BiBell />}
          </span>
        </div>
        <Suspense fallback={<Loading />}>
          <TaskCard tasks={tasks} />
        </Suspense>
      </div>
    </>
  );
};

export default TaskBox;
