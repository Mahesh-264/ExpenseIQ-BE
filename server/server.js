const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/goal", goalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.get("/", (req, res) => {
    res.send("ExpenseIQ Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});