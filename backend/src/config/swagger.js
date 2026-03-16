const swaggerJsdoc = require("swagger-jsdoc");

module.exports = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Learning Portal API",
      version: "1.0.0"
    },
    servers: [
      { url: "https://skillsync-wi9y.onrender.com", description: "Production" },
      { url: "http://localhost:5000", description: "Local development" }
    ]
  },
  apis: ["./src/routes/*.js"]
});
