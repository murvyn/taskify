"use client";

export const useRetrieval = () => {
  const retrieval = async () => {
    try {
      const data = await fetch("/api/tasks", {
        method: "GET",
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
