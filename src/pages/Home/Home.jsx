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
import WhyChooseUs from "./Whyus.jsx";
import Goodcompany from "./Goodcompany.jsx";

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
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Banner />
      </motion.div>

      {/* Hot Jobs */}
      <motion.div
        className="max-w-[90%] mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Suspense fallback={"Loading hot jobs"}>
          <HotJobs jobsPromise={jobsPromise} />
        </Suspense>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="mx-auto max-w-[90%]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Stats className="mx-auto max-w-[80%]" />
      </motion.div>

      {/* Job Process */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <JobProcess />
      </motion.div>

      {/* Good Company */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Goodcompany />
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <WhyChooseUs />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <TestimonialsSection />
      </motion.div>

      {/* Questions (from left) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Questions />
      </motion.div>

      {/* Collaps (from right) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Collaps />
      </motion.div>
    </div>
  );
}
