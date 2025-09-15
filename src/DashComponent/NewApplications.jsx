import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function NewApplications() {
  const [applications, setApplications] = useState([]);
  const axios = useAxiosSecure();

  useEffect(() => {
    axios
      .get("/applications/latest") // backend endpoint
      .then((res) => setApplications(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!applications || applications.length === 0)
    return <p className="text-white p-5">No new applications</p>;

  return (
    <div className="bg-[#002B2C] border border-white/5 rounded-2xl p-5 text-white">
      <h3 className="font-semibold mb-3">New Applications</h3>
      <div className="space-y-4">
        {applications.map((app, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border-b border-[#1b3147] pb-3 last:border-b-0"
          >
            <img
              src={app.profilePic || `https://i.pravatar.cc/48?u=${app.applicant}`}
              alt={app.name || app.applicant}
              className="w-10 h-10 rounded-full ring-2 ring-[#1b3147]"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{app.name || app.applicant}</p>
              {/* <p className="text-xs text-gray-400">{app.jobTitle || "Unknown Role"}</p> */}
            </div>
            <a
              href={app.resume || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] px-2 py-1 rounded bg-[#0B0F10] border border-[#1b3147]"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
