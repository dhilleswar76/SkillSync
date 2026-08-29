import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function StudentDashboard() {
  const { user, requireAuth } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [solvedProblemCount, setSolvedProblemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);

  // Fetch live enrolled courses and overall progress
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [enrolledRes, allCoursesRes, progressRes] = await Promise.all([
        API.get("/courses/enrolled").catch(() => ({ data: [] })),
        API.get("/courses").catch(() => ({ data: [] })),
        API.get("/progress").catch(() => ({ data: [] })),
      ]);

      setEnrolledCourses(enrolledRes.data || []);
      setAvailableCourses(allCoursesRes.data || []);
      setProgressList(progressRes.data || []);

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

  // Real Stats (Zero-based accurate calculations for new & existing users)
  const completedCoursesCount = enrolledCourses.filter(
    (c) => c.progress && (c.progress.percentage >= 100 || c.progress.isCompleted)
  ).length;

  const totalCompletedTopics = enrolledCourses.reduce(
    (acc, c) => acc + (c.progress?.completedTopicsCount || 0),
    0
  );

  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses.length,
      icon: "📚",
      color: "text-blue-400",
      bg: "bg-blue-950/40 border-blue-800/60",
    },
    {
      label: "Completed Topics",
      value: totalCompletedTopics,
      icon: "✅",
      color: "text-emerald-400",
      bg: "bg-emerald-950/40 border-emerald-800/60",
    },
    {
      label: "Coding Problems Solved",
      value: solvedProblemCount,
      icon: "🔥",
      color: "text-red-400",
      bg: "bg-red-950/40 border-red-800/60",
    },
    {
      label: "Certificates Earned",
      value: completedCoursesCount,
      icon: "🏆",
      color: "text-amber-400",
      bg: "bg-amber-950/40 border-amber-800/60",
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
              Student Learning Command Center
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Welcome back, {user?.name || "Student"} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Track your active course enrollments, real-time syllabus completion progress, and daily coding sheets in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/all-courses"
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>📚 Browse Courses</span>
            </Link>
            <Link
              to="/sheets"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center gap-2"
            >
              <span>🔥 Coding Sheets</span>
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
            <p className="text-xs font-bold text-slate-300">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Real-Time Enrolled Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>📖</span>
              <span>My Enrolled Courses</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {enrolledCourses.length}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Live tracking of your learning progress across each registered course.
            </p>
          </div>

          <Link
            to="/all-courses"
            className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
          >
            <span>+ Enroll in More Courses</span>
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <div className="w-8 h-8 border-4 border-slate-800 border-t-red-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading your enrolled courses...</p>
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
                You haven't enrolled in any courses yet. Explore our curated course catalog in DSA, Full Stack Web Development, System Design, and AI to start learning!
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
          /* Real Enrolled Courses Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledCourses.map((course) => {
              const progress = course.progress || { percentage: 0, completedTopicsCount: 0, totalTopics: 0 };
              const isDone = progress.percentage >= 100 || progress.isCompleted;

              return (
                <div
                  key={course._id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all group"
                >
                  <div>
                    {/* Course Thumbnail & Badges */}
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={
                          course.thumbnail ||
                          "https://images.unsplash.com/photo-1516116211227-bbc0656a811c?w=800"
                        }
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-950/90 text-red-400 border border-slate-800 backdrop-blur-sm">
                          {course.category || "Course"}
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/90 text-slate-300 border border-slate-800 backdrop-blur-sm">
                          {course.level || "Beginner"}
                        </span>
                      </div>

                      {isDone && (
                        <span className="absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 backdrop-blur-sm flex items-center gap-1">
                          <span>✓</span>
                          <span>Completed</span>
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Real-time Progress Bar */}
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-400">Course Progress:</span>
                          <span className={isDone ? "text-emerald-400" : "text-red-400"}>
                            {progress.percentage}%
                          </span>
                        </div>

                        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isDone
                                ? "bg-emerald-500"
                                : "bg-gradient-to-r from-red-600 via-rose-500 to-amber-500"
                            }`}
                            style={{ width: `${Math.max(5, progress.percentage)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>
                            {progress.completedTopicsCount} of {progress.totalTopics || "All"} topics completed
                          </span>
                          <span>{course.duration ? `${course.duration} hrs` : "Self-paced"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0">
                    <Link
                      to={`/course/${course._id}`}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isDone
                          ? "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                          : "bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-950/50"
                      }`}
                    >
                      <span>{isDone ? "Review Course" : "Continue Learning"}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Courses to Explore & Enroll */}
      {recommendedCourses.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>💡</span>
                <span>Recommended Courses for You</span>
              </h2>
              <p className="text-xs text-slate-400">
                Level up your technical skills with our most popular curriculums.
              </p>
            </div>
            <Link to="/all-courses" className="text-xs text-red-400 hover:underline">
              View All Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <div
                key={course._id}
                className="p-4 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col justify-between space-y-3 group"
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

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleQuickEnroll(course._id)}
                    disabled={enrollingId === course._id}
                    className="flex-1 py-1.5 px-3 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold rounded-lg transition-all text-center"
                  >
                    {enrollingId === course._id ? "Enrolling..." : "+ Quick Enroll"}
                  </button>
                  <Link
                    to={`/course/${course._id}`}
                    className="py-1.5 px-3 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-colors"
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
