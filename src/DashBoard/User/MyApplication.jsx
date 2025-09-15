import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

export default function MyApplication() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);

  const limit = 5; // Show 5 applications per page

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/applications?email=${user.email}`)
        .then((res) => {
          const apps = res.data.map((app) => ({
            ...app,
            status: app.status || "on hold",
          }));
          setApplications(apps);
        })
        .catch((err) => {
          console.error("Failed to load applications:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [axiosSecure, user?.email]);

  const filters = ["All", "Shortlisted", "Rejected", "On Hold"];
  const filteredApps =
    activeFilter === "All"
      ? applications
      : applications.filter((app) => {
          if (activeFilter === "On Hold") {
            return !["shortlisted", "rejected"].includes(app.status);
          }
          return app.status === activeFilter.toLowerCase();
        });

  // Pagination
  const totalPages = Math.ceil(filteredApps.length / limit);
  const startIndex = (page - 1) * limit;
  const currentApps = filteredApps.slice(startIndex, startIndex + limit);

  const getStatusColor = (status) => {
    switch (status) {
      case "shortlisted":
        return "rounded-2xl border border-green-400 py-1 px-3 bg-green-500 text-white text-xs sm:text-sm";
      case "rejected":
        return "rounded-2xl border border-red-400 py-1 px-3 bg-red-500 text-white text-xs sm:text-sm";
      case "on hold":
      default:
        return "rounded-2xl border border-yellow-400 py-1 px-3 bg-yellow-500 text-white text-xs sm:text-sm";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-[#00ced1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#061F21] border border-white/5 p-4 sm:p-6 text-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">My Applications</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setPage(1);
            }}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
              activeFilter === filter
                ? "bg-[#00ced1] text-white"
                : "text-gray-400 hover:bg-[#1b3147]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#002B2C] border border-white/5 text-gray-300 uppercase text-xs tracking-wider">
              <th className="px-6 py-3">Applicant</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1b3147]">
            {currentApps.map((app) => (
              <tr key={app._id} className="hover:bg-[#002B2C]">
                {/* Applicant */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={app.profilePic}
                    alt={app.name}
                    className="w-10 h-10 rounded-full border border-[#1b3147]"
                  />
                  <div>
                    <p className="font-semibold">{app.name}</p>
                    <p className="text-gray-400 text-xs">{app.applicant}</p>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    {app.github && (
                      <a
                        href={app.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
                      >
                        <FaGithub size={16} />
                      </a>
                    )}
                    {app.linkedIn && (
                      <a
                        href={app.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
                      >
                        <FaLinkedin size={16} />
                      </a>
                    )}
                    {app.resume && (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
                      >
                        <FaFileAlt size={16} />
                      </a>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={getStatusColor(app.status)}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (Mobile) */}
      <div className="space-y-4 md:hidden">
        {currentApps.map((app) => (
          <div
            key={app._id}
            className="bg-[#002B2C] border border-[#1b3147] rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={app.profilePic}
                alt={app.name}
                className="w-12 h-12 rounded-full border border-[#1b3147]"
              />
              <div>
                <p className="font-semibold">{app.name}</p>
                <p className="text-gray-400 text-xs">{app.applicant}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {app.github && (
                <a
                  href={app.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
                >
                  <FaGithub size={16} />
                </a>
              )}
              {app.linkedIn && (
                <a
                  href={app.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
                >
                  <FaLinkedin size={16} />
                </a>
              )}
              {app.resume && (
                <a
                  href={app.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"
                >
                  <FaFileAlt size={16} />
                </a>
              )}
            </div>

            <div>
              <span className={getStatusColor(app.status)}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-[#1b3147] flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-400 mt-6">
        <p className="text-sm sm:text-lg text-white">
          Showing {currentApps.length} from {filteredApps.length} applications
        </p>
        <div className="flex items-center space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147] disabled:opacity-50 text-sm"
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
            className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147] disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
