import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-background-light via-white to-red-50 dark:from-background-dark dark:via-gray-900 dark:to-red-950">
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-primary font-semibold rounded-full text-sm mb-6">
          🚀 Your Learning Journey Starts Here
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-red-500 to-orange-500 bg-clip-text text-transparent">
          Welcome to SkillSync
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Master your skills with structured courses, track your progress, 
          and achieve your learning goals with our comprehensive platform.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/register"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-medium text-lg"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-medium text-lg border border-gray-200 dark:border-gray-700"
          >
            Login
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Structured Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">Follow curated learning paths designed for maximum retention and skill development.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Track Progress</h3>
            <p className="text-gray-600 dark:text-gray-300">Monitor your learning journey with detailed analytics and progress tracking.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Earn Certificates</h3>
            <p className="text-gray-600 dark:text-gray-300">Complete courses and earn certificates to showcase your achievements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
