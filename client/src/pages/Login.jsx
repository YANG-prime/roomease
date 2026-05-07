import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const loginUser = async () => {

    try {

      setError("");

      const response = await fetch(
        "https://roomease-production-6413.up.railway.app/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      // ERROR
      if (!response.ok) {

        setError(data.message);

        return;
      }

      // SAVE TOKEN
      localStorage.setItem("token", data.token);

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // REDIRECT
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      setError("Something went wrong");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex items-center justify-center h-[85vh]">

        <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Login
          </h1>

          <div className="flex flex-col gap-5">

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
            />

            {/* PASSWORD */}
            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 w-full"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="button"
              onClick={loginUser}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            {/* LINKS */}
            <div className="flex justify-between text-sm mt-2">

              <button
                type="button"
                onClick={() =>
                  navigate("/forgot-password")
                }
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

              <p>

                Don’t have an account?{" "}

                <span
                  onClick={() =>
                    navigate("/register")
                  }
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Register
                </span>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;