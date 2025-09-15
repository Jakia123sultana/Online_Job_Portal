import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ImSpinner9 } from "react-icons/im";
import { FaFacebookF, FaTelegramPlane, FaTwitter, FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast"; // ✅ toast import

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const axiosInstance = useAxiosSecure();

  const { _id, title, company, description, location, salaryRange, company_logo, applicationDeadline, responsibilities, requirements,
  category, jobType } = job || {};

  const dateObj = new Date(applicationDeadline);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const year = dateObj.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, axiosInstance]);

  // Fetch comments from backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [id, axiosInstance]);

  // Post comment to backend
  const handlePostComment = async (e) => {
    e.preventDefault();
    const commentData = {
      name: e.target.name.value,
      email: e.target.email.value,
      website: e.target.website.value,
      text: e.target.comment.value,
      date: new Date().toISOString(),
    };

    try {
      const res = await axiosInstance.post(`/jobs/${id}/comments`, commentData);
      setComments([res.data, ...comments]); // add new comment to state
      toast.success("Comment posted successfully!"); // ✅ show toast
      e.target.reset();
    } catch (err) {
      console.error("Error posting comment:", err);
      toast.error("Failed to post comment");
    }
  };

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

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans px-4 md:px-10 py-10">
      <Toaster position="top-right" /> {/* ✅ toast container */}

      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto w-full flex-1">
        {/* Left Section */}
        <div className="w-full lg:w-2/3">
          <img src={company_logo} alt="Company Logo" className="w-full h-[400px] object-cover rounded-lg shadow-md" />

          <div className="mt-4 space-y-2 px-1 md:px-2">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition">
                Admin
              </span>
              <span className="hidden sm:inline-block">|</span>
              <span className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition">
                {category} , {jobType}
              </span>
              <span className="hidden sm:inline-block">|</span>
              <span className="text-gray-400">{formattedDate}</span>
            </div>

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

          <div className="mt-6 space-y-2">
            <h2 className="text-3xl font-bold text-cyan-300">{title}</h2>
            <p><span className="text-cyan-200 font-semibold">Company:</span> {company}</p>
            <p><span className="text-cyan-200 font-semibold">Location:</span> {location}</p>
            <p><span className="text-cyan-200 font-semibold">Salary:</span> {salaryRange.min}k - {salaryRange.max}k</p>
          </div>

          <p className="mt-4 text-sm text-gray-300">{description}</p>

          <Link to={`/jobApply/${_id}`}>
            <button className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded transition">
              Apply Now
            </button>
          </Link>
        </div>

        {/* Right Sidebar */}
      {/* Right Sidebar */} <aside className="w-full lg:w-1/3 flex flex-col gap-8"> {/* Search */} <div className="bg-black p-5 rounded-lg shadow"> <div className="relative"> <input type="text" placeholder="Search" className="w-full p-2 pr-10 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none" /> <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition" onClick={() => console.log("Search clicked")} > <FaSearch /> </button> </div> </div> {/* Archives */} <div className="bg-black p-5 rounded-lg shadow"> <h3 className="text-xl font-semibold mb-3">Archives</h3> <p className="text-gray-400">{formattedDate}</p> </div> {/* Categories */} <div className="bg-black p-5 rounded-lg shadow"> <h3 className="text-xl font-semibold mb-3">Responsibilities</h3> <ul className="text-gray-300 list-disc ml-5 space-y-1"> {responsibilities.map((res, index) => ( <li key={index}>{res}</li> ))} </ul> </div> {/* Tags */} <div className="bg-gray-900 p-5 rounded-lg shadow"> <h3 className="text-xl font-semibold mb-3">Post Tags</h3> <div className="flex flex-wrap gap-2"> {requirements.map((req, index) => ( <span key={index} className="bg-gray-800 text-gray-400 hover:text-white px-3 py-1 rounded-full text-sm transition" > {req} </span> ))} </div> </div> </aside>
      </div>

      {/* Comments Section */}
    {/* Comments Section */}
<div className="flex flex-col lg:flex-row gap-8 mt-10">
  <div className="bg-gray-900 p-6 rounded-lg w-full lg:w-2/3">
    <h3 className="text-xl font-bold mb-4 text-white">Comments</h3>

    <form className="space-y-4" onSubmit={handlePostComment}>
      <textarea
        name="comment"
        rows="4"
        placeholder="Your Comment"
        className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
        required
      ></textarea>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input name="name" type="text" placeholder="Your Name" className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none" required />
        <input name="email" type="email" placeholder="Your Email" className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none" required />
        <input name="website" type="text" placeholder="Your Website" className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none" />
      </div>
      <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded transition w-full sm:w-auto">
        POST COMMENT
      </button>
    </form>

    <div className="mt-6 space-y-4">
      {comments.length === 0 ? (
        <p className="text-gray-400">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((c, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
              <span className="font-semibold text-cyan-300">{c.name}</span>
              <span className="text-gray-400 text-xs">{new Date(c.date).toLocaleString()}</span>
            </div>
            <p className="text-gray-300">{c.text}</p>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Related Jobs Section */}
  <div className="w-full lg:w-1/3">
    <h3 className="text-2xl font-bold text-white mb-4">Related Jobs</h3>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
      <img src="https://i.ibb.co.com/wrLzHRkt/datawork.jpg" alt="Team 1" className="w-full h-48 md:h-56 object-cover rounded-lg" />
      <img src="https://i.ibb.co.com/JwhF5SQR/team.jpg" alt="Team 2" className="w-full h-40 md:h-48 object-cover rounded-lg" />
      <img src="https://i.ibb.co.com/ccrKKQ7p/ux-ui.webp" alt="Team 3" className="w-full h-40 md:h-48 object-cover rounded-lg" />
      <img src="https://i.ibb.co.com/S4bCK9LY/netflex.jpg" alt="Team 4" className="w-full h-56 md:h-64 object-cover rounded-lg" />
    </div>
  </div>
</div>

    </div>
  );
};

export default JobDetails;
