const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SkillSync Learning Portal API",
      version: "1.0.0",
      description: "API Documentation for SkillSync Student Portal",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
