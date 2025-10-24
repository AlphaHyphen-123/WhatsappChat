import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

 
useEffect(() => {
  if (!authUser || !authUser.user || !authUser.user._id) return; // ✅ Prevent crash

  const socketInstance = io("https://chatapplication-w8zh.onrender.com", {
    query: {
      userId: authUser.user._id,
    },
  });

  setSocket(socketInstance);

  socketInstance.on("getOnlineUsers", (users) => {
    setOnlineUsers(users);
  });

  return () => socketInstance.close();
}, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
