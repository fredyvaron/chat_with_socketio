import React from "react";
import user from "../../assets/icon-1633249.svg";

export default function UserImage() {
  return (
    <img
      className=" h-10 w-10 rounded-full border-2 border-solid  border-gray-700 hover:border-blue-500 hover:border-4 hover:cursor-pointer"
      src={user}
      alt="SVG as an image"
    />
  );
}
