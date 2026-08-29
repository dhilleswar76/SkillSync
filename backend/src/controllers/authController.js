const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc Register user
// @route POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, role = "student", phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password" });
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
      phone,
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

// @desc OAuth Login (Google / GitHub)
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

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email: email.toLowerCase(),
        provider: provider.toLowerCase(),
        role: "student",
        avatar: avatar || "",
        googleId: provider === "google" ? providerId : undefined,
        githubId: provider === "github" ? providerId : undefined,
      });
    }

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
  if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID.startsWith("your_")) {
    return res.status(503).json({ message: "Google OAuth is not configured" });
  }
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/api/auth/google/callback";
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=profile%20email`;
  res.redirect(url);
};

// @desc Start GitHub OAuth
// @route GET /api/auth/github/start
const githubStart = (req, res) => {
  if (!process.env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID.startsWith("your_")) {
    return res.status(503).json({ message: "GitHub OAuth is not configured" });
  }
  const redirectUri = process.env.GITHUB_REDIRECT_URI || "http://localhost:5000/api/auth/github/callback";
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
  res.redirect(url);
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
  githubStart,
  getProfile,
  updateProfile,
};
