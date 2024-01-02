"use client";
import { ChildrenProps, TaskContextProps, TaskProps } from "@/types";
import { createContext, useState } from "react";

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  setTasks: () => null,
});

export const TaskProvider = ({ children }: ChildrenProps) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const value: TaskContextProps = {
    setTasks,
    tasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
