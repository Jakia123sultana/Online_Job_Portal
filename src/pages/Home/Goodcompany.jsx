import React from "react";
import { motion } from "framer-motion";

const Goodcompany = () => {
  return (
    <div className="space-y-12">
      {/* Top Hero */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-12 p-8 md:p-16 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.img
          src="https://i.ibb.co.com/hx68cj1K/team.jpg"
          alt="Team collaboration in office"
          className="w-full h-[380px] md:w-[60%] rounded-lg object-cover"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        />
        <motion.div
          className="md:w-1/2 space-y-4"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white">
            Good Life Begins With <br /> A Good Company
          </h1>
          <p className="text-gray-300">
            A supportive workplace fosters growth, innovation, and happiness. 
            With the right team beside you, challenges turn into opportunities 
            and dreams become achievable goals.
          </p>
          <div>
            <motion.button
              className="bg-[#00ced1] text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search Job
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Hero */}
      <motion.div
        className="relative max-w-[90%] mx-auto bg-[#061F21] dark:bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row justify-between gap-8 p-8 md:p-12"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="md:w-1/2 space-y-6 z-10"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold">
            Create A Better Future For Yourself
          </h2>
          <p className="text-gray-300">
            Stay updated with the latest opportunities tailored for your career path. 
            Subscribe now and take the next step toward achieving your goals.
          </p>

          {/* Search + Subscribe */}
          <motion.div
            className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-md overflow-hidden max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <input
              type="text"
              placeholder="Enter your email..."
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-200 dark:bg-gray-800 focus:outline-none"
            />
            <motion.button
              className="bg-[#00ced1] text-white px-6 py-2 font-semibold hover:bg-teal-600 transition w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
          alt="Career success and future"
          className="w-full md:w-1/3 rounded-lg object-cover opacity-80"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

export default Goodcompany;
