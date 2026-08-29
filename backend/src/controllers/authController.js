const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { ensureConnected } = require("../config/db");

// Helper to determine frontend URL for OAuth callback redirects
const getFrontendUrl = (req, stateOrigin) => {
  if (stateOrigin && typeof stateOrigin === "string" && stateOrigin.trim().startsWith("http")) {
    return stateOrigin.trim().replace(/\/+$/, "");
  }
  const envFrontend = process.env.FRONTEND_URL?.trim();
  if (envFrontend && envFrontend.startsWith("http")) {
    return envFrontend.replace(/\/+$/, "");
  }
  return "http://localhost:5173";
};

// Helper to get backend redirect URI dynamically or from env
const getRedirectUri = (req, provider) => {
  const envUri = provider === "google" 
    ? process.env.GOOGLE_REDIRECT_URI?.trim()
    : process.env.GITHUB_REDIRECT_URI?.trim();

  if (envUri && !envUri.startsWith("your_")) {
    return envUri.replace(/[\r\n\s]+$/, "");
  }

  // Fallback to current request host
  const host = req.get("host") || "localhost:5000";
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
  return `${protocol}://${host}/api/auth/${provider}/callback`;
};

// @desc Register user
// @route POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, role = "student", phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      phone: phone ? phone.trim() : undefined,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper to find or create an OAuth user safely with duplicate index auto-recovery
const findOrCreateOAuthUser = async ({ name, email, provider, avatar, providerId }) => {
  const normalizedEmail = email.toLowerCase();
  let user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    try {
      user = await User.create({
        name: name || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        provider: provider.toLowerCase(),
        role: "student",
        avatar: avatar || "",
        googleId: provider.toLowerCase() === "google" ? providerId : undefined,
        githubId: provider.toLowerCase() === "github" ? providerId : undefined,
      });
    } catch (createErr) {
      if (createErr.code === 11000) {
        // If duplicate key error on phone index, drop index and retry
        if (createErr.message && createErr.message.includes("phone")) {
          try {
            await User.collection.dropIndex("phone_1");
            console.log("✅ Auto-dropped legacy phone_1 index on retry");
          } catch (e) {}
          user = await User.create({
            name: name || normalizedEmail.split("@")[0],
            email: normalizedEmail,
            provider: provider.toLowerCase(),
            role: "student",
            avatar: avatar || "",
            googleId: provider.toLowerCase() === "google" ? providerId : undefined,
            githubId: provider.toLowerCase() === "github" ? providerId : undefined,
          });
        } else {
          // If user was created concurrently, fetch by email
          user = await User.findOne({ email: normalizedEmail });
        }
      } else {
        throw createErr;
      }
    }
  } else {
    let updated = false;
    if (provider.toLowerCase() === "google" && !user.googleId && providerId) {
      user.googleId = providerId;
      updated = true;
    }
    if (provider.toLowerCase() === "github" && !user.githubId && providerId) {
      user.githubId = providerId;
      updated = true;
    }
    if (!user.avatar && avatar) {
      user.avatar = avatar;
      updated = true;
    }
    if (updated) {
      await user.save();
    }
  }

  return user;
};

