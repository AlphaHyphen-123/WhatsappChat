import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Left from './Home/LeftPart/Left.jsx';
import Right from './Home/RightPart/Right.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { useAuth } from './context/AuthProvider.jsx';
import Loading from './components/Loading.jsx';
import { Toaster } from "react-hot-toast";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>
      <Routes>
        {/* ✅ Home Page */}
        <Route
          path="/"
          element={
            authUser ? (
              // <div className="flex h-screen">
              //   <Left />
              //   <Right />
              // </div>
              <div className="drawer lg:drawer-open">
                <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center justify-center">
                  <Right />
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu w-80 min-h-full bg-black text-base-content">
                    <Left />
                  </ul>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ✅ Login Page */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        {/* ✅ Signup Page */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />

        {/* ✅ Optional Loading Page */}
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <Toaster />
    </>

  );
}

export default App;
