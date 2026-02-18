import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
