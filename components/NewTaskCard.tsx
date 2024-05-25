"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import { z } from "zod";
import { useRetrieval } from "@/hooks/useRetrieval";
import { TaskContext } from "@/contexts/taskContext";
import { ToggleProps } from "@/types";
import toast from "react-hot-toast";

interface TaskData {
  title: string;
  description: string;
  important: boolean | any;
  date: string;
  time: string;
  _id: string;
}

const NewTaskCard = ({ toggleCard }: ToggleProps) => {
  const [loading, setLoading] = useState(false);
  const { retrieval } = useRetrieval();
  const { setTasks } = useContext(TaskContext);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const current = `${currentYear}-${currentMonth}-${currentDay}`;

  const schema = z.object({
    title: z.string().nonempty("Title is required!"),
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
      important: false,
      date: current,
      description: "",
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
      await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, time, description, date, important }),
      });
      const data = await retrieval();
      setTasks(data.tasks);
      toggleCard();
      toast.success("Successfully created!");
    } catch (error) {
      toast.error("This is an error, try again!");
      console.log("there was an error", error);
      toggleCard();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 overflow-auto "></div>
      <div className="fixed overflow-auto z-40 h-full w-full justify-center items-center top-0 left-0 ">
        <div className="h-full w-full flex justify-center items-center">
          <div className="sm:card sm:w-[30rem] w-full h-full sm:h-[auto] flex justify-center items-center">
            <div className="sm:card-body overflow-auto sm:rounded-xl shadow-2xl w-full bg-base-300 h-full max-sm:p-4">
              <div className="flex max-sm:mb-5 justify-between items-center">
                <h1 className="card-title">Create a Task</h1>
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
                        <FaPlus />
                        <p>Create Task</p>
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

export default NewTaskCard;
