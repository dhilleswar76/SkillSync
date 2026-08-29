const Certificate = require("../models/Certificate");
const Course = require("../models/Course");

// @desc Get user certificates
// @route GET /api/certificates
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id })
      .populate("course", "title description level duration instructor")
      .populate("user", "name email");
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Generate / Claim certificate
// @route POST /api/certificates
const generateCertificate = async (req, res) => {
  try {
    const { courseId, score = 90, grade = "A" } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let cert = await Certificate.findOne({ user: req.user._id, course: courseId });
    if (!cert) {
      cert = await Certificate.create({
        certificateId: `CERT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`,
        user: req.user._id,
        course: courseId,
        score,
        grade,
        issueDate: new Date(),
      });
    }

    const populated = await Certificate.findById(cert._id).populate("course").populate("user", "name email");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCertificates,
  generateCertificate,
};
