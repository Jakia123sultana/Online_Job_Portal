const items = [
  { day: "Thu", title: "Interview", time: "8:50am – 9:50am" },
  { day: "Fri", title: "Organizational meeting", time: "9:00am – 10:00am" },
  { day: "Mon", title: "Meeting with the manager", time: "10:30am – 11:30am" },
  { day: "Sat", title: "Interview", time: "8:50am – 9:50am" },
  { day: "Fri", title: "Organizational meeting", time: "9:00am – 10:00am" },
];

export default function ScheduledMeetings() {
  return (
    <div className="bg-[#002B2C] border border-white/5 rounded-2xl p-5 text-white">
      <h3 className="font-semibold mb-3">Scheduled Meeting</h3>
      <div className="space-y-3 text-sm">
        {items.map((it, idx) => (
          <div key={idx} className="border-b border-[#1b3147] pb-3 last:border-b-0">
            <div className="text-xs text-gray-400">{it.day}</div>
            <div className="font-semibold">{it.title}</div>
            <div className="text-xs text-gray-400">{it.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
