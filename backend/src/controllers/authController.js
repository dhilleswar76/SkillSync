const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { OAuth2Client } = require("google-auth-library");
const { getFirebaseAdminAuth } = require("../config/firebaseAdmin");
const { isEmailConfigured, sendOtpEmail } = require("../utils/sendOtpEmail");

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

const issueOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const getFrontendAuthPath = (role) => (role === "admin" ? "/admin-login" : "/login");

const buildFrontendRedirect = ({ role, token, user, error, provider }) => {
  const base = `${process.env.FRONTEND_URL || "https://skill-sync-learning-portal.vercel.app"}${getFrontendAuthPath(role)}`;
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
const getGithubRedirectUri = () => {
  const configured = pickEnv("GITHUB_REDIRECT_URI", "GITHUB_CALLBACK_URL");
  if (configured) {
    return configured;
  }

  const externalUrl = pickEnv("RENDER_EXTERNAL_URL") || "https://skillsync-wi9y.onrender.com";
  return `${externalUrl.replace(/\/$/, "")}/api/auth/github/callback`;
};

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

const otpResponse = (user, channel, otp) => {
  const response = {
    message: `OTP sent to your ${channel}.`,
    expiresInSeconds: 300,
  };

  if (process.env.NODE_ENV !== "production") {
    response.devOtp = otp;
  }

  return response;
};

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
    const { email, password, role } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: String(email).toLowerCase() });
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
  const githubRedirectUri = getGithubRedirectUri();

  if (!githubClientId || !githubRedirectUri) {
    return res.status(503).json({ message: "GitHub OAuth is not configured" });
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
  const githubRedirectUri = getGithubRedirectUri();

  try {
    if (!githubClientId || !githubClientSecret || !githubRedirectUri) {
      return res.redirect(buildFrontendRedirect({ role, error: "GitHub OAuth is not configured", provider: "github" }));
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

exports.requestEmailOtp = async (req, res) => {
  try {
    const { email, role } = req.body;
    const normalizedRole = normalizeRole(role || "student");

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!normalizedRole) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    if (user.role !== normalizedRole) {
      return res.status(403).json({ message: `This account is not authorized for ${normalizedRole} login` });
    }

    const otp = issueOtp();
    user.otpCode = otp;
    user.otpChannel = "email";
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    let wasDelivered = false;

    if (isEmailConfigured()) {
      try {
        wasDelivered = await sendOtpEmail({
          email: user.email,
          name: user.name,
          otp,
        });
      } catch (mailError) {
        console.error("Email OTP delivery error:", mailError);

        if (process.env.NODE_ENV === "production") {
          return res.status(500).json({ message: "OTP email could not be sent. Please try again." });
        }
      }
    }

    console.log(`[OTP][email] ${user.email}: ${otp}`);

    const response = otpResponse(user, "email", otp);
    if (wasDelivered) {
      response.message = `OTP sent to ${user.email}.`;
      delete response.devOtp; // never leak OTP when real email was delivered
    } else if (!isEmailConfigured()) {
      response.message = process.env.NODE_ENV === "production"
        ? "Email OTP is not configured on the server."
        : `SMTP is not configured, so OTP is available in development mode only for ${user.email}.`;
    }

    if (!wasDelivered && !isEmailConfigured() && process.env.NODE_ENV === "production") {
      return res.status(503).json({ message: "Email OTP is not configured on the server." });
    }

    res.json(response);
  } catch (error) {
    console.error("Request email OTP error:", error);
    res.status(500).json({ message: "Server error while requesting email OTP", error: error.message });
  }
};

exports.verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp, role } = req.body;
    const normalizedRole = normalizeRole(role || "student");

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    if (user.role !== normalizedRole) {
      return res.status(403).json({ message: `This account is not authorized for ${normalizedRole} login` });
    }

    const isExpired = !user.otpExpiresAt || new Date(user.otpExpiresAt).getTime() < Date.now();
    if (user.otpCode !== String(otp) || user.otpChannel !== "email" || isExpired) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    user.otpCode = null;
    user.otpChannel = null;
    user.otpExpiresAt = null;
    await user.save();

    res.json({ token: generateToken(user._id), user: sanitizeUser(user) });
  } catch (error) {
    console.error("Verify email OTP error:", error);
    res.status(500).json({ message: "Server error while verifying email OTP", error: error.message });
  }
};

exports.requestPhoneOtp = async (req, res) => {
  try {
    const { phone, role } = req.body;
    const normalizedRole = normalizeRole(role || "student");

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    if (!normalizedRole) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "No account found with this phone number" });
    }

    if (user.role !== normalizedRole) {
      return res.status(403).json({ message: `This account is not authorized for ${normalizedRole} login` });
    }

    const otp = issueOtp();
    user.otpCode = otp;
    user.otpChannel = "phone";
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    console.log(`[OTP][phone] ${user.phone}: ${otp}`);
    res.json(otpResponse(user, "phone", otp));
  } catch (error) {
    console.error("Request phone OTP error:", error);
    res.status(500).json({ message: "Server error while requesting phone OTP", error: error.message });
  }
};

exports.verifyPhoneOtp = async (req, res) => {
  try {
    const { phone, otp, role } = req.body;
    const normalizedRole = normalizeRole(role || "student");

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "No account found with this phone number" });
    }

    if (user.role !== normalizedRole) {
      return res.status(403).json({ message: `This account is not authorized for ${normalizedRole} login` });
    }

    const isExpired = !user.otpExpiresAt || new Date(user.otpExpiresAt).getTime() < Date.now();
    if (user.otpCode !== String(otp) || user.otpChannel !== "phone" || isExpired) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    user.otpCode = null;
    user.otpChannel = null;
    user.otpExpiresAt = null;
    await user.save();

    res.json({ token: generateToken(user._id), user: sanitizeUser(user) });
  } catch (error) {
    console.error("Verify phone OTP error:", error);
    res.status(500).json({ message: "Server error while verifying phone OTP", error: error.message });
  }
};

exports.firebasePhoneLogin = async (req, res) => {
  try {
    const { idToken, role, name } = req.body;
    const normalizedRole = normalizeRole(role || "student");
    const firebaseAdminAuth = getFirebaseAdminAuth();

    if (!normalizedRole) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!firebaseAdminAuth) {
      return res.status(503).json({ message: "Firebase phone auth is not configured" });
    }

    if (!idToken) {
      return res.status(400).json({ message: "Firebase ID token is required" });
    }

    const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken);
    const phone = decodedToken.phone_number;

    if (!phone) {
      return res.status(400).json({ message: "Verified Firebase user does not include a phone number" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        name: name || decodedToken.name || `User ${phone.slice(-4)}`,
        email: decodedToken.email,
        phone,
        role: normalizedRole,
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
    console.error("Firebase phone login error:", error);
    res.status(500).json({ message: "Server error during Firebase phone login", error: error.message });
  }
};

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
