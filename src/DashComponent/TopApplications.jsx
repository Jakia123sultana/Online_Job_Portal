import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function TotalApplications() {
  const [items, setItems] = useState([]);
  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    axiosInstance
      .get("/applications/status")
      .then((res) => {
        const data = res.data;
        setItems([
          { label: "Applications", value: data.applications.percent, color: "#a855f7" },
          { label: "Shortlisted", value: data.shortlisted.percent, color: "#22c55e" },
          { label: "On-Hold", value: data.onhold.percent, color: "#f59e0b" },
          { label: "Rejected", value: data.rejected.percent, color: "#ef4444" },
        ]);
      })
      .catch((err) => console.error(err));
  }, []);

  if (items.length === 0) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-[#002B2C] border border-white/5 rounded-2xl p-6 pb-22 text-white ">
      <h3 className="font-semibold mb-3">Total Applications</h3>

      {/* multicolor strip on top */}
      <div className="h-2 w-full rounded-full overflow-hidden flex mb-4 border border-[#1b3147]">
        {items.map((it, i) => (
          <div
            key={i}
            style={{ width: `${it.value}%`, background: it.color }}
            className="h-full"
          />
        ))}
      </div>

      {/* Legend with mini bars */}
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: it.color }}
            />
            <div className="flex-1 text-sm">{it.label}</div>
            <div className="relative flex-1 h-2 rounded-full bg-[#0B0F10] border border-[#1b3147]">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${it.value}%`, background: it.color }}
              />
            </div>
            <span className="w-10 text-right text-xs">{it.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
