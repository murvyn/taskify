"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { z } from "zod";
import { useRetrieval } from "@/hooks/useRetrieval";
import { GrUpdate } from "react-icons/gr";
import { TaskContext } from "@/contexts/taskContext";
import { TaskProps } from "@/types";
import { getDate, getTime } from "@/helpers";
import { toast } from "react-hot-toast";

interface TaskData {
  title: string;
  description: string;
  important: boolean | any;
  date: string;
  time: string;
  _id: string;
}
interface Props {
  toggleCard: () => void;
  task: TaskProps;
}

const UpdateTaskCard = ({ toggleCard, task }: Props) => {
  const [loading, setLoading] = useState(false);
  const { retrieval } = useRetrieval();
  const { setTasks } = useContext(TaskContext);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const current = `${currentYear}-${currentMonth}-${currentDay}`;

  const id = task._id;
  const date = getDate(task.dateTime);
  const time = getTime(task.dateTime);

  const schema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().optional(),
    important: z.boolean().default(false),
    date: z
      .string()
      .refine(
        (date) => {
          const inputDate = new Date(date);
          const inputDay = inputDate.getDate();
          const inputMonth = inputDate.getMonth() + 1;
          const inputYear = inputDate.getFullYear();
          const input = `${inputYear}-${inputMonth}-${inputDay}`;
          return input >= current;
        },
        { message: "Date should be today or later" }
      )
      .transform((date) => {
        const currentDate = new Date(date);
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        return `${currentYear}-${currentMonth}-${currentDay}`;
      }),
    time: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TaskData>({
    resolver: zodResolver(schema),
    defaultValues: {
      important: task.important,
      date: date,
      time: time,
      title: task.title,
      description: task.description,
    },
  });

  const submit = async ({
    title,
    time,
    description,
    date,
    important,
  }: TaskData) => {
    try {
      setLoading(true);
      const taskDate = new Date(`${date} ${time}`);
      if (taskDate < currentDate) {
        setError("time", {
          message: "You have so set future tasks!",
        });
        return;
      }
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, time, description, date, important, id }),
      });
      const data = await retrieval();
      setTasks(data.tasks);
      toast.success("Successfully updated!");
    } catch (error) {
      toast.error("This is an error, try again!");
      console.log("there was an error", error);
    } finally {
      toggleCard();
      setLoading(false);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50"></div>
      <div className="fixed z-40 h-full w-full justify-center items-center top-0 left-0 ">
        <div className="h-full w-full flex justify-center items-center">
          <div className="card w-[30rem] max-sm:w-auto h-auto flex justify-center items-center ">
            <div className="card-body rounded-xl shadow-2xl w-full bg-base-300  ">
              <div className="flex justify-between items-center">
                <h1 className="card-title">Update a Task</h1>
                <FaTimes className="cursor-pointer" onClick={toggleCard} />
              </div>
              <form onSubmit={handleSubmit(submit)}>
                <div className="w-full form-control">
                  <label
                    htmlFor="title"
                    className="label-text flex flex-col mt-4"
                  >
                    Title
                    <input
                      {...register("title", { required: true })}
                      name="title"
                      placeholder="Task title..."
                      type="text"
                      className="mt-3 input input-bordered w-full"
                    />
                  </label>
                  {errors.title && (
                    <span className="text-error text-sm">
                      {errors.title.message}
                    </span>
                  )}
                </div>
                <div className="w-full form-control">
                  <label
                    htmlFor="description"
                    className=" label-text flex flex-col mt-4"
                  >
                    Description
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    name="description"
                    placeholder="eg. Watch new movie"
                    rows={4}
                    className="mt-3 textarea textarea-bordered w-full"
                  />
                  {errors.description && (
                    <span className="text-error text-sm">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <div className="w-full form-control">
                  <label
                    htmlFor="date"
                    className="label-text flex flex-col mt-4"
                  >
                    Date
                    <input
                      {...register("date", { required: true })}
                      name="date"
                      type="date"
                      className="mt-3 input input-bordered w-full"
                    />
                  </label>
                  {errors.date && (
                    <span className="text-error text-sm">
                      {errors.date.message}
                    </span>
                  )}
                </div>
                <div className="w-full form-control">
                  <label
                    htmlFor="time"
                    className="label-text flex flex-col mt-4"
                  >
                    Time
                    <input
                      {...register("time", { required: true })}
                      name="time"
                      type="time"
                      className="mt-3 input input-bordered w-full"
                    />
                  </label>
                  {errors.time && (
                    <span className="text-error text-sm">
                      {errors.time.message}
                    </span>
                  )}
                </div>
                <div className=" mt-5 form-control flex flex-row items-center space-x-2 ">
                  <input
                    {...register("important", { required: true })}
                    title="important"
                    type="checkbox"
                    className="checkbox checkbox-secondary"
                  />
                  <label className="cursor-pointer label">
                    <span className="label-text">Important</span>
                  </label>
                </div>
                <div className="justify-end mt-7 flex">
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-primary w-[9rem]"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      <span className="flex space-x-1">
                        <GrUpdate />
                        <p>Update Task</p>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTaskCard;
