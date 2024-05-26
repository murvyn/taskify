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
import ShowNotificationCard from "@/components/ShowNotificationCard";

const DashBoardRoute = () => {
  const { tasks } = useContext(TaskContext);
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(() => {
    if(typeof window !== 'undefined'){
      const storeValue = localStorage.getItem("notifications") 
      return storeValue? JSON.parse(storeValue) : true;
    }
  });
  const [showNotificationCard, setShowNotificationCard] = useState(false);

  const toggleNotification = useCallback(() => {
    setNotificationEnabled((prev) => !prev);

  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("notifications");
      if (storedValue !== null) {
        setNotificationEnabled(JSON.parse(storedValue));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('notifications', JSON.stringify(notificationEnabled));
    }
  }, [notificationEnabled]);

  useEffect(() => {
    if (
      notificationEnabled &&
      "Notification" in window &&
      (Notification.permission === "denied" ||
        Notification.permission === "default")
    ) {
      setShowNotificationCard(true);
    }
  }, [notificationEnabled]);

  useEffect(() => {
    tasks?.forEach((task: TaskProps) => {
      const taskDateTime = new Date(task.dateTime);
      scheduleJob(taskDateTime, function () {
        if ("Notification" in window && notificationEnabled) {
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
    <>
      {showNotificationCard && (
        <ShowNotificationCard setShowCard={setShowNotificationCard} />
      )}
      <div className="w-full">
        <TaskBox
          toggleNotification={toggleNotification}
          notificationEnabled={notificationEnabled}
        />
      </div>
    </>
  );
};

export default DashBoardRoute;
