import React from "react";
import { BeatLoader } from "react-spinners";
const Loading = () => {
  console.log("Loading")
  return (
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#cacaca" loading={true} size={20} />
      <span className="ml-2 font-bold text-gray-500">Loading...</span>
    </div>
  );
};

export default Loading;
