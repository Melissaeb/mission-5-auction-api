const express = require("express");
const connectDB = require("./config/db");
const auctionRoutes = require("./routes/auctionRoutes");
require("dotenv").config();

const app = express();

// Connect to database only if not in test environment
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Middleware
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auctions", auctionRoutes);

module.exports = app;