// @desc OAuth Login via API direct payload (Google / GitHub)
// @route POST /api/auth/oauth-login
const oauthLogin = async (req, res) => {
  try {
    const { provider, email, name, role = "student", avatar, providerId } = req.body;

    if (!provider || !["google", "github"].includes(provider.toLowerCase())) {
      return res.status(400).json({ message: "Provider must be google or github" });
    }

    if (role === "admin") {
      return res.status(403).json({ message: "Admin accounts cannot be created through oauth login" });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "OAuth email is invalid" });
    }

    const user = await findOrCreateOAuthUser({
      name,
      email,
      provider,
      avatar,
      providerId,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Start Google OAuth
// @route GET /api/auth/google/start
const googleStart = (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const stateObj = {
    redirect: req.query.redirect || "/dashboard",
    origin: req.query.origin || (req.headers.referer ? new URL(req.headers.referer).origin : ""),
  };
  const frontendUrl = getFrontendUrl(req, stateObj.origin);

  if (!clientId || clientId.startsWith("your_")) {
    if (req.query.format === "json") {
      return res.status(503).json({ message: "Google OAuth is not configured on the server" });
    }
    return res.redirect(
      `${frontendUrl}/login?error=${encodeURIComponent(
        "Google OAuth credentials (GOOGLE_CLIENT_ID) are not configured in your backend environment yet."
      )}`
    );
  }

  const redirectUri = getRedirectUri(req, "google");
  const state = Buffer.from(JSON.stringify(stateObj)).toString("base64");

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=openid%20profile%20email&access_type=offline&prompt=consent&state=${encodeURIComponent(
    state
  )}`;

  if (req.query.format === "json") {
    return res.json({ url });
  }

  res.redirect(url);
};

// @desc Google OAuth Callback
// @route GET /api/auth/google/callback
const googleCallback = async (req, res) => {
  let stateObj = { redirect: "/dashboard", origin: "" };
  if (req.query.state) {
    try {
      stateObj = JSON.parse(Buffer.from(req.query.state, "base64").toString("utf8"));
    } catch (e) {
      console.warn("Could not parse OAuth state:", e.message);
    }
  }

  const frontendUrl = getFrontendUrl(req, stateObj.origin);
  const targetRedirect = stateObj.redirect || "/dashboard";

  if (req.query.error) {
    const errorMsg = req.query.error_description || req.query.error || "Google authentication was cancelled";
    return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(errorMsg)}`);
  }

  const code = req.query.code;
  if (!code) {
    return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent("No authorization code provided by Google")}`);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
    const redirectUri = getRedirectUri(req, "google");

    if (!clientId || !clientSecret) {
      return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent("Google OAuth credentials missing on server")}`);
    }

    // Exchange authorization code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Google token exchange error:", tokenData);
      return res.redirect(
        `${frontendUrl}/login?error=${encodeURIComponent(tokenData.error_description || "Failed to exchange Google token")}`
      );
    }

    // Fetch user info from Google
    const userinfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await userinfoResponse.json();
    if (!userinfoResponse.ok || !profile.email) {
      return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent("Failed to fetch Google profile information")}`);
    }

    const email = profile.email.toLowerCase();
    const name = profile.name || profile.given_name || email.split("@")[0];
    const avatar = profile.picture || "";
    const googleId = profile.sub;

    const isDbConnected = await ensureConnected();
    if (!isDbConnected) {
      return res.redirect(
        `${frontendUrl}/login?error=${encodeURIComponent(
          "Database connection is currently unavailable on server. Please check MongoDB Atlas password and Network Access in Render."
        )}`
      );
    }

    const user = await findOrCreateOAuthUser({
      name,
      email,
      provider: "google",
      avatar,
      providerId: googleId,
    });

    const token = generateToken(user._id);
    const userPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      provider: user.provider,
    };

    const redirectUrl = `${frontendUrl}/oauth-callback?token=${encodeURIComponent(
      token
    )}&user=${encodeURIComponent(JSON.stringify(userPayload))}&redirect=${encodeURIComponent(targetRedirect)}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Google OAuth Callback Error:", error);
    res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(error.message || "OAuth processing failed")}`);
  }
};

// @desc Start GitHub OAuth
// @route GET /api/auth/github/start
const githubStart = (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID?.trim();
  const stateObj = {
    redirect: req.query.redirect || "/dashboard",
    origin: req.query.origin || (req.headers.referer ? new URL(req.headers.referer).origin : ""),
  };
  const frontendUrl = getFrontendUrl(req, stateObj.origin);

  if (!clientId || clientId.startsWith("your_")) {
    if (req.query.format === "json") {
      return res.status(503).json({ message: "GitHub OAuth is not configured on the server" });
    }
    return res.redirect(
      `${frontendUrl}/login?error=${encodeURIComponent(
        "GitHub OAuth credentials (GITHUB_CLIENT_ID) are not configured in your backend environment yet."
      )}`
    );
  }

  const redirectUri = getRedirectUri(req, "github");
  const state = Buffer.from(JSON.stringify(stateObj)).toString("base64");

  const url = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=read:user%20user:email&state=${encodeURIComponent(state)}`;

  if (req.query.format === "json") {
    return res.json({ url });
  }

  res.redirect(url);
};

