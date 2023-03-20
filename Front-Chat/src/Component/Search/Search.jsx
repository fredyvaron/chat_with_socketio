import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchUserByName } from "../../Redux/reducer";
import User from "../Users/User";
import UserSearch from "../Users/UserSearch";

const Search = ({userId}) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState("");
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const listusers = useSelector((state) => state.data.searchuser);
  const errorusers = useSelector((state) => state.data.errorSearch);
  const navigate = useNavigate()
  useEffect(() => {
    if (search.length > 0) {
      dispatch(searchUserByName(search));
      console.log("busco");
      setUsers(listusers);
      setError(errorusers);
    }
  }, [search]);
  const handlechange = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  const handlesubmit = (e) => {
    e.preventDefault();
  }
  const handleUserClick = (user) => {
    if (userId.user.user && user.id === userId.user.user.id) {
      navigate("/profile/");
    } else {
      navigate(`/profiles/${user.id}`);
    }
  };
  return (
    <div className="bg-slate-50" onSubmit={(e)=> handlesubmit(e)}>
      <form className="flex items-center">
        <label htmlFor="form_search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
            type="text"
            id="form_search"
            name="search"
            placeholder="Search"
            required
            onChange={(e) => handlechange(e)}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <div>
        {showResults && (
          <div className="flex justify-center">
            {errorusers ? <p>{errorusers}</p> : null}
            <ul>
              {listusers && listusers.length > 0 ? (
                listusers.map((user)=><div key={user.id} onClick={()=> handleUserClick(user)}><UserSearch name={user.nombre} image={user.image}/></div> )
              ) : (
                null
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
