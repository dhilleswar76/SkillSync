const express = require("express");
const router = express.Router();
const { getCertificates, generateCertificate } = require("../controllers/certificateController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getCertificates);
router.post("/", protect, generateCertificate);

module.exports = router;
