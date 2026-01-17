const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/issues", require("./routes/issues"));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
