import { useEffect, useState } from "react";
import { Square } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function JobTitles() {
  const [jobCounts, setJobCounts] = useState([]);
  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          axiosInstance.get("/jobs"),
          axiosInstance.get("/applications"),
        ]);

        const jobs = jobsRes.data;
        const applications = appsRes.data;

        // Faster count using map
        const countsMap = applications.reduce((acc, app) => {
          acc[app.jobId] = (acc[app.jobId] || 0) + 1;
          return acc;
        }, {});

        const counts = jobs.map(job => ({
          ...job,
          apps: countsMap[job._id] || 0,
        }));

        setJobCounts(counts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  if (jobCounts.length === 0) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-[#002B2C] border border-white/5 rounded-2xl p-5 text-white">
      <h3 className="font-semibold mb-3">Job Titles</h3>
      <div className="text-sm divide-y divide-[#1b3147]">
        {jobCounts.map((job, i) => (
          <div key={i} className="py-2 flex items-center">
            <div className="flex-1">
              <p className="font-semibold">{job.title}</p>
            </div>
            <div className="w-24 text-right">{job.apps}</div>
            <button className="ml-3 w-7 h-7 grid place-items-center rounded bg-[#0B0F10] border border-[#1b3147]">
              <Square className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
