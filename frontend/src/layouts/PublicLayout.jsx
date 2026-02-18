import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
