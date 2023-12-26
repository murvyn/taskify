"use client";
import React, { Suspense } from "react";
import CardLoading from "./CardLoading";

const TaskCard = React.lazy(() => import('./TaskCard'))

const TaskBox = () => {
  return (
    <>
      <div className="card w-full h-[96vh] bg-base-300 border border-stone-700 shadow-2xl p-5 overflow-hidden hover:overflow-y-scroll">
        <Suspense fallback={<CardLoading />}>
          <TaskCard />
        </Suspense>
      </div>
      
    </>
  );
};

export default TaskBox;
