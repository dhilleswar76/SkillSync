import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-3 py-2 rounded-md text-sm ${
      location.pathname === path
        ? "bg-primary text-white"
        : "hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 min-h-screen p-6 shadow-sm">
      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          My Courses
        </Link>

        <Link to="/admin" className={linkClass("/admin")}>
          Admin Panel
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
