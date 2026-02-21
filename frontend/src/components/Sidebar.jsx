import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === path
        ? "bg-primary text-white shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 min-h-screen p-6 border-r border-gray-100 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Navigation
        </h2>
      </div>
      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          📚 My Courses
        </Link>

        <Link to="/profile" className={linkClass("/profile")}>
          👤 Profile
        </Link>

        <Link to="/admin" className={linkClass("/admin")}>
          🛠️ Admin Panel
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
