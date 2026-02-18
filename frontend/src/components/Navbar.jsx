import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold text-primary">
        SkillSync
      </Link>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 bg-primary text-white rounded"
        >
          {darkMode ? "Light" : "Dark"}
        </button>

        {user && (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
