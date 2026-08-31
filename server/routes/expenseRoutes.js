const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    addExpense,
    getExpenses,
    deleteExpense,
    getSummary,
    getMoneyLeak,
    getPersonality,
    getPrediction
} = require("../controllers/expenseController");

// Apply protect middleware to all expense routes
router.use(protect);

router.post("/add", addExpense);
router.get("/all", getExpenses);
router.delete("/delete/:id", deleteExpense);
router.get("/summary", getSummary);
router.get("/moneyleak", getMoneyLeak);
router.get("/personality", getPersonality);
router.get("/prediction", getPrediction);

module.exports = router;