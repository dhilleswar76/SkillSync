import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMessage, login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegisterMode) {
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      closeAuthModal();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (isRegisterMode ? "Registration failed. Please check details." : "Invalid email or password.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFullPageAuth = (path) => {
    closeAuthModal();
    navigate(`${path}?redirect=${encodeURIComponent(location.pathname + location.search)}`);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-red-950/40 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing Ambient Gradient */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Continue as Guest"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white text-2xl mx-auto mb-3 shadow-lg shadow-red-950/50">
            🔐
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {isRegisterMode ? "Create a Free Account" : "Sign In to Access"}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            {authModalMessage ||
              "Sign in or create an account to save your progress, solve problems, submit code, and earn certificates."}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Quick Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-red-950/40 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <span className="animate-spin text-sm">⚙️</span>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>{isRegisterMode ? "Create Account & Continue" : "Sign In & Continue"}</span>
            )}
          </button>
        </form>

        {/* Switch Between Login & Register */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 text-center space-y-2">
          <p className="text-xs text-slate-400">
            {isRegisterMode ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError("");
              }}
              className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-2 ml-1"
            >
              {isRegisterMode ? "Sign In" : "Register Free"}
            </button>
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-1">
            <button
              onClick={() => handleFullPageAuth("/login")}
              className="hover:text-slate-300 transition-colors"
            >
              Full Login Page ↗
            </button>
            <span>•</span>
            <button
              onClick={closeAuthModal}
              className="hover:text-slate-300 transition-colors"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
