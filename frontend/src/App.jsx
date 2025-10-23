import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Left from './Home/LeftPart/Left.jsx';
import Right from './Home/RightPart/Right.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { useAuth } from './context/AuthProvider.jsx';
import Loading from './components/Loading.jsx';

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (

      <Routes>
        {/* ✅ Home Page */}
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Left />
                <Right />
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

  );
}

export default App;
