import React, { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserShield, FaUserTimes } from "react-icons/fa";
import debounce from "lodash.debounce";

const axiosInstance = axios.create({
  baseURL: "https://career-code-server-with-crud.vercel.app",
});

const ManageUsers = () => {
  const [emailQuery, setEmailQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debounceSearch = useCallback(
    debounce((query) => setDebouncedQuery(query), 500),
    []
  );

  const handleInputChange = (e) => {
    setEmailQuery(e.target.value);
    debounceSearch(e.target.value);
  };

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      const res = await axiosInstance.get(`/users/search?email=${debouncedQuery}`);
      return res.data;
    },
    enabled: !!debouncedQuery,
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => axiosInstance.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      Swal.fire("Success", "User role updated successfully", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update user role", "error");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/users/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "User deleted successfully", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete user", "error");
    },
  });

  const handleRoleChange = async (id, currentRole, newRole) => {
    if (currentRole === newRole) return;
    const confirmResult = await Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (confirmResult.isConfirmed) updateRoleMutation.mutate({ id, role: newRole });
  };

  const handleDeleteUser = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (confirmResult.isConfirmed) deleteUserMutation.mutate(id);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-[#00ced1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#061F21] p-4 sm:p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Manage Users</h2>

      {/* Search input */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6 items-start sm:items-center max-w-full sm:max-w-md">
        <input
          type="text"
          className="input input-bordered border-[#1b3147] border-2 text-white w-full bg-[#0f1e2f] sm:flex-1"
          placeholder="Search user by email"
          value={emailQuery}
          onChange={handleInputChange}
        />
      </div>

      {users.length === 0 && debouncedQuery && (
        <p className="text-gray-400">No users found.</p>
      )}

      {users.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[500px]">
              <thead>
                <tr className="bg-[#002B2C] border border-white/5 text-gray-300 uppercase text-xs tracking-wider">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b3147]">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-[#002B2C]">
                    <td className="px-4 py-3 truncate max-w-[150px]">{user.displayName || "N/A"}</td>
                    <td className="px-4 py-3 truncate max-w-[200px]">{user.email}</td>
                    <td className="px-4 py-3 capitalize">{user.role || "user"}</td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(user._id, user.role, "admin")}
                          className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#00ced1] hover:text-white flex items-center gap-1 text-xs sm:text-sm"
                        >
                          <FaUserShield /> Admin
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-3 py-1 rounded border border-[#1b3147] hover:bg-red-600 hover:text-white flex items-center gap-1 text-xs sm:text-sm"
                      >
                        <FaUserTimes /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden flex flex-col gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-[#002B2C] p-4 rounded-lg flex flex-col gap-2 shadow"
              >
                <p className="text-sm text-gray-400">Name: <span className="font-semibold">{user.displayName || "N/A"}</span></p>
                <p className="text-sm text-gray-400">Email: <span className="font-semibold">{user.email}</span></p>
                <p className="text-sm text-gray-400">Role: <span className="font-semibold capitalize">{user.role || "user"}</span></p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(user._id, user.role, "admin")}
                      className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#00ced1] hover:text-white flex items-center gap-1 text-xs"
                    >
                      <FaUserShield /> Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-3 py-1 rounded border border-[#1b3147] hover:bg-red-600 hover:text-white flex items-center gap-1 text-xs"
                  >
                    <FaUserTimes /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
