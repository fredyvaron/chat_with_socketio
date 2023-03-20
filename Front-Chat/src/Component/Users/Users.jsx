import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users } from "../../Redux/reducer";
import User from "./User";

export default function Users({ onUserSelection }) {
  const handleSelection = (userId) => {
    onUserSelection(userId);
    console.log(onUserSelection,"selected")
  };
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.data.users);
  useEffect(() => {
    dispatch(get_all_users());
  }, []);
  return (
    <div className="h-screen overflow-hidden">
      <div className="h-5/6 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {users?.map((user) => (
            <div key={user.id} onClick={() => handleSelection(user.id)}>
              <User User={user} />
              <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
