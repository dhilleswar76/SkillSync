const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const generatePDF = require("../utils/generateCertificatePDF");

exports.issueCertificate = async (req, res) => {
  const cert = await Certificate.create({
    student: req.user._id,
    course: req.body.courseId
  });

  res.status(201).json(cert);
};

exports.downloadCertificate = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  generatePDF(req.user, course, res);
};
