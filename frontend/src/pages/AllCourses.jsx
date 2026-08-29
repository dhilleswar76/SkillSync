import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AllCourses() {
  const { user, requireAuth } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledMap, setEnrolledMap] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [enrollingId, setEnrollingId] = useState(null);
  const [notification, setNotification] = useState("");

  const fetchData = async () => {
    try {
      const coursesRes = await API.get("/courses");
      if (coursesRes.data && coursesRes.data.length > 0) {
        setCourses(coursesRes.data);
      }

      if (user) {
        const enrolledRes = await API.get("/courses/enrolled").catch(() => ({ data: [] }));
        const map = {};
        (enrolledRes.data || []).forEach((c) => {
          map[c._id?.toString()] = c.progress || { percentage: 0 };
        });
        setEnrolledMap(map);
      }
    } catch (err) {
      console.warn("Course fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleEnroll = (courseId, courseTitle) => {
    requireAuth(async () => {
      try {
        setEnrollingId(courseId);
        await API.post(`/courses/${courseId}/enroll`);
        setEnrolledMap((prev) => ({
          ...prev,
          [courseId]: { percentage: 0 },
        }));
        setNotification(`Successfully enrolled in "${courseTitle}"!`);
        setTimeout(() => setNotification(""), 3500);
      } catch (err) {
        console.error("Enrollment error:", err);
      } finally {
        setEnrollingId(null);
      }
    }, "Sign in to enroll in courses and track your real-time syllabus progress.");
  };

  const categories = ["All", "DSA", "Web Dev", "CS Fundamentals", "System Design", "ML / AI"];

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce text-sm font-semibold border border-emerald-400">
          <span>✓</span>
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Course Catalog</h1>
            <p className="mt-2 text-sm text-slate-400">
              Explore curated tech courses with theory notes, video playlists, and real-time progress tracking.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="self-start sm:self-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold rounded-xl text-slate-200 transition-all flex items-center gap-2"
          >
            <span>📖 My Enrolled Courses</span>
            <span>→</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                    : "bg-slate-950 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = !!enrolledMap[course._id?.toString()];
            const progress = enrolledMap[course._id?.toString()];

            return (
              <div
                key={course._id}
                className={`bg-slate-900 border rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all group ${
                  isEnrolled
                    ? "border-emerald-800/80 ring-1 ring-emerald-500/20"
                    : "border-slate-800 hover:border-red-500/40"
                }`}
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-sm text-red-400 border border-slate-800">
                      {course.level}
                    </span>

                    {isEnrolled && (
                      <span className="absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 backdrop-blur-sm flex items-center gap-1">
                        <span>✓</span>
                        <span>Enrolled</span>
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {course.category}
                      </span>
                      <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors mt-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {isEnrolled && progress && (
                      <div className="pt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-400">Your Progress:</span>
                          <span className="text-emerald-400 font-bold">{progress.percentage || 0}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(5, progress.percentage || 0)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <span>★</span>
                    <span className="font-bold text-slate-200">{course.rating || 4.9}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isEnrolled ? (
                      <button
                        onClick={() => handleEnroll(course._id, course.title)}
                        disabled={enrollingId === course._id}
                        className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md transition-all"
                      >
                        {enrollingId === course._id ? "Enrolling..." : "+ Enroll"}
                      </button>
                    ) : (
                      <Link
                        to={`/course/${course._id}`}
                        className="px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold rounded-lg transition-all"
                      >
                        Resume →
                      </Link>
                    )}

                    <Link
                      to={`/course/${course._id}`}
                      className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
