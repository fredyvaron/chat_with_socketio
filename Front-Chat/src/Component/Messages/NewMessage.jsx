import React, { useRef } from "react";
import { useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001/";
export default function NewMessage({ msg }) {
  const socketRef = useRef(null);
  const [newMessage, setNewMessage] = useState({
    user1: msg.user1,
    user2: msg.user2,
    message: "",
    sender_id: msg.sender_id,
    receiver_id: msg.receiver_id,
  });
  const handlechange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    socketRef.current = socketIOClient.connect(ENDPOINT);
    socketRef.current.emit("message", newMessage);
    setNewMessage({
      user1: msg.user1,
      user2: msg.user2,
      message: "",
      sender_id: msg.sender_id,
      receiver_id: msg.receiver_id,
    });
  };
  return (
    <form onSubmit={(e) => handlesubmit(e)}>
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
                stroke-linecap="round"
                stroke-linejoin="round"
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
            value={newMessage.message}
            onChange={(e) => handlechange(e)}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
