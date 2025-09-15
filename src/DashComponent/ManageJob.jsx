import { useEffect, useState, useRef } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";

const JobBoard = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;
  const axiosSecure = useAxiosSecure();
  const [activeMenu, setActiveMenu] = useState(null);

  const wrapperRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/jobs")
      .then((res) => {
        const jobs = res.data?.jobs || res.data || [];
        setAllJobs(jobs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages = Math.ceil(allJobs.length / limit);
  const startIndex = (page - 1) * limit;
  const currentJobs = allJobs.slice(startIndex, startIndex + limit);

  const handleVerify = (id) => {
    Swal.fire({
      title: "Verify this job?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, verify",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/jobs/${id}/verify`).then(() => {
          Swal.fire("Verified!", "", "success");
          setAllJobs((prev) =>
            prev.map((job) => (job._id === id ? { ...job, verified: true } : job))
          );
        });
      }
      setActiveMenu(null);
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/jobs/${id}`).then(() => {
          Swal.fire("Deleted!", "", "success");
          setAllJobs((prev) => prev.filter((job) => job._id !== id));
        });
      }
      setActiveMenu(null);
    });
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <p className="text-white text-xl sm:text-2xl font-semibold">
          Showing {currentJobs.length} Job Results
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 rounded bg-[#00ced1]">Newest</button>
          <button className="p-2 border border-gray-600 rounded hover:bg-[#1b3147]">☰</button>
          <button className="p-2 border border-gray-600 rounded hover:bg-[#1b3147]">☷</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-[#00ced1] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Job Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentJobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#061F21] border border-white/5 p-5 shadow hover:shadow-lg transition relative rounded-2xl flex flex-col justify-between"
                ref={wrapperRef}
              >
                {/* Three-dot menu */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === job._id ? null : job._id)
                    }
                  >
                    <FaEllipsisV className="text-gray-400" />
                  </button>

                  {activeMenu === job._id && (
                    <div className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-[#1b3147] ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        {!job.verified && (
                          <button
                            onClick={() => handleVerify(job._id)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2b425a]"
                          >
                            Verify
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#2b425a]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Job info */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-300 truncate">{job.company}</h3>
                  <h2 className="text-lg font-bold mb-1 truncate">{job.title}</h2>
                  <p className="text-gray-400 text-sm mb-2">
                    {job.salaryRange?.max}-{job.salaryRange?.min}
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-2">{job.description}</p>
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-[#002B2C] border border-white/5 text-[#00CED1]">
                      {job.type || "REMOTE"}
                    </span>
                    <p className="text-gray-400 text-xs truncate">{job.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-2 sm:px-6 py-4 border-t border-[#1b3147] flex flex-col sm:flex-row justify-between items-center text-gray-400 mt-6 gap-3 sm:gap-0">
            <p className="text-white text-sm sm:text-lg">
              Showing {currentJobs.length} from {allJobs.length} jobs
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147] disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    page === i + 1
                      ? "bg-[#00ced1] text-white"
                      : "border border-[#1b3147] hover:bg-[#1b3147]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobBoard;
