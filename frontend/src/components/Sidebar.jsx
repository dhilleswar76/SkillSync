import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const links = [
    { to: "/dashboard", label: "My Learning", icon: "📊" },
    { to: "/all-courses", label: "Browse Courses", icon: "📚" },
    { to: "/sheets", label: "Coding Sheets", icon: "🔥", badge: "HOT" },
    { to: "/roadmaps", label: "Career Roadmaps", icon: "🗺️" },
    { to: "/practice", label: "Code Practice IDE", icon: "💻" },
    { to: "/progress", label: "My Progress", icon: "📈" },
    { to: "/certificates", label: "Certificates", icon: "🏆" },
    { to: "/profile", label: "Account Profile", icon: "👤" },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-800">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-red-950/40">
          S
        </div>
        <span className="text-lg font-extrabold text-white">
          Skill<span className="text-red-500">Sync</span>
        </span>
      </div>

      {/* Nav list */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Learning & Practice
        </div>
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-red-600/10 text-red-400 border border-red-500/20 font-semibold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="pt-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500">
              Admin Portal
            </div>
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                location.pathname === "/admin"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <span className="text-lg">⚙️</span>
              <span>Admin Dashboard</span>
            </Link>
          </>
        )}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-red-400">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || "Student"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="p-1.5 text-slate-500 hover:text-slate-200 rounded-lg hover:bg-slate-900 transition-colors"
            title="Sign out"
          >
            🚪
          </button>
        </div>
      </div>
    </aside>
  );
}