// @desc GitHub OAuth Callback
// @route GET /api/auth/github/callback
const githubCallback = async (req, res) => {
  let stateObj = { redirect: "/dashboard", origin: "" };
  if (req.query.state) {
    try {
      stateObj = JSON.parse(Buffer.from(req.query.state, "base64").toString("utf8"));
    } catch (e) {
      console.warn("Could not parse OAuth state:", e.message);
    }
  }

  const frontendUrl = getFrontendUrl(req, stateObj.origin);
  const targetRedirect = stateObj.redirect || "/dashboard";

  if (req.query.error) {
    const errorMsg = req.query.error_description || req.query.error || "GitHub authentication was cancelled";
    return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(errorMsg)}`);
  }

  const code = req.query.code;
  if (!code) {
    return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent("No authorization code provided by GitHub")}`);
  }

  try {
    const clientId = process.env.GITHUB_CLIENT_ID?.trim();
    const clientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();
    const redirectUri = getRedirectUri(req, "github");

    if (!clientId || !clientSecret) {
      return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent("GitHub OAuth credentials missing on server")}`);
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("GitHub token exchange error:", tokenData);
      return res.redirect(
        `${frontendUrl}/login?error=${encodeURIComponent(tokenData.error_description || "Failed to exchange GitHub token")}`
      );
    }

    const accessToken = tokenData.access_token;

    // Fetch user profile from GitHub
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "SkillSync-Portal",
      },
    });

    const profile = await userResponse.json();
    if (!userResponse.ok || !profile.id) {
      return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent("Failed to fetch GitHub profile")}`);
    }

    // If profile email is null or private, fetch verified emails from /user/emails
    let email = profile.email;
    if (!email) {
      try {
        const emailsResponse = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Agent": "SkillSync-Portal",
          },
        });
        const emails = await emailsResponse.json();
        if (Array.isArray(emails)) {
          const primaryEmail = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0];
          if (primaryEmail) {
            email = primaryEmail.email;
          }
        }
      } catch (err) {
        console.warn("Could not fetch secondary GitHub emails:", err.message);
      }
    }

    if (!email) {
      return res.redirect(
        `${frontendUrl}/login?error=${encodeURIComponent("No verified email found on your GitHub account")}`
      );
    }

    const normalizedEmail = email.toLowerCase();
    const name = profile.name || profile.login || normalizedEmail.split("@")[0];
    const avatar = profile.avatar_url || "";
    const githubId = String(profile.id);

    const isDbConnected = await ensureConnected();
    if (!isDbConnected) {
      return res.redirect(
        `${frontendUrl}/login?error=${encodeURIComponent(
          "Database connection is currently unavailable on server. Please check MongoDB Atlas password and Network Access in Render."
        )}`
      );
    }

    const user = await findOrCreateOAuthUser({
      name,
      email: normalizedEmail,
      provider: "github",
      avatar,
      providerId: githubId,
    });

    const token = generateToken(user._id);
    const userPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      provider: user.provider,
    };

    const redirectUrl = `${frontendUrl}/oauth-callback?token=${encodeURIComponent(
      token
    )}&user=${encodeURIComponent(JSON.stringify(userPayload))}&redirect=${encodeURIComponent(targetRedirect)}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error("GitHub OAuth Callback Error:", error);
    res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(error.message || "OAuth processing failed")}`);
  }
};

// @desc Get OAuth Configuration Status
// @route GET /api/auth/oauth-config
const getOAuthConfig = (req, res) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const githubClientId = process.env.GITHUB_CLIENT_ID?.trim();

  res.json({
    googleEnabled: !!(googleClientId && !googleClientId.startsWith("your_")),
    githubEnabled: !!(githubClientId && !githubClientId.startsWith("your_")),
  });
};

// @desc Get current user profile
// @route GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update user profile
// @route PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.avatar = req.body.avatar || user.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  oauthLogin,
  googleStart,
  googleCallback,
  githubStart,
  githubCallback,
  getOAuthConfig,
  getProfile,
  updateProfile,
};
