import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Chores from "../pages/Chores";
import Bills from "../pages/Bills";
import PotMoney from "../pages/PotMoney";
import Rewards from "../pages/Rewards";
import ProtectedRoute from "../components/ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import Groups from "../pages/Groups";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/chores"
  element={
    <ProtectedRoute>
      <Chores />
    </ProtectedRoute>
  }
/>
<Route
  path="/groups"
  element={<Groups />}
/>
        <Route path="/bills" element={<Bills />} />
        <Route path="/pot-money" element={<PotMoney />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;