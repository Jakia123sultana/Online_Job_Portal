import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiSearch, FiUserCheck, FiCheckCircle } from "react-icons/fi";

const jobSteps = [
  {
    category: "CV Preparation",
    icon: <FiFileText size={20} color="#00CED1" />,
    description: "Create an ATS-friendly resume highlighting your skills and experience."
  },
  {
    category: "Job Searching",
    icon: <FiSearch size={20} color="#00CED1" />,
    description: "Find suitable job openings on platforms like LinkedIn, Indeed, and Glassdoor."
  },
  {
    category: "Interview Preparation",
    icon: <FiUserCheck size={20} color="#00CED1" />,
    description: "Practice common interview questions and improve technical & soft skills."
  },
  {
    category: "Offer & Joining",
    icon: <FiCheckCircle size={20} color="#00CED1" />,
    description: "Negotiate the offer, accept it, and start your new journey."
  }
];

const JobProcess = () => {
  // Animation container
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  };

  // Animation for each card
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="w-full bg-black py-10">
      <div className="max-w-[90%] mx-auto px-4">
        {/* Header */}
      <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-white"
          >
            Job <span className="text-cyan-400">Process</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base text-gray-400 mt-3 max-w-2xl mx-auto"
          >
            Our structured process is designed to guide you from the first step
            to your dream job. From preparing a standout CV, searching the best
            opportunities, and excelling in interviews, to finally accepting the
            offer — we’ve got you covered at every stage.
          </motion.p>
        </div>


        {/* 3 Cards in a row */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {jobSteps.slice(0, 3).map((step, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-[#061F21] border border-white/5 rounded-xl p-5 shadow-lg text-center"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-lg bg-[#002B2C] border border-white/5">
                {step.icon}
              </div>
              <h4 className="mt-4 text-lg font-semibold text-white">
                {step.category}
              </h4>
              <p className="text-sm mt-1 text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 1 Card below */}
        <div className="flex justify-center mt-6">
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.05 }}
            className="bg-[#061F21] border border-white/5 rounded-xl p-5 shadow-lg text-center w-full sm:w-2/3 md:w-1/3"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-lg bg-[#002B2C] border border-white/5">
              {jobSteps[3].icon}
            </div>
            <h4 className="mt-4 text-lg font-semibold text-white">
              {jobSteps[3].category}
            </h4>
            <p className="text-sm mt-1 text-gray-400">
              {jobSteps[3].description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JobProcess;
