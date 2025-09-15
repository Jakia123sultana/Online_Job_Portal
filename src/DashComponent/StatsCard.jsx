// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// export default function StatsCard({ title, value, percent, ring }) {
//   return (
//     <div className="bg-[#0f1e2f] rounded-2xl px-6 py-4 text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)] flex items-center justify-between">
//       <div>
//         <p className="text-xs text-gray-300">{title}</p>
//         <p className="text-2xl font-extrabold mt-1">{value}</p>
//       </div>
//       <div className="w-14 h-14">
//         <CircularProgressbar
//           value={percent}
//           text={`${percent}%`}
//           strokeWidth={10}
//           styles={buildStyles({
//             textColor: "#d1d5db",
//             pathColor: ring,
//             trailColor: "#1d3147",
//             textSize: "28px",
//           })}
//         />
//       </div>
//     </div>
//   );
// }
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function StatsCard({ title, value, percent, ring }) {
  return (
    <div className="bg-[#002B2C] border border-white/5 rounded-2xl px-6 py-4 text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)] flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-300">{title}</p>
        <p className="text-2xl font-extrabold mt-1">
          {value?.toLocaleString() || 0}
        </p>
      </div>
      <div className="w-14 h-14">
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          strokeWidth={10}
          styles={buildStyles({
            textColor: "#d1d5db",
            pathColor: ring,
            trailColor: "#1d3147",
            textSize: "28px",
          })}
        />
      </div>
    </div>
  );
}
