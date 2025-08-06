import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ManageJob = () => {
   const { user } = useAuth();
  const { role, roleLoading,authLoading } = useUserRole();
  const axiosInstance =useAxiosSecure();
  console.log(user,role)

  const isAdmin = role === "admin";

  // Fetch all jobs for admin, or HR's own jobs
  const { data: jobs = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["jobs", user?.email],
    enabled: !authLoading && !roleLoading && !!user?.email,
    queryFn: async () => {
      const res = isAdmin
        ? await axiosInstance.get(`/jobs`)
        : await axiosInstance.get(`/jobs?email=${user?.email}`);

      if (!Array.isArray(res.data)) {
        throw new Error("Jobs response is not an array");
      }
      return res.data;
    },
  });












  // DELETE job
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/jobs/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The job has been removed.", "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete the job.", "error");
      }
    }
  };

  // VERIFY job
  const handleVerify = async (id) => {
    const confirm = await Swal.fire({
      title: "Verify this job?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, verify",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosInstance.patch(`/jobs/verify/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Job has been verified", "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to verify job.", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading jobs...</p>;
  if (isError) return <p className="text-center text-red-600">Error loading jobs</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isAdmin ? "All Posted Jobs" : "Manage My Posted Jobs"}
      </h2>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div key={job._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{job.job_title}</h3>
              <p className="text-gray-600">{job.company_name}</p>
              <p className="text-sm">Location: {job.location}</p>
              <p className="text-sm">Salary: ${job.salary}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    job.status === "Verified" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {job.status || "Pending"}
                </span>
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {isAdmin && job.status !== "Verified" && (
                  <button
                    onClick={() => handleVerify(job._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Verify
                  </button>
                )}

                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

                {!isAdmin && (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => console.log("Update feature coming soon")}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJob;
// import React from 'react';
// import useAuth from '../../hooks/useAuth';
// import useUserRole from '../../hooks/useUserRole';

// const ManageJob = () => {
//   const { user, loading: authLoading } = useAuth();
//   const { role, roleLoading } = useUserRole();

//   if (authLoading || roleLoading) {
//     return <p className="text-center">Loading...</p>;
//   }

//   if (!user || role !== "admin") {
//     return <p className="text-center text-red-500">Unauthorized access</p>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">Manage All Jobs</h2>
//       <p className="mb-2">Welcome Admin: {user.displayName}</p>

//       {/* Job management logic here... */}
//     </div>
//   );
// };

// export default ManageJob;
