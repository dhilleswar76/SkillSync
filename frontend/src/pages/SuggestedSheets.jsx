import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SHEETS_INFO } from "../data/problemSets";

export default function SuggestedSheets() {
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'dsa', 'cs'
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const navigate = useNavigate();

  // All sheets except the main admin sheet (or showing all with admin featured at top)
  const suggestedSheets = useMemo(() => {
    return SHEETS_INFO.filter((sheet) => {
      // Tab filter
      if (activeTab === "dsa" && (sheet.category === "CS Fundamentals" || sheet.id === "admin-sheet")) return false;
      if (activeTab === "cs" && sheet.category !== "CS Fundamentals") return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = sheet.name.toLowerCase().includes(query);
        const matchesAuthor = sheet.author.toLowerCase().includes(query);
        const matchesDesc = sheet.description.toLowerCase().includes(query);
        const matchesTags = sheet.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesAuthor && !matchesDesc && !matchesTags) return false;
      }

      // Difficulty filter
      if (difficultyFilter !== "all") {
        if (!sheet.difficulty.toLowerCase().includes(difficultyFilter.toLowerCase())) return false;
      }

      return true;
    });
  }, [activeTab, searchQuery, difficultyFilter]);

  const adminSheet = SHEETS_INFO.find((s) => s.id === "admin-sheet");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-3">
              <span>📚 Comprehensive Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Suggested Coding Sheets & CS Roadmaps
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">
              Explore industry-standard curated problem sheets from Striver, NeetCode, Blind 75, Love Babbar, and core CS Fundamentals.
            </p>
          </div>

          <Link
            to="/sheets"
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-red-950/50 flex items-center gap-2 transition-all"
          >
            <span>👑</span>
            <span>Go to Official Admin Sheet</span>
            <span>→</span>
          </Link>
        </div>

        {/* Featured Admin Sheet Quick Spotlight Card */}
        {adminSheet && (
          <div className="bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 border border-red-500/50 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Primary Curated Sheet
                </span>
                <span className="text-[11px] bg-red-950/80 text-red-400 border border-red-900 px-2 py-0.5 rounded-full font-semibold">
                  382 Questions • 17 Topics • 69 Patterns
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">
                Admin Sheet — Pattern-Wise DSA Curriculum
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                The flagship master sheet organized into 2-level topic and sub-module accordions (Two-Pointer, Sliding Window, Binary Search, Trees, DP) with dual LeetCode and GFG links.
              </p>
            </div>

            <Link
              to="/sheets?sheet=admin-sheet"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 self-start md:self-auto"
            >
              <span>⚡</span>
              <span>Solve Admin Sheet in IDE</span>
            </Link>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-medium self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "all" ? "bg-red-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All Collections ({SHEETS_INFO.length})
            </button>
            <button
              onClick={() => setActiveTab("dsa")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "dsa" ? "bg-red-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🔥 DSA Sheets ({SHEETS_INFO.filter((s) => s.category !== "CS Fundamentals").length})
            </button>
            <button
              onClick={() => setActiveTab("cs")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "cs" ? "bg-red-600 text-white font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              💻 CS Fundamentals ({SHEETS_INFO.filter((s) => s.category === "CS Fundamentals").length})
            </button>
          </div>

          {/* Search & Difficulty Select */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sheets, authors, topics..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-red-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard / Advanced</option>
            </select>
          </div>
        </div>

        {/* Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedSheets.map((sheet) => {
            const isFeatured = sheet.id === "admin-sheet";

            return (
              <div
                key={sheet.id}
                className={`bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-xl relative overflow-hidden group ${
                  isFeatured
                    ? "border-red-500/70 shadow-red-950/30 ring-1 ring-red-500/30"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  {/* Top Row: Icon, Title, Badges */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{sheet.icon}</span>
                      <div>
                        <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors">
                          {sheet.name}
                        </h3>
                        <p className="text-xs text-slate-400">{sheet.author}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 whitespace-nowrap">
                      {sheet.totalProblems} Qs
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {sheet.description}
                  </p>

                  {/* Tags & Source Label */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-5">
                    {sheet.sourceLabel && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                        🌐 {sheet.sourceLabel}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-950/70 text-red-400 border border-red-900/40">
                      {sheet.badge}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                      {sheet.difficulty}
                    </span>
                    {sheet.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons: Official Link (New Tab) & Solve in IDE */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                  {sheet.originalUrl && (
                    <a
                      href={sheet.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                      title={`Open official original ${sheet.name} in a new page`}
                    >
                      <span>🔗</span>
                      <span>Official Link</span>
                      <span className="text-[11px] text-slate-400">↗</span>
                    </a>
                  )}

                  <button
                    onClick={() => navigate(`/sheets?sheet=${sheet.id}`)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 ml-auto"
                  >
                    <span>Solve in IDE</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {suggestedSheets.length === 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center">
            <span className="text-4xl block mb-2">🔍</span>
            <h3 className="text-base font-bold text-white mb-1">No sheets matched your criteria</h3>
            <p className="text-xs text-slate-400 mb-4">Try clearing your search query or level filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
                setDifficultyFilter("all");
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
