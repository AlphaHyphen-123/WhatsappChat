import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthProvider.jsx";


function Login() {

  const [authUser, setAuthUser] = useAuth();

  const navigate = useNavigate()
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State for errors and loading
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value); // Real-time validation
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = 'Enter a valid email address.';
        }
        break;
      case 'password':
        if (value.length < 8) {
          error = 'Password must be at least 8 characters.';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleGoToSignup = () => {
    navigate("/signup")
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    // Full form validation
    let hasError = false;
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) hasError = true;
    });

    if (!hasError) {
      try {
        // Replace with your API endpoint
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, formData);

        setIsLoading(false);
        setSuccessMessage('Login successful! Redirecting...');
        // ✅ Save complete response
        localStorage.setItem("ChatApp", JSON.stringify(response.data));

        // ✅ Save only logged-in user ID (important for filtering users)
        localStorage.setItem("userId", response.data.user._id);
        setAuthUser(response.data);
        console.log('Response:', response.data);
        // Redirect user if needed
        // e.g., navigate('/dashboard') if using react-router
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          alert("User Email Or Password is Wrong 😔!");

          // Server responded with a status other than 2xx
          setErrors({ apiError: error.response.data.message || 'Login failed.' });
        } else {
          // Network or other error
          setErrors({ apiError: 'Something went wrong. Please try again.' });
        }
      }
    } else {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-green-200 transition-all duration-300 ease-in-out hover:shadow-xl"
        style={{ animation: 'fadeIn 0.5s ease-in' }} // Simple fade-in animation
      >
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Text <span className="text-green-500 font-semibold">App</span>
        </h1>
        <h2 className="text-2xl font-bold text-black text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <label className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus-within:border-green-500 transition-all">
              <svg
                className="h-5 w-5 mr-3 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="mail@site.com"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={(e) => validateField('email', formData.email)}
                className="flex-1 bg-transparent outline-none"
                aria-label="Email"
              />
            </label>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 animate-shake">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus-within:border-green-500 transition-all">
              <svg
                className="h-5 w-5 mr-3 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                onBlur={(e) => validateField('password', formData.password)}
                className="flex-1 bg-transparent outline-none"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-green-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </label>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 animate-shake">{errors.password}</p>
            )}
          </div>

          {/* Submit and Signup Link */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" onClick={handleGoToSignup} className="text-blue-500 underline hover:text-blue-700">
                Sign Up
              </a>
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <p className="mt-4 text-green-500 text-center font-semibold animate-fadeIn">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

// Include the same global CSS for animations as in Signup
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
  .animate-shake { animation: shake 0.5s; }
  .animate-fadeIn { animation: fadeIn 0.5s ease-in; }
`;
document.head.appendChild(style);

export default Login;
