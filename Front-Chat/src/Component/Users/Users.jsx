import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_users } from "../../Redux/reducer";
import Loading from "../Loading/Loading";
import User from "./User";

export default function Users({ onUserSelection }) {
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const handleSelection = (userId) => {
    onUserSelection(userId);
    console.log(onUserSelection, "selected");
  };
  console.log(loading, "loading")

  const dispatch = useDispatch();
  const users = useSelector((state) => state.data.users);
  useEffect(() => {
    async function fetchData() {
      await dispatch(get_all_users());
      setDataLoaded(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      setLoading(false);
    }
  }, [dataLoaded]);
  return (
    <div className="h-screen overflow-hidden">
      <div className="h-5/6 overflow-y-auto">
        <div className="flex flex-col gap-2">

          {  loading ? (
          users?.map((user) => (
            <div key={user.id} onClick={() => handleSelection(user.id)}>
              <User User={user} />
              <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
          )
          )): (<Loading/>)}
        </div>
      </div>
    </div>
  );
}
