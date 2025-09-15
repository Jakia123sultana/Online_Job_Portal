import { Bell, Settings, Sun, Lock, CalendarDays } from "lucide-react";

export default function Topbar() {
  return (
    <div className="h-14 px-5 flex items-center justify-end bg-[#0B0F10] text-white border-b border-[#0e2433]/40">
     
      <div className="flex items-center gap-2">
        {[CalendarDays, Sun, Settings, Bell, Lock].map((Icon, i) => (
          <button key={i} className="w-9 h-9 rounded-xl bg-[#061F21] border border-white/5 grid place-items-center hover:opacity-90">
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
