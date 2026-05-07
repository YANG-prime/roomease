import {
  NavLink,
} from "react-router-dom";

import {
  FaHome,
  FaBroom,
  FaMoneyBill,
  FaWallet,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

function Sidebar() {

  return (
    <div className="w-full md:w-[250px] md:min-h-screen bg-blue-600 text-white p-4 md:p-6">

      <NavLink
        to="/"
        className="text-2xl md:text-3xl font-bold mb-8 block text-center md:text-left"
      >
        RoomEase
      </NavLink>

      <div className="grid grid-cols-3 md:grid-cols-1 gap-3">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 font-semibold shadow-md"
                : "hover:bg-blue-700 hover:scale-105 active:scale-95"
            }`
          }
        >
          <FaHome />

          <span className="text-sm md:text-base">
            Dashboard
          </span>

        </NavLink>

        <NavLink
          to="/chores"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 font-semibold shadow-md"
                : "hover:bg-blue-700 hover:scale-105 active:scale-95"
            }`
          }
        >
          <FaBroom />

          <span className="text-sm md:text-base">
            Chores
          </span>

        </NavLink>

        <NavLink
          to="/bills"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 font-semibold shadow-md"
                : "hover:bg-blue-700 hover:scale-105 active:scale-95"
            }`
          }
        >
          <FaMoneyBill />

          <span className="text-sm md:text-base">
            Bills
          </span>

        </NavLink>

        <NavLink
          to="/pot-money"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 font-semibold shadow-md"
                : "hover:bg-blue-700 hover:scale-105 active:scale-95"
            }`
          }
        >
          <FaWallet />

          <span className="text-sm md:text-base">
            Pot Money
          </span>

        </NavLink>

        <NavLink
          to="/rewards"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 font-semibold shadow-md"
                : "hover:bg-blue-700 hover:scale-105 active:scale-95"
            }`
          }
        >
          <FaTrophy />

          <span className="text-sm md:text-base">
            Rewards
          </span>

        </NavLink>

        <NavLink
          to="/groups"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 font-semibold shadow-md"
                : "hover:bg-blue-700 hover:scale-105 active:scale-95"
            }`
          }
        >
          <FaUsers />

          <span className="text-sm md:text-base">
            Groups
          </span>

        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;