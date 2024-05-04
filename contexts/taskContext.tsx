"use client";
import { isSameTime } from "@/helpers";
import { ChildrenProps, TaskContextProps, TaskProps } from "@/types";
import { createContext, useCallback, useEffect, useState } from "react";

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  setTasks: () => null,
  setImportantCount: () => null,
  setCompletedCount: () => null,
  setAllTaskCount: () => null,
  setTodayCount: () => null,
  importantCount: 0,
  completedCount: 0,
  allTaskCount: 0,
  todayCount: 0,
});

export const TaskProvider = ({ children }: ChildrenProps) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [importantCount, setImportantCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [allTaskCount, setAllTaskCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const currentDate = new Date()

  const taskReady = tasks?.filter((task) => {
    return isSameTime(new Date(task.dateTime), currentDate);
  });

  // const sendNotification = () => {
  //   if(window.Notification && Notification.permission === 'granted'){
  //     new Notification("Hello",{
  //       body: "This boss"
  //     })
  //   }
  // }

  // const requestNotification = useCallback(() => {
  //   if(window.Notification){
  //     Notification.requestPermission().then((result)=>{
  //       if(result === "granted"){
  //         console.log('User granted notification permission');
  //         sendNotification();
  //       }
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   if(window.Notification){
  //     requestNotification();
  //   }
  // }, [requestNotification])

  const value: TaskContextProps = {
    setTasks,
    tasks,
    importantCount,
    setImportantCount,
    completedCount,
    setCompletedCount,
    allTaskCount,
    setAllTaskCount,
    todayCount,
    setTodayCount,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
