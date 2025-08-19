import React, { useEffect, useState } from "react";
import JobCard from "../Shared/JobCard";
import { ImSpinner9 } from "react-icons/im";
import { motion } from "framer-motion";

const HotJobs = ({ jobsPromise }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate waiting for jobsPromise
  useEffect(() => {
    let isMounted = true;
    jobsPromise.then((data) => {
      if (isMounted) {
        setJobs(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [jobsPromise]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-black">
        <ImSpinner9 className="animate-spin text-4xl text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="text-center px-4">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl text-white mt-20 mb-4 font-bold"
      >
        <span className="text-[#00cde1]">Hot Jobs </span>of the Day
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-gray-400 max-w-2xl mx-auto mb-12"
      >
        Discover today’s most exciting job opportunities across various fields. 
        These handpicked listings highlight top roles that are trending right now.
      </motion.p>

      {/* Job Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </motion.div>
    </div>
  );
};

export default HotJobs;
