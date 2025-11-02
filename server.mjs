import express from "express";
import path from "path";
import { existsSync } from "fs";
import { __dirname } from "./utils/dirname.mjs";
import usersRouter from "./routes/users.mjs";
import profileRouter from "./routes/users.mjs";

const app = express();
const PORT = process.env.PORT || 3000;
// const distPath = path.join(__dirname, "frontend/dist");
const distPath = path.join(__dirname, "public");

// Middleware
app.use(express.json()); //handle req.body
app.use((req, res, next) => {
  //custom MiddleWare as logger.
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API routes
app.use("/api/users", usersRouter);

// Profile routes (auth middleware)
app.use("/api/profile", profileRouter);

// Serve frontend
// app.get("/", (req, res) => {
app.get(/.*/, (req, res) => {
  // Vue + CDN example
  //   res.sendFile(path.join(__dirname, "index.html"));
  if (process.env.NODE_ENV === "production") {
    console.log("🚀 Production mode");

    const requestedPath = req.path;
    let filePath;

    // 1. If root path, serve index.html
    if (requestedPath === "/") {
      filePath = path.join(distPath, "index.html");
    } else {
      // 2. If it's a file request (like /assets/file.js), serve the actual file
      filePath = path.join(distPath, requestedPath);
    }
    console.log(`📁 Requested: ${requestedPath}`);
    console.log(`🔍 Looking for: ${filePath}`);

    // Check if file exists
    if (existsSync(filePath)) {
      console.log(`✅ Serving: ${filePath}`);
      res.sendFile(filePath);
    } else {
      // 3. If file doesn't exist, fall back to index.html (for SPA routing)
      console.log(`❌ Not found, falling back to index.html`);
      res.sendFile(path.join(distPath, "index.html"));
    }
    // res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
    // Enable production features
  } else {
    console.log("🔧 Development mode");
    // Enable development features
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
