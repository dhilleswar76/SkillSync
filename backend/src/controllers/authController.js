const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { OAuth2Client } = require("google-auth-library");
// OTP and Firebase phone auth removed; keep OAuth and password flows only

const VALID_ROLES = ["student", "instructor", "admin"];

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
});

const normalizeRole = (role) => {
  const normalized = String(role || "student").toLowerCase();
  return VALID_ROLES.includes(normalized) ? normalized : null;
};

// issueOtp removed

const getFrontendAuthPath = (role) => (role === "admin" ? "/admin-login" : "/login");

const getBackendPublicUrl = (req) => {
  const configured = pickEnv("BACKEND_PUBLIC_URL", "RENDER_EXTERNAL_URL");
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (!req) {
    return "";
  }

  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.get("host");
  if (!host) {
    return "";
  }

  return `${protocol}://${host}`.replace(/\/$/, "");
};

const getFrontendBaseUrl = () => pickEnv("FRONTEND_URL", "PUBLIC_FRONTEND_URL") || "http://localhost:3000";

const buildFrontendRedirect = ({ role, token, user, error, provider }) => {
  const base = `${getFrontendBaseUrl()}${getFrontendAuthPath(role)}`;
  const searchParams = new URLSearchParams();

  if (provider) searchParams.set("provider", provider);
  if (error) searchParams.set("oauthError", error);
  if (token) searchParams.set("token", token);
  if (user) searchParams.set("user", encodeURIComponent(JSON.stringify(user)));

  const qs = searchParams.toString();
  return qs ? `${base}?${qs}` : base;
};

const encodeState = (payload) => Buffer.from(JSON.stringify(payload)).toString("base64url");

const decodeState = (state) => {
  try {
    return JSON.parse(Buffer.from(state, "base64url").toString("utf8"));
  } catch {
    return {};
  }
};

const pickEnv = (...keys) => {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
};

const getGithubClientId = () => pickEnv("GITHUB_CLIENT_ID", "GITHUB_ID", "GITHUB_OAUTH_CLIENT_ID");
const getGithubClientSecret = () => pickEnv("GITHUB_CLIENT_SECRET", "GITHUB_SECRET", "GITHUB_OAUTH_CLIENT_SECRET");
const getGithubRedirectUri = (req) => {
  const configured = pickEnv("GITHUB_REDIRECT_URI", "GITHUB_CALLBACK_URL");
  if (configured) {
    return configured;
  }

  const backendBaseUrl = getBackendPublicUrl(req);
  if (!backendBaseUrl) {
    return "";
  }

  return `${backendBaseUrl}/api/auth/github/callback`;
};

const getMissingGithubConfigKeys = (req) => {
  const missing = [];
  if (!getGithubClientId()) missing.push("GITHUB_CLIENT_ID");
  if (!getGithubClientSecret()) missing.push("GITHUB_CLIENT_SECRET");
  if (!getGithubRedirectUri(req)) missing.push("GITHUB_REDIRECT_URI");
  return missing;
};

// SMTP helper removed

const googleClient = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  ? new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
  : null;

const findOrCreateOAuthUser = async ({ email, name, role, provider }) => {
  let user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    user = await User.create({
      name: name || email.split("@")[0],
      email: email.toLowerCase(),
      role,
      oauthProvider: provider,
    });
  }

  return user;
};

// OTP response helper removed

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const normalizedEmail = String(email).toLowerCase();

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ message: "Phone number is already registered" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const normalizedRole = normalizeRole(role || "student");
    if (!normalizedRole || normalizedRole === "admin") {
      return res.status(400).json({ message: "Invalid role for registration" });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      phone: phone || undefined,
      password: hashedPassword,
      role: normalizedRole,
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, phone, password, role } = req.body;

    if (!password || (!email && !phone)) {
      return res.status(400).json({ message: "Email or phone and password are required" });
    }

    let user = null;

    if (phone) {
      user = await User.findOne({ phone });
    } else if (email) {
      if (String(email).includes("@")) {
        user = await User.findOne({ email: String(email).toLowerCase() });
      } else {
        // allow login where user typed phone into the email field
        user = await User.findOne({ phone: String(email) });
      }
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ message: `This account is not authorized for ${role} login` });
    }

    res.json({
      token: generateToken(user._id),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

exports.oauthLogin = async (req, res) => {
  try {
    const { provider, email, name, role } = req.body;
    const normalizedProvider = String(provider || "").toLowerCase();
    const normalizedRole = normalizeRole(role || "student");

    if (!["google", "github"].includes(normalizedProvider)) {
      return res.status(400).json({ message: "Provider must be google or github" });
    }

    if (!normalizedRole) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required for OAuth login" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email: email.toLowerCase(),
        role: normalizedRole,
        oauthProvider: normalizedProvider,
      });
    }

    if (user.role !== normalizedRole) {
      return res.status(403).json({ message: `This account is not authorized for ${normalizedRole} login` });
    }

    res.json({
      token: generateToken(user._id),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("OAuth login error:", error);
    res.status(500).json({ message: "Server error during OAuth login", error: error.message });
  }
};

exports.startGoogleOAuth = async (req, res) => {
  const role = normalizeRole(req.query.role || "student");

  if (!googleClient || !process.env.GOOGLE_REDIRECT_URI) {
    return res.status(503).json({ message: "Google OAuth is not configured" });
  }

  if (!role) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const state = encodeState({ role, provider: "google" });
  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "profile", "email"],
    prompt: "select_account",
    state,
  });

  res.redirect(url);
};

