
import { MdAttachMoney } from "react-icons/md";
 import { FaArrowRight } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaTags, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { SlUserFollow } from "react-icons/sl";
import { CiShoppingTag } from "react-icons/ci";
import { motion } from "framer-motion";
import { FaArrowRightLong,FaArrowLeftLong } from "react-icons/fa6";
export default function JobCard({job}) {
   const { title, location, requirements, _id, salaryRange, description, company, company_logo ,applicationDeadline} = job;
 const dateObj = new Date(job.applicationDeadline);
  const day = dateObj.getDate(); // number, e.g., 9
  const month = dateObj.toLocaleString("en-US", { month: "short" }); // e.g., "Aug"

   const C = {
    BG: "#04181A",
    CARD_BG: "#061F21",
    CARD_BORDER: "rgba(255,255,255,0.03)",
    ICON_BG: "#002B2C",
    ICON_RING: "rgba(2,171,178,0.08)",
    ACCENT: "#00D1C9",
    ACCENT_LIGHT: "#00CED1",
    TITLE: "#E9FEFE",
    MUTED: "#8FB8B8",
    BTN: "#00C6BF",
  };


  return (
    <>
     <div className="card  w-90 h-90 shadow-sm text-white">
<figure className="relative  h-48 overflow-hidden ">
  <img
    src={company_logo}
    className="w-full h-full object-cover"
    alt={title}
  />
          {/* Date card positioned top-right corner */}
          <div
            className="absolute bottom-0 left-0 flex flex-col items-center justify-center 
                       bg-black rounded-sm w-16 h-14 text-center p-4 text-[#00CED1]  
                       border-1 border-[#00CED1] select-none shadow-md shadow-cyan-500/50"
          >
            <span className="text-2xl leading-none">{day}</span>
            <span className="text-sm uppercase tracking-widest">{month}</span>
          </div>
        </figure>
  <div className="card-body ">
   <div className=" ">
    <div >
      <div className="flex">
      <p className="flex items-center text-base   gap-1">
        <CiShoppingTag className="text-[#00CED1]" size={24} />
        {company}
      </p>
      <p className="flex items-center text-base   ">
        <MdAttachMoney  className="text-[#00CED1] " size={24} />
       Salary: {salaryRange.min} - {salaryRange.max} 
      </p>
    </div>
         <div className="card-actions mt-4">
                   {
                         requirements.map((skill, index) => <div
                             key={index}
className="text-white border px-3 rounded-xl mb-2"
>{skill}</div>)
                     }
                </div>

   
 
    </div>
      <div className="card-actions ">
 
        <div>
            
             
          <div className="flex gap-2 justify-start">
             {/* <div
                className="flex flex-col items-center justify-center bg-black 
                           rounded-lg w-12 h-14 text-center p-4 text-[#00CED1] font-bold  border  border-[#00CED1] relative bottom-42 right-6"
              >
                <span className="text-2xl leading-none">{day}</span>
                <span className="text-sm uppercase tracking-widest">{month}</span>
              </div> */}
           
           <div className="card-actions">
            <div className="flex gap-2 justify-start">
              <Link
                to={`/jobs/${_id}`}  // <-- use the correct route and param here
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
                    <FaArrowRightLong
                      size={18}
                      className="text-cyan-400 relative z-10"
                    />
                    <span className="absolute left-2 rounded-full border border-cyan-400 w-5 h-5"></span>
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>
          </div>
        </div>
     </div>
    </div>
   </div>
    
 {/* <div className="flex justify-between">
      <AiOutlineLike size={28} className=" ml-8 mb-8"/>
       <p className="mr-8 text-xl">Comments</p>
    </div> */}
  </div>
 
    </>
  );
}
