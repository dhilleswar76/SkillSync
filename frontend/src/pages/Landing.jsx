import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const features = [
    {
      icon: "🔥",
      title: "Interactive Coding Sheets",
      desc: "Striver SDE, A2Z DSA, NeetCode 150, Blind 75, and Love Babbar sheets with in-browser Monaco IDE.",
      link: "/sheets",
    },
    {
      icon: "🗺️",
      title: "6 Career Roadmaps",
      desc: "Structured paths for DSA, Full Stack, Machine Learning, Mobile Apps, DevOps, and Cybersecurity.",
      link: "/roadmaps",
    },
    {
      icon: "📚",
      title: "Structured Courses",
      desc: "Topic-by-topic courses with curated theory articles and top YouTube video tutorials.",
      link: "/all-courses",
    },
    {
      icon: "💻",
      title: "Multi-Language IDE",
      desc: "Built-in code sandbox supporting JavaScript, Python, Java, C++, and C# with real-time execution.",
      link: "/practice",
    },
    {
      icon: "🎯",
      title: "Module Quizzes",
      desc: "Test conceptual mastery after each module with instantaneous score feedback and explanations.",
      link: "/all-courses",
    },
    {
      icon: "🏆",
      title: "Score-Based Certificates",
      desc: "Earn downloadable verified certificates upon meeting course passing scores and module benchmarks.",
      link: "/certificates",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-red-400 shadow-md">
            <span>🚀 The All-in-One Tech Career & DSA Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Master Coding & DSA <br />
            <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-600 bg-clip-text text-transparent">
              From Beginner to Hired
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Practice Striver, NeetCode, Blind 75 sheets directly in browser. Learn CS fundamentals, track your algorithmic progress, and build career-ready engineering mastery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/sheets"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-base shadow-xl shadow-red-950/60 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🔥 Open Coding Sheets</span>
            </Link>
            <Link
              to="/all-courses"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">
              Everything You Need to Crack Tech Interviews
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Curated problem sets, interactive code editor, structured career paths, and score validations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Link
                key={i}
                to={f.link}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-red-500/50 hover:bg-slate-900 transition-all duration-300 group"
              >
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">
                  {f.icon}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
