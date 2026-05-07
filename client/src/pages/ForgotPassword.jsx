import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage(
      "Password reset link sent successfully."
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex items-center justify-center h-[85vh]">

        <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Forgot Password
          </h1>

          <div className="flex flex-col gap-5">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={handleReset}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>

            {message && (
              <p className="text-sm text-center text-green-500">
                {message}
              </p>
            )}

            <p className="text-sm text-center">

              Remember your password?{" "}

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

export default ForgotPassword;