const router = require("express").Router();
const {
	register,
	login,
	oauthLogin,
	startGoogleOAuth,
	googleOAuthCallback,
	startGithubOAuth,
	githubOAuthCallback,
	requestEmailOtp,
	verifyEmailOtp,
	requestPhoneOtp,
	verifyPhoneOtp,
	firebasePhoneLogin,
} = require("../controllers/authController");
const { updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/oauth-login", oauthLogin);
router.get("/google/start", startGoogleOAuth);
router.get("/google/callback", googleOAuthCallback);
router.get("/github/start", startGithubOAuth);
router.get("/github/callback", githubOAuthCallback);
router.post("/otp/email/request", requestEmailOtp);
router.post("/otp/email/verify", verifyEmailOtp);
router.post("/otp/phone/request", requestPhoneOtp);
router.post("/otp/phone/verify", verifyPhoneOtp);
router.post("/firebase/phone-login", firebasePhoneLogin);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
