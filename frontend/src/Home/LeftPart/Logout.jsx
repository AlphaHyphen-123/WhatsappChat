import React, { useState } from 'react'
import axios from 'axios';
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from 'js-cookie';


function Logout() {
    const[loading,setLoading]=useState(false);
    const HandleLogout = async() => {
        setLoading(true)
          try {

       const res =     await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`);
       localStorage.removeItem("ChatApp");

       Cookies.remove("jwt");

       setLoading(false)

       alert("Loged out successfully")

       window.location.reload();
            
          } catch (error) {
            console.log("Error in Logout : ", error);

            
          }
    }
    return (
        <div className='h-[10vh] flex'>
            <div>
                <BiLogOutCircle onClick={HandleLogout} className='text-5xl text-white hover:bg-slate-900 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1'/>
            </div>
            <div className='ml-2 mt-3 text-xl cursor-pointer'>
                <h1 className='text-black'>Logout</h1>
            </div>
        </div>
    )
}

export default Logout
