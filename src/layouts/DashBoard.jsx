import { Outlet, useLocation } from "react-router";
import Sidebar from "../DashComponent/Sidebar";
import Topbar from "../DashComponent/Topbar";
import ApplicationsStats from "../DashComponent/ApplicationStates";
import { Suspense, lazy, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

// Lazy load heavy widgets
const ActiveJobsChart = lazy(() => import("../DashComponent/ActiveJobsChart"));
const JobTitles = lazy(() => import("../DashComponent/JobTitle"));
const TotalApplications = lazy(() => import("../DashComponent/TopApplications"));
const NewApplications = lazy(() => import("../DashComponent/NewApplications"));
const CalendarWidget = lazy(() => import("../DashComponent/CalendarWidget"));
const ScheduledMeetings = lazy(() => import("../DashComponent/ScheduledMeetings"));

export default function Dashboard() {
  const location = useLocation();
  const isRootDashboard = location.pathname === "/dashboard";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F10] text-white flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#111418] transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out 
          md:translate-x-0 md:static md:block`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-0">
        {/* Topbar with menu button */}
        <div className="flex items-center justify-between md:justify-end px-4 py-3 border-b border-white/10">
          {/* Sidebar Toggle Button (only mobile) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-white text-2xl"
          >
            <FiMenu />
          </button>
          <Topbar />
        </div>

        {isRootDashboard ? (
          <>
            {/* Stats section */}
            <div className="px-4 sm:px-6 md:px-8 py-6">
              <ApplicationsStats />
            </div>

            {/* Widgets Grid */}
            <div className="px-4 sm:px-6 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="xl:col-span-6 space-y-6">
                <Suspense fallback={<div className="h-64 bg-gray-800 animate-pulse rounded-lg" />}>
                  <ActiveJobsChart />
                </Suspense>
                <Suspense fallback={<div className="h-64 bg-gray-800 animate-pulse rounded-lg" />}>
                  <JobTitles />
                </Suspense>
              </div>

              {/* Middle Column */}
              <div className="xl:col-span-3 space-y-6">
                <Suspense fallback={<div className="h-40 bg-gray-800 animate-pulse rounded-lg" />}>
                  <TotalApplications />
                </Suspense>
                <Suspense fallback={<div className="h-40 bg-gray-800 animate-pulse rounded-lg" />}>
                  <NewApplications />
                </Suspense>
              </div>

              {/* Right Column */}
              <div className="xl:col-span-3 space-y-6">
                <Suspense fallback={<div className="h-40 bg-gray-800 animate-pulse rounded-lg" />}>
                  <CalendarWidget />
                </Suspense>
                <Suspense fallback={<div className="h-40 bg-gray-800 animate-pulse rounded-lg" />}>
                  <ScheduledMeetings />
                </Suspense>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 sm:p-6 md:p-8">
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
}
