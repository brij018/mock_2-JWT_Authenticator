import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/admin/manager", managerRoutes);

app.use((req, res, next) => next(new HttpError("Route Not Found", 404)));

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "internal server error",
  });
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();

export default app;
