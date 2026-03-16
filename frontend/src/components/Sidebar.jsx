import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ onClose = () => {} }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const linkClass = (path) =>
    `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === path
        ? "bg-primary text-white shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 min-h-screen p-6 border-r border-gray-100 dark:border-gray-700 overflow-y-auto">
      {/* Mobile close button */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <span className="text-lg font-bold text-primary">SkillSync</span>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-lg"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <div className="mb-6 hidden md:block">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Navigation
        </h2>
      </div>
      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")} onClick={onClose}>
          📚 My Courses
        </Link>

        <Link to="/all-courses" className={linkClass("/all-courses")} onClick={onClose}>
          🎓 All Courses
        </Link>

        <Link to="/roadmaps" className={linkClass("/roadmaps")} onClick={onClose}>
          🗺️ Career Roadmaps
        </Link>

        <Link to="/progress" className={linkClass("/progress")} onClick={onClose}>
          📊 My Progress
        </Link>

        <Link to="/certificates" className={linkClass("/certificates")} onClick={onClose}>
          🏆 Certificates
        </Link>

        <Link to="/profile" className={linkClass("/profile")} onClick={onClose}>
          👤 Profile
        </Link>

        {/* Practice Section */}
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Practice
          </h2>
        </div>

        <Link to="/practice" className={linkClass("/practice")} onClick={onClose}>
          💻 Code Practice
        </Link>

        <Link to="/sheets" className={linkClass("/sheets")} onClick={onClose}>
          📋 Coding Sheets
        </Link>

        {/* Admin Only Section */}
        {user?.role === "admin" && (
          <>
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Admin
              </h2>
            </div>
            <Link to="/admin" className={linkClass("/admin")} onClick={onClose}>
              🛠️ Admin Panel
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
