const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret_key_123", {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

module.exports = generateToken;
