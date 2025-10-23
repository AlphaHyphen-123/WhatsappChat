import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer items-center">
        {/* ✅ Avatar with online/offline dot */}
        <div className="relative">
          <img
            className="w-12 h-12 rounded-full"
            src={user.avatar || "https://img.daisyui.com/images/profile/demo/averagebulk@192.webp"}
            alt={user.fullname}
          />
          <span
            className={`absolute top-0 left-9 w-3.5 h-3.5 border-2 border-white rounded-full ${
              isOnline ? "bg-green-400" : "bg-red-400"
            }`}
          ></span>
        </div>

        {/* ✅ User info */}
        <div>
          <h1 className="font-bold text-white">{user.fullname}</h1>
          <span className="text-gray-300 text-sm">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
