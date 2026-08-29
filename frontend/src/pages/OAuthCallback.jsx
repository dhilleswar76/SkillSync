import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OAuthCallback() {
  const [status, setStatus] = useState("processing"); // 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const hasProcessed = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithOAuthData } = useAuth();

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const params = new URLSearchParams(location.search);
    const error = params.get("error") || params.get("error_description");
    const token = params.get("token");
    const rawUser = params.get("user");
    const redirect = params.get("redirect") || "/dashboard";

    if (error) {
      setStatus("error");
      setErrorMessage(error);
      return;
    }

    if (!token) {
      setStatus("error");
      setErrorMessage("No authentication token received from the identity provider.");
      return;
    }

    try {
      let userData = {};
      if (rawUser) {
        try {
          userData = JSON.parse(decodeURIComponent(rawUser));
        } catch {
          try {
            userData = JSON.parse(rawUser);
          } catch (err) {
            console.warn("Could not parse user payload:", err);
          }
        }
      }

      if (userData.name) {
        setUserName(userData.name);
      }

      // Update context & storage
      loginWithOAuthData(userData, token);
      setStatus("success");

      // Single clean navigation after brief confirmation animation
      const timer = setTimeout(() => {
        navigate(redirect, { replace: true });
      }, 700);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error("OAuth processing failed:", err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred while finalizing your login.");
    }
  }, []); // Run strictly once on mount

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl text-center relative overflow-hidden">
        {/* Glowing Background Accent */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {status === "processing" && (
          <div className="space-y-5 py-4">
            <div className="w-14 h-14 mx-auto border-4 border-slate-800 border-t-red-500 rounded-full animate-spin" />
            <h2 className="text-xl font-black text-white">Verifying Authentication</h2>
            <p className="text-xs text-slate-400">
              Connecting your account and setting up your workspace...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4 py-4 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shadow-lg shadow-emerald-950/50">
              ✓
            </div>
            <h2 className="text-xl font-black text-white">
              Welcome{userName ? `, ${userName}` : ""}!
            </h2>
            <p className="text-xs text-slate-400">
              Authentication successful. Redirecting to your dashboard...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-5 py-4 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-950/60 border border-red-800/80 flex items-center justify-center text-red-400 text-2xl shadow-lg shadow-red-950/50">
              ⚠️
            </div>
            <h2 className="text-xl font-black text-white">Authentication Failed</h2>
            <p className="text-xs text-red-300 bg-red-950/40 p-3 rounded-xl border border-red-900/50">
              {errorMessage}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <Link
                to="/login"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-950/50"
              >
                Back to Sign In
              </Link>
              <Link
                to="/"
                className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
