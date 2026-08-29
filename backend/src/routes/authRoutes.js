const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/oauth-login", oauthLogin);
router.get("/oauth-config", getOAuthConfig);
router.get("/google/start", googleStart);
router.get("/google/callback", googleCallback);
router.get("/github/start", githubStart);
router.get("/github/callback", githubCallback);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
