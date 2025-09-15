import React from "react";
import { easeOut, motion } from "framer-motion";
import team1 from "../../assets/team/team1.jpg";
import team2 from "../../assets/team/team2.jpg";

const Banner = () => {
  return (
    <div className="w-full bg-[#061F21] min-h-96">
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between px-4 py-4 gap-10 max-w-6xl mx-auto">

        <div className="flex-1 flex flex-col items-center lg:items-start overflow-hidden">
          <motion.img
            src={team1}
            animate={{ y: [50, 100, 50] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:w-96 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl object-cover"
          />
          <motion.img
            src={team2}
            animate={{ x: [100, 150, 100] }}
            transition={{ duration: 10, delay: 5, repeat: Infinity }}
            className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:w-96 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl object-cover mt-4"
          />
        </div>

        <div className="flex-1">
          <motion.h1
            animate={{ x: 50 }}
            transition={{
              duration: 2,
              delay: 1,
              ease: easeOut,
              repeat: Infinity,
            }}
            className="lg:text-5xl text-3xl font-bold text-white"
          >
            Latest <span className="text-white">Jobs</span> For You!
          </motion.h1>
          <p className="py-6 text-white">
          Discover thousands of opportunities from top companies. Whether you’re just starting your career or aiming higher, we connect you with the right employers to help you grow and succeed.
          </p>
          <button className="bg-[#00CED1]  text-white font-semibold px-8 py-2 rounded-2xl self-center lg:self-start transition-colors duration-300">
            Our All Jobs
          </button>
        </div>

      </div>
    </div>
  );
};

export default Banner;
