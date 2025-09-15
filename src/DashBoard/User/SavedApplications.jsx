import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const SavedApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);

  // Fetch saved jobs
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get("/saved-jobs", { params: { userEmail: user.email } })
      .then((res) => setSavedJobs(res.data))
      .catch((err) => console.error("Error fetching saved jobs:", err));
  }, [axiosSecure, user]);

  // Remove saved job
  const handleRemove = async (jobId) => {
    try {
      await axiosSecure.delete("/saved-jobs", {
        headers: { "Content-Type": "application/json" },
        data: { userEmail: user.email, jobId },
      });
      setSavedJobs(savedJobs.filter((job) => job.jobId !== jobId));
    } catch (err) {
      console.error("Error deleting saved job:", err);
      alert("Failed to remove job");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        Saved Applications
      </h1>
      <p className="text-gray-300 text-base sm:text-lg mb-8">
        Jobs you bookmarked for later review
      </p>

      {savedJobs.length === 0 ? (
        <p className="text-gray-400">No saved applications yet.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {savedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-[#072128] text-white rounded-lg shadow-md hover:shadow-lg transition p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Company Logo */}
                <div className="flex-shrink-0 flex items-start justify-center sm:justify-start">
                  <img
                    src={job.company_logo}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-600"
                    alt={job.company}
                  />
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <h2 className="text-lg sm:text-2xl font-bold">{job.title}</h2>
                  <h3 className="text-base sm:text-lg mt-1 text-[#00ced1]">
                    {job.company}
                  </h3>
                  <p className="mt-2 font-semibold text-gray-300 text-sm sm:text-base">
                    {job.location}
                  </p>
                  <p className="font-semibold text-gray-300 text-sm sm:text-base">
                    Salary: {job.salaryRange?.min} - {job.salaryRange?.max}{" "}
                    {job.salaryRange?.currency}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-3 mt-3 sm:mt-0">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(job.jobId)}
                    className="text-red-400 hover:text-red-600 text-lg sm:text-xl"
                  >
                    <FaTrashAlt />
                  </button>

                  {/* Explore More Button */}
                  <Link
                    to={`/jobs/${job.jobId}`}
                    className="flex items-center gap-2 text-[#00cde1] font-bold text-sm sm:text-base"
                  >
                    <span>Explore</span>
                    <motion.button
                      aria-label="explore-job"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center rounded-full p-2"
                    >
                      <FaArrowRightLong size={18} className="text-[#00cde1]" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedApplications;
