const path = require("path");
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
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(express.json());

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
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.log("Starting ExpenseIQ Backend...");
        console.log("PORT:", PORT);

        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`ExpenseIQ Backend running on port ${PORT}`);
            console.log(`Local URL: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();