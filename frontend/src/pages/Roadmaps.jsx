import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  PREDEFINED_ROADMAPS,
  ROADMAP_CATEGORIES,
  POPULAR_ROLES,
  generateCustomRoadmap,
} from "../data/roadmapData";

export default function Roadmaps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRoleParam = searchParams.get("role") || "";
  const initialSearchParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchParam || initialRoleParam);
  const [activeCategory, setActiveCategory] = useState("All Roles");
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(() => {
    if (initialRoleParam) {
      const match = PREDEFINED_ROADMAPS.find(
        (r) =>
          r.id.toLowerCase() === initialRoleParam.toLowerCase() ||
          r.role.toLowerCase() === initialRoleParam.toLowerCase()
      );
      if (match) return match.id;
    }
    return PREDEFINED_ROADMAPS[0].id;
  });

  const [customRoadmap, setCustomRoadmap] = useState(null);
  const [checkedTopics, setCheckedTopics] = useState({});
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Filter predefined roadmaps by category and search query
  const filteredRoadmaps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PREDEFINED_ROADMAPS.filter((roadmap) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All Roles" || roadmap.category === activeCategory;

      if (!matchesCategory) return false;

      // Query filter
      if (!query) return true;

      const titleMatch = roadmap.title.toLowerCase().includes(query);
      const roleMatch = roadmap.role.toLowerCase().includes(query);
      const aliasMatch = roadmap.aliases.some((a) => a.includes(query));
      const skillMatch = roadmap.keySkills.some((s) => s.toLowerCase().includes(query));
      const topicMatch = roadmap.phases.some((p) =>
        p.topics.some((t) => t.toLowerCase().includes(query))
      );

      return titleMatch || roleMatch || aliasMatch || skillMatch || topicMatch;
    });
  }, [searchQuery, activeCategory]);

  // Load progress from localStorage whenever selected roadmap changes
  useEffect(() => {
    const key = `roadmap_progress_${selectedRoadmapId}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setCheckedTopics(JSON.parse(saved));
      } else {
        setCheckedTopics({});
      }
    } catch {
      setCheckedTopics({});
    }
  }, [selectedRoadmapId]);

  // Determine current active roadmap (predefined or custom generated)
  const currentRoadmap = useMemo(() => {
    if (customRoadmap && selectedRoadmapId === customRoadmap.id) {
      return customRoadmap;
    }

    const found = PREDEFINED_ROADMAPS.find((r) => r.id === selectedRoadmapId);
    if (found) return found;

    if (filteredRoadmaps.length > 0) return filteredRoadmaps[0];

    // If no predefined match and search query exists, synthesize custom roadmap
    if (searchQuery.trim().length > 1) {
      return generateCustomRoadmap(searchQuery);
    }

    return PREDEFINED_ROADMAPS[0];
  }, [selectedRoadmapId, customRoadmap, filteredRoadmaps, searchQuery]);

  // Handle Search Submission or Custom Role Generation
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Check if query matches a predefined roadmap
    const exactMatch = PREDEFINED_ROADMAPS.find(
      (r) =>
        r.role.toLowerCase() === query.toLowerCase() ||
        r.aliases.some((a) => a.toLowerCase() === query.toLowerCase())
    );

    if (exactMatch) {
      setSelectedRoadmapId(exactMatch.id);
      setCustomRoadmap(null);
    } else {
      const generated = generateCustomRoadmap(query);
      setCustomRoadmap(generated);
      setSelectedRoadmapId(generated.id);
    }

    setSearchParams({ q: query });
  };

  const handleSelectRole = (roadmap) => {
    setSelectedRoadmapId(roadmap.id);
    setCustomRoadmap(null);
    setSearchParams({ role: roadmap.role });
  };

  const handleQuickRolePill = (roleName) => {
    setSearchQuery(roleName);
    const match = PREDEFINED_ROADMAPS.find(
      (r) =>
        r.role.toLowerCase() === roleName.toLowerCase() ||
        r.aliases.some((a) => a.toLowerCase() === roleName.toLowerCase())
    );

    if (match) {
      setSelectedRoadmapId(match.id);
      setCustomRoadmap(null);
      setSearchParams({ role: match.role });
    } else {
      const generated = generateCustomRoadmap(roleName);
      setCustomRoadmap(generated);
      setSelectedRoadmapId(generated.id);
      setSearchParams({ q: roleName });
    }
  };

  // Toggle Topic Checkbox & Save to localStorage
  const handleToggleTopic = (topicKey) => {
    const updated = {
      ...checkedTopics,
      [topicKey]: !checkedTopics[topicKey],
    };
    setCheckedTopics(updated);

    const key = `roadmap_progress_${currentRoadmap.id}`;
    try {
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save progress:", err);
    }
  };

  // Calculate Progress Percentage
  const progressStats = useMemo(() => {
    if (!currentRoadmap || !currentRoadmap.phases) return { total: 0, completed: 0, percent: 0 };
    let total = 0;
    let completed = 0;

    currentRoadmap.phases.forEach((phase, pIdx) => {
      phase.topics.forEach((_, tIdx) => {
        total += 1;
        const topicKey = `${currentRoadmap.id}_p${pIdx}_t${tIdx}`;
        if (checkedTopics[topicKey]) {
          completed += 1;
        }
      });
    });

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  }, [currentRoadmap, checkedTopics]);

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your checklist progress for this roadmap?")) {
      setCheckedTopics({});
      const key = `roadmap_progress_${currentRoadmap.id}`;
      localStorage.removeItem(key);
    }
  };

  // Copy Roadmap Markdown
  const handleCopyRoadmap = () => {
    if (!currentRoadmap) return;
    const text = `# ${currentRoadmap.title}
Role: ${currentRoadmap.role}
Duration: ${currentRoadmap.duration}
Average Salary: ${currentRoadmap.avgSalary}

Description:
${currentRoadmap.description}

## Key Skills:
${currentRoadmap.keySkills.map((s) => `- ${s}`).join("\n")}

## Learning Phases:
${currentRoadmap.phases
  .map(
    (p, i) => `### ${p.name} (${p.duration})
${p.description}
Deliverable: ${p.keyDeliverable}
Topics:
${p.topics.map((t) => `  - [ ] ${t}`).join("\n")}`
  )
  .join("\n\n")}

Source: SkillSync Learning Portal (https://skill-sync-learning-portal.vercel.app/roadmaps)
`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce text-sm font-semibold border border-emerald-400">
          <span>✓</span>
          <span>Roadmap syllabus copied to clipboard!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header & Hero Search Bar */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-800/80 text-red-400 text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Interactive Career Architecture 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Role-Based <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">Learning Roadmaps</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Search for any tech role to get an industry-aligned, 4-phase step-by-step master plan with milestones, topics, project blueprints, and interview prep.
          </p>

          {/* Interactive Search Bar Form */}
          <form onSubmit={handleSearchSubmit} className="relative mt-6 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 text-lg pointer-events-none">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any role (e.g. Full Stack, DevOps, AI / GenAI, Data Scientist, Cybersecurity)..."
                className="w-full pl-12 pr-32 py-4 bg-slate-900/90 border-2 border-slate-800 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 rounded-2xl text-white placeholder-slate-500 text-sm sm:text-base outline-none transition-all shadow-xl backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-24 text-slate-500 hover:text-slate-300 p-1 text-sm"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2.5 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-950/50 transition-all hover:scale-[1.02] active:scale-95"
              >
                Find Role
              </button>
            </div>
          </form>

          {/* Trending Role Quick Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold mr-1">Trending:</span>
            {POPULAR_ROLES.slice(0, 7).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleQuickRolePill(role)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  currentRoadmap?.role === role
                    ? "bg-red-900/40 border-red-500 text-red-200 font-bold"
                    : "bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
          {ROADMAP_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-red-600 text-white shadow-md shadow-red-950/50"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Role Cards Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRoadmaps.map((r) => {
            const isSelected = selectedRoadmapId === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleSelectRole(r)}
                className={`group relative p-5 rounded-2xl text-left border transition-all flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? "bg-slate-900 border-red-500 ring-2 ring-red-500/30 shadow-2xl shadow-red-950/40 scale-[1.01]"
                    : "bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700"
                }`}
              >
                {/* Glowing Top Accent for Selected Card */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                      {r.icon}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-red-400">
                      {r.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors">
                      {r.role}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {r.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">{r.category}</span>
                  <span className="text-emerald-400 font-bold">{r.difficulty}</span>
                </div>
              </button>
            );
          })}

          {/* Custom Roadmap Card if synthesized */}
          {customRoadmap && (
            <button
              onClick={() => setSelectedRoadmapId(customRoadmap.id)}
              className={`group relative p-5 rounded-2xl text-left border transition-all flex flex-col justify-between overflow-hidden bg-slate-900 border-amber-500/80 ring-2 ring-amber-500/20 shadow-xl`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-red-500" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {customRoadmap.icon}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-800/80 text-amber-300">
                    Custom Generated
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-amber-300">
                    {customRoadmap.role}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {customRoadmap.description}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">{customRoadmap.duration}</span>
                <span className="text-amber-400 font-bold">Generated Plan</span>
              </div>
            </button>
          )}
        </div>

        {/* If no results, show custom generator callout */}
        {filteredRoadmaps.length === 0 && !customRoadmap && searchQuery.trim() && (
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 max-w-xl mx-auto">
            <span className="text-4xl">💡</span>
            <h3 className="text-xl font-bold text-white">
              Generate Custom Roadmap for "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-400">
              We couldn't find a direct match in our standard catalog, but our AI curriculum synthesizer can generate a tailored 4-phase learning roadmap for this role right now.
            </p>
            <button
              onClick={() => handleSearchSubmit()}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Generate "{searchQuery}" Roadmap →
            </button>
          </div>
        )}

        {/* Selected Roadmap Detailed View */}
        {currentRoadmap && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Roadmap Header & Metadata */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-8">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-3xl sm:text-4xl p-3 bg-slate-950 border border-slate-800 rounded-2xl shadow-inner">
                    {currentRoadmap.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-950 border border-red-800 text-red-400">
                        {currentRoadmap.badge}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {currentRoadmap.category}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400">
                        {currentRoadmap.difficulty}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {currentRoadmap.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentRoadmap.description}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                      Est. Timeline
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      {currentRoadmap.duration}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                      Avg Salary
                    </span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      {currentRoadmap.avgSalary}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                      Industry Demand
                    </span>
                    <span className="text-sm font-extrabold text-amber-400">
                      {currentRoadmap.demand}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[220px]">
                <Link
                  to="/sheets"
                  className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/50 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Practice Relevant Sheets</span>
                  <span>→</span>
                </Link>
                <Link
                  to="/all-courses"
                  className="px-5 py-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Explore Courses</span>
                </Link>
                <button
                  onClick={handleCopyRoadmap}
                  className="px-5 py-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>📋 Copy Syllabus</span>
                </button>
              </div>
            </div>

            {/* Interactive Progress Tracking Bar */}
            <div className="p-5 bg-slate-950/90 rounded-2xl border border-slate-800/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <span>🎯 Your Learning Progress:</span>
                  <span className="text-red-400 font-extrabold">
                    {progressStats.completed} of {progressStats.total} topics completed ({progressStats.percent}%)
                  </span>
                </div>
                {progressStats.completed > 0 && (
                  <button
                    onClick={handleResetProgress}
                    className="text-slate-500 hover:text-red-400 text-xs underline font-medium"
                  >
                    Reset Progress
                  </button>
                )}
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressStats.percent}%` }}
                />
              </div>
            </div>

            {/* Core Skills Badges */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Essential Tech Stack & Skills:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentRoadmap.keySkills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            {currentRoadmap.prerequisites && currentRoadmap.prerequisites.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  📌 Recommended Prerequisites:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {currentRoadmap.prerequisites.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-center gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4-Phase Chronological Timeline */}
            <div className="space-y-8 pt-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span>🗺️</span>
                  <span>Step-by-Step Learning Timeline</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click on topics as you complete them to track your mastery.
                </p>
              </div>

              <div className="space-y-8">
                {currentRoadmap.phases.map((phase, pIdx) => (
                  <div
                    key={pIdx}
                    className="relative pl-6 sm:pl-8 border-l-2 border-red-500/40 space-y-4"
                  >
                    {/* Glowing Milestone Dot */}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-red-500 border-4 border-slate-900 shadow-md shadow-red-500/50" />

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-red-950/80 border border-red-800 text-red-400">
                          {phase.duration}
                        </span>
                        <h4 className="text-lg font-black text-white">
                          {phase.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400">
                        {phase.description}
                      </p>
                    </div>

                    {/* Key Deliverable Box */}
                    {phase.keyDeliverable && (
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-red-950/80 text-xs text-slate-300 flex items-start gap-2.5">
                        <span className="text-red-400 font-bold text-sm">🏆</span>
                        <div>
                          <span className="font-bold text-white block">
                            Milestone Project Deliverable:
                          </span>
                          <span className="text-slate-400">{phase.keyDeliverable}</span>
                        </div>
                      </div>
                    )}

                    {/* Topic Checklist Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                      {phase.topics.map((topic, tIdx) => {
                        const topicKey = `${currentRoadmap.id}_p${pIdx}_t${tIdx}`;
                        const isChecked = !!checkedTopics[topicKey];

                        return (
                          <div
                            key={tIdx}
                            onClick={() => handleToggleTopic(topicKey)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                              isChecked
                                ? "bg-emerald-950/30 border-emerald-800/80 text-emerald-200"
                                : "bg-slate-950/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 mt-0.5 rounded-lg flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
                                isChecked
                                  ? "bg-emerald-500 text-slate-950"
                                  : "border-2 border-slate-700 bg-slate-900"
                              }`}
                            >
                              {isChecked ? "✓" : ""}
                            </div>
                            <span className={`text-xs leading-relaxed ${isChecked ? "line-through text-slate-400" : ""}`}>
                              {topic}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Capstone Blueprints */}
            {currentRoadmap.projects && currentRoadmap.projects.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>🚀</span>
                    <span>Portfolio Capstone Project Blueprints</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Build these real-world production projects to stand out to engineering hiring managers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentRoadmap.projects.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
                    >
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <span className="text-red-400">#0{pIdx + 1}</span>
                        <span>{proj.title}</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="pt-2 border-t border-slate-900 flex items-center gap-2 text-[11px] text-red-300 font-medium">
                        <span className="text-slate-500">Tech Stack:</span>
                        <span>{proj.tech}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Prep Focus Checklist */}
            {currentRoadmap.interviewPrep && currentRoadmap.interviewPrep.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>💡</span>
                    <span>Top Interview Focus Questions</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    High-frequency technical interview concepts tested for {currentRoadmap.role} roles.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {currentRoadmap.interviewPrep.map((q, qIdx) => (
                    <div
                      key={qIdx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-3"
                    >
                      <span className="text-red-400 font-extrabold">Q{qIdx + 1}.</span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
