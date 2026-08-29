import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const DEFAULT_COURSES = [
  {
    _id: "c1",
    title: "DSA Fundamentals & Algorithms",
    category: "DSA",
    level: "Beginner",
    duration: 40,
    thumbnail: "https://images.unsplash.com/photo-1516116211227-bbc0656a811c?w=800",
    description: "Master essential data structures (Arrays, Linked Lists, Stacks, Trees) and algorithms from scratch.",
    modulesCount: 6,
    rating: 4.9,
    enrolledCount: 1240,
  },
  {
    _id: "c2",
    title: "Full Stack MERN Development Masterclass",
    category: "Web Dev",
    level: "Intermediate",
    duration: 60,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    description: "Build robust, scalable full-stack web applications with React, Node.js, Express, and MongoDB.",
    modulesCount: 8,
    rating: 4.8,
    enrolledCount: 980,
  },
  {
    _id: "c3",
    title: "Operating Systems & System Architecture",
    category: "CS Fundamentals",
    level: "Intermediate",
    duration: 35,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
    description: "Deep dive into Process scheduling, Deadlocks, Virtual memory, Paging, and multi-threading concurrency.",
    modulesCount: 5,
    rating: 4.9,
    enrolledCount: 850,
  },
  {
    _id: "c4",
    title: "System Design for SDE-2 / Product Roles",
    category: "System Design",
    level: "Advanced",
    duration: 50,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    description: "Learn how to architect high-availability systems: Load balancing, caching, sharding, and microservices.",
    modulesCount: 7,
    rating: 5.0,
    enrolledCount: 1450,
  },
  {
    _id: "c5",
    title: "Machine Learning & AI Foundations",
    category: "ML / AI",
    level: "Beginner",
    duration: 45,
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    description: "Introduction to Supervised & Unsupervised Learning, Neural Networks, PyTorch, and NLP models.",
    modulesCount: 6,
    rating: 4.7,
    enrolledCount: 670,
  },
  {
    _id: "c6",
    title: "Computer Networks & Network Security",
    category: "CS Fundamentals",
    level: "Beginner",
    duration: 30,
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
    description: "OSI and TCP/IP models, DNS, HTTP/3, Routing algorithms, TLS/SSL, and WebSockets.",
    modulesCount: 4,
    rating: 4.8,
    enrolledCount: 520,
  },
];

export default function AllCourses() {
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/courses")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCourses(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ["All", "DSA", "Web Dev", "CS Fundamentals", "System Design", "ML / AI"];

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Course Catalog</h1>
          <p className="mt-2 text-sm text-slate-400">
            Explore curated tech courses with theory notes, video playlists, and module assessment quizzes.
          </p>
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
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col hover:border-red-500/40 transition-all group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-red-400 border border-slate-800">
                  {course.level}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    {course.category}
                  </span>
                  <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors mt-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <span>★</span>
                    <span className="font-bold text-slate-200">{course.rating || 4.9}</span>
                  </div>

                  <Link
                    to={`/course/${course._id}`}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    View Modules →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
