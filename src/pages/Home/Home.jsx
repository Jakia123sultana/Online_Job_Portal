import { Suspense } from "react";
import { motion } from "framer-motion";
import HotJobs from "./HotJobs";
import Banner from "./Banner";
import TestimonialsSection from "./TestimonialsSection";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Stats from "./Stats";
import Questions from "./Questions";
import Collaps from "./Collaps";
import JobProcess from "./JobProcess";

export default function Home() {
  const axiosInstance = useAxiosSecure();
  const jobsPromise = axiosInstance
    .get("/jobs")
    .then((res) => res.data.filter((job) => job.status === "Verified"));

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0 }}
      >
        <Banner />
      </motion.div>

      {/* Hot Jobs */}
      <motion.div
        className="max-w-[90%] mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <Suspense fallback={"Loading hot jobs"}>
          <HotJobs jobsPromise={jobsPromise} />
        </Suspense>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="mx-auto max-w-[90%]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        <Stats className="mx-auto max-w-[80%]" />
      </motion.div>

      {/* Job Process */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.6 }}
      >
        <JobProcess />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4.8 }}
      >
        <TestimonialsSection />
      </motion.div>

      {/* Questions + Collaps */}
      <motion.div
        className="mx-auto max-w-[90%] flex justify-between gap-8 mb-28"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {/* Questions from left */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 6 }}
          className="flex-1"
        >
          <Questions />
        </motion.div>

        {/* Collaps from right */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 6.6 }}
          className="flex-1"
        >
          <Collaps />
        </motion.div>
      </motion.div>
    </div>
  );
}
