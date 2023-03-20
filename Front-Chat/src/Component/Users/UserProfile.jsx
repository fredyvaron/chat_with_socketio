import React from "react";
import user from "../../assets/icon-1633249.svg";
import { Link } from "react-router-dom";

export default function UserProfile({ User }) {
  return (
    <Link to={`/profiles/${User.id}`}>
      <div className="flex flex-row items-center py-4 px-4 cursor-pointer w-full">
        <img
          className=" h-16 w-16 rounded-full "
          src={User.image}
          alt="SVG as an image"
        />
        <div className="text-center md:p-4">{User.nombre}</div>
      </div>
    </Link>
  );
}
