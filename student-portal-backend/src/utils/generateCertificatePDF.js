const PDFDocument = require("pdfkit");

module.exports = (student, course, res) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=certificate.pdf"
  );

  doc.pipe(res);

  doc.fontSize(26).text("Certificate of Completion", { align: "center" });
  doc.moveDown(2);

  doc.fontSize(18).text(
    `${student.name} has successfully completed the course`,
    { align: "center" }
  );

  doc.moveDown();
  doc.fontSize(20).text(course.title, { align: "center" });

  doc.moveDown(2);
  doc.fontSize(14).text(`Issued on: ${new Date().toDateString()}`, {
    align: "center"
  });

  doc.end();
};
