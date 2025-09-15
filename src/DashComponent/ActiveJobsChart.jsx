import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { m: "Jan", Applications: 12, Shortlisted: 6 },
  { m: "Feb", Applications: 18, Shortlisted: 9 },
  { m: "Mar", Applications: 25, Shortlisted: 12 },
  { m: "Apr", Applications: 33, Shortlisted: 16 },
  { m: "May", Applications: 42, Shortlisted: 20 },
  { m: "Jun", Applications: 36, Shortlisted: 18 },
  { m: "Jul", Applications: 50, Shortlisted: 25 },
  { m: "Aug", Applications: 55, Shortlisted: 28 },
  { m: "Sep", Applications: 48, Shortlisted: 24 },
  { m: "Oct", Applications: 60, Shortlisted: 30 },
  { m: "Nov", Applications: 70, Shortlisted: 34 },
  { m: "Dec", Applications: 58, Shortlisted: 28 },
];

export default function ActiveJobsChart() {
  return (
    <div className="bg-[#002B2C] border border-white/5 rounded-2xl p-5 text-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Active Jobs</h3>
        <button className="text-[11px] px-2 py-0.5 bg-[#0B0F10] rounded-md border border-[#1f3650]">View List</button>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="m" stroke="#9aa7b3" />
            <YAxis stroke="#9aa7b3" />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="Applications" fill="#7C3AED" radius={[3,3,0,0]} />
            <Bar dataKey="Shortlisted" fill="#22C55E" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
