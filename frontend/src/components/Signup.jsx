import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';



function Signup() {

  const [authUser, setAuthUser] = useAuth()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSuccessMessage('');
    try {
      const res = await axios.post(
        'https://whatsappchat-vb74.onrender.com/api/user/signup',
        data,
        { withCredentials: true }  // 👈 important line for cookies
      );


      console.log(res.data);
      localStorage.setItem("ChatApp", JSON.stringify(res.data));
      setAuthUser(res.data);

      setSuccessMessage("Signup successful!");
      alert("Signup successful!");
      reset();
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const gotologin = () => {
    navigate("/login")
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-green-200 transition-all duration-300 ease-in-out hover:shadow-xl"
        style={{ animation: 'fadeIn 0.5s ease-in' }}>

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Text <span className="text-green-500 font-semibold">App</span>
        </h1>
        <h2 className="text-2xl font-bold text-black text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname", { required: "Full name is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:border-green-500 outline-none"
            />
            {errors.fullname && (
              <p className="mt-1 text-sm text-red-500">{errors.fullname.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:border-green-500 outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" }
                })}
                className="flex-1 bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-green-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}

            {/* Password Strength Bar */}
            <div className="mt-2 h-2 rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${password?.length >= 8
                    ? "bg-green-500"
                    : password?.length > 0
                      ? "bg-yellow-500"
                      : "bg-gray-200"
                  }`}
                style={{
                  width: password?.length >= 8 ? "100%" : `${(password?.length || 0) * 10}%`
                }}
              ></div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match"
                })}
                className="flex-1 bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-gray-400 hover:text-green-500"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
              Have an account?{' '}
              <a href="/login" onClick={gotologin} className="text-blue-500 underline hover:text-blue-700">
                Login
              </a>
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          {successMessage && (
            <p className="mt-4 text-green-500 text-center font-semibold">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

// Animations
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

export default Signup;




