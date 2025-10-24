import { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    if (!socket) return; // ✅ Prevent errors if socket is not ready

    const handleNewMessage = (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage((prevMessages) => [...prevMessages, newMessage]); // ✅ Use functional update to avoid stale closure
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessage]);
};

export default useGetSocketMessage;
