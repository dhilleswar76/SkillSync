import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Landing = () => {
  const { user } = useContext(AuthContext);

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-background-light via-white to-red-50 dark:from-background-dark dark:via-gray-900 dark:to-red-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-12 md:pb-16 text-center">
        <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 dark:bg-red-900/30 text-primary font-semibold rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
          🚀 Your Learning Journey Starts Here
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-red-500 to-orange-500 bg-clip-text text-transparent px-2">
          Welcome to SkillSync
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
          Master your skills with structured courses, track your progress, 
          and achieve your learning goals with our comprehensive platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Link
            to="/all-courses"
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-medium text-base sm:text-lg text-center"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-medium text-base sm:text-lg border border-gray-200 dark:border-gray-700 text-center"
          >
            Login
          </Link>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-left">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🗺️</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">Career Roadmaps</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Follow structured learning paths for DSA, Web Dev, ML, Mobile, DevOps & more.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">📚</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">Comprehensive Courses</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Learn with theory blogs, video tutorials, and hands-on quizzes for every module.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">📈</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">Track Progress</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Monitor your learning journey with detailed analytics and progress tracking.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">💻</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">Code Practice</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Solve problems on LeetCode & GFG with curated sheets and coding challenges.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🎯</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">Quiz & Assessment</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Test your knowledge with module-wise quizzes and score-based evaluations.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🎓</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">Earn Certificates</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Complete courses with passing scores and earn certificates to showcase achievements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
