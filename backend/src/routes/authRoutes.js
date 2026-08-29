const express = require("express");
const router = express.Router();
const {
  register,
  login,
  oauthLogin,
  googleStart,
  githubStart,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/oauth-login", oauthLogin);
router.get("/google/start", googleStart);
router.get("/github/start", githubStart);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
