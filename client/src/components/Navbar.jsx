import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutUser = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        RoomEase
      </Link>

      <div className="flex gap-6 items-center">

        <Link
          to="/"
          className="hover:text-blue-600"
        >
          Home
        </Link>

        {token ? (

          <>
            <Link
              to="/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </Link>

            <button
              onClick={logoutUser}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link
              to="/login"
              className="hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-blue-600"
            >
              Register
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;