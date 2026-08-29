import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function StudentDashboard() {
  const { user, requireAuth } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [solvedProblemCount, setSolvedProblemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  // Fetch live enrolled courses and overall progress
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [enrolledRes, allCoursesRes] = await Promise.all([
        API.get("/courses/enrolled").catch(() => ({ data: [] })),
        API.get("/courses").catch(() => ({ data: [] })),
      ]);

      setEnrolledCourses(enrolledRes.data || []);
      setAvailableCourses(allCoursesRes.data || []);

      // Calculate solved coding sheet problems from localStorage
      try {
        let totalSolved = 0;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("coding_sheet_solved_ids") || key.startsWith("sheet_progress_"))) {
            const val = JSON.parse(localStorage.getItem(key) || "[]");
            if (Array.isArray(val)) {
              totalSolved += val.length;
            }
          }
        }
        setSolvedProblemCount(totalSolved);
      } catch {
        setSolvedProblemCount(0);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Quick 1-click enroll handler
  const handleQuickEnroll = async (courseId) => {
    requireAuth(async () => {
      try {
        setEnrollingId(courseId);
        await API.post(`/courses/${courseId}/enroll`);
        await fetchDashboardData();
      } catch (err) {
        console.error("Enrollment error:", err);
      } finally {
        setEnrollingId(null);
      }
    }, "Sign in to enroll in courses and track your real-time learning progress.");
  };

  // Real Stats Calculations
  const totalEnrolled = enrolledCourses.length;

  const completedCoursesCount = enrolledCourses.filter(
    (c) => c.progress && (c.progress.percentage >= 100 || c.progress.isCompleted)
  ).length;

  const totalCompletedTopics = enrolledCourses.reduce(
    (acc, c) => acc + (c.progress?.completedTopicsCount || 0),
    0
  );

  const totalPossibleTopics = enrolledCourses.reduce(
    (acc, c) => acc + (c.progress?.totalTopics || 0),
    0
  );

  // Overall average course completion percentage
  const overallCompletionPercentage =
    totalEnrolled > 0
      ? Math.round(
          enrolledCourses.reduce((acc, c) => acc + (c.progress?.percentage || 0), 0) /
            totalEnrolled
        )
      : 0;

  const stats = [
    {
      label: "Enrolled Courses",
      value: totalEnrolled,
      icon: "📚",
      color: "text-blue-400",
      bg: "bg-blue-950/40 border-blue-800/60",
      subtitle: totalEnrolled === 0 ? "No active courses" : `${totalEnrolled} active courses`,
    },
    {
      label: "Overall Completion",
      value: `${overallCompletionPercentage}%`,
      icon: "📊",
      color: "text-rose-400",
      bg: "bg-rose-950/40 border-rose-800/60",
      subtitle: `${totalCompletedTopics} / ${totalPossibleTopics || 0} topics done`,
    },
    {
      label: "Coding Problems Solved",
      value: solvedProblemCount,
      icon: "🔥",
      color: "text-red-400",
      bg: "bg-red-950/40 border-red-800/60",
      subtitle: "Across 13 SDE sheets",
    },
    {
      label: "Certificates Earned",
      value: completedCoursesCount,
      icon: "🏆",
      color: "text-amber-400",
      bg: "bg-amber-950/40 border-amber-800/60",
      subtitle: `${completedCoursesCount} courses mastered`,
    },
  ];

  // Courses available for recommendation (not yet enrolled)
  const enrolledIds = new Set(enrolledCourses.map((c) => c._id?.toString()));
  const recommendedCourses = availableCourses
    .filter((c) => !enrolledIds.has(c._id?.toString()))
    .slice(0, 3);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8 text-slate-100">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-red-950/50 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Live Student Learning Command Center
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Welcome back, {user?.name || "Student"} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Real-time tracking of your course syllabus completion, topic milestones, and SDE problem solving.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/all-courses"
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>📚 Course Catalog</span>
            </Link>
            <Link
              to="/sheets"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center gap-2"
            >
              <span>🔥 Practice Sheets</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl border transition-all ${s.bg} space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-2xl sm:text-3xl font-black ${s.color}`}>
                {loading ? "..." : s.value}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-300">{s.label}</p>
              <p className="text-[11px] text-slate-500 font-medium">{s.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Real-Time Course Progress Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>📖</span>
              <span>Enrolled Courses & Live Progress</span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/60">
                {totalEnrolled} Active
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Granular breakdown of completed modules, topics, and next lessons to resume.
            </p>
          </div>

          <Link
            to="/all-courses"
            className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <span>+ Enroll in More Courses</span>
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <div className="w-8 h-8 border-4 border-slate-800 border-t-red-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Fetching real-time course progress from database...</p>
          </div>
        ) : enrolledCourses.length === 0 ? (
          /* Empty State for Brand New User */
          <div className="p-8 sm:p-12 text-center bg-slate-900/60 border-2 border-dashed border-slate-800 rounded-3xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl mx-auto shadow-inner">
              📚
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-white">No Enrolled Courses Yet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You currently have 0 active courses. Choose a course from our catalog in DSA, Full Stack, System Design, or Machine Learning to start tracking your completion progress!
              </p>
            </div>
            <Link
              to="/all-courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/50 transition-all hover:scale-105"
            >
              <span>Explore Course Catalog</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          /* Real Enrolled Courses Detailed Cards */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {enrolledCourses.map((course) => {
              const progress = course.progress || {
                percentage: 0,
                completedTopicsCount: 0,
                totalTopics: 0,
                completedModulesCount: 0,
                totalModules: 0,
                nextTopic: null,
              };

              const isDone = progress.percentage >= 100 || progress.isCompleted;
              const isExpanded = expandedCourseId === course._id;

              return (
                <div
                  key={course._id}
                  className={`bg-slate-900 border rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all ${
                    isDone
                      ? "border-emerald-800/80 ring-1 ring-emerald-500/20"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="p-5 sm:p-6 space-y-5">
                    {/* Top Row: Thumbnail + Title + Progress Pill */}
                    <div className="flex items-start gap-4">
                      <img
                        src={
                          course.thumbnail ||
                          "https://images.unsplash.com/photo-1516116211227-bbc0656a811c?w=800"
                        }
                        alt={course.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-800 shrink-0"
                      />

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-950 text-red-400 border border-slate-800">
                            {course.category || "Course"}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            {course.level || "Beginner"}
                          </span>
                          {isDone ? (
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                              ✓ 100% Completed
                            </span>
                          ) : (
                            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                              {progress.percentage}% Completed
                            </span>
                          )}
                        </div>

                        <h3 className="font-extrabold text-base sm:text-lg text-white truncate">
                          {course.title}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-1">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar & Real-time Metrics */}
                    <div className="p-4 bg-slate-950/90 border border-slate-800/90 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span>Syllabus Completion:</span>
                        </span>
                        <span className={isDone ? "text-emerald-400 font-extrabold" : "text-rose-400 font-extrabold"}>
                          {progress.percentage}% ({progress.completedTopicsCount} / {progress.totalTopics || "All"} Topics)
                        </span>
                      </div>

                      {/* Animated Gradient Bar */}
                      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isDone
                              ? "bg-emerald-500"
                              : "bg-gradient-to-r from-red-600 via-rose-500 to-amber-500"
                          }`}
                          style={{ width: `${Math.max(4, progress.percentage)}%` }}
                        />
                      </div>

                      {/* Sub-metrics */}
                      <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400 border-t border-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span>📦 Modules:</span>
                          <span className="text-white font-semibold">
                            {progress.completedModulesCount || 0} of {progress.totalModules || (course.modules ? course.modules.length : 0)} Done
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <span>⏱️ Course Duration:</span>
                          <span className="text-white font-semibold">
                            {course.duration ? `${course.duration} Hours` : "Self-paced"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Next Lesson / Topic to Resume */}
                    {!isDone && progress.nextTopic && (
                      <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl text-xs flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-red-400 font-bold shrink-0">📍 Up Next:</span>
                          <span className="text-slate-200 font-semibold truncate">
                            {progress.nextTopic.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 hidden sm:inline">
                          {progress.nextTopic.moduleTitle}
                        </span>
                      </div>
                    )}

                    {/* Expandable Module Breakdown Checklist */}
                    {course.modules && course.modules.length > 0 && (
                      <div className="space-y-2">
                        <button
                          onClick={() => setExpandedCourseId(isExpanded ? null : course._id)}
                          className="text-[11px] font-bold text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                        >
                          <span>{isExpanded ? "▼ Hide Modules Breakdown" : "▶ View Modules Breakdown"}</span>
                        </button>

                        {isExpanded && (
                          <div className="space-y-2 pt-2 animate-fadeIn">
                            {course.modules.map((mod, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1.5"
                              >
                                <div className="flex items-center justify-between font-bold text-slate-300">
                                  <span>{mod.title}</span>
                                  <span className="text-[10px] text-slate-500">{mod.duration}</span>
                                </div>
                                <div className="space-y-1 pl-2">
                                  {mod.topics &&
                                    mod.topics.map((t, tIdx) => (
                                      <div key={tIdx} className="text-[11px] text-slate-400 flex items-center gap-2">
                                        <span className="text-slate-600">•</span>
                                        <span className="truncate">{t.title}</span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 pt-0 border-t border-slate-800/60 flex items-center gap-3">
                    <Link
                      to={`/course/${course._id}`}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-lg ${
                        isDone
                          ? "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                          : "bg-red-600 hover:bg-red-500 text-white shadow-red-950/50 hover:scale-[1.02]"
                      }`}
                    >
                      <span>{isDone ? "Review Course Curriculum" : "Resume Learning"}</span>
                      <span>→</span>
                    </Link>

                    {isDone && (
                      <Link
                        to="/certificates"
                        className="py-3 px-4 rounded-xl text-xs font-bold bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-1.5"
                      >
                        <span>🏆 Certificate</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Courses to Explore & Enroll */}
      {recommendedCourses.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>💡</span>
                <span>Recommended Courses for You</span>
              </h2>
              <p className="text-xs text-slate-400">
                Explore popular tech curriculums to expand your skillset.
              </p>
            </div>
            <Link to="/all-courses" className="text-xs text-red-400 hover:underline">
              View Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <div
                key={course._id}
                className="p-5 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-red-400">
                      {course.category}
                    </span>
                    <span className="text-slate-400">{course.level}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleQuickEnroll(course._id)}
                    disabled={enrollingId === course._id}
                    className="flex-1 py-2 px-3 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold rounded-xl transition-all text-center"
                  >
                    {enrollingId === course._id ? "Enrolling..." : "+ Quick Enroll"}
                  </button>
                  <Link
                    to={`/course/${course._id}`}
                    className="py-2 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access to Sheets & Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-800/80">
        {/* Left: Popular Coding Sheets */}
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
              className="p-4 bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-2xl space-y-2 group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">🔥</span>
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
              className="p-4 bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-2xl space-y-2 group transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">⚡</span>
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

        {/* Right: Quick Tools */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Developer Shortcuts</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <Link
              to="/practice"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>💻 Online Code IDE</span>
              <span>→</span>
            </Link>
            <Link
              to="/roadmaps"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>🗺️ Career Learning Roadmaps</span>
              <span>→</span>
            </Link>
            <Link
              to="/certificates"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
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
