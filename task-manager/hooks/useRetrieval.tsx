"use client";

import { TaskProps } from "@/components/TaskBox";
import { useState } from "react";

export const useRetrieval = () => {
  const retrieval = async () => {
    try {
      const data = await fetch("api/tasks", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-type": "application/json",
        },
      });
      return await data.json();
    } catch (error) {
      console.log("Retrieval error" , error);
    }
  };
  return {  retrieval };
};
