import React, { useState } from "react";
import { Navigate, Link, Outlet } from "react-router"; // ✅ fixed import
import { FaBars, FaTimes, FaUser, FaUsers, FaBriefcase, FaSave, FaCheckCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const Dashboard = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🌀 Loading Spinner
  if (roleLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <FaCheckCircle className="animate-spin text-4xl text-blue-500" />
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen md:grid md:grid-cols-12 bg-gray-50">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-4 text-xl bg-white shadow-md z-20"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block col-span-3 bg-black text-white p-6 md:min-h-screen absolute md:relative w-full md:w-auto z-10`}
      >
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Dashboard</h2>
        <ul className="space-y-4">
          

          {role === "admin" && (
            <>
            <li>
            <Link to="adminProfile" className="flex items-center gap-2 hover:text-blue-400">
              <FaUser /> Profile
            </Link>
          </li>
              <li>
                <Link to="manageuser" className="flex items-center gap-2 hover:text-blue-400">
                  <FaUsers /> Manage Users
                </Link>
              </li>
              <li>
                <Link to="manage-jobs" className="flex items-center gap-2 hover:text-blue-400">
                  <FaBriefcase /> Manage Jobs
                </Link>
              </li>
            </>
          )}

          {role === "user" && (
            <>
              <li>
                <Link to="my-applications" className="flex items-center gap-2 hover:text-blue-400">
                  <FaCheckCircle /> My Applications
                </Link>
              </li>
              <li>
                <Link to="/dashboard/saved-jobs" className="flex items-center gap-2 hover:text-blue-400">
                  <FaSave /> Saved Jobs
                </Link>
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="col-span-12 md:col-span-9 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.displayName || "User"}!</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-700">
            You are logged in as <strong className="text-blue-600">{role}</strong>.
          </p>
        </div>

        {/* ✅ Nested Route Content Will Render Here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
