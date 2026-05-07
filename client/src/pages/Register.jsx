import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerUser = async () => {

    try {

      // CLEAR OLD MESSAGES
      setError("");
      setSuccess("");

      const response = await fetch(
        "http://10.129.103.230:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
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

      // SUCCESS
      setSuccess(
        "Account created successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

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
            Register
          </h1>

          <div className="flex flex-col gap-5">

            {/* NAME */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
            />

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

            {/* REGISTER BUTTON */}
            <button
              type="button"
              onClick={registerUser}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </button>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <p className="text-green-500 text-sm text-center">
                {success}
              </p>
            )}

            {/* LOGIN LINK */}
            <p className="text-sm text-center mt-2">

              Already have an account?{" "}

              <span
                onClick={() =>
                  navigate("/login")
                }
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;