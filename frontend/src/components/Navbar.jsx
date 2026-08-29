import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-red-950/50">
            S
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Skill<span className="text-red-500">Sync</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/all-courses" className="hover:text-red-400 transition-colors">
            Courses
          </Link>
          <Link to="/sheets" className="text-red-400 font-semibold flex items-center gap-1">
            <span>🔥</span>
            <span>Coding Sheets</span>
          </Link>
          <Link to="/roadmaps" className="hover:text-red-400 transition-colors">
            Roadmaps
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="hover:text-red-400 transition-colors">
                Dashboard
              </Link>
              <Link to="/practice" className="hover:text-red-400 transition-colors">
                Code IDE
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
            title="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-red-400"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-red-400">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="hidden sm:inline">{user?.name || "Student"}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-semibold text-white shadow-md shadow-red-950/40 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
