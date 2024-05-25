"use client";
import TaskBox from "@/components/TaskBox";
import { TaskContext } from "@/contexts/taskContext";
import { isSameDate, isSameTime } from "@/helpers";
import { TaskProps } from "@/types";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { scheduleJob } from "node-schedule";

const DashBoardRoute = () => {
  const { tasks } = useContext(TaskContext);
  const [ready, setReady] = useState<TaskProps[]>([]);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const toggleNotification = useCallback(() => {
    setNotificationEnabled((prev) => !prev);
  }, []);

  useEffect(() => {
    tasks?.forEach((task: TaskProps) => {
      const taskDateTime = new Date(task.dateTime);
      scheduleJob(taskDateTime, function () {
        if("Notification" in window && notificationEnabled){
          if (Notification.permission === "granted") {
            new Notification("Task Ready", {
              body: `It's time to "${task.title}" `,
            });
          } else if (Notification.permission === "denied") {
            Notification.requestPermission().then((permission) =>
              console.log(permission)
            );
          }
          } else if (Notification.permission === "default") {
            Notification.requestPermission().then((permission) =>
              console.log(permission)
            );
          }
      });
    });

    return () => {}; 
  }, [notificationEnabled, tasks]);
  return (
    <div className="w-full">
      <TaskBox
        toggleNotification={toggleNotification}
        notificationEnabled={notificationEnabled}
      />
    </div>
  );
};

export default DashBoardRoute;
