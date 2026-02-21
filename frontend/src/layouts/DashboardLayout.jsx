import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-background-light dark:bg-background-dark min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
