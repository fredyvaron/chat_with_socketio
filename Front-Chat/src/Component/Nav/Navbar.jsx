import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/chat-2389223_640.png";
import { Link, useNavigate } from "react-router-dom";
import { logout, useAuthDispatch, useAuthState } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faMessage } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";

export default function Navbar() {
  const dropdownBtnRef1 = useRef(null);
  const dropdownRef1 = useRef(null);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const dropdownBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [navbar, setNavbar] = useState(false);
  let { isAuthenticated } = useAuthState();
  const userDetails = useAuthState();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const handlelogout = async (e) => {
    e.preventDefault();
    await logout(dispatch);
  };

  //dropdown version movil
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
      dropdownRef1.current &&
      !dropdownRef1.current.contains(e.target) &&
      !dropdownBtnRef1.current.contains(e.target)
    ) {
      setShowDropdown1(false);
    }

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
  const handleDropdownToggle1 = () => {
    setShowDropdown1(!showDropdown1);
  };
  useEffect(() => {
    const socket = io.connect("http://localhost:3001"); // Conectar al servidor WebSocket

    socket.on("connection", () => {
      console.log(`Conectado con ID ${socket.id}`);
    });
    console.log(userDetails.user.user);
    socket.emit("join", userDetails.user.user.id);
    socket.on("newNotification", (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setUnreadMessages((prevUnreadMessages) => prevUnreadMessages + 1);
      console.log(`Nueva notificación recibida: ${message}`);
    });

    return () => {
      socket.disconnect(); // Desconectar del servidor WebSocket cuando se desmonte el componente
    };
  }, []);
  return (
    <nav className="w-full bg-blue-400 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to={"/"}>
              <h2 className="text-2xl font-bold text-white">
                <img className="h-8 w-8" src={Logo} alt="Logo" />
              </h2>
            </Link>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li
                className="text-white hover:text-indigo-200 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="text-white hover:text-indigo-200 cursor-pointer"
                onClick={() => navigate("/about")}
              >
                About US
              </li>
              <li
                className="text-white hover:text-indigo-200 cursor-pointer"
                onClick={() => navigate("/contact")}
              >
                Contact US
              </li>
              <li className="text-white hover:text-indigo-200">
                <Link to={"/messages"} className="flex items-center">
                  <svg
                    class="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  <span className="ml-2">Message</span>
                </Link>
              </li>
            </ul>

            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              {isAuthenticated ? (
                <>
                  <button
                    className="inline-block w-full px-4 py-2 mt-3 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    onClick={(e) => handlelogout(e)}
                  >
                    Logout
                  </button>
                  <div className="relative">
                    <button
                      className="px-4 py-2 w-full text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                      ref={dropdownBtnRef}
                      onClick={handleDropdownToggle}
                    >
                      {"Bienvenido 👨️" + userDetails.user.user.nombre}
                    </button>
                    {showDropdown && (
                      <ul
                        className="absolute bg-white rounded-md shadow-md mt-2 w-40 list-none top-11 z-10"
                        ref={dropdownRef}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <li
                          className="px-4 py-2 hover:bg-gray-200"
                          onClick={() => navigate("/profile")}
                        >
                          Perfil
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to={"/login"}>
                    {" "}
                    <a className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                      Login
                    </a>
                  </Link>

                  <Link to={"/register"}>
                    {" "}
                    <a className="inline-block w-full px-4 py-2 mt-3 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100">
                      Register
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:inline-block">
          {isAuthenticated ? (
            <div className="flex">
              <button
                className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                onClick={(e) => handlelogout(e)}
              >
                Logout
              </button>
              <div className="relative">
                <button>
                  <FontAwesomeIcon
                    icon={faBell}
                    className="h-6 w-6 mr-1"
                    onClick={() => setShowNotifications(!showNotifications)}
                  />
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {unreadMessages}
                    {showNotifications}
                  </span>
                </button>
                {showNotifications && (
                  <ul className="absolute bg-white rounded-md shadow-md mt-2 w-72 list-none z-10">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                        onClick={()=> navigate(`/messages/${notification.user_sender}`)}
                      >
                        <span className="font-bold mr-2">
                          <FontAwesomeIcon icon={faUser} className="text-gray-500, mr-1"/>{notification.search}
                           <span className="ml-1 mr-1">-</span>
                        </span>
                        <FontAwesomeIcon icon={faMessage} className="text-gray-500 mr-1" /><span>{notification.message}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative">
                <button
                  className="px-4 py-2 ml-4 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                  ref={dropdownBtnRef1}
                  onClick={handleDropdownToggle1}
                >
                  {"Bienvenido  👨️" + userDetails.user.user.nombre}
                </button>
                {showDropdown1 && (
                  <ul
                    className="absolute bg-white rounded-md shadow-md mt-2 w-40 list-none z-10"
                    id="dropdown1"
                    ref={dropdownRef1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <li
                      className="px-4 py-2 hover:bg-gray-200"
                      onClick={() => navigate("/profile")}
                    >
                      Perfil
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link to={"/login"}>
                <a
                  href=""
                  className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  Login
                </a>
              </Link>
              <Link to={"/register"}>
                <a
                  href=""
                  className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                >
                  Register
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
