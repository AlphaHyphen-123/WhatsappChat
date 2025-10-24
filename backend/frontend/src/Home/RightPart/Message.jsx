import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp") || "{}");

  // ✅ Safe access
  const itsMe = message?.senderId === authUser?.user?._id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createdAt = message?.createdAt ? new Date(message.createdAt) : new Date();
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-black ${chatColor}`}>
          {message?.message || ""}
        </div>
        <div className="chat-footer">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;
