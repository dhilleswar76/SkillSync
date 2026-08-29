import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SocialAuthButtons from "../components/SocialAuthButtons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminLogin = location.pathname.includes("admin");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauthError = params.get("error");
    if (oauthError) {
      setError(oauthError);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      if (isAdminLogin && user.role !== "admin") {
        setError("Access denied: Not an administrator account");
        return;
      }
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect") || (user.role === "admin" ? "/admin" : "/dashboard");
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setError("");
    setLoading(true);
    try {
      if (role === "admin") {
        await login("admin@studentportal.com", "admin123");
        navigate("/admin");
      } else {
        await login("john@student.com", "student123");
        navigate("/dashboard");
      }
    } catch (err) {
      try {
        await login("admin@example.com", "admin123");
        navigate("/admin");
      } catch (e2) {
        setError("Demo login failed. Please register or verify database connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Glowing Background Accent */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-red-950/50 mb-3">
            S
          </div>
          <h2 className="text-2xl font-black text-white">
            {isAdminLogin ? "Admin Portal Access" : "Welcome Back"}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Sign in to access coding sheets, courses, and track progress
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs text-center flex items-center justify-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Social Authentication for Students */}
        {!isAdminLogin && (
          <div className="space-y-4">
            <SocialAuthButtons actionText="Continue with" />
            
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 relative">
                or with email
              </span>
            </div>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-950/50 transition-all"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Quick Demo Credentials Buttons */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <p className="text-center text-[11px] text-slate-500">Quick Demo Access:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin("student")}
              className="py-1.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              Demo Student
            </button>
            <button
              onClick={() => handleDemoLogin("admin")}
              className="py-1.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-red-400 hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
