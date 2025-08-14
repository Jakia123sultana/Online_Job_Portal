import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaSearch,
  FaUserShield,
  FaUserTimes,
  FaUserAlt,
} from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

// Create an axios instance - adjust baseURL to your backend API URL
const axiosInstance = axios.create({
  baseURL: "https://career-code-server-with-crud.vercel.app", // or your actual backend URL
});

const ManageUsers = () => {
  const [emailQuery, setEmailQuery] = useState("");

  // Fetch users filtered by email query
const {
  data: users = [],
  refetch,
  isLoading,
  isFetching,
} = useQuery({
  queryKey: ["users", emailQuery],
  queryFn: async () => {
    const res = await axiosInstance.get(`/users/search?email=${emailQuery}`);
    return res.data;
  },
  enabled: emailQuery.length > 0,
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


  // Handler to confirm and change user role
  const handleRoleChange = async (id, currentRole, newRole) => {
    if (currentRole === newRole) return; // No change needed

    const confirmResult = await Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      updateRoleMutation.mutate({ id, role: newRole });
    }
  };

  // Handler to confirm and delete user
  const handleDeleteUser = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      deleteUserMutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-700">Manage Users</h2>

      <div className="flex gap-2 mb-6 items-center max-w-md">
        <FaSearch className="text-yellow-700 text-lg" />
        <input
          type="text"
          className="input input-bordered border-yellow-700 border-2 text-yellow-700 w-full"
          placeholder="Search user by email"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
      </div>

      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center h-32">
          <ImSpinner9 className="animate-spin text-4xl text-yellow-600" />
        </div>
      )}

      {!isFetching && users.length === 0 && emailQuery && (
        <p className="text-gray-500">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead className="bg-yellow-700 text-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.displayName || "N/A"}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role || "user"}</td>
                  <td className="flex flex-wrap gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() =>
                          handleRoleChange(user._id, user.role, "admin")
                        }
                        className="btn btn-sm bg-yellow-700 text-white flex items-center gap-1"
                      >
                        <FaUserShield /> Admin
                      </button>
                    )}
                
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-sm bg-red-700 text-white flex items-center gap-1"
                    >
                      <FaUserTimes /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

