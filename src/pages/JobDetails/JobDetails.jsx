// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router'; // ✅ Fixed incorrect import
// // import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { ImSpinner9 } from "react-icons/im"; // ✅ Using new spinner
// import axios from 'axios';

// const JobDetails = () => {
//   // const axiosSecure = useAxiosSecure();
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   console.log(job)
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         // const res = await axiosSecure.get(`/jobs/${id}`);
//        const res = await axios.get(`https://career-code-server-with-crud.vercel.app/jobs/${id}`);

//         setJob(res.data);
//       } catch (err) {
//         console.error('Error fetching job:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//       }, [id]);
//   // }, [id, axiosSecure]);

//    if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[50vh]">
//         <ImSpinner9 className="animate-spin text-4xl text-yellow-600" />
//       </div>
//     );
//   }

//   if (!job) {
//     return <div className="text-center text-red-500 my-10">Job not found</div>;
//   }

//   const { _id, title, company, description, location, salary } = job;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <h2 className="text-4xl font-bold mb-2">{title}</h2>
//       <p className="text-lg mb-2"><strong>Company:</strong> {company}</p>
//       <p className="mb-2"><strong>Location:</strong> {location}</p>
//       <p className="mb-2"><strong>Salary:</strong> ${salary}</p>
//       <p className="mb-4"><strong>Description:</strong> {description}</p>
//       <Link to={`/jobApply/${_id}`}>
//         <button className="btn btn-primary">Apply Now</button>
//       </Link>
//     </div>
//   );
// };

// export default JobDetails;


import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ImSpinner9 } from "react-icons/im";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaTwitter,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
         const res = await axios.get(`https://career-code-server-with-crud.vercel.app/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-black">
        <ImSpinner9 className="animate-spin text-4xl text-cyan-400" />
      </div>
    );
  }

  if (!job) {
    return <div className="text-center text-red-500 my-10">Job not found</div>;
  }

  const { _id, title, company, description, location, salary } = job;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans px-4 md:px-10 py-10">
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto w-full flex-1">
        {/* Left Section */}
        <div className="w-full lg:w-2/3">
          {/* Image */}
          <img
            src="https://i.ibb.co/2m2F9fh/ai-image.jpg"
            alt="AI Visual"
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />

          {/* Meta Info */}
          <div className="mt-4 space-y-2 px-1 md:px-2">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition">
                Admin
              </span>
              <span className="hidden sm:inline-block">|</span>
              <span className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition">
                Model Training, Neural Networks
              </span>
              <span className="hidden sm:inline-block">|</span>
              <span className="text-gray-400">July 7, 2025</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-blue-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-blue-600 hover:text-white transition">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-blue-500 hover:text-white transition">
                <FaTelegramPlane size={20} />
              </a>
            </div>
          </div>

          {/* Job Info */}
          <div className="mt-6 space-y-2">
            <h2 className="text-3xl font-bold text-cyan-300">{title}</h2>
            <p>
              <span className="text-cyan-200 font-semibold">Company:</span>{" "}
              {company}
            </p>
            <p>
              <span className="text-cyan-200 font-semibold">Location:</span>{" "}
              {location}
            </p>
            <p>
              <span className="text-cyan-200 font-semibold">Salary:</span> $
              {salary}
            </p>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-300">{description}</p>

              <Link to={`/jobApply/${_id}`}>
            <button className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded transition">
              Apply Now
            </button>
          </Link>

          {/* Comment Section */}
          <div className="mt-10 bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-white">
              Leave a Comment
            </h3>
            <form className="space-y-4">
              <textarea
                rows="4"
                placeholder="Your Comment"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
              ></textarea>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Your Website"
                  className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                />
              </div>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded transition">
               POST COMMENT
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-8">
          {/* Search */}
          <div className="bg-black p-5 rounded-lg shadow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 pr-10 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                onClick={() => console.log("Search clicked")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Archives */}
          <div className="bg-black p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Archives</h3>
            <p className="text-gray-400">July 2025</p>
          </div>

          {/* Categories */}
          <div className="bg-black p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Categories</h3>
            <ul className="text-gray-300 list-disc ml-5 space-y-1">
              <li>Model Training</li>
              <li>Neural Networks</li>
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-gray-900 p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Post Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition ">
                
                Google Analytics
              </span>
              <span className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition">
                SEO
              </span>
              <span className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition">
                CMS
              </span>
              <span className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition">
                Excel
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center py-4 bg-gray-950 w-full border-t border-gray-800">
        <p className="text-sm text-gray-500">
          © 2025 GoatMark Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default JobDetails;