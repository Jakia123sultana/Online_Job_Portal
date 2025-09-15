// AllJobs.jsx
import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark, FaRegCircle } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { SlEnvolopeLetter } from "react-icons/sl";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";

const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs
  useEffect(() => {
    axiosSecure
      .get("/jobs")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // Fetch saved jobs for logged-in user
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get("/saved-jobs", { params: { userEmail: user.email } })
      .then((res) => setSavedJobs(res.data.map((job) => job.jobId)))
      .catch((err) => console.error("Error fetching saved jobs:", err));
  }, [axiosSecure, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <ImSpinner9 className="animate-spin text-4xl text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="max-w-[95%] sm:max-w-[90%] mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center sm:text-left">
        Our Trending Jobs
      </h1>
      <p className="text-white text-lg sm:text-xl font-base mb-6 text-center sm:text-left">
        To choose your trending job dream & make future bright
      </p>

      <div className="flex flex-col gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            savedJobs={savedJobs}
            setSavedJobs={setSavedJobs}
          />
        ))}
      </div>
    </div>
  );
};

const JobCard = ({ job, savedJobs, setSavedJobs }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    _id,
    title,
    company,
    company_logo,
    location,
    salaryRange,
    jobType,
    applicationDeadline,
    category,
  } = job;

  const isSaved = savedJobs.includes(_id);

  const handleSaveJob = async () => {
    if (!user?.email) {
      alert("Please login to save jobs");
      return;
    }

    try {
      if (isSaved) {
        await axiosSecure.delete("/saved-jobs", {
          data: { userEmail: user.email, jobId: _id },
        });
        setSavedJobs(savedJobs.filter((jobId) => jobId !== _id));
      } else {
        await axiosSecure.post("/saved-jobs", {
          userEmail: user.email,
          jobId: _id,
          title,
          company,
          company_logo,
          location,
          salaryRange,
        });
        setSavedJobs([...savedJobs, _id]);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        alert("You already saved this job");
      } else {
        console.error(err);
        alert("Failed to save/remove job");
      }
    }
  };

  return (
    <div className="relative w-full bg-[#072128] text-white rounded-lg shadow-md hover:shadow-lg transition p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Responsive: Mobile & Tablet Logo + Bookmark aligned */}
        <div className="flex justify-between items-center sm:hidden w-full mb-2 ">
          <img
            src={company_logo}
            className="w-16 h-16 rounded-full object-cover border border-gray-600"
            alt={company}
          />
          <div
            onClick={handleSaveJob}
            className="cursor-pointer text-[#00cde1] hover:text-white text-2xl"
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </div>
        </div>

        {/* Desktop: Logo */}
      {/* Desktop: Logo */}
<div className="hidden sm:flex items-start flex-shrink-0 -mt-2">
  <img
    src={company_logo}
    className="w-20 h-20 rounded-full object-cover border border-gray-600"
    alt={company}
  />
</div>


        {/* Job Info */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          <h3 className="text-base sm:text-lg mt-1 flex items-center gap-2">
            <SlEnvolopeLetter className="text-[#00ced1]" /> {company}
          </h3>
          <p className="mt-1 mb-2 font-semibold text-sm sm:text-base">
            {jobType} <span className="text-green-200">Job</span>
          </p>

          <div className="flex flex-wrap gap-6 sm:gap-8">
            <div className="flex flex-col gap-1 font-semibold text-sm sm:text-base text-gray-300">
              <p className="flex items-center gap-1">
                <FaRegCircle className="text-[#00cde1]" size={12} /> {location}
              </p>
              <p className="flex items-center gap-1">
                <FaRegCircle className="text-[#00cde1]" size={12} /> Salary{" "}
                {salaryRange?.min} - {salaryRange?.max} {salaryRange?.currency}
              </p>
            </div>

            <div className="flex flex-col gap-1 font-semibold text-sm sm:text-base text-gray-300">
              <p className="flex items-center gap-1">
                <FaRegCircle className="text-[#00cde1]" size={12} />
                <span className="font-semibold">Category:</span> {category}
              </p>
              <p className="flex items-center gap-1">
                <FaRegCircle className="text-[#00cde1]" size={12} /> Application
                Deadline: {applicationDeadline}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Bookmark */}
        <div className="hidden sm:flex items-start self-start sm:self-auto">
          <div
            onClick={handleSaveJob}
            className="cursor-pointer text-[#00cde1] hover:text-white text-2xl"
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </div>
        </div>
      </div>

      {/* Explore More Button */}
      <div className="mt-4 flex justify-center sm:justify-end">
        <Link
          to={`/jobs/${_id}`}
          className="flex items-center gap-2 text-[#00cde1] font-bold"
        >
          <span>Explore More</span>
          <motion.button
            aria-label="scroll-right"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-full p-2"
          >
            <FaArrowRightLong size={18} className="text-[#00cde1]" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default AllJobs;
