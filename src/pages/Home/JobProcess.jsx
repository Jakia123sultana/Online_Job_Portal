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
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12, duration: 0.8 }
    }
  };

  return (
    <section className="w-full bg-black py-10">
      <div className="max-w-[90%] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-white">
            Job <span className="text-cyan-400">Process</span>
          </h3>
          <p className="text-sm text-gray-400">
            Step-by-step guide to land your dream job
          </p>
        </div>

        {/* 3 Cards in a row */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
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
              <p className="text-sm mt-1 text-gray-400">
                {step.description}
              </p>
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
            className="bg-[#061F21] border border-white/5 rounded-xl p-5 shadow-lg text-center w-full sm:w-1/3"
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
