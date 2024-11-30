import express from "express";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(clerkMiddleware()); //this will add auth to req obj => req.auth
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10MB max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// TODO: socketIO

app.listen(PORT, () => {
  console.log(`Server is runnung on http://localhost: ${PORT}`);
  connectDB();
});
