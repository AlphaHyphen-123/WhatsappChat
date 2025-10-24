import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function ChatUser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // ✅ define isOnline properly
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.some(u => u.userId === userId) ? "Online" : "Offline";
  };
  const isOnline = selectedConversation ? getOnlineUsersStatus(selectedConversation._id) === "Online" : false;

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      {selectedConversation && (
        <div className="flex items-center bg-gray-800 hover:bg-gray-700 duration-300 rounded-md">
          {/* Avatar */}
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full"
              src={
                selectedConversation.avatar ||
                "https://img.daisyui.com/images/profile/demo/averagebulk@192.webp"
              }
              alt={selectedConversation.fullname}
            />
            <span
              className={`absolute top-0 left-7 w-3.5 h-3.5 border-2 border-white rounded-full ${
                isOnline ? "bg-green-400" : "bg-red-400"
              }`}
            ></span>
          </div>

          {/* User info */}
          <div className="ml-3">
            <h1 className="text-xl text-white">{selectedConversation.fullname}</h1>
            <span className="text-sm text-gray-300">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatUser;
