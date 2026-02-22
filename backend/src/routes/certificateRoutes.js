const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  issueCertificate,
  downloadCertificate
} = require("../controllers/certificateController");

router.post("/", auth, issueCertificate);
router.get("/download/:courseId", auth, downloadCertificate);

module.exports = router;
