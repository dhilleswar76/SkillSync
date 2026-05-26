const router = require("express").Router();
const {
	register,
	login,
	oauthLogin,
	startGoogleOAuth,
	googleOAuthCallback,
	startGithubOAuth,
	githubOAuthCallback,
	updateProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/oauth-login", oauthLogin);
router.get("/google/start", startGoogleOAuth);
router.get("/google/callback", googleOAuthCallback);
router.get("/github/start", startGithubOAuth);
router.get("/github/callback", githubOAuthCallback);
// OTP and Firebase phone-login endpoints removed: use email/phone + password or OAuth
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
