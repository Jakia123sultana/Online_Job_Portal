import React from "react";
import { FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Questions() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Side: Text */}
        <motion.div
          className="flex-1 text-white"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
            At JobFinder, your career is our priority.
          </h2>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <FiCheck className="text-[#00CED1] mt-1" size={44} />
              <div>
                <h3 className="font-semibold text-lg">Tailored Job Recommendations</h3>
                <p className="opacity-60">
                  Find jobs that fit your skills and preferences with our smart matching system.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <FiCheck className="text-[#00CED1] mt-1" size={44} />
              <div>
                <h3 className="font-semibold text-lg">Verified Employers & Listings</h3>
                <p className="opacity-60">
                  We ensure all job listings are genuine and posted by trusted companies.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <FiCheck className="text-[#00CED1] mt-1" size={44} />
              <div>
                <h3 className="font-semibold text-lg">Career Growth Tools</h3>
                <p className="opacity-60">
                  Use our tools to track your applications, get interview tips, and enhance your resume.
                </p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Right Side: Overlapping Images */}
        <div className="flex-1 relative w-full h-[400px]">
          {/* First Image - slides in from left */}
          <motion.img
           src="https://i.ibb.co.com/ycLZ8Rm8/job6.jpg"
           
           
            alt="Job Portal"
            className="absolute top-0 left-0 w-3/4 h-80 object-cover rounded-lg shadow-lg"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          {/* Second Image - slides in from right and overlaps more to left */}
          <motion.img
           src="https://i.ibb.co.com/cXwWk9xT/job3.webp"
            alt="Job Search"
            className="absolute left-2/5 w-3/4 h-80 object-cover rounded-lg shadow-lg  -bottom-8 "
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: -40, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
