require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const articleRoutes = require("./routes/articles");

const app = express();
const PORT = process.env.PORT || 5001;  // CHANGED TO 5001

/**
 * Middleware
 */
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "https://beyondchats-dashboard-sage.vercel.app"]
}));
app.use(morgan("dev"));

/**
 * MongoDB Connection with Retry Logic
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/beyondchats");
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed. Retrying in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

connectDB();

/**
 * Routes
 */
app.use("/api/articles", articleRoutes);

/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "BeyondChats API is running 🚀 - Phase 1+2 Complete",
    articlesEndpoint: `http://localhost:${PORT}/api/articles`,
    status: "Scraped 5 articles → GPT-4o-mini optimized → Ready for dashboard"
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

/**
 * Start Server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Articles API: http://localhost:${PORT}/api/articles`);
  console.log(`🎯 Phase 2 ready: node scripts/optimizeArticles.js`);
});
