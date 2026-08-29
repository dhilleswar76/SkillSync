import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function MyProgress() {
  const [completedProblems, setCompletedProblems] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("skillsync_completed_problems");
      if (saved) setCompletedProblems(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const totalSolved = Object.values(completedProblems).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Learning Analytics</h1>
          <p className="mt-2 text-sm text-slate-400">
            Track your coding sheet milestones, problem solve counts, and topic coverage.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-3xl">🔥</span>
            <div className="text-3xl font-black text-red-400">{totalSolved}</div>
            <p className="text-xs font-semibold text-slate-400">Coding Sheet Problems Solved</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-3xl">⚡</span>
            <div className="text-3xl font-black text-amber-400">4 Days</div>
            <p className="text-xs font-semibold text-slate-400">Current Practice Streak</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-3xl">🎯</span>
            <div className="text-3xl font-black text-emerald-400">92%</div>
            <p className="text-xs font-semibold text-slate-400">Quiz Accuracy Rate</p>
          </div>
        </div>

        {/* Quick CTA */}
        <div className="p-8 bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-900/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Continue Your Problem Solving Streak</h3>
            <p className="text-xs text-slate-400 mt-1">Jump right into Striver SDE or NeetCode 150 sheets.</p>
          </div>
          <Link
            to="/sheets"
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            Open Coding Sheets →
          </Link>
        </div>
      </div>
    </div>
  );
}
