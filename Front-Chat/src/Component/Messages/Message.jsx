import React, { useEffect, useState } from "react";
import imguserselect from "../../assets/undraw_online_discussion_re_nn7e.svg";
import Users from "../Users/Users";
import Conversation from "../Conversation/Conversation";
import { useParams } from "react-router-dom";

export default function Message({ match }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const { userId } = useParams();

  const handleUserSelection = (userId) => {
    setSelectedUser(userId);
  };
  const handleDeleteUser = () => {
    setSelectedUser(null);
  };
  useEffect(() => {
    setSelectedUser(userId);
  }, [userId]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col sm:flex-row ml-10 mt-10 mr-10 h-5/6 ">
        <div className="border-solid border border-gray-400 bg-gray-700 text-white sm:basis-full basis-1/2 md:basis-1/4">
          <Users onUserSelection={handleUserSelection} />
        </div>

        <div className="border-solid border border-gray-400 sm:basis-full basis-1/2 md:basis-3/4 ">
          {selectedUser ? (
            <Conversation selectedUserId={selectedUser} onDeleteUser={handleDeleteUser} />
          ) : (
            <div className="h-full flex justify-center items-center">
              <img src={imguserselect} alt="" className="w-full h-full object-contain bg-slate-50" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
