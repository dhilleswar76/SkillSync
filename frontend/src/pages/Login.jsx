import { useState, useContext, useMemo, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { firebaseAuth, isFirebaseConfigured } from "../config/firebase";

const Login = () => {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const recaptchaContainerRef = useRef(null);
  const isAdminRoute = location.pathname === "/admin-login";
  const redirectTo = location.state?.redirectTo || location.state?.from?.pathname || "/dashboard";
  const apiBaseUrl = axios.defaults.baseURL || import.meta.env.VITE_API_URL || "";

  const [role, setRole] = useState(isAdminRoute ? "admin" : "student");
  const [method, setMethod] = useState("password");
  const [form, setForm] = useState({ email: "", password: "", phone: "", otp: "", name: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState("");
  const [phoneConfirmation, setPhoneConfirmation] = useState(null);

  const roleLabel = useMemo(() => {
    if (role === "admin") return "Admin";
    if (role === "instructor") return "Instructor";
    return "Student";
  }, [role]);

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
        onAuthSuccess({ token, user });
      } catch {
        setError("OAuth login response could not be processed.");
      }
    }
  }, [location.search]);

  useEffect(() => {
    setOtpSent(false);
    setDevOtp("");
    setForm((current) => ({ ...current, otp: "" }));
    setPhoneConfirmation(null);
  }, [method, role]);

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

  const handleRequestEmailOtp = async () => {
    setError("");
    setMessage("");
    setDevOtp("");

    if (!form.email) {
      setError("Enter your email to request OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/otp/email/request", { email: form.email, role });
      setOtpSent(true);
      setMessage(res.data?.message || "OTP sent successfully.");
      if (res.data?.devOtp) {
        setDevOtp(res.data.devOtp);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email OTP request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    setError("");
    setMessage("");

    if (!form.otp) {
      setError("Enter OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/auth/otp/email/verify", {
        email: form.email,
        otp: form.otp,
        role,
      });
      onAuthSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestFirebasePhoneOtp = async () => {
    setError("");
    setMessage("");

    if (!form.phone) {
      setError("Enter your phone number.");
      return;
    }

    if (!firebaseAuth || !isFirebaseConfigured) {
      setError("Firebase Phone OTP is not configured.");
      return;
    }

    setLoading(true);
    try {
      if (!window.firebaseRecaptchaVerifier) {
        window.firebaseRecaptchaVerifier = new RecaptchaVerifier(firebaseAuth, recaptchaContainerRef.current, {
          size: "normal",
        });
        await window.firebaseRecaptchaVerifier.render();
      }

      const confirmationResult = await signInWithPhoneNumber(
        firebaseAuth,
        form.phone,
        window.firebaseRecaptchaVerifier
      );
      setPhoneConfirmation(confirmationResult);
      setOtpSent(true);
      setMessage("Firebase OTP sent to your phone.");
    } catch (err) {
      setError(err.message || "Firebase Phone OTP request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyFirebasePhoneOtp = async () => {
    setError("");
    setMessage("");

    if (!phoneConfirmation) {
      setError("Request Firebase OTP first.");
      return;
    }

    if (!form.otp) {
      setError("Enter OTP.");
      return;
    }

    setLoading(true);
    try {
      const confirmation = await phoneConfirmation.confirm(form.otp);
      const idToken = await confirmation.user.getIdToken();
      const res = await axios.post("/auth/firebase/phone-login", {
        idToken,
        role,
        name: form.name,
      });
      onAuthSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Firebase Phone OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 sm:mt-14 md:mt-20 px-4 pb-8">
      <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {isAdminRoute ? "Admin Login" : "Welcome Back"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {isAdminRoute
            ? "Secure admin access with Google, GitHub, Email OTP, or Firebase Phone OTP"
            : "Login as student or instructor using Google, GitHub, Email OTP, Firebase Phone OTP, or password"}
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

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={() => startOAuth("google")}
            disabled={loading}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:border-primary"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => startOAuth("github")}
            disabled={loading}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:border-primary"
          >
            Continue with GitHub
          </button>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setMethod("password")}
            className={`px-2 py-2 rounded-lg border text-xs font-semibold ${method === "password" ? "bg-primary text-white border-primary" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"}`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setMethod("email-otp")}
            className={`px-2 py-2 rounded-lg border text-xs font-semibold ${method === "email-otp" ? "bg-primary text-white border-primary" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"}`}
          >
            Email OTP
          </button>
          <button
            type="button"
            onClick={() => setMethod("phone-otp")}
            className={`px-2 py-2 rounded-lg border text-xs font-semibold ${method === "phone-otp" ? "bg-primary text-white border-primary" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"}`}
          >
            Firebase Phone OTP
          </button>
        </div>

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

        {devOtp && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-sm">
            Dev OTP: <span className="font-bold">{devOtp}</span>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Name (optional)</label>
          <input
            type="text"
            placeholder="Used for new OAuth/Firebase accounts"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {method === "password" && (
          <form onSubmit={handlePasswordLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
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
        )}

        {method === "email-otp" && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleRequestEmailOtp}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send Email OTP"}
              </button>
            ) : (
              <>
                <div className="mb-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    value={form.otp}
                    onChange={(e) => setForm({ ...form, otp: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyEmailOtp}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? "Verifying..." : `Verify Email OTP as ${roleLabel}`}
                </button>
              </>
            )}
          </div>
        )}

        {method === "phone-otp" && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                placeholder="Enter phone number with country code"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div ref={recaptchaContainerRef} className="mb-4" />

            {!otpSent ? (
              <button
                type="button"
                onClick={handleRequestFirebasePhoneOtp}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Sending Firebase OTP..." : "Send Firebase Phone OTP"}
              </button>
            ) : (
              <>
                <div className="mb-4 mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    value={form.otp}
                    onChange={(e) => setForm({ ...form, otp: e.target.value })}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyFirebasePhoneOtp}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white p-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? "Verifying..." : `Verify Firebase Phone OTP as ${roleLabel}`}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
