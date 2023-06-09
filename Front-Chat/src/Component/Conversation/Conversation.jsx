import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPaperPlane,
  faSpinner,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import Message from "../Messages/Message";
import NewMessage from "../Messages/NewMessage";
import UserMessage from "../Messages/UserMessage";
import UserMessageFrom from "../Messages/UserMessageFrom";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
/* import { useAuthState } from "../../Context";
import { getidconversation, putReadConversation } from "../../utils/service"; */
import UserDetail from "../Users/UserProfile";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { deletconversation } from "../../Redux/reducer";
import { getProfileById } from "../../Redux/reducer";
import { putReadConversation } from "../../utils/service";
const ENDPOINT = import.meta.env.VITE_REACT_APP_URL_LOCAL;
console.log(ENDPOINT, "endpoint");
export default function Conversation({
  selectedUserId,
  onDeleteUser,
  userDetaile,
  idconversation,
}) {
  const dropdownBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const socket = io(ENDPOINT);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
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

  console.log(currentUser, "currentUser");
  const getprofile = useSelector((state) => state.data.profile);
  console.log(idconversation, "idconversacion");
  console.log(userDetaile, "detalles de usuario");
  useEffect(() => {
    setCurrentUser(userDetaile.user.user.id);
  }, []);
  useEffect(() => {
    if (!idconversation) {
      console.log("no tiene id de conversation");
      return <Loading />;
    }
  }, [idconversation]);

  useEffect(() => {
    socket.emit("join", idconversation);
  }, [idconversation]);
  useEffect(() => {
    dispatch(getProfileById(selectedUserId));
  }, [selectedUserId]);
  useEffect(() => {
    socket.on("connection", (message) => {
      console.log("conected to server socket", message);
    });
    setIsLoading(true);
    socket.emit("getmessage", { id: idconversation });
    console.log(idconversation, "conversation idsss did sds");
    socket.on("getmessage", (message) => {
      console.log(message, "getmessage");
      setMessages(message);
      putReadConversation(idconversation)
        .then((su) => console.log(su))
        .catch((err) => console.log(err));
      setIsLoading(false);
      console.log(messages, "messages in usefect");
    });
    socket.on("message", (data) => {
      console.log(data, "data of messaage");
      setMessages(data);
      putReadConversation(idconversation)
        .then((su) => console.log(su, "su de read conversation"))
        .catch((err) => console.log(err, "error de read conversation"));
      setIsLoading(false);
      console.log(message, "message of conversation useefect getmessage");
    });
    const readnotification = {
      userId: userDetaile.user.user.id,
      conversationId: idconversation,
    };
    console.log(readnotification, "readnotification");
    socket.emit(
      "conversationRead",
      readnotification.userId,
      readnotification.conversationId
    );
    return () => {
      socket.off("message");
    };
  }, [idconversation]);
  useEffect(() => {
    if (deleteErrorConversation) {
      return <div>{deleteErrorConversation}</div>;
    }
    if (deletesuccesConversation) {
      setMessages([]);
    }
  }, [deletesuccesConversation]);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (navigator.onLine) {
      console.log("seleccion enviar mensaje");
      const body = {
        idconversation,
        message,
        user2: selectedUserId,
        user1: userDetaile.user.user.id,
        sender_id: userDetaile.user.user.id,
        receiver_id: selectedUserId,
      };
      console.log(body, "body de send message");
      setIsSending(true);
      try {
        const messages = await socket.emit("message", body);
        console.log(messages);
        // Actualizar los estados correspondientes
        setMessage("");
        setSendError(null);
        setIsSending(false);
        console.log(isLoading, "isloading");
      } catch (error) {
        console.error(error);
        setSendError(response.error);
        setIsSending(false);
        // Actualizar el estado de error correspondiente
      }
      setIsSending(false);
      const notification = {
        text: "Tienes una nueva notificación",
        user_receiver: selectedUserId,
        user_sender: userDetaile.user.user.id,
        message,
        conversation_id: idconversation,
      }; // Crear un objeto de notificación con el texto de la notificación y el ID del destinatario

      socket.emit("sendNotification", notification);
    } else {
      console.log("El navegador está desconectado");
      setSendError("El Navegador está desconectado, intente de nuevo");
    }
  };
  const retrySend = (e) => {
    e.preventDefault();
    setIsSending(false);
    setSendError(null);
    const simulatedEvent = { preventDefault: () => {} };
    handleSendMessage(simulatedEvent);
  };
  const handaboutprofile = () => {
    console.log(selectedUserId, "selectedUserId");
    console.log("seleccion handleabout profile ");
    navigate(`/profiles/${selectedUserId}`);
  };
  const handledeleConversation = async () => {
    if (!deleted) {
      try {
        setDeleted(true);
        await dispatch(deletconversation(idconversation));
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  if (isLoading) {
    return <Loading />;
  }
  if (deleteErrorConversation) {
    return <div>{deleteErrorConversation}</div>;
  }
  console.log(message, "mensajes");
  return (
    <div>
      {/* inicio compontente conversation  */}
      <div className="h-full flex flex-col">
        {/* Inicio detalle perfil */}
        <div className="flex flex-row">
          <div className="flex flex-row" style={{ flexGrow: 5 }}>
            {getprofile ? <UserDetail User={getprofile} /> : <Loading />}
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
        {/* fin detalle perfil */}
        <hr />

        {/* Sección de mensajes */}
        <div
          className="flex-grow overflow-y-auto h-full"
          style={{ maxHeight: "65vh" }}
        >
          {Array.isArray(messages) ? (
            messages?.map((mens, index) => (
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
            <>No hay mensajes</>
          )}
  
        </div>
        {/* Formulario de envío de mensajes */}
        {/* Inicio Formulario envio mensaje */}
        <div>
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
                {sendError ? (
                  <div>
                    <button
                      onClick={retrySend}
                      className="border-solid hover:bg-sky-300 py-2 px-6 border border-blue hover:border-transparent rounded place-content-center"
                    >
                      <FontAwesomeIcon icon={faRepeat} />
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={isSending}
                    onClick={handleSendMessage}
                    className="border-solid hover:bg-sky-300 py-2 px-6 border border-blue hover:border-transparent rounded place-content-center"
                  >
                    <span>
                      {isSending ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        <FontAwesomeIcon icon={faPaperPlane} />
                      )}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        {/* Fin Formulario envio nuevo mensaje */}
      </div>
    </div>
  );
}
