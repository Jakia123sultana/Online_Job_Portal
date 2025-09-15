import { MdAttachMoney } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiShoppingTag } from "react-icons/ci";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function JobCard({ job }) {
  const { title, location, requirements, _id, salaryRange, description, company, company_logo, applicationDeadline } = job;
  const dateObj = new Date(applicationDeadline);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "short" });

  return (
    <div className="card w-full sm:w-[90%] md:w-[320px] lg:w-[360px] shadow-sm text-white">
      <figure className="relative h-48 sm:h-48 md:h-52 lg:h-48 overflow-hidden">
        <img
          src={company_logo}
          className="w-full h-full object-cover"
          alt={title}
        />
        {/* Date card top-left */}
        <div className="absolute bottom-0 left-0 flex flex-col items-center justify-center bg-black rounded-sm w-16 h-14 text-center p-4 text-[#00CED1] border-1 border-[#00CED1] select-none shadow-md shadow-cyan-500/50">
          <span className="text-2xl leading-none">{day}</span>
          <span className="text-sm uppercase tracking-widest">{month}</span>
        </div>
      </figure>

      <div className="card-body">
        <div>
          <div className="flex flex-wrap gap-2">
            <p className="flex items-center text-base gap-1 flex-1 min-w-[120px]">
              <CiShoppingTag className="text-[#00CED1]" size={24} />
              {company}
            </p>
            <p className="flex items-center text-base gap-1 flex-1 min-w-[120px]">
              <MdAttachMoney className="text-[#00CED1]" size={24} />
              Salary: {salaryRange.min} - {salaryRange.max}
            </p>
          </div>

          <div className="card-actions mt-4 flex flex-wrap gap-2">
            {requirements.map((skill, index) => (
              <div key={index} className="text-white border px-3 rounded-xl mb-2">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="card-actions mt-2">
          <div className="flex gap-2 justify-start flex-wrap">
            <Link
              to={`/jobs/${_id}`}
              className="flex items-center gap-2 text-[#00CED1] text-base cursor-pointer"
            >
              <span>Explore More</span>
              <motion.button
                aria-label="scroll-right"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-full p-2"
              >
                <span className="relative flex items-center">
                  <FaArrowRightLong size={18} className="text-cyan-400 relative z-10" />
                  <span className="absolute left-2 rounded-full border border-cyan-400 w-5 h-5"></span>
                </span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
