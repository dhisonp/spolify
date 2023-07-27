import React, { FC } from "react";

const Loading = () => {
  return (
    <div className="top-0 left-0 bg-black/50 fixed w-full h-full flex justify-center items-center">
      <span className="loading loading-dots loading-lg text-emerald-100"></span>
    </div>
  );
};

export default Loading;
