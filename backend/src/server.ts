console.log("🔥 SERVER.TS FILE EXECUTED");

import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// Routes
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import settingRoutes from "./routes/settingRoutes";

// ---------- ENV ----------
dotenv.config();

// ---------- App Init ----------
const app: Application = express();

// ---------- Middlewares ----------
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Swagger ----------
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// ---------- Routes ----------
app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/settings", settingRoutes);

// ---------- Health Check ----------
app.get("/", (_req, res) => {
  res.status(200).send("✅ Backend is running! Visit /api-docs for Swagger");
});

// ---------- Config ----------
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ---------- DB & Server ----------
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      if (process.env.NODE_ENV !== "production") {
        console.log(`📘 Swagger UI → http://localhost:${PORT}/api-docs`);
      }
    });
  })
  .catch((error: Error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });

// ---------- Graceful Shutdown ----------
process.on("SIGINT", async () => {
  console.log("🛑 Server shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});
