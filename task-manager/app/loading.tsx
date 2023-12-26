import React from "react";

const loading = () => {
  return (
    <div className="h-[100vh] w-full z-50 left-0 top-0 bg-base-300 flex">
      <div className=" h-full w-full justify-center items-center flex">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};

export default loading;