exports.googleOAuthCallback = async (req, res) => {
  const state = decodeState(req.query.state || "");
  const role = normalizeRole(state.role || "student") || "student";

  try {
    if (!googleClient || !process.env.GOOGLE_REDIRECT_URI) {
      return res.redirect(buildFrontendRedirect({ role, error: "Google OAuth is not configured", provider: "google" }));
    }

    const { code } = req.query;
    if (!code) {
      return res.redirect(buildFrontendRedirect({ role, error: "Missing Google authorization code", provider: "google" }));
    }

    const { tokens } = await googleClient.getToken(String(code));
    const userInfoResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const profile = await userInfoResponse.json();

    if (!profile.email) {
      return res.redirect(buildFrontendRedirect({ role, error: "Google account email was not available", provider: "google" }));
    }

    const user = await findOrCreateOAuthUser({
      email: profile.email,
      name: profile.name,
      role,
      provider: "google",
    });

    if (user.role !== role) {
      return res.redirect(buildFrontendRedirect({ role, error: `This account is not authorized for ${role} login`, provider: "google" }));
    }

    const sanitizedUser = sanitizeUser(user);
    const token = generateToken(user._id);
    res.redirect(buildFrontendRedirect({ role, token, user: sanitizedUser, provider: "google" }));
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    res.redirect(buildFrontendRedirect({ role, error: "Google OAuth failed", provider: "google" }));
  }
};

exports.startGithubOAuth = async (req, res) => {
  const role = normalizeRole(req.query.role || "student");
  const githubClientId = getGithubClientId();
  const githubRedirectUri = getGithubRedirectUri(req);

  if (!githubClientId || !githubRedirectUri) {
    return res.status(503).json({
      message: "GitHub OAuth is not configured",
      missing: getMissingGithubConfigKeys(req),
    });
  }

  if (!role) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const state = encodeState({ role, provider: "github" });
  const params = new URLSearchParams({
    client_id: githubClientId,
    redirect_uri: githubRedirectUri,
    scope: "read:user user:email",
    state,
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
};

exports.githubOAuthCallback = async (req, res) => {
  const state = decodeState(req.query.state || "");
  const role = normalizeRole(state.role || "student") || "student";
  const githubClientId = getGithubClientId();
  const githubClientSecret = getGithubClientSecret();
  const githubRedirectUri = getGithubRedirectUri(req);

  try {
    if (!githubClientId || !githubClientSecret || !githubRedirectUri) {
      const missing = getMissingGithubConfigKeys(req);
      const errorMessage = missing.length
        ? `GitHub OAuth is not configured: missing ${missing.join(", ")}`
        : "GitHub OAuth is not configured";
      return res.redirect(buildFrontendRedirect({ role, error: errorMessage, provider: "github" }));
    }

    const { code } = req.query;
    if (!code) {
      return res.redirect(buildFrontendRedirect({ role, error: "Missing GitHub authorization code", provider: "github" }));
    }

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: githubClientId,
        client_secret: githubClientSecret,
        code: String(code),
        redirect_uri: githubRedirectUri,
      }),
    });
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.redirect(buildFrontendRedirect({ role, error: "GitHub access token could not be created", provider: "github" }));
    }

    const [profileResponse, emailsResponse] = await Promise.all([
      fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: "application/vnd.github+json" },
      }),
      fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: "application/vnd.github+json" },
      }),
    ]);

    const profile = await profileResponse.json();
    const emails = await emailsResponse.json();
    const primaryEmail = Array.isArray(emails)
      ? emails.find((entry) => entry.primary)?.email || emails[0]?.email
      : null;

    if (!primaryEmail) {
      return res.redirect(buildFrontendRedirect({ role, error: "GitHub account email was not available", provider: "github" }));
    }

    const user = await findOrCreateOAuthUser({
      email: primaryEmail,
      name: profile.name || profile.login,
      role,
      provider: "github",
    });

    if (user.role !== role) {
      return res.redirect(buildFrontendRedirect({ role, error: `This account is not authorized for ${role} login`, provider: "github" }));
    }

    const sanitizedUser = sanitizeUser(user);
    const token = generateToken(user._id);
    res.redirect(buildFrontendRedirect({ role, token, user: sanitizedUser, provider: "github" }));
  } catch (error) {
    console.error("GitHub OAuth callback error:", error);
    res.redirect(buildFrontendRedirect({ role, error: "GitHub OAuth failed", provider: "github" }));
  }
};

// OTP and Firebase phone login removed. Use email/phone + password or OAuth flows.

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ message: "Name or email is required" });
    }

    const updates = {};
    if (name) updates.name = String(name).trim();
    if (email) {
      const normalizedEmail = String(email).toLowerCase().trim();
      const emailTaken = await User.findOne({ email: normalizedEmail, _id: { $ne: req.user._id } });
      if (emailTaken) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      updates.email = normalizedEmail;
    }

    const updated = await User.findByIdAndUpdate(req.user._id, { $set: updates }, { new: true });
    res.json({ token: generateToken(updated._id), user: sanitizeUser(updated) });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error during profile update", error: error.message });
  }
};
