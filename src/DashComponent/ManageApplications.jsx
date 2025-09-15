// import { useEffect, useState, useRef } from "react";
// import { FaGithub, FaLinkedin, FaFileAlt, FaEllipsisV } from "react-icons/fa";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAuth from "../hooks/useAuth";

// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [openMenu, setOpenMenu] = useState(null);
//   const [page, setPage] = useState(1);

//   const { isAdmin } = useAuth();
//   console.log(isAdmin)
//   const axiosSecure = useAxiosSecure();
//   const menuRef = useRef(null);

//   const limit = 5;

//   // Fetch applications
//   useEffect(() => {
//     axiosSecure
//       .get("/applications")
//       .then((res) => {
//         const apps = res.data.map((app) => ({
//           ...app,
//           status: app.status || "on hold",
//         }));
//         setApplications(apps);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [axiosSecure]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // const handleStatusChange = async (id, status) => {
//   //   try {
//   //     const normalizedStatus = status.toLowerCase();
//   //     await axiosSecure.patch(`/applications/${id}/status`, { status: normalizedStatus });
//   //     setApplications((prev) =>
//   //       prev.map((app) => (app._id === id ? { ...app, status: normalizedStatus } : app))
//   //     );
//   //     setOpenMenu(null);
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };
// const handleStatusChange = async (id, status) => {
//   try {
//     const normalizedStatus = status.toLowerCase();
//     await axiosSecure.patch(`/applications/${id}/status`, { status: normalizedStatus });
//     setApplications((prev) =>
//       prev.map((app) => (app._id === id ? { ...app, status: normalizedStatus } : app))
//     );
//     // ❌ remove setOpenMenu(null);
//   } catch (err) {
//     console.error(err);
//   }
// };

//   const filters = ["All", "Shortlisted", "Rejected", "On Hold"];
//   const filteredApps =
//     activeFilter === "All"
//       ? applications
//       : applications.filter((app) => {
//           if (activeFilter === "On Hold") return !["shortlisted", "rejected"].includes(app.status);
//           return app.status === activeFilter.toLowerCase();
//         });

//   const totalPages = Math.ceil(filteredApps.length / limit);
//   const startIndex = (page - 1) * limit;
//   const currentApps = filteredApps.slice(startIndex, startIndex + limit);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "shortlisted":
//         return "bg-green-500 text-white";
//       case "rejected":
//         return "bg-red-500 text-white";
//       case "on hold":
//       default:
//         return "bg-yellow-500 text-white";
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="w-12 h-12 border-4 border-[#00ced1] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#061F21] border border-white/5 p-4 sm:p-6 text-white">
//       <h2 className="text-2xl font-bold mb-4">My Applications</h2>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {filters.map((filter) => (
//           <button
//             key={filter}
//             onClick={() => {
//               setActiveFilter(filter);
//               setPage(1);
//             }}
//             className={`px-3 py-1 rounded-full text-sm font-medium ${
//               activeFilter === filter
//                 ? "bg-[#00ced1] text-white"
//                 : "text-gray-400 hover:bg-[#1b3147]"
//             }`}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>

//       {/* Table for medium+ screens */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full text-left text-sm">
//           <thead>
//             <tr className="bg-[#002B2C] border border-white/5 text-gray-300 uppercase text-xs tracking-wider">
//               <th className="px-6 py-3">Applicant</th>
//               <th className="px-6 py-3">Job</th>
//               <th className="px-6 py-3">Company</th>
//               <th className="px-6 py-3">Contact</th>
//               <th className="px-6 py-3">Status</th>
//               {isAdmin && <th className="px-6 py-3">Actions</th>}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#1b3147]">
//             {currentApps.map((app) => (
//               <tr key={app._id} className="hover:bg-[#002B2C] relative">
//                 {/* Applicant */}
//                 <td className="px-6 py-4 flex items-center gap-3">
//                   <img
//                     src={app.profilePic}
//                     alt={app.name}
//                     className="w-10 h-10 rounded-full border border-[#1b3147]"
//                   />
//                   <div>
//                     <p className="font-semibold">{app.name}</p>
//                     <p className="text-gray-400 text-xs">{app.applicant}</p>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">{app.title}</td>
//                 <td className="px-6 py-4 ">
                  
