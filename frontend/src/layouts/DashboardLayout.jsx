import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex relative">
        {/* Mobile backdrop overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar wrapper — drawer on mobile, static on desktop */}
        <div
          className={`fixed inset-y-0 left-0 z-30 md:static md:z-auto transform transition-transform duration-300 ease-in-out md:transform-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-background-light dark:bg-background-dark min-h-screen w-full overflow-x-hidden">
          {/* Mobile sidebar toggle button */}
          <button
            className="md:hidden mb-4 flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 text-sm font-medium"
            onClick={() => setSidebarOpen(true)}
          >
            <span>☰</span>
            <span>Menu</span>
          </button>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
