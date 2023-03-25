import React from "react";
import { BeatLoader } from "react-spinners";
const LoadingLogin = () => {
  console.log("Loading login");
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
    <div className="flex justify-center items-center h-screen">
      <BeatLoader color="#cacaca" loading={true} size={20} />
      <span className="ml-2 font-bold text-gray-500">Loading...</span>
    </div>
    </div>
  );
};

export default LoadingLogin;
