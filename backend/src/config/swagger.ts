import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: [
    path.resolve(__dirname, "../routes/*.ts"),
    path.resolve(__dirname, "../controllers/*.ts"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
