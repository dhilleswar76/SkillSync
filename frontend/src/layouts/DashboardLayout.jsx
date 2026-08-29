import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AuthModal from "../components/AuthModal";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <AuthModal />
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
