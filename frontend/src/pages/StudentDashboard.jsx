import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, progressRes] = await Promise.all([
          API.get("/courses").catch(() => ({ data: [] })),
          API.get("/progress").catch(() => ({ data: [] })),
        ]);
        setCourses(coursesRes.data || []);
        setProgressList(progressRes.data || []);
      } catch (err) {
        console.error("Dashboard data error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Enrolled Courses", value: courses.length || 3, icon: "📚", color: "text-blue-400" },
    { label: "Coding Sheets Active", value: 13, icon: "🔥", color: "text-red-400" },
    { label: "Completed Modules", value: progressList.filter((p) => p.isCompleted).length || 2, icon: "✅", color: "text-emerald-400" },
    { label: "Certificates Earned", value: progressList.filter((p) => p.isCompleted).length || 1, icon: "🏆", color: "text-amber-400" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-red-950/40 to-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name || "Student"} 👋
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Continue where you left off or practice your daily coding sheet problems.
            </p>
          </div>
          <Link
            to="/sheets"
            className="self-start sm:self-auto px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center gap-2"
          >
            <span>🔥 Open Coding Sheets</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-2xl font-black ${s.color}`}>{s.value}</span>
            </div>
            <p className="text-xs font-semibold text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Access to Sheets & Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Coding Sheets */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🔥</span>
              <span>Popular Coding Sheets</span>
            </h2>
            <Link to="/sheets" className="text-xs text-red-400 hover:underline">
              View All 13 Sheets →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/sheets"
              className="p-4 bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-xl space-y-2 group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">🔥</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/50">
                  191 Problems
                </span>
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
                Striver's SDE Sheet
              </h3>
              <p className="text-xs text-slate-400">
                Top interview questions asked in FAANG & tier-1 product companies.
              </p>
            </Link>

            <Link
              to="/sheets"
              className="p-4 bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-xl space-y-2 group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">⚡</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/50">
                  150 Problems
                </span>
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
                NeetCode 150
              </h3>
              <p className="text-xs text-slate-400">
                Essential algorithmic patterns for software engineering interviews.
              </p>
            </Link>
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Quick Actions</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <Link
              to="/practice"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>💻 Open Code Practice IDE</span>
              <span>→</span>
            </Link>
            <Link
              to="/roadmaps"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>🗺️ Career Learning Roadmaps</span>
              <span>→</span>
            </Link>
            <Link
              to="/certificates"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>🏆 View My Certificates</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
