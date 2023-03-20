import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Message from "../Messages/Message";
import NewMessage from "../Messages/NewMessage";
import UserMessage from "../Messages/UserMessage";
import UserMessageFrom from "../Messages/UserMessageFrom";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../Context";
import { getidconversation, putReadConversation } from "../../utils/service";
import UserDetail from "../Users/UserProfile";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { deletconversation } from "../../Redux/reducer";
import { getProfileById } from "../../Redux/reducer";
const ENDPOINT = "http://localhost:3001/";
export default function Conversation({ selectedUserId, onDeleteUser }) {
  const dropdownBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const socket = io(ENDPOINT);
  const [currentUser, setCurrentUser] = useState(null);
  const [idconversa, setIdconversa] = useState(null);
  const userDetails = useAuthState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const objfindconversation = {
    user2: selectedUserId,
    user1: userDetails.user.user.id,
  };
  const navigate = useNavigate();
  const loadingdeleteConversation = useSelector(
    (state) => state.data.loadingDeleteCon
  );
  const deletesuccesConversation = useSelector(
    (state) => state.data.deleteConversationSuccess
  );
  const deleteErrorConversation = useSelector(
    (state) => state.data.deleteConversationError
  );
  const getprofile = useSelector((state) => state.data.profile);

  useEffect(() => {
    setCurrentUser(userDetails.user.user.id);
  }, []);
  useEffect(() => {
    getidconversation(objfindconversation)
      .then((su) => setIdconversa(su))
      .catch((error) => console.log(error));
  }, [selectedUserId]);
  useEffect(() => {
    socket.emit("join", idconversa);
  }, [idconversa]);
  useEffect(() => {
    dispatch(getProfileById(selectedUserId));
  }, [selectedUserId]);
  useEffect(() => {
    socket.on("connection", (message) => {
      console.log("conected to server socket", message);
    });
    setIsLoading(true);
    socket.emit("getmessage", { id: idconversa });
    socket.on("getmessage", (messages) => {
      setMessages(messages);
      putReadConversation(idconversa)
        .then((su) => console.log(su))
        .catch((err) => console.log(err));
      setIsLoading(false);
    });
    socket.on("message", (data) => {
      setMessages(data);
      putReadConversation(idconversa)
        .then((su) => console.log(su))
        .catch((err) => console.log(err));
      setIsLoading(false);
    });
    return () => {
      socket.off("message");
    };
  }, [idconversa]);
  useEffect(() => {
    if (deleteErrorConversation) {
      return <div>{deleteErrorConversation}</div>;
    }
    if (deletesuccesConversation) {
      setMessages([]);
    }
  }, [deletesuccesConversation]);
  const handleSendMessage = (e) => {
    e.preventDefault();
    const body = {
      idconversa,
      message,
      user2: selectedUserId,
      user1: userDetails.user.user.id,
      sender_id: userDetails.user.user.id,
      receiver_id: selectedUserId,
    };
    socket.emit("message", body);
    setMessage("");
  };
  const handaboutprofile = () => {
    navigate(`/profiles/${selectedUserId}`);
  };
  const handledeleConversation = async () => {
    if (!deleted) {
      try {
        setDeleted(true);
        await dispatch(deletconversation(idconversa));
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        showDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);
  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !dropdownBtnRef.current.contains(e.target)
    ) {
      setShowDropdown(false);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (deleteErrorConversation) {
    return <div>{deleteErrorConversation}</div>;
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-5/6 overflow-y-auto">
        <div className="flex flex-row">
          <div className="flex flex-row" style={{ flexGrow: 5 }}>
            <UserDetail User={getprofile} />
          </div>
          <div
            className="flex flex-row-reverse pr-3 pt-3 pb-2 "
            style={{ flexGrow: 1 }}
          >
            <button
              className=""
              ref={dropdownBtnRef}
              onClick={handleDropdownToggle}
            >
              <FontAwesomeIcon
                icon={faEllipsis}
                className="h-10 w-10  text-black rounded-full  transition duration-500 ease-in-out  hover:scale-125 hover:bg-slate-400"
              />
            </button>
            {showDropdown && (
              <div
                className="absolute right-0 mt-12 w-60 p-4"
                ref={dropdownRef}
                onClick={(e) => e.stopPropagation()}
              >
                <ul className=" bg-white list-none  rounded-lg shadow-2xl z-10">
                  <li
                    className="px-2 py-2 w-full cursor-pointer hover:bg-slate-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteUser();
                    }}
                  >
                    Cerrar Chat
                  </li>
                  <li
                    className="px-2 py-2 w-full cursor-pointer hover:bg-slate-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handledeleConversation();
                    }}
                    disabled={deleted}
                  >
                    Borrar Conversacion
                  </li>
                  <li
                    className="px-2 py-2 w-full cursor-pointer hover:bg-slate-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handaboutprofile();
                    }}
                  >
                    Informacion Del Contacto
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <hr />
        {Array.isArray(messages) ? (
          messages.map((mens, index) => (
            <div key={index}>
              {mens.sender_id === currentUser ? (
                <UserMessage msg={mens} />
              ) : (
                <div className="flex justify-end">
                  <UserMessageFrom msg={mens} className="flex justify-end" />
                </div>
              )}
            </div>
          ))
        ) : (
          <>No Hay Mensages</>
        )}

        <form onSubmit={(e) => handleSendMessage(e)}>
          <div className="flex flex-row items-center m-2">
            <div className="basis-1.5/12">
              <button className="border-solid hover:bg-sky-300 py-2 px-6 border border-blue hover:border-transparent rounded place-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                  />
                </svg>
              </button>
            </div>
            <div className="basis-11/12">
              <input
                type="text"
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full  px-4 py-1.5 rounded border border-solid border-gray-300 bg-white bg-clip-padding
           focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none"
                placeholder="New Message"
              />
            </div>
            <div className="basis-1.5/12">
              <button
                type="submit"
                className="items-center border-solid hover:bg-sky-300 py-2 px-6 border border-blue hover:border-transparent rounded place-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