//                   <p>{app.company}</p>
//                 </td>
//                 <td className="px-6 py-4 flex gap-2">
//                   {app.github && <a href={app.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"><FaGithub size={16} /></a>}
//                   {app.linkedIn && <a href={app.linkedIn} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"><FaLinkedin size={16} /></a>}
//                   {app.resume && <a href={app.resume} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"><FaFileAlt size={16} /></a>}
//                 </td>
//                 <td className="px-6 py-4">
//                   <span className={`px-2 py-1 rounded text-xs ${getStatusColor(app.status)}`}>
//                     {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//                   </span>
//                 </td>
//                 {isAdmin=="admin" && (
//                   <td className="px-6 py-4 relative" ref={menuRef}>
//                     <button onClick={() => setOpenMenu(openMenu === app._id ? null : app._id)}>
//                       <FaEllipsisV className="cursor-pointer text-gray-400 hover:text-white" />
//                     </button>
//                     {openMenu === app._id && (
//                       <div className="absolute right-0 mt-2 w-32 bg-[#1b3147] border border-gray-600 rounded shadow-lg z-10">
//                         <button onClick={() => handleStatusChange(app._id, "shortlisted")} className="block w-full text-left px-4 py-2 text-sm hover:bg-green-700">Shortlist</button>
//                         <button onClick={() => handleStatusChange(app._id, "rejected")} className="block w-full text-left px-4 py-2 text-sm hover:bg-red-700">Reject</button>
//                         <button onClick={() => handleStatusChange(app._id, "on hold")} className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-700">On Hold</button>
//                       </div>
//                     )}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile cards */}
//       <div className="md:hidden flex flex-col gap-4">
//         {currentApps.map((app) => (
//           <div key={app._id} className="bg-[#072128] p-4 rounded-lg shadow-md flex flex-col gap-2">
//             <div className="flex justify-between items-start">
//               <div className="flex items-center gap-3">
//                 <img src={app.profilePic} alt={app.name} className="w-10 h-10 rounded-full border border-[#1b3147]" />
//                 <div>
//                   <p className="font-semibold">{app.name}</p>
//                   <p className="text-gray-400 text-xs">{app.applicant}</p>
//                 </div>
//               </div>
//               {/* {isAdmin && ( */}
//                 <div className="relative" ref={menuRef}>
//                   <button onClick={() => setOpenMenu(openMenu === app._id ? null : app._id)}>
//                     <FaEllipsisV className="cursor-pointer text-gray-400 hover:text-white" />
//                   </button>
//                   {openMenu === app._id && (
//                     <div className="absolute right-0 mt-2 w-32 bg-[#1b3147] border border-gray-600 rounded shadow-lg z-10">
//                       <button onClick={() => handleStatusChange(app._id, "shortlisted")} className="block w-full text-left px-4 py-2 text-sm hover:bg-green-700">Shortlist</button>
//                       <button onClick={() => handleStatusChange(app._id, "rejected")} className="block w-full text-left px-4 py-2 text-sm hover:bg-red-700">Reject</button>
//                       <button onClick={() => handleStatusChange(app._id, "on hold")} className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-700">On Hold</button>
//                     </div>
//                   )}
//                 </div>
//               {/* )} */}
//             </div>
//             <p className="text-sm font-semibold">{app.title}</p>
//             <p className="text-sm text-[#00ced1]">{app.company}</p>
//             <div className="flex gap-2 mt-1">
//               {app.github && <a href={app.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"><FaGithub size={16} /></a>}
//               {app.linkedIn && <a href={app.linkedIn} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"><FaLinkedin size={16} /></a>}
//               {app.resume && <a href={app.resume} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#1b3147] hover:bg-[#1b3147] text-gray-400 hover:text-white"><FaFileAlt size={16} /></a>}
//             </div>
//             <span className={`px-2 py-1 rounded text-xs mt-2 inline-block ${getStatusColor(app.status)}`}>
//               {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="px-2 sm:px-6 py-4 border-t border-[#1b3147] flex flex-col sm:flex-row justify-between items-center text-gray-400 mt-6 gap-3 sm:gap-0">
//         <p className="text-lg text-white">
//           Showing {currentApps.length} from {filteredApps.length} applications
//         </p>
//         <div className="flex flex-wrap items-center gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147] disabled:opacity-50"
//           >
//             Previous
//           </button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-3 py-1 rounded text-sm font-medium ${
//                 page === i + 1 ? "bg-[#00ced1] text-white" : "border border-[#1b3147] hover:bg-[#1b3147]"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-3 py-1 rounded border border-[#1b3147] hover:bg-[#1b3147] disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyApplications;
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaFileAlt, FaEllipsisV } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [page, setPage] = useState(1);

  const axiosSecure = useAxiosSecure();
  const limit = 5;

  // Fetch applications
  useEffect(() => {
    axiosSecure
      .get("/applications")
      .then((res) => {
        const apps = res.data.map((app) => ({
          ...app,
          status: app.status || "on hold",
        }));
        setApplications(apps);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle status change
  const handleStatusChange = async (id, status) => {
    try {
      const normalizedStatus = status.toLowerCase();
      await axiosSecure.patch(`/applications/${id}/status`, {
        status: normalizedStatus,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: normalizedStatus } : app
        )
      );
      setOpenMenu(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filters = ["All", "Shortlisted", "Rejected", "On Hold"];
  const filteredApps =
    activeFilter === "All"
      ? applications
      : applications.filter((app) => {
          if (activeFilter === "On Hold")
            return !["shortlisted", "rejected"].includes(app.status);
          return app.status === activeFilter.toLowerCase();
        });

  const totalPages = Math.ceil(filteredApps.length / limit);
  const startIndex = (page - 1) * limit;
  const currentApps = filteredApps.slice(startIndex, startIndex + limit);

  const getStatusColor = (status) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "on hold":
      default:
        return "bg-yellow-500 text-white";
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
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setActiveFilter(filter);
              setPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              activeFilter === filter
                ? "bg-[#00ced1] text-white"
                : "text-gray-400 hover:bg-[#1b3147]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table for medium+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#002B2C] border border-white/5 text-gray-300 uppercase text-xs tracking-wider">
              <th className="px-6 py-3">Applicant</th>
              <th className="px-6 py-3">Job</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1b3147]">
            {currentApps.map((app) => (
              <tr key={app._id} className="hover:bg-[#002B2C] relative">
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
                <td className="px-6 py-4">{app.title}</td>
                <td className="px-6 py-4">{app.company}</td>
                <td className="px-6 py-4 flex gap-2">
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
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-6 py-4 relative dropdown">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === app._id ? null : app._id)
                    }
                  >
                    <FaEllipsisV className="cursor-pointer text-gray-400 hover:text-white" />
                  </button>
                  {openMenu === app._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-[#1b3147] border border-gray-600 rounded shadow-lg z-10">
                      <button
                        onClick={() =>
                          handleStatusChange(app._id, "shortlisted")
                        }
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-green-700"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "rejected")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-red-700"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "on hold")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-700"
                      >
                        On Hold
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-4">
        {currentApps.map((app) => (
          <div
            key={app._id}
            className="bg-[#072128] p-4 rounded-lg shadow-md flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img
                  src={app.profilePic}
                  alt={app.name}
                  className="w-10 h-10 rounded-full border border-[#1b3147]"
                />
                <div>
                  <p className="font-semibold">{app.name}</p>
                  <p className="text-gray-400 text-xs">{app.applicant}</p>
                </div>
              </div>
              <div className="relative dropdown">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === app._id ? null : app._id)
                  }
                >
                  <FaEllipsisV className="cursor-pointer text-gray-400 hover:text-white" />
                </button>
                {openMenu === app._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#1b3147] border border-gray-600 rounded shadow-lg z-10">
                    <button
                      onClick={() =>
                        handleStatusChange(app._id, "shortlisted")
                      }
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-green-700"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "rejected")}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-red-700"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "on hold")}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-yellow-700"
                    >
                      On Hold
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm font-semibold">{app.title}</p>
            <p className="text-sm text-[#00ced1]">{app.company}</p>
            <div className="flex gap-2 mt-1">
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
            <span
              className={`px-2 py-1 rounded text-xs mt-2 inline-block ${getStatusColor(
                app.status
              )}`}
            >
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-2 sm:px-6 py-4 border-t border-[#1b3147] flex flex-col sm:flex-row justify-between items-center text-gray-400 mt-6 gap-3 sm:gap-0">
        <p className="text-lg text-white">
          Showing {currentApps.length} from {filteredApps.length} applications
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
    </div>
  );
};

export default MyApplications;

