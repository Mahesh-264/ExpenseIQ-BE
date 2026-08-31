const path = require("path");

// Load environment variables
require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");

const app = express();

// ===============================
// Middleware
// ===============================

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(express.json());

// ===============================
// Database Connection
// ===============================

connectDB();

// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/goal", goalRoutes);

// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
    res.status(200).json({
        message: "ExpenseIQ Backend Running 🚀",
        status: "success"
    });
});

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        status: "error"
    });
});

// ===============================
// Error Handler
// ===============================

app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        status: "error"
    });
});

// ===============================
// Vercel Export
// ===============================

// IMPORTANT:
// Do NOT use app.listen() on Vercel.
// Vercel handles the server automatically.

module.exports = app;