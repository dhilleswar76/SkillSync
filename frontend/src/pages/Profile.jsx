import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put("/auth/update-profile", form);
      login(res.data);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          👤 My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account information
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-accent-coral p-8 text-center">
          <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold text-primary shadow-lg">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">
            {user?.name}
          </h2>
          <p className="text-white/90">{user?.email}</p>
          <span className="inline-block mt-3 px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {user?.role === "admin" ? "👑 Admin" : "🎓 Student"}
          </span>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes("success") 
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800" 
              : "bg-red-50 dark:bg-red-900/20 text-primary border border-red-200 dark:border-red-800"
            }`}>
              {message}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Full Name
                </label>
                <p className="text-lg text-gray-900 dark:text-white font-medium">
                  {user?.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Email Address
                </label>
                <p className="text-lg text-gray-900 dark:text-white font-medium">
                  {user?.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Account Type
                </label>
                <p className="text-lg text-gray-900 dark:text-white font-medium capitalize">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                ✏️ Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "💾 Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ name: user?.name || "", email: user?.email || "" });
                    setMessage("");
                  }}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📊</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Learning Stats
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Track your progress and achievements here.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎓</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Certificates
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            View and download your earned certificates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
