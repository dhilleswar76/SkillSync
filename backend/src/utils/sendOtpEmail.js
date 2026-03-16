const nodemailer = require("nodemailer");

let cachedTransporter = null;

const isEmailConfigured = () => {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM
  );
};

const getTransporter = () => {
  if (!isEmailConfigured()) {
    return null;
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return cachedTransporter;
};

const sendOtpEmail = async ({ email, name, otp }) => {
  const transporter = getTransporter();

  if (!transporter) {
    return false;
  }

  const displayName = name || "there";

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "SkillSync Email OTP",
    text: `Hello ${displayName},\n\nYour SkillSync login OTP is ${otp}. It is valid for 5 minutes.\n\nIf you did not request this OTP, you can ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937;">
        <h2 style="margin-bottom: 12px;">SkillSync Login OTP</h2>
        <p>Hello ${displayName},</p>
        <p>Your one-time password for login is:</p>
        <div style="font-size: 28px; font-weight: 700; letter-spacing: 4px; margin: 16px 0; color: #0f766e;">
          ${otp}
        </div>
        <p>This OTP is valid for 5 minutes.</p>
        <p>If you did not request this OTP, you can ignore this email.</p>
      </div>
    `,
  });

  return true;
};

module.exports = {
  isEmailConfigured,
  sendOtpEmail,
};