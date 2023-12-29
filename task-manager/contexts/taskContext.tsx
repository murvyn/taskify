"use client";

import { useRetrieval } from "@/hooks/useRetrieval";
import { ChildrenProps, TaskContextProps, TaskProps } from "@/types";
import { createContext, useEffect, useState } from "react";

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
