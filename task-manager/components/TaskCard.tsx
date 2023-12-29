"use client";
import { useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import NewTaskCard from "./NewTaskCard";
import { useRetrieval } from "@/hooks/useRetrieval";
import UpdateTaskCard from "./UpdateTaskCard";
import { TaskProps } from "@/types";
import { signOut } from "next-auth/react";

const TaskCard = () => {
  const [showCard, setShowCard] = useState(false);
  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const [id, setId] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const { retrieval } = useRetrieval();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(true);

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

  const deletedTask = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch("api/tasks", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ id }),
      });
      console.log(res);
      const data = await retrieval();
      setTasks(data.tasks);
    } catch (error) {
      console.log("there was an error", error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (id: string, complete: boolean) => {
    try {
        setLoading(true)
        
      const res = await fetch("api/tasks", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, complete }),
      });
      console.log(res)
      const data = await retrieval();
      console.log(data)
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }finally{
        setLoading(false)
    }
  };

  return (
    <>
      <div>
        <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          {tasks?.map((task) => {
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
                className="bg-base-100 card border w-full h-[18rem] max-sm:h-auto border-stone-700  "
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
                      disabled={loading}
                        onClick={() => {
        setComplete(!complete);
                          completeTask(task._id, complete);
                        }}
                        className={`btn btn-sm ${
                          task.complete ? "btn-success" : "btn-error"
                        }  rounded-full`}
                      >
                        {task.complete ? "Complete" : "Incomplete"}
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
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            deletedTask(task._id);
                          }}
                        >
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
            className="bg-base-100 card border w-full max-sm:h-auto h-[18rem] border-stone-700 flex justify-center items-center cursor-pointer hover:bg-base-300 py-5 "
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
