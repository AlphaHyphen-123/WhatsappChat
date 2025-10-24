import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");

        // ✅ full API URL (backend)
        const response = await axios.get(
          "https://chatapplication-w8zh.onrender.com/api/user/allusers",
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAllUsers(response.data || []);
      } catch (error) {
        console.error("❌ Error in useGetAllUsers:", error);
        setAllUsers([]); // ✅ fallback to empty array to avoid .map crash
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
