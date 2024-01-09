"use client";
import { ChildrenProps, TaskContextProps, TaskProps } from "@/types";
import { createContext, useState } from "react";

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
