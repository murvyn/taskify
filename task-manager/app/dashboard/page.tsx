"use client";
import TaskBox from "@/components/TaskBox";
import { TaskContext } from "@/contexts/taskContext";
import { isSameTime } from "@/helpers";
import { TaskProps } from "@/types";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const DashBoardRoute = () => {
  const { tasks } = useContext(TaskContext);
  const [ready, setReady] = useState<TaskProps[]>([]);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const currentDate = useMemo(() => new Date(), []);

  const toggleNotification = useCallback(() => {
    setNotificationEnabled((prev) => !prev);
  }, []);

  useEffect(() => {
    const checkForReadyTasks = () => {
      const taskReady = tasks?.filter((task) => {
        const taskDateTime = new Date(task.dateTime);
        const currentDat = new Date();
        return isSameTime(currentDat, taskDateTime) && !task.complete;
      });
      taskReady && setReady(taskReady);
      console.log(ready)
      if (ready.length > 0 && "Notification" in window && notificationEnabled) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            ready?.forEach((task) => {
              new Notification("Task Ready", {
                body: `It's time to "${task.title}" `,
              });
            });
          } else if (permission === "denied") {
            Notification.requestPermission().then((permission) =>
              console.log(permission)
            );
          }
        });
      }
    };

    // Check for ready tasks every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(checkForReadyTasks, 30000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [tasks, currentDate, ready, notificationEnabled]);
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
