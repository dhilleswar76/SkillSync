import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <AuthModal />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <span className="font-bold text-slate-300">SkillSync Learning Portal</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/sheets" className="hover:text-red-400">Coding Sheets</Link>
            <Link to="/all-courses" className="hover:text-red-400">Courses</Link>
            <Link to="/roadmaps" className="hover:text-red-400">Roadmaps</Link>
          </div>
          <div>© {new Date().getFullYear()} SkillSync. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
