import React, { useEffect, useState } from "react";
import imguserselect from "../../assets/undraw_online_discussion_re_nn7e.svg";
import Users from "../Users/Users";
import Conversation from "../Conversation/Conversation";
import { useParams } from "react-router-dom";
import { useAuthState } from "../../Context/";
import { getidconversation } from "../../utils/service";
import Search from "../Search/Search";

export default function Message() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [idconversa, setIdconversa] = useState(null);
  const [loading, setLoading] = useState(true);
  const userDetails = useAuthState();
  const { idUser } = useParams();
  const objfindconversation = {
    user2: selectedUser,
    user1: userDetails.user.user.id,
  };
  console.log(userDetails, "detalles de usuario");
  const handleUserSelection = (userId) => {
    setSelectedUser(userId);
    console.log("selected user", selectedUser);
  };
  const handleDeleteUser = () => {
    setSelectedUser(null);
  };
  useEffect(() => {
    setSelectedUser(idUser);
    console.log(idUser, "selected", selectedUser);
  }, [idUser]);

  useEffect(() => {
    if (!selectedUser) return;
    setLoading(true);
    getidconversation(objfindconversation)
      .then((su) => {
        console.log(su, "resultado de getidconversation");
        if (su !== null) {
          setIdconversa(su);
          console.log(
            "se cambio el id en setidconversation por el usefect",
            setIdconversa
          );
        }
        setLoading(false);
      })
      .catch((error) =>
        console.log(error, "error de useefect de getidconversation en message")
      );
    setLoading(false);
  }, [selectedUser]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col sm:flex-row ml-10 mt-10 mr-10 h-5/6 ">
        <div className="border-solid border border-gray-400 bg-gray-700 text-white sm:basis-full basis-1/2 md:basis-1/4">
          <Search userId={userDetails} />
          <Users onUserSelection={handleUserSelection} />
        </div>

        <div className="border-solid border border-gray-400 sm:basis-full basis-1/2 md:basis-3/4 ">
          {loading || !selectedUser || !idconversa ? (
            <div className="h-full flex justify-center items-center">
              <img
                src={imguserselect}
                alt=""
                className="w-full h-full object-contain bg-slate-50"
              />
            </div>
          ) : (
            <Conversation
              selectedUserId={selectedUser}
              onDeleteUser={handleDeleteUser}
              userDetaile={userDetails}
              idconversation={idconversa}
            />
          )}
        </div>
      </div>
    </div>
  );
}
