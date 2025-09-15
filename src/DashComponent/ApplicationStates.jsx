import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function ApplicationsStats() {
  const [stats, setStats] = useState(null);
const axiosInstance = useAxiosSecure()
  useEffect(() => {
    axiosInstance.get(`/applications/status`)
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="px-5 pt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatsCard 
        title="Applications" 
        value={stats.applications.count} 
        percent={stats.applications.percent} 
        ring="#7C3AED" 
      />
      <StatsCard 
        title="Shortlisted" 
        value={stats.shortlisted.count} 
        percent={stats.shortlisted.percent} 
        ring="#22C55E" 
      />
      <StatsCard 
        title="On Hold" 
        value={stats.onhold.count} 
        percent={stats.onhold.percent} 
        ring="#F59E0B" 
      />
    </div>
  );
}
