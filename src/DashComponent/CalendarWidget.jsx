export default function CalendarWidget() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0 = Jan, 11 = Dec
  const currentDate = today.getDate();

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // First day of the month (0 = Sun, 6 = Sat)
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="bg-[#002B2C] border border-white/5 rounded-2xl p-6 shadow-lg text-white">
      <h3 className="mb-4">
        {monthNames[currentMonth]} {currentYear}
      </h3>

      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Weekday names */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <span key={i} className="text-gray-400 text-xs">
            {d}
          </span>
        ))}

        {/* Empty slots before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <span key={`empty-${i}`} />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <span
            key={day}
            className={`text-sm p-1 rounded cursor-pointer transition ${
              day === currentDate
                ? "bg-blue-500 text-white font-bold"
                : "hover:bg-[#0B0F10]"
            }`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}
