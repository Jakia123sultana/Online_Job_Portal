import React from "react";
import { easeOut, motion } from "framer-motion";
import team1 from "../../assets/team/team1.jpg";
import team2 from "../../assets/team/team2.jpg";

const Banner = () => {
  return (
    <div className="w-full bg-[#061F21] min-h-96">
      {/* <div className="hero-content flex-col lg:flex-row-reverse"> */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between px-4 py-10 gap-10 max-w-6xl mx-auto">
        <div className="flex-1">
          <motion.img
            src={team1}
            animate={{ y: [50, 100, 50] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="max-w-lg w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl"
            //  style={{ transform: "scale(1.9)", transformOrigin: "center" }} 
          />
          <motion.img
            src={team2}
            animate={{ x: [100, 150, 100] }}
            transition={{ duration: 10, delay: 5, repeat: Infinity }}
            className="max-w-lg w-64 rounded-t-[40px] rounded-br-[40px] border-l-4 border-b-4 border-blue-400 shadow-2xl"
            //  style={{ transform: "scale(1.9)", transformOrigin: "center" }} 
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
            className="text-5xl font-bold text-white"
          >
            Latest <span className="text-white">Jobs</span> For You!
          </motion.h1>
          <p className="py-6 text-white">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {/* <button className="btn btn-primary">Get Started</button> */}
          <button className="bg-[#00CED1]  text-white font-semibold px-8 py-2 rounded-2xl self-center lg:self-start transition-colors duration-300">
         Our All Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner; 