"use client";
import { useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import NewTaskCard from "./NewTaskCard";
import { set } from "mongoose";
import { useRetrieval } from "@/hooks/useRetrieval";
import UpdateTaskCard from "./UpdateTaskCard";

export interface TaskProps {
  title: string;
  description: string;
  dateTime: Date;
  _id: string;
  completed: boolean;
  important: boolean;
}

const TaskCard = () => {
  const [showCard, setShowCard] = useState(false);
  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const [id, setId] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const { retrieval } = useRetrieval();

  useEffect(() => {
    const retrieve = async () => {
      const res = await retrieval();
      setTasks(res.tasks);
    };
    retrieve();
  }, []);

  const toggleCard = () => {
    setShowCard(!showCard);
  };
  const toggleUpdateCard = () => {
    setShowUpdateCard(!showUpdateCard);
  };

  const deletedTask = async (id : string) => {
    try {
      const res = await fetch("api/tasks", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ id }),
      });
      console.log(res)
      const data = await retrieval()
      setTasks(data.tasks)
    } catch (error) {
      console.log("there was an error", error);
    }
  };

  return (
    <>
      <div className="card w-full h-[96vh] bg-base-300 border border-stone-700 shadow-2xl p-5 overflow-hidden hover:overflow-y-scroll">
        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          {tasks.map((task) => {
            const date = new Date(task.dateTime).toISOString().split("T")[0];
            const time = new Date(task.dateTime).toTimeString().split(" ")[0];
            const formattedTime = time
              .split(" ")[0]
              .split(":")
              .slice(0, 2)
              .join(":");
            return (
              <div
                key={task._id}
                className="bg-base-100 card border w-full h-[18rem] border-stone-700  "
              >
                <div className="card-body justify-between">
                  <div className="">
                    <h2 className="card-title capitalize">{task.title}</h2>
                    <p>{task.description}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{`${date} ${formattedTime}`}</span>
                    <div className="flex justify-between items-center ">
                      <button
                        onClick={() => (task.completed = true)}
                        className={`btn btn-sm ${
                          task.completed ? "btn-success" : "btn-error"
                        }  rounded-full`}
                      >
                        {task.completed ? "Complete" : "Incomplete"}
                      </button>
                      <div className="justify-between flex items-center text-xl  space-x-2">
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            toggleUpdateCard();
                            setId(task._id);
                          }}
                        >
                          <FaEdit />
                        </div>
                        <div className="cursor-pointer" onClick={() => {
                          // setId(task._id)
                          deletedTask(task._id)
                        }}>
                          <IoTrashBin />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            onClick={() => {
              toggleCard();
            }}
            className="bg-base-100 card border w-full  h-[18rem] border-stone-700 flex justify-center items-center cursor-pointer hover:bg-base-300 "
          >
            <FaPlus />
            <span>Add a new task</span>
          </div>
        </div>
      </div>
      {showCard && <NewTaskCard toggleCard={toggleCard} setTasks={setTasks} />}
      {showUpdateCard && (
        <UpdateTaskCard
          toggleCard={toggleUpdateCard}
          setTasks={setTasks}
          id={id}
        />
      )}
    </>
  );
};

export default TaskCard;
