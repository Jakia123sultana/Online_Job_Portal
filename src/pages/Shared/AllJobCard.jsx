// AllJobs.jsx
import React, {useEffect, useState} from "react";
import {FaMapMarkerAlt, FaRegBookmark} from "react-icons/fa";
import {Link} from "react-router"; // ✅ Fixed import
import useAxiosSecure from "../../hooks/useAxiosSecure"; // your axios hook
import {motion} from "framer-motion";
import {FaArrowRightLong, FaArrowLeftLong} from "react-icons/fa6";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaRegCircle } from "react-icons/fa";
const AllJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, [axiosSecure]);

  return (
    <div className="max-w-[90%] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-3 ml-6 mt-2">Our Trending Jobs</h1>
      <p className="text-white text-lg ml-6 font-base mb-8"> To choose your trending job dream & to make future bright</p>
      {jobs.length === 0 ? (
        <p className="text-gray-300">Loading jobs...</p>
      ) : (
        <>
          <div className="">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const JobCard = ({job}) => {
  console.log(job);
  const {
    title,
    location,
    requirements,
    _id,
    salaryRange,
    description,
    company,
    company_logo,
    jobType,
    
applicationDeadline,
category

  } = job;

  return (
    <div className="relative w-[95%] mx-auto bg-[#072128] text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 mb-6 mt-4">
        <div className="flex gap-12">
      {/* Top: Logo and Company Info */}
      <div className="flex gap-4  mb-8">
        <figure>
          <img
            src={company_logo}
            className="w-14 h-14 rounded-full object-cover border border-gray-600"
            alt={company}
          />
        </figure>
       
      </div>

      <div>
        {/* Job Title & Info */}
        <h2 className="text-2xl font-bold ">
          {title}
        
        </h2>
        <h3>   <h3 className="text-lg mt-1 text-white flex gap-4"><span className="text-[#00ced1] mt-1"><SlEnvolopeLetter />
</span>{company}</h3></h3>
<p className="mt-2  mb-2 font-semibold">{(jobType)} <span className="text-green-200">Job</span></p>

<div>
    <div  className="flex gap-6">
         <div className=" gap-6 font-semibold text-lg">
       
       <div className="flex">
           <p className="flex items-center gap-1 text-gray-300  font-semibold text-base">
            <FaRegCircle  className="text-[#00cde1]" size={12}/> {location}
          </p>
        </div>
        <div className="flex"> 
        <p className="flex items-center gap-1 text-gray-300  font-semibold text-base">
      <FaRegCircle  className="text-[#00cde1]"size={12}/>  Salary {salaryRange?.min} - {salaryRange?.max}{" "}
          {salaryRange?.currency}
        </p>
        </div>
       </div>
         <div className=" gap-6 font-semibold text-lg">
       
       <div className="flex">
           <p className="flex items-center gap-1 text-gray-300 ">
      <FaRegCircle className="text-[#00cde1]" size={12} /><span className=" font-semibold text-base">Category: </span> {category}
          </p>
        </div>
        <div className="flex"> 
        <p className="flex items-center gap-1 text-gray-300  font-semibold text-base">
      <FaRegCircle  className="text-[#00cde1]" size={12}/>  Application Dateline : {
applicationDeadline}
        </p>
        </div>
       </div>
    </div>

        {/* Requirements */}
        {/* <div className="flex flex-wrap gap-2 my-3">
          {requirements?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-700 text-xs px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div> */}
</div>

        {/* Details Button and Bookmark */}
        <div className="relative text-right mt-1">
          {/* ✅ Bookmark Icon moved slightly right and top of the button */}
          <div className="absolute -top-40 left-[198%] transform -translate-x-[20%]">
            <FaRegBookmark className="text-xl text-[#00cde1] hover:text-white cursor-pointer" />
          </div>

          <div className="card-actions justify-start">
            <div className="flex gap-2 justify-end">
              <Link
                to={`/jobs/${_id}`} // <-- use the correct route and param here
                className="flex items-center gap-2 text-[#00cde1] font-bold "
              >
                <span>Explore More</span>
                <motion.button
                  aria-label="scroll-right"
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  className="flex items-center justify-center rounded-full p-2"
                >
                  <span className="relative flex items-center">
                    <FaArrowRightLong
                      size={18}
                      className="text-[#00cde1] relative z-10"
                    />
                    <span className="absolute left-2 rounded-full border text-[#00cde1]  w-5 h-5"></span>
                  </span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AllJobs;
