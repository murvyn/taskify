"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import { ZodType, z } from "zod";

interface TaskData {
  title: string;
  description: string;
  important: boolean;
  date: string
  time: string
}
interface Props {
  toggleCard: () => void;
}

const NewTaskCard = ({ toggleCard }: Props) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()
  const current = `${currentYear}-${currentMonth}-${currentDay}`

  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    important: z.boolean().default(false),
    date: z.string().refine(date => {
      const inputDate = new Date(date);
      const inputDay = inputDate.getDate()
      const inputMonth = inputDate.getMonth() + 1
      const inputYear = inputDate.getFullYear()
      const input = `${inputYear}-${inputMonth}-${inputDay}`

      return input >= current}, {message: "Date should be today or later" }).transform(date => {
        const currentDate = new Date(date)
        const currentDay = currentDate.getDate()
      const currentMonth = currentDate.getMonth()
      const currentYear = currentDate.getFullYear()
      return`${currentYear}-${currentMonth}-${currentDay}`
      }),
    time: z.string().refine(time => {
      // const currentTime = new Date();
      // const currentHour = currentTime.getHours()
      // const currentMinutes = currentTime.getMinutes()
      // const current = `${currentHour}:${currentMinutes}`
      return time
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>({ resolver: zodResolver(schema), defaultValues: {
    important: false,
    date: current,
    description: '',
    time: '08:00'
  } });

  const submit = (data: TaskData) => {
    console.log(data)
  }
  return (
    <>
      <div
        className="fixed top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50"
      ></div>
      <div className="fixed z-40 h-full w-full justify-center items-center top-0 left-0 ">
        <div className="h-full w-full flex justify-center items-center">
          <div className="card w-[30rem] max-sm:w-auto h-[30rem] flex justify-center items-center ">
            <div className="card-body rounded-xl shadow-2xl w-full bg-base-300  ">
              <div className="flex justify-between items-center">
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
                </div>
                 <div className="w-full form-control">
                  <label htmlFor="time" className="label-text flex flex-col mt-4">
                    Time
                    <input
                      {...register("time", { required: true })}
                      name="time"
                      type="time"
                      className="mt-3 input input-bordered w-full"
                    />
                  </label>
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
                    type="submit"
                    className="btn btn-primary"
                  >
                    <FaPlus />
                    Create Task
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
