import { useState, useContext, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname === "/admin-login";
  const redirectTo = location.state?.redirectTo || location.state?.from?.pathname || "/dashboard";
  const apiBaseUrl = axios.defaults.baseURL || import.meta.env.VITE_API_URL || "";

  const [role, setRole] = useState(isAdminRoute ? "admin" : "student");
  const [form, setForm] = useState({ email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const roleLabel = useMemo(() => {
    if (role === "admin") return "Admin";
    if (role === "instructor") return "Instructor";
    return "Student";
  }, [role]);

  const isValidEmail = (value) => typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const providerButtonBase =
    "w-full flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const googleButtonClass =
    `${providerButtonBase} border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:border-[#d0d7de] hover:shadow-md hover:-translate-y-0.5`;

  const githubButtonClass =
    `${providerButtonBase} border-gray-900 bg-gray-900 text-white hover:bg-black hover:shadow-md hover:-translate-y-0.5`;

  const onAuthSuccess = (payload) => {
    login(payload);
    if (payload?.user?.role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const rawUser = params.get("user");
    const oauthError = params.get("oauthError");

    if (oauthError) {
      setError(oauthError);
      return;
    }

    if (token && rawUser) {
      try {
        const user = JSON.parse(decodeURIComponent(rawUser));
        if (!token.trim()) {
          setError("OAuth login response was missing a token.");
          return;
        }

        if (!user || typeof user !== "object" || !isValidEmail(user.email) || !user.role) {
          setError("OAuth login response was invalid.");
          return;
        }

        onAuthSuccess({ token, user });
      } catch {
        setError("OAuth login response could not be processed.");
      }
    }
  }, [location.search]);

  // No OTP flows: only password and OAuth

  const buildOAuthStartUrl = (provider) => `${apiBaseUrl}/auth/${provider}/start?role=${encodeURIComponent(role)}`;

  const startOAuth = (provider) => {
    setError("");
    setMessage("");
    window.location.href = buildOAuthStartUrl(provider);
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", {
        email: form.email,
        password: form.password,
        role,
      });
      onAuthSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // OTP handlers removed; login via email/password or OAuth

  return (
    <div className="max-w-md mx-auto mt-8 sm:mt-14 md:mt-20 px-4 pb-8">
      <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {isAdminRoute ? "Admin Login" : "Welcome Back"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {isAdminRoute
            ? "Secure admin access with password. Google and GitHub login are reserved for student and instructor accounts."
            : "Login as student or instructor using Google, GitHub, or password"}
        </p>

        {!isAdminRoute && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`px-3 py-2 rounded-lg border text-sm font-semibold ${role === "student" ? "bg-primary text-white border-primary" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("instructor")}
              className={`px-3 py-2 rounded-lg border text-sm font-semibold ${role === "instructor" ? "bg-primary text-white border-primary" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"}`}
            >
              Instructor
            </button>
          </div>
        )}

        {isAdminRoute && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-sm text-gray-700 dark:text-gray-300">
            Hidden admin mode active. Access path: /admin-login
          </div>
        )}

        {!isAdminRoute && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              onClick={() => startOAuth("google")}
              disabled={loading}
              className={googleButtonClass}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="none">
                <path fill="#4285F4" d="M12 10.2v3.9h5.5c-.2 1.4-.8 2.6-1.8 3.4l2.9 2.3c1.7-1.6 2.7-4 2.7-6.8 0-.7-.1-1.3-.2-1.9H12Z" />
                <path fill="#34A853" d="M6.6 14.3l-.7.5-2.4 1.9A9.99 9.99 0 0 0 12 22c2.7 0 5-.9 6.8-2.4l-2.9-2.3c-.8.6-1.8 1-3.1 1-2.4 0-4.4-1.6-5.1-3.7Z" />
                <path fill="#FBBC05" d="M3.5 7.9a9.96 9.96 0 0 0 0 8l3.1-2.4a5.9 5.9 0 0 1 0-3.2l-3.1-2.4Z" />
                <path fill="#EA4335" d="M12 5.6c1.5 0 2.8.5 3.9 1.5l2.9-2.9A9.8 9.8 0 0 0 12 2C8.3 2 5.1 4 3.5 7.9l3.1 2.4C7.6 7.2 9.5 5.6 12 5.6Z" />
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => startOAuth("github")}
              disabled={loading}
              className={githubButtonClass}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor">
                <path d="M12 .5A11.5 11.5 0 0 0 8.4 23c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 .1 1.7 1.8 1.7 1.8 1.5 2.5 4 .8 5 .6.1-.8.4-1.4.7-1.7-2.7-.3-5.6-1.3-5.6-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.9 5.5-5.6 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
              Continue with GitHub
            </button>
          </div>
        )}

        {isAdminRoute && (
          <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm text-gray-700 dark:text-gray-300">
            Direct OAuth login is available on the student and instructor login page.
          </div>
        )}

        {/* Only password login + OAuth available */}

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-primary border border-red-200 dark:border-red-800 rounded-lg text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 rounded-lg text-sm">
            {message}
          </div>
        )}


        {/* Display name removed; not used in login */}

        <form onSubmit={handlePasswordLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email or Phone</label>
                <input
                  type="text"
                  placeholder="Enter your email or phone"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                placeholder={`Enter ${roleLabel.toLowerCase()} password`}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              className="w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? "Logging in..." : `Login as ${roleLabel}`}
            </button>
          </form>
        {/* Email/phone OTP and Firebase flows removed */}
      </div>
    </div>
  );
};

export default Login;
