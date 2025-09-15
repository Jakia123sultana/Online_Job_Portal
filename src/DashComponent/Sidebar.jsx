
import { 
  Home, Layers, Settings, LogOut, FileText, 
  ArrowLeft, ClipboardList, Bookmark 
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

export default function Sidebar() {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="bg-[#0B0F10] w-64 h-screen text-white shadow-lg flex flex-col sticky top-0">
      {/* User Info */}
      <div className="flex flex-col items-center p-6 border-b border-gray-800">
        <img
          src={user?.photoURL || "https://i.pravatar.cc/80"}
          alt={user?.displayName || "User"}
          className="w-16 h-16 rounded-full border-2 border-gray-600"
        />
        <h3 className="mt-2 font-semibold">
          {user?.displayName || "User Name"}
        </h3>
        <p className="text-sm text-gray-400">
          {roleLoading ? "Loading role..." : role === "admin" ? "Administrator" : "User"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link to="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-[#141A1C]">
          <Home className="w-5 h-5 mr-2" /> Dashboard
        </Link>

        {/* Show skeletons while role is loading */}
        {roleLoading && (
          <>
            <div className="h-8 bg-gray-800 rounded animate-pulse" />
            <div className="h-8 bg-gray-800 rounded animate-pulse" />
          </>
        )}

        {!roleLoading && role === "user" && (
          <>
            <Link to="/dashboard/my-applications" className="flex items-center p-2 rounded-lg hover:bg-[#141A1C]">
              <ClipboardList className="w-5 h-5 mr-2" /> My Applications
            </Link>
            <Link to="/dashboard/saved-applications" className="flex items-center p-2 rounded-lg hover:bg-[#141A1C]">
              <Bookmark className="w-5 h-5 mr-2" /> Saved Applications
            </Link>
          </>
        )}

        {!roleLoading && role === "admin" && (
          <>
            <Link to="/dashboard/managejobs" className="flex items-center p-2 rounded-lg hover:bg-[#141A1C]">
              <Layers className="w-5 h-5 mr-2" /> Manage Jobs
            </Link>
            <Link to="/dashboard/manage-applications" className="flex items-center p-2 rounded-lg hover:bg-[#141A1C]">
              <FileText className="w-5 h-5 mr-2" /> Manage Applications
            </Link>
            <Link to="/dashboard/settings" className="flex items-center p-2 rounded-lg hover:bg-[#141A1C]">
              <Settings className="w-5 h-5 mr-2" /> Settings
            </Link>
          </>
        )}

        <button
          onClick={() => navigate("/")}
          className="flex items-center w-full text-left p-2 rounded-lg hover:bg-[#141A1C] text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>
      </nav>

      {/* Logout */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center p-2 w-full rounded-lg hover:bg-[#141A1C]"
        >
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
}
